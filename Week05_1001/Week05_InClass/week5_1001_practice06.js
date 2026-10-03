let rows = 50
let cols = 50
let boxes = []

let xLoc = []
let yLoc = []
let numSegments = 50
let counter = 0

let layer1
let layer2

let onOff = 0


function setup() {
  createCanvas(windowWidth, windowHeight)

  // initialize boxes
  let index = 0

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      boxes[index] = 0
      index++
    }
  }

  // initialize trail
  for (let i = 0; i < numSegments; i++) {
    xLoc[i] = width / 2
    yLoc[i] = height / 2
  }

  // create layers
  layer1 = createGraphics(width, height)
  layer2 = createGraphics(width, height)
}


function draw() {
  background(0)


  // --------------------------------
  // LAYER 1 — NUMBER GRID
  // --------------------------------

  layer1.background(0)

  let index = 0

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {

      if (
        mouseX > x * (width / cols) &&
        mouseX < (x + 1) * (width / cols) &&
        mouseY > y * (height / rows) &&
        mouseY < (y + 1) * (height / rows)
      ) {
        boxes[index] = 255
      }

      layer1.fill(
        boxes[index],
        random(100),
        random(100)
      )

      layer1.noStroke()

      let n = index

      layer1.text(
        n,
        x * (width / cols),
        y * (height / rows)
      )

      boxes[index] *= 0.99

      index++
    }
  }

  // LAYER 2 MOVING TRAIL

  layer2.background(0)

  xLoc[numSegments - 1] = noise(counter) * width
  yLoc[numSegments - 1] = noise(counter + 1000) * height

  for (let i = 0; i < numSegments - 1; i++) {

    xLoc[i] = xLoc[i + 1]
    yLoc[i] = yLoc[i + 1]

    let diameter = 100 * sin(
      map(i, 0, numSegments - 1, 0, PI)
    )

    let r = diameter
    let g = 200 - diameter
    let b = 255

    layer2.fill(r, g, b)
    layer2.noStroke()

    layer2.ellipse(
      xLoc[i],
      yLoc[i],
      diameter
    )
  }

  counter += 0.005

  // SWITCH LAYER

  if (onOff === 0) {
    image(layer1, 0, 0)
  } else {
    image(layer2, 0, 0)
  }
}


function mousePressed() {
  onOff = (onOff + 1) % 2
}