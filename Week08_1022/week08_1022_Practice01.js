let mouseR;
let mouseG;
let mouseB;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
}

function draw() {
  background(0)
  loadPixels();

  let px = pixels;

  for (let y = 100; y < 600; y++) {
    for (let x = 100; x < 600; x++) {

      let index = (x + y * width) * 4; //

      let mouseR = map(mouseX, 0, width, 0, 255);
      let mouseB = map(mouseY, 0, height, 0, 255);

    //   let r = (x - 100) / 400 * mouseR;
      let g = abs((y - 100) / 400 * 255)
      let b = mouseB;

    //   let r = x / width * 255;
    //   let g = y / height * 255;
    //   let b = (x+y) / width * 255;

    
    let r = abs(sin ( mouseR / 600 * PI / 2) * 255 + random(0, 100))
    // let g = cos ( mouseY / 600 * PI / 2) * 255

      px[index] = r;       // Red
      px[index + 1] = g;   // Green
      px[index + 2] = b;   // Blue
      px[index + 3] = 255; // Alpha

      index += 4

    }
  }

  updatePixels();


}

