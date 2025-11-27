//Needs to be a builtin JS function, grumble!
function randomInt(min = 0, max = 100) {
  return Math.floor(min + (Math.random() * (max - min)));
}

//Creates the default config object
function svgdefaults() { 
  let conf = {
    width: {
      min: 100,
      max: 3000,
      default: 640,
      selected: 1600,
      randomize: false,
    },
    height: {
      min: 100,
      max: 3000,
      defualt: 480,
      selected: 720,
      randomize: false,
    },
    colors: {
      min: 1,
      max: 256,
      default: 10,
      selected: 20,
      randomize: false,
    },
    symbols: {
      min: 1,
      max: 100,
      default: 10,
      selected: 10,
      randomize: false,
    },
    variations: {
      min: 1,
      max: 10,
      default: 0,
      selected: 3,
      randomize: false,
    },
    duration: {
      min: 1,
      max: 180,
      default: 0,
      selected: 10,
      randomize: false,
    },
    shapes: {
      blobs: 3,
      circles: 8,
      squares: 4,
      ellipses: 1,
      polygons: 1,
      triangles: 5,
      rectangles: 0,
    },
    filters: {
      displacement: true,
      gaussianblur: true,
      pointlighting: true,
    },
    gradients: {
      min: 2,
      max: 10,
      default: 3,
      selected: 4,
      randomize: false,
      orientation: 'both',
    },
    enabled: {
      filters: true,
      animation: false,
      gradients: true,
      solidcolor: false,
    }
  }; 
  return conf;
} 

let svgconf     = svgdefaults();
let width       = svgconf.width.selected;
let height      = svgconf.height.selected;
let filters     = Object.keys(svgconf.filters);
let filterCount = filters.length;

//Generates the random colors as CSS variables 
function svgColors(colorCount = svgconf.colors.default) {
  let r, g, b, a = 0;
  let c          = '';
  let colors     = [ '#00000000' ];
  let output     = '  --c0: #00000000; \r\n';
  
  for (let i=1; i <= colorCount; i++) {
    r = randomInt(0, 256);
    g = randomInt(0, 256);
    b = randomInt(0, 256);
    a = randomInt(0, 256);
    c = '#'+
      r.toString(16).padStart(2, '0')+
      g.toString(16).padStart(2, '0')+
      b.toString(16).padStart(2, '0')+
      a.toString(16).padStart(2, '0');
    colors[i] = c;
    output   += '  --c' + i + ': ' + c + ((i % 5) ? ';' : ';\r\n');
  }
  output += '  --c-count: '+colorCount+';\r\n';
  return output;
}

//Adds unique CSS class 
function svgVars(svgid) {
  let open    = '#svg-'+svgid+' {\r\n';
  let content = svgColors(svgconf.colors.selected);
  let close   = '}\r\n';
  let output  = open + content + close; 
  return output;
}

//Adds the <style> element
function svgStyle(svgid) {
  let open    = '<style>\r\n';
  let content = svgVars(svgid);
  let close   = '</style>\r\n';
  let output  = open + content + close;
  return output;
}

//Generates Linear Gradients
function svgLGrad(gid) {
  let colorTotal = svgconf.colors.selected;
  let colorCount = svgconf.gradients.selected;
  let color      = randomInt(1, colorTotal);
  let nudge      = Math.floor(100/(colorCount-1));
  let g = '';
  
  g += `    <stop offset="0"    stop-color="var(--c${color})"/>\r\n`;
  for (let i=2; i < colorCount; i++) {
    color = randomInt(1, colorTotal);
    g    += `    <stop offset="0.${(i-1)*nudge}" stop-color="var(--c${color})"/>\r\n`;  
  }
  color = randomInt(1, colorTotal);
  g += `    <stop offset="1"    stop-color="var(--c${color})"/>\r\n`;
  
  let open    = `  <linearGradient id="grad-${gid}" gradientUnits="userSpaceOnUse" x1="${width/colorCount}" y1="${colorTotal}" x2="${width}" y2="${height}">\r\n`;
  let content = g;
  let close   = '  </linearGradient>\r\n';
  let output  = open + content + close;
  return output;
}

//Adds the required Linear & Radial gradients
function svgGradients(svgid) {
  gcount = svgconf.symbols.selected;
  let output    = '';
  for (let i=1; i <= gcount; i++) {
    output += svgLGrad(svgid+'-'+i);
  }
  return output
}

//Adds the <defs> element for gradients to reside in
function svgDefs(svgid) {
  let output = '';
  if (svgconf.enabled.gradients) {
    let open    = '<defs>\r\n';
    let content = svgGradients(svgid);
    let close   = '</defs>\r\n';
    output      = open + content + close;
  }
  return output;
}

//Depending on config adds the Filters
function svgFilters(svgid) {
  let output = '';
  if (!svgconf.enabled.filters) return output;

  let width    = svgconf.width.selected;
  let height   = svgconf.height.selected;
  let colors   = svgconf.colors.selected;
  let scale    = randomInt(2,   99);
  let seed25   = randomInt(1,   25);
  let seed1000 = randomInt(100, 1000);
  let x,y,z,c  = 0;
  
let displacement =
`<filter id="displacement">
  <feTurbulence baseFrequency="0.0${seed25}" seed="${seed1000}" result="turbulence" />
  <feDisplacementMap
    in2="turbulence"
    in="SourceGraphic"
    scale="${scale}"
    xChannelSelector="R"
    yChannelSelector="G"
  />
</filter>\r\n`;
  
  x  = randomInt(5, 99);
  y  = randomInt(5, 99);
  x -= randomInt(1, x); //reduce likelihood of large x
  y -= randomInt(1, y); //reduce likelihood of large y
  
let gaussianblur = 
`<filter id="gaussianblur">
  <feGaussianBlur in="SourceGraphic" stdDeviation="${x} ${y}" edgeMode="duplicate" color-interpolation-filters="sRGB" />
</filter>\r\n`;
  
  x = randomInt(width  * 0.1, width  * 0.9);
  y = randomInt(height * 0.1, height * 0.9);
  c = randomInt(1, colors);
  z = seed1000;
  
let pointlighting = 
`<filter id="pointlighting">
  <feDiffuseLighting in="SourceGraphic" result="light" lighting-color="var(--c${c})">
    <fePointLight x="${x}" y="${y}" z="${z}" />
  </feDiffuseLighting>
  <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />
</filter>\r\n`;

  //Only adde the filters enabled in config
  Object.keys(svgconf.filters).forEach(filter => {
    if (svgconf.filters[filter]) output += eval(filter);
  });

  return output;
}

//Generates rectangles based on config
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
}

//Adds circles based on config
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
}

//Based on config adds enables elements
function svgContent(svgid) {
  let output  = '';
  output += '<rect ';  //Add a bounding box
  output += `id="box-${svgid}" `;
  output += `width="${width}" `;
  output += `height="${height}" `; 
  output += `stroke="currentColor" />\r\n`;  //allow the parent element to control the border color

  //blobs      = svgBlob(svgid);
  //ellipses   = svgElps(svgid);
  //polygons   = svgPoly(svgid, 'pentagon');
  //triangles  = svgPoly(svgid, 'triangle');
  rectangles = svgRect(svgid); 
  squares    = svgRect(svgid, true);
  circles    = svgCircle(svgid);
  
  output += rectangles + squares + circles;

  return output;
}

//Wraps everything in the <svg> element tag 
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
}

//Inserts the <svg> in the dom
function svgInsert(element) {
  element.innerHTML = svgTag();
}

//Good old JQuery function that should've been built into JS!
function svgOnce(fn, context) { 
  let result = null; //Store the result of the function call
  return function() {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null; //Dereference the function to prevent further calls
    }
    return result;
  };
}

//Find every element with class="svgen" to add SVG to 
const initializeSVGen = svgOnce(function() {
  console.log("Starting SVGen");
  const svgens = document.querySelectorAll('.svgen');
  svgens.forEach(svgen => { svgInsert(svgen)});
  console.log("SVGen initialized");
  return "Done!";
}, this);

//Make the whole thing run just once on page load 
window.addEventListener('load', initializeSVGen);
