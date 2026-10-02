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

  print(boxes)


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
        // index ++
        // fill(255, 0, 0)
        // fill(boxes[index], 0, 0)
      } 

      else {
        fill(0)
      }


      fill(boxes[index], 0, 0)
      stroke(255)
      rect( x * width / cols, y * height / rows, width / cols, height / rows)

      index ++
    }
  }
}