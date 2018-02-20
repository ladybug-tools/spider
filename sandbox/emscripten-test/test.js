var em_module = require('./embuild/libtest_lib.js');

var point = new em_module.Point3d(1, 2, 3);
console.log(point);
console.log(point.x());
console.log(point.y());
console.log(point.z());

var points = new em_module.Point3dVector();
points.push_back(new em_module.Point3d(0, 0, 0));
points.push_back(new em_module.Point3d(1, 0, 0));
points.push_back(new em_module.Point3d(1, 1, 0));
points.push_back(new em_module.Point3d(0, 1, 0));
console.log(points.size());
console.log(points.size());

var area = em_module.getArea(points);
console.log(area.is_initialized());
console.log(area.get());

var normal = em_module.getOutwardNormal(points);
console.log(normal.is_initialized());
console.log(normal.get());

var centroid = em_module.getCentroid(points);
console.log(centroid.is_initialized());
console.log(centroid.get());

var d1 = new em_module.OptionalDouble();
console.log(d1.is_initialized());
console.log(d1.get());

var d2 = new em_module.OptionalDouble(-1.0);
console.log(d2.is_initialized());
console.log(d2.get());

var floorplan = {"application":{"currentSelections":{"story":null,"story_id":"1","subselection_ids":{"1":"3"},"component_id":null,"component_definition_id":null,"component_instance_id":null,"space_property_id":"25","tool":"Apply Property","mode":"space_types","snapMode":"grid-strict","modeTab":"assign","subselectionType":"space_types"},"modes":["spaces","shading","building_units","thermal_zones","pitched_roofs","space_types","images"],"tools":["Pan","Drag","Rectangle","Polygon","Eraser","Select","Map","Fill","Place Component","Image","Apply Property"],"scale":{"x":{"pixels":1608,"rwuRange":[-277.56041426927504,277.56041426927504]},"y":{"pixels":869,"rwuRange":[-150,150]}}},"project":{"config":{"units":"ft","unitsEditable":true,"language":"EN-US"},"north_axis":46.64648415370892,"ground":{"floor_offset":0,"azimuth_angle":0,"tilt_slope":0},"grid":{"visible":true,"spacing":5},"view":{"min_x":-353.9079171292918,"min_y":-294.7977650130165,"max_x":856.9089567939025,"max_y":359.5553838919933},"map":{"initialized":true,"enabled":true,"visible":true,"latitude":39.764682202798724,"longitude":-104.98652896572261,"zoom":4.5,"rotation":0.8141347329615812,"elevation":0},"previous_story":{"visible":true},"show_import_export":true},"stories":[{"id":"1","handle":null,"name":"Story 1","image_visible":true,"below_floor_plenum_height":0,"floor_to_ceiling_height":8,"above_ceiling_plenum_height":0,"multiplier":1,"color":"#8ce","geometry":{"id":"2","vertices":[{"id":"5","x":0,"y":175,"edge_ids":["9","12"]},{"id":"6","x":480,"y":175,"edge_ids":["9","10"]},{"id":"7","x":480,"y":0,"edge_ids":["10","18"]},{"id":"8","x":0,"y":0,"edge_ids":["12","19"]},{"id":"14","x":430,"y":0,"edge_ids":["18","22"]},{"id":"15","x":300,"y":0,"edge_ids":["19","20"]},{"id":"16","x":300,"y":-20,"edge_ids":["20","21"]},{"id":"17","x":430,"y":-20,"edge_ids":["21","22"]}],"edges":[{"id":"9","vertex_ids":["5","6"],"face_ids":["13"]},{"id":"10","vertex_ids":["6","7"],"face_ids":["13"]},{"id":"12","vertex_ids":["8","5"],"face_ids":["13"]},{"id":"18","vertex_ids":["14","7"],"face_ids":["13"]},{"id":"19","vertex_ids":["8","15"],"face_ids":["13"]},{"id":"20","vertex_ids":["15","16"],"face_ids":["13"]},{"id":"21","vertex_ids":["16","17"],"face_ids":["13"]},{"id":"22","vertex_ids":["17","14"],"face_ids":["13"]}],"faces":[{"id":"13","edge_ids":["18","10","9","12","19","20","21","22"],"edge_order":[1,0,0,0,1,1,1,1]}]},"images":[],"spaces":[{"id":"3","handle":null,"name":"Space 1 - 1","face_id":"13","building_unit_id":null,"thermal_zone_id":"24","space_type_id":"25","construction_set_id":null,"pitched_roof_id":null,"daylighting_controls":[],"below_floor_plenum_height":null,"floor_to_ceiling_height":null,"above_ceiling_plenum_height":null,"floor_offset":null,"open_to_below":null,"color":"#8ce","type":"space"}],"shading":[{"id":"4","handle":null,"name":"Shading 1 - 1","face_id":null,"color":"#E8E3E5"}],"windows":[]}],"building_units":[],"thermal_zones":[{"id":"24","handle":null,"name":"Thermal Zone 1","color":"#8ce","type":"thermal_zones"}],"space_types":[{"id":"25","handle":null,"name":"Space Type 1","color":"#8ce","type":"space_types"}],"construction_sets":[],"window_definitions":[],"daylighting_control_definitions":[],"pitched_roofs":[],"version":"0.4.0"};

var floorplan_str = JSON.stringify(floorplan); 

var threejs_str = em_module.floorplanToThreeJS(floorplan_str, false);

var threejs = JSON.parse(threejs_str);

//console.log(threejs);