var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };
var v2 = function( x, y ){ return new THREE.Vector2( x, y ); };
var pi = Math.PI;
const d2r = pi / 180, r2d = 180 /pi;

var buildingArea,numFloors;

var length,width;

var widthMin,widthMax;

var lengthMin,lengthMax;

var thickness;

var calculatedFloorArea;

//// TODO Number 6 //// - will take place somewhere in this page - we need to take wall for each orientation and offset a N,S,W,E symbol from it

function updateDimensions(values) {
  // Update the building dimensions
  // Update the building
  theBuilding.orientation = parseInt( inpOrientation.value, 10 );
  theBuilding.perimeterDepth = parseInt( inpPerimeterDepth.value, 10 );

  // Update the sliders seen in the html document
  outLength.value = values.length
  outWidth.value = values.width
  outFloorArea.value = Math.round(buildingArea/numFloors,2)

  opacityOut.value = parseFloat(inpOpacity.value/100)

  // Display thickness
  divValidation.innerHTML =
  '<b>thickness:'+thickness+'</b><br>' +
  '';

  qLine.height = parseInt( inpHeight.value, 10 );
  qLine.perimeterDepth = theBuilding.perimeterDepth

  qLine.wwr = theBuilding.wwr;

  qLine.orientation = theBuilding.orientation
  qLine.opacity = parseInt( inpOpacity.value, 10 ) / 100;
  qLine.storeys = numFloors
  qLine.edges = null;
  spaceLayout.edges = null;

  qLine.length = values.length
  qLine.width = values.width
  qLine.thickness = thickness

  materialParameters = { color: 0xffffff * Math.random(), opacity: qLine.opacity, side: 2, transparent: true };
  const choices = [ drawBox, drawL, drawT, drawH ];
  const choice = choices[ selShape.selectedIndex ];

  qLine.polygonVertices = choice();
  new Promise(function(resolve,reject)
  {
    updateGeometry(resolve,reject);
  })
  .then(function(values)
  {
    toggleEdges();
  })
  // Keep edges on permanetly
}

function updateGeometry(resolve,reject) {

  scene.remove( qLine.group );
  if ( qLine.group ) {
    qLine.group.traverse( function ( child ) {
      if ( child.geometry ) {
        child.geometry.dispose();
        child.material.dispose();
      }
      if ( child.texture ) { child.texture.dispose(); }
    } );
  }

  qLine.group = new THREE.Group();
  qLine.group.name = "theBuilding"
  qLine.group.userData.openings = [];
  const vertices = qLine.polygonVertices;

  const verticesOffset = offsetPoints( qLine.group, vertices, -qLine.perimeterDepth, 0 );

  qLine.group.rotation.z = - qLine.orientation * Math.PI / 180;

  for ( var i = 0; i < qLine.storeys; i++ ) {
    const storey = new THREE.Group();
    storey.name = 'storey-' + i;
    storey.userData.floorNum = i

    // draw interior floor & ceiling
    drawInteriorFloorCeiling(verticesOffset,storey)

    drawVerticalShapes( verticesOffset, storey );

    drawPerimeterFloor( vertices, verticesOffset, storey);
    drawVerticalBisectors( vertices, verticesOffset, storey);
    drawExteriorWalls( vertices, storey, storey);

    drawPerimeterRoofCeiling( vertices, verticesOffset, storey)

    /// Center the geometry
    storey.position.z = i *qLine.height;
    storey.position.x = qLine.length / -2;
    storey.position.y = qLine.width / -2;

    //For external roofs
    if (i == qLine.storeys-1)
    {
      // Draw roof the roof for gbxml export
      //drawDimensions(storey)
    }

    qLine.group.add( storey );
  }

  scene.add(qLine.group);

  return resolve();
}

function drawInteriorFloorCeiling(verticesOffset,storey)
{
  const shape = new THREE.Shape( verticesOffset );
  const geometryShape = new THREE.ShapeBufferGeometry( shape );
  materialParameters.color = 0x80ffff;
  const material = new THREE.MeshPhongMaterial( materialParameters );
  const meshShape = new THREE.Mesh( geometryShape, material );
  meshShape.position.z = 0;
  meshShape.name = 'interior-floor'+'-'+storey.name

  meshShape.userData.floorNum = storey.userData.floorNum

  meshShape.userData.zone = meshShape.userData.floorNum

  theBuilding.numberOfZones +=1;

  storey.add( meshShape );

  const shapeCeiling = new THREE.Shape( verticesOffset );
  const geometryShapeCeiling = new THREE.ShapeBufferGeometry( shapeCeiling );
  // Light coral color
  materialParameters.color = 0xff8080;
  const materialCeiling = new THREE.MeshPhongMaterial( materialParameters );
  const meshShapeCeiling = new THREE.Mesh( geometryShapeCeiling, materialCeiling );
  meshShapeCeiling.position.z = qLine.height;
  meshShapeCeiling.name = 'interior-ceiling'+'-'+storey.name

  storey.add( meshShapeCeiling );
}

// now all geometry created and in position, so read local data, transform to world, and add as text to items;
function addAngles() {
  qLine.group.updateMatrixWorld( true );
  for ( var i = 0; i < qLine.group.children.length; i++ ) {
    storey = qLine.group.children[ i ];
      //console.log( 'storey',  storey );
    for ( let j = 0; j < storey.children.length; j++ ) {
      item = storey.children[ j ];
      if ( item instanceof THREE.Group  ) {
          //console.log( '', item.getWorldQuaternion() );
        angle = Math.round( - item.getWorldRotation().z * 180 / Math.PI );
        angle = angle < 0 ? angle + 360 : angle;
        item.userData.angle = angle;
        if ( storey.name === 'storey-0' && item.name.startsWith( 'wall-' ) ) {
          drawText( item );
          //console.log( 'item', item.name, angle );
        }
      }
    }
  }
}

  function setWallWindowPropertys(surfaceAngle)
  {
    // Convert from negative number to 0 to 360
    if (surfaceAngle < 0)
    {
      surfaceAngle = Math.abs(surfaceAngle)+180
    }

    if (theBuilding.wwr != null)
    {
      // Building level WWR
      windowToWallRatio = theBuilding.wwr;
      numOfWindows = theBuilding.noWindows;
      windowRatio = theBuilding.windowRatio;
      overhangDepth = theBuilding.overHangDepth

      finDepth = theBuilding.finDepth
    }
    else
    {
      // Facade level WWR
      if ((surfaceAngle <= 45 && surfaceAngle >= 0) || (surfaceAngle <= 359 && surfaceAngle >= 315))
      {
        // North
        windowToWallRatio = theBuilding.wwrN

        numOfWindows = theBuilding.noWindowsN
        windowRatio = theBuilding.windowRatioN
        overhangDepth = theBuilding.overhangDepthN
        finDepth = theBuilding.finDepthN

      }
      else if (surfaceAngle <= 135 && surfaceAngle > 45)
      {

        // West
        windowToWallRatio = theBuilding.wwrW

        numOfWindows = theBuilding.noWindowsW
        windowRatio = theBuilding.windowRatioW

        overhangDepth = theBuilding.overhangDepthW
        finDepth = theBuilding.finDepthW
      }
      else if (surfaceAngle <= 225 && surfaceAngle > 135)
      {
        // South
        windowToWallRatio = theBuilding.wwrS

        numOfWindows = theBuilding.noWindowsS
        windowRatio = theBuilding.windowRatioS

        overhangDepth = theBuilding.overhangDepthS
        finDepth = theBuilding.finDepthS

      }
      else if (surfaceAngle < 315 && surfaceAngle > 226)
      {

        // East
        windowToWallRatio = theBuilding.wwrE
        numOfWindows = theBuilding.noWindowsE
        windowRatio = theBuilding.windowRatioE

        overhangDepth = theBuilding.overhangDepthE
        finDepth = theBuilding.finDepthE

      }
      else {
        throw new Error('Invalid angle')
      }
    }

    return {wwr:windowToWallRatio,noWindows:numOfWindows,windowRatio:windowRatio,overhangDepth:overhangDepth,finDepth:finDepth}
  }

  function drawVerticalShapes( vertices, obj ) {
      // Use interior wall colors
      materialParameters.color = 0x008000;
      const material = new THREE.MeshPhongMaterial( materialParameters );
      const walls = new THREE.Group();
      walls.name = 'interior-walls';
      for ( let i = 0; i < vertices.length - 1; i++ ) {
        const vertex = vertices[ i ];
        const vertexNext = i < vertices.length - 1 ? vertices[ i + 1 ] : vertices[ 0 ];
        const angleVector = vertexNext.clone().sub( vertex ).normalize();
        const angleRadians = Math.atan2( angleVector.y, angleVector.x );
        const length = vertex.distanceTo( vertexNext );
        const verticesShape = [ v2( 0, 0 ), v2( length, 0 ), v2( length, qLine.height ), v2( 0, qLine.height ) ];
        const shape = new THREE.Shape( verticesShape );
        const geometryShape = new THREE.ShapeBufferGeometry( shape );
        geometryShape.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
        const meshShape = new THREE.Mesh( geometryShape, material );
        meshShape.position.copy( vertex );
        meshShape.rotation.z = angleRadians;
        meshShape.name = 'interior-wall' + i;
        walls.add( meshShape );
      }

      obj.add(walls)
    }

    /// TODO  Number 2 I suggest that you take one of the exterior walls surface for each orientation and offset the N,S,W,E letters from therefore
    

  function drawExteriorWalls( vertices, obj) {
    materialParameters.color = 0xFFB400;
    const material = new THREE.MeshPhongMaterial( materialParameters );
    for ( let i = 0; i < vertices.length - 1; i++ ) {

      const vertex = vertices[ i ];

      const vertexNext = i < vertices.length - 1 ? vertices[ i + 1 ] : vertices[ 0 ];
      const angleVector = vertexNext.clone().sub( vertex ).normalize();
      const angleRadians = Math.atan2( angleVector.y, angleVector.x );
      var wallSurfaceAngle = angleRadians*(180/ Math.PI );

      const length = vertex.distanceTo( vertexNext );

      windowProperties = setWallWindowPropertys(wallSurfaceAngle)

      const wall = drawOpenings( length, obj,windowProperties.wwr,windowProperties.noWindows,windowProperties.windowRatio);
      wall.name = 'wall-' + i;
      wall.position.copy( vertex );
      wall.rotation.z = angleRadians;
      wall.userData.length = length;

      wall.userData.lengthDelta = length / windowProperties.noWindows;
      drawOverhangs( length, wall, windowProperties.overhangDepth,windowProperties.wwr);
      drawFins( length, wall, windowProperties.finDepth,windowProperties.wwr);
      if ( obj.name === 'storey-0' ) {
      //				drawText( wall );
      }
      obj.add( wall );
    }
  }

  function drawOpenings( length, obj,surfaceWindowToWallRatio,surfaceNumOfWindows,surfaceWindowRatio ) {

    const lengthDelta = length / surfaceNumOfWindows;
    const height = qLine.height;
    const wwr = surfaceWindowToWallRatio;
    const windowRatio = surfaceWindowRatio
    const hgt05 = qLine.height * 0.5;
    let holes = [];
    const wall = new THREE.Group();
    //single shape with multiple openings??
    const len05 = qLine.length * 0.5;

    verticesWall = [
      v( 0, 0, 0 ),
      v( length, 0, 0 ),
      v( length, height, 0 ),
      v( 0, height, 0 ),
    ];
    const shape = new THREE.Shape( verticesWall );
    const lenD05 = lengthDelta * 0.5;
    const geometryBoundary = new THREE.Geometry();

    geometryBoundary.vertices = [
      v( lenD05, hgt05, 0 ),
      v( -lenD05, hgt05, 0 ),
      v( -lenD05, -hgt05, 0 ),
      v( lenD05, -hgt05, 0 )
    ];

    var windowHeightRatio
    var windowWidthRatio

    for ( let i = 0; i < windowProperties.noWindows; i++ ) {

      let maxWindowArea = lengthDelta*height * wwr
      let maxWindowBorderVertical = (1.0 - wwr) * height
      let windowHeight = height - (maxWindowBorderVertical * windowRatio)
      let windowWidth = maxWindowArea / windowHeight

      windowWidthRatio = windowWidth/lengthDelta
      windowHeightRatio = windowHeight/height

      const geometryOpening = geometryBoundary.clone().scale(windowWidthRatio,windowHeightRatio,1);

      // // Area check - changing window Ratio should keep area consistent
      // geometryX = geometryOpening.vertices[0].x - geometryOpening.vertices[2].x
      // geometryY = geometryOpening.vertices[0].y - geometryOpening.vertices[2].y
      //
      // area = geometryX*geometryY
      // console.log(area)

      geometryOpening.translate( i * lengthDelta + lenD05, hgt05, 0 );
      const verticesOpening = geometryOpening.vertices;
      const hole = new THREE.Path();
      hole.setFromPoints( verticesOpening );
      shape.holes.push( hole );
      holes.push( verticesOpening );
    }

    geometryShape = new THREE.ShapeBufferGeometry( shape );
    geometryShape.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
    // Use Exterior wall color
    materialParameters.color = 0xFFB400;
    const material = new THREE.MeshPhongMaterial( materialParameters );
    const meshWall = new THREE.Mesh( geometryShape, material );
    meshWall.userData.lengthDelta = lengthDelta;
    meshWall.userData.holes = holes;

    meshWall.userData.windowWidthRatio = windowWidthRatio

    meshWall.userData.windowHeightRatio = windowHeightRatio
    wall.add( meshWall );
    return wall;
  }

  function drawOverhangs( length, obj,overhangDepth,surfaceWWR ) {

    if ( overhangDepth < 0.5 ) { return; }
    const wwr = surfaceWWR;
    materialParameters.color = 0xffce9d;
    const material = new THREE.MeshPhongMaterial( materialParameters );

    for ( let i = 0; i < obj.children[ 0 ].userData.holes.length; i++ ) {

      const lengthDelta = obj.userData.lengthDelta;
      const windowWidthRatio = obj.children[0].userData.windowWidthRatio
      const windowHeightRatio = obj.children[0].userData.windowHeightRatio

      const geometry = new THREE.PlaneBufferGeometry( lengthDelta * windowWidthRatio, overhangDepth );
      const mesh = new THREE.Mesh( geometry, material );
      mesh.name = 'overhang-' + i;
      mesh.position.set( i * lengthDelta + 0.5 * lengthDelta, overhangDepth * 0.5, qLine.height * 0.5 + qLine.height * 0.5  * windowHeightRatio );
      obj.add( mesh );
    }
  }

  function drawFins( length, obj,finDepth,surfaceWWR) {

    if ( finDepth < 0.5 ) { return; }
    const wwr = surfaceWWR;
    materialParameters.color = 0xffce9d;

    const material = new THREE.MeshPhongMaterial( materialParameters );
    for ( let i = 0; i < obj.children[ 0 ].userData.holes.length; i++ ) {
      const lengthDelta = obj.userData.lengthDelta;

      const windowHeightRatio = obj.children[0].userData.windowHeightRatio
      const windowWidthRatio = obj.children[0].userData.windowWidthRatio

      const geometry = new THREE.PlaneBufferGeometry( qLine.height * windowHeightRatio, finDepth );
      geometry.rotateY( Math.PI / 2 );
      const mesh = new THREE.Mesh( geometry, material );
      mesh.position.set( i * lengthDelta + lengthDelta * 0.5 * windowWidthRatio + lengthDelta / 2, finDepth * 0.5, qLine.height * 0.5 );
      mesh.name = 'fin-1-' + i;
      obj.add( mesh );
      const mesh2 = mesh.clone();
      mesh2.position.set( i * lengthDelta - lengthDelta * 0.5 * windowWidthRatio + lengthDelta / 2, finDepth * 0.5, qLine.height * 0.5  );
      mesh.name = 'fin-2-' + i;
      obj.add( mesh2 );
      //spaceLayoutObj.add(mesh)
      //spaceLayoutObj.add(mesh2)
    }
  }

  function drawPerimeterFloor( vertices1, vertices2, obj ) {
    // Interior floor color

    materialParameters.color = 0x80ffff;
    const material = new THREE.MeshPhongMaterial( materialParameters );
    for ( var i = 0; i < vertices1.length - 1 ; i++ ) {
      const verticesShape = [
        vertices1[ i ],
        vertices2[ i ],
        vertices2[ i + 1 ],
        vertices1[ i + 1 ]
      ];
      const shape = new THREE.Shape( verticesShape );
      const geometryShape = new THREE.ShapeBufferGeometry( shape );
      const meshShape = new THREE.Mesh( geometryShape, material );
      // For each floor the first zone is the interior floor zone
      j=i+1;
      meshShape.name = 'floor-' + j+'-'+obj.name;
      // The zone that this surface belongs to
      meshShape.userData.zone = j;

      theBuilding.numberOfZones +=1;

      obj.add( meshShape );
      //spaceLayoutObj.add(meshShape)
    }
  }

  function drawPerimeterRoofCeiling( vertices1, vertices2, obj ) {
    // Roof color

    materialParameters.color = 0xff8080;
    const material = new THREE.MeshPhongMaterial( materialParameters );
    for ( var i = 0; i < vertices1.length - 1 ; i++ ) {
      const verticesShape = [
        vertices1[ i ],
        vertices2[ i ],
        vertices2[ i + 1 ],
        vertices1[ i + 1 ]
      ];

      const shape = new THREE.Shape( verticesShape );
      const geometryShape = new THREE.ShapeBufferGeometry( shape );
      const meshShape = new THREE.Mesh( geometryShape, material );
      meshShape.position.set(0,0,qLine.height)
      meshShape.name = 'ceiling-' + i+'-'+obj.name;
      obj.add( meshShape );
    }
  }

  function drawVerticalBisectors( vertices1, vertices2, obj) {
    materialParameters.color = 0x008000;
    const material = new THREE.MeshPhongMaterial( materialParameters );
    const materialSpaceLayout = new THREE.MeshPhongMaterial({wireframe: true});
    for ( let i = 0; i < vertices1.length - 1; i++ ) {
      const vertex1 = vertices1[ i ];
      const vertex2 = vertices2[ i ];
      const angleVector = vertex2.clone().sub( vertex1 );
      const angleRadians = Math.atan2( angleVector.y, angleVector.x );
      const length = vertex1.distanceTo( vertex2 );
      const verticesShape = [ v2( 0, 0 ), v2( length, 0 ), v2( length, qLine.height ), v2( 0, qLine.height ) ];
      const shape = new THREE.Shape( verticesShape );
      const geometryShape = new THREE.ShapeBufferGeometry( shape );
      geometryShape.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
      const meshShape = new THREE.Mesh( geometryShape, material );
      meshShape.position.copy( vertex1 );
      meshShape.rotation.z = angleRadians;
      meshShape.name = 'diagonal-' + i;
      obj.add( meshShape );
      //spaceLayoutObj.add(meshShape);
    }
  }

  function offsetPoints( obj, points, offsetX, offsetY  = 0 ) {
    // 2017-11-17
      let lines = [];
      for ( let i = 0; i < points.length - 1; i++ ) {
        let pt1 = points[ i ];
        let pt2 = points[ i + 1 ];
        const angleVector = pt2.clone().sub( pt1 );
        const angle = Math.atan2( angleVector.y, angleVector.x );
    // redo with THREE.Spherical?
    // https://stackoverflow.com/questions/11039841/how-to-draw-parallel-line-using-three-js
    // https://stackoverflow.com/questions/43229743/offset-mesh-in-three-js
        const offsetPt1 = v( pt1.x - offsetX * Math.cos( angle - Math.PI / 2 ), pt1.y + offsetX * Math.sin( angle + Math.PI / 2 ), 0 );
        const offsetPt2 = v( pt2.x - offsetX * Math.cos( angle - Math.PI / 2 ), pt2.y + offsetX * Math.sin( angle + Math.PI / 2 ), 0 );
        const line = new THREE.Line3( offsetPt1, offsetPt2 );
        lines.push( line );
      }
    // if first and last point close, deal with it
      if ( points[ 0 ].distanceTo( points[ points.length - 1 ] ) < 0.01 ) {
        pt1 = intersectionTwoLines( lines[ 0 ], lines [ lines.length - 1 ] );
        pt2 = pt1;
      } else {
        pt1 = lines[ 0 ].start;
        pt2 = lines[ lines.length - 1 ].end;
      }
      const pointsOffset = [ v( pt1.x, pt1.y, offsetY ) ];
      for ( let i = 0; i < lines.length - 1; i++ ) {
        const pt = intersectionTwoLines( lines[ i ], lines [ i + 1 ] );
        pointsOffset.push( v( pt.x, pt.y, offsetY ) );
      }
      pointsOffset.push( pt2 );
      return pointsOffset;
    }

    function intersectionTwoLines( line1, line2 ) {
      // Use Three.js Ray?
      // 2016-02-10
      // Thanks to http://jsfiddle.net/justin_c_rounds/Gd2S2/ && http://jsfiddle.net/user/justin_c_rounds/fiddles/
      const line1start = line1.start;
      const line1end = line1.end;
      const line2start = line2.start;
      const line2end = line2.end;
      const denominator =
        ( line2end.y - line2start.y ) * ( line1end.x - line1start.x )
        - ( line2end.x - line2start.x ) * ( line1end.y - line1start.y );
      if ( denominator == 0 ) { return; }
      const a =
        ( ( line2end.x - line2start.x ) * ( line1start.y - line2start.y )
        - ( line2end.y - line2start.y ) * ( line1start.x - line2start.x ) ) / denominator;
      const x = line1start.x + ( a * ( line1end.x - line1start.x ) );
      const y = line1start.y + ( a * ( line1end.y - line1start.y ) );
      return new THREE.Vector3( x, y, 0 );
    }

    function toggleEdges() {

      // return;
      // Build edges for qLine and SpaceLayout
      if ( !qLine.edges ) {
        qLine.group.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
            const edgesGeometry = new THREE.EdgesGeometry( child.geometry );

            qLine.edges = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } ) );
            qLine.edges.visible = false;
            qLine.edges.position.z = qLine.edges.position.z + 0.1;
            qLine.renderOrder = 1;
            child.add( qLine.edges );

            // var line = new THREE.WireframeLine( child.geometry, new THREE.LineBasicMaterial() );
            // scene.add( line );
            
          }
        } );
      }

      qLine.group.traverse( function ( child ) {
        if ( child instanceof THREE.LineSegments ) {
          child.visible = child.visible === true ? false : true;
        }
      } );
    }

