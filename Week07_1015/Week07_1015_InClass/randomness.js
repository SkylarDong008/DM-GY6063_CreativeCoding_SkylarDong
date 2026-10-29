let randomnessBG;
let frames = [];
let counter = 0;
let xLoc = 100;
let xV = 0;
let dir = 1;

let portalX;
let portalY;
let portalRadius = 75;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  imageMode(CENTER);
  rectMode(CENTER);

  initPortal(); 
  portalX = width * 0.85;
  portalY = height / 2;

  // Load the animated background and twelve walking frames together, preserving order
  const assets = await Promise.all([loadImage("randomness.gif"), ...Array.from({length: 12}, (_, i) => loadImage("walk_cycle_png_/" + (i + 1) + ".png"))]);
  randomnessBG = assets[0];
  frames = assets.slice(1);
}

function draw() {
  background(20);
  if (randomnessBG && randomnessBG.width > 0) {
    image(randomnessBG, width / 2, height / 2, width, height);
  }
  drawPortalEntrance();
  drawSkeleton();
  // ime travel layer is always over the previous layers
  coverTimeTravel();
}

function drawPortalEntrance() {
  push();

  // noFill();
  // stroke(255);
  // strokeWeight(3);
  noStroke();
  fill(255);
  stroke("#FF00CC");
  strokeWeight(3);
  let pulse = sin(frameCount * 0.1) * 20;
  circle(portalX, portalY, portalRadius * 2 + pulse);

  noStroke();
  fill(255);
  textFont("Tahoma.ttf");
  textSize(13);
  textAlign(CENTER);

  text("PORTAL", portalX, portalY - portalRadius - 20);

  pop();
}

function drawSkeleton() {
  if (timetravelActive) return;

  let moving = false;
  if (keyIsDown("ArrowRight")) {
    dir = 1;
    xV = 10;
    xLoc += xV * min(deltaTime, 100) / (1000 / 12);
    moving = true;
  }
  if (keyIsDown("ArrowLeft")) {
    dir = -1;
    xV = -40;
    xLoc += xV * min(deltaTime, 100) / (1000 / 12);
    moving = true;
  }

  xLoc = constrain(xLoc, 0, width);

  if (moving) counter += min(deltaTime, 100) * 12 / 1000;

  let currentFrame = frames[floor(counter) % frames.length];

  if (currentFrame && currentFrame.width > 0) {
    push();
    translate(xLoc, height / 2);
    scale(dir, 1);
    image(currentFrame, 0, 0, currentFrame.width * 0.3, currentFrame.height * 0.3); // Shrink GIF to 30%
    pop();
  }


// Return automatically when the character's right edge reaches the portal center
if (currentFrame && currentFrame.width > 0) {
  let characterWidth = currentFrame.width * 0.3;
  let rightEdge = xLoc + characterWidth / 2;

  if (rightEdge >= portalX && !timetravelActive) {
    activateTimeTravel("school.html");
  }
}

}



function keyPressed() {
  if (key === "ArrowLeft" || key === "ArrowRight") return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  portalX = width * 0.85;
  portalY = height / 2;
}
