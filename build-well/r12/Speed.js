class Shape{
  constructor(a){
    
    // check for required arguments
    ['area','floors'].map(k=>{
      if(!a[k]){
        throw new Error(`missing required value for ${k}`)
      }
    })
    
    // set required parameters
    this.area = a.area
    this.floors = a.floors
    
    // build params from optional args
    this.xM     = a.xM     || 1
    this.xMinM  = a.xMinM  || this.xM
    this.xMaxM  = a.xMaxM  || this.xM
    this.xMinC  = a.xMinC  || 2/3
    this.xMaxC  = a.xMaxC  || 2
    this.yM     = a.yM     || this.xM
    this.yMaxC1 = a.yMaxC1 || this.yM
    this.yMaxC2 = a.yMaxC2 || this.yM
    this.kM     = a.kM     || 1
  }
  A(){
    return this.area * this.floors
  }
  x(){
    return Math.pow( this.A() * this.xM, 0.5 )
  }
  xMin(){
    return this.xMinC * Math.pow( this.A() * this.xM, 0.5)
  }
  xMax(){
    return this.xMaxC * Math.pow( this.A() * this.xM, 0.5)
  }
  y(){
    return Math.pow( this.A() * this.yM, 0.5 )
  }
  yMin(){
    this.A() / this.x()
  }
  yMax(){
    return this.yMaxC1 * (this.A() / this.x()) + this.yMaxC2 * this.x()
  }
  xRange(){
    return [this.xMin,this.xMax]
  }
  yRange(){
    return [this.yMin(),this.yMax()]
  }
  k(){
    let x = this.x()
    let y = this.y()
    let A = this.A()
    let m = this.kM
    return (x + (m*y))/(m*2) - Math.pow(Math.pow((x + (m*y))/(m*2),2) - (A/m),0.5)
  }
}

class LShape extends Shape{
  constructor(args){
    super({
      ...args,
      xM     : 1.8,
      yMaxC1 : 10,
      xMaxC2 : -0.9,
    })
  }
}

class HShape extends Shape{
  constructor(args){
    super({
      ...args,
      xM     : 9/7,
      yMaxC1 : 5,
      yMaxC2 : -0.4,
      kM     : 2,
    })
  }
}

class TShape extends Shape{
  constructor(args){
    super({
      ...args,
      xM     : 1.8,
      yMaxC1 : 10,
      yMaxC2 : -0.4,
    })
    
  }
}

class BoxShape extends Shape{
  constructor(args){
    super({
      ...args,
      xMinC : 1,
      xMaxC : 1,
      xM    : 1,
      xMinM : 1/10,
      xMaxM : 10,
    })
    
  }
  y(){
    return this.A() / this.x()
  }
}

class Speed{
  constructor(){}
  windowVertices(length,height,wwr,windowCount,horizontality=0.5){
    return this.facadeToWindows(length,height,wwr,windowCount,horizontality).map( window => {
      // Loop through each window
      return window.map( point => {
        // Convert each Array to a v2 point
        // work with x and z vertices.
        return v2(point[0],point[2])
      })
    })
  }
  // this function creates the window geometry using the library Andrew created with no geometry dependencies
  // The library is under Geom.js
  facadeToWindows(wallWidth,floor2floor,wwr,windowCount,horizontality){
    let wall = Geom.xzRectangle(wallWidth,floor2floor)
    let segments = Geom.segmentsFromPoly(wall)
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
}