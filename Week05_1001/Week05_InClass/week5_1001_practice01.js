let students = ['Skylar', 'Kristi', 'Skyla', 'Tuba', 'Yuxian', 'Ofer', 'Lawrence']

let student = ''
let font
let isRolling = true

function preload() {
  font = loadFont('Tahoma.ttf')
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  textFont(font)
  textSize(24)
  textAlign(CENTER, CENTER)
}

function draw() {
  background(0)
  fill(255)
  rollingList()
  text(student, width / 2, height / 2)
}

function rollingList() {
  if (isRolling && students.length > 0) {
    let i = floor(random(students.length))
    student = students[i]
  }
}

function mousePressed() {
  if (isRolling) {
    isRolling = false

    let i = students.indexOf(student)
    students.splice(i, 1)
    print(student)
  } 
  
  else {
    isRolling = true
  }
}