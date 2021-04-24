
var database; //namespacing
var position;
var balloon;

function preload(){
  bg=loadImage('images/background.png')
  b1=loadImage('images/balloon1.png')
}


function setup(){
    createCanvas(500,500);

    database = firebase.database(); //alias name(nick naming)

    balloon = createSprite(250,250,10,10);
    balloon.addImage(b1);
    balloon.scale=0.5;

    var balloonPositionRef = database.ref('balloon/position');
    //read data use the on() function
    balloonPositionRef.on("value",readPosition,showError);
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0); //calling the function.
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function readPosition(data){
    position=data.val();
    console.log(position.x)
    balloon.x=position.x
    balloon.y=position.y
}
function showError(){
    console.log('no data')
}

function writePosition(x,y){
    database.ref('balloon/position').set({
        x:position.x+x,
        y:position.y+y    
    })
 
}
