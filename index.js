let version   = '0.026'; //Commits + 1
/******************************************************************************
COMMING SOON / TODO LIST
------------------------

More shapes: BG Corners, Stars, Blobs, Ellipses, Mountains, Pollen

Back button: Allowing saving previous renders

Config UI: Allowing more user interactivity

Grids: Snap to grid and fixed position shapes

More filters: Ideally one filter per shape

Events: OnClick info popup, on hover, etc.

Variants: Transforms of a shape

Animation: The final hurdle when everything else is done

******************************************************************************/
//Default canvas properties----------------------------------------------------
function defaultCanvas() {
  let w = Object.create(null);  //Width
  let h = Object.create(null);  //Height
  let c = Object.create(null);  //Canvas
  w['min'     ] =  100;
  w['max'     ] = 3000;
  w['default' ] =  640;
  w['selected'] = 1920;
  h['min'     ] =  100;
  h['max'     ] = 3000;
  h['default' ] =  480;
  h['selected'] =  957;
  c['width'   ] =    w;
  c['height'  ] =    h;
  //console.log(c);  //DEBUG
  return c;
}//----------------------------------------------------------------------------

//Default number of shape types per instance-----------------------------------
function defaultShapeCount() {
  let out = Object.create(null);
  out[blob     ] = 0;
  out[claw     ] = 0;
  out[cloud    ] = 1;
  out[square   ] = 1;
  out[ellipse  ] = 0;
  out[mountain ] = 0;
  out[rectangle] = 1;
  out[circle   ] = 5;
  out[flower   ] = 1;
  out[hexagon  ] = 1;
  out[octagon  ] = 0;
  out[oddagon  ] = 1;
  out[polygon  ] = 0;
  out[dexagon  ] = 1;
  out[randogon ] = 0;
  out[pentagon ] = 0;
  out[triangle ] = 2;  
  return out;
}//----------------------------------------------------------------------------

//Default enabled features-----------------------------------------------------
function defaultEnabled() {
  let out = Object.create(null);
  out['grids'    ] = FFF3;   //true, false, or color
  out['stroke'   ] = true;   //true, false, or color
  out['points'   ] = false;  //true, false, or color
  out['centers'  ] = false;  //true, false, or color
  out['anchors'  ] = false;  //true, false, or color
  out['position' ] = gold;   //true, false, or color
  out['bgcolor'  ] = color;  //true (currentColor), false, or color
  out['filters'  ] = true;
  out['variants' ] = false;  //TODO
  out['gradients'] = true;
  out['animation'] = false;  //TODO
  return out;
}//----------------------------------------------------------------------------

//Default enabled filters------------------------------------------------------
function defaultFilters() {
  let out = Object.create(null);
  out[glow         ] = true;
  out[tile         ] = false;
  out[dance        ] = true;
  out[chaotic      ] = false;
  out[watercolor   ] = false;
  out[motionblurx  ] = true;
  out[motionblury  ] = true;
  out[displacement ] = false;
  out[gaussianblur ] = true;
  out[pointlighting] = true;
  return out;
}//----------------------------------------------------------------------------

//Normal, Radial and Spiral grids defaults-------------------------------------
function defaultGrids() {
  let grids = Object.create(null);
  let point = Object.create(null);
  point['x'] = 0;
  point['y'] = 0;
  //Cartesian Grids
  grids['type' ] = radial;  //true = normal, radial, spiral (TODO: diagonal)
  grids['show' ] =   true;
  grids['text' ] =      0;  //FF06;
  grids['bound'] =   true;  //false = keep / true = delete positions that fall outside of artbox boundry  
  grids['order'] = normal;  //normal (horizontal), backward, vertical, vertiback, (TODO: snake, vsnake, outward, inward)
  grids['start'] =  point; 
  grids['end'  ] =  point; 
  grids['dx'   ] =    160; 
  grids['dy'   ] =    160;
  //Radial/Spiral Grids
  grids['r' ] =  800; 
  grids['a' ] =    0;
  grids['dr'] =  100;
  grids['da'] =   30;
  grids['cx'] =    0;
  grids['cy'] =    0; 
  grids['sr'] =    1;  //Spirals
  grids['sa'] =    4;  //Spirals
  //console.log(grids);  //DEBUG
  return grids;
}//----------------------------------------------------------------------------

//Defaults for paths-----------------------------------------------------------
function defaultPaths() {
  let out = Object.create(null);  
  out['type'] =   arc;  //arc, quad, cube, line, all, TODO: random 
  out['all' ] = false;
  out['arc' ] =  gold;  //true, false or color
  out['cube'] = false;  //true, false or color
  out['quad'] = false;  //true, false or color
  out['line'] = false;  //true, false or color
  return out;
}//----------------------------------------------------------------------------

//Default shape object template that all shape types share---------------------
function defaultShapeTemplate() {
  let out = Object.create(null);
  out['count'   ] =      0;
  out['max'     ] =     10;
  out['fill'    ] = random;
  out['filter'  ] = random;
  out['size'    ] = defaultShapeSizeTemplate();
  out['stroke'  ] = defaultShapeStrokeTemplate();
  out['position'] = defaultShapePositionTemplate();
  return out;  
}//----------------------------------------------------------------------------

//Default properties of each shape types---------------------------------------
function defaultShapes() {
  let shapes      = Object.create(null);
  let fill        = defaultShapeFill();
  let size        = defaultShapeSize();
  let count       = defaultShapeCount();
  let filter      = defaultShapeFilter();
  let stroke      = defaultShapeStroke();
  let position    = defaultShapePosition();

  //Create defaults for each shape type
  shapeTypes.forEach(type => {
    shapes[type] = defaultShapeTemplate(); 
    shapes[type].count    =    count[type];
    shapes[type].size     =     size[type];
    shapes[type].fill     =     fill[type];
    shapes[type].stroke   =   stroke[type];
    shapes[type].filter   =   filter[type];
    shapes[type].position = position[type];
  });
  
  //console.log(shapes);  //DEBUG  
  return shapes;
}//----------------------------------------------------------------------------

//Number of colors per gradient------------------------------------------------
function defaultGradients() {
  let out = Object.create(null);
  out[min      ] = 2;
  out[max      ] = 9;
  out['default'] = 3;
  out[selected ] = 5;
  out[type     ] = both; //TODO: horiz, vertical, both, aligned, random
  return out;
}//----------------------------------------------------------------------------

//Default color palette properties---------------------------------------------
function defaultColors() {
  let out = Object.create(null);
  out[min      ] =    3;
  out[max      ] =  256;
  out['default'] =   10;
  out[selected ] =  100;
  return out;
}//----------------------------------------------------------------------------

//Default template for a shape's position object-------------------------------
function defaultShapePositionTemplate() {
  let out  = Object.create(null);
  out[type] = random; //random / fixed / grid / incremental / decremental (based on min & max)
  out['cx'] =      0;
  out['cy'] =      0;
  out[minx] =     60;
  out[maxx] =    600;
  out[miny] =     40;
  out[maxy] =    400;
  return out;
}//----------------------------------------------------------------------------

//Default position of each shape types-----------------------------------------
function defaultShapePosition() {
  let out = Object.create(null);
  
  //Create a default position object for each shape type
  shapeTypes.forEach(type => { 
    out[type] = Object.create(null);
    out[type] = defaultShapePositionTemplate(); 
  });

  //Shape specific tweaks go here
  //Properties: type, cx, cy, minx, maxx, miny, maxy
  out[square].cx   = 500;
  out[square].cy   = 500;
  
  return out;
}//----------------------------------------------------------------------------

//Default template for a shape's size object-----------------------------------
function defaultShapeSizeTemplate() {
  let out  = Object.create(null);
  out[type] = random; //random / fixed / incremental / decremental (based on min & max)
  out['w' ] =     60;
  out['h' ] =     40;
  out[minw] =     60;
  out[maxw] =    600;
  out[minh] =     40;
  out[maxh] =    400;
  out['r' ] =     30;
  out[minr] =     30;
  out[maxr] =    600;
  return out;
}//----------------------------------------------------------------------------

//Default sizes of each shape type---------------------------------------------
function defaultShapeSize() {
  let out = Object.create(null);

  //Create a default size object for each shape type
  shapeTypes.forEach(type => { 
    out[type] = Object.create(null);
    out[type] = defaultShapeSizeTemplate(); 
  });

  //Shape specific tweaks go here
  //Properties: type, w, h, r, minw, maxw, minh, maxh, minr, maxr
  out[square].w    = 250;
  out[flower].maxr = 250;
  
  return out;
}//----------------------------------------------------------------------------

//Default template for a shape's stroke object---------------------------------
function defaultShapeStrokeTemplate() {
  let out = Object.create(null);
  out['swidth'] = random;
  out['scolor'] =     '';
  out[opacity ] =    0.5;
  return out;
}//----------------------------------------------------------------------------

//Default stroke of shape types------------------------------------------------
function defaultShapeStroke() {
  let out = Object.create(null);

  //Create a default stroke object for each shape type
  shapeTypes.forEach(type => { 
    out[type] = Object.create(null);
    out[type] = defaultShapeStrokeTemplate(); 
  });

  //Stroke Width
  out[square   ].swidth  =   1;
  out[rectangle].swidth  =   0;
  out[flower   ].swidth  =   0;
  //Stroke Color
  out[blob     ].scolor  = '#FFCC9966';
  out[claw     ].scolor  = '#99CCFF66';
  out[cloud    ].scolor  = '#FFFFFF33';
  out[square   ].scolor  = '#00000099';
  out[ellipse  ].scolor  = '#CC666666';
  out[mountain ].scolor  = '#6600CC66';
  out[rectangle].scolor  = '#FF663333';  
  out[circle   ].scolor  = '#99CC9999';
  out[flower   ].scolor  = '#99999966';
  out[hexagon  ].scolor  = '#3399CC66';
  out[octagon  ].scolor  = '#6666FF66';
  out[oddagon  ].scolor  = '#33993366';
  out[polygon  ].scolor  = '#3333CC66';
  out[dexagon  ].scolor  = '#CC333366';
  out[randogon ].scolor  = '#CCCC0066';
  out[pentagon ].scolor  = '#FFFFFF66';
  out[triangle ].scolor  = '#00000033';
  //Stroke Opacity
  out[circle   ].opacity = 0.1;

  return out;
}//----------------------------------------------------------------------------

//Default fill for each of the shape types-------------------------------------
function defaultShapeFill() {
  let out = Object.create(null);
  out[blob     ] = random;
  out[claw     ] = random;
  out[cloud    ] = random;
  out[square   ] = solid;
  out[ellipse  ] = random;
  out[mountain ] = random;
  out[rectangle] = random;
  out[circle   ] = random;
  out[flower   ] = random;
  out[hexagon  ] = random;
  out[octagon  ] = random;
  out[oddagon  ] = random;
  out[polygon  ] = random;
  out[dexagon  ] = random;
  out[randogon ] = random;
  out[pentagon ] = random;
  out[triangle ] = random;  
  return out;
}//----------------------------------------------------------------------------

//Default filter for each of the shape types-----------------------------------
function defaultShapeFilter() {
  let out = Object.create(null);
  out[blob     ] = random;
  out[claw     ] = random;
  out[cloud    ] = random;
  out[square   ] = motionblurx;
  out[ellipse  ] = random;
  out[mountain ] = random;
  out[rectangle] = motionblury;
  out[circle   ] = random;
  out[flower   ] = glow;
  out[hexagon  ] = random;
  out[octagon  ] = random;
  out[oddagon  ] = random;
  out[polygon  ] = random;
  out[dexagon  ] = random;
  out[randogon ] = random;
  out[pentagon ] = random;
  out[triangle ] = glow;  
  //console.log(out);  //DEBUG
  return out;
}//----------------------------------------------------------------------------

//Default properties of objects------------------------------------------------
function defaultObjects() {
  let out = Object.create(null);
  //Used only when shape properties are undefined or set to 'default'
  out['min'     ] =      1;
  out['max'     ] =    250;
  out['maxshape'] =     50;
  out['default' ] =      5;  //NOT IN USE
  out['selected'] =     10;  //NOT IN USE
  out['swidth'  ] =      4;  //Stroke width defualt
  out['scolor'  ] =   lime;  //Stroke color default
  out['acolor'  ] =  white;  //Anchor color default
  out['pcolor'  ] =  black;  //Point  color default
  out['ccolor'  ] =  black;  //Center color default
  out['fill'    ] =  color;  //true, false or color
  return out;
}//----------------------------------------------------------------------------

//Default properties of variants-----------------------------------------------
function defaultVariants() {
  let out = Object.create(null);
  //TODO: For doings transforms on various shapes
  out[min      ] =      1;
  out[max      ] =     10;
  out['default'] =      0;
  out[selected ] = random;
  return out;
}//----------------------------------------------------------------------------

//Default animation duration---------------------------------------------------
function defaultDuration() {
  let out = Object.create(null);  
  out[min      ] =    100;
  out[max      ] =  36000;
  out['default'] =      0;
  out[selected ] = random;
  return out;
}//----------------------------------------------------------------------------

//Default options for calling shape generator functions------------------------
function defaultOptions() {
  let out = Object.create(null);
  out['oid'    ] = 777; 
  out['shape'  ] = 'unknown'; 
  out['filters'] = ''; 
  out['fill'   ] = '';
  return out;
}//----------------------------------------------------------------------------

//Creates the default config object--------------------------------------------
function svgDefaults() { 
  let out = Object.create(null);
  out[    'grids'] = defaultGrids();    
  out[    'paths'] = defaultPaths();    
  out[   'canvas'] = defaultCanvas();   
  out[   'colors'] = defaultColors();   
  out[   'shapes'] = defaultShapes();   
  out[  'enabled'] = defaultEnabled();  
  out[  'filters'] = defaultFilters();  
  out[  'objects'] = defaultObjects();  
  out[ 'variants'] = defaultVariants(); 
  out[ 'duration'] = defaultDuration(); 
  out['gradients'] = defaultGradients();
  return out;
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
    let out = '';
    out += '<filter id="displacement">\r\n';
    out += `  <feTurbulence baseFrequency="0.0${seed25}" seed="${seed1000}" result="turbulence" />\r\n`;
    out += `  <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="${scale}" xChannelSelector="R" yChannelSelector="G" />\r\n`;
    out += '</filter>\r\n';
    output += out;
  }
  
  //GAUSSIAN BLUR--------------------------------------------------------------
  if (svgconf.filters.gaussianblur) {
    let out = '';
    x  = randomInt(5, 99);
    y  = randomInt(5, 99);
    x -= randomInt(1, x); //reduce likelihood of large x
    y -= randomInt(1, y); //reduce likelihood of large y
    out += '<filter id="gaussianblur">\r\n';
    out += `  <feGaussianBlur in="SourceGraphic" stdDeviation="${x} ${y}" edgeMode="duplicate" color-interpolation-filters="sRGB" />\r\n`;
    out += '</filter>\r\n';
    output += out;
  }

  //MOTION BLUR X--------------------------------------------------------------
  if (svgconf.filters.motionblurx) {
    let out = '';
    x  = randomInt(5, 200);
    x -= randomInt(1,   x); //reduce likelihood of large x
    out += '<filter id="motionblurx">\r\n';
    out += `  <feGaussianBlur in="SourceGraphic" stdDeviation="${x} 0" edgeMode="duplicate" color-interpolation-filters="sRGB" />\r\n`;
    out += '</filter>\r\n';
    output += out;
  }

  //MOTION BLUR Y--------------------------------------------------------------
  if (svgconf.filters.motionblury) {
    let out = '';
    y  = randomInt(5, 200);
    y -= randomInt(1,   y); //reduce likelihood of large y
    out += '<filter id="motionblury">\r\n';
    out += `  <feGaussianBlur in="SourceGraphic" stdDeviation="0 ${y}" edgeMode="duplicate" color-interpolation-filters="sRGB" />\r\n`;
    out += '</filter>\r\n';
    output += out;
  }

  //GLOW-----------------------------------------------------------------------
  if (svgconf.filters.glow) {
    let out = '';
    c = randomInt(1, colors);
    d = randomInt(2, 30);
    out += '<filter id="glow">\r\n'
    out += `  <feDropShadow in="FillPaint" dx="0" dy="0" stdDeviation="${d}" flood-color="var(--c${c})" />\r\n`;
    out += '</filter>\r\n';
    output += out;
  }

  //POINTLIGHTING--------------------------------------------------------------
  if (svgconf.filters.pointlighting) {
    let out = '';
    x = randomInt(width  * 0.1, width  * 0.9);
    y = randomInt(height * 0.1, height * 0.9);
    c = randomInt(1, colors);
    z = seed1000;
    out += '<filter id="pointlighting">\r\n';
    out += `  <feDiffuseLighting in="SourceGraphic" result="light" lighting-color="var(--c${c})">\r\n`;
    out += `    <fePointLight x="${x}" y="${y}" z="${z}" />\r\n`;
    out += '  </feDiffuseLighting>\r\n';
    out += '  <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />\r\n';
    out += '</filter>\r\n';
    output += out;
  }

  //TILE-----------------------------------------------------------------------
  if (svgconf.filters.tile) {
    let out = '';
    x = randomInt(width  * 0.5, width  * 0.75);
    y = randomInt(height * 0.5, height * 0.75);
    w = randomInt(1, x);
    h = randomInt(1, y);
    out += `<filter id="tile" x="0" y="0" width="100%" height="100%">\r\n`;
    out += `  <feTile in="SourceGraphic" x="${x}" y="${y}" width="${w}" height="${h}" />\r\n`;
    out += '  <feTile />\r\n';
    out += '</filter>\r\n';
    output += out;
  }

  //DANCE----------------------------------------------------------------------
  if (svgconf.filters.dance) {
    let out = '';
    out += '<filter id="dance" color-interpolation-filters="linearRGB" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">\r\n';
    out += '  <feMorphology operator="dilate" radius="8 8" in="SourceAlpha" result="morphology"/>\r\n';
    out += '  <feFlood flood-color="#000000" flood-opacity="0.5" result="flood"/>\r\n';
    out += '  <feComposite in="flood" in2="morphology" operator="in" result="composite"/>\r\n';
    out += '  <feComposite in="composite" in2="SourceAlpha" operator="out" result="composite1"/>\r\n';
    out += '  <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="1" seed="0" stitchTiles="stitch" result="turbulence"/>\r\n';
    out += '  <feDisplacementMap in="composite1" in2="turbulence" scale="17" xChannelSelector="A" yChannelSelector="A" result="displacementMap"/>\r\n';
    out += '  <feMerge result="merge">\r\n';
    out += '    <feMergeNode in="SourceGraphic" result="mergeNode"/>\r\n';
    out += '    <feMergeNode in="displacementMap" result="mergeNode1"/>\r\n';
    out += '  </feMerge>\r\n';
    out += '</filter>\r\n';
    output += out;
  }

  //WATERCOLOR-----------------------------------------------------------------
  if (svgconf.filters.watercolor) {
    let out = '';
    out += '<filter id="watercolor" color-interpolation-filters="sRGB" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">\r\n';
    out += '  <feTurbulence type="fractalNoise" baseFrequency="0.09 0.09" numOctaves="7" seed="1" stitchTiles="stitch" result="turbulence"/>\r\n';
    out += '  <feDiffuseLighting surfaceScale="0.5" diffuseConstant="3.2" lighting-color="#ffffff" in="turbulence" result="diffuseLighting">\r\n';
    out += '    <feDistantLight azimuth="250" elevation="16"/>\r\n';
    out += '  </feDiffuseLighting>\r\n';
    out += '  <feTurbulence type="fractalNoise" baseFrequency="0.011 0.004" numOctaves="2" seed="3" stitchTiles="noStitch" result="turbulence1"/>\r\n';
    out += '  <feColorMatrix type="saturate" values="3" in="turbulence1" result="colormatrix"/>\r\n';
    out += '  <feColorMatrix type="matrix" values=\r\n';
    out += '    "2 0   0 0 0\r\n';
    out += '     0 1.5 0 0 0\r\n';
    out += '     0 0   2 0 0\r\n';
    out += '     0 0   0 2 0" in="colormatrix" result="colormatrix1"/>\r\n';
    out += '  <feBlend mode="multiply" in="diffuseLighting" in2="colormatrix1" result="blend"/>\r\n';
    out += '  <feComposite in="blend" in2="SourceAlpha" operator="in" result="composite1"/>\r\n';
    out += '</filter>\r\n';
    output += out;
  }  

  //CHAOTIC--------------------------------------------------------------------
  if (svgconf.filters.chaotic) {
    let out = '';  
    out += '<filter id="chaotic" color-interpolation-filters="linearRGB" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">\r\n';
    out += '  <feTurbulence type="turbulence" baseFrequency="0.015 0.015" numOctaves="3" seed="8" stitchTiles="stitch" result="turbulence"/>\r\n';
    out += '  <feMorphology operator="dilate" radius="35 35" in="turbulence" result="morphology"/>\r\n';
    out += '  <feColorMatrix type="matrix" values=\r\n';
    out += '    "1 0 0 0 0\r\n';
    out += '     0 1 0 0 0\r\n';
    out += '     0 0 1 0 0\r\n';
    out += '     0 0 0 10 0" in="morphology" result="colormatrix"/>\r\n';
    out += '  <feColorMatrix type="saturate" values="10" in="colormatrix" result="colormatrix1"/>\r\n';
    out += '  <feComposite in="colormatrix1" in2="SourceAlpha" operator="in" result="composite"/>\r\n';
    out += '</filter>\r\n';
    output += out;
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

function svgGridPoints() {
  let grid = []
  switch (svgconf.grids) {
    case 'normal'  : grid = svgCartesianGrid(); break;
    case 'radial'  : grid = svgRadialGrid(); break;
    case 'spiral'  : grid = svgSpiralGrid(); break;
    case 'diagonal': grid = svgCartesianGrid('diagonal'); break
    default        : grid = svgCartesianGrid();
  }
  return grid;
}//----------------------------------------------------------------------------

//Radial R,A grid--------------------------------------------------------------
function svgRadialGrid( r=0, a=0, dr=0, da=0, cx=0, cy=0, bound="?" ) {
  r  = r  ? r : svgconf.grids.r;
  a  = a  ? a : svgconf.grids.a;
  dr = dr ? dr: svgconf.grids.dr; //Radius incremental delta
  da = da ? da: svgconf.grids.da; //Angle incremental delta
  cx = cx ? cx: roundInt(width/2,1);
  cy = cy ? cy: roundInt(height/2,1);
  b  = bound;
  b  = (b="?") ? svgconf.grids.bound : false; //False for building shapes (not grids)
  let points = [ { z:'ignore-zero', x:cx , y:cy, r:r, a:a } ]; //index 0 is the center mark 
  let rings  = Math.trunc(r   / dr); //Number of rings
  let jewels = Math.trunc(360 / da); //Jewels per ring
  let nudge  = (2 * Math.PI)/jewels; //360 degrees is (2 * Pi) in radians
  let ignore = 0; //Number of ignored points
  let radius = 0; //Radius of each ring
  let radian = 0; //Angle in radian
  let angle  = 0; //Angle in degrees
  let msg    = '';
  let num    = 1;
  let x      = 0;
  let y      = 0;

  //Radial Clockwise
  for (let ring=1; ring<=rings; ring++) {
    for(let jewel=0; jewel<jewels; jewel++) {
      radius = ring*dr;
      radian = nudge * (jewel + 0.001); //Fixes rounding error
      angle  = roundInt(radian*(180/Math.PI),1)
      x = roundInt(cx + (radius * Math.cos(radian)),1);
      y = roundInt(cy + (radius * Math.sin(radian)),1);
      if (bound && ((x<0) || (x>width) || (y<0) || (y>height))) {
        msg += ((x<0) || (x>width))  ? 'Ignored out of bounds (X: '+x+') ':'Even with a normal    (X: '+x+') ';  
        msg += ((y<0) || (y>height)) ? 'Ignored out of bounds (Y: '+y+') ':'Even with a normal    (Y: '+y+') '; 
        msg += '\r\n';
        ignore++;        
      } else {
        points[num] = { x:x , y:y, r:radius, a:(jewel*da) }; //skip index 0
        num++;
      }
    }
  }

  if (bound) console.log(ignore+' points where ignored for being out of bounds');
  //console.log(points);  //console.log(msg);  //DEBUG

  return points;
}//----------------------------------------------------------------------------

//Spiral R,A grid--------------------------------------------------------------
function svgSpiralGrid( r=0, a=0, dr=0, da=0, cx=0, cy=0, sr=0, sa=0, bound="?" ) {
  r  = r  ? r : svgconf.grids.r;
  a  = a  ? a : svgconf.grids.a;
  dr = dr ? dr: svgconf.grids.dr; //Radius incremental delta
  da = da ? da: svgconf.grids.da; //Angle incremental delta
  sr = sr ? sr: svgconf.grids.sr; //Spiral radius delta
  sa = sa ? sa: svgconf.grids.sa; //Spiral angle delta
  cx = cx ? cx: roundInt(width/2,1);
  cy = cy ? cy: roundInt(height/2,1);
  b  = bound;
  b  = (b="?") ? svgconf.grids.bound : false; //False for building shapes (not grids)
  let points = [ { z:'ignore-zero', x:cx , y:cy, r:r, a:a } ]; //index 0 is the center mark 
  let rings  = Math.trunc(r   / dr); //Number of rings
  let jewels = Math.trunc(360 / da); //Jewels per ring
  let nudge  = (2 * Math.PI)/jewels; //360 degrees is (2 * Pi) in radians
  let ignore = 0; //Number of ignored points
  let radius = 0; //Radius of each ring
  let radian = 0; //Angle in radian
  let angle  = 0; //Angle in degrees
  let msg    = '';
  let num    = 1;
  let x      = 0;
  let y      = 0;

  //Spiral Clockwise
  radius = 0;
  radian = 0;
  for (let ring=1; ring<=rings; ring++) {
    //radius += dr; //roundInt(da/sr,1);
    for(let jewel=0; jewel<jewels; jewel++) {
      angle  = roundInt(radian*(180/Math.PI),1);
      x = roundInt(cx + (radius * Math.cos(radian)),1);
      y = roundInt(cy + (radius * Math.sin(radian)),1);
      if (bound && ((x<0) || (x>width) || (y<0) || (y>height))) {
        msg += ((x<0) || (x>width))  ? 'Ignored out of bounds (X: '+x+') ':'Even with a normal    (X: '+x+') ';  
        msg += ((y<0) || (y>height)) ? 'Ignored out of bounds (Y: '+y+') ':'Even with a normal    (Y: '+y+') '; 
        msg += '\r\n';
        ignore++;        
      } else {
        points[num] = { x:x , y:y, r:radius, a:(jewel*da) }; //skip index 0
        num++;
      }
      radian += nudge + (sa*(180/Math.PI)); //Fixes rounding error
      radius += (dr+(jewel*Math.sqrt(sr*jewel)))/jewels;
    }
  }

  if (bound) console.log(ignore+' points where ignored for being out of bounds');
  //console.log(points);  //console.log(msg);  //DEBUG

  return points;
}//----------------------------------------------------------------------------

//Normal X,Y grid--------------------------------------------------------------
function svgCartesianGrid(diagnal = false) {  
  let sx = svgconf.grids.start.x;
  let sy = svgconf.grids.start.y;
  let ex = svgconf.grids.end.x ? svgconf.grids.end.x : width;
  let ey = svgconf.grids.end.y ? svgconf.grids.end.y : height;
  let dx = svgconf.grids.dx;
  let dy = svgconf.grids.dy;
  let points  = ['ignore-zeor'];
  let xlength = ex - sx;
  let ylength = ey - sy;
  let rows = Math.trunc(ylength / dy); //Number of rows
  let cols = Math.trunc(xlength / dx); //Number of cols

  svgconf.grids.order = 'vertiback';
  switch (svgconf.grids.order) { 
    case 'normal':    points = svgGridOrderNormal(dx,dy,rows,cols); break;
    case 'backward':  points = svgGridOrderBackward(dx,dy,rows,cols); break;
    case 'vertical':  points = svgGridOrderVertical(dx,dy,rows,cols); break;
    case 'vertiback': points = svgGridOrderVertiBack(dx,dy,rows,cols); break;
    // case 'snake':
    // case 'vsnake':
    // case 'spiral':
  }

  return points;
}//----------------------------------------------------------------------------

//Normal Left to right---------------------------------------------------------
function svgGridOrderNormal(dx=160, dy=160, rows=10, cols=6) {
  let pos    = Object.create(null);
  let table  = ['ignore-row-zero'];
  let points = ['ignore-zero'];
  let num    = 1;
  let x      = dx;
  let y      = dy;

  for (let r=1; r<rows; r++) {
    x = dx;
    table[r]=[];

    for (let c=1; c<cols; c++) {
      pos = { x:x , y:y }
      table[r][c] = pos;
      points[num] = pos;
      x += dx;
      num++;
    }
    y += dy;
  } //console.log(table);  //DEBUG
  
  return points;
}//----------------------------------------------------------------------------

//Backward Right to left-------------------------------------------------------
function svgGridOrderBackward(dx=160, dy=160, rows=10, cols=6) {
  let pos    = Object.create(null);
  let table  = [];
  let points = ['ignore-zero'];
  let num    = 1;
  let x      = dx;
  let y      = dy;

  for (let r=1; r<rows; r++) {
    x = dx;
    table[r]=[];

    for (let c=1; c<cols; c++) {
      pos = { x:x , y:y }
      table[r][cols-c] = pos;
      x += dx;
    }
    y += dy;
  } //console.log(table);  //DEBUG

  for (let r=1; r<rows; r++) {
    for (let c=1; c<cols; c++) {
      points[num] = table[r][c];
      num++;
    }
  } 
  
  return points;
}//----------------------------------------------------------------------------

//Top Left to Bottom Right-----------------------------------------------------
function svgGridOrderVertical(dx=160, dy=160, rows=10, cols=6){
  let pos    = Object.create(null);
  let points = ['ignore-zero'];
  let num    = 1;
  let r      = 1;
  let c      = 1;
  let x      = dx;
  let y      = dy;
  
  for (c=1; c<cols; c++) {
    y = dy;
    for (r=1; r<=rows; r++) {
      pos = { x:x , y:y }
      points[num] = pos;
      y += dy;
      num++;
    }
    x += dx;
  }

  return points;
}//----------------------------------------------------------------------------

//Reverse Bottom Right to Top Left---------------------------------------------
function svgGridOrderVertiBack(dx=160, dy=160, rows=10, cols=6){
  let points = svgGridOrderVertical(dx,dy,rows,cols);
  points.shift();  //Gets rid of 'ignore-zero'
  let reversed = ['ignore-zero', ...points.reverse()];  //console.log(reversed); //DEBUG
  return reversed;
}//----------------------------------------------------------------------------

//Everyrow switch between L2R/R2L----------------------------------------------
function svgGridOrderSnake(dx=160, dy=160, rows=10, cols=6){
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
  
  cx  = x + w/2;
  cy  = y + h/2;
  anchors += center ? svgCrossHair(cx, cy, 5, center, 'center mark') : '';

  if (svgconf.enabled.points) { //Find the center anchor
    anchors  = '  '+anchors;  //Indent the center point
    anchors += '  '+svgDrawPoint(   x,   y, 3, pcolor, 'point tlc');
    anchors += '  '+svgDrawPoint( w+x,   y, 3, pcolor, 'point trc');
    anchors += '  '+svgDrawPoint(   x, h+y, 3, pcolor, 'point blc');
    anchors += '  '+svgDrawPoint( w+x, h+y, 3, pcolor, 'point brc');
    anchors  = '<g class="'+ (square ? 'square' : 'rectangle')+' anchors">\r\n'+anchors+'\r\n</g>\r\n';
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
  render += svgconf.enabled.centers ? svgCrossHair(x, y, 5, center, 'center mark') : '';
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

  cx = roundInt(cx/pcount);
  cy = roundInt(cy/pcount);
  if (svgconf.enabled.centers) anchors += svgCrossHair(cx, cy, 5, center, 'center mark');

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
  anchors   = group ? '<g class="cload anchors">\r\n'+anchors+'\r\n</g>\r\n' : anchors;
  output   += anchors; 

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

    if (svgconf.enabled.anchors) output += svgDrawPoint(     ax,     ay, 4, svgconf.paths.arc, 'point anchor arc ');
    if (svgconf.enabled.points ) output += svgDrawPoint(      x,      y, 3, pcolor, 'point');
    if (svgconf.enabled.centers) output += svgCrossHair( startx, starty, 5, center, 'center mark'); 
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
  anchors += (svgconf.enabled.centers) ? '  '+svgCrossHair( startx, starty, 5, center, 'center mark') : '';

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
  let grids    = Object.create(null);
  let paths    = Object.create(null);
  let shapes   = Object.create(null);
  let parsed   = Object.create(null);
  let enabled  = Object.create(null);
  let objects  = Object.create(null);
  let filters  = Object.create(null);
  let d        = Object.create(null);
  d       = svgDefaults();
  grids   = d.grids;
  paths   = d.paths;
  canvas  = d.canvas;
  enabled = d.enabled;
  objects = d.objects;
  let c = d.colors.selected;
  let u = d.duration.selected;
  let v = d.variants.selected;
  let g = d.gradients.selected;
  let w = canvas.width.selected;
  let h = canvas.height.selected;
  let f = 0; //Total number of enabled filters
  let t = 0; //Total number of objects = shapes * variations of each shape

  if (isNaN(w)) w = (w == random) ? roundX(canvas.width.min,  canvas.width.max  ) : canvas.width.default;
  if (isNaN(h)) h = (h == random) ? roundY(canvas.height.min, canvas.height.max ) : canvas.height.default;
  if (isNaN(c)) c = (c == random) ? randomInt(d.colors.min,      d.colors.max   ) : d.colors.default;
  if (isNaN(u)) u = (u == random) ? randomInt(d.duration.min,    d.duration.max ) : d.duration.default;
  if (isNaN(v)) v = (v == random) ? randomInt(d.variants.min,    d.variants.max ) : d.variants.default;
  if (isNaN(g)) g = (g == random) ? randomInt(d.gradients.min,   d.gradients.max) : d.gradients.default;

  if (d.enabled.filters) {  //Only if filters are enabled
    Object.keys(d.filters).forEach(filter => { //Only keep the enabled filters, discared others
      if (d.filters[filter]) {
        filters[filter] = filter;
        f++;
      }
    }); 
  }
  
  Object.keys(d.shapes).forEach(shape => { //Go through each shape type
    if (isNaN(d.shapes[shape].count)) {    //Assign requested random/default values
      d.shapes[shape].count = (shapes[shape].count == 'random') ? randomInt(d.objects.min, shapes[shape].max) : d.objects.default;
    }

    if (d.shapes[shape].count) { //Only keep the enabled shapes, discard others
      shapes[shape] = d.shapes[shape];
      //Create orders for each requested count of the enabled shape types
      for (i=0; i < shapes[shape].count; i++) order[t+i] = shape; 
      t += shapes[shape].count;
    }
  }); 
  
  if (t > d.objects.max) { 
    alert('Warning: number of objects exceed ' + d.objects.max);
  }

  total = t; //Copy the total shapes count value into a global variable

  //Now that we know our total number of shapes let's decipher the rest of variable
  Object.keys(shapes).forEach(shape => {
    if (d.enabled.filters) { //Determine to use random, preselected or no filter per shape
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
  if (d.enabled.points  === true) d.enabled.points  = d.objects.pcolor;
  if (d.enabled.center  === true) d.enabled.center  = d.objects.ccolor;
  if (d.enabled.anchors === true) d.enabled.anchors = d.objects.acolor;

  parsed['width'    ] = w;
  parsed['height'   ] = h;
  parsed['colors'   ] = c;
  parsed['variants' ] = v;
  parsed['duration' ] = u;
  parsed['gradients'] = g;
  parsed['grids'    ] = grids;
  parsed['paths'    ] = paths;
  parsed['shapes'   ] = shapes;
  parsed['filters'  ] = filters;
  parsed['objects'  ] = objects;
  parsed['enabled'  ] = enabled;
  parsed['order'    ] = ['zero', ...randomize(order)];
  
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
  let content = 'text { font-size:0.65em; }\r\n'+svgVars(svgid);
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

//Adds illustrator style grid points-------------------------------------------
function svgXMark(x = 100, y=100, r=4, c='white', classname='xmark', gnum = 0) {
  let mark = '';
  mark += '<path d="';
  mark += ' M '+(x-r)+','+(y+r);
  mark += ' L '+(x+r)+','+(y-r);
  mark += ' M '+(x+r)+','+(y+r);
  mark += ' L '+(x-r)+','+(y-r);
  mark += `" stroke="${c}" `;
  mark += `class="${classname}" `; 
  mark += `/>\r\n`;
  mark += gnum ? mark += `<text fill="${svgconf.grids.text}" x="${x-r}" y="${y+r+10}">${gnum}</text>` : '';
  //mark += svgconf.enabled.grid ? mark += `<text x="${x+r}" y="${y}">${x},${y} </text>` : '';
  
  return mark;
}//----------------------------------------------------------------------------

//Adds illustrator style center points-----------------------------------------
function svgCrossHair(x = 100, y=100, r=5, c='white', classname='mark') {
  let mark = '';
  mark += '<path d="';
  mark += ' M '+(x-r)+','+y;
  mark += ' L '+(x+r)+','+y;
  mark += ' M '+ x   +','+(y-r);
  mark += ' L '+ x   +','+(y+r);
  mark += `" stroke="${c}" `;
  mark += `class="${classname}" `; 
  mark += `/> \r\n`;
  return mark;
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
    //case 'claw'      : render += svgBearClaw(oid,options);   break;      
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

  return output
}//----------------------------------------------------------------------------

function svgShowGrid() {
  let output  = '';
  if (svgconf.enabled.grids && svgconf.grids.show) {
    let points = Array();
    //points = svgCartesianGrid();
    //points = svgRadialGrid();
    points = svgSpiralGrid();

    for (let i=1; i<points.length; i++) {
      let x = points[i].x;
      let y = points[i].y;
      output += svgXMark ( x, y, 4, svgconf.enabled.grids, 'grid', i);
      output += svgDrawPoint(x,y,(5+i),'#9999');
    }
  }
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
  open       += 'preserveAspectRatio="xMinYMid slice" '; //TODO add to config
  open       += `xmlns="${xmlns}" `;
  open       += `xmlns:xlink="${xlink}" >\r\n`;
  output     += open; 
  output     += svgStyle(svgid);
  output     += svgDefs();
  output     += svgContent();
  //output     += svgShowGrid();
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
let svgid         = '123456789';
//Syntax sugars reduce typing
let selected      = 'selected';
let diagonal      = 'diagonal';
let opacity       = 'opacity';
let system        = 'system';
let normal        = 'normal';  
let random        = 'random';  
let radial        = 'radial';  
let shrink        = 'shrink';  
let fixed         = 'fixed';   
let solid         = 'solid';
let both          = 'both';     
let grid          = 'grid';     
let none          = 'none';     
let grow          = 'grow';
let type          = 'type';
let minw          = 'minw';
let maxw          = 'maxw';
let minh          = 'minh';
let maxh          = 'maxh';
let minx          = 'minx';
let maxx          = 'maxx';
let miny          = 'miny';
let maxy          = 'maxy';
let minr          = 'minr';
let maxr          = 'maxr';
let min           = 'min';
let max           = 'max';
//Path related syntax sugars
let quad          = 'quad';     
let cube          = 'cube';     
let line          = 'line';     
let arc           = 'arc';      
//Filter related syntax sugars
let glow          = 'glow';
let tile          = 'tile';
let dance         = 'dance';
let chaotic       = 'chaotic';
let watercolor    = 'watercolor';
let motionblurx   = 'motionblurx';
let motionblury   = 'motionblury';
let displacement  = 'displacement';
let gaussianblur  = 'gaussianblur';
let pointlighting = 'pointlighting';
//Color related syntax sugars  
let color         = '#333F';  //Default BG color
let black         = 'black';   
let white         = 'white';   
let FFF3          = '#FFF3';   
let FFF6          = '#FFF6';   
let FFF9          = '#FFF9';   
let FFFC          = '#FFFC';   
let FF03          = '#FF03';   
let FF06          = '#FF06';   
let FF09          = '#FF09';   
let FF0C          = '#FF0C';   
let gold          = 'gold';     
let lime          = 'lime';     
let pink          = 'hotpink';
let red           = 'red';     
//Shape types syntax sugar allows modifications in only one spot
let shapeTypes    = Array(null);
let blob          = 'blob';
let claw          = 'claw';
let cloud         = 'cloud';
let square        = 'square';
let ellipse       = 'ellipse';
let mountain      = 'mountain';
let rectangle     = 'rectangle';
let circle        = 'circle';
let flower        = 'flower';
let hexagon       = 'hexagon';
let octagon       = 'octagon';
let oddagon       = 'oddagon';
let polygon       = 'polygon';
let dexagon       = 'dexagon';
let randogon      = 'randogon';
let pentagon      = 'pentagon';
let triangle      = 'triangle';
shapeTypes        = [
  blob      ,
  claw      ,
  cloud     ,
  square    ,
  ellipse   ,
  mountain  ,
  rectangle ,
  circle    ,
  flower    ,
  hexagon   ,
  octagon   ,
  oddagon   ,
  polygon   ,
  dexagon   ,
  randogon  ,
  pentagon  ,
  triangle  ,    
];
//Actual global variables 
let svgFiles      = {}; //Final rendered file output
let idStack       = []; //Keeps track of previous render 
let elements      = []; //Keeps track of each element data and rendered outputs
let total         = 0;
let lastIndex     = 0;
let anchorall     = '';
let svgconf       = parseConf();
let opt           = defaultOptions();
let filters       = Object.keys(svgconf.filters);
let scount        = Object.keys(svgconf.shapes).length; //Number of enabled shapes
let fcount        = filters.length;                     //Number of enabled filters
let width         = svgconf.width;
let height        = svgconf.height;
let colors        = svgconf.colors;
let pcolor        = svgconf.enabled.points;  //Point  color
let center        = svgconf.enabled.centers; //Center color
let acolor        = svgconf.enabled.anchors; //Anchor color
let gcolor        = svgconf.enabled.grids;   //Grid   color
//console.log(svgconf);  //DEBUG

//Make the whole thing run just once on page load
window.addEventListener('load', initializeSVGen);