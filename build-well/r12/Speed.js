let Speed = (()=>{
  /*
   *
   */
  function windowVertices(length,height,wwr,windowCount,horizontality=0.5){
    return this.f2w(length,height,wwr,windowCount,horizontality).map( window => {
      // Loop through each window

      windowVertices = window.map( point =>
        { // Convert each Array to a v2 point
          // work with x and z vertices.
          return v2(point[0],point[2])
        })
      return windowVertices
    })
  }
  // this function creates the window geometry using the library Andrew created with no geometry dependencies
  // The library is under Geom.js
  function f2w(wallWidth,floor2floor,wwr,windowCount,horizontality){
    let wall = Geom.xzRectangle(wallWidth,floor2floor)
    //console.log("This is wall")
    //console.log(wall)
    let segments = Geom.segmentsFromPoly(wall)
    //console.log("This is segments")
    //console.log(segments)
    return Geom.divideSegment(segments[3],windowCount).map( segment => {
      let segOrigin = segment[0]
      let windowZoneWidth = wallWidth / windowCount
      let windowZone = Geom.xzRectangle(windowZoneWidth,floor2floor,segOrigin)
      let windowCentroid = Geom.rectangleCentroid(windowZone)
      let windowZoneArea = Geom.rectangleArea(windowZone)
      let maxWindowBorderVertical = (1.0 - wwr) * floor2floor
      let windowHeight = floor2floor - (maxWindowBorderVertical * horizontality)
      let maxWindowArea = windowZoneArea * wwr
      let windowWidth = maxWindowArea / windowHeight
      let windowOrigin = Geom.transposePoint(windowCentroid,[-(windowWidth/2),0,-(windowHeight/2)])
      return Geom.xzRectangle(windowWidth,windowHeight,windowOrigin)
    })
  }

  return {
    f2w,
    windowVertices
  }
})()
