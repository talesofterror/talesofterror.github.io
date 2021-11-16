var ticker = 0;

var strokeColor1; 
var fillColor1;
var fillColor2;

var cellStartX;
var cellStartY;

var boxSize = 10;


function setup() {
  // createCanvas(400, 400);
  let renderer1 = createCanvas(50, 300);
  renderer1.parent("sideCanvas1");

  frameRate(24);

}

function draw() {

  ticker++;
  var time = ticker/0.2;

  cellStartX = 0;
  cellStartY = 0;

   let bgColor  = color(50, 250, 250);
   background(bgColor);
   
   strokeColor1 = color(250, 250, 0);
   fillColor1 = color(50, 50, 50);

   var red = 250;
   var green = 250;
   var blue = 250;
   
   var redMod = 250;
   var greenMod = 250;
   var blueMod = 150;

   var amp = 250;
   var freq = 1;
   var a = 0;
   var inc = 0; 
   var phase = 0;
   var vertShift = -250;
   a+=time;

   for (i = 0; i <= width; i+=1.19) {  

      var boxIncX = boxSize * i;
      var sine = amp * sin(((a+phase) + inc)/freq) + vertShift;

      fillColor2 = color(red + sine+redMod, green + sine+greenMod, blue + sine+blueMod);
      inc++;
      for (j = 0; j <= height; j+=1.19) {  
        var boxIncY = boxSize * j;
        cell(cellStartX + boxIncX, cellStartY + boxIncY, boxSize);
      }
   }

  //  print("a = " + a + ", inc = " + inc);

  //  cell(cellStartX + i, cellStartY, boxSize);
  //  cell(cellStartX + boxSize*2, cellStartY, boxSize);
  //  cell(cellStartX, cellStartY + boxSize, boxSize);

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

