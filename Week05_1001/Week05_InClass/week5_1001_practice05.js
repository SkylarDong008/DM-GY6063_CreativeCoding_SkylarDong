let xLoc = []
let yLoc = []
let numSegments = 50
let counter = 0

function setup() {
  createCanvas(windowWidth, windowHeight)

  for (let i = 0; i < numSegments; i++) {
    xLoc[i] = width / 2
    yLoc[i] = height / 2
  }
}

function draw() {
  background(0)

  // xLoc[numSegments -1] = mouseX
  // // noise(counter) * width
  // yLoc[numSegments -1] = mouseY
  // // noise(counter + 1000) * height

  xLoc[0] = mouseX
  yLoc[0] = mouseY
  // noise(counter + 1000) * height

  for (let i = numSegments - 1; i > 0 ; i--) {
    xLoc[i] = xLoc[i - 1]
    yLoc[i] = yLoc[i - 1]

    let diameter = 100 * sin(map(i, 0, numSegments - 1, 0, PI))

    let r = diameter
    let g = 200 - diameter
    let b = 255

    fill(r, g, b)
    noStroke()

    ellipse(xLoc[i], yLoc[i], diameter)
  }

  counter += 0.005
}