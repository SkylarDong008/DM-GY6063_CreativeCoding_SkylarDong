let r = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)

  //▶️ Same or not?
  angleMode(degrees(radians))
  angleMode(DEGREES)

}

// ✅ why moving faster push() & pop()
// ✅ why not at the same X-level? push() & pop()
// ✅ i don't want refresh my page: windowResized

function draw() {

  background(0);
  // rect(x, y, w, h, [tl], [tr], [br], [bl])
  noFill()
  strokeWeight(2)
  stroke(190, 0, 255)

  translate(width/2 - mouseX, 0)

// 把坐标系的原点 (0, 0) 移到一个新的位置
  push()
  translate(width/2 - 200, height/2)
  rotate(r)
  rect(0, 0, 50)

  line(0,0,0,200)

  translate(0,200)
  rotate(r)
  rect(0, 0, 50)

  line(0,0,0,200)

  translate(0,200)
  rotate(r)
  rect(0, 0, 50)

  line(0,0,0,200)

  translate(0,200)
  rotate(r)
  rect(0, 0, 50)

  line(0,0,0,200)
  translate(0,200)
  rotate(r)
  rect(0, 0, 50)

  line(0,0,0,200)

  translate(0,200)
  rotate(r)
  rect(0, 0, 50)

  pop()
  
  // PUSH
  push()
  translate(width/2, height/2)
  rotate(-r)
  rect(0, 0, 50)

  line(0,0,0,200)

  translate(0,200)
  rotate(-r)
  rect(0, 0, 50)

  line(0,0,0,200)
  translate(0,200)
  rotate(-r)
  rect(0, 0, 50)

  line(0,0,0,200)

  translate(0,200)
  rotate(-r)
  rect(0, 0, 50)

  line(0,0,0,200)

  translate(0,200)
  rotate(-r)
  rect(0, 0, 50)

  pop()

  rect()

  r++


}