// Digital Momentum
// a newton's cradle where every ball is a decade of digital life (1980s - 2020s)
// click a thumbnail to change the photo on that ball

let eras = [
  { year: '1980s', title: 'Personal computing', files: ['1980s_01.jpg', '1980s_02.jpg', '1980s_03.jpg'] },
  { year: '1990s', title: 'The world wide web', files: ['1990s_01.jpg', '1990s_02.jpg', '1990s_03.jpg'] },
  { year: '2000s', title: 'A connected world', files: ['2000s_01.jpg', '2000s_02.jpg', '2000s_03.jpg'] },
  { year: '2010s', title: 'Life on the feed', files: ['2010s_01.jpg', '2010s_02.jpg', '2010s_03.jpg'] },
  { year: '2020s', title: 'The synthetic age', files: ['2020s_01.jpeg', '2020s_02.jpg', '2020s_03.jpg', '2020s_04.jpg'] },
];

// these looked weird with the normal center crop so I set them by hand
// [x, y, size]
let crops = {
  '2020s_02.jpg': [-150, 10, 800],  // face was too close to the dark edge
  '2020s_03.jpg': [90, 90, 960],
  '2020s_04.jpg': [-35, 75, 600],   // whole sign on the front
};

let r = 43;           // ball radius
let len = 600;        // string length
let topY = 65 - len;  // strings start off screen
let floorY = 130;     // where the shadows go

let camH = 240;
let camZ = 850;
let tilt = Math.atan2(camH, camZ);  // turn the photo toward the camera

let gravity = 4.6;   // tried a bunch of values, this one looks right
let maxAngle = 0.24;

let angle = -maxAngle;
let vel = 0;
let side = -1;       // -1 left balls moving, 1 right balls moving
let howMany = 1;     // 1 or 2 balls

let imgs = [];
let balls = [];      // one sphere model per photo
let picked = [0, 0, 0, 0, 0];
let missing = [];
let playing = true;

let screenPos = [];  // where the balls are on screen, for clicking


function preload() {
  for (let i = 0; i < eras.length; i++) {
    imgs[i] = [];
    for (let file of eras[i].files) {
      imgs[i].push(loadImage('images/' + file, () => {}, () => missing.push(file)));
    }
  }
}

function setup() {
  let stage = select('#stage');
  let cnv = createCanvas(stage.width, stage.height, WEBGL);
  cnv.parent(stage);
  textureMode(NORMAL);
  noStroke();

  // make all the spheres at the start so switching photos doesn't lag
  for (let i = 0; i < eras.length; i++) {
    balls[i] = [];
    for (let j = 0; j < eras[i].files.length; j++) {
      balls[i].push(makeBall(imgs[i][j], eras[i].files[j]));
    }
  }

  if (missing.length > 0) {
    select('#loading').html('Some images failed to load: ' + missing.join(', '));
  } else {
    select('#loading').html('');
  }

  makeArchive();

  select('#play').mouseClicked(togglePlay);
  select('#restart').mouseClicked(() => release(howMany, side));
  select('#single').mouseClicked(() => release(1, -1));
  select('#double').mouseClicked(() => release(2, -1));

  updateStatus();
  describe('Five photo spheres for the 1980s to the 2020s hanging in a row. One or two balls swing back and forth. Click ball 2 or 4 to release two.');
}

// the row of decade cards with thumbnails under the cradle
function makeArchive() {
  for (let i = 0; i < eras.length; i++) {
    let era = eras[i];

    let card = createDiv().addClass('era').parent('archive');
    createElement('h2', era.year).parent(card);
    createP(era.title).parent(card);
    let thumbs = createDiv().addClass('thumbs').parent(card);
    let filename = createDiv(era.files[0]).addClass('filename').parent(card);

    let buttons = [];
    for (let j = 0; j < era.files.length; j++) {
      let file = era.files[j];
      let btn = createButton('').addClass('thumb').parent(thumbs);
      btn.attribute('title', file);
      createImg('images/' + file, era.year + ' image ' + (j + 1)).parent(btn);
      if (j == 0) btn.addClass('active');
      buttons.push(btn);

      btn.mouseClicked(() => {
        picked[i] = j;
        for (let b of buttons) b.removeClass('active');
        btn.addClass('active');
        filename.html(file);
      });
    }
  }
}

function draw() {
  if (playing) {
    let dt = min(deltaTime, 40) / 1000 * select('#speed').value();  // cap it so switching tabs doesn't break it
    swing(dt);
  }

  background(236, 235, 229);

  // fit everything on screen
  let zoom = min(width / 850, height / 520);
  ortho(-width / zoom / 2, width / zoom / 2, -height / zoom / 2, height / zoom / 2, 0, 3000);
  camera(0, -camH, camZ, 0, 0, 0, 0, 1, 0);

  // figure out where each ball is
  let pos = [];
  for (let i = 0; i < 5; i++) {
    let a = 0;
    if (side < 0 && i < howMany) a = angle;
    if (side > 0 && i >= 5 - howMany) a = angle;
    pos.push({ x: pivotX(i) + len * sin(a), y: topY + len * cos(a), a: a });
  }

  noLights();

  // soft shadows: a stack of see-through ellipses,
  // they get bigger and lighter the higher the ball goes
  for (let p of pos) {
    let lift = floorY - p.y - r;
    for (let k = 18; k > 0; k--) {
      push();
      translate(p.x + lift * 0.25, floorY - (19 - k) * 0.025, 12 + lift * 0.15);
      rotateX(HALF_PI);
      fill(35, 49, 42, 4.8 - lift / 115);
      ellipse(0, 0, (r * 2 + lift * 0.65) * k / 18, (r * 1.4 + lift * 0.38) * k / 18);
      pop();
    }
  }

  // strings
  stroke(100, 115, 110);
  strokeWeight(1);
  for (let i = 0; i < 5; i++) {
    let p = pos[i];
    line(pivotX(i), topY, 0, p.x - r * sin(p.a), p.y - r * cos(p.a), 0);
  }

  // balls
  noStroke();
  ambientLight(145, 150, 146);
  directionalLight(245, 239, 222, -0.5, 0.7, -0.7);  // warm
  pointLight(160, 198, 218, 300, -200, 200);        // blue-ish from the right

  for (let i = 0; i < 5; i++) {
    push();
    translate(pos[i].x, pos[i].y, 0);
    rotateX(tilt);
    let img = imgs[i][picked[i]];
    if (img && img.width > 1) {
      texture(img);
    } else {
      ambientMaterial(94, 135, 121);  // green if the image failed
    }
    model(balls[i][picked[i]]);
    pop();
  }

  // save the screen positions for mousePressed
  // (camera is tilted so y gets squished a bit)
  let squish = camZ / Math.hypot(camH, camZ);
  screenPos = [];
  for (let p of pos) {
    screenPos.push({ x: width / 2 + p.x * zoom, y: height / 2 + p.y * squish * zoom });
  }
}

function pivotX(i) {
  return (i - 2) * r * 2;
}

// only one pendulum really moves. when it hits the middle the
// motion jumps to the other side (newton's cradle trick)
function swing(dt) {
  vel -= gravity * sin(angle) * dt;
  angle += vel * dt;

  if (angle * side < 0) {
    side = -side;
    angle = 0;
    // reset speed every hit so it never loses energy
    vel = side * sqrt(2 * gravity * (1 - cos(maxAngle)));
  }
}

function release(n, dir) {
  howMany = n;
  side = dir;
  angle = dir * maxAngle;
  vel = 0;
  playing = true;
  updateStatus();
}

function togglePlay() {
  playing = !playing;
  updateStatus();
}

function updateStatus() {
  select('#play').html(playing ? 'Pause' : 'Play');
  select('#status').html(playing ? '● IDEAL ELASTIC MOTION' : 'Ⅱ MOTION PAUSED');
}

function mousePressed() {
  let zoom = min(width / 850, height / 520);
  for (let i = 0; i < screenPos.length; i++) {
    if (dist(mouseX, mouseY, screenPos[i].x, screenPos[i].y) < r * zoom) {
      // ball 2 or 4 pulls two balls, the others pull one
      let n = (i == 1 || i == 3) ? 2 : 1;
      let dir = i < 2 ? -1 : 1;
      release(n, dir);
      return false;
    }
  }
}

function keyPressed() {
  // space pauses, but not when a button has focus (space already clicks it)
  let tag = document.activeElement.tagName;
  if (key == ' ' && tag != 'BUTTON' && tag != 'INPUT') {
    togglePlay();
    return false;
  }
}

function windowResized() {
  let stage = select('#stage');
  resizeCanvas(stage.width, stage.height);
}


// sphere with the photo wrapped on the front half.
// uv is based on angle instead of a flat projection -> fisheye look
function makeBall(img, name) {
  let w = img.width || 1;
  let h = img.height || 1;

  let s = min(w, h);
  let crop = crops[name] || [(w - s) / 2, (h - s) / 2, s];

  let geo = new p5.Geometry();
  geo.gid = 'ball-' + name;  // p5 needs an id to cache it

  let rows = 32;
  let cols = 48;

  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      let lat = row * PI / rows;
      let lon = col * TWO_PI / cols;

      let x = sin(lat) * cos(lon);
      let y = -cos(lat);
      let z = sin(lat) * sin(lon);

      geo.vertices.push(createVector(x * r, y * r, z * r));
      geo.vertexNormals.push(createVector(x, y, z));

      // abs(z) = back is a mirror of the front, so no seam
      let u = 0.5 + atan2(x, abs(z)) / PI;
      let v = 0.5 + asin(constrain(y, -1, 1)) / PI;
      geo.uvs.push((crop[0] + u * crop[2]) / w, (crop[1] + v * crop[2]) / h);

      if (row < rows && col < cols) {
        let a = row * (cols + 1) + col;
        let b = a + cols + 1;
        geo.faces.push([a, b, a + 1], [a + 1, b, b + 1]);
      }
    }
  }

  return geo;
}
