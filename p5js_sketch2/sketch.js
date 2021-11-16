var ticker = 0;

var strokeColor1; 
var fillColor1;
var fillColor2;

var cellStartX;
var cellStartY;

let red = 250;
let green = 250;
let blue = 250;

var boxSize = 5;


function setup() {
  // createCanvas(400, 400);
  let renderer = createCanvas(400, 400);
  renderer.parent("canvas");

  frameRate(24);

}

function draw() {

  ticker++;
  var time = ticker/0.1;

  cellStartX = 0;
  cellStartY = 0;

   let bgColor  = color(150, 150, 50);
   background(bgColor);
   
   strokeColor1 = color(150, 150, 0, 0);
   fillColor1 = color(50, 50, 50);
   fillColor2 = color(250, 250, 150);

   var redMod = 250;
   var greenMod = 250;
   var blueMod = 150;

   var amp = 250;
   var freq = 1;
   var inc = 0;
   var phase = 0; 
   var vertShift = -250;

   inc+=time/50;

   print(inc);

   drawGrid(0, 0, 100, 100, inc);
   drawGrid(20, 20, 70, 70, -inc*2);
   drawGrid(40, 40, 60, 60, inc);
   drawGrid(60, 60, 50, 50, -inc*2);
   drawGrid(80, 80, 40, 40, inc);
   drawGrid(0, 150, 100, 10, inc-0.5);


  function drawGrid(startX = 0, startY = 0, sizeX = 10, sizeY = 10, pOffset = 0) {
    
    for (i = 0; i <= sizeX; i += 1.19) {
      
      var boxIncX = boxSize * i;
      var sine = sineFunc(amp, inc, phase + pOffset, freq, vertShift);

      fillColor2 = color(red + sine + redMod, green + sine + greenMod, blue + sine + blueMod);
      
      phase++;
      for (j = 0; j <= sizeY; j += 1.19) {

        var boxIncY = boxSize * j;
        cell((cellStartX+startX) + boxIncX, (cellStartY+startY) + boxIncY, boxSize);


      }
    }
  }

  //  print("a = " + a + ", inc = " + inc);

}


function sineFunc(amp, a, phase, freq, vertShift) {
  return (amp * sin(((a) + phase) / (freq)) + vertShift);
}

function cell(x1, y1, s){
  stroke(strokeColor1);
  fill(fillColor2);
  rect(x1, y1, s, s);
}


function mousePressed() {
  noLoop();
}

function mouseReleased() {
  loop();
}



/* 

I can put new sketches within separate divs by using "instance mode". It would involve
 using those mysterious arrow functions. The code is below: 

//
// save this file as sketch.js
// 
var s = function( p ) { // p could be any variable name
  var x = 100; 
  var y = 100;
  p.setup = function() {
    p.createCanvas(400, 200);
  };

  p.draw = function() {
    p.background(0);
    p.fill(255);
    p.rect(x,y,50,50);
  };
};
var myp5 = new p5(s, 'c1');

// Sketch Two
var t = function( p ) { 
  var x = 100.0; 
  var y = 100; 
  var speed = 2.5; 
  p.setup = function() {
    p.createCanvas(400, 200);
  };

  p.draw = function() {
    p.background(100);
    p.fill(1);
    x += speed; 
    if(x > p.width){
      x = 0; 
    }
    p.ellipse(x,y,50,50);

  };
};
var myp5 = new p5(t, 'c2');


//
// the HTML works out as follows: 
//

<html>
<head>
	<meta charset="UTF-8">
	<script language="javascript" type="text/javascript" src="libraries/p5.js"></script>
	<!-- uncomment lines below to include extra p5 libraries -->
	<!-- 	<script language="javascript" src="libraries/p5.dom.js"></script> -->
	<!--<script language="javascript" src="libraries/p5.sound.js"></script>-->
	<script language="javascript" type="text/javascript" src="sketch.js"></script>
	<!-- this line removes any default padding and style. you might only need one of these values set. -->
	<style> body {padding: 0; 
		margin: 0;
	} 
</style>
</head>
<body>
	<div id="c1"></div> <br>
	<div id="c2"></div>
</body>
</html>


// source: http://joemckaystudio.com/multisketches/

*/