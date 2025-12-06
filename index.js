let version = '0.020'; //commits + 1
//Creates the default config object
function svgdefaults() { 
  //Don't include default JS prototypes
  let conf      = Object.create(null);  //Returns his object
  let grids     = Object.create(null);  //Normal or Radial grid info
  let sizes     = Object.create(null);  //Size information of shape types
  let width     = Object.create(null);  //SVG width
  let height    = Object.create(null);  //SVG height
  let colors    = Object.create(null);  //How many colors to use
  let shapes    = Object.create(null);  //Configuration for shape types
  let strokes   = Object.create(null);  //Stroke configuration of shape types
  let objects   = Object.create(null);  //Defaults for shapes
  let enabled   = Object.create(null);  //What shapes are enabled
  let filters   = Object.create(null);  //Which filters are enabled
  let variants  = Object.create(null);  //TODO
  let duration  = Object.create(null);  //TODO
  let positions = Object.create(null);  //Position information of shape types
  let gradients = Object.create(null);  //How many gradients with how many colors each
  let diagonal  = 'diagonal'; //syntax sugar
  let random    = 'random';   //syntax sugar
  let normal    = 'normal';   //syntax sugar
  let radial    = 'radial';   //syntax sugar
  let fixed     = 'fixed';    //syntax sugar
  let solid     = 'solid';    //syntax sugar
  let color     = '#333';   //default color
  let grid      = 'grid';     //syntax sugar
  let none      = 'none';     //syntax sugar
  let gold      = 'gold';     //syntax sugar
  let lime      = 'lime';     //syntax sugar
  let red       = 'red';      //syntax sugar
  let pink      = 'hotpink';  //syntax sugar
  let black     = 'black';    //syntax sugar
  let white     = 'white';    //syntax sugar
  let scolor    = 'scolor';   //syntax sugar

  grids = { 
    type:  'radial', //true (normal), false, radial or diagonal
    mark:   0, 
    mcolor: pink, 
    start:  { x:0, y:0 }, 
    end:    { x:'width', y:'height' }, 
    dx: 100, 
    dy: 100, 
    r:  500, 
    a:   15, 
  }

  positions = { 
    //Boxes      type:random / grid
    blob:      { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    claw:      { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    cloud:     { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    square:    { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    ellipse:   { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    mountain:  { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    rectangle: { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    //Radials                                                                    //
    circle:    { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    flower:    { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    hexagon:   { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    octagon:   { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    oddagon:   { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    polygon:   { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    dexagon:   { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    randogon:  { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    pentagon:  { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
    triangle:  { type:random,  minx:1,  maxx:400,  miny:1,  maxy:300,},
  }

  sizes     = { 
    //Boxes      type:random / fixed
    blob:      { type:random,  w:0,  h:0,  minw:200,  maxw:900,  minh:100,  maxh:600, },
    claw:      { type:random,  w:0,  h:0,  minw:200,  maxw:900,  minh:100,  maxh:600, },
    cloud:     { type:random,  w:0,  h:0,  minw:200,  maxw:900,  minh:100,  maxh:600, },
    square:    { type:random,  w:0,  h:0,  minw:200,  maxw:900,  minh:100,  maxh:600, },
    ellipse:   { type:random,  w:0,  h:0,  minw:200,  maxw:900,  minh:100,  maxh:600, },
    mountain:  { type:random,  w:0,  h:0,  minw:200,  maxw:900,  minh:100,  maxh:600, },
    rectangle: { type:random,  w:0,  h:0,  minw:200,  maxw:900,  minh:100,  maxh:600, },
    //Radials                                                   //
    circle:    { type:random,        r:0,  minr:100,  maxr:600, },
    flower:    { type:random,        r:0,  minr:100,  maxr:600, },
    hexagon:   { type:random,        r:0,  minr:100,  maxr:600, },
    octagon:   { type:random,        r:0,  minr:100,  maxr:600, },
    oddagon:   { type:random,        r:0,  minr:100,  maxr:600, },
    polygon:   { type:random,        r:0,  minr:100,  maxr:600, },
    dexagon:   { type:random,        r:0,  minr:100,  maxr:600, },
    randogon:  { type:random,        r:0,  minr:100,  maxr:600, },
    pentagon:  { type:random,        r:0,  minr:100,  maxr:600, },
    triangle:  { type:random,        r:0,  minr:100,  maxr:600, },
  }

  strokes = { 
    //Boxes
    blob:      { swidth:    10,  scolor:'#FFCC9966',  opacity:0.1, },
    claw:      { swidth:    10,  scolor:'#99CCFF66',  opacity:1.0, },
    cloud:     { swidth:random,  scolor:'#FFFFFF33',  opacity:1.0, },
    square:    { swidth:     1,  scolor:'#00000099',  opacity:0.5, },
    ellipse:   { swidth:     0,  scolor:'#CC666666',  opacity:1.0, },
    mountain:  { swidth:    10,  scolor:'#6600CC66',  opacity:1.0, },
    rectangle: { swidth:     0,  scolor:'#FF663333',  opacity:1.0, },
    //Radials                                                        //
    circle:    { swidth:random,  scolor:'#99CC9999',  opacity:0.1, },
    flower:    { swidth:     0,  scolor:'#99999966',  opacity:1.0, },
    hexagon:   { swidth:     6,  scolor:'#3399CC66',  opacity:1.0, },
    octagon:   { swidth:     8,  scolor:'#6666FF66',  opacity:1.0, },
    oddagon:   { swidth:random,  scolor:'#33993366',  opacity:1.0, },
    polygon:   { swidth:    10,  scolor:'#3333CC66',  opacity:1.0, },
    dexagon:   { swidth:    10,  scolor:'#CC333366',  opacity:1.0, },
    randogon:  { swidth:random,  scolor:'#CCCC0066',  opacity:1.0, },
    pentagon:  { swidth:     5,  scolor:'#FFFFFF66',  opacity:1.0, },
    triangle:  { swidth:random,  scolor:'#00000033',  opacity:1.0, },
  }

  shapes = {    //TODO: each shape should have config for min max etc.
    //Boxes
    blob:      { count: 0,  max:10,  fill:random,  filter:random,  stroke:strokes.blob,       size:sizes.blob,      }, 
    claw:      { count: 1,  max:10,  fill:random,  filter:random,  stroke:strokes.claw,       size:sizes.claw,      }, 
    cloud:     { count: 1,  max:10,  fill:random,  filter:random,  stroke:strokes.cloud,      size:sizes.cloud,     }, 
    square:    { count: 1,  max:20,  fill:random,  filter:random,  stroke:strokes.square,     size:sizes.square,    }, 
    ellipse:   { count: 0,  max:20,  fill:random,  filter:random,  stroke:strokes.ellipse,    size:sizes.ellipse,   }, 
    mountain:  { count: 0,  max:10,  fill:random,  filter:random,  stroke:strokes.mountain,   size:sizes.mountain,  }, 
    rectangle: { count: 0,  max:20,  fill:random,  filter:random,  stroke:strokes.rectangle,  size:sizes.rectangle, }, 
    //Radials                                                                                                       // 
    circle:    { count: 5,  max:20,  fill:random,  filter:random,  stroke:strokes.circle,     size:sizes.circle,    }, 
    flower:    { count: 1,  max:10,  fill:random,  filter:'glow',  stroke:strokes.flower,     size:sizes.flower,    }, 
    hexagon:   { count: 0,  max:20,  fill:random,  filter:random,  stroke:strokes.hexagon,    size:sizes.hexagon,   }, 
    octagon:   { count: 0,  max:20,  fill:random,  filter:random,  stroke:strokes.octagon,    size:sizes.octagon,   }, 
    oddagon:   { count: 1,  max:20,  fill:random,  filter:random,  stroke:strokes.oddagon,    size:sizes.oddagon,   }, 
    polygon:   { count: 0,  max:20,  fill:random,  filter:random,  stroke:strokes.polygon,    size:sizes.polygon,   }, 
    dexagon:   { count: 0,  max:20,  fill:random,  filter:random,  stroke:strokes.dexagon,    size:sizes.dexagon,   }, 
    randogon:  { count: 0,  max:20,  fill:random,  filter:random,  stroke:strokes.randogon,   size:sizes.randogon,  }, 
    pentagon:  { count: 0,  max:20,  fill:random,  filter:random,  stroke:strokes.pentagon,   size:sizes.pentagon,  }, 
    triangle:  { count: 1,  max:20,  fill:random,  filter:'glow',  stroke:strokes.triangle,   size:sizes.triangle,  }, 
  };

  enabled = {
    stroke:     true,
    points:     false,  //true, false, or color
    centers:    false,  //true, false, or color
    anchors:    false,  //true, false, or color
    filters:    true,
    bgcolor:    color,  //true (currentColor), false, or color
    gradients:  true,
    variants:   false,  //TODO
    animation:  false,  //TODO
  }; 

  objects = {
    min:        1,
    max:      250,
    maxshape:  50,
    default:    5,     //NOT IN USE
    selected:  10,     //NOT IN USE
    swidth:     4,     //Stroke width defualt
    scolor:    lime,   //Stroke color default
    acolor:    white,  //Anchor color default
    pcolor:    black,  //Point  color default
    ccolor:    black,  //Center color default
    fill:      color,  //true, false or color, used only when shape setting is 'default'
  };
  
  paths = {
    type:  'arc',  //arc, quad, cube, line, all, TODO: random 
    all:   false,
    arc:    gold,  //true, false or color
    cube:  false,  //true, false or color
    quad:  false,  //true, false or color
    line:  false,  //true, false or color
  }

  width = {  //Canvas Width
    min:       100,
    max:      3000,
    default:   640,
    selected: 1920,
  };

  height = {  //Canvas Height
    min:       100,
    max:      3000,
    defualt:   480,
    selected:  957,
  };

  colors = {  //Global Palette
    min:         3,
    max:       256,
    default:    10,
    selected:  100,
  };

  gradients = {  //Number of colors per gradient
    min:         2,
    max:         9,
    default:     3,
    selected:    5,
    orientation: 'both', //TODO: horiz, vertical, both, aligned, random
  };

  filters = {  //Global
    glow:          true,
    tile:          false,
    dance:         true,
    chaotic:       false,
    watercolor:    false,
    motionblurX:   false,
    motionblurY:   false,
    displacement:  false,
    gaussianblur:  true,
    pointlighting: true,
  };

  duration = {  //TODO: Animation
    min:           100,
    max:         36000,
    default:         0,
    selected:   random,
  };
  
  variants = {  //TODO: Transforms
    min:             1,
    max:            10,
    default:         0,
    selected:   random,
  };

  conf = {  //Export object
      enabled:enabled,
      objects:objects,
       colors:colors,
       height:height,
        width:width,
        paths:paths,
        grids:grids,
       shapes:shapes,
      filters:filters,
     variants:variants, //TODO
     duration:duration, //TODO
    gradients:gradients,
  };

  return conf;
}//----------------------------------------------------------------------------

//Handy unix time stamp-------------------------------------------------------- 
function epoch(n = 8) { //last 8 hex digits by default
  let epoch = Date.now(); 
  return epoch.toString(16).substring(n);
}//----------------------------------------------------------------------------

//Needs to be a builtin JS function, grumble-----------------------------------
function randomInt(min = 0, max = 100) {
  return Math.floor(min + (Math.random() * (max - min)));
}//----------------------------------------------------------------------------

//Implements CSS style rounding------------------------------------------------
function roundInt(num = 10, factor = 10) {
  return factor * Math.trunc(num/factor);
}//----------------------------------------------------------------------------

//Sugar syntax wrapper for generating random X cords---------------------------
function roundX(min = 1, max = width, factor = 10) {
  return roundInt(randomInt(min, max), factor);
}//----------------------------------------------------------------------------

//Sugar syntax wrapper for generating random Y cords---------------------------
function roundY(min = 1, max = height, factor = 10) {
  return roundInt(randomInt(min, max), factor);
}//----------------------------------------------------------------------------

//Random -X or +X cords to move objects with-----------------------------------
function moveX(min = 1, max = width) {
  let luck  = randomInt();
  let randX = randomInt(min, max);
  randX = (luck % 3) ? (randX - luck) : (max - randX - luck) * -1;
  return roundInt(randX, 5);
}//----------------------------------------------------------------------------

//Random -Y or +Y cords to move objects with-----------------------------------
function moveY(min = 1, max = height) {
  let luck  = randomInt();
  let randY = randomInt(min, max);
  randY = (luck % 3) ? (randY - luck) : (max - randY - luck) * -1;
  return roundInt(randY, 5);
}//----------------------------------------------------------------------------

//A random X value in a 2 section wide quadrant--------------------------------
function quadrantX( t = 1, maxw = width) {
  switch (t) {
    case 1: return roundX(maxw * 0.20, maxw * 0.40, 5);
    case 2: return roundX(maxw * 0.60, maxw * 0.80, 5);
  }
  return t;
}//----------------------------------------------------------------------------

//A random Y value in a 2 section tall quadrant--------------------------------
function quadrantY( t = 1, maxh = height) {
  switch (t) {
    case 1: return roundY(maxh * 0.20, maxh * 0.40, 5);
    case 2: return roundY(maxh * 0.60, maxh * 0.80, 5);
  }
  return t;
}//----------------------------------------------------------------------------

//A random X value in a 3 section wide tridant---------------------------------
function tridantX( t = 1, maxw = width) {
  switch (t) {
    case 1: return roundX(maxw * 0.15, maxw * 0.30, 5);
    case 2: return roundX(maxw * 0.40, maxw * 0.60, 5);
    case 3: return roundX(maxw * 0.70, maxw * 0.85, 5);
  }
  return t;
}//----------------------------------------------------------------------------

//A random Y value in a 3 section tall tridant---------------------------------
function tridantY( t = 1, maxh = height) {
  switch (t) {
    case 1: return roundY(maxh * 0.15, maxh * 0.30, 5);
    case 2: return roundY(maxh * 0.33, maxh * 0.66, 5);
    case 3: return roundY(maxh * 0.70, maxh * 0.85, 5);
  }
  return t;
}//----------------------------------------------------------------------------

//A random X value in a 4 section wide octadant--------------------------------
function octadantX( t = 1, maxw = width) {
  switch (t) {
    case 1: return roundX(maxw * 0.10, maxw * 0.25, 5);
    case 2: return roundX(maxw * 0.30, maxw * 0.45, 5);
    case 3: return roundX(maxw * 0.55, maxw * 0.70, 5);
    case 4: return roundX(maxw * 0.75, maxw * 0.90, 5);
  }
  return t;
}//----------------------------------------------------------------------------

//A random Y value in a 4 section tall octadant--------------------------------
function octadantY( t = 1, maxh = height) {
  switch (t) {
    case 1: return roundY(maxh * 0.10, maxh * 0.25, 5);
    case 2: return roundY(maxh * 0.30, maxh * 0.45, 5);
    case 3: return roundY(maxh * 0.55, maxh * 0.70, 5);
    case 4: return roundY(maxh * 0.75, maxh * 0.90, 5);
  }
  return t;
}//----------------------------------------------------------------------------

//Shuffle the order array------------------------------------------------------
function randomize(ar) {
  let i = ar.length
  let temp = 0;
  let j = 0;

  while (--i > 0) {
    j = Math.floor(Math.random() * (i+1));   
    temp  = ar[j];
    ar[j] = ar[i];
    ar[i] = temp;
  }

  return ar;
}//----------------------------------------------------------------------------

//Depending on config adds enabled filters-------------------------------------
function svgFilters() {
  let output = '';
  if (!svgconf.enabled.filters) return output;

  let scale    = randomInt(2,   99);
  let seed25   = randomInt(1,   25);
  let seed1000 = randomInt(100, 1000);
  let x,y,z,c,d,w,h = 0;

  //DISPLACEMENT---------------------------------------------------------------
  if (svgconf.filters.displacement) {
    let displacement = '';
    displacement += '<filter id="displacement">\r\n';
    displacement += `  <feTurbulence baseFrequency="0.0${seed25}" seed="${seed1000}" result="turbulence" />\r\n`;
    displacement += `  <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="${scale}" xChannelSelector="R" yChannelSelector="G" />\r\n`;
    displacement += '</filter>\r\n';
    output       += displacement;
  }
  
  //GAUSSIAN BLUR--------------------------------------------------------------
  if (svgconf.filters.gaussianblur) {
    let gaussianblur = '';
    x  = randomInt(5, 99);
    y  = randomInt(5, 99);
    x -= randomInt(1, x); //reduce likelihood of large x
    y -= randomInt(1, y); //reduce likelihood of large y
    gaussianblur += '<filter id="gaussianblur">\r\n';
    gaussianblur += `  <feGaussianBlur in="SourceGraphic" stdDeviation="${x} ${y}" edgeMode="duplicate" color-interpolation-filters="sRGB" />\r\n`;
    gaussianblur += '</filter>\r\n';
    output       += gaussianblur;
  }

  //GLOW-----------------------------------------------------------------------
  if (svgconf.filters.glow) {
    let glow = '';
    c = randomInt(1, colors);
    d = randomInt(2, 30);
    glow += '<filter id="glow">\r\n'
    glow += `  <feDropShadow in="FillPaint" dx="0" dy="0" stdDeviation="${d}" flood-color="var(--c${c})" />\r\n`;
    glow += '</filter>\r\n';
    output += glow;
  }

  //POINTLIGHTING--------------------------------------------------------------
  if (svgconf.filters.pointlighting) {
    let pointlighting = '';
    x = randomInt(width  * 0.1, width  * 0.9);
    y = randomInt(height * 0.1, height * 0.9);
    c = randomInt(1, colors);
    z = seed1000;
  
    pointlighting += '<filter id="pointlighting">\r\n';
    pointlighting += `  <feDiffuseLighting in="SourceGraphic" result="light" lighting-color="var(--c${c})">\r\n`;
    pointlighting += `    <fePointLight x="${x}" y="${y}" z="${z}" />\r\n`;
    pointlighting += '  </feDiffuseLighting>\r\n';
    pointlighting += '  <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />\r\n';
    pointlighting += '</filter>\r\n';
  }

  //TILE-----------------------------------------------------------------------
  if (svgconf.filters.tile) {
    let tile = '';
    x = randomInt(width  * 0.5, width  * 0.75);
    y = randomInt(height * 0.5, height * 0.75);
    w = randomInt(1, x);
    h = randomInt(1, y);
    tile += `<filter id="tile" x="0" y="0" width="100%" height="100%">\r\n`;
    tile += `  <feTile in="SourceGraphic" x="${x}" y="${y}" width="${w}" height="${h}" />\r\n`;
    tile += '  <feTile />\r\n';
    tile += '</filter>\r\n';
    output += tile;
  }

  //DANCE----------------------------------------------------------------------
  if (svgconf.filters.dance) {
    let dance = '';
    dance += '<filter id="dance" color-interpolation-filters="linearRGB" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">\r\n';
    dance += '  <feMorphology operator="dilate" radius="8 8" in="SourceAlpha" result="morphology"/>\r\n';
    dance += '  <feFlood flood-color="#000000" flood-opacity="0.5" result="flood"/>\r\n';
    dance += '  <feComposite in="flood" in2="morphology" operator="in" result="composite"/>\r\n';
    dance += '  <feComposite in="composite" in2="SourceAlpha" operator="out" result="composite1"/>\r\n';
    dance += '  <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="1" seed="0" stitchTiles="stitch" result="turbulence"/>\r\n';
    dance += '  <feDisplacementMap in="composite1" in2="turbulence" scale="17" xChannelSelector="A" yChannelSelector="A" result="displacementMap"/>\r\n';
    dance += '  <feMerge result="merge">\r\n';
    dance += '    <feMergeNode in="SourceGraphic" result="mergeNode"/>\r\n';
    dance += '    <feMergeNode in="displacementMap" result="mergeNode1"/>\r\n';
    dance += '  </feMerge>\r\n';
    dance += '</filter>\r\n';
    output += dance;
  }

  //WATERCOLOR-----------------------------------------------------------------
  if (svgconf.filters.watercolor) {
    let water = '';
    water += '<filter id="watercolor" color-interpolation-filters="sRGB" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">\r\n';
    water += '  <feTurbulence type="fractalNoise" baseFrequency="0.09 0.09" numOctaves="7" seed="1" stitchTiles="stitch" result="turbulence"/>\r\n';
    water += '  <feDiffuseLighting surfaceScale="0.5" diffuseConstant="3.2" lighting-color="#ffffff" in="turbulence" result="diffuseLighting">\r\n';
    water += '    <feDistantLight azimuth="250" elevation="16"/>\r\n';
    water += '  </feDiffuseLighting>\r\n';
    water += '  <feTurbulence type="fractalNoise" baseFrequency="0.011 0.004" numOctaves="2" seed="3" stitchTiles="noStitch" result="turbulence1"/>\r\n';
    water += '  <feColorMatrix type="saturate" values="3" in="turbulence1" result="colormatrix"/>\r\n';
    water += '  <feColorMatrix type="matrix" values=\r\n';
    water += '    "2 0   0 0 0\r\n';
    water += '     0 1.5 0 0 0\r\n';
    water += '     0 0   2 0 0\r\n';
    water += '     0 0   0 2 0" in="colormatrix" result="colormatrix1"/>\r\n';
    water += '  <feBlend mode="multiply" in="diffuseLighting" in2="colormatrix1" result="blend"/>\r\n';
    water += '  <feComposite in="blend" in2="SourceAlpha" operator="in" result="composite1"/>\r\n';
    water += '</filter>\r\n';
    output += water;
  }  

  //CHAOTIC--------------------------------------------------------------------
  if (svgconf.filters.chaotic) {
    let chaos = '';  
    chaos += '<filter id="chaotic" color-interpolation-filters="linearRGB" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">\r\n';
    chaos += '  <feTurbulence type="turbulence" baseFrequency="0.015 0.015" numOctaves="3" seed="8" stitchTiles="stitch" result="turbulence"/>\r\n';
    chaos += '  <feMorphology operator="dilate" radius="35 35" in="turbulence" result="morphology"/>\r\n';
    chaos += '  <feColorMatrix type="matrix" values=\r\n';
    chaos += '    "1 0 0 0 0\r\n';
    chaos += '     0 1 0 0 0\r\n';
    chaos += '     0 0 1 0 0\r\n';
    chaos += '     0 0 0 10 0" in="morphology" result="colormatrix"/>\r\n';
    chaos += '  <feColorMatrix type="saturate" values="10" in="colormatrix" result="colormatrix1"/>\r\n';
    chaos += '  <feComposite in="colormatrix1" in2="SourceAlpha" operator="in" result="composite"/>\r\n';
    chaos += '</filter>\r\n';
    output += chaos;
  }

  return output;
}//----------------------------------------------------------------------------

/*********** Where all the functions that generate points are kept ***********/

//Generates 4 semi-random points to make shapes with---------------------------
function svg4Points(xmax = width, ymax = height) {
  // Clockwise Quadrants
  // -----------
  // | Q1 | Q2 | 
  // -----------
  // | Q4 | Q3 | 
  // -----------
  let points = [ { x:0 , y:0 } ];  //index 0 is unused 
  points[1]  = { x: quadrantX(1, xmax), y: quadrantY(1, ymax) }; //Q1
  points[2]  = { x: quadrantX(2, xmax), y: quadrantY(1, ymax) }; //Q2
  points[3]  = { x: quadrantX(2, xmax), y: quadrantY(2, ymax) }; //Q3
  points[4]  = { x: quadrantX(1, xmax), y: quadrantY(2, ymax) }; //Q4
  points[5]  = { x: points[1].x,        y: points[1].y };  //Q5 is Q1
  return points;
}//----------------------------------------------------------------------------

//Generates 6 semi-random points to make shapes with---------------------------
function svg6WPoints(xmax = width, ymax = height) {
  // Clockwise Tridants
  // ----------------
  // | T1 | T2 | T3 | 
  // ----------------
  // | T6 | T5 | T4 | 
  // ----------------

  let points = [ { x:0 , y:0 } ];  //index 0 is unused 
  points[1]  = { x: tridantX(1, xmax), y: tridantY(1, ymax) }; //T1
  points[2]  = { x: tridantX(2, xmax), y: tridantY(1, ymax) }; //T2
  points[3]  = { x: tridantX(3, xmax), y: tridantY(1, ymax) }; //T3
  points[4]  = { x: tridantX(3, xmax), y: tridantY(2, ymax) }; //T4
  points[5]  = { x: tridantX(2, xmax), y: tridantY(2, ymax) }; //T5
  points[6]  = { x: tridantX(1, xmax), y: tridantY(2, ymax) }; //T6
  points[7]  = { x: points[1].x,       y: points[1].y }; //T7 is T1
  return points;
}//----------------------------------------------------------------------------

//Generates 8 semi-random points to make shapes with---------------------------
function svg8Points(xmax = width, ymax = height) {
  // Clockwise Tridants
  // ----------------
  // | T1 | T2 | T3 | 
  // ----------------
  // | T8 | T9 | T4 | 
  // ----------------
  // | T7 | T6 | T5 | 
  // ----------------
  let points = [ { x:0 , y:0 } ];  //index 0 is unused 
  points[1]  = { x: tridantX(1, xmax), y: tridantY(1, ymax) }; //T1
  points[2]  = { x: tridantX(2, xmax), y: tridantY(1, ymax) }; //T2
  points[3]  = { x: tridantX(3, xmax), y: tridantY(1, ymax) }; //T3
  points[4]  = { x: tridantX(3, xmax), y: tridantY(2, ymax) }; //T4
  points[5]  = { x: tridantX(3, xmax), y: tridantY(3, ymax) }; //T5
  points[6]  = { x: tridantX(2, xmax), y: tridantY(3, ymax) }; //T6
  points[7]  = { x: tridantX(1, xmax), y: tridantY(3, ymax) }; //T7
  points[8]  = { x: tridantX(1, xmax), y: tridantY(2, ymax) }; //T8
  points[9]  = { x: points[1].x,       y: points[1].y }; //T9 is T1
  return points;
}//----------------------------------------------------------------------------

//Generates n number of uniform radial point to make shapes with---------------
function svgRadialPoints(n = 12, cx = roundX(100,width-100), cy = roundY(100,height-100), r = roundY(100,height/3)) {
  let points = [ { x:cx , y:cy, r:r } ];  //index 0 is the center mark 
  let nudge  = (2 * Math.PI)/n; //360 degrees is (2 * Pi) in radians
  let radian = 0; //angle in radian
  let angle  = 0; //angle in degrees
  let x      = 0;
  let y      = 0;
  
  for (let i=0; i<=n; i++) { 
    radian = nudge * (i + 0.001); //Fixes rounding error
    angle  = roundInt(radian*(180/Math.PI),1)
    x = roundInt(cx + (r * Math.cos(radian)),1);
    y = roundInt(cy + (r * Math.sin(radian)),1);
    points[i+1] = { x:x , y:y, a:angle }; //skip index 0
  } //console.log(points); //DEBUG

  return points;
}//----------------------------------------------------------------------------

//Sugar wrapper for the various count points generators------------------------
function svgPoints( xmax = width, ymax = height, count = 4, option = '') {
  points = [];

  switch (count) {
    case 6 : points = (option != 'T') ? svg6WPoints(xmax,ymax) : svg6TPoints(xmax,ymax); break;
    case 8 : points = svg8Points(xmax,ymax); break;
    default: points = svg4Points(xmax,ymax); break;
  }

  return points;
}//----------------------------------------------------------------------------

/*********** Where all the functions that generate shapes are kept ***********/

//Generates Bear Claws---------------------------------------------------------
function svgBearClaw(oid = 'no-order-id', options = opt) {
  let sid      = svgid+'-'+oid; //shape-id
  let output   = '';
  let open     = '<path   id="claw-'+sid+'" class="bearclaw" ';
  let close    = '</path>\r\n';
  let events  = options.events;
  let stroke  = options.stroke;
  let filter  = options.filter;
  let fill    = options.fill;
  let j,k,p    = 0;
  let u,v,x,y  = 0;
  let segCount = randomInt(2, 9);
  let startx   = randomInt(width  * 0.15, width  * 0.5);
  let starty   = randomInt(height * 0.15, height * 0.5);
  startx       = 100 * Math.trunc(startx/100);
  starty       = 50  * Math.trunc(starty/100);
  
  output += open
  output += fill + stroke + filter + events;
  output += 'd="M '+startx+' '+starty+' \r\n';
  
  j  =  randomInt(1, 25) * 10;
  k  =  randomInt(1, 25) * 10;
  u  =  randomInt(1, 25) * 10;
  v  =  randomInt(1, 25) * 10;
  x  =  startx;
  y  =  starty;
  
  for (i=1; i<segCount; i++) {
    p = ' c ';
    p += (x - Math.min(j,u))+',0 ';
    p += (x - Math.min(k,v))+',50 ';
    p += (Math.max(j,u))+',';
    p += (Math.max(k,v))+' ';
    
    x  =  x + j;
    y  =  y + k;
    u  =  randomInt(1,  10) * i * 10;
    v  =  randomInt(1,  10) * i * 10;

    output += p+' \r\n ';
  }

  output += ' Q '+(startx-300)+','+(starty)+' '+startx+' '+starty+' Z">\r\n'+close;

  return output;
}//----------------------------------------------------------------------------

//Generates squares & rectangles based on config-------------------------------
function svgRect (oid = 'no-order-id', square = false, options = opt) {
  let sid     = svgid+'-'+oid;  
  let open    = '<rect   ';
  let close   = '</rect>\r\n';
  let output  = '';
  let render  = '';
  let anchors = '';
  let h,w,x,y = 1;
  let cx,cy   = 1;
  let events  = options.events;
  let stroke  = options.stroke;
  let filter  = options.filter;
  let fill    = options.fill;

  x  = randomInt(0,  width);
  y  = randomInt(0,  height);
  x -= randomInt(1, x); //reduce likelihood of large x
  y -= randomInt(1, y); //reduce likelihood of large y
  w  = randomInt(50, width  / 2);
  h  = randomInt(50, height / 2);
  w += randomInt(1, w); //increase likelihood of large x
  h += randomInt(1, h); //increase likelihood of large y
  if (square) w = h;    //make squares when requested
  
  if (svgconf.enabled.points) { //Find the center anchor
    cx  = x + w/2;
    cy  = y + h/2;
    anchors += '<g class="'+ (square ? 'square' : 'rectangle')+' anchors">\r\n';
    anchors += '  '+svgDrawPoint(  cx,  cy, 3, center, 'center'   );
    anchors += '  '+svgDrawPoint(   x,   y, 3, pcolor, 'point tlc');
    anchors += '  '+svgDrawPoint( w+x,   y, 3, pcolor, 'point trc');
    anchors += '  '+svgDrawPoint(   x, h+y, 3, pcolor, 'point blc');
    anchors += '  '+svgDrawPoint( w+x, h+y, 3, pcolor, 'point brc');
    anchors += '\r\n</g>\r\n';
  }

  render += open;
  render += `id="rect-${sid}" `;
  render += `x="${x}" `;
  render += `y="${y}" `;
  render += `width="${w}" `;
  render += `height="${h}" `;
  render += fill;
  render += stroke;
  render += filter;
  render += events;
  render += 'class="'+( square ? 'square' : 'rectangle' )+'" >';
  render += close;
  output += render+anchors;
  
  return output;
}//----------------------------------------------------------------------------

//Generates a circle based on config-------------------------------------------
function svgCircle (oid = 'no-order-id', options = opt) {
  let sid     = svgid+'-'+oid;
  let open    = '<circle id="circ-'+sid+'" ';
  let close   = '</circle>\r\n';
  let output  = '';
  let render  = '';
  let x,y,r   = 1;
  let events  = options.events;
  let stroke  = options.stroke;
  let filter  = options.filter;
  let fill    = options.fill;

  x  = randomInt(0,  width  * 1.5);
  y  = randomInt(0,  height * 1.5);
  x -= randomInt(1, x); //reduce likelihood of large x
  y -= randomInt(1, y); //reduce likelihood of large y
  r  = randomInt(50, height / 2 );
  r += randomInt(1, r / 2 ); //increase likelihood of large x

  render += open;
  render += ` r="${r}" `;
  render += `cx="${x}" `;
  render += `cy="${y}" `;
  render += fill;
  render += stroke;
  render += filter;
  render += events+'">';
  render += close;  
  render += svgconf.enabled.points ? svgDrawPoint(x, y, 3, center, 'center') : '';
  output += render;

  return output;
}//----------------------------------------------------------------------------

//Generates clouds-------------------------------------------------------------
function svgCloud(oid = 'no-order-id', options = opt) {
  let sid     = svgid+'-'+oid;
  let pcount  = 2 * randomInt(2,5);
  let points  = svgPoints(width, height, pcount); //console.log(points); //DEBUG
  let open    = '<path   ';
  let close   = '\r\n</path>\r\n';
  let output  = '';
  let render  = '';
  let anchors = '';
  let line    = '';
  let cube    = '';
  let quad    = '';
  let arc     = '';
  let x,y     = 0;
  let u,v     = 0;
  let dx,dy   = 0;
  let qx,qy   = 0;
  let cx      = 0;
  let cy      = 0;
  let mx      = moveX(360, 720);
  let my      = moveY(180, 360); //console.log( mx + ' : ' + my ); //DEBUG
  let startx  = mx+points[1].x;
  let starty  = my+points[1].y;
  let events  = options.events;
  let stroke  = options.stroke;
  let filter  = options.filter;
  let fill    = options.fill;

  fill = fill + stroke + filter+' d="\r\n  M '+startx+' '+ starty+' \r\n';
  arc  = open +'id="cloud-'+sid+'-a" class="cloud arc"  '+ events+fill;
  cube = open +'id="cloud-'+sid+'-c" class="cloud cube" '+ events+fill;
  quad = open +'id="cloud-'+sid+'-q" class="cloud quad" '+ events+fill;
  line = open +'id="cloud-'+sid+'-l" class="cloud line" '+ events+fill;
  
  for (i=1; i<=pcount; i++) {
    x = mx+points[i].x;
    y = my+points[i].y;
    u = mx+points[i+1].x;
    v = my+points[i+1].y;
    
    //Close the path by returning to the starting point
    if (i == pcount) { u = startx; v = starty; }
    
    //Sum up all x & y values as their average is cx/cy 
    cx += x;
    cy += y;
    console.log('cx: '+cx);
    console.log('cy: '+cy);  

    //Calculate the half way point
    dx = (x+u)/2;
    dy = (y+v)/2;
    
    //Calculate the quadratic curve x,y
    qx = (dx+((dy-y)));
    qy = (dy-((dx-x))); 
        
    //Calculate the quad anchor x,y
    quadX = (qx+dx)/2;
    quadY = (qy+dy)/2;
    
    //Calculate the cube anchor x,y //TODO //DEBUG
    cubeX = quadX;
    cubeY = quadY;
    
    //Decide which available paths to use
    if  (svgconf.paths.arc  || svgconf.paths.all) arc  += '  A 45,45 0,0,1 '  + u+','+ v+'\r\n';
    if  (svgconf.paths.quad || svgconf.paths.all) quad += '  Q '+qx+','+qy+' '+ u+','+ v+'\r\n';    
    if  (svgconf.paths.cube || svgconf.paths.all) cube += '  C '+ x+','+ y+' '+qx+','+qy+' '+u+','+v+'\r\n';
    if  (svgconf.paths.line && (i > 1))           line += '  L '+ x+','+ y+'\r\n'; //Line skips the starting point  
    
    if (svgconf.enabled.anchors) { //Display enabled anchors
      if (svgconf.paths.arc  || svgconf.paths.all) anchors += svgDrawPoint(qx,    qy,    6, acolor, 'point anchor arc ');      
      if (svgconf.paths.cube || svgconf.paths.all) anchors += svgDrawPoint(cubeX, cubeY, 6, acolor, 'point anchor cube');
      if (svgconf.paths.quad || svgconf.paths.all) anchors += svgDrawPoint(quadX, quadY, 6, acolor, 'point anchor quad');
      if (svgconf.paths.line)                      anchors += svgDrawPoint(dx,    dy,    6, acolor, 'point anchor line');
    }

    if (svgconf.enabled.points) anchors += svgDrawPoint(x, y, 2, pcolor, 'point');
  }

  console.log('pc: '+pcount);
  console.log('cx: '+cx);
  console.log('cy: '+cy);
  cx = roundInt(cx/pcount);
  cy = roundInt(cy/pcount);
  console.log('cx: '+cx);
  console.log('cy: '+cy);
  if (svgconf.enabled.centers) anchors += svgDrawPoint(cx, cy, 2, center, 'center');

  let arcStroke  = '>';
  let cubeStroke = '>';
  let quadStroke = '>';
  let lineStroke = '>';

  // if (svgconf.shapes.cloud.stroke) {
  //   stroke    += ` stroke-width="${svgconf.shapes.cloud.swidth}" `;
  //   svgconf.paths.arc  = (svgconf.paths.arc  === true) ? svgconf.shapes.cloud.stroke : svgconf.paths.arc ;
  //   svgconf.paths.cube = (svgconf.paths.cube === true) ? svgconf.shapes.cloud.stroke : svgconf.paths.cube;
  //   svgconf.paths.quad = (svgconf.paths.quad === true) ? svgconf.shapes.cloud.stroke : svgconf.paths.quad;
  //   svgconf.paths.line = (svgconf.paths.line === true) ? svgconf.shapes.cloud.stroke : svgconf.paths.line;
  //   arcStroke  = stroke+` stroke="${svgconf.paths.arc }">`;
  //   cubeStroke = stroke+` stroke="${svgconf.paths.cube}">`; 
  //   quadStroke = stroke+` stroke="${svgconf.paths.quad}">`;
  //   lineStroke = stroke+` stroke="${svgconf.paths.line}">`;
  // } 

  cube   += '  Z" '+cubeStroke+close;
  arc    += '  Z" '+arcStroke +close; 
  quad   += '  Z" '+quadStroke+close;
  line   += '  L  '+(startx)+','+(starty)+'  Z" '+lineStroke+close;
  
  switch (svgconf.paths.type) {
    case 'all':  output += arc+cube+quad; break;
    case 'arc':  output += arc;  break;
    case 'cube': output += cube; break;
    case 'quad': output += quad; break;
    case 'line': output += line; break;
  }

  let group = svgconf.enabled.points || svgconf.enabled.anchors;
  anchors   = group ? '<g class="'+cname+' anchors">\r\n'+anchors+'\r\n</g>\r\n' : anchors;

  output += '<g class="cloud anchors">\r\n'+anchors+'\r\n</g>\r\n'; 

  return output;
}//----------------------------------------------------------------------------

//Generates flowers------------------------------------------------------------
function svgFlower(oid = 'no-order-id', options = opt) {
  let sid     = svgid+'-'+oid;
  let pcount  = randomInt(5,8);
  let points  = svgRadialPoints(pcount); //console.log(points); //DEBUG
  let open    = '  <path ';
  let close   = '  </path>\r\n';
  let render  = '';
  let output  = '';
  let anchors = '';
  let path    = '';
  let x,y     = 0;
  let u,v     = 0;
  let dx,dy   = 0;
  let ax,ay   = 0;
  let events  = options.events;
  let stroke  = options.stroke;
  let filter  = options.filter;
  let fill    = options.fill;
  let startx  = points[0].x;
  let starty  = points[0].y;

  render = '<g id="flower-'+sid+'" class="flower" '+ fill+filter+'>\r\n';
  let d  = stroke + events +'  d="\r\n    M '+ startx+' '+starty+' \r\n';
  
  for (i=1; i<=pcount; i++) {
    x = points[i].x;
    y = points[i].y;
    u = points[i+1].x;
    v = points[i+1].y;
 
    path    = open+'id="petal-'+sid+'-'+i+'" class="flower petal"';
    path   += fill;
    path   += filter;
    path   += d;
    path   += '    L '+x+','+y            +'\r\n'; //from center to the first point
    path   += '    A 45,45 0,0,1 '+u+','+v+'\r\n';
    path   += '    L '+startx+','+starty  +'\r\n'; //from second point to the center
    path   += '    Z">';
    path   += '\r\n'+close;
    render += path;

    //Calculate the half way point and the anchor point x,y
    dx = (x+u)/2;
    dy = (y+v)/2;
    ax = (dx+((dy-y)));
    ay = (dy-((dx-x))); 

    if (svgconf.enabled.anchors)   output += svgDrawPoint(     ax,     ay, 4, svgconf.paths.arc, 'point anchor arc ');
    if (svgconf.enabled.points ) { output += svgDrawPoint(      x,      y, 3, pcolor, 'point');      
                                   output += svgDrawPoint( startx, starty, 3, center, 'center');
    }
  }

  output += render+'</g>\r\n';

  return output;
}//----------------------------------------------------------------------------

//Generates Polygons, Hexagon by default---------------------------------------
function svgPolygon(oid = 'no-order-id', pcount=6, options = opt) {
  let sid     = svgid+'-'+oid;
  let points  = svgRadialPoints(pcount); //console.log(points); //DEBUG
  let open    = '  <polygon ';
  let close   = '  </polygon>\r\n';
  let render  = '';
  let output  = '';
  let anchors = '';
  let events  = options.events;
  let stroke  = options.stroke;
  let filter  = options.filter;
  let fill    = options.fill;
  let startx  = points[0].x;
  let starty  = points[0].y;
  let polyn   = options.name;
  let cname   = polyn;
  let data    = { type:polyn };
  
  cname   += ((polyn == 'oddagon') || (polyn == 'randogon')) ? ' poly'+pcount : '';
  render  += open+'id="'+polyn+'-'+sid+'-'+i+'" ';
  render  += 'class="'+cname+'"';
  render  += fill+stroke+filter+events+' points="';
  anchors += (svgconf.enabled.centers) ? '  '+svgDrawPoint( startx, starty, 3, center, 'center') : '';

  for (i=1; i<=pcount; i++) {
    render  += points[i].x+','+points[i].y+' ';     
    anchors += (svgconf.enabled.points) ? '  '+svgDrawPoint(points[i].x, points[i].y, 3, pcolor, 'point' ) : '';
  }

  anchors     = svgconf.enabled.points ? '<g class="'+cname+' anchors">\r\n'+anchors+'\r\n</g>\r\n' : anchors;
  render     += '">' +'\r\n'+close+'\r\n';  
  anchorall  += anchors;
  output     += render+anchors;
  data[polyn] = { pcount:pcount, points:points }
  elements[oid].data = data;

  return output;
}//----------------------------------------------------------------------------


//Decipher what needs to be exact and what needs randomization-----------------
function parseConf() {
  let order    = Array();
  let shapes   = Object.create(null);
  let parsed   = Object.create(null);
  let filters  = Object.create(null);
  let defaults = svgdefaults();
  let paths    = defaults.paths;
  let enabled  = defaults.enabled;
  let objects  = defaults.objects;
  let w = defaults.width.selected;
  let h = defaults.height.selected;
  let c = defaults.colors.selected;
  let d = defaults.duration.selected;
  let v = defaults.variants.selected;
  let g = defaults.gradients.selected;
  let f = 0; //Total number of enabled filters
  let t = 0; //Total number of objects = shapes * variations of each shape

  if (isNaN(w)) w = (w == 'random') ?    roundX(defaults.width.min,      defaults.width.max     ) : defaults.width.default;
  if (isNaN(h)) h = (h == 'random') ?    roundY(defaults.height.min,     defaults.height.max    ) : defaults.height.default;
  if (isNaN(c)) c = (c == 'random') ? randomInt(defaults.colors.min,     defaults.colors.max    ) : defaults.colors.default;
  if (isNaN(d)) d = (d == 'random') ? randomInt(defaults.duration.min,   defaults.duration.max  ) : defaults.duration.default;
  if (isNaN(v)) v = (v == 'random') ? randomInt(defaults.variants.min,   defaults.variants.max  ) : defaults.variants.default;
  if (isNaN(g)) g = (g == 'random') ? randomInt(defaults.gradients.min,  defaults.gradients.max ) : defaults.gradients.default;

  if (defaults.enabled.filters) {  //Only if filters are enabled
    Object.keys(defaults.filters).forEach(filter => { //Only keep the enabled filters, discared others
      if (defaults.filters[filter]) {
        filters[filter] = filter;
        f++;
      }
    }); 
  }
  
  Object.keys(defaults.shapes).forEach(shape => { //Go through each shape type
    if (isNaN(defaults.shapes[shape].count)) {    //Assign requested random/default values
      defaults.shapes[shape].count = (shapes[shape].count == 'random') ? randomInt(defaults.objects.min, shapes[shape].max) : defaults.objects.default;
    }

    if (defaults.shapes[shape].count) { //Only keep the enabled shapes, discard others
      shapes[shape] = defaults.shapes[shape];
      //Create orders for each requested count of the enabled shape types
      for (i=0; i < shapes[shape].count; i++) order[t+i] = shape; 
      t += shapes[shape].count;
    }
  }); 
  
  if (t > defaults.objects.max) { 
    alert('Warning: number of objects exceed ' + defaults.objects.max);
  }

  total = t; //Copy the total shapes count value into a global variable

  //Now that we know our total number of shapes let's decipher the rest of variable
  Object.keys(shapes).forEach(shape => {
    if (defaults.enabled.filters) { //Determine to use random, preselected or no filter per shape
      if (shapes[shape].filter) {   //True means random, otherwise it's preselected
        shapes[shape].filter = (shapes[shape].filter === true) ? 'random' : shapes[shape].filter; 
      }
    } else { shapes[shape].filter = false; } //No filter if filters are disabled globally
  
    if (shapes[shape].fill) { //Determine what kind of fill to use per shape
      if (shapes[shape].fill ===  true    ) shapes[shape].fill = 'solid'; //true means solid
      if (shapes[shape].fill === 'solid'  ) shapes[shape].fill = 'var(--c'+randomInt(1, total)+')';
      if (shapes[shape].fill === 'default') shapes[shape].fill = objects.fill;
      if (shapes[shape].fill === 'none'   ) shapes[shape].fill = false;
      //All else means it's either set to random or a preselected #color
    }  
  });

  //Replace true with their default colors
  if (defaults.enabled.points  === true) defaults.enabled.points  = defaults.objects.pcolor;
  if (defaults.enabled.center  === true) defaults.enabled.center  = defaults.objects.ccolor;
  if (defaults.enabled.anchors === true) defaults.enabled.anchors = defaults.objects.acolor;

  parsed = {
    width:     w,
    height:    h,
    colors:    c,
    variants:  v,
    duration:  d,
    gradients: g,
    paths:     paths,
    shapes:    shapes,
    filters:   filters,
    objects:   objects,
    enabled:   enabled,
    order:     ['zero', ...randomize(order)],
  }

  return parsed;
}//----------------------------------------------------------------------------

//Generates random colors as CSS variables------------------------------------- 
function svgColors(pal = [ '#00000000' ]) {
  let r,g,b,a = 0;
  let c       = '';
  let extra   = '';
  let output  = '  --c0:  #00000000; \r\n';

  for (let i=1; i <= colors; i++) {
    r = randomInt(0, 256);
    g = randomInt(0, 256);
    b = randomInt(0, 256);
    a = randomInt(0, 256);
    c = '#'+
      r.toString(16).padStart(2, '0')+
      g.toString(16).padStart(2, '0')+
      b.toString(16).padStart(2, '0')+
      a.toString(16).padStart(2, '0');
    pal[i]  = c;
    extra = ((i < 10)) ? ' ' : '';
    output += '  --c' + i + ': '+extra+ c + ((i % 5) ? ';' : ';\r\n');
  }

  output += '  --c-count: '+colors+';\r\n';
  return output;
}//----------------------------------------------------------------------------

//Adds unique CSS ID-----------------------------------------------------------
function svgVars(svgid) {
  let open    = '#svg-'+svgid+' {\r\n';
  let content = svgColors();
  let close   = '}\r\n';
  let output  = open + content + close;
  return output;
}//----------------------------------------------------------------------------

//Adds the <style> element-----------------------------------------------------
function svgStyle(svgid) {
  let open    = '<style>\r\n';
  let content = svgVars(svgid);
  let close   = '</style>\r\n';
  let output  = open + content + close;
  return output;
}//----------------------------------------------------------------------------

//Generates Linear or Radial Gradients-----------------------------------------
function svgGrad(gid, gtype = 'L') {
  let c     = svgconf.gradients; //Number of colors per gradient
  let nudge = Math.floor(100/(c-1));
  let open  = `  <linearGradient id="grad-${gid}" gradientUnits="userSpaceOnUse" x1="${roundX(100,width*0.5)}" y1="${roundY(100,height*0.3)}" x2="${width}" y2="${height}">\r\n`;
  let close = '  </linearGradient>\r\n';
  if (gtype == 'R') {
    open    = `  <radialGradient id="grad-${gid}" gradientUnits="userSpaceOnUse" cx="${roundX(100,width-100)}" cy="${roundY(100,height-100)}" r="${roundY(width/2,width)}">\r\n`;
    close   = '  </radialGradient>\r\n';
  }

  let g                    = `    <stop offset="0.00"` +        ` stop-color="var(--c${randomInt(1, colors)})"/>\r\n`;
  for (i=2; i < c; i++) g += `    <stop offset="0.${(i-1)*nudge}" stop-color="var(--c${randomInt(1, colors)})"/>\r\n`;  
  g                       += `    <stop offset="1.00"` +        ` stop-color="var(--c${randomInt(1, colors)})"/>\r\n`;

  return open + g + close;
}//----------------------------------------------------------------------------

//Adds Linear & Radial gradients-----------------------------------------------
function svgGradients(type = 'L') {
  let output = '';
  if (svgconf.enabled.gradients) {
    for (let i=1; i <= total; i++) {
      output += svgGrad(svgid+'-'+i, ((i % 2) ? 'L' : 'R'));
    }
  } else {
    output = '<!-- No gradients -->';
  }
  return output
}//----------------------------------------------------------------------------

//Adds the <defs> element for gradients to reside in---------------------------
function svgDefs() {
  return '<defs>\r\n' + svgGradients() + svgFilters() + '</defs>\r\n';
}//----------------------------------------------------------------------------

//Adds illustrator style anchor point------------------------------------------
function svgDrawPoint(x = 100, y=100, r=5, c='white', classname='point') {
  let circle = '';
  circle += `<circle `;
  circle += `cx="${x}" `;
  circle += `cy="${y}" `;
  circle += `r="${r}" `;
  circle += `stroke="${c}" `;
  circle += `class="${classname}" `; 
  circle += `/> \r\n`;
  return circle;
}//----------------------------------------------------------------------------

//Adds elements enabled in config----------------------------------------------
function svgContent() {
  let output  = '';
  let render  = '';
  let bgcolor = '';
  let filter  = '';
  let stroke  = '';
  let shape   = '';
  let fill    = '';
  let luck    = 0;
  bgcolor     = ( svgconf.enabled.bgcolor === true) ? 'currentColor' : svgconf.enabled.bgcolor;
  bgcolor     = (!svgconf.enabled.bgcolor         ) ? 'none'         : bgcolor;
  render     += '<rect '; //Add a bounding box
  render     += `x="0" y="0" `;
  render     += `id="box-${svgid  }" `;
  render     += ` width="${width  }" `;
  render     += `height="${height }" `; 
  render     += `  fill="${bgcolor}" `;
  render     += `></rect>\r\n`;  //allow parent element to control border color
  output     += render;
  let data    = { type:"rectangle", rectangle:{x:0, y:0, w:width, h:height, fill:bgcolor} };
  elements[0] = { z:0, render:render, anchors:'', data:data }; //bounding box takes care of index zero
  
  rr = randomInt(3,16);  //For Randogons
  oo = randomInt(3,15);  //For Oddagons
  oo = (oo % 2) ? oo : oo-1; //Only odd

  for (oid=1; oid < svgconf.order.length; oid++) {
    render = '';
    stroke = '';
    filter = '';
    fill   = '';
    data   = '';
    luck   = randomInt(1,100);
    fill   = 'var(--c'+oid+')';
    shape  = svgconf.order[oid];
    elements[oid] = { z:oid, render:render, data:data }; //Insert blank data

    if (svgconf.shapes[shape].filter) { 
      filter = svgconf.shapes[shape].filter; //Preselected filter
      filter = (filter == 'random') ? filters[randomInt(0, fcount)] : filter;
      filter = ' filter="url(#'+filter+')" ';
    } else filter = '';
        
    if (svgconf.shapes[shape].fill) { 
      fill = svgconf.shapes[shape].fill; //Preselected fill
      fill = ((fill == 'random') && svgconf.enabled.gradients) ? 'url(#grad-'+svgid+'-'+oid+')' : fill;
      fill = ' fill="'+fill+'" ';
    } else fill = '';

    swidth = svgconf.shapes[shape].stroke.swidth; //Random = half none / half stroke 
    swidth = (swidth == 'random') ? ((luck % 2) ? randomInt(1,100) : 0) : swidth;

    if (swidth) {
      //stroke += ' stroke-dasharray="3 3 1 3"';  //DEBUG WHY NOT WORKING
      stroke += ' stroke="'+svgconf.shapes[shape].stroke.scolor+'"';
      stroke += ' stroke-width="'+swidth+'"';
      stroke += ' stroke-linecap="round"';
      stroke += ' stroke-linejoin="round"';
      stroke += (svgconf.shapes[shape].stroke.opacity != 1) ? ' stroke-opacity="'+svgconf.shapes[shape].stroke.opacity+'" ' : ' ';
    } else stroke = '';
  
    let options    = Object.create(null);    
    options.oid    = oid;
    options.name   = shape;
    options.stroke = stroke;
    options.filter = filter;
    options.fill   = fill;
    options.events = ' onclick="this.style.opacity = 0.5" ' 
    //console.log(options);  //DEBUG

    switch(shape) {      
    //case 'blob'      : render += svgBlob(oid,options);       break;
    //case 'ellipse'   : render += svgellipse(oid,options);    break;
      case 'claw'      : render += svgBearClaw(oid,options);   break;      
      case 'cloud'     : render += svgCloud(oid,options);      break;
      case 'circle'    : render += svgCircle(oid,options);     break;
      case 'flower'    : render += svgFlower(oid,options);     break;
      case 'square'    : render += svgRect(oid,true ,options); break;
      case 'rectangle' : render += svgRect(oid,false,options); break;
      case 'triangle'  : render += svgPolygon(oid, 3,options); break;
      case 'pentagon'  : render += svgPolygon(oid, 5,options); break;
      case 'hexagon'   : render += svgPolygon(oid, 6,options); break;
      case 'octagon'   : render += svgPolygon(oid, 8,options); break;
      case 'dexagon'   : render += svgPolygon(oid,10,options); break;
      case 'oddagon'   : render += svgPolygon(oid,oo,options); break;
      case 'randogon'  : render += svgPolygon(oid,rr,options); break;
    }
    elements[oid].render = render;
    output += render;
  } //console.log(elements);  //DEBUG

  return output;
}//----------------------------------------------------------------------------

//Wraps everything in the <svg> element tag------------------------------------
function svgTag() {
  let output  = '';
  let xmlns   = "http://www.w3.org/2000/svg";
  let xlink   = "http://www.w3.org/1999/xlink";
  let open    = '<svg ';
  let close   = '</svg>\r\n';
  svgid       = epoch() + randomInt(100,999); //Create new ID for each inserted instance
  open       += `viewBox="0 0 ${width} ${height}" `;
  open       += `id="svg-${svgid}" `;
  open       += `fill="none" `;
  open       += `xmlns="${xmlns}" `;
  open       += `xmlns:xlink="${xlink}" >\r\n`;
  open       += 'preserveAspectRatio="slice" ' //TODO add to congig
  output     += open; 
  output     += svgStyle(svgid);
  output     += svgDefs();
  output     += svgContent();
  output     += close;

  idStack.unshift('svg-'+svgid); //Newest id on top
  svgFiles['svg-'+svgid] = output; //console.log(svgFiles); //DEBUG
  if (idStack.length > 10) { //Only keep 10 files 
    tokill = idStack.pop();  //console.log(tokill); //DEBUG
    delete svgFiles[tokill];
  }

  return output;
}//----------------------------------------------------------------------------

//Encodes and sends the file to user-------------------------------------------
function svgDownload(fid) {
  if (!fid) return console.log('no file to download');
  if (Object.hasOwn(svgFiles,fid)) {
    let  link = document.createElement('a');
    link.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgFiles[fid]);
    link.download = fid+'.svg';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}//----------------------------------------------------------------------------

//Creates a Next button-----------------------------------------------------
function svgNext() {
  let style = 'position: absolute; bottom: 20px; left: 180px; opacity: 0.35;';
  let mouse = 'onmouseover="this.style.opacity = 1" onmouseout="this.style.opacity = 0.35"';
  return `<button type="button" name="nextsvg" style="${style}" onclick="svgInsert(this.parentNode)" ${mouse}>Next</button>\r\n`;
}//----------------------------------------------------------------------------

//Creates a Previous button-----------------------------------------------
function svgLast() {
  if (idStack.length > 1) {
    let style = 'position: absolute; bottom: 20px; left: 20px; opacity: 0.35;';
    let mouse = 'onmouseover="this.style.opacity = 1" onmouseout="this.style.opacity = 0.35"';
    //return `<button type="button" name="lastsvg" style="${style}" onclick="svgInsert(this.parentNode, '${idStack[lastIndex-1]}')" ${mouse}>Last</button>\r\n`;
  }
  return '';
}//----------------------------------------------------------------------------

//Creates a file download button-----------------------------------------------
function svgDLButton() {
  let style = 'position: absolute; bottom: 20px; left: 80px; opacity: 0.35;';
  let mouse = 'onmouseover="this.style.opacity = 1" onmouseout="this.style.opacity = 0.35"';
  return `<button type="button" name="downloadsvg" style="${style}" onclick="svgDownload('svg-${svgid}')" ${mouse}>Download</button>\r\n`;
}//----------------------------------------------------------------------------

//Inserts the <svg> in the dom-------------------------------------------------
function svgInsert(element, fileid = '') {
  let svgText = '';
  if (fileid) {
    svgText = svgFiles[fileid];
    lastIndex--;
  } else {
    svgText = svgTag();
    lastIndex++;
  }

  element.innerHTML = svgText+svgLast()+svgNext()+svgDLButton();
  return svgText;
}//----------------------------------------------------------------------------

//Good old JQuery function that should've been built into JS-------------------
function svgOnce(fn, context) { 
  let result = null; //Store the result of the function call
  return function() {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null; //Dereference the function to prevent further calls
    }
    return result;
  };
}//----------------------------------------------------------------------------

//Find every element with class="svgen" to add our SVG to----------------------
const initializeSVGen = svgOnce(function() {
  const svgens = document.querySelectorAll('.svgen');
  let icount = svgens.length;
  let info = '';
  info += "-----------------------\r\n";
  info += "[ svgen ver : "+String(version).padStart(5, ' ')+'   ]\r\n';
  info += "[ instances : "+String(icount ).padStart(5, ' ')+'   ]\r\n';
  info += "[  elements : "+String(total  ).padStart(5, ' ')+'   ]\r\n';
  info += "[   filters : "+String(fcount ).padStart(5, ' ')+'   ]\r\n';
  info += "[    shapes : "+String(scount ).padStart(5, ' ')+'   ]\r\n';
  info += "[    colors : "+String(colors ).padStart(5, ' ')+'   ]\r\n';
  info += "[    height : "+String(height ).padStart(5, ' ')+'   ]\r\n';
  info += "[     width : "+String(width  ).padStart(5, ' ')+'   ]\r\n';
  info += "-----------------------\r\n";
  console.log(info);
  svgens.forEach(svgen => { svgInsert(svgen)});
  console.log("SVGen initialized");
  return "Done!";
}, this);
//-----------------------------------------------------------------------------

//Initialize the global variables and generate---------------------------------
let svgFiles    = {}; //Final rendered file output
let idStack     = []; //Keeps track of previous render 
let elements    = []; //Keeps track of each element data and rendered outputs
let total       = 0;
let lastIndex   = 0;
let anchorall   = '';
let svgid       = '123456789';
let svgconf     = parseConf();
let filters     = Object.keys(svgconf.filters);
let scount      = Object.keys(svgconf.shapes).length; //Number of enabled shapes
let fcount      = filters.length;                     //Number of enabled filters
let width       = svgconf.width;
let height      = svgconf.height;
let colors      = svgconf.colors;
let pcolor      = svgconf.enabled.points;  //Point  color
let center      = svgconf.enabled.centers; //Center color
let acolor      = svgconf.enabled.anchors; //Anchor color
let opt         = { oid: 777, shape:'unknown', filters:'', fill:'' }; //Default options
//console.log(svgconf);  //DEBUG

//Make the whole thing run just once on page load
window.addEventListener('load', initializeSVGen);