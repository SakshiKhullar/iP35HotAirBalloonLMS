var balloon;
var position,balloonPos;
function preload(){
  backgroundImg = loadImage("Images/cityImage.png")

balloonImg=loadAnimation("Images/HotAirBallon-01.png","Images/HotAirBallon-01.png","Images/HotAirBallon-02.png","Images/HotAirBallon-02.png",
"Images/HotAirBallon-03.png","Images/HotAirBallon-03.png");
}

function setup() {
  createCanvas(800,700);
  database=firebase.database();
  balloon = createSprite(400,500,100,100)
  balloon.addAnimation("moving",balloonImg )
  balloon.scale=0.8

  var balloonPos = database.ref('balloon/height');
   balloonPos.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg);  
  drawSprites();
  textSize(25);
  fill("red")
  text("Press Arrow Keys to move the balloon", 100,100)

  if(position !== undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+10);
    }
 
}
}

function writePosition(x,y){
  database.ref('balloon/height').set({
      'x' : position.x +x,
      'y' : position.y +y


  }
  )

}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}
function showError(){
  console.log("Error in writing to the database");
}