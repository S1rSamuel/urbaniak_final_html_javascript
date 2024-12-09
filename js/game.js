
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)

var seconds = 0;
var minutes = 0;
var bestTime;


var time = setInterval(clock, 1000);

function clock(){
    seconds += 1;
    if(seconds == 60){
        minutes++;
        seconds = 0;
    }
   console.log(minutes + ":" + seconds);
}

function main()
{
    ctx.clearRect(0,0,c.width,c.height); 
    state()
}

//setup
var state;
var score = 3
var button = new GameObject();
var button2 = new GameObject();
var button3 = new GameObject();
var avatar = new GameObject();
var ground = new GameObject();
var wallsky = new GameObject();
//var platform = new GameObject();
var wallright = new GameObject();
var wallleft = new GameObject();
var level = new GameObject();
var ammoblock = new GameObject();
var winblock = new GameObject();
var floorbug = new GameObject();
var lightning = new GameObject();
var titleImageobj = new GameObject()
var orangeImage2obj = new GameObject();
var kitchenBackgroundObj = new GameObject();
var loseScreenObj = new GameObject();
var appleImage = document.getElementById("appleimgg")
var orangeImage = document.getElementById("orangeimgg")
var fireImage = document.getElementById("fireimgg")
var orangeImage2 = document.getElementById("orange2imgg")
var titleImage = document.getElementById("titleimgg")
var bugImage = document.getElementById("bugimgg")
var floorBugImage = document.getElementById("bugimgg2")
var bugSpray = document.getElementById("sprayimgg")
var kitchenBackground = document.getElementById("kitchenimgg")
var loseScreen = document.getElementById("losescreenimgg")

 var blocks = []
 var numberOfBlocks = 70
 
 for(var i = 0; i<numberOfBlocks; i++){
    blocks[i] = new GameObject()
    blocks[i].w = 50
    blocks[i].h = 50
    blocks[i].vy = 0
    blocks[i].vx = 0
    blocks[i].x = rand(1000, 10000)
    blocks[i].y = rand(100, 440)
    blocks[i].color = "black"
}

function init()
{
    state = menu

    avatar.w = 40
    avatar.h = 40
    avatar.x = 100
    avatar.y = 0

    level.x = 0; 
    level.y = 0;

    ground.color = `brown`;
    ground.w = c.width * 200;
    ground.h = c.height*.1;
    ground.y = c.height - ground.h/2;
    ground.world = level

    // platform.w = 200;
    // platform.h = 34;
    // platform.x = 700;
    // platform.y = 200;
    // platform.color = `tan`
    // platform.world = level

    wallright.h = 500;
    wallright.w = 50;
    wallright.x = 825
    wallright.y = 250
    wallright.world = level

    wallleft.h = 500;
    wallleft.w = 50;
    wallleft.x = -25
    wallleft.y = 250
    wallleft.world = level

    wallsky.h = 50;
    wallsky.w = 800;
    wallsky.x = 400
    wallsky.y = -25
    wallsky.world = level

    ammoblock.h = 75
    ammoblock.w = 50
    ammoblock.x = rand(25,500)
    ammoblock.y = rand(-1000,-4000)
    ammoblock.world = level

    lightning.w = 210
    lightning.h = 90
    lightning.x = 2000
    lightning.y = 300
    lightning.world = level
    
    floorbug.h = 70
    floorbug.w = 90
    floorbug.x = avatar.x + 800
    floorbug.y = 415
    floorbug.world = level

    winblock.h = 50
    winblock.w = 50
    winblock.x = rand(5000,15000)
    winblock.y = 425
    winblock.world = level

    button.w = 400
    button.h = 400
    button.x = 600
    button.y = 250
    button3.x = 200
    
    button2.x = 130
    button2.y = 300
    button2.w = 300
    button2.h = 300
    
    orangeImage2obj.h = c.height
    orangeImage2obj.w = c.width
    orangeImage2obj.x = 400
    orangeImage2obj.y = 250

    titleImageobj.h = c.height
    titleImageobj.w = c.width
    titleImageobj.x = 400
    titleImageobj.y = 250

    loseScreenObj.h = c.height
    loseScreenObj.w = c.width
    loseScreenObj.x = 400
    loseScreenObj.y = 250

    kitchenBackgroundObj.h = c.height * 1.5
    kitchenBackgroundObj.w = c.width * 1.5
    kitchenBackgroundObj.x = 400
    kitchenBackgroundObj.y = 250
    
}

init();

/*---------------Game Screens (states)----------------*/
function menu()
{
    if(clicked(button))
    {
        avatar.x = 100
        avatar.y = 300
        state = game;
        lightning.y = 1000
        score = 3
        winblock.x += rand(5000,15000)
        ammoblock.x = rand(25,500)
        ammoblock.y = rand(-1000,-4000)
        floorbug.x = 1000
        seconds = 0;
        minutes = 0;
        kitchenBackgroundObj.x = 400
        kitchenBackgroundObj.y = 250
    }

    for(var i = 0; i<blocks.length; i++){
        blocks[i].x = rand(1000, 10000)
        blocks[i].y = rand(100, 440)
    }
    titleImageobj.renderImage(titleImage)
//
    // ctx.font = "60px Papyrus"
    // ctx.fillText("FRUIT FUMBLE",5,80)
    // ctx.fillStyle = "black"

    // ctx.font = "25px Arial"
    // ctx.fillText("A & D keys to move. tap spacebar to jump. hold to go higher.",5,130)
    // ctx.fillStyle = "black"

    // ctx.font = "25px Arial"
    // ctx.fillText("press ENTER to shoot your fireball. hold w to ascend.",5,175)
    // ctx.fillStyle = "black"

    // ctx.font = "25px Arial"
    // ctx.fillText("dodge the bugs. survive as long as possible. maybe grab the orange.",5,400)
    // ctx.fillStyle = "black"

    // ctx.font = "35px Papyrus"
    // ctx.fillText("click on the pink square to begin.",5,450)

    //button.render()
}

function win()
{
    if(clicked(button3)){
            state = menu;
        }

        orangeImage2obj.renderImage(orangeImage2);

        ctx.font = "60px Papyrus"
        ctx.fillText("you have reunited with your long lost brother",5,80,750)
        ctx.fillStyle = "white"
    
        //button3.render()
}
function lose()
{

    if(clicked(button2))
        {
            state = menu;
            minutes = 0;
            seconds = 0;
        }
        loseScreenObj.renderImage(loseScreen)
        ctx.font = "60px Arial"
        ctx.fillText(`Your Time:${bestTime}`,5,450)
        ctx.fillStyle = "black"
    
        
        //button2.render()
}

function game()
{
     winblock.x -- ; winblock.x -- ; winblock.x -- ; winblock.x -- ; winblock.x -- ;
     floorbug.x -- ; floorbug.x --
     lightning.x ++ ; lightning.x ++ ; lightning.x ++ ; lightning.x ++ ; lightning.x ++ ; lightning.x ++
     ammoblock.y ++ ; ammoblock.y ++ ; ammoblock.y ++
     
     
     kitchenBackgroundObj.renderImage(kitchenBackground);
     kitchenBackgroundObj.move()
     kitchenBackgroundObj.vx *= .85;
    //  kitchenBackgroundObj.vy += .1;

    //  if(kitchenBackgroundObj.y > 300){
    //     kitchenBackgroundObj.vy += -1;
    //  }
    //  if(canJump = false){
    //     kitchenBackgroundObj.vy += -1;
    //  }

     for(var i = 0; i<blocks.length; i++){
        blocks[i].move()
        blocks[i].renderImage(bugImage)
        blocks[i].vx = -4
        blocks[i].vy = 0

        if(blocks[i].isOverPoint(avatar)){
            state = lose
            bestTime = seconds<10 ? `${minutes}:0${seconds}`:`${minutes}:${seconds}`;
        }
        if(blocks[i].x < avatar.x - 600){
            blocks[i].x = rand(1000, 10000)
            blocks[i].y = rand(100, 440) }
        if(lightning.isOverPoint(blocks[i])){
            blocks[i].x = rand(1000, 10000) }
     }       
  
     if(avatar.x > winblock.x + 600){
        winblock.x += rand(5000,15000)}

     if(floorbug.x < -5){
        floorbug.x += rand(850, 1300)}

     if(lightning.x > 1000){
        lightning.y += 1000}

     if(shoot == true && lightning.x > 1000 && score > 0){
        lightning.x = avatar.x 
        lightning.y = avatar.y 
        score -- }
     
    if(sp == true){
        avatar.vy += -.55 }
    if(sp == true && avatar.canJump == true){
        avatar.canJump = false;
        avatar.vy = -14;
        //kitchenBackgroundObj.vy += 1 
    }
    if(a == true){
        avatar.vx += -1.5;
        avatar.angle += -11;
        kitchenBackgroundObj.vx += 0.1}
    if(d == true){
        avatar.vx += 1.5;
        avatar.angle += 11;
        kitchenBackgroundObj.vx += -0.1}
    if(fly == true){
        avatar.vy += -1.5 }
   

    avatar.vx *= .85;
    avatar.vy += .9;
    avatar.move();

    //used to move the level. 
    var offset = {x:avatar.vx, y:avatar.vy}

    while(ground.isOverPoint(avatar.bottom())){
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true; }
    while(ground.isOverPoint(ammoblock.bottom())){
        ammoblock.vy = 0;
        ammoblock.y--;
        offset.y--; }
    // while(platform.isOverPoint(avatar.bottom()) && avatar.vy >= 0){
    //     avatar.vy = 0;
    //     avatar.y--;
    //     offset.y--;
    //     avatar.canJump = true; }
    while(wallright.isOverPoint(avatar.right()) && avatar.vx >= 0){
        avatar.vx = 0;
        avatar.x--;
        offset.x--; }
    while(wallleft.isOverPoint(avatar.left()) && avatar.vx <= 0){
        avatar.vx = 0;
        avatar.x++;
        offset.x++; }
    while(wallsky.isOverPoint(avatar.top()) && avatar.vy <= 0){
        avatar.vy = 0;
        avatar.y++;
        offset.y++; }

    if(ammoblock.isOverPoint(avatar)){
        score ++
        ammoblock.x = rand(25,500)
        ammoblock.y = rand(-2000,-5000) }

    if(winblock.isOverPoint(floorbug)){
        floorbug.x = 1000 }

    if(lightning.isOverPoint(floorbug)){
        floorbug.x = 1000 }

    if(floorbug.isOverPoint(avatar)){
        state = lose
        bestTime = seconds<10 ? `${minutes}:0${seconds}`:`${minutes}:${seconds}`;
    }

    if(winblock.isOverPoint(avatar)){
        state = win}
    // if(avatar.isOverPoint(blocks[i])){
    //     state = win
    //     (blocks[i]).x += rand(1000,2000)
    // }

    ctx.font = "40px Papyrus"
    ctx.fillText(`Ammo: ${score}`,600,50)
    ctx.fillStyle = "black"
    
    if(seconds < 10){
        ctx.fillText(`${minutes}:0${seconds}`,25,50)
    }else{
        ctx.fillText(`${minutes}:${seconds}`,25,50)
    }
    ctx.fillStyle = "white"

    /*-------Level movement threshold----*/
    //if(avatar.x > 500 || avatar.x < 300)
    //{
        //Level movement code
        //level.x -= offset.x;
        //avatar.x -= offset.x;
        //level.y -= offset.y;
        //avatar.y -= offset.y;
    //}

    //----- Camera Code -----------
        //var dx = c.width/2 - avatar.x - 300
        var dy = c.height/2 - avatar.y + 100
        
        // level.x += dx*.05; 
        // avatar.x += dx*.2; 
        // level.y += dy*.15; 
        // avatar.y += dy*.15; 
    //----------------------------*/    

    
    //ground.render();
    //platform.render();
    //wallsky.render();
    avatar.renderImage(appleImage);
    ammoblock.renderImage(bugSpray);
    floorbug.renderImage(floorBugImage);
    winblock.renderImage(orangeImage);
    lightning.renderImage(fireImage);
    winblock.angle += -11;
}