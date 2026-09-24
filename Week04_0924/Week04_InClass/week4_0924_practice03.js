// https://github.com/golanlevin/p5.plotSvg (v.0.1.x)
// A Plotter-Oriented SVG Exporter for p5.js
// Golan Levin, November 2024
//
// This sketch emonstrates how to use the p5.plotSvg library 
// to export SVG files. Press 's' to export an SVG. 
// Requires: https://cdn.jsdelivr.net/npm/p5.plotsvg@latest/lib/p5.plotSvg.js
// See: https://github.com/golanlevin/p5.plotSvg

// This line of code disables the p5.js "Friendly Error System" (FES), 
// in order to prevent several distracting warnings:


p5.disableFriendlyErrors = true; 

let bDoExportSvg = false; 

function setup() {
  // Postcard size: 6"x4" at 96 dpi
  createCanvas(576, 384);
}

function keyPressed(){
  if (key == 's'){
    // Initiate SVG exporting
    bDoExportSvg = true; 
  }
}

function draw(){
  background(245); 
  strokeWeight(1);
  stroke(0);
  noFill();
  
  if (bDoExportSvg){
    // Begin exporting, if requested
    beginRecordSvg(this, "plotSvg_hello_animating.svg");
  }

  
  // Draw your artwork here.
  push(); 
  translate(width/2, height/2); 
  beginShape(); 
  for (let i=0; i<=400; i++){
    let val = noise(i/100 + millis()/1000) - 0.5; 
    vertex(i-200, 200*val); 
  }
  endShape(); 
  rectMode(CENTER); 
  rect(0,0, 400,300); 
  pop(); 
  

  if (bDoExportSvg){
    // End exporting, if doing so
    endRecordSvg();
    bDoExportSvg = false;
  }
}