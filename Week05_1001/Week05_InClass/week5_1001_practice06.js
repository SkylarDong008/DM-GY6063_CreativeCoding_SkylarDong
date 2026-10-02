// let xLoc = []
// let yLoc = []
// let numSegments = 50
// let counter = 0

// function setup() {
//   createCanvas(windowWidth, windowHeight)

//   for (let i = 0; i < numSegments; i++) {
//     xLoc[i] = width / 2
//     yLoc[i] = height / 2
//   }

//   layer1 = createGraphics(width, height)
// }

// function draw() {
//   background(0)

//   xLoc[numSegments - 1] = noise(counter) * width
//   yLoc[numSegments - 1] = noise(counter + 1000) * height

//   for (let i = 0; i < numSegments - 1; i++) {
//     xLoc[i] = xLoc[i + 1]
//     yLoc[i] = yLoc[i + 1]

//     let diameter = 100 * sin(map(i, 0, numSegments - 1, 0, PI))

//     let r = diameter
//     let g = 200 - diameter
//     let b = 255

//     fill(r, g, b)
//     noStroke()

//     ellipse(xLoc[i], yLoc[i], diameter)
//   }

//   counter += 0.005

//   if(onOff = 0){
//     image(layer1,0,0,width,height)

//   }
//   else{
//     image(layer2,0,0,width,height)
//   }

// }





// let onOff = 0 
// let num =0
// function mousePressed(){

//   onOff = onOff % num
//   num ++

// }




let rows = 12
let cols = 12
let boxes = []

let xLoc = []
let yLoc = []
let numSegments = 50
let counter = 0

let layer1
let layer2


function setup() {
  createCanvas(windowWidth, windowHeight)

  // initialize boxes
  for (let i = 0; i < rows * cols; i++) {
    boxes[i] = 0
  }

  // initialize trail
  for (let i = 0; i < numSegments; i++) {
    xLoc[i] = width / 2
    yLoc[i] = height / 2
  }

  // create bottom layer
  layer1 = createGraphics(width, height)
}


function draw() {
  background(0)

  // LAYER 1 — GRID

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

      layer1.fill(boxes[index], 0, 0)
      layer1.stroke(255)

      layer1.rect(
        x * width / cols,
        y * height / rows,
        width / cols,
        height / rows
      )

      index++
    }
  }

  // put layer1 onto canvas
  image(layer1, 0, 0)

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

    fill(r, g, b)
    noStroke()

    ellipse(
      xLoc[i],
      yLoc[i],
      diameter
    )
  }

  counter += 0.005
  let onOff = 0
  let num = 0


  if(onOff = 0){
    image(layer1,0,0,width,height)
  }
  else{
    image(layer2,0,0,width,height)
  }



}