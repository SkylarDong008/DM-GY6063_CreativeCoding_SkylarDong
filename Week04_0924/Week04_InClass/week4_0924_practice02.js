// let wavesPerCanvas = 8
// let amplitude = 50
// let offset = 8
// let yLocation

// let speed = 0.01 

let numWaves = 8

function setup() {
  createCanvas(windowWidth, windowHeight)
  noFill()
}

function draw() {
  background(100)

  for (let i = 0; i < numWaves; i++) {

    let yLocation = map(i, 0, numWaves - 1, 0.1 * height, 0.9 * height)

    sinWave(i + 1, 20, yLocation, 0.1)
    sinWave(i % 2, 20, yLocation, -0.1)
  }

  nShape(100, 100, 6, 60)

  noiseWave(10, 100, height / 2, 0.25)

  mousePressed()
}


function sinWave(wavesPerCanvas, amplitude, yLocation, speed) {

  let offset = frameCount * speed

  push()
  translate(0, yLocation)

  beginShape()

  for (let i = 0; i < width; i++) {

    let mappedI = map(i, 0, width, 0, wavesPerCanvas * TWO_PI)
    let y = sin(mappedI - offset) * amplitude
    let x = i

    vertex(x, y)
  }

  endShape()

  pop()
}


function nShape(yLocation, xLocation, numVertices, radius) {

  push()

  translate(xLocation, yLocation)

  beginShape()

  for (let i = 0; i < numVertices; i++) {

    let mappedI = map(i, 0, numVertices, 0, TWO_PI)
    let x = sin(mappedI) * radius
    let y = cos(mappedI) * radius

    vertex(x, y)
  }

  endShape(CLOSE)

  pop()
}


function mousePressed() {

  let v = floor(random(3, 6))

  nShape(mouseY, mouseX, v, 36)
}


function noiseWave(density, amplitude, yLocation, speed) {

  let offset = frameCount * speed

  push()
  translate(0, yLocation)

  beginShape()

  for (let i = 0; i < width; i += density) {

    let noiseValue = noise(i * 0.01, offset)
    let y = map(noiseValue, 0, 1, -amplitude, amplitude)
    let x = i

    vertex(x, y)
  }

  endShape()

  pop()
}




// let numWaves = 8


// function setup() {
//   createCanvas(windowWidth, windowHeight)
//   noFill()
// }

// function draw() {
//   background(130)

//   // sinWave(8, 50, height / 2, 0.05)
//   // sinWave(4, 100, height/4,  0.05)

//   for (let i = 0; i < numWaves; i++){
//     let yLocation = map (i, 0, numWaves -1 , 0.1*height, 0.9*height)

//     // if (i%2) 

//     sinWave(i+1, 20, yLocation, 0.1)
//     sinWave(i%2, 20, yLocation, -0.1)


//   }

//   nShape(100,100,6,60)


//   // ▶️print(wavesPerFunction) 

//   noiseWave(10, 100, height/2, 0.25)

//   // mousePressed()
  

// }

// function sinWave(wavesPerCanvas, amplitude, yLocation, speed) {

//   let offset = frameCount * speed

//   push()
//   translate(0, yLocation)

//   beginShape()

//   for (let i = 0; i < width; i++) {

//     let mappedI = map(i, 0, width, 0, wavesPerCanvas * TWO_PI)
//     let y = sin(mappedI - offset) * amplitude
//     let x = i
//     vertex(x, y)
//   }

//   endShape()

//   pop()
// }



// function nShape(yLocation, xLocation, numVertices, radius){

//   push()

//   translate(xLocation, yLocation)

//   beginShape()
//   for(let i = 0; i < numVertices; i++){

//     let mappedI = map(i, 0, numVertices, 0, TWO_PI)
//     let x = sin(mappedI) * radius
//     let y= cos(mappedI) * radius
//       vertex(x,y)

//   }
//   endShape(CLOSE)
//   pop()

// }


// function mousePressed(fxn){

//   let v = floor(random(3, 20))
//   nShape(mouseX, mouseY, 10, 36)



// }

// function noiseWave(density, amplitude, yLocation, speed){


//   let offset = frameCount * speed 

//   push()
//   translate(0, yLocation)

//   beginShape()

//   for (let i = 0; i < width; i++) {

//     let mappedI = map(i, 0, width, 0, wavesPerCanvas * TWO_PI)
//     let y = sin(mappedI - offset) * amplitude
//     let x = i
//     vertex(x, y)
//   }

//   endShape()

//   pop()



// }