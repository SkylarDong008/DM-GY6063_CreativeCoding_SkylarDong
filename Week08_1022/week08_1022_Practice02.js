let cam;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();
}

function draw() {
  background(0);

  cam.loadPixels();
  if (cam.pixels.length === 0) return;

  loadPixels();

  // Four-box layout
  let gap = 12;
  let boxW = (width - gap * 3) / 2;
  let boxH = (height - gap * 3) / 2;

  // Mouse interaction
  let mouseR = map(mouseX, 0, width, 0, 255, true);
  let mouseB = map(mouseY, 0, height, 0, 255, true);

  // MouseX controls grain intensity
  let noiseAmount = map(mouseX, 0, width, 0, 65, true);

  // Camera crop: preserve original aspect ratio
  let scaleFactor = max(
    boxW / cam.width,
    boxH / cam.height
  );

  let sourceW = boxW / scaleFactor;
  let sourceH = boxH / scaleFactor;

  let sourceX = (cam.width - sourceW) / 2;
  let sourceY = (cam.height - sourceH) / 2;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

      // Determine which box this pixel belongs to
      let col = floor((x - gap) / (boxW + gap));
      let row = floor((y - gap) / (boxH + gap));

      if (col < 0 || col > 1 || row < 0 || row > 1) {
        continue;
      }

      // Pixel position inside each box
      let localX = x - (gap + col * (boxW + gap));
      let localY = y - (gap + row * (boxH + gap));

      if (
        localX < 0 || localX >= boxW ||
        localY < 0 || localY >= boxH
      ) {
        continue;
      }

      let index = (x + y * width) * 4;

      // Mirror webcam horizontally
      let camX = floor(
        sourceX +
        (1 - localX / boxW) * (sourceW - 1)
      );

      let camY = floor(
        sourceY +
        (localY / boxH) * (sourceH - 1)
      );

      camX = constrain(camX, 0, cam.width - 1);
      camY = constrain(camY, 0, cam.height - 1);

      let camIndex = (camX + camY * cam.width) * 4;

      let camR = cam.pixels[camIndex];
      let camG = cam.pixels[camIndex + 1];
      let camB = cam.pixels[camIndex + 2];

      // Camera brightness and contrast
      let brightness = (camR + camG + camB) / 3;
      let contrast = brightness > 110 ? 1.5 : 0.15;

      let r, g, b;

      let boxID = row * 2 + col;

      // Normalized position inside box
      let u = localX / boxW;
      let v = localY / boxH;

      if (boxID === 0) {

        // BOX 1 — Purple → White
        let gradient = sin(u * PI / 2);

        r = 110 + gradient * 145;
        g = 45 + gradient * 210;
        b = 210 + gradient * 45;

      } else if (boxID === 1) {

        // BOX 2 — Red / Black
        // MouseX controls red intensity
        r = abs(sin(mouseR / 255 * PI / 2) * 255);
        g = 20;
        b = 30;

      } else if (boxID === 2) {

        r = 40;
        g = abs(cos(v * PI / 2) * 255);
        b = mouseB;

      } else {

        let gradient = sin(u * PI / 2);

        r = 255;
        g = 50 + gradient * 150;
        b = 180 - gradient * 150;
      }

      let grain = random(-noiseAmount, noiseAmount);

      r = r * contrast + grain;
      g = g * contrast + grain;
      b = b * contrast + grain;

      pixels[index] = constrain(r, 0, 255);
      pixels[index + 1] = constrain(g, 0, 255);
      pixels[index + 2] = constrain(b, 0, 255);
      pixels[index + 3] = 255;
    }
  }

  updatePixels();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('pics', 'jpg');
  }
}