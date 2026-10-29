let particles = [];
let timetravelActive = false; 

// I create the particles once in setup, rather than creating new ones every frame.
function initPortal() {
  for (let i = 0; i < 500; i++) particles.push(new Particle());
  //Play the animation before following a link
  // I find the HTML links marked with data-portal and give each one a click event.
  document.querySelectorAll("[data-portal]").forEach(link => {
    link.addEventListener("click", event => {
      // Normally a link opens the next page immediately. I stop that default action here.
      event.preventDefault();
      // I read the destination from href and pass it into my time travel function.
      activateTimeTravel(link.getAttribute("href"));
    });
  });
}

class Particle {
  constructor() {
    this.x = random(-width, width); // I draw relative to the canvas center later, so negative values can appear on the left 
    this.y = random(-height, height); // this.x and this.y are the original coordinates 
    // assigned randomly when the particle is created
    this.z = random(1, width); // define z as depth in the 2D world
    // this.col = color(random(100, 255), random(100, 255), random(100, 255));
    this.col = color(random(["#00E5FF", "#2979FF", "#9D00FF", "#FF00CC", "#12ff1e"]));
  }

  // show() {
  //   let s = 300 / this.z; // Calculate the particle's screen position
  //   let x = this.x * s;
  //   let y = this.y * s;
  //   let distance = dist(0, 0, x, y);
  //   let maxDistance = dist(0, 0, width / 2, height / 2);
  //   let ratio = constrain(distance / maxDistance, 0, 1); // Normalize the distance to zero through one
  //   this.size = 2 + ratio * ratio * 50; // Stay small initially and grow near the edges 
  //   drawingContext.shadowBlur = 15;
  //   drawingContext.shadowColor = this.col.toString();
  //   fill(this.col);
  //   circle(x, y, this.size);
  //   drawingContext.shadowBlur = 0;
  //   this.z -= 40 * min(deltaTime, 100) / (1000 / 60); //Reduce depth to move particles outward
  //   if (this.z < 1) this.z = width;
  // }

  show() {
    let s = 300 / this.z; // there's actually no depth 
    // in 2D world, so I use s to make the zoomin or zoomout effect, 
    // if z decreases which means the particle is closer to me, 
    // then s increases to create a zoom in effect, vice versa
    let x = this.x * s; // using s as an ratio 
    let y = this.y * s; // Since the drawing origin is at the canvas center, 
    // a larger s moves the position further from the center

    let distance = dist(0, 0, x, y);
    let maxDistance = dist(0, 0, width / 2, height / 2);
    // This is the distance to a corner, not to every edge.
    let ratio = constrain(distance / maxDistance, 0, 1);

    // Make tails longer toward the edges
    let trail = map(ratio, 0, 1, 0.01, 0.5);
    // When trail is 0.5, the tail is halfway between the center and the particle
    let tailX = x * (1 - trail);
    let tailY = y * (1 - trail);

    // This adds a blurred shadow around the line, which looks like a glow.
    // The next line makes the glow match the particle color.
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = this.col.toString();

    // Draw from the inner tail to the outer particle
    stroke(this.col);
    strokeWeight(map(ratio, 0, 1, 0.5, 3));
    line(tailX, tailY, x, y);

    // I turn the blur off after drawing so it does not affect other shapes.
    drawingContext.shadowBlur = 0;

    // move outward and recycle at the camera
    // deltaTime tells me how many milliseconds the previous frame took.
    // I compare it with a frame at 60 fps to adjust movement for different frame rates.
    // I cap it at 100 so a long pause does not cause one huge jump.
    this.z -= 40 * min(deltaTime, 100) / (1000 / 60);
    // I send the particle back to my chosen far depth before z reaches zero or becomes negative.
    if (this.z < 1) this.z = width;
  }}


function activateTimeTravel(target) {
  // If travel has already started, I stop here so another click does not create another timer.
  if (timetravelActive) return;
  timetravelActive = true;

  // Hide the interface and release input focus
  // This adds a CSS class to the page. The matching CSS hides the scene-ui elements.
  // The class name and my timetravelActive variable are separate things.
  document.body.classList.add("portal-active");
  // If the focused element is an HTML element, blur() removes its keyboard focus.
  // It does not make the picture blurry; it lets me leave the input box.
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();

  // I schedule the page change for about 2.5 seconds later.
  // The drawing loop keeps running while the timer waits.
  // target is the HTML filename passed into this function.
  setTimeout(() => {
    window.location.href = target;
  }, 2500);
}

function coverTimeTravel() {
  // If the switch is false, I skip the particle drawing but the rest of the scene can still run.
  if (!timetravelActive) return;

  // I save the drawing settings so the center translation does not affect other drawing after pop().
  push();
  background(0);
  translate(width / 2, height / 2);
  noStroke();
  
  for (let i = 0; i < particles.length; i++) {
  particles[i].show(); }

  pop();
}




