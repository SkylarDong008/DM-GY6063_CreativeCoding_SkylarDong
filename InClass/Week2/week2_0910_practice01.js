

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  strokeWeight(3)
  fill(100, 0, 0)
  stroke(200, 100, 0)


}

// function draw() {
//     ellipse(mouseX, mouseY, 50, 50)

// }

function mousePressed() {

//   if (mouseX < 50) {
//     // Code to run if the mouse is on the left.
//   }

//   if (mouseY > 50) {
//     // Code to run if the mouse is near the bottom.
//   }

//   background(100)
}


function mouseDragged() {

    line(pmouseX, pmouseY, mouseX, mouseY)

}



function keyPressed(){

}


