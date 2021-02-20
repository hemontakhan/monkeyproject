var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImg,FoodGroup,obstacleGroup,obstacleImage;
var gameEndImg,gameEnd;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  obstacleImage  = loadImage("stone.png");
  gameEndImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnBanana();
    spawnObstacles();
  }

  if(FoodGroup.isTouching(player)){
     FoodGroup.destroyEach();
     score = score+2;
     player.scale += 0.1
  }


  if(obstacleGroup.isTouching(player)){
     gameState = END;
  } else if(gameState === END){
    
     backgr.velocityX = 0;
     player.visible = false;

     FoodGroup.destroyEach();
     obstacleGroup.destroyEach();

    gameEnd = createSprite(300,220,15,15);
    gameEnd.addImage(gameEndImg);

    }

  drawSprites();
}

function spawnBanana(){

  if(frameCount % 80 ===0){
     var banana = createSprite(600,250,40,10);
     banana.y = random(120,200);
     banana.addImage(bananaImg);
     banana.scale = 0.05;
     banana.velocityX = -4;

     banana.lifetime =300;
     player.depth = banana.depth+1;
     FoodGroup.add(banana)
  }

}

function spawnObstacles(){
  if (frameCount % 100 === 0){
    obstacle = createSprite(400,315,10,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -(6 + score/10);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}
