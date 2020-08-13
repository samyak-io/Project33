var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight=300;

var score =0;
var particle;
var turn = 0;
var gameState="start";
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
}
 


function draw() {
  background("black");
  //score text
  textSize(20);
  stroke(5);
  text("Score : "+score,20,45);
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++){ 
     plinkos[i].display();
     }
   if(frameCount%60===0){
     particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
     score++;
     }
    if(particle!=null){
   for (var j = 0; j < particles.length; j++){
    particles[j].display();
   }
  
   for (var k = 0; k < divisions.length; k++){   
     divisions[k].display();
   }

   //points scored on specific divisions 
   if(particle!=null){
     particle.display();

    if(particle.body.position.y > 760)
    {
      if(particle.body.position.x < 300)
      {
            score=score+500;
            particle = null;
          if(turn >= 5) gameState="end";
        }
      if(particle.body.position.x > 301 && particle.body.position.x < 600)
         {
            score=score+100;
            particle = null;
          if(turn>=5) gameState="end";
         }

       if(particle.body.position.x < 601 && particle.body.position.x < 900){
            score=score+200;
            particle = null;
          if(turn>=5) gameState="end";
      }
    }
  }
 }
  // if(turn >5){
  //   gameState = "end";
  //   text()
  // }
   //show score numbers between divisions 
   textSize(25);
   text("500", 18, divisionHeight + 230);
   text("500",98,  divisionHeight + 230);
   text("500",178, divisionHeight + 230);
   text("500",258, divisionHeight + 230);
   text("100",338, divisionHeight + 230);
   text("100",418, divisionHeight + 230);
   text("100",498, divisionHeight + 230);
   text("200",578, divisionHeight + 230);
   text("200",658, divisionHeight + 230);
   text("200",738, divisionHeight + 230);
  
  
   if(turn >5){
    textSize(25);
    fill("white");
    text("GAME OVER",width/2,height/2);
    gameState = "end";
    particle = null;
    divisions = null;
    plinkos = null;
  }
}

function mousePressed()
{
  if(gameState !== "end"){
    turn++;
    particle = new Particle(mouseX,10,10,10);
  }
}
