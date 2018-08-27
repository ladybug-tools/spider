// parse radiance files and return a JSON object
import * as converter from './radconverter.js';

function rad_parser(event) {
  if (!event) return;
  // parse file
  // console.log('parsing input file.')
  const input = event.target;

  if ('files' in input && input.files.length > 0) {
    let promises = []

    for (var count = 0; count < input.files.length; count++) {
      // collect all file contents as Promises
      promises.push(read_file_content(input.files[count]))
    }

    Promise.all(promises).then(content => {
        // join all files together as a single string
        // performance-wise it should be fine: https://stackoverflow.com/a/4292753/4394669
        let raw_data = content.join("\n");
        // Return JSON objects
        let data = rad_to_json(raw_data);
        // expose data globally
        window.rad_data = data;
        // console.log('returning JSON objects.');
        place_file_content(data);
      }).catch(error => console.log(error))

  }
}

function read_file_content(file) {
  /* read content of a text file. */
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result);
    reader.onerror = error => reject(error);
    reader.readAsText(file);
  })
}

function rad_to_json(rad_text) {
  /* Input multi-line radiance file and return them as an array of JSON objects. */
  const parse_rad_re = /^\s*([^0-9].*(\s*[\d.-]+.*)*)/gm;
  // separate input radiance objects
  var raw_objects = rad_text.match(parse_rad_re)
    .filter(word => word.trim().length > 0 && !word.trim().startsWith('#'));
  // extra round of removing next line! The code works fine without this locally but
  // not on the page. I'm not sure why.
  const raw_objects_re = raw_objects.map( item => item.replace(/\r\n|\n/g, " " ) );

  let json_data = raw_objects.map(line => rad_object_to_json(line));

  let json_array = {'surfaces': [], 'materials': [], 'other': []};

  for (var i = 0; i < json_data.length; i++) {
    let results = json_data[i];
    json_array[results[0]].push(results[1]);
  }
  return json_array;
}

function rad_object_to_json(rad_text){
  /* convert a single radiance object to a JSON object */
  const rep_new_line_re = /\s\s+/g;
  const data = rad_text.replace(rep_new_line_re, " ").trim().split(" ");
  const type = data[1];
  if (!type) return;
  switch (type) {
    case 'polygon':
      return converter.parse_polygon(data);
    case 'sphere':
      return converter.parse_sphere(data);
    case 'cone':
      return converter.parse_cone(data);
    case 'cylinder':
      return converter.parse_cylinder(data);
    case 'plastic':
      return converter.parse_plastic(data);
    case 'glass':
      return converter.parse_glass(data);
    case 'metal':
      return converter.parse_metal(data);
    case 'trans':
      return converter.parse_trans(data);
    case 'glow':
      return converter.parse_glow(data);
    case 'mirror':
      return converter.parse_mirror(data);
    default:
      // this is a generic method that returns the data as values for each line
      return converter.parse_base(data);
  }
}

function place_file_content(data) {
  /* place content in text box */
  let srf_target = document.getElementById('surface-target');
  let srf_content = data['surfaces'].map(obj => JSON.stringify(obj, undefined, 2));
  srf_target.value = srf_content;
  let mat_target = document.getElementById('material-target');
  let mat_content = data['materials'].map(obj => JSON.stringify(obj, undefined, 2));
  mat_target.value = mat_content;
  let other_target = document.getElementById('other-target');
  let other_content = data['other'].map(obj => JSON.stringify(obj, undefined, 2));
  other_target.value = other_content;
}

export { rad_parser };