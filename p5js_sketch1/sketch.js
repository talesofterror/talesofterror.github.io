let ticker = 0;
let tickerMod = 20;
let time;



function setup() {
  // createCanvas(400, 400);
  frameRate(24);

  let renderer = createCanvas(400, 400);
  renderer.parent("sketch");
}


function draw() {
  backgroundColor = (25, 25, 25);
  
  background(backgroundColor);

  fillColor = color(0, 255, 136);
  strokeColor1 = color(250, 255, 136);

  ticker++;
  time = ticker/tickerMod;

  backgroundRect();
  function backgroundRect() {
    fill(backgroundColor);
    stroke(strokeColor1);
    strokeWeight(2);
    rect(20, 20, width - 40, height - 40);
  }
  
  clock1();
}


function clock1() {

  let angle = 0;
  const cosine = cos(angle + time);
  const sine = sin(angle + time);

  // print("Cosine =" + cosine);
  // print("Sine =" + sine);

  let amp = 100;
  let cosX = amp * cosine;
  let sinY = amp * sine;

  let backgroundCircRad = amp * 2;

  // let locX = mouseX;
  // let locY = mouseY;
  let locX = width / 2;
  let locY = height / 2;
  let outerCircRad = 50;
  let outerCircCentX = locX + cosX;
  let outerCircCentY = locY + sinY;

  let midDistX = locX + cosX / 2;
  let midDistY = locY + sinY / 2;

  // print("midDistX = " + midDistX);
  // print("midDistY = " + midDistY);


  backgroundCirc();

  morphRect();

  Line();

  centerCirc();

  centerDot();

  outerCirc();

  midCirc();


  function backgroundCirc() {
    stroke(strokeColor1);
    strokeWeight(2);
    fill(backgroundColor);
    circle(locX, locY, backgroundCircRad);
  }

  function midCirc() {
    stroke(strokeColor1);
    strokeWeight(2);
    fill(fillColor);
    circle(midDistX, midDistY, cosX / 6);
  }

  function outerCirc() {
    stroke(strokeColor1);
    strokeWeight(2);
    fill(fillColor);
    circle(outerCircCentX, outerCircCentY, outerCircRad - sinY / 5);
  }

  function centerDot() {
    stroke(strokeColor1);
    strokeWeight(5);
    fill(fillColor);
    point(locX, locY);
  }

  function centerCirc() {
    stroke(strokeColor1);
    strokeWeight(2);
    fill(fillColor);
    circle(locX, locY, cosX / 3);
  }

  function morphRect() {
    stroke(strokeColor1);
    strokeWeight(2);
    fill(backgroundColor);
    rect(locX, locY, cosX, sinY);
  }

  function Line() {
    stroke(strokeColor1);
    strokeWeight(2);
    fill(fillColor);
    line(locX, locY, outerCircCentX, outerCircCentY);
  }
}

