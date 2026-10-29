
///////REFERENCE///////////////////////
let pMapper;
let quadMap;
let squaresBuf; 
//////////////////////////

//Lawrence's
let quadMap2;
let sandFallBuf;

let columns;
let rows;
let grid = [];
let totalSqauares = 0;

//////////////////////////////////////////////////////////////////////
//Yuqi's

let bg;
let quadMap3;
let YuqiBuf;

//////////////////////////////////////////////////////////////////////
//Heesoo's

let aquariumVideo;

let fishX = [];
let fishY = [];
let fishSpeed = [];
let fishSize = [];
let fishDirection = [];
let fishTurn = [];
let numFish = 8;

let quadMap4;
let HeesooBuf;

//////////////////////////////////////////////////////////////////////
//Skylar's

let quadMap5;
let SkylarBuf;

// one ball per decade, 1980s -> 2020s
let eras = [
  ['1980s_01.jpg', '1980s_02.jpg', '1980s_03.jpg'],
  ['1990s_01.jpg', '1990s_02.jpg', '1990s_03.jpg'],
  ['2000s_01.jpg', '2000s_02.jpg', '2000s_03.jpg'],
  ['2010s_01.jpg', '2010s_02.jpg', '2010s_03.jpg'],
  ['2020s_01.jpeg', '2020s_02.jpg', '2020s_03.jpg', '2020s_04.jpg']
];

// [x, y, size] crops for photos that look bad with the normal center crop
let photoCrops = {
  '2020s_02.jpg': [-150, 10, 800],
  '2020s_03.jpg': [90, 90, 960],
  '2020s_04.jpg': [-35, 75, 600]
};

let ballImgs = [];
let ballModels = [];
let pickedImg = [0, 0, 0, 0, 0];
let selectedBall = 0;

let ballR = 55;
let stringLen = 600;
let stringTop = 65 - stringLen;
let tilt = Math.atan2(240, 850); // camera looks down a bit, so tilt the photos up to face it

let swingAngle = -0.24;
let swingVel = 0;
let swingSide = -1; // -1 = left balls moving, 1 = right balls moving
let movingBalls = 1;
let cradlePlaying = true;

let showStrings = true;
let showCue = true;
let cueEnd = 0;


//////////////////////////////////////////////////////////////////////
async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pMapper = createProjectionMapper(this);


  ///////////Yuqi/////////////////////
bg = await loadImage('../images/yuqiBackground.png');
/////////////////////////////////////////////


/////////////////Reference//////////////////
  // quadMap = pMapper.createQuadMap(400, 400, 20, 20);
  // squaresBuf = createGraphics(400, 400);
  // squaresBuf.background(200, 200, 0);


/////////////////Lawrence Sandfall///////////////////////////////////
  quadMap2 = pMapper.createQuadMap(500, 500, 20, 20); //(map width, map height, columns/ rows)
  sandFallBuf = createGraphics(500, 500);
  sandFallBuf.background(0);


  columns = ceil(500 / 10);
    rows = ceil(500 / 10);
  for(let i = 0; i < columns ; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            grid [i][j] = {//each is object with values
                Sandbelow: false,
                color : 255,
                fallState: false
            };
        }
    }
///////////Yuqi//////////////////////

quadMap3 = pMapper.createQuadMap(600,700,20,20);
YuqiBuf = createGraphics(600,700);

///////////Heesoo//////////////////////////////////////////

quadMap4 = pMapper.createQuadMap(1000,700,20,20);
HeesooBuf = createGraphics(1000,700);


  // Video
  aquariumVideo = createVideo('../images/42696-432087106_medium.mp4');
  aquariumVideo.hide();
  aquariumVideo.volume(0);
  aquariumVideo.elt.muted = true;
  aquariumVideo.elt.playsInline = true;
  aquariumVideo.elt.loop = true;
  aquariumVideo.speed(10);
  aquariumVideo.elt.play().catch(() => {
    // A click can start playback if this browser blocks autoplay.
  });

  // Fish
  for (let i = 0; i < numFish; i++) {
    fishX[i] = random(150, HeesooBuf.width - 150);
    fishY[i] = random(100, HeesooBuf.height - 100);
    fishSpeed[i] = random(0.5, 2);
    fishSize[i] = random(0.4, 0.6);
    fishDirection[i] = 1;
    fishTurn[i] = 1;
  }

///////////Skylar//////////////////////////////////////////

quadMap5 = pMapper.createQuadMap(860, 430, 20, 20);
// framebuffer instead of createGraphics: mine is 3D, and a WEBGL graphics can't use camera() / model()
SkylarBuf = createFramebuffer({ width: 860, height: 430 });

  for (let i = 0; i < eras.length; i++) {
    ballImgs[i] = [];
    ballModels[i] = [];
    for (let file of eras[i]) {
      let img = await loadImage('../images/' + file);
      ballImgs[i].push(img);
      ballModels[i].push(photoBall(img, file));
    }
  }

  // Start with separate panels so the last black texture does not hide the others.
  // C still enables calibration; loading a saved map replaces this starter layout.
  const gap = 20;
  const cellW = (width - gap * 3) / 2;
  const cellH = (height - gap * 3) / 2;
  [quadMap2, quadMap3, quadMap4, quadMap5].forEach((surface, i) => {
    const scale = min(cellW / surface.width, cellH / surface.height);
    surface.controlPoints.forEach(point => {
      point.x *= scale;
      point.y *= scale;
    });
    surface.x = -width / 2 + gap + (i % 2) * (cellW + gap);
    surface.y = -height / 2 + gap + floor(i / 2) * (cellH + gap);
    surface.calculateMesh();
  });
  // pMapper.load("maps/map.json");
}

function draw() {
  background(0);

//////////Lawrence Sandfall////////////////////////////
  sandFall(sandFallBuf);
  quadMap2.displayTexture(sandFallBuf);



  /////////Yuqi/////////////////////////
  yuqi(YuqiBuf);
  quadMap3.displayTexture(YuqiBuf);

  ////Heesoo////////////////////////
    heesoo(HeesooBuf);
    quadMap4.displayTexture(HeesooBuf);

  ////Skylar////////////////////////
  skylar(SkylarBuf);
  quadMap5.displayTexture(SkylarBuf);

}


////////LAWRENCE//////////////////////////////////////////////////////////////
function sandFall(pg) {
  pg.background(0);
    totalSqauares = 0;
    //spawn logic
  if (random(0,100)<100) {//spawn at the top
        let i = floor(random(columns));
        if ( grid[i][0].fallState == false) {
            grid[i][0].fallState = true; //first row will spawn sand
            grid[i][0].color = random(100, 255) //arbitrary/placeholder
        }

    }

    for (let i = 0; i < columns; i++) { //
        for (let j = rows - 1; j >= 0; j--) { // check bottom to top for sand below staate
            let gridPosition = grid[i][j];
            if (j == rows - 1) {
                gridPosition.Sandbelow = true;
            } else {
                gridPosition.Sandbelow = grid[i][j + 1].fallState;
            }
        ///check if sand can fall then make it fall
        if (gridPosition.fallState == true && gridPosition.Sandbelow == false) {
        grid[i][j + 1].fallState = true;
        grid[i][j + 1].color = gridPosition.color;
        gridPosition.fallState = false;
            }
        }
    }
    //draw the sand
    for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].fallState == true) {
        pg.fill(grid[i][j].color);
        pg.rect(10*i, 10*j, 10, 10);
        totalSqauares++;
      }
    }
  }

  ///reset when full
  if (totalSqauares == columns * rows) {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].fallState = false;
        grid[i][j].Sandbelow = false;
        grid[i][j].color = 255;
      }
    }
  }
}




/////////////////yuqi////////////////////////////////////////////////////
function yuqi(pg){
pg.image(bg, 0, 0, 600, 700);

    for (let i = 0; i < 20; i++){
        let d = 220 - (i * 10);

        let wave = frameCount *0.1;
        let change = sin(wave - (20 - 1 - i)* 0.1);
        change = max (0, change)
        let weight = 1 + 2 * change;

        pg.fill(0, 0, 0, 20);
        pg.stroke(0, 0, 0, 80);
        pg.strokeWeight(weight);

        pg.circle(270, 250, d)
   }

   for (let j = 0; j < 15; j++){
        let d2 = 150 - (j * 10);

        let wave = frameCount * 0.2;
        let change = sin(wave - (20 - 1 - j)* 0.1);
        change = max (0, change)
        let weight = 1 + 2 * change;


        pg.fill(0, 0, 0, 20);
        pg.stroke(0, 0, 0, 80);
        pg.strokeWeight(weight);

        pg.circle(350, 550, d2)
   }

   let d6 = 70;
   let d7 = 120;
   let r1 = d7 / 2 - d6 / 2;
   let angle1 = frameCount * 0.01;
   let x1 = 375 + r1* cos(angle1); 
   let y1 = 360 + r1* sin(angle1); 


   pg.noFill()
   pg.strokeWeight(1)
   let d3 = 380
   pg.circle(250, 240, d3)

   pg.strokeWeight(1)
   let d4 = 320
   pg.circle(275, 250, d4)

   pg.strokeWeight(2)
   let d5 = 80
   pg.circle(180, 180, d5)

   pg.strokeWeight(2)
   pg.circle(x1, y1, d6)

   pg.strokeWeight(2)
   pg.circle(375, 360, d7)

   pg.strokeWeight(1)
   let d8 = 230
   pg.circle(375, 450, d8)

   pg.strokeWeight(0.7)
   let d9 = 800
   pg.circle(-50, 400, d9)
   


   let linecount = 12;
   let r = 170;
   let centerx = 30;
   let centery = 650;

   for (let p = 0; p < linecount; p++){
    let angle = map(p, 0, linecount-1, -HALF_PI, 0);

    let x = centerx + r * cos(angle);
    let y = centery + r * sin(angle);

    pg.push()
    pg.translate(x, y);
    pg.rotate(angle); 
    pg.line(-15, 0, 15, 0);
    
    pg.pop()
    pg.stroke(0, 80);
    pg.strokeWeight(1.5);
    

   }

}
/////////////Heesoo/////////////////////////////////////



function heesoo(pg){
  pg.background(0, 0, 6);

  drawScreen(pg);

  for (let i = 0; i < numFish; i++) {

    fishTurn[i] = lerp(
      fishTurn[i],
      fishDirection[i],
      0.08
    );

    fishX[i] += fishSpeed[i] * fishTurn[i];

    if (fishX[i] > pg.width - 150) {
      fishDirection[i] = -1;
    }

    if (fishX[i] < 150) {
      fishDirection[i] = 1;
    }

    let swimY = fishY[i] +
      sin(frameCount * 0.03 + i) * 10;

    pg.push();

    pg.translate(fishX[i], swimY);
    pg.scale(fishTurn[i], 1);

    drawFish(pg, 0, 0, fishSize[i]);

    pg.pop();
  }


}




function drawScreen(pg) {
  pg.push();

  pg.drawingContext.filter = 'blur(10px)';
  pg.noStroke();

  // Blue screen background
  pg.fill(3, 0, 209);
  pg.rect(50, 150, 900, 400);

  // White window bar
  pg.fill(245);
  pg.rect(50, 150, 900, 50);

  // Red button
  pg.fill(255, 80, 75);
  pg.circle(80, 175, 16);

  // Yellow button
  pg.fill(255, 190, 45);
  pg.circle(106, 175, 16);

  // Green button
  pg.fill(60, 200, 95);
  pg.circle(132, 175, 16);

  pg.tint(255, 115);
    pg.image(aquariumVideo, 50, 150, 900, 400);
    pg.noTint();

  pg.drawingContext.filter = 'none';

  pg.pop();
}


function drawFish(pg, x, y, s) {
  pg.push();

  pg.translate(x, y);
  pg.scale(s);
  pg.translate(-250, -250);

  // Argami hair
  pg.fill(190, 5, 45);
  pg.noStroke();
  pg.quad(190, 160, 110, 229, 180, 280, 240, 240);

  // Head
  pg.fill(255, 20, 56);
  pg.stroke(117, 1, 252);
  pg.strokeWeight(3);
  pg.ellipse(250, 250, 150, 80);

  // Body
  pg.noStroke();
  pg.fill(210, 19, 230);
  pg.ellipse(196, 260, 130, 120);

  pg.fill(255, 20, 56);
  pg.ellipse(196, 266, 130, 120);

  // Tail
  pg.fill(255, 20, 56);
  pg.triangle(30, 350, 170, 280, 80, 260);

  pg.stroke(196, 20, 120);
  pg.triangle(30, 220, 90, 280, 180, 260);

  // Argami hand
  pg.fill(242, 99, 80);
  pg.stroke(255, 30, 60);
  pg.triangle(190, 280, 260, 280, 150, 320);

  // Eye outside
  pg.fill(227, 146, 80);
  pg.stroke(255, 80, 51);
  pg.strokeWeight(1);
  pg.ellipse(290, 250, 30, 30);

  // Eye
  pg.fill(0);
  pg.stroke(233, 207, 151);
  pg.strokeWeight(1);
  pg.ellipse(290, 250, 20, 20);

  pg.pop();
}

/////////////Skylar/////////////////////////////////////

function skylar(fb) {
  if (cradlePlaying) swingStep(min(deltaTime, 40) / 1000 * 0.85);

  // everything between begin() and end() draws into the framebuffer, not the screen.
  // push/pop so my lights and textureMode don't leak into the other quad maps
  push();
  fb.begin();
  clear(); // Transparent background: only the cradle is composited onto the map.
  textureMode(NORMAL);
  ortho(-fb.width / 2, fb.width / 2, -fb.height / 2, fb.height / 2, 0, 3000);
  camera(0, -320, 850, 0, -80, 0, 0, 1, 0); // camera + target both moved up 80, so the balls sit near the bottom

  let pos = [];
  for (let i = 0; i < 5; i++) {
    let a = 0;
    if (swingSide < 0 && i < movingBalls) a = swingAngle;
    if (swingSide > 0 && i >= 5 - movingBalls) a = swingAngle;
    let px = (i - 2) * ballR * 2;
    pos.push({ px: px, x: px + stringLen * sin(a), y: stringTop + stringLen * cos(a), a: a });
  }

  // strings
  noLights();
  for (let i = 0; i < 5; i++) {
    let p = pos[i];

    // selected ball glows for 1 second, 1 -> 0
    let cue = 0;
    if (showCue && i === selectedBall) cue = max(0, (cueEnd - millis()) / 1000);

    if (showStrings) {
      stroke(105 + 150 * cue);
      strokeWeight(1 + cue);
      line(p.px, stringTop, 0, p.x - ballR * sin(p.a), p.y - ballR * cos(p.a), 0);
    } else if (cue > 0) {
      push();
      translate(p.x, p.y, 0);
      rotateX(tilt);
      noFill();
      stroke(180, 230, 215, 255 * cue);
      strokeWeight(1);
      circle(0, 0, ballR * 2 + 8);
      pop();
    }
  }

  // balls
  noStroke();
  ambientLight(145, 150, 146);
  directionalLight(245, 239, 222, -0.5, 0.7, -0.7);
  pointLight(160, 198, 218, 300, -200, 200);

  for (let i = 0; i < 5; i++) {
    push();
    translate(pos[i].x, pos[i].y, 0);
    rotateX(tilt);
    texture(ballImgs[i][pickedImg[i]]);
    model(ballModels[i][pickedImg[i]]);
    pop();
  }

  fb.end();
  pop();
}

// only one pendulum is simulated. when it passes the middle (= the hit),
// the motion moves to the other side with the same speed, so no energy is lost
function swingStep(dt) {
  swingVel -= 4.6 * sin(swingAngle) * dt;
  swingAngle += swingVel * dt;

  if (swingAngle * swingSide < 0) {
    swingSide = -swingSide;
    swingAngle = 0;
    swingVel = swingSide * sqrt(2 * 4.6 * (1 - cos(0.24)));
  }
}

function releaseBalls(n) {
  movingBalls = n;
  swingSide = -1;
  swingAngle = -0.24;
  swingVel = 0;
  cradlePlaying = true;
}

// sphere with the photo wrapped on the front half.
// uv comes from the angle instead of a flat projection, which gives the fisheye look
function photoBall(img, file) {
  let w = img.width;
  let h = img.height;
  let s = min(w, h);
  let crop = photoCrops[file] || [(w - s) / 2, (h - s) / 2, s];

  let geo = new p5.Geometry();
  geo.gid = 'ball-' + file; // p5 caches the model by this id

  for (let row = 0; row <= 32; row++) {
    for (let col = 0; col <= 48; col++) {
      let lat = row * PI / 32;
      let lon = col * TWO_PI / 48;

      let x = sin(lat) * cos(lon);
      let y = -cos(lat);
      let z = sin(lat) * sin(lon);

      geo.vertices.push(createVector(x * ballR, y * ballR, z * ballR));
      geo.vertexNormals.push(createVector(x, y, z));

      // abs(z): the back is a mirror of the front, so there is no seam
      let u = 0.5 + atan2(x, abs(z)) / PI;
      let v = 0.5 + asin(constrain(y, -1, 1)) / PI;
      geo.uvs.push((crop[0] + u * crop[2]) / w, (crop[1] + v * crop[2]) / h);

      if (row < 32 && col < 48) {
        let a = row * 49 + col;
        geo.faces.push([a, a + 49, a + 1], [a + 1, a + 49, a + 50]);
      }
    }
  }

  return geo;
}


function mousePressed() {
  if (aquariumVideo && aquariumVideo.elt.paused) {
    aquariumVideo.elt.play().catch(error => console.warn('Video playback:', error));
  }
}


////////////////////////////////////////////////////////
function keyPressed() {
  if (key === "c") pMapper.toggleCalibration();
  if (key === "s") pMapper.save("map.json");
  if (key === "l") pMapper.load("maps/map.json");
  if (key === "f") fullscreen(!fullscreen());

  //Skylar: arrows pick ball / photo, 1 2 release, space pause, r again, t strings, g glow
  if (key === "ArrowLeft") {
    selectedBall = (selectedBall + 4) % 5;
    cueEnd = millis() + 1000;
  }
  if (key === "ArrowRight") {
    selectedBall = (selectedBall + 1) % 5;
    cueEnd = millis() + 1000;
  }
  if (key === "ArrowUp" || key === "ArrowDown") {
    let total = eras[selectedBall].length;
    let step = key === "ArrowDown" ? 1 : total - 1;
    pickedImg[selectedBall] = (pickedImg[selectedBall] + step) % total;
    cueEnd = millis() + 1000;
  }
  if (key === "1") releaseBalls(1);
  if (key === "2") releaseBalls(2);
  if (key === "r") releaseBalls(movingBalls);
  if (key === " ") cradlePlaying = !cradlePlaying;
  if (key === "t") showStrings = !showStrings;
  if (key === "g") {
    showCue = !showCue;
    cueEnd = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}