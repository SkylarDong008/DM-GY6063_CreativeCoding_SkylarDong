// --- Things I've already done 0910 ---

// Step 1. Draw a still vinyl record in canvas
// Details: windowResized(), 

// Step 2. Create a point that can bounce back between the edge of hole 
// and the edge of vinyl record
// Details: dist(), reverse velocity, if calculation

// Step 3. Insert image that fits the vinyl record's size
// Details: preload(), loadImage(), imageMode(CENTER), image()


// --- Things I'm still working on it 0910 ---
// --- Things I've iterated 0910 ---


// Step 4. Divide the vinyl into three bounce zones
// Details: 
// zoneWidth: equal-width zones
// dynamic radius calculation

// Step 5. Create three moving points with different colors
// Details: 
// declare 3 point positions, 3 velocities, 
// dist()
// if conditions
// reverse velocity
// push() / pop()


// Step 6. Leave and record the movement trails



// Step 7. Add audio

// Step 9. Connect three data to three points


let vinylRadius;
let holeRadius;
let centerX, centerY;

let pointRadius = 1;
let previousPoint1X;
let previousPoint1Y;
let previousSpectrum = [];
let smoothSpike1 = 0;

let previousPoint2X;
let previousPoint2Y;
let smoothSpike2 = 0;

let previousPoint3X;
let previousPoint3Y;
let smoothSpike3 = 0;

let point1Distance = 0;
let point2Distance = 0;
let point3Distance = 0;

// // let distancePV;
// let distancePoint1;
// let distancePoint2;
// let distancePoint3;

let zoneWidth;

let albumCharli;

// let pageMargin = 60;
let songNextLevelCharli;
let bass, mid, high;

let trailLayer;
let albumAngle = 0;
let fft;


let point1BaseDistance = 0;
let point2BaseDistance = 0;
let point3BaseDistance = 0;

let point1Angle = 0;
let point2Angle = 0;
let point3Angle = 0;

let vTextureRadias;
// let bassShift;



function preload() {
  albumCharli = loadImage("CharliXCX_Album.png")
  songNextLevelCharli = loadSound("NextLevelCharli.mp3")
  // image(trailLayer, 0, 0);
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  vinylRadius = min(windowWidth, windowHeight) * 0.4
  holeRadius = min(windowWidth, windowHeight) * 0.1
  centerX = windowWidth / 2
  centerY = windowHeight / 2
  point1X = centerX + holeRadius + pointRadius
  point1Y = centerY
  point1XV = 1
  point1YV = 2

  point2XV = 1
  point2YV = 1

  point3X = centerX + holeRadius + pointRadius
  point3Y = centerY
  point3XV = 1
  point3YV = 2


  imageMode(CENTER)

  zoneWidth = (vinylRadius - holeRadius) / 3
  zone1Radius = holeRadius + zoneWidth;
  zone2Radius = holeRadius + zoneWidth * 2
  zone3Radius = vinylRadius

  trailLayer = createGraphics(windowWidth, windowHeight)
  
  fft = new p5.FFT(); // 
  fft.setInput(songNextLevelCharli);  //

  // point1Distance = (holeRadius + zone1Radius) / 2 
  point1BaseDistance = (holeRadius + zone1Radius) / 2
  point1Distance = point1BaseDistance; // dis pointcenter to vinylcenter
  point1X = centerX + cos(point1Angle) * point1BaseDistance;
  point1Y = centerY + sin(point1Angle) * point1BaseDistance;

  previousPoint1X = point1X;
  previousPoint1Y = point1Y;


  point2BaseDistance = (zone1Radius + zone2Radius) / 2
  point2Distance = point2BaseDistance; // dis pointcenter to vinylcenter
  point2X = centerX + cos(point2Angle) * point2BaseDistance;
  point2Y = centerY + sin(point2Angle) * point2BaseDistance;

  previousPoint2X = point2X;
  previousPoint2Y = point2Y;

  point3BaseDistance = (zone2Radius + zone3Radius) / 2
  point3Distance = point3BaseDistance; // dis pointcenter to vinylcenter
  point3X = centerX + cos(point3Angle) * point3BaseDistance;
  point3Y = centerY + sin(point3Angle) * point3BaseDistance;

  previousPoint3X = point3X;
  previousPoint3Y = point3Y;
}




function draw() {

  background(203, 54, 240)
  fill(0)
  ellipse(centerX, centerY, vinylRadius * 2, vinylRadius * 2)
  // AUDIO ANALYSIS 

  let spectrum = fft.analyze()

      // SPIKE 1 

    let biggestChange1 = 0;

    for (let i = 0; i < spectrum.length; i++) {

      let change1 = spectrum[i] - previousSpectrum[i];

      if (change1 > biggestChange1) {
        biggestChange1 = change1;
      }
    }

    let threshold1 = 20;
    let spikeShift1 = 0;

    if (biggestChange1 > threshold1) {
      spikeShift1 = map(biggestChange1, threshold1, 50, 0, zoneWidth * 0.9);
    }

    spikeShift1 = constrain(spikeShift1, 0, zoneWidth * 0.9);
    smoothSpike1 = lerp(smoothSpike1, spikeShift1, 0.1);


    //  SPIKE 2 
    // Only observe bins 400 - 700

    let biggestChange2 = 0;

    for (let i = 400; i <= 700; i++) {

      let change2 = spectrum[i] - previousSpectrum[i];

      if (change2 > biggestChange2) {
        biggestChange2 = change2;
      }
    }

    let threshold2 = 20;
    let spikeShift2 = -zoneWidth * 0.3;

    if (biggestChange2 > threshold2) {

      let spikePower2 = map(biggestChange2, threshold2, 50, 0, 1);

      spikePower2 = constrain(spikePower2, 0, 1);
      spikePower2 = pow(spikePower2, 1.3);

      spikeShift2 = map(spikePower2, 0, 1, -zoneWidth * 0.3, zoneWidth * 0.8);
    }

    smoothSpike2 = lerp(smoothSpike2, spikeShift2, 0.22);
  

   //  SPIKE 3 
    // Only observe bins 700 - 1200

    let biggestChange3 = 0;

    for (let i = 700; i <= 1200; i++) {
      let change3 = spectrum[i] - previousSpectrum[i];

      if (change3 > biggestChange3) {
        biggestChange3 = change3;
      }
    }

    let threshold3 = 20;
    let spikeShift3 = -zoneWidth * 0.3;

    if (biggestChange3 > threshold3) {
      let spikePower3 = map(biggestChange3, threshold3, 50, 0, 1);
      spikePower3 = constrain(spikePower3, 0, 1);
      spikePower3 = pow(spikePower3, 1.3);
      spikeShift3 = map(spikePower3, 0, 1, -zoneWidth * 0.3, zoneWidth * 0.7);
    }

    smoothSpike3 = lerp(smoothSpike3, spikeShift3, 0.2);

    // save this frame for the next frame
    previousSpectrum = spectrum.slice();


  // MOVEMENT & TRAILS

  if (songNextLevelCharli.isPlaying()) {

    albumAngle += 0.01;

    point1Angle += 0.01;
    point2Angle += 0.01;
    point3Angle += 0.01;


    // POINT 1 

    point1Distance = point1BaseDistance + smoothSpike1;

    point1X = centerX + cos(point1Angle) * point1Distance;
    point1Y = centerY + sin(point1Angle) * point1Distance;

    trailLayer.stroke(255, 0, 180, 30);
    trailLayer.strokeWeight(6);
    trailLayer.line(previousPoint1X, previousPoint1Y, point1X, point1Y);

    trailLayer.stroke(255, 0, 180, 80);
    trailLayer.strokeWeight(2);
    trailLayer.line(previousPoint1X, previousPoint1Y, point1X, point1Y);

    trailLayer.stroke(255);
    trailLayer.strokeWeight(1);
    trailLayer.line(previousPoint1X, previousPoint1Y, point1X, point1Y);

    previousPoint1X = point1X;
    previousPoint1Y = point1Y;


    // POINT 2 

    // point2Distance = point2BaseDistance + smoothSpike2;

    // point2X = centerX + cos(point2Angle) * point2Distance;
    // point2Y = centerY + sin(point2Angle) * point2Distance;

    let completedTurns2 = floor(point2Angle / TWO_PI);
    let driftPerTurn2 = 0.3;
    let maxGrooveDrift2 = zone2Radius - point2BaseDistance;
    let grooveDrift2 = completedTurns2 * driftPerTurn2;

    grooveDrift2 = min(grooveDrift2, maxGrooveDrift2);

    point2Distance = point2BaseDistance + grooveDrift2 + smoothSpike2;
    point2Distance = constrain(point2Distance, zone1Radius, zone2Radius - 4);

    point2X = centerX + cos(point2Angle) * point2Distance;
    point2Y = centerY + sin(point2Angle) * point2Distance;

    trailLayer.stroke(0, 255, 100, 30);
    trailLayer.strokeWeight(6);
    trailLayer.line(previousPoint2X, previousPoint2Y, point2X, point2Y);

    trailLayer.stroke(0, 255, 100, 80);
    trailLayer.strokeWeight(2);
    trailLayer.line(previousPoint2X, previousPoint2Y, point2X, point2Y);

    trailLayer.stroke(255);
    trailLayer.strokeWeight(1);
    trailLayer.line(previousPoint2X, previousPoint2Y, point2X, point2Y);

    previousPoint2X = point2X;
    previousPoint2Y = point2Y;


    let completedTurns3 = floor(point3Angle / TWO_PI);
    let driftPerTurn3 = 0.3;
    let maxGrooveDrift3 = zone3Radius - point3BaseDistance;
    let grooveDrift3 = completedTurns3 * driftPerTurn3;

    grooveDrift3 = min(grooveDrift3, maxGrooveDrift3);

    point3Distance = point3BaseDistance + grooveDrift3 + smoothSpike3;
    point3Distance = constrain(point3Distance, zone2Radius, zone3Radius - 4);

    point3X = centerX + cos(point3Angle) * point3Distance;
    point3Y = centerY + sin(point3Angle) * point3Distance;

    trailLayer.stroke(0, 150, 255, 30);
    trailLayer.strokeWeight(6);
    trailLayer.line(previousPoint3X, previousPoint3Y, point3X, point3Y);

    trailLayer.stroke(0, 150, 255, 80);
    trailLayer.strokeWeight(2);
    trailLayer.line(previousPoint3X, previousPoint3Y, point3X, point3Y);

    trailLayer.stroke(255);
    trailLayer.strokeWeight(1);
    trailLayer.line(previousPoint3X, previousPoint3Y, point3X, point3Y);

    previousPoint3X = point3X;
    previousPoint3Y = point3Y;


  }


  // ALBUM 

  push();
  translate(centerX, centerY);
  rotate(albumAngle);
  image(albumCharli, 0, 0, vinylRadius * 1.96, vinylRadius * 1.96);
  pop();


  // TRAIL LAYER 

  push();
  image(trailLayer, width / 2, height / 2);
  pop();


  // ALBUM HOLE 

  fill(203, 54, 240);
  stroke(0);
  strokeWeight(4);
  ellipse(centerX, centerY, holeRadius * 2, holeRadius * 2);


  // VINYL TEXTURE 

  for (let vTextureRadius = holeRadius; vTextureRadius < vinylRadius; vTextureRadius += 10) {

    noFill();
    stroke(0);
    strokeWeight(1);

    ellipse(centerX, centerY, vTextureRadius * 2, vTextureRadius * 2);
  }

}
  
  // let biggestChange2 = 0;

  // for (let i = 300; i <= 349; i++) {
  //   let change2 = spectrum[i] - previousSpectrum[i];

  //   if (change2 > biggestChange2) {
  //     biggestChange2 = change2;
  //   }
  // }

  // let threshold2 = 20;
  // let spikeShift2 = -zoneWidth * 0.15;

  // if (biggestChange2 > threshold2) {
  // let spikePower2 = map(biggestChange2, threshold2, 50, 0, 1);
  // spikePower2 = constrain(spikePower2, 0, 1);
  // spikePower2 = pow(spikePower2, 1.3);
  // spikeShift2 = map(spikePower2, 0, 1, -zoneWidth * 0.15, zoneWidth * 0.8);
  // }

  // smoothSpike2 = lerp(smoothSpike2, spikeShift2, 0.22);

  // point2Distance = point2BaseDistance + smoothSpike2;

  // point2X = centerX + cos(point2Angle) * point2Distance;
  // point2Y = centerY + sin(point2Angle) * point2Distance;

  // if (songNextLevelCharli.isPlaying()) {
  //   albumAngle += 0.01;

  //   point1Angle += 0.01;
  //   point2Angle += 0.01;
  //   point3Angle += 0.01;

  //   point1Distance = point1BaseDistance + smoothSpike1


  //   point1X = centerX + cos(point1Angle) * point1Distance
  //   point1Y = centerY + sin(point1Angle) * point1Distance

  //   trailLayer.stroke(255, 0, 180, 30);
  //   trailLayer.strokeWeight(6);
  //   trailLayer.line(previousPoint1X, previousPoint1Y, point1X, point1Y);

  //   trailLayer.stroke(255, 0, 180, 80);
  //   trailLayer.strokeWeight(2);
  //   trailLayer.line(previousPoint1X, previousPoint1Y, point1X, point1Y);

  //   trailLayer.stroke(255, 255, 255, 255);
  //   trailLayer.strokeWeight(1);
  //   trailLayer.line(previousPoint1X, previousPoint1Y, point1X, point1Y);
  //   previousPoint1X = point1X;
  //   previousPoint1Y = point1Y;



  //   // point2Distance = point2BaseDistance + smoothSpike2;
  //   let grooveDrift2 = (point2Angle / TWO_PI) * 0.8;
  //   point2Distance = point2BaseDistance + grooveDrift2 + smoothSpike2;
  //   point2X = centerX + cos(point2Angle) * point2Distance
  //   point2Y = centerY + sin(point2Angle) * point2Distance
  //   trailLayer.stroke(0, 255, 100, 30);
  //   trailLayer.strokeWeight(6);
  //   trailLayer.line(previousPoint2X, previousPoint2Y, point2X, point2Y);

  //   trailLayer.stroke(0, 255, 100, 80);
  //   trailLayer.strokeWeight(2);
  //   trailLayer.line(previousPoint2X, previousPoint2Y, point2X, point2Y);

  //   trailLayer.stroke(255, 255, 255, 255);
  //   trailLayer.strokeWeight(1);
  //   trailLayer.line(previousPoint2X, previousPoint2Y, point2X, point2Y);

  //   previousPoint2X = point2X;
  //   previousPoint2Y = point2Y;

  //   // point3Distance = point3BaseDistance + highShift

  //   point3X = centerX + cos(point3Angle) * point3Distance
  //   point3Y = centerY + sin(point3Angle) * point3Distance
  // }

  // push();
  // translate(centerX, centerY);
  // rotate(albumAngle);

  // image( albumCharli, 0, 0, vinylRadius * 1.96, vinylRadius * 1.96);
  // pop();  

  // push()
  // // imageMode(CENTER) 
  // image(trailLayer, width/2, height/2)
  // pop()



  // fill(203, 54, 240)
  // stroke(0)
  // strokeWeight(4)
  // ellipse(centerX, centerY, holeRadius * 2, holeRadius * 2)


  // for ( let vTextureRadius = holeRadius; vTextureRadius < vinylRadius; vTextureRadius += 10) {
  //   noFill()
  //   stroke(0, 0, 0)
  //   strokeWeight(1)

  // ellipse(centerX, centerY, vTextureRadius * 2, vTextureRadius * 2)
  // }


  // if (previousSpectrum.length === spectrum.length) {

  //   let biggestChange = 0;

  //   for (let i = 0; i < spectrum.length; i++) {
  //     let change = spectrum[i] - previousSpectrum[i];

  //     if (change > biggestChange) {
  //       biggestChange = change;
  //     }
  //   }

  //   let threshold = 20;
  //   let spikeShift = 0;

  //   if (biggestChange > threshold) {
  //     spikeShift = map(biggestChange, threshold, 50, 0, zoneWidth * 0.9);
  //   }

  //   spikeShift = constrain(spikeShift, 0, zoneWidth * 0.9);
  //   smoothSpike1 = lerp(smoothSpike1, spikeShift, 0.1);
  // }


  // // smoothSpike2 = lerp(smoothSpike2, spikeShift2, 0.22);


  // previousSpectrum = spectrum.slice();

  // trailLayer.noStroke()
  // trailLayer.fill(0,0,255)
  // trailLayer.ellipse(
  //   point3X,
  //   point3Y,
  //   pointRadius * 2,
  //   pointRadius * 2
  // );



// https://p5js.org/reference/p5/windowResized/

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
  vinylRadius = min(windowWidth, windowHeight) * 0.4
  holeRadius = min(windowWidth, windowHeight) * 0.1
  centerX = windowWidth / 2
  centerY = windowHeight / 2
  
}

function mousePressed() {

  if (songNextLevelCharli.isPlaying()) {
    songNextLevelCharli.pause();
  } else {
    songNextLevelCharli.play();
  }

}

// console.log(
//   "playing:", songNextLevelCharli.isPlaying(),
//   "bass:", bass,
//   "mid:", mid,
//   "high:", high
// );

