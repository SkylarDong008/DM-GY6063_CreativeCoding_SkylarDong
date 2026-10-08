let flower = {
  x: 500,
  y: 500,
  numPetals: 40,
  petalwidth: 40,
  centralDiameter:50

}



function setup(){

  createCanvas(w, h, [renderer])
  background(0)
  angleMode(DEGREES)
  translate(flower.x, flower.y)
  for(let r =0; r < flower.numPetals; r++){
    push()
    rotate
    ellispe(0,0,flower.petalwidth, )

    rotate((360/flower.numPetals * r))
    translate(flower.petallength/2,0)
    ellipse(0,0,flower.petallength,flower.petalwidth)

    pop()


  }
  ellipse(0,0,flower.centralDiameter)
}



function draw(){
  for (let i =0; i<flowers.length; i++){
    flowers[i].move

    flowers[i].display

  }

}


function mouseDragged(){

  // f = new Flower(mouseX, mouseY)
  // f.display()


  flowers.push(new Flower(mosueX, mouseY))

}

class Flower {
  constructor(){
    this.x = random(0, 4)
    this.y = random(0, 4)
    this.numPetals = random 
    this.petalwidth = random
    this.petallength = random

    this.centralDiameter = random

    this.xV = random(-5,5)
    this.yV = random (-10, 10)
    this.rotation = 0
    this.rV = random




  }


  


  display(){

  }


  move(){
    this.x+=this.xV
    this.y+=this.yV
    




  }
}