let version = '0.043'; //Commits + 1

//"use strict";  //Like college teachers!
/******************************************************************************
COMMING SOON / TODO LIST
------------------------
Debug:        Fix strict mode
Parameterize: Stroke, Number of Petals/Points
Fill options: Random (gradient/palette) / Fixed (uniform/solid) / incremental
Shape grids:  Allowing each shape to snap to its internal grid system
Back button:  Allowing saving previous renders
Config UI:    Allowing non technical user interaction
More shapes:  Flame, Blob, Ellipse, Heart, Bullet, Mountain, Pollen, Letters, Numbers, Waves
More filters: Ideally one filter per shape
Filters:      A way for a filter to NOT get randomly assigned to a certain shape type
Events:       Configurable OnClick, RightClick, hover, etc. to run actions
Actions:      Change Color, Size, Position, Rotation upon events.
Variants:     Slightly different replicas of a shape
Animation:    Final hurdle when everything else is done
*******************************************************************************
******* Below are the functions that create the default config object *********
******************************************************************************/
//Default canvas properties----------------------------------------------------
function defaultCanvas() {
  let w = Object.create(null);  //Width
  let h = Object.create(null);  //Height
  let c = Object.create(null);  //Canvas
  w[min     ] =  100;
  w[max     ] = 3000;
  w[system  ] =  640;
  w[selected] = 1920;
  h[min     ] =  100;
  h[max     ] = 3000;
  h[system  ] =  480;
  h[selected] =  957;
  c['width' ] =    w;
  c['height'] =    h;
  return c;
}//----------------------------------------------------------------------------

//Default enabled features-----------------------------------------------------
function defaultEnabled() {
  let out = Object.create(null);
  out['text'     ] = FF06;   //true, false, or color
  out['grids'    ] = FF06;   //true, false, or color
  out['stroke'   ] = true;   //true, false, or color
  out['points'   ] = false;  //true, false, or color
  out['centers'  ] = false;  //true, false, or color
  out['anchors'  ] = false;  //true, false, or color
  out['position' ] = false;  //true, false, or color
  out['bgcolor'  ] = color;  //true (currentColor), false, or color / randomColor(darks)
  out['filters'  ] = true;
  out['variants' ] = false;  //TODO
  out['gradients'] = true;
  out['animation'] = false;  //TODO
  return out;
}//----------------------------------------------------------------------------

//Normal, Radial and Spiral grids defaults-------------------------------------
function defaultGrids() {
  let out   = new   Grid;
  out.kind  =     spiral;
//out.kind  =     radial;
//out.cy    =        600;
  out.show  =      false;
  out.order =   backward;
  return out;
}//----------------------------------------------------------------------------

//Default properties of each shape type----------------------------------------
function defaultShapes() {
  let shapes = Object.create(null);
  //Create a default object for every shape type-----------
  shapeTypes.forEach(kind => { 
    shapes[kind] = new Shape(kind);
  });//----------------------------------------------------
  
  //Shape Counts-------------------------------------------
  shapes[corner   ].count                   =            4;
  shapes[hexagon  ].count                   =            2;
  shapes[pentagon ].count                   =            1;
  shapes[square   ].count                   =            2;
  shapes[circle   ].count                   =            3;
  shapes[flower   ].count                   =            1;
  shapes[oddagon  ].count                   =            2;
  shapes[cloud    ].count                   =            1;
  shapes[rectangle].count                   =            3;
//shapes[star     ].count                   =            1;
//shapes[nautilus ].count                   =            1;
//shapes[triangle ].count                   =            2;
//shapes[blob     ].count                   =            1;
//shapes[claw     ].count                   =            1;
//shapes[flame    ].count                   =            1;
//shapes[pollen   ].count                   =            1;
//shapes[ellipse  ].count                   =            1;
//shapes[mountain ].count                   =            1;
//shapes[octagon  ].count                   =            1;
//shapes[polygon  ].count                   =            1;
//shapes[dexagon  ].count                   =            1;
//shapes[randogon ].count                   =            1;
//shapes[umbrella ].count                   =            1;
//---------------------------------------------------------
  //Adjust each shape's specific parameters----------------
  //Always true if statements used to allow code folding---
  //-------------------------------------------------------
  if (      circle    ) {//-------------------------CIRCLES
    shapes[ circle    ].position.cx.kind    =       random;
    shapes[ circle    ].position.cy.kind    =       random;
    shapes[ circle    ].position.cx.max     =         1600;
    shapes[ circle    ].position.cy.max     =          900;
    shapes[ circle    ].position.cx.val     =          500;
    shapes[ circle    ].position.cy.val     =          500;
    shapes[ circle    ].position.cx.delta   =          100;
    shapes[ circle    ].position.cy.delta   =          -25;
    shapes[ circle    ].position.cx.scaler  =        1.125;
    shapes[ circle    ].position.cy.scaler  =       -1.125;
    shapes[ circle    ].size.r.min          =           30;
    shapes[ circle    ].size.r.max          =          400;
    shapes[ circle    ].stroke.opacity      =         0.15;    
  }//------------------------------------------------------
  if (      corner    ) {//-------------------------CORNERS
    shapes[ corner    ].filter              =           '';
    shapes[ corner    ].stroke.swidth       =            0;
    shapes[ corner    ].stroke.opacity      =            0;      
  }//------------------------------------------------------    
  if (      flower    ) {//-------------------------FLOWERS
    shapes[ flower    ].filter              =         glow;
    shapes[ flower    ].position.cx.max     =         1400;
    shapes[ flower    ].position.cy.max     =          700;
    shapes[ flower    ].size.r.max          =          140;
    shapes[ flower    ].size.r.max          =           40;
    shapes[ flower    ].stroke.swidth       =            0;    
  }//------------------------------------------------------
  if (      hexagon   ) {//------------------------HEXAGONS
    shapes[ hexagon   ].position.cx.kind    =       random;
    shapes[ hexagon   ].position.cy.kind    =       random;
    shapes[ hexagon   ].position.cx.max     =         1600;
    shapes[ hexagon   ].position.cy.max     =          900;
    shapes[ hexagon   ].position.cx.val     =          900;
    shapes[ hexagon   ].position.cx.delta   =           10;
    shapes[ hexagon   ].position.cx.scaler  =        1.075;
    shapes[ hexagon   ].position.cx.rate    =            1;
    shapes[ hexagon   ].position.cy.val     =          450;
    shapes[ hexagon   ].position.cy.delta   =          -10;
    shapes[ hexagon   ].position.cy.scaler  =        1.083;
    shapes[ hexagon   ].position.cy.rate    =            1;
    shapes[ hexagon   ].rotation.a.kind     =         none;
    shapes[ hexagon   ].rotation.a.val      =            0;
    shapes[ hexagon   ].rotation.a.delta    =          -10;
    shapes[ hexagon   ].rotation.a.rate     =            1;
    shapes[ hexagon   ].size.r.kind         =  incremental;
    shapes[ hexagon   ].size.r.val          =          160;
    shapes[ hexagon   ].size.r.delta        =           -6;
    shapes[ hexagon   ].size.r.scaler       =       -1.090;
    shapes[ hexagon   ].size.r.rate         =            1;
    shapes[ hexagon   ].skew.x.kind         =         none;
    shapes[ hexagon   ].skew.x.val          =          -10;
    shapes[ hexagon   ].skew.x.delta        =         0.25;
    shapes[ hexagon   ].skew.y.kind         =         none;
    shapes[ hexagon   ].skew.y.val          =            1;
    shapes[ hexagon   ].skew.y.delta        =        -0.25;
    shapes[ hexagon   ].skew.y.scaler       =       -1.025;
    shapes[ hexagon   ].skew.y.rate         =            1;
    shapes[ hexagon   ].stroke.swidth       =       random;
    shapes[ hexagon   ].stroke.opacity      =         0.25;
  }//------------------------------------------------------
  if (      nautilus  ) {//-------------------------NAUTILI
    shapes[ nautilus  ].position.cx.max     =         1600;
    shapes[ nautilus  ].position.cy.max     =          900;
    shapes[ nautilus  ].rotation.a.kind     =       random;
    shapes[ nautilus  ].size.r.min          =          180;
    shapes[ nautilus  ].size.r.max          =          420;
    shapes[ nautilus  ].size.r.val          =          240;
    shapes[ nautilus  ].size.r.delta        =           60;
    shapes[ nautilus  ].size.r.scaler       =            1;
    shapes[ nautilus  ].stroke.opacity      =         0.10;    
  }//------------------------------------------------------
  if (      oddagon   ) {//------------------------ODDAGONS
    shapes[ oddagon   ].filter              =        dance;
    shapes[ oddagon   ].position.cx.max     =         1900;
    shapes[ oddagon   ].position.cy.max     =          900;
    shapes[ oddagon   ].rotation.a.kind     =       random;
    shapes[ oddagon   ].size.r.min          =           30;
    shapes[ oddagon   ].size.r.max          =          130;
  }//------------------------------------------------------
  if (      pentagon  ) {//-----------------------PENTAGONS
    shapes[ pentagon  ].fill                =       random;
    shapes[ pentagon  ].position.cx.kind    =       random;
    shapes[ pentagon  ].position.cy.kind    =       random;
    shapes[ pentagon  ].position.cx.max     =         1900;
    shapes[ pentagon  ].position.cx.val     =          880;
    shapes[ pentagon  ].position.cx.delta   =           10;
    shapes[ pentagon  ].position.cx.scaler  =        1.075;
    shapes[ pentagon  ].position.cx.rate    =            1;
    shapes[ pentagon  ].position.cy.max     =          800;
    shapes[ pentagon  ].position.cy.val     =          760;
    shapes[ pentagon  ].position.cy.delta   =           -5;
    shapes[ pentagon  ].position.cy.scaler  =        1.083;
    shapes[ pentagon  ].position.cy.rate    =            1;
    shapes[ pentagon  ].rotation.a.kind     =       random;
    shapes[ pentagon  ].rotation.a.val      =        -17.5;
    shapes[ pentagon  ].rotation.a.delta    =           72;
    shapes[ pentagon  ].rotation.a.rate     =            5;
    shapes[ pentagon  ].size.r.kind         =       random;
    shapes[ pentagon  ].size.r.max          =          100;
    shapes[ pentagon  ].size.r.val          =            4;
    shapes[ pentagon  ].size.r.delta        =          -14;
    shapes[ pentagon  ].size.r.scaler       =       -1.089;
    shapes[ pentagon  ].size.r.rate         =            1;
    shapes[ pentagon  ].skew.x.kind         =         none;
    shapes[ pentagon  ].skew.x.val          =          -15;
    shapes[ pentagon  ].skew.x.delta        =         0.25;
    shapes[ pentagon  ].skew.y.kind         =         none;
    shapes[ pentagon  ].skew.y.val          =            1;
    shapes[ pentagon  ].skew.y.delta        =        -0.25;
    shapes[ pentagon  ].skew.y.scaler       =       -1.025;
    shapes[ pentagon  ].skew.y.rate         =            2;    
    shapes[ pentagon  ].stroke.swidth       =       random;
    shapes[ pentagon  ].stroke.opacity      =         0.35;
  }//------------------------------------------------------
  if (      rectangle ) {//----------------------RECTANGLES
    shapes[ rectangle ].fill                =   RC(sunset);
    shapes[ rectangle ].filter              =     oblivion;
    shapes[ rectangle ].size.w.min          =          400;
    shapes[ rectangle ].size.h.min          =          300;
    shapes[ rectangle ].size.w.max          =            0;
    shapes[ rectangle ].size.h.max          =            0;    
  }//------------------------------------------------------
  if (      square    ) {//-------------------------SQUARES
    shapes[ square    ].fill                =   RC(sunset);
    shapes[ square    ].position.cx.kind    =       random; //Position
    shapes[ square    ].position.cy.kind    =       random;
    shapes[ square    ].position.cx.val     =           20;
    shapes[ square    ].position.cy.val     =           20;
    shapes[ square    ].position.cx.delta   =           76;
    shapes[ square    ].position.cy.delta   =         22.5;
    shapes[ square    ].position.cx.scaler  =        1.175;
    shapes[ square    ].position.cy.scaler  =      -1.0695;
    shapes[ square    ].rotation.a.kind     =       random; //Rotation
    shapes[ square    ].rotation.a.val      =            1;
    shapes[ square    ].rotation.a.delta    =          7.5;
    shapes[ square    ].rotation.a.scaler   =         1.25;
    shapes[ square    ].rotation.a.rate     =            1;
    shapes[ square    ].scale.s.kind        =        fixed; //Scale
    shapes[ square    ].size.h.kind         =       random; //Size
    shapes[ square    ].size.h.val          =            1;
    shapes[ square    ].size.h.min          =           30;
    shapes[ square    ].size.h.max          =          500;
    shapes[ square    ].size.h.delta        =            3;
    shapes[ square    ].size.h.scaler       =        1.115;
    shapes[ square    ].size.h.rate         =            1;
    shapes[ square    ].skew.x.kind         =         none; //Skew X
    shapes[ square    ].skew.x.val          =           -1;
    shapes[ square    ].skew.x.delta        =            1;
    shapes[ square    ].skew.x.scaler       =        1.225;
    shapes[ square    ].skew.x.rate         =            1;
    shapes[ square    ].skew.y.kind         =         none; //Skew Y
    shapes[ square    ].skew.y.val          =           -1;
    shapes[ square    ].skew.y.delta        =            1;
    shapes[ square    ].skew.y.scaler       =        1.025;
    shapes[ square    ].skew.y.rate         =            1;
    shapes[ square    ].stroke.swidth       =            1; //Stroke
    shapes[ square    ].stroke.opacity      =         0.05;    
  }//------------------------------------------------------
  if (      star      ) {//---------------------------STARS
    shapes[ star      ].filter              =        dance;
    shapes[ star      ].rotation.a.kind     =       random;
    shapes[ star      ].size.r.min          =           20;
    shapes[ star      ].size.r.max          =          200;
    shapes[ star      ].stroke.swidth       =            0;    
  }//------------------------------------------------------
  if (      triangle  ) {//-----------------------TRIANGLES
    shapes[ triangle  ].filter              =         glow;
    shapes[ triangle  ].rotation.a.kind     =       random;    
  }//------------------------------------------------------
  if (      umbrella  ) {//-----------------------UMBRELLAS
    shapes[ umbrella  ].rotation.a.kind     =       random;
  }//------------------------------------------------------
//if (      blob      ) {//---------------------------BLOBS}
//if (      bullet    ) {//-------------------------BULLETS}
//if (      claw      ) {//---------------------------CLAWS}
//if (      cloud     ) {//--------------------------CLOUDS}
//if (      dexagon   ) {//------------------------DEXAGONS}
//if (      ellipse   ) {//------------------------ELLIPSES}
//if (      flame     ) {//--------------------------FLAMES}
//if (      heart     ) {//--------------------------HEARTS}
//if (      letter    ) {//-------------------------LETTERS}
//if (      numeric   ) {//-------------------------NUMBERS}
//if (      mountain  ) {//-----------------------MOUNTAINS}
//if (      octagon   ) {//------------------------OCTAGONS}
//if (      pollen    ) {//-------------------------POLLENS}
//if (      polygon   ) {//------------------------POLYGONS}
//if (      randogon  ) {//-----------------------RANDOGONS}
//if (      wave      ) {//---------------------------WAVES}
  //-------------------------------------------------------
  //console.log(shapes); //DEBUG
  return shapes;
}//----------------------------------------------------------------------------

//Default enabled filters------------------------------------------------------
function defaultFilters() {
  let out = Object.create(null);
  filterTypes.forEach(kind => { out[kind] = true; });
  //Exceptions to being enabled by default
  out[pixelate   ] = false;  //<-- not working right now
  out[chaotic    ] = false;
  out[watercolor ] = false;
  return out;
}//----------------------------------------------------------------------------

//Defaults for paths-----------------------------------------------------------
function defaultPaths() {
  let out = Object.create(null);  
  out['kind'] =   arc;  //arc, quad, cube, line, all, TODO: random 
  out['all' ] = false;
  out['arc' ] =  gold;  //true, false or color
  out['cube'] = false;  //true, false or color
  out['quad'] = false;  //true, false or color
  out['line'] = false;  //true, false or color
  return out;
}//----------------------------------------------------------------------------

//Number of colors per gradient------------------------------------------------
function defaultGradients() {
  let out = Object.create(null);
  out[min     ] = 2;
  out[max     ] = 9;
  out[system  ] = 3;
  out[selected] = 5;
  out[kind    ] = both; //TODO: horiz, vertical, both, aligned, random
  return out;
}//----------------------------------------------------------------------------

//Default color palette properties---------------------------------------------
function defaultColors() {
  let out = Object.create(null);
  out[min     ] =    3;
  out[max     ] =  256;
  out[system  ] =   10;
  out[selected] =  100;
  return out;
}//----------------------------------------------------------------------------

//Default properties of objects------------------------------------------------
function defaultObjects() {
  let out = Object.create(null);
  //Used only when shape properties are undefined or set to 'system'
  out['min'     ] =      1;
  out['max'     ] =    250;
  out['maxshape'] =     50;
  out['system'  ] =      5;  //NOT IN USE
  out['selected'] =     10;  //NOT IN USE
  out['swidth'  ] =      4;  //Stroke width defualt
  out['scolor'  ] =   lime;  //Stroke color default
  out['acolor'  ] =  white;  //Anchor color default
  out['pcolor'  ] =  black;  //Point  color default
  out['ccolor'  ] =  black;  //Center color default
  out['gcolor'  ] =  black;  //Grid   color default
  out['tcolor'  ] =  black;  //Text   color default
  out['fill'    ] =  color;  //true, false or color
  return out;
}//----------------------------------------------------------------------------

/******************************************************************************
*********************** Object template defaults below ************************
******************************************************************************/

//Default shape object template that all shape kinds share---------------------
function defaultShapeTemplate() {
  let out = Object.create(null);
  out['count'   ] =      0;
  out['max'     ] =     10;
  out['points'  ] =      1;  
  out['kind'    ] = normal; 
  out['fill'    ] = random;
  out['filter'  ] = random;
  out['size'    ] = new Size;
  out['skew'    ] = new Skew;
  out['scale'   ] = new Scale;
  out['stroke'  ] = defaultShapeStrokeTemplate();
  out['position'] = new Position;
  out['rotation'] = new Rotation;
  //console.log(out);  //DEBUG
  return out;  
}//----------------------------------------------------------------------------

//Default templates for a shape object's properties----------------------------
function defaultShapeSizeTemplate()     { return new Size;     }
function defaultShapeStrokeTemplate()   { return new Stroke;   }
function defaultShapePositionTemplate() { return new Position; }
function defaultShapeRotationTemplate() { return new Rotation; }
function defaultShapeScaleTemplate()    { return new Scale;    }
function defaultShapeSkewTemplate()     {
  let out = Object.create(null);
  out[q]  = new Val('quantity');
  return new Skew;
}//----------------------------------------------------------------------------

//Default template for a shape's grid object-----------------------------------
function defaultShapeGridTemplate(){
  let out = Object.create(null);
  //Cartesian Grids
  out['kind' ] =    radial;  //true = normal, radial, spiral (TODO: diagonal)
  out['show' ] =         1;
  out['text' ] =         0;  //FF06;
  out['bound'] =     false;  //false = keep / true = delete positions that fall outside of artbox boundry  
  out['order'] =    normal;  //normal (horizontal), backward, vertical, vertiback, (TODO: snake, vsnake, outward, inward)
  out['start'] = new Point; 
  out['end'  ] = new Point; 
  out['dx'   ] =       160; 
  out['dy'   ] =       160;
  //Radial/Spiral Grids (order kinds: normal, backward, outward, inward)
  out['r'    ] =       800; 
  out['a'    ] =         0;
  out['dr'   ] =       100;
  out['da'   ] =        30;
  out['cx'   ] =         0;
  out['cy'   ] =         0; 
  out['sr'   ] =         1;  //Spirals
  out['sa'   ] =         2;  //Spirals
  //console.log(out);  //DEBUG
  return out;
}//----------------------------------------------------------------------------

//Variants and Duration are not in use yet-------------------------------------
function defaultVariants() { return Object.create(null); }
function defaultDuration() { return Object.create(null); }
//-----------------------------------------------------------------------------

//Default options for calling shape generator functions------------------------
function defaultOptions() {
  let out = Object.create(null);
  out['oid'     ] = 777; 
  out['name'    ] = 'unknown'; 
  out['fill'    ] = '';
  out['filters' ] = ''; 
  out['events'  ] = '';
  out['size'    ] = defaultShapeSizeTemplate();
  out['stroke'  ] = defaultShapeStrokeTemplate();
  out['position'] = defaultShapePositionTemplate();
  return out;
}//----------------------------------------------------------------------------

//Creates default config using the outputs of all previous default functions---
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

/******************************************************************************
************* Below are all the functions that generate shapes ****************
******************************************************************************/

//Generates the bottom most bounding box layer containing background color-----
function svgBoundingBox() {
  let render  = '';
  let bgcolor = '';
  bgcolor     = ( svgconf.enabled.bgcolor === true) ? 'currentColor' : svgconf.enabled.bgcolor;
  bgcolor     = (!svgconf.enabled.bgcolor         ) ? 'none'         : bgcolor;
  render     += '<rect '; //Add a bounding box
  render     += `id="${svgid  }-box"` ;
  render     += ` x="0" y="0"`        ;
  render     += ` width="${WIDTH  }" `;
  render     += `height="${HEIGHT }"` ; 
  render     += `  fill="${bgcolor}"` ;
  render     += `></rect>\r\n`;  //allow parent element to control border color
  let data    = { kind:"rectangle", rectangle:{x:0, y:0, w:WIDTH, h:HEIGHT, fill:bgcolor} };
  elements[0] = { z:0, render:render, anchors:'', data:data }; //bounding box takes care of index zero
  return render;
}//----------------------------------------------------------------------------

//Generates Bear Claws---------------------------------------------------------
function svgBearClaw(oid = 'no-order-id', options = opt) {
  let sid      = svgid+'-'+oid; //shape-id
  let output   = '';
  let open     = '<path   id="'+sid+'" class="bearclaw" ';
  let close    = '</path>';
  let events  = options.events;
  let stroke  = options.stroke;
  let filter  = options.filter;
  let fill    = options.fill;
  let j,k,p    = 0;
  let u,v,x,y  = 0;
  let segCount = randomInt(2, 9);
  let startx   = randomInt(WIDTH  * 0.15, WIDTH  * 0.5);
  let starty   = randomInt(HEIGHT * 0.15, HEIGHT * 0.5);
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

  output += ' Q '+(startx-300)+','+(starty)+' '+startx+' '+starty+' Z">\r\n'+close+'\r\n';

  return output;
}//----------------------------------------------------------------------------

//Generates squares & rectangles based on config-------------------------------
function svgRect (oid = 'no-order-id', square = false, options = opt) {
  let sid       = svgid+'-'+oid;  
  let open      = '<rect   id="'+sid+'" ';
  let close     = '</rect>\r\n';
  let output    = '';
  let render    = '';
  let anchors   = '';  
  let h         = options.size.h;
  let w         = square ? h : options.size.w; //Make w = h when squares are requested
  let cx        = options.position.cx;
  let cy        = options.position.cy;
  let x         = roundInt(cx - (w/2), 1);
  let y         = roundInt(cy - (h/2), 1);
  let transform = options.transform;
  let events    = options.events;
  let stroke    = options.stroke;
  let filter    = options.filter;
  let fill      = options.fill;
  let cname     = ' cx'+cx+' cy'+cy;

  anchors += center ? svgCrossHair(cx, cy, 5, center, 'center mark', oid) : '';

  if (svgconf.enabled.points) { //Find the center anchor
    anchors  = '  '+anchors;  //Indent the center point
    anchors += '  '+svgDrawPoint(   x,   y, 3, pcolor, 'point tlc');
    anchors += '  '+svgDrawPoint( w+x,   y, 3, pcolor, 'point trc');
    anchors += '  '+svgDrawPoint(   x, h+y, 3, pcolor, 'point blc');
    anchors += '  '+svgDrawPoint( w+x, h+y, 3, pcolor, 'point brc');
    anchors  = '<g class="'+ (square ? 'square' : 'rectangle')+' anchors">\r\n'+anchors+'\r\n</g>\r\n';
  }

  render += open;
  render += `x="${x}" `;
  render += `y="${y}" `;
  render +=  `width="${w}" `;
  render += `height="${h}" `;
  render += fill;
  render += stroke;
  render += filter;
  render += events;
  render += transform;
  render += 'class="'+( square ? 'square' : 'rectangle' )+cname+'" >';
  render += close;
  output += render+anchors;
  
  return output;
}//----------------------------------------------------------------------------

//Generates a circle based on config-------------------------------------------
function svgCircle (oid = 'no-order-id', options = opt) {
  let sid       = svgid+'-'+oid;
  let open      = '<circle id="'+sid+'"';
  let close     = '</circle>\r\n';
  let output    = '';
  let render    = '';
  let r         = options.size.r;
  let x         = options.position.cx;
  let y         = options.position.cy;
  let transform = options.transform;
  let events    = options.events;
  let stroke    = options.stroke;
  let filter    = options.filter;
  let fill      = options.fill;

  render += open;
  render += ` r="${r}" `;
  render += `cx="${x}" `;
  render += `cy="${y}" `;
  render += fill;
  render += stroke;
  render += filter;
  render += transform;
  render += events+'>';
  render += close;  
  render += svgconf.enabled.centers ? svgCrossHair(x, y, 5, center, 'center mark', oid) : '';
  output += render;

  return output;
}//----------------------------------------------------------------------------

//Generates clouds-------------------------------------------------------------
function svgCloud(oid = 'no-order-id', options = opt) {
  let sid       = svgid+'-'+oid;
  let pcount    = 2 * randomInt(2,5);
  let points    = svgPoints(WIDTH, HEIGHT, pcount); //console.log(points); //DEBUG
  let open      = '<path ';
  let close     = '\r\n</path>\r\n';
  let output    = '';
  let render    = '';
  let anchors   = '';
  let line      = '';
  let cube      = '';
  let quad      = '';
  let arc       = '';
  let x,y       = 0;
  let u,v       = 0;
  let dx,dy     = 0;
  let qx,qy     = 0;
  let cx        = 0;
  let cy        = 0;
  let mx        = moveX(360, 720);
  let my        = moveY(180, 360); //console.log( mx + ' : ' + my ); //DEBUG
  let startx    = mx+points[1].x;
  let starty    = my+points[1].y;
  let transform = options.transform;
  let events    = options.events;
  let stroke    = options.stroke;
  let filter    = options.filter;
  let fill      = options.fill;

  fill = fill + stroke + filter+' d="\r\n  M '+startx+' '+ starty+' \r\n';
  arc  = open +'id="'+sid+'-a" class="cloud arc"  '+ events+transform+fill;
  cube = open +'id="'+sid+'-c" class="cloud cube" '+ events+transform+fill;
  quad = open +'id="'+sid+'-q" class="cloud quad" '+ events+transform+fill;
  line = open +'id="'+sid+'-l" class="cloud line" '+ events+transform+fill;
  
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
  if (svgconf.enabled.centers) anchors += svgCrossHair(cx, cy, 5, center, 'center mark', oid);

  let arcStroke  = '>';
  let cubeStroke = '>';
  let quadStroke = '>';
  let lineStroke = '>';

  cube   += '  Z"'+cubeStroke+close;
  arc    += '  Z"'+arcStroke +close; 
  quad   += '  Z"'+quadStroke+close;
  line   += '  L  '+(startx)+','+(starty)+'  Z"'+lineStroke+close;
  
  switch (svgconf.paths.kind) {
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
  let sid       = svgid+'-'+oid;
  let pcount    = randomInt(5,16);
  let points    = svgRadialPoints(pcount); //console.log(points); //DEBUG
  let open      = '  <path ';
  let close     = '  </path>';
  let render    = '';
  let output    = '';
  let anchors   = '';
  let path      = '';
  let x,y       = 0;
  let u,v       = 0;
  let dx,dy     = 0;
  let ax,ay     = 0;
  let transform = options.transform;
  let events    = options.events;
  let stroke    = options.stroke;
  let filter    = options.filter;
  let fill      = options.fill;
  let startx    = points[0].x;
  let starty    = points[0].y;

  render = '<g id="'+sid+'" class="flower" '+ fill+filter+transform+'>\r\n';
  let d  = stroke + events +'  d="\r\n    M '+ startx+' '+starty+' \r\n';
  
  for (i=1; i<=pcount; i++) {
    x = points[i].x;
    y = points[i].y;
    u = points[i+1].x;
    v = points[i+1].y;
 
    path    = open+'id="'+sid+'-'+i+'" class="flower petal"';
    path   += fill;
    path   += filter;
    path   += d;
    path   += '    L '+x+','+y            +'\r\n'; //from center to the first point
    path   += '    A 45,45 0,0,1 '+u+','+v+'\r\n';
    path   += '    L '+startx+','+starty  +'\r\n'; //from second point to the center
    path   += '    Z">';
    path   += '\r\n'+close+'\r\n';
    render += path;

    //Calculate the half way point and the anchor point x,y
    dx = (x+u)/2;
    dy = (y+v)/2;
    ax = (dx+((dy-y)));
    ay = (dy-((dx-x))); 

    if (svgconf.enabled.anchors) output += svgDrawPoint(     ax,     ay, 4, svgconf.paths.arc, 'point anchor arc ');
    if (svgconf.enabled.points ) output += svgDrawPoint(      x,      y, 3, pcolor, 'point');
    if (svgconf.enabled.centers) output += svgCrossHair( startx, starty, 5, center, 'center mark', oid); 
  }

  output += render+'</g>\r\n';

  return output;
}//----------------------------------------------------------------------------

//Generates Polygons, Hexagon by default---------------------------------------
function svgPolygon(oid='no-order-id', pcount=6, options=opt) {
  let sid       = svgid+'-'+oid;
  let open      = '<polygon ';
  let close     = '</polygon>';
  let render    = '';
  let output    = '';
  let anchors   = '';
  let r         = options.size.r;
  let cx        = options.position.cx;
  let cy        = options.position.cy;
  let transform = options.transform;
  let events    = options.events;
  let stroke    = options.stroke;
  let filter    = options.filter;
  let fill      = options.fill;
  let polyn     = options.name;
  let cname     = polyn;
  let data      = { kind:polyn };
  let points    = svgRadialPoints(pcount,cx,cy,r); //console.log(points); //DEBUG
  
  cname   += ((polyn == 'oddagon') || (polyn == 'randogon')) ? ' poly'+pcount : '';
  render  += open+'id="'+sid+'-'+i+'" ';
  render  += 'class="'+cname+'"';
  render  += fill+stroke+filter+transform+events+' points="';
  anchors += (svgconf.enabled.centers) ? '  '+svgCrossHair( cx, cy, 5, center, 'center mark', oid) : '';

  for (i=1; i<=pcount; i++) {
    render  += points[i].x+','+points[i].y+' ';     
    anchors += (svgconf.enabled.points) ? '  '+svgDrawPoint(points[i].x, points[i].y, 3, pcolor, 'point' ) : '';
  }

  anchors     = svgconf.enabled.points ? '<g class="'+cname+' anchors">\r\n'+anchors+'\r\n</g>\r\n' : anchors;
  render     += '">'+close+'\r\n';  
  anchorall  += anchors;
  output     += render+anchors;
  data[polyn] = { pcount:pcount, points:points }
  elements[oid].data = data;

  return output;
}//----------------------------------------------------------------------------

//Generates Stars, 5 or 11 points by default-----------------------------------
function svgStar(oid='no-order-id', options=opt, pcount=0) {
  pcount        = pcount ? pcount : ((randomInt(5,14) % 2) ? pcount+1 : pcount); //Only odd
  let sid       = svgid+'-'+oid;
  let points    = svgRadialPoints(pcount);
  let cx        = points[0].x;
  let cy        = points[0].y;
  let open      = '<path ';
  let close     = '</path>';
  let render    = '';
  let output    = '';
  let anchors   = '';
  let transform = options.transform;
  let events    = options.events;
  let stroke    = options.stroke;
  let filter    = options.filter;
  let fill      = options.fill;
  let cname     = star; //options.name
  let data      = { kind:star };
  let ring      = [...points];
  ring.shift(); //get rid of [0]
  ring.pop();   //get red of [last]
  points.pop(); //get red of [last]
  ring = [...points, ...ring]; 

  render  += open+'id="'+sid+'" ';
  render  += 'class="'+cname+' p'+pcount+'" '+transform;
  render  += fill+stroke+filter+events+' d="\r\n'
  render  += '  M '+ring[1].x+','+ring[1].y+'\r\n';
  anchors += (svgconf.enabled.centers) ? '  '+svgCrossHair(cx, cy, 5, center, 'center mark') : '';

  for (i=1; i<(pcount-1)*2; i+=2) {
    render  += '  L '+ring[i  ].x+','+ring[i  ].y+' '+ring[i+2].x+','+ring[i+2].y+'\r\n';
    anchors += (svgconf.enabled.points) ? '  '+svgDrawPoint(ring[i].x, ring[i].y, 3, pcolor, 'point' ) : '';
  }

  anchors     = svgconf.enabled.points ? '<g class="'+cname+' anchors">\r\n'+anchors+'\r\n</g>\r\n' : anchors;
  render     += '  Z">' +'\r\n'+close+'\r\n';  
  anchorall  += anchors;
  output     += render+anchors;
  data[star] = { pcount:pcount, points: points }
  elements[oid].data = data;

  return output;
}//----------------------------------------------------------------------------

//Generates Corner Backgrounds-------------------------------------------------
function svgCorner(oid='no-order-id', options = opt) {
  let sid     = svgid+'-'+oid;
  let open    = '<path ';
  let close   = '</path>';
  let render  = '';
  let output  = '';
  let stroke  = options.stroke;
  let cname   = 'corner';
  let cx      = 0;
  let cy      = 0;    
  let xm      = 0; //X multiplier
  let ym      = 0; //Y multiplier
  let sp      = 0; //Starting point
  let bp      = 0; //Bottom bpoin
  let tp      = 0; //Top point
  let corners = [zero, tlc, trc, blc, brc];
  let kind    = corners[oid+4%4];
  let fill    = ' fill="url(#corner-'+kind+')" ';

  switch (kind) {
    case tlc: sp=TLC;   tp=TRC;   bp=BLC;   xm= 1;   ym= 1;   break;
    case trc: sp=TRC;   tp=TLC;   bp=BRC;   xm=-1;   ym= 1;   break;
    case blc: sp=BLC;   tp=TLC;   bp=BRC;   xm= 1;   ym=-1;   break;
    case brc: sp=BRC;   tp=TRC;   bp=BLC;   xm=-1;   ym=-1;   break;
    //default:  sp=TLC;   tp=TRC;   bp=BLC;   xm= 1;   ym= 1;
  }

  cx = sp.x + (xm * roundInt(WIDTH  * 0.33,1));
  cy = sp.y + (ym * roundInt(HEIGHT * 0.33,1));
  qx = sp.x + (xm * roundInt(WIDTH  * 0.66,1));
  qy = sp.y + (ym * roundInt(HEIGHT * 0.84,1));

  render  += open+'id="'+sid+'" ';
  render  += 'class="'+cname+' '+kind+'" ';
  render  += fill+stroke+' d="\r\n'
  render  += '  M '+sp.x+','+sp.y+'\r\n'; 
  render  += '  L '+sp.x+','+sp.y+' '+   tp.x+','+   tp.y+'\r\n';
  render  += '  Q '+  qx+','+  qy+' '+bp.x+','+bp.y+'\r\n';
  render  += '  L '+bp.x+','+bp.y+' '+sp.x+','+sp.y+'\r\n';
  render  += '  Z">' +'\r\n'+close+'\r\n';  
  output  += render;

  return output;
}//----------------------------------------------------------------------------

//Generates Nautilus-----------------------------------------------------------
function svgNautilus(oid = 'no-order-id', options = opt) {
  let sid       = svgid+'-'+oid;
  let r         = options.size.r  ?? 500;
  let dr        = options.size.dr ?? 100;
  let sr        = options.size.sr ??   1; //Spirals
  let cx        = options.position.cx;
  let cy        = options.position.cy;

  //let da        = options.grid.da ??    12.5;
  //let sa        = options.grid.sa ?? 0.00025; //0.00025;  //Spirals    
  let  a        =        0;
  let da        =     12.5;
  let sa        =  0.00025; //Spirals    
  
  let points    = svgSpiralGrid(r, a, dr, da, cx, cy, sr, sa, false);
  let dx        = 0;
  let dy        = 0;
  let qx        = 0;
  let qy        = 0;
  let mx        = 0;
  let my        = 0;
  let open      = '  <path ';
  let close     = '  </path>';
  let color     = '';
  let render    = '';
  let output    = '';
  let anchors   = '';
  let transform = options.transform;
  let events    = options.events;
  let stroke    = options.stroke;
  let filter    = options.filter;
  let fill      = '';  //options.fill;
  let cname     = nautilus; //options.name
  let data      = { kind:nautilus };
  let p         = [...points];
  pcount        = p.length;
  
  render  += '<g id="'+sid+'" ';
  render  += 'class="'+cname+' p'+pcount+'" '+transform;
  render  += fill+stroke+filter+events+'>\r\n';
  anchors += (svgconf.enabled.centers) ? '  '+svgCrossHair(cx, cy, 5, center, 'center mark') : '';

  for (j=pcount-1; j>12; j-=2) {
    dx = (p[j].x + p[j-2].x)/2;
    dy = (p[j].y + p[j-2].y)/2;
    qx = (dx+((dy- p[j-2].y)));
    qy = (dy-((dx- p[j-2].x))); 
    mx = (qx+dx)/2;
    my = (qy+dy)/2;

    //color = (j%4) ? randomColor(blues) : randomColor(darks);
    color = randomColor(blues);

    render += open+' fill="'+color+'" d="\r\n';
    render += '    M '+p[j  ].x+','+p[j  ].y+'\r\n';  
    render += '    Q '+      mx+','+      my+' '+p[j- 2].x+','+p[j- 2].y+'\r\n';
    render += '    L '+p[j-2].x+','+p[j-2].y+' '+p[j-14].x+','+p[j-14].y+'\r\n';
    
    dx = (p[j-12].x + p[j-14].x)/2;
    dy = (p[j-12].y + p[j-14].y)/2;
    qx = (dx+((dy- p[j-14].y)));
    qy = (dy-((dx- p[j-14].x))); 
    mx = (qx+dx)/2;
    my = (qy+dy)/2;
    
    render  += '    Q '+       mx+','+       my+' '+p[j-12].x+','+p[j-12].y+'\r\n';
    render  += '    L '+p[j-12].x+','+p[j-12].y+' '+p[j   ].x+','+p[j   ].y+'\r\n';
    render  += '    Z">' +'\r\n'+close+'\r\n'; 

    anchors += (svgconf.enabled.points) ? '  '+svgDrawPoint(p[j].x, p[j].y, 3, pcolor, 'point' ) : '';
    anchors += (svgconf.enabled.points) ? '  '+svgDrawPoint(    mx,     my, 3, pcolor, 'point' ) : '';
  }

  render     += '</g>' +'\r\n';  
  anchorall  += anchors;
  output     += render+anchors;
  data[nautilus] = { pcount:pcount, points: points }
  elements[oid].data = data;

  return output;
}//----------------------------------------------------------------------------



/******************************************************************************
************* Below are all the miscellaneous helper functions ****************
******************************************************************************/

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
function roundX(min = 1, max = WIDTH, factor = 10) {
  return roundInt(randomInt(min, max), factor);
}//----------------------------------------------------------------------------

//Sugar syntax wrapper for generating random Y cords---------------------------
function roundY(min = 1, max = HEIGHT, factor = 10) {
  return roundInt(randomInt(min, max), factor);
}//----------------------------------------------------------------------------

//Random -X or +X cords to move objects with-----------------------------------
function moveX(min = 1, max = WIDTH) {
  let luck  = randomInt();
  let randX = randomInt(min, max);
  randX = (luck % 3) ? (randX - luck) : (max - randX - luck) * -1;
  return roundInt(randX, 5);
}//----------------------------------------------------------------------------

//Random -Y or +Y cords to move objects with-----------------------------------
function moveY(min = 1, max = HEIGHT) {
  let luck  = randomInt();
  let randY = randomInt(min, max);
  randY = (luck % 3) ? (randY - luck) : (max - randY - luck) * -1;
  return roundInt(randY, 5);
}//----------------------------------------------------------------------------

//A random X value in a 2 section wide quadrant--------------------------------
function quadrantX( t = 1, maxw = WIDTH) {
  switch (t) {
    case 1: return roundX(maxw * 0.20, maxw * 0.40, 5);
    case 2: return roundX(maxw * 0.60, maxw * 0.80, 5);
  }
  return t;
}//----------------------------------------------------------------------------

//A random Y value in a 2 section tall quadrant--------------------------------
function quadrantY( t = 1, maxh = HEIGHT) {
  switch (t) {
    case 1: return roundY(maxh * 0.20, maxh * 0.40, 5);
    case 2: return roundY(maxh * 0.60, maxh * 0.80, 5);
  }
  return t;
}//----------------------------------------------------------------------------

//A random X value in a 3 section wide tridant---------------------------------
function tridantX( t = 1, maxw = WIDTH) {
  switch (t) {
    case 1: return roundX(maxw * 0.15, maxw * 0.30, 5);
    case 2: return roundX(maxw * 0.40, maxw * 0.60, 5);
    case 3: return roundX(maxw * 0.70, maxw * 0.85, 5);
  }
  return t;
}//----------------------------------------------------------------------------

//A random Y value in a 3 section tall tridant---------------------------------
function tridantY( t = 1, maxh = HEIGHT) {
  switch (t) {
    case 1: return roundY(maxh * 0.15, maxh * 0.30, 5);
    case 2: return roundY(maxh * 0.33, maxh * 0.66, 5);
    case 3: return roundY(maxh * 0.70, maxh * 0.85, 5);
  }
  return t;
}//----------------------------------------------------------------------------

//A random X value in a 4 section wide octadant--------------------------------
function octadantX( t = 1, maxw = WIDTH) {
  switch (t) {
    case 1: return roundX(maxw * 0.10, maxw * 0.25, 5);
    case 2: return roundX(maxw * 0.30, maxw * 0.45, 5);
    case 3: return roundX(maxw * 0.55, maxw * 0.70, 5);
    case 4: return roundX(maxw * 0.75, maxw * 0.90, 5);
  }
  return t;
}//----------------------------------------------------------------------------

//A random Y value in a 4 section tall octadant--------------------------------
function octadantY( t = 1, maxh = HEIGHT) {
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

//Sets the counter for all shapes to zero--------------------------------------
function resetCounter(){
  out = Object.create(null); //Keep count of each shape's renders
  shapeTypes.forEach(shape => { out[shape] = 0; });
  return out;
}//----------------------------------------------------------------------------

//Figure out the value of Val objects based on its configuration---------------
function determineValue(thing, count) {
  let out  = 0;
  let rate = count % thing.rate;

  switch (thing.kind) {
    case random:
      out  = randomInt(thing.min, thing.max ? thing.max : WIDTH );
      //out -= randomInt(1,    out- thing.min); //reduce likelihood of large values
      //out -= randomInt(1,  (out - thing.min)/2); //reduce likelihood of large values
      break;
    case none:        out = 0;          break;
    case fixed:       out = thing.val;  break;
    case ongrid:      out = svgconf.enabled.grids ?  GRID[count]  : WIDTH/2;              break;
    case incremental: out = thing.val + (rate ? 0 :  thing.delta  * (count - 1)        ); break;
    case exponential: out = thing.val + (rate ? 0 : (thing.scaler ** count) * thing.val); break;      
    default:          out = WIDTH/2;
  }

  return out;
}//----------------------------------------------------------------------------

//Figure out an object size based on its shape configuration-------------------
function determineSize(shape=square) {
  let out  = Object.create(null);
  let size = svgconf.shapes[shape].size;

  out.w    = roundInt(determineValue(size.w, counter[shape]),1);
  out.h    = roundInt(determineValue(size.h, counter[shape]),1);
  out.r    = roundInt(determineValue(size.r, counter[shape]),1);

  return out;
}//----------------------------------------------------------------------------

//Figure out an object position based on its shape configuration---------------
function determinePosition(shape) {
  let out = Object.create(null);
  let pos = svgconf.shapes[shape].position;

  out.cx  = determineValue(pos.cx, counter[shape]);
  out.cy  = determineValue(pos.cy, counter[shape]);
  out.cx  = roundInt((isNaN(out.cx) ? out.cx.x : out.cx), 1); //since ongrid resturns a x,y point
  out.cy  = roundInt((isNaN(out.cy) ? out.cy.y : out.cy), 1); //since ongrid resturns a x,y point

  return out;
}//----------------------------------------------------------------------------

//Figure out an object position based on its shape configuration---------------
function determineRotation(shape) {
  return roundInt(determineValue(svgconf.shapes[shape].rotation.a, counter[shape]),1);
}//----------------------------------------------------------------------------

//Figure out an object skew based on its shape configuration-------------------
function determineSkew(shape) {
  let out  = Object.create(null);
  let skew = svgconf.shapes[shape].skew;
  //Round to 2 decimal points
  out.x    = determineValue(skew.x, counter[shape]);
  out.y    = determineValue(skew.y, counter[shape]);

  return out;
}//----------------------------------------------------------------------------

function determineFill(shape) {
  let ben = new Color({hex:'#F2A10C99'});
  let out = ben.steps(total,'#1122CC99');
  return out[counter[shape]];
}


//Generates a random #RRGGBBAA color-------------------------------------------
function cornerColor(alpha=true, rs=0, re=256, gs=0, ge=256, bs=0, be=256, as=0, ae=256) {
  let r = randomInt(rs, re);
  let g = randomInt(gs, ge);
  let b = randomInt(bs, be);
  let a = randomInt(as, ae);
  let c = '#'+
    r.toString(16).padStart(2, '0')+
    g.toString(16).padStart(2, '0')+
    b.toString(16).padStart(2, '0')+
    (alpha ? a.toString(16).padStart(2, '0') : '');
  return c  
}//----------------------------------------------------------------------------

//Generates a random #RRGGBBAA color-------------------------------------------
function randomColor(pal=random) { 
  //Random color palette by default
  let rrr =  0 ;
  let ggg =  0 ;
  let bbb =  0 ;
  let aaa =  randomInt(64,192) ;
  let hex = '#';

  switch (pal) {
    case reds:
      rrr = randomInt(96,256);
      ggg = randomInt(0,96);
      bbb = randomInt(0,96);
      break;
    case blues:
      rrr = randomInt(0,96);
      ggg = randomInt(0,96);
      bbb = randomInt(96,256);
      break;
    case greens:
      rrr = randomInt(0,96);
      ggg = randomInt(96,256);
      bbb = randomInt(0,96);
      break;
    case purples:
      rrr = randomInt(96,256);
      ggg = randomInt(0,96);
      bbb = rrr;
      break;
    case yellows:
      rrr = randomInt(96,256);
      ggg = rrr;
      bbb = randomInt(0,96);
      break;
    case teals:
      rrr = randomInt(0,96);
      ggg = randomInt(96,256);
      bbb = ggg;
      break;
    case grays:
      rrr = randomInt(32,228);
      ggg = rrr;
      bbb = rrr;
      break;
    case sunset:  
      rrr = randomInt(96,256);
      ggg = randomInt(32,128);
      bbb = randomInt(96,256);
      aaa = randomInt(32,128);
      break;
    case brights:
      rrr = randomInt(128,256);
      ggg = randomInt(128,256);
      bbb = randomInt(128,256);
      aaa = randomInt(128,256);
      break;
    case darks:
      rrr = randomInt(0,128);
      ggg = randomInt(0,128);
      bbb = randomInt(0,128);
      aaa = randomInt(0,128);
      break;
    case mids:
      rrr = randomInt(64,160);
      ggg = randomInt(64,160);
      bbb = randomInt(64,160);
      aaa = randomInt(64,160);
      break;
    default:
      rrr = randomInt(0,256);
      ggg = randomInt(0,256);
      bbb = randomInt(0,256);
      aaa = randomInt(0,256);
  }

  aaa = (pal==opaque) ?              255  : aaa;
  aaa = (pal==clear ) ?               32  : aaa;
  aaa = (pal==tint  ) ? randomInt(32,160) : aaa;

  hex += rrr.toString(16).padStart(2, '0');
  hex += ggg.toString(16).padStart(2, '0');
  hex += bbb.toString(16).padStart(2, '0');
  hex += aaa.toString(16).padStart(2, '0');
  return hex;
}//----------------------------------------------------------------------------

//Syntax sugar for randomColor-------------------------------------------------
function RC(pal='') {
  return randomColor(pal);  
}//----------------------------------------------------------------------------

//Splits hex colors into their RGBA decimal values----------------------------- 
function hex2rgb(hex='') {
  let out = { R:0, G:0, B:0, A:0 };

  if (color) {
    out.R = hex.substring(1,3);
    out.G = hex.substring(3,5);
    out.B = hex.substring(5,7);
    out.A = hex.substring(7,9);
    out.R = parseInt(out.R,16);
    out.G = parseInt(out.G,16);
    out.B = parseInt(out.B,16);
    out.A = parseInt(out.A,16);
  } //console.log(out);  //DEBUG

  return out;
}//----------------------------------------------------------------------------

//Make a hex color out of individual RGBA values-------------------------------
function rgb2hex({ R=0, G=0, B=0, A=0 } = {}) {
  let out = '#';

  out += R.toString(16).padStart(2, '0');
  out += G.toString(16).padStart(2, '0');
  out += B.toString(16).padStart(2, '0');
  out += A.toString(16).padStart(2, '0');
  
  return out;  
}//----------------------------------------------------------------------------

/******************************************************************************
*********************** Below are all the SVG filters *************************
******************************************************************************/

//Depending on config adds enabled filters-------------------------------------
function svgFilters() {
  let output = '';
  if (!svgconf.enabled.filters) return output;

  let scale    = randomInt(2,   99);
  let seed25   = randomInt(1,   25);
  let seed1000 = randomInt(100, 1000);
  let x,y,z,c,d,w,h,r;

  //OBLIVION BLUR--------------------------------------------------------------
  x = randomInt(WIDTH  * 0.5, WIDTH  * 0.75);
  y = randomInt(HEIGHT * 0.5, HEIGHT * 0.75);
  w = randomInt(1, x);
  h = randomInt(1, y);    
  r = randomInt(300, 500);
  r = r+' '+r;
  //r = r%2 ? '0 '+r : r+' 0';
  output += '<filter id="oblivion">\r\n';
  output += `  <feTile in="SourceGraphic" x="${x}" y="${y}" width="${w}" height="${h}" />\r\n`;
  output += '  <feTile />\r\n';
  output += `  <feGaussianBlur in="SourceGraphic" stdDeviation="${r}" edgeMode="duplicate" color-interpolation-filters="sRGB" />\r\n`;
  output += '</filter>\r\n';

  //BNW------------------------------------------------------------------------
  if (svgconf.filters.bnw) {
    let out = '';
    out += '<filter id="bnw" filterUnits="objectBoundingBox">\r\n';
    out += '  <feColorMatrix id="lumval" type="luminanceToAlpha" in="SourceGraphic"/>\r\n';
    out += '</filter>\r\n';
    output += out;
  }

  //PIXEL8---------------------------------------------------------------------
  if (svgconf.filters.pixelate) {
    let out = '';
    let r = randomInt(5, 101);
    out += '<filter id="pixelate">\r\n';
    out += '  <feGaussianBlur operator="pixelate" in="SourceGraphic" radius="'+r+'"/>\r\n';
    out += '</filter>\r\n';
    output += out;
  }  

  //MBOSS----------------------------------------------------------------------
  if (svgconf.filters.mboss) {
    let out = '';
    out += '<filter id="mboss">\r\n';
    out += '  <feConvolveMatrix order="4" kernelMatrix="-2 2 1 -1 -1 3 2 1 -1 0 -1 -4 -1 1 0 0"/>\r\n';
    out += '</filter>\r\n';
    output += out;
  }

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
    x  = randomInt(5, 400);
    x -= randomInt(1,   x); //reduce likelihood of large x
    out += '<filter id="motionblurx">\r\n';
    out += `  <feGaussianBlur in="SourceGraphic" stdDeviation="${x} 0" edgeMode="duplicate" color-interpolation-filters="sRGB" />\r\n`;
    out += '</filter>\r\n';
    output += out;
  }

  //MOTION BLUR Y--------------------------------------------------------------
  if (svgconf.filters.motionblury) {
    let out = '';
    y  = randomInt(5, 300);
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
  if (svgconf.filters.pointlight) {
    let out = '';
    x = randomInt(WIDTH  * 0.1, WIDTH  * 0.9);
    y = randomInt(HEIGHT * 0.1, HEIGHT * 0.9);
    c = randomInt(1, colors);
    z = seed1000;
    out += '<filter id="pointlight">\r\n';
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
    x = randomInt(WIDTH  * 0.5, WIDTH  * 0.75);
    y = randomInt(HEIGHT * 0.5, HEIGHT * 0.75);
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

/******************************************************************************
************* Below are all the functions that generate points ****************
******************************************************************************/

//Generates 4 semi-random points to make shapes with---------------------------
function svg4Points(xmax = WIDTH, ymax = HEIGHT) {
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
function svg6WPoints(xmax = WIDTH, ymax = HEIGHT) {
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
function svg8Points(xmax = WIDTH, ymax = HEIGHT) {
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
function svgRadialPoints(n = 12, cx = roundX(100,WIDTH-100), cy = roundY(100,HEIGHT-100), r = roundY(100,HEIGHT/3)) {
  let points = [ { x:cx , y:cy, r:r, n:n } ];  //index 0 is the center mark 
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
function svgPoints( xmax = WIDTH, ymax = HEIGHT, count = 4, option = '') {
  points = [];

  switch (count) {
    case 6 : points = (option != 'T') ? svg6WPoints(xmax,ymax) : svg6TPoints(xmax,ymax); break;
    case 8 : points = svg8Points(xmax,ymax); break;
    default: points = svg4Points(xmax,ymax); break;
  }

  return points;
}//----------------------------------------------------------------------------

function svgGridPoints() {
  let out = []
  switch (svgconf.grids) {
    case 'normal'  : out = svgCartesianGrid(); break;
    case 'radial'  : out = svgRadialGrid(); break;
    case 'spiral'  : out = svgSpiralGrid(); break;
    case 'diagonal': out = svgCartesianGrid('diagonal'); break
    default        : out = svgCartesianGrid();
  }
  return out;
}//----------------------------------------------------------------------------

//Radial R,A grid--------------------------------------------------------------
function svgRadialGrid( r=0, a=0, dr=0, da=0, cx=0, cy=0, bound="?" ) {
  r  = r  ? r : svgconf.grids.r;
  a  = a  ? a : svgconf.grids.a;
  dr = dr ? dr: svgconf.grids.dr; //Radius incremental delta
  da = da ? da: svgconf.grids.da; //Angle incremental delta
  cx = cx ? cx: roundInt(WIDTH/2,1);
  cy = cy ? cy: roundInt(HEIGHT/2,1);
  b  = bound;
  bound = (b="?") ? svgconf.grids.bound : false; //False for building shapes (not grids)
  let points = [ { z:'ignore-zero', cx:cx , cy:cy, r:r, a:a } ]; //index 0 is the center mark 
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
      if (bound && ((x<0) || (x>WIDTH) || (y<0) || (y>HEIGHT))) {
        msg += ((x<0) || (x>WIDTH))  ? 'Ignored out of bounds (X: '+x+') ':'Even with a normal    (X: '+x+') ';  
        msg += ((y<0) || (y>HEIGHT)) ? 'Ignored out of bounds (Y: '+y+') ':'Even with a normal    (Y: '+y+') '; 
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
  cx = cx ? cx: roundInt(WIDTH/2,1);
  cy = cy ? cy: roundInt(HEIGHT/2,1);
  b  = bound;
  bound  = (b=="?") ? svgconf.grids.bound : false; //False for building shapes (not grids)
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
      if (bound && ((x<0) || (x>WIDTH) || (y<0) || (y>HEIGHT))) {
        msg += ((x<0) || (x>WIDTH))  ? 'Ignored out of bounds (X: '+x+') ':'Even with a normal    (X: '+x+') ';  
        msg += ((y<0) || (y>HEIGHT)) ? 'Ignored out of bounds (Y: '+y+') ':'Even with a normal    (Y: '+y+') '; 
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
  //console.log(points);  
  //console.log(msg);  //DEBUG

  return points;
}//----------------------------------------------------------------------------

//Normal X,Y grid--------------------------------------------------------------
function svgCartesianGrid(diagnal = false) {  
  let sx = svgconf.grids.start.x;
  let sy = svgconf.grids.start.y;
  let ex = svgconf.grids.end.x ? svgconf.grids.end.x : WIDTH;
  let ey = svgconf.grids.end.y ? svgconf.grids.end.y : HEIGHT;
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
  let table  = [zero];
  let points = [zero];
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
  let points = [zero];
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

//Vertical Top Left to Bottom Right--------------------------------------------
function svgGridOrderVertical(dx=160, dy=160, rows=10, cols=6){
  let pos    = Object.create(null);
  let points = [zero];
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

//Reverse Vertical Bottom Right to Top Left------------------------------------
function svgGridOrderVertiBack(dx=160, dy=160, rows=10, cols=6){
  let points = svgGridOrderVertical(dx,dy,rows,cols);
  points.shift();  //Gets rid of zero
  let reversed = [zero, ...points.reverse()];  //console.log(reversed); //DEBUG
  return reversed;
}//----------------------------------------------------------------------------

//Everyrow switch between L2R/R2L----------------------------------------------
function svgGridOrderSnake(dx=160, dy=160, rows=10, cols=6){
}//----------------------------------------------------------------------------

/******************************************************************************
************* Below are all the functions that generate the SVG ***************
******************************************************************************/

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
  let c, u, v, g, w, h, f, t;

  d       = svgDefaults();
  c       = d.colors.selected;
  u       = d.duration.selected;
  v       = d.variants.selected;
  g       = d.gradients.selected;
  w       = d.canvas.width.selected;
  h       = d.canvas.height.selected;
  grids   = d.grids;
  paths   = d.paths;
  canvas  = d.canvas;
  enabled = d.enabled;
  objects = d.objects;
  f       = 0; //Total number of enabled filters
  t       = 0; //Total number of objects (shapes * variations of each shape)

  if (isNaN(w)) w = (w == random) ? roundX(canvas.width.min,  canvas.width.max  ) : canvas.width.system;
  if (isNaN(h)) h = (h == random) ? roundY(canvas.height.min, canvas.height.max ) : canvas.height.system;
  if (isNaN(c)) c = (c == random) ? randomInt(d.colors.min,      d.colors.max   ) : d.colors.system;
  if (isNaN(u)) u = (u == random) ? randomInt(d.duration.min,    d.duration.max ) : d.duration.system;
  if (isNaN(v)) v = (v == random) ? randomInt(d.variants.min,    d.variants.max ) : d.variants.system;
  if (isNaN(g)) g = (g == random) ? randomInt(d.gradients.min,   d.gradients.max) : d.gradients.system;

  if (d.enabled.filters) {  //Only if filters are enabled
    Object.keys(d.filters).forEach(filter => { //Only keep the enabled filters, discared others
      if (d.filters[filter]) {
        filters[filter] = filter;
        f++;
      }
    }); 
  }
  
  Object.keys(d.shapes).forEach(shape => { //Go through each shape kind
    if (isNaN(d.shapes[shape].count)) {    //Assign requested random/default values
      d.shapes[shape].count = (shapes[shape].count == 'random') ? randomInt(d.objects.min, shapes[shape].max) : d.objects.system;
    }

    if (d.shapes[shape].count) { //Only keep the enabled shapes, discard others
      shapes[shape] = d.shapes[shape];
      //Create orders for each requested count of the enabled shape kinds
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
      if (shapes[shape].fill === true  ) shapes[shape].fill = solid; //true means solid
      if (shapes[shape].fill === solid ) shapes[shape].fill = 'var(--c'+randomInt(1, total)+')';
      if (shapes[shape].fill === system) shapes[shape].fill = objects.fill;
      if (shapes[shape].fill === none  ) shapes[shape].fill = false;
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
//parsed['order'    ] = ['zero', ...randomize(order)];
parsed['order'    ] = ['zero', ...order];
  
  return parsed;
}//----------------------------------------------------------------------------

//Generates random colors as CSS variables------------------------------------- 
function svgColors(pal = [ '#00000000' ]) {
  let extra   = '';
  let output  = '  --c0:  #00000000; \r\n';

  for (let i=1; i <= colors; i++) {
    pal[i] = randomColor();
    extra  = ((i < 10)) ? ' ' : '';
    output += '  --c' + i + ': '+extra+ pal[i] + ((i % 5) ? ';' : ';\r\n');
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
  let content = '* { transform-box: fill-box; } text { font-size:0.65em; }\r\n'+svgVars(svgid);
  let close   = '</style>\r\n';
  let output  = open + content + close;
  return output;
}//----------------------------------------------------------------------------

//Generates Linear or Radial Gradients-----------------------------------------
function svgGrad(gid, gkind = 'L') {
  let c     = svgconf.gradients; //Number of colors per gradient
  let nudge = Math.floor(100/(c-1));
  let open  = `  <linearGradient id="grad-${gid}" gradientUnits="userSpaceOnUse" x1="${roundX(100,WIDTH*0.5)}" y1="${roundY(100,HEIGHT*0.3)}" x2="${WIDTH}" y2="${HEIGHT}">\r\n`;
  let close = '  </linearGradient>\r\n';
  if (gkind == 'R') {
    open    = `  <radialGradient id="grad-${gid}" gradientUnits="userSpaceOnUse" cx="${roundX(100,WIDTH-100)}" cy="${roundY(100,HEIGHT-100)}" r="${roundY(WIDTH/2,WIDTH)}">\r\n`;
    close   = '  </radialGradient>\r\n';
  }

  let g                    = `    <stop offset="0.00"` +        ` stop-color="var(--c${randomInt(1, colors)})"/>\r\n`;
  for (i=2; i < c; i++) g += `    <stop offset="0.${(i-1)*nudge}" stop-color="var(--c${randomInt(1, colors)})"/>\r\n`;  
  g                       += `    <stop offset="1.00"` +        ` stop-color="var(--c${randomInt(1, colors)})"/>\r\n`;

  return open + g + close;
}//----------------------------------------------------------------------------

//Generates Corner Radial Gradients--------------------------------------------
function svgCornerGrad(kind = tlc) {
  let g  = '';
  let c1 = '';
  let c2 = '';
  let c3 = '';
  let sp = {}; //Starting point
  let corners = [tlc, trc, blc, brc];
  
  for (let i=0; i<4; i++) {
    kind = corners[i];

    switch (kind) {
      case tlc: sp=TLC; break;
      case trc: sp=TRC; break;
      case blc: sp=BLC; break;
      case brc: sp=BRC; break;
      default:  sp=TLC; kind=tlc;
    }

    c1 = cornerColor(true,99,225,32,128,99,225,99,199);
    c2 = cornerColor(true,64,193,64,193,64,225,32, 96);
    c3 = cornerColor(true,32,128,32,128,32,128, 0, 64);
    g += `  <radialGradient id="corner-${kind}" gradientUnits="userSpaceOnUse" cx="${sp.x}" cy="${sp.y}" r="${HEIGHT}">\r\n`;
    g += '    <stop offset="0.00" stop-opacity="0.50" stop-color="'+c1+'"/>\r\n';
    g += '    <stop offset="0.25" stop-opacity="0.33" stop-color="'+c1+'"/>\r\n';
    g += '    <stop offset="0.75" stop-opacity="0.15" stop-color="'+c2+'"/>\r\n';
    g += '    <stop offset="1.00" stop-opacity="0.0"  stop-color="'+c3+'"/>\r\n';
    g += '  </radialGradient>\r\n';
  }

  return g;
}//----------------------------------------------------------------------------

//Adds Linear & Radial gradients-----------------------------------------------
function svgGradients(kind = 'L') {
  let output = '';
  if (corner in svgconf.shapes) {
    output += svgCornerGrad(svgconf.shapes.corner.kind);
  }

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
  circle += `/>\r\n`;
  return circle;
}//----------------------------------------------------------------------------

//Adds illustrator style grid points-------------------------------------------
function svgXMark(x = 100, y=100, r=4, c='white', classname='xmark', text='') {
  let out = '';
  out += '<path d="';
  out += ' M '+(x-r)+','+(y+r);
  out += ' L '+(x+r)+','+(y-r);
  out += ' M '+(x+r)+','+(y+r);
  out += ' L '+(x-r)+','+(y-r);
  out += `" stroke="${c}" `;
  out += `class="${classname}" `; 
  out += `/>\r\n`;
  out += svgconf.enabled.text ? out += `<text fill="${svgconf.enabled.text}" x="${x-r}" y="${y+r+10}">${text}</text>\r\n` : '';  
  return out;
}//----------------------------------------------------------------------------

//Adds illustrator style center points-----------------------------------------
function svgCrossHair(x = 100, y=100, r=5, c='white', classname='mark', text='') {
  let out = '';
  out += '<path d="';
  out += ' M '+(x-r)+','+y;
  out += ' L '+(x+r)+','+y;
  out += ' M '+ x   +','+(y-r);
  out += ' L '+ x   +','+(y+r);
  out += `" stroke="${c}" `;
  out += `class="${classname}" `; 
  out += `/>\r\n`;
  out += svgconf.enabled.text ? out += `<text fill="${svgconf.enabled.text}" x="${x+2}" y="${y+r+8}">${text}</text>\r\n` : '';  
  return out;
}//----------------------------------------------------------------------------

//Adds elements enabled in config----------------------------------------------
function svgContent() {
  let output  = '';
  let render  = '';
  let filter  = '';
  let stroke  = '';
  let shape   = '';
  let fill    = '';
  let grid    = '';
  let luck    = 0;
  let rr      = randomInt(3,16);  //For Randogons
  let oo      = randomInt(3,15);  //For Oddagons
  oo = (oo % 2) ? oo : oo-1; //Only odd

  for (oid=1; oid < svgconf.order.length; oid++) {
    render = '';
    stroke = '';
    filter = '';
    fill   = '';
    data   = '';
    luck   = randomInt(1,100);
    thick  = randomInt(1,250);  //Random stroke thickness
    thick  = thick - randomInt(1,thick); //decrease odds of large values
    fill   = 'var(--c'+oid+')';
    shape  = svgconf.order[oid];
    elements[oid] = { z:oid, render:render, data:data }; //Insert blank data
    counter[shape]++;

    if (svgconf.shapes[shape].filter) { 
      filter = svgconf.shapes[shape].filter; //Preselected filter
      filter = (filter == 'random') ? filters[randomInt(0, fcount)] : filter;
      filter = ' filter="url(#'+filter+')" ';
    } else filter = '';
        
    if (svgconf.shapes[shape].fill) { 
    //fill = determineFill(shape);
      fill = svgconf.shapes[shape].fill; //Preselected fill
      fill = ((fill == 'random') && svgconf.enabled.gradients) ? 'url(#grad-'+svgid+'-'+oid+')' : fill;
      fill = ' fill="'+fill+'" ';
    } else fill = '';

    swidth = svgconf.shapes[shape].stroke.swidth; //Random = half none / half stroke 
    swidth = (swidth == 'random') ? ((luck % 2) ? thick : 0) : swidth;

    if (swidth) {
      //stroke += ' stroke-dasharray="3 3 1 3"';  //DEBUG WHY NOT WORKING
      stroke += ' stroke="'+svgconf.shapes[shape].stroke.scolor+'"';
      stroke += ' stroke-width="'+swidth+'"';
      stroke += ' stroke-linecap="round"';
      stroke += ' stroke-linejoin="round"';
      stroke += (svgconf.shapes[shape].stroke.opacity != 1) ? ' stroke-opacity="'+svgconf.shapes[shape].stroke.opacity+'" ' : ' ';
    } else stroke = '';

    let options         = Object.create(null);
    options['oid'      ] = oid;
    options['name'     ] = shape;
    options['stroke'   ] = stroke;
    options['filter'   ] = filter;
    options['fill'     ] = fill;
    options['grid'     ] = svgconf.shapes[shape].grid;
    options['size'     ] = determineSize(shape);
    options['position' ] = determinePosition(shape);
    options['events'   ] = ' onclick="this.style.fill = RC()" ';

    let skew      = determineSkew(shape);
    let rotation  = determineRotation(shape);
    let transform = (rotation || skew) ? ' transform="' : '';
    transform    += rotation ? 'rotate('+rotation+') ' : '';
    transform    += skew ? 'skewX('+skew.x+') skewY('+skew.y+') ' : '';
    transform    += transform ? '" transform-origin="center center" ' : '';
    options['transform'] = transform;  
    //console.log(options);  //DEBUG

    switch(shape) {      
    //case blob      : render += svgBlob(oid,options);       break;
    //case claw      : render += svgBearClaw(oid,options);   break;
    //case star      : render += svgStar(oid,options);       break;
    //case flame     : render += svgFlame(oid,options);      break;
    //case corner    : render += svgCorner(oid,options);     break;
    //case pollen    : render += svgPollen(oid,options);     break;
    //case ellipse   : render += svgellipse(oid,options);    break;
      case star      : render += svgStar(oid,options);       break;
      case cloud     : render += svgCloud(oid,options);      break;
      case corner    : render += svgCorner(oid,options);     break;
      case circle    : render += svgCircle(oid,options);     break;
      case flower    : render += svgFlower(oid,options);     break;
      case square    : render += svgRect(oid,true ,options); break;
      case rectangle : render += svgRect(oid,false,options); break;
      case triangle  : render += svgPolygon(oid, 3,options); break;
      case pentagon  : render += svgPolygon(oid, 5,options); break;
      case hexagon   : render += svgPolygon(oid, 6,options); break;
      case octagon   : render += svgPolygon(oid, 8,options); break;
      case dexagon   : render += svgPolygon(oid,10,options); break;
      case oddagon   : render += svgPolygon(oid,oo,options); break;
      case randogon  : render += svgPolygon(oid,rr,options); break;
      case nautilus  : render += svgNautilus(oid,  options); break
    }
    elements[oid].render = render;
    output += render;
  } //console.log(elements);  //DEBUG

  return output
}//----------------------------------------------------------------------------

function svgShowGrid() {
  let output  = '';
  if (svgconf.enabled.grids) {
    switch(svgconf.grids.kind) {
      case radial: GRID = svgRadialGrid(); break;
      case spiral: GRID = svgSpiralGrid(); break;
      default:     GRID = svgCartesianGrid();
    } //console.log(GRID); //DEBUG

    for (let i=1; i<GRID.length; i++) {
      let x = GRID[i].x;
      let y = GRID[i].y;
      output += svgconf.grids.show ? svgXMark ( x, y, 4, svgconf.enabled.grids, 'grid', i) : '';
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
  counter     = resetCounter();
  svgid       = epoch() + randomInt(100,999); //Create new ID for each inserted instance
  open       += `viewBox="0 0 ${WIDTH} ${HEIGHT}" `;
  open       += `id="svg-${svgid}" `;
  open       += `fill="none" `;
  open       += 'preserveAspectRatio="xMinYMid slice" '; //TODO add to config
  open       += `xmlns="${xmlns}" `;
  open       += `xmlns:xlink="${xlink}" >\r\n`;
  //SVG Begins---------------------------------------------
  output     += open;             //Start
  output     += svgStyle(svgid);  //Add CSS
  output     += svgDefs();        //Add Filters & Gradients
  output     += svgBoundingBox(); //Add Background Color
  output     += svgShowGrid();    //Add Grids if any
  output     += svgContent();     //Add all the shapes
  output     += close;            //Have a nice day
  //-------------------------------------------------------
  idStack.unshift('svg-'+svgid);   //Adds newest id on top
  svgFiles['svg-'+svgid] = output; //console.log(svgFiles); //DEBUG
  if (idStack.length > 10) {       //Only keep 10 files in stack 
    tokill = idStack.pop();        //console.log(tokill); //DEBUG
    delete svgFiles[tokill];
  }

  return output;
}//----------------------------------------------------------------------------

//Encodes and sends the file to user-------------------------------------------
function svgDownload(fid) {
  let svg  = document.getElementById('svg-'+svgid);
  let code = svg ? svg.outerHTML : svgFiles[fid];
  if (!code) return console.log('No file to download :(');
  if (Object.hasOwn(svgFiles,fid)) {
    let  link = document.createElement('a');
    link.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(code);
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
  return `<button kind="button" name="nextsvg" style="${style}" onclick="svgInsert(this.parentNode)" ${mouse}>Next</button>\r\n`;
}//----------------------------------------------------------------------------

//Creates a Previous button-----------------------------------------------
function svgLast() {
  if (idStack.length > 1) {
    let style = 'position: absolute; bottom: 20px; left: 20px; opacity: 0.35;';
    let mouse = 'onmouseover="this.style.opacity = 1" onmouseout="this.style.opacity = 0.35"';
    //return `<button kind="button" name="lastsvg" style="${style}" onclick="svgInsert(this.parentNode, '${idStack[lastIndex-1]}')" ${mouse}>Last</button>\r\n`;
  }
  return '';
}//----------------------------------------------------------------------------

//Creates a file download button-----------------------------------------------
function svgDLButton() {
  let style = 'position: absolute; bottom: 20px; left: 80px; opacity: 0.35;';
  let mouse = 'onmouseover="this.style.opacity = 1" onmouseout="this.style.opacity = 0.35"';
  return `<button kind="button" name="downloadsvg" style="${style}" onclick="svgDownload('svg-${svgid}')" ${mouse}>Download</button>\r\n`;
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
  info += "[    height : "+String(HEIGHT ).padStart(5, ' ')+'   ]\r\n';
  info += "[     width : "+String(WIDTH  ).padStart(5, ' ')+'   ]\r\n';
  info += "-----------------------\r\n";
  console.log(info);
  svgens.forEach(svgen => { svgInsert(svgen)});
  console.log("SVGen initialized");
  return "Done!";
}, this);
//-----------------------------------------------------------------------------


/******************************************************************************
*************** Class definitions for the various objects below ***************
******************************************************************************/

//Any point on either a Cartesian or Radial grid-------------------------------
class Point {
  // Constructor
  constructor() {
    this.id = ''; //Name
    this.cx = 0;  //Center X
    this.cy = 0;  //Center Y
    this.n  = 0;  //Itaration number
    this.x  = 0;
    this.y  = 0;
    this.r  = 0;
    this.a  = 0;
    this.z  = 0;
  }

  log() {
    let out = 'p[ ';
    out += this.id ? 'id:'+this.id+' ' : '';
    out += this.cx ? 'cx:'+this.cx+' ' : '';
    out += this.cy ? 'cy:'+this.cy+' ' : '';
    out += this.n  ?  'n:'+this.n +' ' : '';
    out += this.x  ?  'x:'+this.x +' ' : '';
    out += this.y  ?  'y:'+this.y +' ' : '';
    out += this.z  ?  'z:'+this.z +' ' : '';
    out += this.r  ?  'r:'+this.r +' ' : '';
    out += this.a  ?  'a:'+this.a +' ' : '';
    out += ']';
    console.log(out)
  } 
}//----------------------------------------------------------------------------

//Any value needing constraints, incremental, exponential or angular functions-
class Val {
  constructor(name=  'anon', {
    kind          =  random,
    val           =       0, 
    min           =       0, 
    max           =       0,
    sys           =       0,
    num           =       0,
    func          =    null,
    rate          =       1,
    delta         =       0,
    scaler        =       0,
    angular       =       0,
  } = {}) {
    this.name     =    name;
    this.kind     =    kind;
    this.val      =     val; 
    this.min      =     min;
    this.max      =     max;
    this.sys      =     sys;
    this.num      =     num;
    this.func     =    func;
    this.rate     =    rate;
    this.delta    =   delta;
    this.scaler   =  scaler;
    this.angular  = angular;
  }  
}//----------------------------------------------------------------------------

//Color in either RGBA or HSLA format------------------------------------------
class Color {
  constructor({
    name = '', 
    kind = rgba, //or hlsa
    pal  = random,
    R    = 0,
    G    = 0,
    B    = 0,
    H    = 0,
    S    = 0,
    L    = 0,
    A    = 0,
    hex  = '',
  } = {}) {
    this.R    = new Val('R', { val:0, min:0, max:255, delta: 8, scaler:1.050 });
    this.G    = new Val('G', { val:0, min:0, max:255, delta: 8, scaler:1.050 });
    this.B    = new Val('B', { val:0, min:0, max:255, delta: 8, scaler:1.050 });
    this.A    = new Val('A', { val:0, min:0, max:255, delta: 8, scaler:1.050 });    
    this.H    = new Val('H', { val:0, min:0, max:360, delta:10, scaler:1.125 });
    this.S    = new Val('S', { val:0, min:0, max:100, delta: 3, scaler:1.050 });
    this.L    = new Val('L', { val:0, min:0, max:100, delta: 3, scaler:1.050 });
    this.kind = (kind == hsla) ? kind : rgba;
    this.name = name;
    this.pal  = pal;

    if (kind == rgba) { //use hex value if privided otherwise use individual RGB vals
      let rgb = hex2rgb((hex ? hex : RC(pal)));
      this.R.val = hex ? rgb.R : (R ? R : randomInt(1,256));
      this.G.val = hex ? rgb.G : (G ? G : randomInt(1,256));
      this.B.val = hex ? rgb.B : (B ? B : randomInt(1,256));
      this.A.val = hex ? rgb.A : (A ? A : randomInt(1,256));
      this.A.max = 255;
      this.hex   = hex ? hex : rgb2hex({R:this.R.val, G:this.G.val, B:this.B.val, A:this.A.val});
    } else {
      this.H.val = H ? H : randomInt(1,361);
      this.S.val = S ? S : randomInt(1,101);
      this.L.val = L ? L : randomInt(1,101);
      this.A.val = A ? A : randomInt(1,101);
      this.A.max = 100;
      this.hsla = 'hsla('+this.H+','+this.S+'%,'+this.L+'%,'+this.A/255+')';
    }
  }

  steps(steps=10, goal=RC()) {
    let out = [this.hex]; //index zero
    let start = hex2rgb(this.hex);
    let end   = hex2rgb(goal);

    //Determine the delta value for each step
    let dR = roundInt(((end.R - start.R) / steps), 1);
    let dG = roundInt(((end.G - start.G) / steps), 1);
    let dB = roundInt(((end.B - start.B) / steps), 1);
    let dA = roundInt(((end.A - start.A) / steps), 1);
   
    for (let s=1; s<steps; s++) {
      start.R += dR;
      start.G += dG;
      start.B += dB;
      start.A += dA;
      out[s] = rgb2hex({R:start.R, G:start.G, B:start.B, A:start.A});
    }
    out[steps] = goal;
    return out;
  }
}//----------------------------------------------------------------------------

//Every shape can have its own Cartesian, Radial or Spiral grid----------------
class Grid {
  constructor(name) {
    this.name            =    name ?? 'Cartesian';
    this.kind            =    normal;  //true = normal, radial, spiral (TODO: diagonal)
    this.show            =         1;
    this.text            =         0;  //FF06;
    this.bound           =     false;  //true = delete points that fall outside of bounding box, false = keep  
    this.order           =    normal;  //normal (horizontal), backward, vertical, vertiback, (TODO: snake, vsnake, outward, inward)
/*
    //Radial & Spiral Grid specifics;
    this.center          = new Point;
    this.center.cx       =   new Val;
    this.center.cy       =   new Val;
    this.center.r        =   new Val;
    this.center.r.val    =       420;
    this.center.r.delta  =       140;
    this.center.a        =   new Val;
    this.center.a.val    =         0;
    this.center.a.delta  =        15;
    this.center.a.scaler =        15;
    //Cartesian & Isometric specific;
    this.start           = new Point;
    this.start.x         =   new Val;
    this.start.y         =   new Val;
    this.start.x.delta   =        80;
    this.start.y.delta   =        80;
    this.end             = new Point;
    this.end.x           =   new Val;
    this.end.y           =   new Val;
    this.end.x.val       =    WIDTH - this.start.x.delta;
    this.end.y.val       =   HEIGHT - this.start.y.delta;
*/
    this.start =  new Point; 
    this.end   =  new Point; 
    this.dx    =        160; 
    this.dy    =        160;
    //Radial/Spiral Grids (order kinds: normal, backward, outward, inward)
    this.r     =        340; 
    this.a     =          0;
    this.dr    =        170;
    this.da    =       12.5;
    this.cy    =          0; 
    this.cx    =          0;
    this.sr    =          1;  //Spirals
    this.sa    =    0.00025;  //Spirals    
  }
}//----------------------------------------------------------------------------

//Size parameters of a shape---------------------------------------------------
class Size {
  constructor() {
    this.w = new Val('width' , { val:40, min:80, max:800, delta:10, scaler:1.125 });
    this.h = new Val('height', { val:30, min:60, max:600, delta:10, scaler:1.125 });
    this.r = new Val('radius', { val:20, min:30, max:0,   delta:15, scaler:1.125 }); //0 = canvas width/2
  }
}//----------------------------------------------------------------------------

//Position parameters of a shape-----------------------------------------------
class Position {
  constructor() {
    this.cx = new Val('cx');
    this.cy = new Val('cy');
  }
}//----------------------------------------------------------------------------

//Rotation parameters of a shape-----------------------------------------------
class Rotation {
  constructor() {
    this.a = new Val('angle', { val:0, min:-360, max:360, kind:none, delta:5, scaler:1.1 });
  }
}//----------------------------------------------------------------------------

//Scale parameters of a shape---------------------------------------------------
class Scale {
  constructor() {
    this.s = new Val('amount', { val:1.5, min:0, max:5, kind:none, delta:0.1, scaler:1.01 });
  }
}//----------------------------------------------------------------------------

//Skew parameters of a shape---------------------------------------------------
class Skew {
  constructor() {
    this.x = new Val('quantity', { val:1.5, min:0, max:5, kind:none, delta:1, scaler:1.1 });
    this.y = new Val('quantity', { val:1.5, min:0, max:5, kind:none, delta:1, scaler:1.1 });
  }
}//----------------------------------------------------------------------------

//Stroke parameters of a shape-------------------------------------------------
class Stroke {
  constructor() {
    this.color   =  new Color; //To replace SCOLOR
    this.scolor  = RC(opaque);
    this.swidth  =     random;
    this.opacity =       0.25;
  }
}//----------------------------------------------------------------------------

//Generic shape template for other shapes to inherit their structure from------
class Shape {
  constructor(name) {
    this.name     = name ?? shapor;  //Any name in shapeTypes
    this.n        =      0;  //Iterator number
    this.count    =      0;  //Number of instance
    this.pcount   =      1;  //Number of points
    this.points   = [ new Point ];  //All shapes have cx,cy
    this.kind     = normal;  //Normal (Boxy) or Radial
    this.fill     = random;
    this.filter   = random;
    this.grid     = new Grid(name);
    this.size     = new Size;
    this.skew     = new Skew;
    this.color    = new Color;
    this.scale    = new Scale;
    this.stroke   = new Stroke;
    this.position = new Position;
    this.rotation = new Rotation;
  }
}//----------------------------------------------------------------------------




//Initialize the global variables and syntax sugars----------------------------
var counter         = Object.create(null); //Keeps count of renders
var svgFiles        = Object.create(null); //Final rendered file output
var svgid           = '123456789';
var elements        = []; //Keeps track of each element data and rendered outputs
var idStack         = []; //Keeps track of previous render 
var GRID            = []; //Global Grid points
var total           = 0;
var lastIndex       = 0;
var anchorall       = '';
//Syntax sugars to reduce typing ''
const incremental   = 'incremental';
const exponential   = 'exponential';
const functional    = 'functional';
const backward      = 'backward';
const diagonal      = 'diagonal';
const monotone      = 'monotone';
const selected      = 'selected';
const selfgrid      = 'selfgrid';
const tritonal      = 'tritonal';
const vertical      = 'vertical';
const angular       = 'angular';
const opacity       = 'opacity';
const palette       = 'palette';
const sysgrid       = 'sysgrid';
const uniform       = 'uniform';
const amount        = 'amount';
const middle        = 'middle';
const normal        = 'normal';
const ongrid        = 'ongrid';
const radial        = 'radial';
const spiral        = 'spiral';
const random        = 'random';
const shapor        = 'shapor';
const system        = 'system';
const fixed         = 'fixed';
const solid         = 'solid';
const both          = 'both';
const kind          = 'kind';
const none          =  null ;
const zero          = 'zero';
const min           = 'min';   //Value
const max           = 'max';   //Value
const tlc           = 'tlc';   //Top Left Corner
const trc           = 'trc';   //Top Right Corner
const blc           = 'blc';   //Bottom Left Corner
const brc           = 'brc';   //Bottom Right Corner
//Path related syntax sugars
const arc           = 'arc';
const quad          = 'quad';
const cube          = 'cube';
const line          = 'line';
//Filter related syntax sugars
const bnw           = 'bnw';
const glow          = 'glow';
const tile          = 'tile';
const dance         = 'dance';
const mboss         = 'mboss';
const chaotic       = 'chaotic';
const oblivion      = 'oblivion'; 
const pixelate      = 'pixelate';
const watercolor    = 'watercolor';
const pointlight    = 'pointlight';
const motionblurx   = 'motionblurx';
const motionblury   = 'motionblury';
const displacement  = 'displacement';
const gaussianblur  = 'gaussianblur';
//Array used for iterating filters
const filterTypes   = new Array(
  bnw          ,
  glow         ,
  tile         ,
  dance        ,
  mboss        ,
  chaotic      ,
  oblivion     ,
  pixelate     ,
  watercolor   ,
  pointlight   ,
  motionblurx  ,
  motionblury  ,
  displacement ,
  gaussianblur ,
);
//Color related syntax sugars  
const color         = '#333F';  //Default BG color
const black         = 'black';
const white         = 'white';
const green         = 'green';
const rgba          = 'rgba';
const hsla          = 'hsla';
const gold          = 'gold';
const lime          = 'lime';
const blue          = 'blue';
const red           = 'red';
const pink          = 'hotpink';
const FFF3          = '#FFF3';
const FFF6          = '#FFF6';
const FFF9          = '#FFF9';
const FFFC          = '#FFFC';
const FF03          = '#FF03';
const FF06          = '#FF06';
const FF09          = '#FF09';
const FF0C          = '#FF0C';
//Color Palette names used by randomColor();
const mids          = 'mids';
const reds          = 'reds';
const tint          = 'tint';
const blues         = 'blues';
const clear         = 'clear';
const darks         = 'darks';
const grays         = 'grays';
const teals         = 'teals';
const greens        = 'greens';
const sunset        = 'sunset';
const opaque        = 'opaque';
const pastels       = 'pastels';
const brights       = 'brights';
const purples       = 'purples';
const yellows       = 'yellows';
//Shape kinds syntax sugar allows modifications in one spot
const blob          = 'blob';
const claw          = 'claw';
const wave          = 'wave';
const cloud         = 'cloud';
const flame         = 'flame';
const corner        = 'corner';
const bullet        = 'bullet';
const letter        = 'letter';
const square        = 'square';
const ellipse       = 'ellipse';
const mountain      = 'mountain';
const rectangle     = 'rectangle';
//Radial shapes below, boxy shapes above
const star          = 'star';
const heart         = 'heart';
const circle        = 'circle';
const flower        = 'flower';
const pollen        = 'pollen';
const hexagon       = 'hexagon';
const octagon       = 'octagon';
const oddagon       = 'oddagon';
const polygon       = 'polygon';
const dexagon       = 'dexagon';
const nautilus      = 'nautilus';
const randogon      = 'randogon';
const pentagon      = 'pentagon';
const triangle      = 'triangle';
const umbrella      = 'umbrella';
//Array used for iterating shapes
const shapeTypes    = new Array(
  corner    ,  //Bottom most layer
  blob      ,  //Boxy shapes  
  claw      ,
  wave      ,
  cloud     ,
  flame     ,
  bullet    ,
  letter    ,
  square    ,
  ellipse   ,
  mountain  ,
  rectangle ,
  star      ,  //Radial shapes 
  heart     ,
  circle    ,
  flower    ,
  pollen    ,
  hexagon   ,
  octagon   ,
  oddagon   ,
  polygon   ,
  dexagon   ,
  nautilus  ,
  randogon  ,
  pentagon  ,
  triangle  ,
  umbrella  ,
);
//Parse the conguration and run
let svgconf    = parseConf();
const opt      = defaultOptions();
const filters  = Object.keys(svgconf.filters);
const scount   = Object.keys(svgconf.shapes).length; //Number of enabled shapes
const fcount   = filters.length;                     //Number of enabled filters
const WIDTH    = svgconf.width;
const HEIGHT   = svgconf.height;
const colors   = svgconf.colors;
const pcolor   = svgconf.enabled.points;  //Point  color
const center   = svgconf.enabled.centers; //Center color
const acolor   = svgconf.enabled.anchors; //Anchor color
const gcolor   = svgconf.enabled.grids;   //Grid   color
const MIDX     = roundInt(WIDTH/2,1);
const MIDY     = roundInt(HEIGHT/2,1);
const TLC      = { x:0     , y:0      };
const TRC      = { x:WIDTH , y:0      };
const BLC      = { x:0     , y:HEIGHT };
const BRC      = { x:WIDTH , y:HEIGHT };
//console.log(svgconf);  //DEBUG

//Make the whole thing run just once on page load
window.addEventListener('load', initializeSVGen);