let x, y;
let w, h; // use it several times in your function 
let numRcts = 10;
let r = 0;
let d = 0;

function setup() {
  createCanvas(windowWidth, windowHeight)

  w = width / numRcts
  h = height / numRcts

  rectMode(CENTER)
  angleMode(DEGREES)
  // frameRate(2)

}



function draw() {

  background(0);

  noFill(10)
  strokeWeight(1)
  stroke(255)

  // for(let i = 1; i < 20; i++){
  //   push()
  //   // translate(random(0, width), random(0, height))
  //   translate(30*i, 0)
  //   rect(0, 0, random(100), random(100))
  //   pop()
  // }

  for(let x = 0; x < numRcts; x++ ){

    for(let y = 0; y < numRcts; y++){

      for(let z = 0; z < numRcts; z++){

        let d = dist (mouseX, mouseY, w * x, h * y)
        d = map(d, 0, 1000, 1, 0)
        d = constrain(d, 0, 1)

        push()
  
        translate( w * x, h * y)

        rotate(r * y / 2)
        // rect(0, 0, y * 3 + w/2, h/2)
        rect(0,0, mouseX, mouseY)

        pop()


      }
      

    }

  }

r++

}


function mousePressed() {
  noLoop()
}