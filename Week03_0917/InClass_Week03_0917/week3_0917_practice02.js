
let x = 0;
let ler
let lerpedMouseX = 0;
let lerpedMouseY = 0; // continuosly

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)

  //▶️ Same or not?
  angleMode(degrees(radians))
  angleMode(DEGREES)


}

function draw() {

  background(0);
  // rect(x, y, w, h, [tl], [tr], [br], [bl])
  noFill()
  strokeWeight(2)
  stroke(255)
  rect(0,0,200)


  lerpedMouseX = lerp(lerpedMouse, MouseX, 0.1)
  lerpedMouseY = lerp(lerpedMouse, MouseY, 0.02)

  
  push()
  translate(lerpedMouse,  0)
  pop()

}