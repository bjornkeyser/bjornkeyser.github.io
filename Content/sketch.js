// breathing cellular automata project
/*
The code is based on this principle for collective synchronisation; 
  each cell maintains a clock, and breaths in until 6, and breathes out afterwards.
  each cell can see the cells around it within a certain distance (=visionDiam)
  if a cell in proximity is at 6 oclock and I am in the process of breathing in, hurry up and breath in faster
  or in computer terms; 
  
  if (neighbor.clock == 6), AND (my.clock in between 12 and 6): 
    my.clock += nudge amount
    
  that's all for now! this already synchronizes the cells consistently, if all cells have the same clockspeed, otherwise waves can appear
  but also, i put in some easy attraction to all cells in vision, which we can tweak in all sorts of ways, as well as repulsion when circles are too close (on overlap)

 All cells have
    - a speed at which they physically move
    - an inner clock which determines their breathing (from 12 to 6 it is breath in o'clock, after that breath out until 12.
    - a diameter, which is the size of the circle, this value grows and shrinks when breathing
    - an age, which is initialized to the diameter, and increases by 0.025 every frame
    - clock speed, which atm is the same for each cell, but must still be changed
    - vision diameter, which is the size of the circle with which each cell can see around. this diameter currently stays constant
    - nudge amount, amount that the clock is nudged forward if any neighbouring cell is at 6 o'clock and this cell is breathing in. 

*/

let drawMode = 4;
let layer = 0;

function keyPressed(){
  switch(key) {
    case ' ':
      layer = !layer;
      break;
    case '1':
      drawMode = 1;
      break;
    case '2':
      drawMode = 2;
      break;
    case '3':
      drawMode = 3;
      break;
    case '4':
      drawMode = 4;
      break;
    case '5':
      drawMode = 5;
      break;
    case '6':
      drawMode = 6;
      break;
    case 'n':
      spawn('red');
      break;
    case 'N':
      spawn('red');
      spawn('red');
      spawn('red');
      break;
    case 'm':
      spawn('blue');
      break;
    case 'M':
      spawn('blue');
      spawn('blue');
      spawn('blue');
      break;
  }
}

function spawn(species, x=random(width), y=random(height)){
  print(cellCount);
  cells.push(new Cell(
    x,//x pos
    y, //random(height),//y pos
    0.01,              //speed
    int(random(1,13)), //clock phase
    50,  //int(random(25,75)),//cell diam
    0.01, //clock speed
    250,               //vision diam
    0.01,             //nudge amount
    species));
  cellCount++;
}

function cry(ang) {
  let cry = 2 * sin(ang) - sin(2 * ang) - sin(3 * ang);
  return (min(3.5, max(cry, -4))+2)/2;
}

function rules(cell) {
    let newclock = 0;
    
    for (let x = 0; x < cellCount; x++) {
      let neighbor = cells[x];
      // d is the distance between the current cell and the cell in question
        let d = dist(cell.x, cell.y, neighbor.x, neighbor.y);
        
        // NEIGHBOR INTERACTION:
        // if neighbor is at the height of breathing in and I'm breathing in, advance my clock
        if (d < cell.visionDiam && d > 0) {
          if (round(neighbor.clock) == 6) {
            if (cell.clock < 6 || cell.clock == 12) {
              newclock = cell.clock + cell.nudgeAmt;
              cell.clock = lerp(cell.clock, newclock, 0.05);
            }
          }
          if (drawMode == 2) {
            stroke(255, 260 - layer * 255);
            strokeWeight(3-(3*(d/cell.visionDiam)));
            line(cell.x, cell.y, neighbor.x, neighbor.y);
          } else if (drawMode == 6) {
            let clockAngle = map(cell.clock, 0, 12, 0, 2*PI);
            let clockAngle2 = map(neighbor.clock, 0, 12, 0, 2*PI);
            stroke(255);
            line(cell.x + cos(clockAngle) * cell.diam/2, cell.y + sin(clockAngle) * cell.diam/2, neighbor.x + cos(clockAngle2) * neighbor.diam/2, neighbor.x + sin(clockAngle2) * neighbor.diam/2);
          }
          // FORCE INTERACTION:
          
          neighbor.species = lerp(neighbor.species, cell.species, 0.001);
          
          let diff = abs(cell.species - neighbor.species);
          
          if (cell.species < 0.5) {
            // blu species
            if (d < cell.diam/2 + neighbor.diam/2){
              cell.xDir = (cell.x - neighbor.x) * (repulsion + cell.syncDuration + neighbor.species - 0.5);
              cell.yDir = (cell.y - neighbor.y) * (repulsion + cell.syncDuration + neighbor.species - 0.5);
              if (neighbor.species < 0.5) {
                cell.clockSpeed = lerp(cell.clockSpeed, neighbor.clockSpeed, 0.001);
                if (abs(cell.clock - neighbor.clock) < 0.025) {
                  cell.syncDuration = lerp(cell.syncDuration, 0, 0.01);
                  cell.clockSpeed = lerp(cell.clockSpeed, neighbor.clockSpeed, 0.01);
                  
                  /*if (cell.syncDuration > 3) {
                    spawn('random', (cell.x+2 + neighbor.x+2)/2, (cell.y + neighbor.y)/2);
                    spawn('random', (cell.x + neighbor.x)/2, (cell.y + neighbor.y)/2);
                    spawn('random', (cell.x-2 + neighbor.x-2)/2, (cell.y + neighbor.y)/2);
                    cell.syncDuration = 0;
                  }*/
                }
              }
            } else if (neighbor.species > 0.5 || diff < 0.2){
              // if neighbor is red OR small cultural difference
              cell.xDir = (neighbor.x - cell.x) * (attraction - cell.syncDuration);
              cell.yDir = (neighbor.y - cell.y) * (attraction - cell.syncDuration);
            }
          } else {
            // red species
            cell.xDir = (cell.x - neighbor.x) * repulsion * 1.2;
            cell.yDir = (cell.y - neighbor.y) * repulsion * 1.2;
            
            if (diff < 0.1 && neighbor.species > 0.7) {
              cell.clockSpeed += 0.001; 
            }
          }
          
          cell.x += cell.xDir * cell.speed/(d/20);
          cell.y += cell.yDir * cell.speed/(d/20);
            
          //bounds checking
          if (cell.x + cell.diam/2 > width || cell.x - cell.diam/2 < 0) {
            cell.vx *= -0.5;
            //cell.x = constrain(cell.x, cell.diam/2, width - cell.diam/2);
            //cell.x = width - (cell.x + cell.diam/2);
            cell.x = constrain(cell.x, cell.diam/2, width - cell.diam/2);
          }
          if (cell.y + cell.diam/2 > height || cell.y - cell.diam/2 < 0) {
            cell.vy *= -0.5;
            //cell.y = constrain(cell.y, cell.diam/2, height - cell.diam/2);
            //cell.y = height - (cell.y + cell.diam/2);
            cell.y = constrain(cell.y, cell.diam/2, height - cell.diam/2);
          }
        }
        if (cell.species > 0.5) {
          cell.x += random(-2,2);
          cell.y += random(-2,2);
          cell.visionDiam = cell.diam * 2;
        } else {
          cell.visionDiam = cell.diam * 2;  
        }
    }
    let clock2Angle = map(cell.clock, 3, 12, 0, 1.5*PI);
    
    //if (cell.species > 0.6) {
      //cell.diam = map(cry(clock2Angle), -1, 1, cell.age, cell.age * 2);
    //} else {
      cell.diam = map(sin(clock2Angle), -1, 1, cell.age, cell.age * 2);
    //}
    cell.clock = cell.clock % 12 + cell.clockSpeed;
    //cell.age += 0.025;
    //cell.clockSpeed *= 0.99999;  // breath rate slows down as you get older
    return cell;
}

class Cell{
  constructor(x, y, speed, clock, diam, clockSpeed, visionDiam, nudgeAmt, species) {
    this.x = x;
    this.y = y;
    this.xDir = 0;
    this.yDir = 0;
    this.speed = speed;
    this.clock = clock;
    this.diam = diam;
    if (species == 'blue') {
      this.species = random(0.5);
    } else if (species == 'red') {
      this.species = random(0.5) + 0.5;
    } else {
      this.species = random(1);  
    }
    this.clockSpeed = (round(this.species)/10 + 0.01);
    //this.diam = 100;//(1.2-round(this.species)) * 400;
    this.age = diam;
    this.visionDiam = this.diam * 1.5;
    this.nudgeAmt = nudgeAmt;
    this.syncDuration = 2.9;
  }
  
  setNudge(amt) {
    this.nudgeAmt = amt;  
  }
  setVision(amt) {
    this.visionDiam = amt;  
  }
  
  
  display(){
    let colAngle = map(this.clock, 3, 12, 0, 1.5*PI);
    let clockAngle = map(this.clock, 0, 12, 0, 2*PI);
    let colour = map(sin(colAngle), -1, 1, 100, 255);
    clockAngle -= 0.5*PI;
    
    // coloring
    noStroke();
    fill(colour);
    //gradient circle test
    if (drawMode == 3) { 
      let stepSize = 10;
      for (let r = this.diam; r > stepSize; r -= stepSize) {
        fill(map(r, stepSize, this.diam, 255, map(sin(colAngle), -1, 1, 5, 25)), 255);
        ellipse(this.x, this.y, r, r);
      }
    } else if (drawMode == 1) {
      let haloDiam = map(sin(colAngle + 0.5 * PI), -1, 1, this.age * 1, this.age * 1.5);
      fill(244, 255, 255, 50);
      ellipse(this.x, this.y, haloDiam, haloDiam);
      fill(colour);
      ellipse(this.x, this.y, this.diam, this.diam);
    } else if (drawMode == 4) {
      noFill();
      stroke(colour);
      strokeWeight(2);
      ellipse(this.x, this.y, this.visionDiam - 50, this.visionDiam - 50);
    } else if (drawMode == 5) {
      // clock line
      if (this.species > 0.5) { fill(colour,0,0); }
      else { fill(0,0,colour); }
      ellipse(this.x, this.y, this.diam, this.diam);
      noFill();
      stroke(100);
      line(this.x, this.y, this.x + cos(clockAngle)*this.diam/2, this.y + sin(clockAngle)*this.diam/2);
      ellipse(this.x, this.y, this.visionDiam, this.visionDiam);   
    } else if (drawMode == 1) {
      fill(255);
      ellipse(this.x, this.y, 3, 3);
    }
  }
}

let cellCount, cells, newCells, rows, columns;
let slider, slider2;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder'); // The ID of the element you want to attach your canvas to
  noStroke();
  background(0);
  
  // nudge amount
  //slider = createSlider(0, 3, 0.4, 0.025);
  /*slider.position(10, 10);
  slider.style('width', '80px');
  nudgeDisplay = createP();
  nudgeDisplay.position(slider.x + slider.width, slider.y - slider.height);
  */
  // vision diam
  //slider2 = createSlider(10, width, random(100,300), 2.5);
  /*slider2.position(10, 20);
  slider2.style('width', '80px');
  visionDisplay = createP();
  visionDisplay.position(slider2.x + slider2.width, slider2.y - slider2.height);
*/
  
    // attraction
  //slider3 = createSlider(0, 6, 3, 0.1);
  /*slider3.position(10, 30);
  slider3.style('width', '80px');
  attrDisplay = createP();
  attrDisplay.position(slider3.x + slider3.width, slider3.y - slider3.height);
*/
  
  // repulsion
  //slider4 = createSlider(0, 6, 3.5, 0.1);
  /*slider4.position(10, 40);
  slider4.style('width', '80px');
  repDisplay = createP();
  repDisplay.position(slider4.x + slider4.width, slider4.y - slider4.height);
*/
  
  cellCount = 69;
  cells = [];
  
  for (let x = 0; x < cellCount; x++) {
    cells[x] = new Cell(
    width/2,//x pos
    height/2, //random(height),//y pos
    0.01,              //speed
    int(random(1,13)), //clock phase
    50,//int(random(25,75)),//cell diam
    0.01, //clock speed
    250,               //vision diam
    0.01,             //nudge amount
    'random');
  }
}

function draw() {
  if (layer == false) {
    background(0);
  } else { background(0,1);}
  let nudgeAmt = 0.4;//slider.value();
  let visionAmt = random(100,300);//slider2.value();
  attraction = 3;//slider3.value();
  repulsion = 3.5;//slider4.value();
  
  /*nudgeDisplay.html('<style>p{color:white;}</style>nudge: ' + slider.value());
  visionDisplay.html('vision: ' + slider2.value());
  attrDisplay.html('attraction: ' + slider3.value());
  repDisplay.html('repulsion: ' + slider4.value());
*/
  newcells = [];
  
  for (let x = 0; x < cellCount; x++) {
    //cells[x].nudgeAmt = nudgeAmt;
    //cells[x].visionDiam = visionAmt;
    newcells[x] = rules(cells[x]);
  }
  
  cells = newcells;
  
  for (let x = 0; x < cellCount; x++) {
      cells[x].display();
  }
}