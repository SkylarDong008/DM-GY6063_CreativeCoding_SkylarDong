let x, y;
let diameter = 200;
let yV = random(0,10), xV = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke()
  // stroke(10, 2, 10)
  y = diameter / 2;
  x = width / 2;

}

function draw() {
  //background(100);

  let r = map(y, diameter/2, height - diameter/2, 0, 255)
  let g = map(x, diameter/2, width - diameter/2, 255, 0)
  let b = map(x, diameter/2, width - diameter/2, 0, 255)

  //map(value, 旧min, 旧max, 新min, 新max)


  fill(r + random(-20, 5),g + random(-10, 10),b) // 
  ellipse(x, y, diameter);

  x += xV;
  y += yV;

  // bottom
  if (y > height - diameter / 2) {
    yV = -yV;
  }

  // top
  if (y < diameter / 2) {
    yV = -yV;
  }

  // right
  if (x > width - diameter / 2) {
    xV = -xV;
  }

  // left
  if (x < diameter / 2) {
    xV = -xV;
  }
}