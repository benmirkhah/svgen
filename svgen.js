//Creates the default config object
function svgdefaults() { 
  //Don't include default JS prototypes
  let conf      = Object.create(null);
  let enabled   = Object.create(null);
  let objects   = Object.create(null);
  let width     = Object.create(null);
  let height    = Object.create(null);
  let colors    = Object.create(null);
  let shapes    = Object.create(null);
  let filters   = Object.create(null);
  let variants  = Object.create(null);
  let duration  = Object.create(null);
  let gradients = Object.create(null);

  shapes = { //TODO: each shape should have config for min max etc.
    blobs: 0,
    claws: 0,
    clouds: 3,
    circles: 12,  //'random',
    squares: 2,   //'default',
    ellipses: 0,  //TODO
    hexagons: 0,  //TODO
    octagons: 0,  //TODO
    polygons: 0,  //TODO
    pentagons: 0, //TODO
    triangles: 0, //TODO
    mountains: 0, //TODO
    rectangles: 0,
  };

  enabled = {
    stroke: false,
    points: false,     //true, false, or color
    anchors: false,    //true, false, or color
    filters: true,
    bgcolor: true,     //true (currentColor), false, or color
    gradients: true,
    variants:  false,  //TODO
    animation: false,  //TODO
  }; 

  objects = {
    min: 1,
    max: 250,
    default: 5,
    selected: 10,
    fill:   'none',   //TODO: color, radial, linear, both, solid, random, none
    scolor: 'gold',   //TODO: Stroke: black, white, uniform, random
    swidth: 'thick',  //TODO: Stroke: thin, thick, random
  };
  
  paths = {
    type: 'cube',     //arc, quad, cube, line, all, TODO: random 
    arc:  'skyblue',  //false,      //
    cube: 'lime',     //false,      //
    quad: 'orange',   //false,      //
    line: 'black',    //false,      //
  }

  width = {
    min: 100,
    max: 3000,
    default: 640,
    selected: 1920,
  };

  height = {
    min: 100,
    max: 3000,
    defualt: 480,
    selected: 957,
  };

  colors = {
    min: 3,
    max: 256,
    default: 10,
    selected: 100,
  };

  gradients = {
    min: 2,
    max: 9,
    default: 3,
    selected: 4,
    orientation: 'both', //TODO: horiz, vertical, both, aligned, random
  };

  filters = {
    displacement: true,
    gaussianblur: true,
    glow: true,
    pointlighting: true,
    tile: false,
  };

  duration = {
    min: 100,
    max: 36000,
    default: 0,
    selected: 'random',
  };
  
  variants = {
    min: 1,
    max: 10,
    default: 0,
    selected: 'random',
  };

  conf = {
    enabled: enabled,
    objects: objects,
    width: width,
    height: height,
    colors: colors,
    paths: paths,
    shapes: shapes,
    filters: filters,
    variants: variants, //TODO
    duration: duration, //TODO
    gradients: gradients,
  };

  return conf;
}//----------------------------------------------------------------------------

//Decipher what elements need to random----------------------------------------
function parseConf() {
  let order    = Array();
  let parsed   = Object.create(null);
  let defaults = svgdefaults();
  let paths    = defaults.paths;
  let shapes   = defaults.shapes;
  let filters  = defaults.filters;
  let enabled  = defaults.enabled;
  let objects  = defaults.objects;
  let w = defaults.width.selected;
  let h = defaults.height.selected;
  let c = defaults.colors.selected;
  let d = defaults.duration.selected;
  let v = defaults.variants.selected;
  let g = defaults.gradients.selected;
  let t = 0; //Total number of objects = shapes * variations of each shape
  let types = 0; //Shape types count

  //Elements configuration values are not exposed to the user, hence no need to parse
  if (isNaN(w)) w = (w == 'random') ? roundX(defaults.width.min,         defaults.width.max     ) : defaults.width.default;
  if (isNaN(h)) h = (h == 'random') ? roundX(defaults.height.min,        defaults.height.max    ) : defaults.height.default;
  if (isNaN(c)) c = (c == 'random') ? randomInt(defaults.colors.min,     defaults.colors.max    ) : defaults.colors.default;
  if (isNaN(d)) d = (d == 'random') ? randomInt(defaults.duration.min,   defaults.duration.max  ) : defaults.duration.default;
  if (isNaN(v)) v = (v == 'random') ? randomInt(defaults.variants.min,   defaults.variants.max  ) : defaults.variants.default;
  if (isNaN(g)) g = (g == 'random') ? randomInt(defaults.gradients.min,  defaults.gradients.max ) : defaults.gradients.default;

  Object.keys(shapes).forEach(shape => {
    if (isNaN(shapes[shape])) {  //All shapes are objects 
      shapes[shape] = (shapes[shape] == 'random') ? randomInt(defaults.objects.min, defaults.objects.max) : defaults.objects.default;
    }
    //Create the shapes order array
    for (i=0; i < shapes[shape]; i++) order[t+i] = shape; 
    t += shapes[shape];
    types++; 
  }); 
  
  if (t > defaults.objects.max) { 
    alert('Warning: number of objects exceed ' + defaults.objects.max);
  }

  parsed = {
    elements: t, 
    width: w,
    height: h,
    colors: c,
    variants: v,
    duration: d,
    gradients: g,
    paths:   paths,
    shapes:  shapes,
    filters: filters,
    objects: objects,
    enabled: enabled,
    order: ['zero', ...randomize(order)],
  }

  return parsed;
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
    for (let i=1; i <= elements; i++) {
      output += svgGrad(svgid+'-'+i, ((i % 2) ? 'L' : 'R'));
    }
  } else {
    output = '<!-- No gradients -->';
  }
  return output
}//----------------------------------------------------------------------------

//Adds the <defs> element for gradients to reside in---------------------------
function svgDefs() {
  return '<defs>\r\n' + svgGradients() + '</defs>\r\n';
}//----------------------------------------------------------------------------
 
//Depending on config adds enabled filters-------------------------------------
function svgFilters(svgid) {
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
    pointlighting += '  </filter>\r\n';
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

  return output;
}//----------------------------------------------------------------------------

//Generates squares & rectangles based on config-------------------------------
function svgRect (oid = 'no-order-id', square = false, filter='') {
  let sid    = svgid+'-'+oid;  
  let output = '';
  let open   = '<rect ';
  let close  = '</rect>\r\n';
  let h,w,f,x,y = 1;

  f  = filters[randomInt(0, filterCount)];
  x  = randomInt(0,  width);
  y  = randomInt(0,  height);
  x -= randomInt(1, x); //reduce likelihood of large x
  y -= randomInt(1, y); //reduce likelihood of large y
  w  = randomInt(50, width  / 2);
  h  = randomInt(50, height / 2);
  w += randomInt(1, w); //increase likelihood of large x
  h += randomInt(1, h); //increase likelihood of large y
  if (square) w = h;    //make squares when requested

  output += open;
  output += `id="rect-${sid}" `;
  output += 'class ="'+( square ? 'square' : 'rectangle' )+'" ';
  output += `fill="url(#grad-${sid})" `;
  output += `x="${x}" `;
  output += `y="${y}" `;
  output += `width="${w}" `;
  output += `height="${h}" `;
  output += `filter="url(#${f})">`;
  output += close;
  
  return output;
}//----------------------------------------------------------------------------

//Generates a circle based on config-------------------------------------------
function svgCircle (oid = 'no-order-id', filter = '') {
  let sid    = svgid+'-'+oid;
  let output = '';
  let open   = '<circle id="circ-'+sid+'"';
  let close  = '</circle>\r\n';
  let x,y,r,f = 1;

  f  = filters[randomInt(0, filterCount)];
  x  = randomInt(0,  width  * 1.5);
  y  = randomInt(0,  height * 1.5);
  x -= randomInt(1, x); //reduce likelihood of large x
  y -= randomInt(1, y); //reduce likelihood of large y
  r  = randomInt(50, height / 2 );
  r += randomInt(1, r / 2 ); //increase likelihood of large x

  output += open;
  output += `fill="url(#grad-${sid})" `;
  output += `cx="${x}" `;
  output += `cy="${y}" `;
  output += `r="${r}" `;
  output += `filter="url(#${f})">`;
  output += close;
  
  
  return output;
}//----------------------------------------------------------------------------

//Makes Bear Claws-------------------------------------------------------------
function svgBearClaw(oid = 'no-order-id', filter = '') {
  let sid    = svgid+'-'+oid; //shape-id
  let output = '';
  let open   = '<path id="claw-'+sid+'" class="bearclaw" ';
  let close  = '</path>\r\n';
  let j,k,p    = 0;
  let u,v,x,y  = 0;
  let segCount = randomInt(2, 9);
  let startx   = randomInt(width  * 0.15, width  * 0.5);
  let starty   = randomInt(height * 0.15, height * 0.5);
  startx       = 100 * Math.trunc(startx/100);
  starty       = 50  * Math.trunc(starty/100);
  
  output += open
  output += svgconf.enabled.stroke ? 'stroke="'+svgconf.objects.scolor+'" ' :  'stroke="none" ';
  output += `fill="url(#grad-${sid})" `;
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

//Adds illustrator style anchor point------------------------------------------
function svgDrawPoint(x = 100, y=100, r=5, c='white', classname='point') {
  let output = '';
  let circle = '';
  circle += `<circle class="${classname}" `;
  circle += `stroke="${c}" `;
  circle += `cx="${x}" `;
  circle += `cy="${y}" `;
  circle += `r="${r}" /> \r\n`;
  output += circle;
  return output;
}//----------------------------------------------------------------------------

//Generate clouds--------------------------------------------------------------
function svgCloud(oid = 'no-order-id', filter = '') {
  let sid    = svgid+'-'+oid;
  let pcount = 2 * randomInt(2,5);
  let points = svgPoints(width, height, pcount); //console.log(points); //DEBUG
  let open   = '<path ';
  let close  = '\r\n</path>\r\n';
  let output = '';
  let fill   = '';
  let line   = '';
  let cube   = '';
  let quad   = '';
  let arc    = '';
  let x,y    = 0;
  let u,v    = 0;
  let dx,dy  = 0;
  let qx,qy  = 0;
  let mx     = moveX(360, 720);
  let my     = moveY(180, 360); //console.log( mx + ' : ' + my ); //DEBUG
  let startx = mx+points[1].x;
  let starty = my+points[1].y;
  let scolor = svgconf.objects.scolor;

  if (svgconf.enabled.gradients) {
    fill = `url(#grad-${sid})`;
  } else {
    if (svgconf.objects.fill == "solid") {
      fill = `var(--c${sid})`;
    } else {
      fill = svgconf.objects.fill;
    }
  }

  fill = `fill="${fill}" d="\r\n  M `+startx+' '+starty+' \r\n';
  arc  = open+'id="cloud-'+sid+'-a" class="cloud arc"  '+fill;
  cube = open+'id="cloud-'+sid+'-c" class="cloud cube" '+fill;
  quad = open+'id="cloud-'+sid+'-q" class="cloud quad" '+fill;
  line = open+'id="cloud-'+sid+'-l" class="cloud line" '+fill;
  
  for (i=1; i<=pcount; i++) {
    x = mx+points[i].x;
    y = my+points[i].y;
    u = mx+points[i+1].x;
    v = my+points[i+1].y;
        
    //Close the path by returning to the starting point
    if (i == pcount) { u = startx; v = starty; }
    
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
    
    if (svgconf.enabled.anchors) {
      output += (svgconf.paths.type == 'all') ? '<g class="anchors"> \r\n' : ''; 

      //Display enabled anchors
      if (svgconf.paths.arc  || svgconf.paths.all) output += svgDrawPoint(qx,    qy,    6, svgconf.paths.arc,  'point anchor arc ');      
      if (svgconf.paths.cube || svgconf.paths.all) output += svgDrawPoint(cubeX, cubeY, 6, svgconf.paths.cube, 'point anchor cube');
      if (svgconf.paths.quad || svgconf.paths.all) output += svgDrawPoint(quadX, quadY, 6, svgconf.paths.quad, 'point anchor quad');
      if (svgconf.paths.line)                      output += svgDrawPoint(dx,    dy,    6, svgconf.paths.line, 'point anchor line');
          
      output += (svgconf.paths.type == 'all') ? '\r\n</g> \r\n' : ''; 
    }

    if (svgconf.enabled.points) {
      pcolor  = (svgconf.enabled.points === true) ? scolor : svgconf.enabled.points;  
      output += svgDrawPoint(x, y, 2, pcolor, 'point');
    }
  }

  let arcStroke  = '>';
  let cubeStroke = '>';
  let quadStroke = '>';
  let lineStroke = '>';

  if (svgconf.enabled.stroke) { 
    arcStroke  = ` stroke="${svgconf.paths.arc }">`;
    cubeStroke = ` stroke="${svgconf.paths.cube}">`; 
    quadStroke = ` stroke="${svgconf.paths.quad}">`;
    lineStroke = ` stroke="${svgconf.paths.line}">`;
  }

  arc    += '  Z" '+arcStroke +close; 
  cube   += '  Z" '+cubeStroke+close;
  quad   += '  Z" '+quadStroke+close;
  line   += '  L  '+(startx)+','+(starty)+'  Z" '+lineStroke+close;
  
  switch (svgconf.paths.type) {
    case 'all':  output += arc+cube+quad; break;
    case 'arc':  output += arc;  break;
    case 'cube': output += cube; break;
    case 'quad': output += quad; break;
    case 'line': output += line; break;
  }

  return output;
}//----------------------------------------------------------------------------

//Adds elements enabled in config----------------------------------------------
function svgContent() {
  let output  = '';
  let bgcolor = '';
  bgcolor     = (svgconf.enabled.bgcolor === true) ? 'currentColor' : svgconf.enabled.bgcolor;
  bgcolor     = (!svgconf.enabled.bgcolor        ) ? 'none'         : bgcolor;
  output += '<rect '; //Add a bounding box
  output += `id="box-${svgid}" `;
  output += `x="0" y="0" `;
  output += `width="${width}" `;
  output += `height="${height}" `; 
  output += `fill="${bgcolor}" `;
  output += `></rect>\r\n`;  //allow parent element to control border color

  for (oid=1; oid < svgconf.order.length; oid++) {
    switch( svgconf.order[oid] ) {      
      case 'claws'      : output += svgBearClaw(oid);   break;
      case 'clouds'     : output += svgCloud(oid);      break;
      case 'circles'    : output += svgCircle(oid);     break;
      case 'squares'    : output += svgRect(oid, true); break;
      case 'rectangles' : output += svgRect(oid);       break;
    //case 'ellipses'   : output += svgElps(oid);       break;
    //case 'triangles'  : output += svgPoly(oid, 3);    break;
    //case 'pentagons'  : output += svgPoly(oid, 5);    break;
    //case 'hexagons'   : output += svgPoly(oid, 6);    break;
    //case 'octagons'   : output += svgPoly(oid, 8);    break;
    //case 'polygons'   : output += svgPoly(oid, 9);    break;
    //case 'blobs'      : output += svgBlob(oid);       break;
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
//open       += `width="${width}" height="${height}" `;
  open       += `viewBox="0 0 ${width} ${height}" `;
  open       += `id="svg-${svgid}" `;
  open       += `fill="none" `;
  open       += `xmlns="${xmlns}" `;
  open       += `xmlns:xlink="${xlink}" >\r\n`;
  output     += open; 
  output     += svgStyle(svgid);
  output     += svgDefs(svgid);
  output     += svgFilters(svgid)
  output     += svgContent(svgid);
  output     += close;
  return output;
}//----------------------------------------------------------------------------

//Inserts the <svg> in the dom-------------------------------------------------
function svgInsert(element) {
  element.innerHTML = svgTag();
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
  console.log("elements : "+elements);
  console.log("  colors : "+colors);
  console.log("  height : "+height);
  console.log("   width : "+width);
  const svgens = document.querySelectorAll('.svgen');
  svgens.forEach(svgen => { svgInsert(svgen)});
  console.log("SVGen initialized");
  return "Done!";
}, this);
//-----------------------------------------------------------------------------

//Set global variables and run-------------------------------------------------
let svgid       = '123456789';
let svgconf     = parseConf(); //console.log(svgconf);
let filters     = Object.keys(svgconf.filters);
let filterCount = filters.length;
let width       = svgconf.width;
let height      = svgconf.height;
let colors      = svgconf.colors;
let elements    = svgconf.elements;
//console.log(svgconf.order);  //DEBUG

//Make the whole thing run just once on page load
window.addEventListener('load', initializeSVGen);
