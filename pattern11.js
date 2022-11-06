

var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });
  

var sine = () => Math.sin(time * 2 * 0.3) + 0.2
var kVal = () => Math.sin(time / 0.4 * 1) * 50 + 5;

var t = () => time;
var swaySpeed = 1;
var swayIntensity = 5;
var stripeSizeX = 20; //inverse
var stripeSizeY = 1; //inverse
var wiggleSync = 500;
var colorShift = 4;
var colorShift2 = colorShift + 0.824;
var modColorShift = colorShift + 0;
// var xShift = 3;

s0.initVideo("assets/Monk_seamless.mp4")

let red = () => src(o0).color(1,0,0)
let green = () => src(o0).color(0,1,0)
let blue = () => src(o0).color(0,0,1)

var sine2 = (time) => Math.sin(time/2 * 0.3)

src(s0).out(o0)

src(s0).thresh(0.05).out(o1)

src(o0).thresh(0.49).mult(red()).add(blue()).diff(src(o1), 0.2).invert().out(o2)

osc(5, 0.2, 1.8)
  .rotate(1.6)
  .color(1, 0, 1)
  // .add(shape(6, 0.5).sub(src(o1)))
  .posterize(20, 1)
  .modulate(
      src(o2), 0.9)
  .diff(o0, 0.5)
  .diff(src(s0)
    .thresh(() => 0.2 * (Math.sin(time / 1) + 0.1)))
  // .sub(green().luma(() => Math.sin(time / 15) + 1), 0.5)
.out(o3)

render(o3);





