//Creates the default config object
function svgdefaults() { 
  let conf = Object.create(null); //Don't include default JS prototype junk
  conf = {
    elements: {
      min: 1,
      max: 1000,
      fill: 'random', //TODO: gradients, solid color, both, random
      stroke: 'random', //TODO: black, white, uniform, random
      swidth: 'thick', //TODO: thin, thick, random
    },
    width: {
      min: 100,
      max: 3000,
      default: 640,
      selected: 1600,
    },
    height: {
      min: 100,
      max: 3000,
      defualt: 480,
      selected: 720,
    },
    colors: {
      min: 3,
      max: 256,
      default: 10,
      selected: 'random',
    },
    symbols: {
      min: 1,
      max: 100,
      default: 5,
      selected: 10,
    },
    variations: { //TODO: variations
      min: 1,
      max: 10,
      default: 0,
      selected: 'random',
    },
    duration: { //TODO: animation
      min: 100,
      max: 36000,
      default: 0,
      selected: 'random',
    },
    gradients: {
      min: 2,
      max: 9,
      default: 3,
      selected: 'random',
      type: 'both', //TODO: linear, radial, both
      orientation: 'both', //TODO: horiz, vertical, both, aligned, random
    },
    shapes: {
      blobs: 2, //TODO
      claws: 1,
      circles: 'random',
      squares: 'default',
      ellipses: 2, //TODO
      polygons: 2, //TODO
      triangles: 'bob', //TODO
      mountains: 1, //TODO
      rectangles: 0,
    },
    filters: {
      displacement: 'random',
      gaussianblur: 'random',
      glow: 'random',
      pointlighting: 'random',
      tile: false,
    },
    enabled: {
      filters: 'random',
      animation: 'random',
      gradients: 'random',
      stroke: false,
    }
  }; 
  return conf;
}//----------------------------------------------------------------------------

//Needs to be a builtin JS function, grumble-----------------------------------
function randomInt(min = 0, max = 100) {
  return Math.floor(min + (Math.random() * (max - min)));
}//----------------------------------------------------------------------------

//Implements CSS style rounding------------------------------------------------
function rountInt(num = 10, factor = 10) {
  return factor * Math.trunc(num/factor);
}//----------------------------------------------------------------------------

//Sugar syntax wrapper for generating random X cords---------------------------
function roundX(min = 1, max = width, factor = 10) {
  return rountInt(randomInt(min, max), factor);
}//----------------------------------------------------------------------------

//Sugar syntax wrapper for generating random Y cords---------------------------
function roundX(min = 1, max = height, factor = 10) {
  return rountInt(randomInt(min, max), factor);
}//----------------------------------------------------------------------------

//Decipher what elements need to random----------------------------------------
function parseConf() {
  let parsed   = Object.create(null);
  let defaults = svgdefaults();
  let shapes   = defaults.shapes;
  let filters  = defaults.filters;
  let enabled  = defaults.enabled;
  let w = defaults.width.selected;
  let h = defaults.height.selected;
  let c = defaults.colors.selected;
  let s = defaults.symbols.selected;
  let d = defaults.duration.selected;
  let g = defaults.gradients.selected;
  let v = defaults.variations.selected;
  let e = 0; //Total number of elements = shapes * variations of each shape

  //Symbols configuration values are not exposed to the user, hence no need to parse
  if (isNaN(w)) w = (w == 'random') ? roundX(defaults.width.min,         defaults.width.max     ) : defaults.width.default;
  if (isNaN(h)) h = (h == 'random') ? roundX(defaults.height.min,        defaults.height.max    ) : defaults.height.default;
  if (isNaN(c)) c = (c == 'random') ? randomInt(defaults.colors.min,     defaults.colors.max    ) : defaults.colors.default;
  if (isNaN(d)) d = (d == 'random') ? randomInt(defaults.duration.min,   defaults.duration.max  ) : defaults.duration.default;
  if (isNaN(g)) g = (g == 'random') ? randomInt(defaults.gradients.min,  defaults.gradients.max ) : defaults.gradients.default;
  if (isNaN(v)) v = (v == 'random') ? randomInt(defaults.variations.min, defaults.variations.max) : defaults.variations.default;
  
  Object.keys(shapes).forEach(shape => {
    if (isNaN(shapes[shape])) {
      //All shapes use the symbols configuration values
      shapes[shape] = (shapes[shape] == 'random') ? randomInt(defaults.symbols.min, defaults.symbols.max) : defaults.symbols.default;
    }
    e += shapes[shape];
  });

  if (e > defaults.elements.max) { 
    alert('Warning: number of elements exceed ' + defaults.elements.max); 
  }

  parsed = {
    elements: e, 
    width: w,
    height: h,
    colors: c,
    symbols: s,
    variations: v,
    duration: d,
    shapes: shapes,
    filters: filters,
    enabled: enabled,
  }

  return parsed;
}

let svgconf     = parseConf();
let filters     = Object.keys(svgconf.filters);
let filterCount = filters.length;
let width       = svgconf.width;
let height      = svgconf.height;
let colors      = svgconf.colors;
let elements    = svgconf.elements;

//Generates the random colors as CSS variables 
function svgColors(palette = [ '#00000000' ]) {
  let r, g, b, a = 0;
  let c          = '';
  let output     = '  --c0: #00000000; \r\n';
  
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
    palette[i] = c;
    output   += '  --c' + i + ': ' + c + ((i % 5) ? ';' : ';\r\n');
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

//Generates Linear Gradients---------------------------------------------------
function svgLGrad(gid) {
  let counter = svgconf.gradients;
  let color   = randomInt(1, colors);
  let nudge   = Math.floor(100/(counter-1));
  let g = '';
  
  g += `    <stop offset="0"    stop-color="var(--c${color})"/>\r\n`;
  for (let i=2; i < counter; i++) {
    color = randomInt(1, colors);
    g += `    <stop offset="0.${(i-1)*nudge}" stop-color="var(--c${color})"/>\r\n`;  
  }
  color = randomInt(1, colors);
  g += `    <stop offset="1"    stop-color="var(--c${color})"/>\r\n`;
  
  let open    = `  <linearGradient id="grad-${gid}" gradientUnits="userSpaceOnUse" x1="${width}" y1="${randomInt(height)}" x2="${width}" y2="${height}">\r\n`;
  let content = g;
  let close   = '  </linearGradient>\r\n';
  let output  = open + content + close;
  return output;
}//----------------------------------------------------------------------------

//Adds Linear & Radial gradients-----------------------------------------------
function svgGradients(svgid) {
  let output = '';
  if (svgconf.enabled.gradients) {
    for (let i=1; i <= elements; i++) {
      output += svgLGrad(svgid+'-'+i);
    }
  } else {
    output = '<!-- No gradients -->';
  }
  return output
}//----------------------------------------------------------------------------

//Adds the <defs> element for gradients to reside in---------------------------
function svgDefs(svgid) {
  let output = '';
  let open    = '<defs>\r\n';
  let content = svgGradients(svgid);
  let close   = '</defs>\r\n';
  output      = open + content + close;
  return output;
}

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
function svgRect (svgid, square = false) {
  let rectangles = svgconf.shapes.rectangles;
  let squares    = svgconf.shapes.squares;
  let shapeCount = square ? squares : rectangles;
  
  if (( square) && (squares    = 0)) return '<!-- No Squares -->\r\n';
  if ((!square) && (rectangles = 0)) return '<!-- No Rectangles -->\r\n';
  
  let output = '';
  let open   = '<rect ';
  let close  = ' />\r\n';
  let h,w,f,x,y = 1;

  for (i=1; i<=shapeCount; i++) {
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
    output += `id="rect-${svgid}-${i}" `;
    output += `fill="url(#grad-${svgid}-${i})" `;
    output += `x="${x}" `;
    output += `y="${y}" `;
    output += `width="${w}" `;
    output += `height="${h}" `;
    output += `filter="url(#${f})" `;
    output += close;
  }
  
  return output;
}//----------------------------------------------------------------------------

//Adds circles based on config-------------------------------------------------
function svgCircle (svgid) {
  if (!svgconf.shapes.circles) return '<!-- No Circles -->\r\n';

  let output = '';
  let open   = '<circle ';
  let close  = ' />\r\n';
  let x,y,r,f = 1;

  for (i=1; i<=svgconf.shapes.circles; i++) {
    f  = filters[randomInt(0, filterCount)];
    x  = randomInt(0,  width  * 1.5);
    y  = randomInt(0,  height * 1.5);
    x -= randomInt(1, x); //reduce likelihood of large x
    y -= randomInt(1, y); //reduce likelihood of large y
    r  = randomInt(50, height / 2 );
    r += randomInt(1, r / 2 ); //increase likelihood of large x

    output += open;
    output += `id="circle-${svgid}-${i}" `;
    output += `fill="url(#grad-${svgid}-${i})" `;
    output += `cx="${x}" `;
    output += `cy="${y}" `;
    output += `r="${r}" `;
    output += `filter="url(#${f})" `;
    output += close;
  }
  
  return output;
}//----------------------------------------------------------------------------

//Makes Bear Claws-------------------------------------------------------------
function svgBearClaw(svgid) {
  let output   = '';
  let signx    = -1;  //Toggle -/+
  let j,k,p    = 0;
  let u,v,x,y  = 0;
  let segCount = randomInt(2, 9);
  let startx   = randomInt(width  * 0.15, width  * 0.5);
  let starty   = randomInt(height * 0.15, height * 0.5);
  startx       = 100 * Math.trunc(startx/100);
  starty       = 50  * Math.trunc(starty/100);
  
  output += '<path ';
  //output += 'stroke="white" ';
  output += `fill="url(#grad-${svgid}-${i})" `;
  output += 'd="M '+startx+' '+starty+' \r\n';
  
  j  =  randomInt(1, 25) * 10;
  k  =  randomInt(1, 25) * 10;
  u  =  randomInt(1, 25) * 10;
  v  =  randomInt(1, 25) * 10;
  x  =  startx;
  y  =  starty;
  
  for (i=1; i<segCount; i++) {    
    p = 'c ';
    p += (x - Math.min(j,u))+',0 ';
    p += (x - Math.min(k,v))+',50 ';
    p += (Math.max(j,u))+',';
    p += (Math.max(k,v))+' ';
    
    x  =  x + j;
    y  =  y + k;
    u  =  randomInt(1,  10) * i * 10;
    v  =  randomInt(1,  10) * i * 10;

    output += p+' \r\n ';
    signx  *= -1;
  }
  
  output += 'Q '+(startx-300)+','+(starty)+' '+startx+' '+starty+' Z" />\r\n';

  return output;
}//----------------------------------------------------------------------------

//Generates points to make blobs with------------------------------------------
function svgPoints(svgid) { //TODO
}//----------------------------------------------------------------------------

//Adds elements enabled in config----------------------------------------------
function svgContent(svgid) {
  let output  = '';
  output += '<rect '; //Add a bounding box
  output += `id="box-${svgid}" `;
  output += `width="${width}" `;
  output += `height="${height}" `; 
  output += `stroke="currentColor" />\r\n`;  //allow parent element to control border color

  //ellipses   = svgElps(svgid);
  //polygons   = svgPoly(svgid, 'pentagon');
  //triangles  = svgPoly(svgid, 'triangle');
  //blobs      = svgBlob(svgid);
  rectangles = svgRect(svgid); 
  squares    = svgRect(svgid, true);
  circles    = svgCircle(svgid);
  claws      = svgBearClaw(svgid);
  
  output += rectangles + squares + circles + claws;

  return output;
}//----------------------------------------------------------------------------

//Wraps everything in the <svg> element tag------------------------------------
function svgTag() {
  let output  = ''; 
  let epoch   = Date.now();
  let svgid   = epoch.toString(16).substring(8) + randomInt(100,999);
  let xmlns   = "http://www.w3.org/2000/svg";
  let xlink   = "http://www.w3.org/1999/xlink";
  let open    = '<svg ';
  let close   = '</svg>\r\n';
  //open     += `width="${width}" height="${height}" `;
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
  console.log("Starting SVGen");
  const svgens = document.querySelectorAll('.svgen');
  svgens.forEach(svgen => { svgInsert(svgen)});
  console.log("SVGen initialized");
  return "Done!";
}, this);
//-----------------------------------------------------------------------------

//Make the whole thing run just once on page load 
window.addEventListener('load', initializeSVGen);
