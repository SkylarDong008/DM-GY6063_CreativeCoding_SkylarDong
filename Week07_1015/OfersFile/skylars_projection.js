let pMapper;
let quadMap;
let skylarGif;
let skylarBuf;

let gifLoaded = false;


async function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);

  // 1. Create projection mapper
  pMapper = createProjectionMapper(this);
  quadMap = pMapper.createQuadMap(400, 400, 20, 20);

  // 2. Create graphics buffer
  skylarBuf = createGraphics(400, 400);

  // 3. Load GIF
  try {

    skylarGif = await loadImage("skylarBuf.gif");

    gifLoaded = true;

    console.log("GIF loaded successfully!");
    console.log("GIF size:", skylarGif.width, skylarGif.height);

  } catch (error) {

    console.error("GIF failed to load:", error);

  }

  // 4. Load projection mapping
  pMapper.load("maps/map.json");

}


function draw() {

  background(0);

  if (gifLoaded) {

    // Clear previous graphics
    skylarBuf.clear();

    // Draw GIF into graphics buffer
    skylarBuf.image(skylarGif, 0, 0, 400, 400);

    // Display GIF through projection mapping
    quadMap.displayTexture(skylarBuf);

    // DEBUG: Display original GIF separately
    push();

    resetMatrix();

    translate(-width / 2, -height / 2);

    image(skylarGif, 20, 20, 150, 150);

    pop();

  }

}


function keyPressed() {

  if (key === "c") pMapper.toggleCalibration();

  if (key === "s") pMapper.save("map.json");

  if (key === "l") pMapper.load("maps/map.json");

  if (key === "f") fullscreen(!fullscreen());

}


function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}

// let pMapper;
// let quadMap
// // let squaresBuf 
// let skylarBuf


// function preload(){
//     images = loadImage("skylarBuf.gif");
// }


// async function setup() {
//   createCanvas(windowWidth, windowHeight, WEBGL);
//   pMapper = createProjectionMapper(this);

//   quadMap = pMapper.createQuadMap(400, 400, 20, 20);
// //   squaresBuf = createGraphics(400, 400);
// //   squaresBuf.background(200, 200, 0);
    
// //   skylarBuf = loadImage('skylarBuf.gif')
//   skylarBuf = createGraphics(400, 400);
//   skylarBuf.background(200, 200, 0);


//   pMapper.load("maps/map.json");

// }

// function draw() {
//   background(0);

//   squares(skylarBuf);
// //   quadMap.displayTexture(skylarBuf);
//   quadMap.displayTexture(skylarBuf);

// }


// function squares(pg) {
//   skylarBuf = pg.loadImage('skylarBuf.gif')
// }



// function keyPressed() {
//   if (key === "c") pMapper.toggleCalibration();
//   if (key === "s") pMapper.save("map.json");
//   if (key === "l") pMapper.load("maps/map.json");
//   if (key === "f") fullscreen(!fullscreen());
 
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }