var ship;
var shipSprite, enemySprite;
var aliens = [];
var shots = [];
var TOTAL_ALIENS = 7;
var BACKGROUND_COLOR = 50;  
var SCREEN_WIDTH = 640;
var SCREEN_HEIGHT = 480;
var HORIZON = 370;

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  ship = new Ship();
  shipSprite = loadImage("ship.png");
  enemySprite = loadImage("enemyShip.png");
  for(var i = 0; i < TOTAL_ALIENS; i++){ 
    aliens[i]= new Alien(i* 80 + 80, 50);
  }
}

function draw(){
  background(BACKGROUND_COLOR);
  ship.show();
  ship.movement();
  
  var moveRight = false;
  var moveLeft = false;
  
  for(var i = 0; i < aliens.length; i++){
    aliens[i].show();
    aliens[i].move();
    if(aliens[i].x > SCREEN_WIDTH) {
      moveRight = true;
    } else if(aliens[i].x < 0) {
      moveLeft = true;
    }
  }
  
  if(moveRight){
     for(var i = 0; i < aliens.length; i++) {
       aliens[i].shiftDown();
       moveRight = false;
     }
  } else if(moveLeft){
     for(var i = 0; i < aliens.length; i++) {
       aliens[i].shiftDown();
       moveLeft = false;
     }
  }
  
  
  for(var i = 0; i < shots.length; i++) {
    shots[i].movement();
    shots[i].show();
    for(var j = 0; j < aliens.length; j++) { 
      if(shots[i].hits(aliens[j])){
        aliens[j].gone();
        shots[i].gone(); 
      }
    }
  }
  
  for(var i = shots.length - 1; i >= 0; i--){
    if(shots[i].toDelete){
      shots.splice(i, 1);
    }
  }
  
  for(var i = aliens.length - 1; i >= 0; i--){
    if(aliens[i].toDelete){
      aliens.splice(i, 1);
    }
  }
}


//EVERYTHING SHIP RELATED
function Ship(){
   this.x = SCREEN_WIDTH/2;
   this.xdir = 0;
   this.width = 64;
   this.height = 64;
   this.gunYOffset = 32;
     
   //FUNCTIONS THE SHIP PREFORMS
   this.show = function (){
     fill(200);
     //rect(this.x , 370, 20, 20);
     image(shipSprite, this.x - this.width / 2, HORIZON - this.height / 2, this.width, this.height);
   }
   
   this.setDir = function(direction){
       this.xdir = direction;
   }
   
   this.movement = function(direction){
     this.x += this.xdir*5; 
   }
}





//MOVEMENT OF THE SHIP
function keyPressed() {
  if(keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  }else if(keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
  if(key === ' '){
      shots.push(new Bullet(ship.x, HORIZON - ship.gunYOffset));
  }
}   


function keyReleased() {
   ship.setDir(0); 
}


//EVERYTHING ALIEN RELATED
function Alien(x, y){
   this.x = x;
   this.y = y;
   this.r = 25;
   this.toDelete = false;
   this.xdir = 1;
   this.ydir = 0;
   
   
   //FUNCTIONS THE ALIEN PREFORMS
   this.show = function (){
     fill(34, 123, 233);
     //ellipse(this.x, this.y, this.r * 2, this.r * 2);
     image(enemySprite, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
   }
   
   this.gone = function() {
     this.toDelete = true;
   }
   
   this.move = function(){
     this.x = this.x + this.xdir;
     this.y = this.y + this.ydir;
   }
   
   this.shiftDown = function(){
     this.xdir *= -1;
     this.y += this.r;
     
   }
   
}



//EVERYTHING BULLET RELATED
function Bullet(x, y){
  this.x = x;
  this.y = y;
  this.r = 4;
  this.toDelete = false;
  
  this.show = function(){
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
  
  this.movement = function() {
    this.y = this.y -= 4; 
  }
  
  this.hits = function(alien){
    var d = dist(this.x, this.y, alien.x, alien.y);
    if(d < this.r + alien.r){
      return true; 
    }else{
      return false; 
    }
  }
  
  this.gone = function() {
     this.toDelete = true;
   }
}
