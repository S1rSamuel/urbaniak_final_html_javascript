
var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var fps = 1000/60
var timer = setInterval(main, fps)

function main()
{
    ctx.clearRect(0,0,c.width,c.height); 
    state()
}

//setup
var state;
var score = 0
var button = new GameObject();
var button2 = new GameObject();
var button3 = new GameObject();
var avatar = new GameObject();
var ground = new GameObject();
var platform = new GameObject();
var wall = new GameObject();
var level = new GameObject();
var ammoblock = new GameObject();
var winblock = new GameObject();
var floorbug = new GameObject();
var appleImage = document.getElementById("appleimgg")
var orangeImage = document.getElementById("orangeimgg")
var orangeImage2 = document.getElementById("orange2imgg")
var orangeImage2obj = new GameObject();
var bugImage = document.getElementById("bugimgg")
var floorBugImage = document.getElementById("bugimgg2")

 var blocks = []
 var numberOfBlocks = 50
 
 for(var i = 0; i<numberOfBlocks; i++){
    blocks[i] = new GameObject()
    blocks[i].w = 50
    blocks[i].h = 50
    blocks[i].vy = 0
    blocks[i].vx = 0
    blocks[i].x = rand(1000, 10000)
    blocks[i].y = rand(100, 430)
    blocks[i].color = "black"
}

function init()
{
    state = menu

    avatar.color = `red`;
    avatar.w = 35
    avatar.h = 35
    avatar.x = 100
    avatar.y = 0

    level.x = 0; 
    level.y = 0;

    ground.color = `brown`;
    ground.w = c.width * 200;
    ground.h = c.height*.1;
    ground.y = c.height - ground.h/2;
    ground.world = level

    platform.w = 200;
    platform.h = 34;
    platform.x = 700;
    platform.y = 200;
    platform.color = `tan`
    platform.world = level

    wall.h = 50;
    wall.w = 50;
    wall.color = `green`
    wall.x = avatar.x + 800
    wall.y = 300
    wall.world = level

    ammoblock.h = 50
    ammoblock.w = 50
    ammoblock.x = avatar.x + 600
    ammoblock.y = 420
    ammoblock.color = `black`
    ammoblock.world = level
    
    floorbug.h = 60
    floorbug.w = 80
    floorbug.x = avatar.x + 800
    floorbug.y = 420
    floorbug.color = `black`
    floorbug.world = level

    winblock.h = 50
    winblock.w = 50
    //winblock.x += rand(5000,20000)
    winblock.x += 1000
    winblock.y = 425
    winblock.color = `blue`
    winblock.world = level

    button3.w = 400
    button3.h = 400
    button3.x = 500
    button3.y = 250
    button2.x = 200
    
    orangeImage2obj.h = c.height
    orangeImage2obj.w = c.width
    orangeImage2obj.x = 400
    orangeImage2obj.y = 250
    
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
    }

    for(var i = 0; i<blocks.length; i++){
        blocks[i].x = rand(1000, 10000)
        blocks[i].y = rand(100, 430)
    }
    ctx.font = "60px Papyrus"
    ctx.fillText("FRUIT FUMBLE",5,80)
    ctx.fillStyle = "black"

    ctx.font = "25px Arial"
    ctx.fillText("spacebar to jump, dodge the flies, grab orange to win",5,150)
    ctx.fillStyle = "black"

    button.render()
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
        }
        ctx.font = "60px Arial"
        ctx.fillText("you lose",5,80)
        ctx.fillStyle = "red"
    
        button2.render()
}

function game()
{
     winblock.x --
     ammoblock.x --
     floorbug.x --
     winblock.x --
     ammoblock.x --
     floorbug.x --
     winblock.x --
     ammoblock.x --
     winblock.x --
     ammoblock.x --
     

     for(var i = 0; i<blocks.length; i++){
        blocks[i].move()
        blocks[i].renderImage(bugImage)
        blocks[i].vx = -4
        blocks[i].vy = 0

        if(blocks[i].isOverPoint(avatar)){
            state = lose
            winblock.x += rand(7000,20000)
            floorbug.x += rand(1500,2000)
        }

        if(blocks[i].x < avatar.x - 600){
            blocks[i].x = rand(1000, 10000)
            blocks[i].y = rand(100, 430)
        }
     }       
  
     if(avatar.x > winblock.x + 600){
        winblock.x += rand(5000,20000)
     }

     if(avatar.x > floorbug.x + 600){
        floorbug.x += rand(1000, 1400)
     }
        
    if(sp == true){
        avatar.vy += -.5
    }
    if(sp == true && avatar.canJump == true){
        avatar.canJump = false;
        avatar.vy = -16;
    }
    if(a == true){
        avatar.vx += -1.5;
        avatar.angle += -11;
    }
    if(d == true){
        avatar.vx += 1.5;
        avatar.angle += 11;
    }

    avatar.vx *= .85;
    avatar.vy += .9;
    avatar.move();

    //used to move the level. 
    var offset = {x:avatar.vx, y:avatar.vy}

    while(ground.isOverPoint(avatar.bottom())){
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while(platform.isOverPoint(avatar.bottom()) && avatar.vy >= 0){
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while(wall.isOverPoint(avatar) && avatar.vx >= 0){
        avatar.vx = 0;
        avatar.x--;
        offset.x--;
    }

    if(ammoblock.isOverPoint(avatar)){
        state = lose
    }
    if(winblock.isOverPoint(floorbug)){
        floorbug.x = 1000
    }
    if(floorbug.isOverPoint(avatar)){
        state = lose
        winblock.x += rand(7000,20000)
        floorbug.x += rand(1500,2000)
    }
    if(winblock.isOverPoint(avatar)){
        state = win
        winblock.x += rand(7000,20000)
        floorbug.x += rand(1500,2000)
    }
    // if(avatar.isOverPoint(blocks[i])){
    //     state = win
    //     (blocks[i]).x += rand(1000,2000)
    // }

    ctx.font = "40px Arial"
    ctx.fillText(`Time Alive: ${score}`,5,80)

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

    ground.render();
    platform.render();
    wall.render();
    avatar.renderImage(appleImage);
    ammoblock.render();
    floorbug.renderImage(floorBugImage);
    winblock.renderImage(orangeImage);
    winblock.angle += -11;
}