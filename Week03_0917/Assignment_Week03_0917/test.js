// Step 1
// Forget about the visualization for now,
// focus on the audio data first

// Step 2
// Get the frequency spectrum of the whole song
// See how the energy changes across different frequencies

// Step 3
// Observe the spectrum by frequency groups
// Find which frequency range has the biggest repeated change

// Step 4
// Lock down the frequency range where drum 1 mainly happens


let song;
let fft;

let previousSpectrum = [];

let groupSize = 50;

let smoothSize = 20;


function preload() {
  song = loadSound("NextLevelCharli.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  fft = new p5.FFT();
  fft.setInput(song);
}


function draw() {
  background(0, 0, 255);

  let spectrum = fft.analyze();

  if (previousSpectrum.length === spectrum.length) {

    let biggestGroupChange = 0;
    let spikeGroupStart = 0;

    for (let start = 0; start < spectrum.length; start += groupSize) {

      let groupChange = 0;

      for (let i = start; i < start + groupSize && i < spectrum.length; i++) {

        let change = spectrum[i] - previousSpectrum[i];

        if (change > 0) {
          groupChange += change;
        }
      }

      if (groupChange > biggestGroupChange) {
        biggestGroupChange = groupChange;
        spikeGroupStart = start;
      }
    }


    if (frameCount % 10 === 0) {
      console.log(
        "range:",
        spikeGroupStart,
        "-",
        spikeGroupStart + groupSize - 1,
        "change:",
        biggestGroupChange
      );
    }


    let threshold = 100;
    let testSize = 20;

    if (biggestGroupChange > threshold) {
      testSize = map(biggestGroupChange, threshold, 500, 20, 200);
    }

    testSize = constrain(testSize, 20, 200);

    smoothSize = lerp(smoothSize, testSize, 0.1);

    fill(255);
    noStroke();
    ellipse(width / 2, height / 2, smoothSize, smoothSize);
  }


  previousSpectrum = spectrum.slice();
}


function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function keyPressed() {
  if (key === 'c') {
    console.clear();
  }
}