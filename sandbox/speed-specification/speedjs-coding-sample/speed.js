let Speed = (()=>{

  class Shape{
    constructor( args ){
      
      // check for required arguments
      ['area','floors'].map( key => {
        if( !args[key] ){
          throw new Error(`missing required value for ${k}`)
        }
      })
      
      // set required parameters
      this.area   = args.area
      this.floors = args.floors
      
      // build params from optional args
      this.lengthMult = args.lengthMult || 1
      this.lengthMinM = args.lengthMinM || this.lengthMult
      this.lengthMaxM = args.lengthMaxM || this.lengthMult
      this.lengthMinC = args.lengthMinC || 2/3
      this.lengthMaxC = args.lengthMaxC || 2
      this.widthMult  = args.widthMult  || this.lengthMult
      this.widthMaxC1 = args.widthMaxC1 || this.widthMult
      this.widthMaxC2 = args.widthMaxC2 || this.widthMult
      this.thickMult  = args.thickMult  || 1
    }
    areaTotal(){
      return this.area * this.floors
    }
    length(){
      return Math.pow( this.areaTotal() * this.lengthMult, 0.5 )
    }
    lengthMin(){
      return this.lengthMinC * Math.pow( this.areaTotal() * this.lengthMult, 0.5)
    }
    lengthMax(){
      return this.lengthMaxC * Math.pow( this.areaTotal() * this.lengthMult, 0.5)
    }
    width(){
      return Math.pow( this.areaTotal() * this.widthMult, 0.5 )
    }
    widthMin(){
      return this.areaTotal() / this.length()
    }
    widthMax(){
      return this.widthMaxC1 * (this.areaTotal() / this.length()) + this.widthMaxC2 * this.length()
    }
    lengthRange(){
      return [this.lengthMin(),this.lengthMax()]
    }
    widthRange(){
      return [this.widthMin(),this.widthMax()]
    }
    thickness(args={}){
      let x = args.length || this.length()
      let y = args.width  || this.width()
      let A = this.areaTotal()
      let m = this.thickMult
      return (x + (m*y))/(m*2) - Math.pow(Math.pow((x + (m*y))/(m*2),2) - (A/m),0.5)
    }
  }

  class LShape extends Shape{
    constructor(args){
      super({
        ...args,
        lengthMult  : 1.8,
        widthMaxC1  : 10,
        lengthMaxC2 : -0.9,
      })
    }
  }

  class HShape extends Shape{
    constructor(args){
      super({
        ...args,
        lengthMult : 9/7,
        widthMaxC1 : 5,
        widthMaxC2 : -0.4,
        thickMult  : 2,
      })
    }
  }

  class TShape extends Shape{
    constructor(args){
      super({
        ...args,
        lengthMult : 1.8,
        widthMaxC1 : 10,
        widthMaxC2 : -0.4,
      })
      
    }
  }

  class BoxShape extends Shape{
    constructor(args){
      super({
        ...args,
        lengthMinC : 1,
        lengthMaxC : 1,
        lengthMult : 1,
        lengthMinM : 1/10,
        lengthMaxM : 10,
      })
      
    }
    width(){
      return this.areaTotal() / this.length()
    }
  }

  this.createBoxShape = function(args){
    return new BoxShape(args)
  }
  
  this.createHShape = function(args){
    return new HShape(args)
  }

  this.createLShape = function(args){
    return new LShape(args)
  }

  this.createTShape = function(args){
    return new TShape(args)
  }

  this.windowVertices = function(length,height,wwr,windowCount,horizontality=0.5){
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
  this.facadeToWindows = function(wallWidth,floor2floor,wwr,windowCount,horizontality){
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
  return this
})
