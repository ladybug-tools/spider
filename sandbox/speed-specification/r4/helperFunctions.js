
const buildingShapes =
{
  "Lshape":0,
  "Hshape":1,
  "Tshape":2,
  "Boxshape":3
};

const userChange =
{
  "buildingArea":0,
  "numFloors":1,
  "lengthChange":2,
  "widthChange":3,
  "buildingShape":4,
  "perimeterDepth":5,
  "openings":6,
  "irrevelent":7
};

/// Helper functions

function stringOfBuildingShapeToBuildingShapeEnum(selectedShapeType){

  if (selectedShapeType === "L-Shape")
  {
    return buildingShapes.Lshape
  }
  else if (selectedShapeType === "H-Shape")
  {
    return buildingShapes.Hshape
  }
  else if (selectedShapeType === "T-Shape")
  {
    return buildingShapes.Tshape
  }
  else if (selectedShapeType === "Box-Shape")
  {
    return buildingShapes.Boxshape
  }
  else {
    throw new Error('Cannot convert string '+selectedShapeType+ ' to building shape enum!!')
  }
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r)
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
  ctx.stroke();
}

function makeGridAxis(rotation = 0)
{
    /// TODO  Number ### 4 && 5 ###
    /// Auto-extend grid size.
    // This was my attempt to get the grid size to auto extend by computing the bounding box of the qLine.group (The building) and the adjacent buildings

    scene.remove(gridHelper)

    var axis = scene.getObjectByName("axis");
    scene.remove( axis );

    var sceneBbox = null;
    var theBuildingbbox = getCompoundBoundingBox(qLine.group);
    var adjacentBuildingsbbox = getCompoundBoundingBox(adjacentBuildingsGeometry.group);
    //
    // sceneBbox = theBuildingbbox;
    // // The bounding box of the buildings and adjacent buildings
    //
    // sceneBbox = sceneBbox.union(adjacentBuildingsbbox);

    // let gridSize
    //
    // if (sceneBbox.max.x-sceneBbox.min.x > sceneBbox.max.y-sceneBbox.min.y)
    // {
    //   gridSize = sceneBbox.max.x-sceneBbox.min.x
    // }
    // else
    // {
    //   gridSize = sceneBbox.max.y-sceneBbox.min.y
    // }
    // Make grid axis

    // Create the Grid Helper
    gridHelper = new THREE.GridHelper(200, 50);
    gridHelper.rotation.x = 0.5 * Math.PI;
    gridHelper.name = "helper";
    gridHelper.start = 1;

    scene.g_scale = 1;
    scene.add(gridHelper);

    function make3Daxis(size,offsetOrigin)
    {
      /// This function makes the X,Y,Z axis

      /// TODO  Number ### 1 & 3 ### This function draws a 3D axis, on the axis we also want x,y and z denoted with 3D text
      /// These axis symbols must also be facing the user also Change axis symbols to 3D letters as well (x,y,z),
      /// such that they always face the user and stay in the same place relative to the end of the axis arrow.

      var loader = new THREE.FontLoader();

      offsetOrigin = 0;

      axis = {}
      axis.group = new THREE.Group();
      axis.group.name = "axis"
      // Taken from: http://osa1.net/posts/2013-04-17-THREEjs-axis-helper.html
      // Nice work Ben for finding this!!!
      height = size
      radius = size*0.03
      arrowGeometry = new THREE.CylinderGeometry(0, size/15, size/8)
      // Red
      xAxisMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000})
      xAxisGeometry = new THREE.CylinderGeometry(radius, radius, height)
      xAxisMesh     = new THREE.Mesh(xAxisGeometry, xAxisMaterial)
      xArrowMesh    = new THREE.Mesh(arrowGeometry, xAxisMaterial)
      xAxisMesh.add(xArrowMesh)
      xArrowMesh.position.y += height / 2
      xAxisMesh.rotation.z  -= 90 * Math.PI / 180
      xAxisMesh.position.x  += height / 2
      // Move the edge
      xAxisMesh.translateX( offsetOrigin*1.8)
      xAxisMesh.translateY( offsetOrigin*1.8)
      xAxisMesh.translateY(2*-offsetOrigin*1.8)
      axis.group.add(xAxisMesh)

      // xLabel.position.set(xAxisMesh.position.x,xAxisMesh.position.y,xAxisMesh.position.z-10)
      // xLabel.z = 0;
      //axis.group.add(xLabel)
      arrowGeometry = new THREE.CylinderGeometry(0, size/15, size/8)
      // Lime
      yAxisMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00})
      yAxisGeometry = new THREE.CylinderGeometry(radius, radius, height)
      yAxisMesh     = new THREE.Mesh(yAxisGeometry, yAxisMaterial)
      yArrowMesh    = new THREE.Mesh(arrowGeometry, yAxisMaterial)
      yAxisMesh.add(yArrowMesh)
      yArrowMesh.position.y += height / 2
      yAxisMesh.position.y += height / 2
      yAxisMesh.translateX(offsetOrigin*1.8)
      yAxisMesh.translateY(-offsetOrigin*1.8)
      yAxisMesh.translateX(2*-offsetOrigin*1.8)
      axis.group.add(yAxisMesh)
      arrowGeometry = new THREE.CylinderGeometry(0, size/15, size/8)
      // Blue
      zAxisMaterial = new THREE.MeshBasicMaterial({color: 0x0000FF})
      zAxisGeometry = new THREE.CylinderGeometry(radius, radius, height)
      zAxisMesh     = new THREE.Mesh(zAxisGeometry, zAxisMaterial)
      zArrowMesh    = new THREE.Mesh(arrowGeometry, zAxisMaterial)
      zAxisMesh.add(zArrowMesh)
      zAxisMesh.rotation.x  += 90 * Math.PI / 180
      zArrowMesh.position.y += height / 2
      zAxisMesh.position.z  += height / 2
      zAxisMesh.translateZ(offsetOrigin*1.8)
      zAxisMesh.translateX(offsetOrigin*1.8)
      zAxisMesh.translateX(2*-offsetOrigin*1.8)
      axis.group.add(zAxisMesh)
      scene.add(axis.group)

      var option    = { fontsize: 150 };

      var text_w = drawImageSprite( "W", 20);
      var text_e = drawImageSprite( "E", 20);
      var text_n = drawImageSprite( "N", 20);
      var text_s = drawImageSprite( "S", 20);
      
      var axis   = scene.getObjectByName("axis");
      var axis_x = drawImageSprite( "X", 10);
      var axis_y = drawImageSprite( "Y", 10);
      var axis_z = drawImageSprite( "z", 10);
      var a_gap  = 8;

      text_w.name   = "text_w";
      text_e.name   = "text_e";
      text_n.name   = "text_n";
      text_s.name   = "text_s";

      text_w.position.set(-100, 0, 0);
      text_e.position.set(100, 0, 0);
      text_n.position.set(0, 100, 0);
      text_s.position.set(0, -100, 0);

      axis_x.position.copy(xAxisMesh.position);
      axis_x.position.x += height / 2 + a_gap;
      axis_x.position.z = 5;

      axis_y.position.copy(yAxisMesh.position);
      axis_y.position.y += height / 2 + a_gap;
      axis_y.position.z = 5;

      axis_z.position.copy(zAxisMesh.position);
      axis_z.position.z += height / 2 + a_gap;

      scene.add( text_w );
      scene.add( text_e );
      scene.add( text_n );
      scene.add( text_s );
      
      axis.add( axis_x );
      axis.add( axis_y );
      axis.add( axis_z );
    }

    make3Daxis(50,50);
}

// draw image sprite
function drawImageSprite(message, scale)
{
    var img_path, spriteMaterial, sprite;

    spriteMaterial = new THREE.SpriteMaterial( { map: new THREE.ImageUtils.loadTexture("images/" + message + ".png"), transparent: false, alphaTest : 0.01} );
    sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(scale, scale, scale);

    return sprite;
}

// draw 2D particle text
function makeTextSprite( message, parameters )
{
    if ( parameters === undefined ) parameters = {};
    var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
    var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
    var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
    var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };

    var canvas = document.createElement('canvas');
        canvas.width = 150;
        canvas.height = 180;
    var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;
    var metrics = context.measureText( message );
    var textWidth = metrics.width;

    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;
    context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
    context.fillText( message, borderThickness, fontsize + borderThickness);

    var texture = new THREE.Texture(canvas) 
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial( { map: texture, transparent : false, alphaTest : 0.5} );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(0.15 * fontsize, 0.15 * fontsize, 0.15 * fontsize);
    return sprite;  
}

/*
* Get the size of the compound object by computing the bounding box and getting the max/min of each of its children
  Taken from: https://github.com/mrdoob/three.js/issues/581
*/
function getCompoundBoundingBox(object3D) {
    var box = null;
    object3D.traverse(function (obj3D) {
        var geometry = obj3D.geometry;
        if (geometry === undefined) return;
        geometry.computeBoundingBox();
        if (box === null) {
            box = geometry.boundingBox;
        } else {
            box.union(geometry.boundingBox);
        }
    });
    return box;
}

function drawNSEW() {

    // TODO ### Number 2 ### this function draws the boxes which are North,South,East,West which we need replaced with real 3d Text
    // also see the other TODO for number two which is placed in the drawVisualizations.js page

    directions = {}
    directions.group = new THREE.Group();
    directions.group.name = "directions"

    var directionsToRemove  = scene.getObjectByName("directions");
    scene.remove(directionsToRemove);

    const geometryN = new THREE.BoxGeometry( 217, 217, 217 );
    geometryN.translate( 0, qLine.width, qLine.height );

    const geometryE = new THREE.BoxGeometry( 17, 17, 17 );
    geometryE.translate( qLine.length, 0, qLine.height );

    const geometryW = new THREE.BoxGeometry( 17, 17, 17 );
    geometryW.translate( -qLine.length, 0, qLine.height );

    const geometryS = new THREE.BoxGeometry( 17, 17, 17 );
    geometryS.translate( 0, -qLine.width, qLine.height);

    materialN = new THREE.MeshBasicMaterial( { map: north } );

    materialE = new THREE.MeshBasicMaterial( { map: east } );

    materialS = new THREE.MeshBasicMaterial( { map: south } );

    materialW = new THREE.MeshBasicMaterial( { map: west } );

    const meshN = new THREE.Mesh( geometryN, materialN);
    meshN.name = "north"

    const meshE = new THREE.Mesh( geometryE, materialE);
    meshN.name = "east"

    const meshW = new THREE.Mesh( geometryW, materialE);
    meshN.name = "west"

    const meshS = new THREE.Mesh(geometryS, materialS);
    meshN.name = "south";

    directions.group.add(meshE)
    directions.group.add(meshN)
    directions.group.add(meshW)
    directions.group.add(meshS)

    scene.add(directions.group)
}

function draw2Dtext(message,size,positionx,positiony,positionz,obj,rotation = 0,color = 'black'){

  var loader = new THREE.FontLoader();

  var text;

  loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font,text ) {

    var xMid;

    var textShape = new THREE.BufferGeometry();

    var matLite = new THREE.MeshBasicMaterial( {
      color: color,
      transparent: false,
      opacity: 0.4,
      side: THREE.DoubleSide
    } );

    var shapes = font.generateShapes( message, size, 2 );

    var geometry = new THREE.ShapeGeometry( shapes );

    geometry.computeBoundingBox();

    xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

    geometry.translate( xMid, 0, 0 );

    // make shape ( N.B. edge view not visible )

    textShape.fromGeometry( geometry );

    text = new THREE.Mesh( textShape, matLite );
    text.rotation.z = rotation;
    text.name = "2Dtext";

    text.position.x = positionx;
    text.position.y = positiony;
    text.position.z = positionz;

    obj.add(text);
  } ); //end load function
}
