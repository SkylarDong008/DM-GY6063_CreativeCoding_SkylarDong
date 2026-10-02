let rows = 12
let cols = 12
let col = 255
let boxes =[];

function preload() {
  font = loadFont('Tahoma.ttf')
}



function setup() {
  createCanvas(windowWidth, windowHeight)
  let index = 0 


  for(let x=0; x<cols; x++){
    for(let y=0; y<rows; y++){
      index ++

    }
  }
  print(text)
}

function draw() {
  background(0)
  let index = 0


  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {

      if (
        mouseX > x * (width / cols) &&
        mouseX < (x + 1) * (width / cols) &&
        mouseY > y * (height / rows) &&
        mouseY < (y + 1) * (height / rows)
      ) 
      { boxes[index] = 255
      } 

      else {
        fill(0)
      }


      fill(boxes[index], random(100), random(100))
      let n = index 
      text(n, x * width / cols, y * height / rows)
      stroke(255)
      rect( x * width / cols, y * height / rows, width / cols, height / rows)
      index ++
    }
  }
}


let rows = 12
let cols = 12
let boxes = []

function setup() {
  createCanvas(windowWidth, windowHeight)

  textAlign(CENTER, CENTER)
  textSize(16)

  for (let i = 0; i < rows * cols; i++) {
    boxes[i] = floor(random(100))
  }
}

function draw() {
  background(0)

  let index = 0

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {

      let boxWidth = width / cols
      let boxHeight = height / rows

      let boxX = x * boxWidth
      let boxY = y * boxHeight

      if (
        mouseX > boxX &&
        mouseX < boxX + boxWidth &&
        mouseY > boxY &&
        mouseY < boxY + boxHeight
      ) {
        boxes[index] = floor(random(100))
        fill(255, 0, 0)
      } else {
        fill(0)
      }

      stroke(255)
      rect(boxX, boxY, boxWidth, boxHeight)

      fill(255)
      noStroke()

      text(
        boxes[index],
        boxX + boxWidth / 2,
        boxY + boxHeight / 2
      )

      index++
    }
  }
}