// The possible building shapes

function drawBox() {
  const len = qLine.length;
  const wid = qLine.width;

  const verticesBox = [ v( len, 0, 0 ), v( 0, 0, 0 ), v( 0, wid, 0 ), v( len, wid, 0 ), v( len, 0, 0 ) ];

  return verticesBox;
}
function drawL() {
  const len = qLine.length;
  const wid = qLine.width;
  const thk = qLine.thickness;
  const verticesL = [
    v( len, 0, 0 ),
    v( 0, 0, 0 ),
    v( 0, wid, 0 ),
    v( thk, wid, 0 ),
    v( thk, thk, 0 ),
    v( len, thk, 0 ),
    v( len, 0, 0 )
  ];

  return verticesL;
}
function drawT() {
  const len = qLine.length;
  const wid = qLine.width;
  const thk = qLine.thickness;
  const verticesT = [
    v( len, 0, 0 ),
    v( 0, 0, 0 ),
    v( 0, thk, 0 ),
    v( 0.5 * ( len - thk ), thk, 0 ),
    v( 0.5 * ( len - thk ), wid, 0 ),
    v( len - 0.5 * ( len - thk ), wid, 0 ),
    v( len - 0.5 * ( len - thk ), thk, 0 ),
    v( len, thk, 0 ),
    v( len, 0, 0 )
  ];

  return verticesT;
}
function drawH() {
  const len = qLine.length;
  const wid = qLine.width;
  const thk = qLine.thickness;
  const verticesH = [
    v( len - thk, 0.5 * ( wid - thk ), 0 ),
    v( thk, 0.5 * ( wid - thk ), 0 ),
    v( thk, 0, 0 ),
    v( 0, 0, 0 ),
    v( 0, wid, 0 ),
    v( thk, wid, 0 ),
    v( thk, wid - 0.5 * ( wid - thk ), 0 ),
    v( len - thk, wid - 0.5 * ( wid - thk ), 0 ),
    v( len - thk, wid, 0 ),
    v( len, wid, 0 ),
    v( len, 0, 0 ),
    v( len - thk, 0, 0 ),
    v( len - thk, 0.5 * ( wid - thk ), 0 )
  ];

  return verticesH;
}
