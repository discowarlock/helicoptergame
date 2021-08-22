var player = {x: 150, y:250, size: 50};
var player2 = {x: 100, y :100, size: 75};
var coins = [];
var gravity = 0;
var score = 0;
var gap = {height: 300, y : 250};
var walls = [];
var wallTimer = 0;
var smoke = [];
var blade = [];

var goUp = false;
var crashed = false;

var draw = function (){
  noStroke();
  background(0,50,0);
  drawPlayer();
  drawWalls();
  drawScore();
  
  if (!crashed){
    doSmoke();
    //doCoins();
  movePlayer();
  moveWalls();
 
  score += 1;
  } else {
    gameOverScreen();
  }
};
var drawWalls = function(){
  for (var wall of walls){
    fill(0,255,0)
    rect(wall.x,wall.y, wall.w, wall.h);
  }
};

var drawPlayer = function (){
  fill(100,0,255);
  ellipse(player.x, player.y, player.size + 13, player.size-5);
  ellipse(player.x - 30, player.y + 7,player.size + 20 ,player.size - 32)
};

var drawScore = function(){
  fill (255,255,0);
  textSize(24);
  text(score, 50, 450);
};

var moveWalls = function(){
 for (var wall of walls){
   wall.x -= 3;
   if (wall.x < player.x && wall.x + wall.w > player.x){
     if (player.y - player.size/2 <wall.y +wall.h && player.y + player.size/2 > wall.y){
       crashed = true;
     }
   }
 } 
 if (wallTimer <= 0){
   wallTimer = 16;
   gap.y += 25 *floor(random(3) - 1);
   if (gap.y < 150){
     gap.y = 150;
   }
   if (gap.y > 350){
     gap.y = 350;
   }
   var newWall = {x: 500, y: 0, w: 50, h: gap.y - gap.height /2};
   walls.push(newWall);
   var newWall2 = {x: 500, y: gap.y + gap.height/2, w: 50, h: gap.y + gap.height/2};
   walls.push(newWall2);
 }
 wallTimer -= 1;
};

var doSmoke = function(){
  smoke = smoke.filter((s) => {return s.x > -50})
  for (var s of smoke){
    fill (200,200,200,175);
    ellipse(s.x,s.y,s.size,s.size);
    s.x -= 4;
    s.size++;
  }
}
var createSmoke = function(){
var newSmoke = {x:player.x, y:player.y, size:10};
smoke.push(newSmoke);
}

var makeBlade = function(){
  var newBlade = {x:player.x, y:player.y, size: 3};
  blade.push(newBlade);
}

var doBlades = function(){
  fill (200,200,200);
  rect(player.x, player.y, 10, 5);
}

var rotar = function(){
  setInterval(makeBlade, 50);
}

var setup = function(){
  setInterval(createSmoke, 100);
  
};

var doCoins = function(){
   var filteredCoins = coins.filter((coin) => {return coin.x > 0 && !coin.collected});
   coins = filteredCoins;
  if (random(0,100) < 10){
    var newCoin = {x:600, y: random(0,500), size :20, collected: false};
    coins.push(newCoin);
  }
  
  for (var coin of coins){
 
  fill (255,255,0);
  ellipse(coin.x.coin.y,coin.size,coin.size);
  coin.x -= 3;
  
  var playerRadius = player.size / 2;
  var coinRadius = coin.size / 2;
  var touchDistance = playerRadius + coinRadius;
  if (dist(player.x, player.y, coin.x, coin.y) < touchDistance){
    coin.collected = true;
    score += 1;
  }
  }
};


var gameOverScreen = function(){
  fill(255);
  textSize(32);
  text("Game Over",200,200);
  text("Click to Restart", 180,350);
}

var movePlayer = function(){
  if (goUp){
  gravity -= 0.4;
  } else{
    gravity += 0.4;
  }
  
  if (gravity > 8){
    gravity = 8;
  }
  if (gravity < -6){
    gravity = -6;
  }
  
  player.y += gravity;
  
  if (player.y > 500 || player.y < 0){
    crashed = true; 
  }
};
var mousePressed = function(){
  if (mouseButton === LEFT){
    goUp = true;
  }
  
  if (crashed){
    crashed = false;
    player.y = 250;
    gravity = 0;
    
    score = 0;
   coins =[];
 walls = [];
  }
};
  
var mouseReleased = function(){
  if (mouseButton === LEFT){
    goUp = false;
  }
  };
