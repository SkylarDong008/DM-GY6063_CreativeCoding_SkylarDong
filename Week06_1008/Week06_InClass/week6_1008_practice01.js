let img;
let img01;
let frames = [];

let counter = 0;
let xLoc = 0;
let xV = 7.5;
let dir = 1;


// ========================================
// 1. PRELOAD
// ========================================

function preload() {

  console.log("START: preload");

  // Background Image
  // Based on your folder structure

  img01 = loadImage(
    "./nyc_street.jpeg",

    () => {
      console.log("SUCCESS: Background loaded");
    },

    (err) => {
      console.error("ERROR: Background failed", err);
    }
  );


  // 12 Animation Frames

  for (let i = 1; i <= 12; i++) {

    let path = "./walk_cycle_png_/" + i + ".png";

    console.log("Loading frame:", i);

    frames[i - 1] = loadImage(
      path,

      () => {
        console.log("SUCCESS: Frame", i);
      },

      (err) => {
        console.error("ERROR: Frame", i, err);
      }
    );

  }

  console.log("END: preload function called");
}


// ========================================
// 2. SETUP
// ========================================

function setup() {

  console.log("START: setup");

  img = img01;

  // Canvas size
  // Fallback to 800x600 if background fails

  let canvasW = img01 && img01.width > 0
    ? img01.width
    : 800;

  let canvasH = img01 && img01.height > 0
    ? img01.height
    : 600;

  createCanvas(canvasW, canvasH);

  frameRate(12);
  rectMode(CENTER);
  imageMode(CENTER);

  console.log("Canvas Size:", width, height);
  console.log("Total Animation Frames:", frames.length);

  console.log("SUCCESS: setup completed");
}


// ========================================
// 3. DRAW
// ========================================


function draw() {

  // Layer 1: Background
  background(200);
  image(img01, width / 2, height / 2, width, height);

  // Layer 2: Interaction Area
  // Draw BEFORE the sprite
  fill(0);
  noStroke();
  rect(width / 2, height / 2, 100, 200);


  // Keyboard Interaction
  if (keyIsDown(RIGHT_ARROW)) {
    dir = 1;
    xV = 7.5;
    counter++;
    xLoc += xV;
  }

  if (keyIsDown(LEFT_ARROW)) {
    dir = -1;
    xV = -7.5;
    counter++;
    xLoc += xV;
  }


  // Layer 3: Animated Sprite
  let currentFrame = frames[counter % frames.length];

  if (currentFrame && currentFrame.width > 0) {

    push();

    translate(xLoc, height / 2);

    scale(dir, 1);

    image(currentFrame, 0, 0);

    pop();
  }


  // Interaction Detection
  if (dist(xLoc, height / 2, width / 2, height / 2) < 50) {

    console.log("INTERACTION: Trigger area reached");

    // window.location.href = "../../index.html";
  }

}



  // ========================================
  // Previous Movement Logic
  // ========================================

  // if(xLoc > width){
  //   dir = -1
  //   xV = -7.5
  // }
  // else if(xLoc < 0){
  //   dir = 1
  //   xV = 7.5
  // }

  // counter++
  // xLoc+=xV



// // animated sprites
// let img;
// let img01;
// let frames = [];

// let counter = 0;
// let xLoc = 0;
// let xV = 7.5;
// let dir = 1;


// // Load Images
// function preload() {

//   // Background Image
//   img01 = loadImage("/Users/skylardong/Desktop/CreativeCoding/DM-GY6063_CreativeCoding_SkylarDong/Week06_1008/Week06_InClass/jaySt_3pm.png");

//   // Load 12 animation frames
//   for (let i = 1; i <= 12; i++) {
//     frames[i - 1] = loadImage("walk_cycle_png_/" + i + ".png");
//   }

// }


// function setup() {

//   img = img01;

//   createCanvas(img.width, img.height);

//   frameRate(12);
//   rectMode(CENTER);
//   imageMode(CENTER);

//   // print(frames)

// }


// function draw() {

//   background(200);

//   // Background Image
//   image(img01, width / 2, height / 2, width, height);
//   // Walking Animation
//   let currentFrame = frames[counter % frames.length];


//   // Keyboard Interaction
//   if (keyIsDown(RIGHT_ARROW)) {

//     dir = 1;
//     xV = 7.5;

//     counter++;
//     xLoc += xV;

//   }

//   if (keyIsDown(LEFT_ARROW)) {

//     dir = -1;
//     xV = -7.5;

//     counter++;
//     xLoc += xV;

//   }


//   // Draw Animated Sprite
//   push();

//   translate(xLoc, height / 2);

//   scale(dir, 1);

//   image(currentFrame, 0, 0);

//   pop();


//   // Interaction Area
//   fill(0);
//   noStroke();

//   if (dist(xLoc, height / 2, width / 2, height / 2) < 50) {

//     fill(200, 150, 0);

//     // Redirect to index.html
//     window.location.href = "../../index.html";

//   }

//   // Interaction Area Visualization
//   rect(width / 2, height / 2, 100, 200);





  // -----------------
  // Previous Movement Logic

  // if(xLoc > width){
  //   dir = -1
  //   xV = -7.5
  // }
  // else if(xLoc < 0){
  //   dir = 1
  //   xV = 7.5
  // }

  // counter++
  // xLoc+=xV


// //animated sprites
// let img
// let frames = []

// function preload() {
//   img01 = loadImage("jaySt_3pm.png");
//   // img02 = loadImage("RestEnergy_Phase01.png");
// }


// // async function setup(){
// //   img = img01;
// //   createCanvas(img.width, img.height);

// //   frameRate(12)
// //   rectMode(CENTER)
// //   imageMode(CENTER)

// //   // let img = await loadImage("walk_cycle_png_sequence/1.png")

// //   // image(img, width/2,height/2)

// //   for(let i = 1; i<=12; i++){
// //     frames[i-1] = await loadImage("walk_cycle_png_/" + i + ".png")
// //     // print("walk_cycle_png_sequence/" + i + ".png")

// //   }

// //   // print(frames)

// // }

// async function setup(){
//   img = img01;
//   createCanvas(img.width, img.height);
//   frameRate(12)
//   rectMode(CENTER)
//   imageMode(CENTER)

//   for(let i = 1; i <= 12; i++){
//     frames[i-1] = await loadImage("walk_cycle_png_/" + i + ".png")
//   }
// }

// let counter = 0 
// let xLoc = 0
// let xV = 7.5
// let dir = 1

// function draw(){
//   background(200)

//   // Background Image
//   image(img01, width/2, height/2, width, height)

//   let currentFrame = frames[counter % frames.length]
  
//   push()
//   translate(xLoc,height/2)
//   scale(dir,1)

//   if(keyIsDown(RIGHT_ARROW)){
//     dir = 1
//     xV = 7.5
//     counter++
//     xLoc+=xV
//   }
//    if(keyIsDown(LEFT_ARROW)){
//     dir = -1
//     xV = -7.5
//     counter++
//     xLoc+=xV
//   }

//   image(currentFrame,0,0)
//   pop()

//   fill(0)
// noStroke()

//   if(dist(xLoc, height/2, width/2, height/2)<50){
//     fill(200,150,0)

//     window.location.href = "../../index.html"
//   }
//   rect(width/2, height/2, 100,200)

//   // if(xLoc>width){
//   //   dir = -1
//   //   xV = -7.5
//   // }
//   // else if(xLoc<0){
//   //   dir = 1
//   //   xV = 7.5
//   // }

  

//   // counter++
//   // xLoc+=xV
// }
































// // let frames = []

// // async function setup(){
// //   createCanvas(windowWidth, windowHeight);
// //   frameRate(12);
// //   rectMode(CENTER)
// //   imageMode(CENTER)

// //   for (let i = 1; i <= 12; i++) {
// //     frames.push(await loadImage('walk_cycle_png_sequence/' + i + '.png'));
// //   }
// // }

// // let counter = 0
// // let xLoc = 0
// // let xV =7.5
// // let dir = 1


// // function draw(){

// //   background(200)

// //   let currentFrame = frames[counter%frames.length]

// //   push()
// //   translate(xLoc, 0)
// //   scale(dir,1)

// //   if(keyIsDown('a')){
// //     counter++
// //     xLoc -= xV
// //     dir =-1
// //     // print('a')
// //   }
// //   if(keyIsDown('d')){
// //     counter++
// //     dir = 1
// //     xLoc += xV
// //   }
// //    image(currentFrame,0,height/2)
// //   pop()

// //   rect(width-200, height/2, 100,200)


// //   if(dist(xLoc,height/2,width-200, height/2)< 10){
// //     window.location.href= "../../index.html"
// //   }
  
// // }

// // let frames = []

// // async function setup() {

// //   createCanvas(windowHeight, windowWidth, [renderer])
// //   frameRate([fps])
// //   rectMode(CENTER)
// //   imageMode(CENTER)
// //   // let img = await loadImage (“Walk_/1.png”)
// //   for(let i = 1; i <= 12; i++){
// //     frames[i-1] = await loadImage("walk_cycle_png_/" + i + ".png")

// //   }
  
// // }

// // let counter = 0
// // let xV = 7.5 //testing the velocity 

// // let xLoc = 0
// // let yLoc = height/2

// // function draw(){

// //   let currentFrame = frames[counter % frames.length]
// //   translate(xLco, yLoc )


// //   scale(dir,-1)

// //   // if(xLoc > width){
// //   //   scale(dir)

// //   // }

// //   // else (xLoc < 0 ) {

// //   // }


// //   if (keyIsDown(RIGHT_ARROW)){
// //     dir = 1
// //     xV = 7.5
// //     xLoc += xV
// //     counter ++
// //   }

// //   if (keyIsDown(LEFT_ARROW)){
// //     dir = -1
// //     xV = -7.5
// //     xLoc += xV
// //     counter ++
// //   }



// //   // image(currentFrame, width/2, height/2)
// //   pop()
// //   fill(0)
// //   noStroke()

// //   if(dist(xLoc, height/2, width/2, height/2) < 50){

// //     fill(200,50,50)
// //     image(currentFrame, width/2, height/2)
// //   }
// //   window.location.href = "././"
// //   push()
// //   rect(width/2, height/2, 100, 200)

// //   counter++
// //   // xLoc += xV


// // }
