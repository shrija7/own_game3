var path,boy,thief1,thief2,bomb_
var pathImg,boyImg,thief1Img,thief2Img,bombImg,endImg,over
var THIEF_CAUGHT = 0;
var bombG,thiefGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("a1.png","a2.png","a3.png");
  bombImg = loadImage("b.png");
  thief1Img = loadImage("c1.png");
  thief2Img = loadImage("c.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
//create the canvas and adjust the window sizes to suit the device 
createCanvas(windowWidth, windowHeight);
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("policeRunning",boyImg);
boy.scale=0.6;
  
over = createSprite(width/2,height/2,20,20)
over.addImage(endImg);
over.visible=false

bombG=new Group();
thiefGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(path.y>windowWidth){
    path.y=200
  }
  createbomb() ;
  createthief();

    if (thiefGroup.isTouching(boy)) {
      thiefGroup.destroyEach();
      THIEF_CAUGHT=THIEF_CAUGHT + 50;
    }
  
    else{
      if(bombG.isTouching(boy)) {
        gameState=END;
        
        boy.destroy()
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        
        over.visible=true
        
        thiefGroup.destroyEach();
        bombG.destroyEach();
        
        thiefGroup.setVelocityYEach(0);
        bombG.setVelocityYEach(0);
        
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("thief caught: "+ THIEF_CAUGHT,width-150,30);
  }

}

function createbomb() {
  if (World.frameCount % 75 == 0) {
    //   Modify the positions of jwellery to make them spawn throughout the available screen size.

    var bomb = createSprite(Math.round(random(10, windowWidth),40, 10, 10));
    bomb.addImage( bombImg);
    bomb.scale=0.5;
    bomb.velocityY = 7;
    bomb.lifetime = 200;
    bombG.add(bomb);
  }
}

function createthief(){
  if (World.frameCount % 100 == 0) {
    //   Modify the positions of sword to make them spawn throughout the available screen size.

    var thief = createSprite(Math.round(random(10, windowWidth),40, 10, 10));
    thief.addImage(thief1Img);
    thief.scale=0.3;
    thief.velocityY = 6;
    thief.lifetime = 200;
    thiefGroup.add(thief);
  }
}