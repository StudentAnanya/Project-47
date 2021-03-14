var player;
var bg, bgImg;
var invisibleGround;
var edges;
var zombie, zombieImg, zombieGroup;
var coin, coinImg, coinGroup;
var ruby, rubyImg, rubyGroup;
var platform, ptImg1, ptImg2, ptImg3, ptImg4, ptImg5;
var wow, wowImg;
var cool, coolImg;
var oops, oopsImg;
var life1, life2, life3, life4, life5, lifeImg;
var cross1, cross2, cross3, cross4, cross5, crossImg;
var score = 0;
var lives = 6;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, restartImg;
var gameOver, gameOverImg;
var youWon, youWonImg;
var villian, villianImg;
var god, godImg;
var ig2;

function preload(){

bgImg = loadImage("images/BG.png");

player_running = loadAnimation("Img5.png","Img4.png","Img3.png","Img2.png","Img1.png",)

zombieImg = loadImage("images/zombie pic.png");

coinImg = loadImage("images/coin.png");

rubyImg = loadImage("images/ruby.png");

ptImg1 = loadImage("images/p1.png");
ptImg2 = loadImage("images/p2.png");
ptImg3 = loadImage("images/p3.png");
ptImg4 = loadImage("images/p4.png");
ptImg5 = loadImage("images/p5.png");

wowImg = loadImage("images/wow.png");

coolImg = loadImage("images/cool.png");

oopsImg =loadImage("images/oops.png");

lifeImg = loadImage("images/heart.png");

crossImg = loadImage("images/cross.png");

gameOverImg = loadImage("images/gameover.png");

restartImg = loadImage("images/restart.png");

youWonImg = loadImage("images/youwon.png");

godImg = loadImage("images/Teddy god.png");

villianImg = loadImage("images/villian.png");
}

function setup() {
    createCanvas(4000, 500);
    
    invisibleGround = createSprite(400,500,10000,10);
    invisibleGround.visible = false;

    bg = createSprite(400,250,1000,500)
    bg.addImage(bgImg);
    bg.scale = 0.6;
   // bg.velocityX = -3;

    player = createSprite(-1000,50,20,20)
    player.addAnimation("running",player_running);
    player.scale = 0.2;
    
    coinGroup = new Group();

    zombieGroup = new Group();

    rubyGroup = new Group();

    life1 = createSprite(650,40,10,10);
    life1.addImage(lifeImg);
    life1.scale = 0.02;

    life2 = createSprite(680,40,10,10);
    life2.addImage(lifeImg);
    life2.scale = 0.02;

    life3 = createSprite(710,40,10,10);
    life3.addImage(lifeImg);
    life3.scale = 0.02;

    life4 = createSprite(740,40,10,10);
    life4.addImage(lifeImg);
    life4.scale = 0.02;

    life5 = createSprite(770,40,10,10);
    life5.addImage(lifeImg);
    life5.scale = 0.02;

    gameOver = createSprite(200,300,10,10);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;
    gameOver.lifetime = 15;

    /*youWon = createSprite(200,300,10,10);
    youWon.addImage(youWonImg);
    youWon.scale = 0.5;
    youWon.lifetime = 15;*/

    restart = createSprite(200,300,10,10);
    restart.addImage(restartImg);
    restart.scale = 0.5;
    
    /*ig2 = createSprite(400,100,width,10);
    ig2.visible = false;*/

}

  function draw() {
    background("black");

    edges = createEdgeSprites();

     player.collide(invisibleGround);
     player.collide(edges[0])
     player.collide(edges[2])

     
     console.log(camera.position.x)
     //camera.position.y = 200;
     
  /*   bg.x = camera.position.x + 350;
     score.x = camera.position.x;
     life1.x = camera.position.x + 600;
     life2.x = camera.position.x + 630;
     life3.x = camera.position.x + 660;
     life4.x = camera.position.x + 690;
     life5.x = camera.position.x + 720;
*/
     //if(gameState === PLAY){

      if(keyDown(UP_ARROW)){
        player.velocityY = - 8;
    }
     player.velocityY = player.velocityY + 0.3;

     if(keyIsDown(RIGHT_ARROW)){
        player.x =player.x+4;
    }
  
    if(keyIsDown(LEFT_ARROW)){
      player.x =player.x-4;
    }
    
     spawnZombies();

     spawnCoins();

     spwanRubies();

     spawnPlatforms();

     if(player.isTouching(zombieGroup)){

       oops = createSprite(400,250,50,50);
       oops.addImage(oopsImg); 
       oops.scale = 0.3;
       oops.lifetime = 10;

       lives = lives - 1;

       //("life" + lives).addImage(crossImg);
      }

    if(player.isTouching(rubyGroup)){
      wow = createSprite(400,150,50,50);
      wow.addImage(wowImg); 
      wow.scale = 0.3;
      wow.lifetime = 10;

      score+= 2;
   }

   if(player.isTouching(coinGroup)){
    cool = createSprite(400,150,50,50);
    cool.addImage(coolImg); 
    cool.scale=0.3;
    cool.lifetime = 10;

    score++;
  }
   
  
  gameOver.visible = false;

  restart.visible = false;

  youWon = false;

  //if(camera.position.x ===2800){
   //text("YOU CAN DO IT👍");
  //}

 /* if(camera.position.x === 4800){
    text("ZOMBIE KING WAITING FOR YOU AT 300 MTS AWAY...");
  }*/

  /*if(camera.position.x === 5100){
   villian = createSprite(player.x + 100, 480, 20, 20);
   villian.addImage(villianImg);
  }*/

//}

    if(lives===0){
     gameState = END;
    }

    if(gameState === END && lives===0){
     player.velocityY = 0;

     coinGroup.setVelocityXEach(0);
     rubyGroup.setVelocityXEach(0);
     zombieGroup.setVelocityXEach(0);

     gameOver.visible = true;

     restart.visible = true;
    }

    /*if(player.collide(villian)){
      gameState = END;
    }

    if(gameState === END && player.collide(villian)){
      player.velocityY = 0;
 
      coinGroup.setVelocityXEach(0);
      rubyGroup.setVelocityXEach(0);
      zombieGroup.setVelocityXEach(0);
 
      youWon.visible = true;

      restart.visible = true;
      
     }

    textSize(20)
    text("Lives : " + lives, camera.position.x + 80, 50);
    text("Score : " + score, camera.position.x - 80, 50);*/

    if(mousePressedOver(restart)){
      reset();
    } 

    drawSprites();

}

function spawnZombies(){
  if(player.velocityX > 2){
  if(frameCount %150 === 0){
    zombie =  createSprite(810,random(200,500),20,20);
    zombie.addImage(zombieImg);
    zombie.velocityX = -(6 + 3*score/100);
    
 
    zombie.scale = 0.05;
    zombie.lifetime = 320;
    zombieGroup.add(zombie);
  }
} 
}

function spawnCoins(){
  if(player.velocityX > 2){
  if(frameCount %50 === 0){
    coin =  createSprite(810,random(300,500),20,20);
    coin.addImage(coinImg);
    coin.velocityX = -(6 + 3*score/100);
    coin.scale = 0.05;
    coin.lifetime = 320;
    coinGroup.add(coin);
  }
  }
}

function spwanRubies(){
  if(player.velocityX > 2){
  if(frameCount %300 === 0){
    ruby =  createSprite(810,random(300,500),20,20);
    ruby.addImage(rubyImg);
    ruby.velocityX = -(6 + 3*score/100);
    ruby.scale = 0.05;
    ruby.lifetime = 320; 
    rubyGroup.add(ruby);
  }
  }
}
//create platform
function spawnPlatforms(){
  if(player.velocityX > 2){
  if(frameCount %50 === 0){
    platform =  createSprite(810,random(300,500),20,20);
    platform.velocityX = -3;
    var rand = random(1,5);
    //platform.addImage(ptImg1);
    
    platform.scale = 0.05;
    platform.lifetime = 320;
  }
}
}

/*function God(){

      god = createSprite(380,-10,10,10);
      god.addImage(godImg);
      god.velocityY = 3;
      god.collide(ig2);
      god.lifetime = 10;

}*/

function reset(){

  score=0;

  gameState=PLAY;

  zombieGroup.destroyEach();
  coinGroup.destroyEach();
  rubyGroup.destroyEach();

  gameOver.visible=false;
  restart.visible=false;

  frameCount=0;

 }