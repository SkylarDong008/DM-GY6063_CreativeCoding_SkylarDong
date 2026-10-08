let img01;
let img02;
let img;

let girlRightEdge = [];
let boyLeftEdge = [];

let n = 6;
let move1 = 10;
let move2 = 50;

let girlSearchLimit;
let boySearchLimit;

function preload() {
  img01 = loadImage("RestEnergy_silhouette.png");
  img02 = loadImage("RestEnergy_Phase01.png");
}

function setup() {
  img = img01;
  createCanvas(img.width, img.height, SVG);

  img.loadPixels();

  girlSearchLimit = img.width * 0.4;
  boySearchLimit = img.width * 0.4;

  findGirlRightEdge();
  findBoyLeftEdge();

  noLoop();
// calculation: count down the num of girl & boy
// boyLeftEdge.length == girlRightEdge.length
// 
  console.log("Girl line count:", girlRightEdge.length);
  console.log("Boy line count:", boyLeftEdge.length);
}

// function draw() {
//   background(255);

//   image(img, 0, 0);

//   stroke(0);
//   strokeWeight(1);

//   // Offset effect of girl
//   for (let p of girlRightEdge) {

//     let girlX1 = p.x;
//     let girlX2 = girlX1 + move1;
//     let girlX3 = girlX2 + move2;

//     // make connections between points on 2 edges
//     // don't show edge 2
//     line(girlX1, p.y, girlX3, p.y);
//   }

//   // Offset effect of boy
//   // 
//   for (let q of boyLeftEdge) {

//     let boyX1 = q.x;
//     let boyX2 = boyX1 - move1;
//     let boyX3 = boyX2 - move2;

//     // make connections between points on 2 edges
//     // don't show edge 2
//     line(boyX1, q.y, boyX3, q.y);
//   }

function draw() {
  background(255);

  image(img02, 0, 0, width, height);

  stroke(0);
  strokeWeight(1);

  let lineCount = min(girlRightEdge.length, boyLeftEdge.length);

  // 1. Horizontal lines

  for (let i = 0; i < lineCount; i++) {

    let girl = girlRightEdge[i];
    let boy = boyLeftEdge[i];

    // GIRL
    let girlX1 = girl.x;
    let girlX2 = girlX1 + move1;
    let girlX3 = girlX2 + move2;

    // BOY
    let boyX1 = boy.x;
    let boyX2 = boyX1 - move1;
    let boyX3 = boyX2 - move2;

    // Girl horizontal line
    line(
      girlX1,
      girl.y,
      girlX3,
      girl.y
    );

    // Boy horizontal line
    line(
      boyX1,
      boy.y,
      boyX3,
      boy.y
    );
  }

  // 2. Cross connections


  stroke(255,0,0);
  strokeWeight(1);
  for (let i = 0; i < lineCount - 1; i++) {

    let girlCurrent = girlRightEdge[i];
    let girlNext = girlRightEdge[i + 1];

    let boyCurrent = boyLeftEdge[i];
    let boyNext = boyLeftEdge[i + 1];


    // moved Girl edge
    let girlCurrentX3 =
      girlCurrent.x + move1 + move2;

    let girlNextX3 =
      girlNext.x + move1 + move2;


    // moved Boy edge
    let boyCurrentX3 =
      boyCurrent.x - move1 - move2;

    let boyNextX3 =
      boyNext.x - move1 - move2;


    // Girl moved[i] → Boy moved[i+1]
    line(
      girlCurrentX3,
      girlCurrent.y,
      boyNextX3,
      boyNext.y
    );


    // Boy moved[i] → Girl moved[i+1]
    line(
      boyCurrentX3,
      boyCurrent.y,
      girlNextX3,
      girlNext.y
    );
  }
}





// }


// find X of the right edge 
// let n = 5


// function draw() {
//   background(255);

//   // image(img, 0, 0);

//   // stroke(255,0,0);
//   // strokeWeight(1);

//   let lineCount = min(girlRightEdge.length, boyLeftEdge.length);

//   for (let i = 0; i < lineCount; i++) {

//     let girl = girlRightEdge[i];
//     let boy = boyLeftEdge[i];

//     // GIRL
//     let girlX1 = girl.x;
//     let girlX2 = girlX1 + move1;
//     let girlX3 = girlX2 + move2;

//     // BOY
//     let boyX1 = boy.x;
//     let boyX2 = boyX1 - move1;
//     let boyX3 = boyX2 - move2;

//     // Girl horizontal line
//     line(
//       girlX1,
//       girl.y,
//       girlX3,
//       girl.y
//     );

//     // Boy horizontal line
//     line(
//       boyX1,
//       boy.y,
//       boyX3,
//       boy.y
//     );
//   }


//   // =========================
//   // 2. Cross connections
//   // only between moved edges
//   // stroke(255,0,0);
//   // strokeWeight(1);


//   for (let i = 0; i < lineCount - 1; i++) {

//     let girlCurrent = girlRightEdge[i];
//     let girlNext = girlRightEdge[i + 1];

//     let boyCurrent = boyLeftEdge[i];
//     let boyNext = boyLeftEdge[i + 1];


//     // moved Girl edge
//     let girlCurrentX3 =
//       girlCurrent.x + move1 + move2;

//     let girlNextX3 =
//       girlNext.x + move1 + move2;


//     // moved Boy edge
//     let boyCurrentX3 =
//       boyCurrent.x - move1 - move2;

//     let boyNextX3 =
//       boyNext.x - move1 - move2;


//     // Girl moved[i] → Boy moved[i+1]
//     line(
//       girlCurrentX3,
//       girlCurrent.y,
//       boyNextX3,
//       boyNext.y
//     );


//     // Boy moved[i] → Girl moved[i+1]
//     line(
//       boyCurrentX3,
//       boyCurrent.y,
//       girlNextX3,
//       girlNext.y
//     );
//   }
// }



// PHASE 03 - RED LINE
// function draw() {
//   background(255);

//   // image(img, 0, 0);

//   let lineCount = min(girlRightEdge.length, boyLeftEdge.length);

//   // only keep red cross connections
//   stroke(255, 0, 0);
//   strokeWeight(1);

//   for (let i = 0; i < lineCount - 1; i++) {

//     let girlCurrent = girlRightEdge[i];
//     let girlNext = girlRightEdge[i + 1];

//     let boyCurrent = boyLeftEdge[i];
//     let boyNext = boyLeftEdge[i + 1];

//     // moved Girl edge
//     let girlCurrentX3 =
//       girlCurrent.x + move1 + move2;

//     let girlNextX3 =
//       girlNext.x + move1 + move2;

//     // moved Boy edge
//     let boyCurrentX3 =
//       boyCurrent.x - move1 - move2;

//     let boyNextX3 =
//       boyNext.x - move1 - move2;

//     // Girl moved[i] → Boy moved[i+1]
//     line(
//       girlCurrentX3,
//       girlCurrent.y,
//       boyNextX3,
//       boyNext.y
//     );

//     // Boy moved[i] → Girl moved[i+1]
//     line(
//       boyCurrentX3,
//       boyCurrent.y,
//       girlNextX3,
//       girlNext.y
//     );
//   }
// }



function findGirlRightEdge() {

  girlRightEdge = [];
// get X each 5 in Y: {x1,5},{x2,10},{x3,15}
  for (let y = 0; y < img.height; y += n) {

    let rightX = -1; 
    // search from left to right
    // normally rightX starts from 0
    // I set rightX = -1 which means we haven't discovered anything yet
    // find the MAX x in each y , aka the right edge of girl
    for (let x = 0; x < girlSearchLimit; x++) {
      if (isBlackPixel(x, y)) {
        rightX = x;
      }
    }

    if (rightX !== -1) {
      girlRightEdge.push({
        x: rightX,
        y: y
      });
    }
  }

  console.log("Girl right edge points:");
  console.log(girlRightEdge);
}



// function findBoyLeftEdge() {

//   boyLeftEdge = [];

//   // start position of the right-side search area
//   let boySearchStart = img.width - boySearchLimit;

//   for (let y = 0; y < img.height; y += n) {

//     let leftX = -1;

//     // search from right to left
//     for (let x = img.width - 1; x >= boySearchStart; x--) {

//       if (isBlackPixel(x, y)) {
//         leftX = x;
//       }
//     }

//     if (leftX !== -1) {

//       boyLeftEdge.push({
//         x: leftX,
//         y: y
//       });

//     }
//   }

//   console.log("Boy left edge points:");
//   console.log(boyLeftEdge);
// }

function findBoyLeftEdge() {

  boyLeftEdge = [];
  // reset the searching start Y axis 
  let boySearchStart = img.width - boySearchLimit;

  // nX --> lineCountGirl --> lineCountBoy --> nY
  let lineCount = girlRightEdge.length;

  // find Top & Bottom of boy's image
  let boyTopY = -1;
  let boyBottomY = -1;
  for (let y = 0; y < img.height; y++) {
    let hasBoyPixel = false;
    for (let x = img.width - 1; x >= boySearchStart; x--) {
      if (isBlackPixel(x, y)) {
        hasBoyPixel = true;
        break;
      }
    }

    if (hasBoyPixel) {
      if (boyTopY === -1) {
        boyTopY = y;
      }
      boyBottomY = y;
    }
  }


  // calculate boy's line gap based on the girl's line count
  let boyHeight = boyBottomY - boyTopY;
  let boyLineGap = boyHeight / (lineCount - 1);

  console.log("Girl line count:", lineCount);
  console.log("Boy top Y:", boyLineGap);
  console.log("Boy bottom Y:", boyBottomY);
  console.log("Boy nY:", boyLineGap);

  for (let i = 0; i < lineCount; i++) {

    let y = round(boyTopY + i * boyLineGap);

    let leftX = -1;
    for (let x = img.width - 1; x >= boySearchStart; x--) {

      if (isBlackPixel(x, y)) {
        leftX = x;
      }
    }

    if (leftX !== -1) {
      boyLeftEdge.push({
        x: leftX,
        y: y
      });
    }
  }


  console.log("Boy left edge points:");
  console.log(boyLeftEdge);

  console.log("Boy line count:");
  console.log(boyLeftEdge.length);
}



function isBlackPixel(x, y) {

  let index = 4 * (x + y * img.width);

  let r = img.pixels[index];
  let g = img.pixels[index + 1];
  let b = img.pixels[index + 2];
  let a = img.pixels[index + 3];

  // ignore transparent background
  if (a < 50) {
    return false;
  }

  let brightness = (r + g + b) / 3;

  return brightness < 100;
}


function keyPressed() {
  if (key === 's' || key === 'S') {
    save("RestEnergy_lines.svg");
  }
}