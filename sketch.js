var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex,collided;
var back;
var ground;
var obstacle1,obstacle2,obstacle3,obstacle4;
var invi;
var sun;
var cloud;
var obstacleGroup,cloudGroup;
var score = 0;



function preload(){

trexImg = loadAnimation("t1.png","trex_2.png","trex_3.png");
groundImg = loadImage("ground.png");
backImg = loadImage("backgroundImg.png");
obstacle1I = loadImage("obstacle1.png");
obstacle2I = loadImage("obstacle2.png");
obstacle3I = loadImage("obstacle3.png");
obstacle4I = loadImage("obstacle4.png");
suns = loadImage("sun.png");
cloudo = loadImage("cloud.png");
collided = loadAnimation("trex_collided.png");

jus = loadSound("jump.wav");
}



function setup(){
createCanvas(windowWidth,windowHeight);



ground = createSprite(200,900,10,10);
ground.addImage(groundImg);
ground.velocityX = -5;

trex = createSprite(100,800,10,10);
trex.addAnimation("running",trexImg);
trex.addAnimation("touching", collided);
trex.scale = 0.1;
trex.debug = true;

invi = createSprite(700,840,1500,10);
invi.visible = false;

sun = createSprite(window.width-100,window.height-900,10,10);
sun.addImage(suns);
sun.scale = 0.2;

obstacleGroup = new Group;
cloudGroup = new Group;

}


function draw(){
background(backImg);

trex.collide(invi);

if (gameState === PLAY){
textSize(20);
fill("black")
text("Score: "+ score,30,50);

if(ground.x < 0 ){

    ground.x = ground.width/2;

}

if(keyDown("space") && trex.y >= 796 ){

 trex.velocityY = -12;
 jus.play();



}

if(frameCount%5 === 0){

    score = score + 1;

}

if(trex.isTouching(obstacleGroup)){

gameState = END;


}

trex.velocityY = trex.velocityY + 0.5;

console.log(trex.y);




obstacles();
clouds();
}

if(gameState === END){

    trex.changeAnimation("touching",collided);
    
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);

    trex.velocityY = 0;
    ground.velocityX = 0;
}


drawSprites();
}

function obstacles(){
   
    if(frameCount%60 === 0){
    var r = Math.round(random(1,3));

    if(r == 1){

       obstacle1 = createSprite(1200,800,10,10);
       obstacle1.velocityX = -5;
        obstacle1.addImage(obstacle1I);
        obstacle1.scale = 0.3;
        obstacleGroup.add(obstacle1);
        obstacle1.lifetime = 260;
        obstacle1.debug = true;
        obstacle1.setCollider("rectangle",0,0,100,150);
    }

    else if(r == 2){

        obstacle2 = createSprite(1200,800,10,10);
        obstacle2.velocityX = -5;
         obstacle2.addImage(obstacle2I);
         obstacle2.scale = 0.3;
         obstacleGroup.add(obstacle2);
         obstacle2.lifetime = 260;
         obstacle2.debug = true;
         obstacle2.setCollider("rectangle",0,0,200,200);
 
     }

     else if(r == 3){

        obstacle3 = createSprite(1200,770,10,10);
        obstacle3.velocityX = -5;
         obstacle3.addImage(obstacle3I);
         obstacle3.scale = 0.2;
         obstacleGroup.add(obstacle3);
         obstacle3.lifetime = 260;
         obstacle3.debug = true;
         obstacle3.setCollider("rectangle",0,500,200,200);
     }

  }
}

function clouds(){

    if(frameCount%300 === 0){


cloud = createSprite(1300,300,10,10)
cloud.addImage(cloudo);
cloud.velocityX = -2;

cloud.y = Math.round(random(50,300));
cloudGroup.add(cloud);
}
}


