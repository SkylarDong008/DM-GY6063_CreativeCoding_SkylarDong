let wavesPerCanvas = 8
let amplitude = 50
let offset = 8
let yLocation

function setup() {
  createCanvas(windowWidth, windowHeight)

  // you can only set yLocation after creating the canvas
  yLocation = height / 2
}

function draw() {
  background(200)

  push()
  translate(0, yLocation)

  beginShape()

  for (let i = 0; i < width; i++) {

    let mappedI = map( i, 0, width, 0, wavesPerCanvas * TWO_PI
    )

    let y = sin(mappedI - offset) * amplitude
    let x = i

    vertex(x, y)
  }

  endShape()
  pop()


  offset = frameCount * 0.01 


}