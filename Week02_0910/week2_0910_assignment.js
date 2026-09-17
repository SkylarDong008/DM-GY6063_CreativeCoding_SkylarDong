// --- Things I've already done ---

// Step 1. Draw a still vinyl record in canvas
// Details: windowResized(), 

// Step 2. Create a point that can bounce back between the edge of hole 
// and the edge of vinyl record
// Details: dist(), reverse velocity, if calculation

// Step 3. Insert image that fits the vinyl record's size
// Details: preload(), loadImage(), imageMode(CENTER), image()


// --- Things I'm still working on it ---

// Step 4. Divide the vinyl into three bounce zones
// Details: 

// Step 5. Create three moving points with different colors

// Step 6. Leave and record the movement trails

// Step 7. Add audio

// Step 9. Connect three data to three points


let vinylRadius;
let holeRadius;
let pointRadius = 5;
let centerX, centerY;
let pointX, pointY, pointXV, pointYV;
let distancePV;
let albumCharli;
let pageMargin = 60;

function preload() {
  albumCharli = loadImage("CharliXCX_Album.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  vinylRadius = min(windowWidth, windowHeight) * 0.4
  holeRadius = min(windowWidth, windowHeight) * 0.1
  centerX = windowWidth / 2
  centerY = windowHeight / 2
  pointX = centerX + holeRadius + pointRadius
  pointY = centerY
  pointXV = 1
  pointYV = 2
  imageMode(CENTER)
}

function draw() {

  background(203, 54, 240)


  fill(0)
  ellipse(centerX, centerY, vinylRadius * 2, vinylRadius * 2)

  image(albumCharli, centerX, centerY, vinylRadius * 1.96 , vinylRadius * 1.96)

  fill(203, 54, 240)
  stroke(0)
  strokeWeight(4)
  ellipse(centerX, centerY, holeRadius * 2, holeRadius * 2)

  


  noFill()
  stroke(255, 0, 0)
  strokeWeight(1)
  ellipse(centerX, centerY, vinylRadius * 2 * 0.85, vinylRadius * 2 * 0.85)
  ellipse(centerX, centerY, vinylRadius * 2 * 0.7, vinylRadius * 2 * 0.7) 
  ellipse(centerX, centerY, vinylRadius * 2 * 0.55, vinylRadius * 2 * 0.55)  

    
  pointX += pointXV
  pointY += pointYV
  

  distancePV = dist(centerX, centerY, pointX, pointY)

  if(distancePV + pointRadius > vinylRadius){
    pointXV = -pointXV
    pointYV = -pointYV 
  }

  if(distancePV - pointRadius <= holeRadius){
    pointXV = -pointXV
    pointYV = -pointYV 
  }

  noStroke()
  fill(255)
  ellipse(pointX, pointY, pointRadius *2 , pointRadius * 2)

  
}

// https://p5js.org/reference/p5/windowResized/

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
  vinylRadius = min(windowWidth, windowHeight) * 0.4
  holeRadius = min(windowWidth, windowHeight) * 0.1
  centerX = windowWidth / 2
  centerY = windowHeight / 2

  
}