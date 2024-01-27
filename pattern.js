var hydra = new Hydra({
    canvas: document.getElementById("myCanvas"),
    detectAudio: false
  });

// s0.initScreen()
s0.initVideo("assets/wired-3.mp4") 
// s0.initImage()
// s0.initCam()

var sine = () => Math.sin(1 / time * 1) + 1;
let random = () => Math.random();

var kVal = () => Math.sin(time / -1 * -1) * 0.5 + 1
let nkVal = () => -1 * (Math.sin(time / -1 * -1) * 0.5 +1);

var t = () => time;

var speed = 20;

osc(1, 0, 1)
  .add(osc(500, 0, 2).sub(osc(500, 0.02, 5)))
  .add(osc(10).thresh(0.5).rotate(1.6).modulate(osc(10, 1, 0)))
  .modulate(src(s0))
  .invert().thresh(0).invert()
  .mult(src(o1))
.out(o0);

src(s0)
  .thresh(0.09)
.out(o1)

render(o0);

setResolution(1920,1080)

