let Geom = (()=>{
  /*
   * A tiny library containing some geometric functions
   *
   * author: andrewsalveson@gmail.com
   *
   */
  function rectangleCentroid(rect){
    let m1 = midpoint(rect[0],rect[1])
    let m2 = midpoint(rect[2],rect[3])
    return midpoint(m1,m2)
  }
  function midpoint(pt1,pt2){
    return [0,1,2].map(i=>(pt1[i] + pt2[i]) / 2)
  }
  function xzRectangle(x,z,origin=[0,0,0]){
    /*
     * a rectangle consists of an array of 4 points
     *
     */
    return [
      [0.0+origin[0],0.0+origin[1],0.0+origin[2]],
      [0.0+origin[0],0.0+origin[1],z  +origin[2]],
      [x  +origin[0],0.0+origin[1],z  +origin[2]],
      [x  +origin[0],0.0+origin[1],0.0+origin[2]]
    ]
  }
  function transposePoly(poly,vect){
    return poly.map( seg => {
      seg.map( pt => transposePoint(pt,vect))
    })
  }
  function transposePoint(pt,vect){
    return [0,1,2].map( i => pt[i] + vect[i])
  }
  function rectangleArea(rect){
    if(!rect.length == 4) throw new Error('rectangle must have 4 vertices')
    return distance(rect[0],rect[1]) * distance(rect[1],rect[2])
  }
  function segmentsFromPoly(poly){
    let segments = []
    for(let i = 0; i < poly.length - 1; i++){
      segments.push([poly[i], poly[i+1]])
    }
    segments.push([poly[poly.length - 1],poly[0]])
    return segments
  }
  function segmentLength(segment){
    if(segment.length < 2) throw new Error('segment must have 2 vertices')
    return distance(segment[0],segment[1])
  }
  function distance(pt1,pt2){
    if(!pt1) throw new Error('point 1 must be defined')
    if(!pt2) throw new Error('point 2 must be defined')
    return Math.pow(
      (
        Math.pow((pt1[0]-pt2[0]),2)+
        Math.pow((pt1[1]-pt2[1]),2)+
        Math.pow((pt1[2]-pt2[2]),2)
      ),0.5
    )
  }
  function divideSegment(segment,num){
    let pt1 = segment[0]
    let pt2 = segment[1]
    let dist = distance(pt1,pt2)
    let segLen = dist / num
    let range = [0,1,2].map( i => {
      return Math.abs(pt1[i] - pt2[i])
    })

    let segStep = range.map( i => {
      return i / num
    })
    let segments = []
    for(let i = 0; i < num; i++){
      segments.push(
        [segStep.map(s=>i*s),segStep.map(s=>(i*s)+s)]
      )
    }
    return segments
  }
  function scaleLine(line,factor){
    return line.map(p=>scalePoint(p,factor))
  }
  function scalePoint(point,factor){
    return point.map(i=> i * factor)
  }
  function scaleRect(rect,factor){
    return rect.map(p=>scalePoint(p,factor))
  }
  return {
    segmentsFromPoly,
    rectangleCentroid,
    transposePoint,
    rectangleArea,
    divideSegment,
    xzRectangle,
    scaleLine,
    scalePoint,
    scaleRect
  }
})()
