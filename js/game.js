
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
var killblock = new GameObject();
var winblock = new GameObject();


function init()
{
    state = menu

    avatar.color = `red`;
    avatar.w = 40
    avatar.h = 40
    avatar.x = 0

    level.x = 0; 
    level.y = 0;

    ground.color = `brown`;
    ground.w = c.width * 200;
    ground.h = c.height*.1;
    ground.y = c.height - ground.h/2;
    ground.world = level

    platform.w = 200;
    platform.h = 34;
    platform.x = 100;
    platform.y = 100;
    platform.color = `tan`
    platform.world = level

    wall.h = 50;
    wall.w = 50;
    wall.color = `green`
    wall.x = 500
    //wall.y = 425
    wall.y = 300
    wall.world = level

    killblock.h = 50
    killblock.w = 50
    killblock.x = 1500
    killblock.y = 425
    killblock.color = `black`
    killblock.world = level

    winblock.h = 50
    winblock.w = 50
    winblock.x = 1200
    winblock.y = 425
    winblock.color = `blue`
    winblock.world = level

    button2.x = 200
    button3.x = 500

}

init();

/*---------------Game Screens (states)----------------*/
function menu()
{
    if(clicked(button))
    {
        avatar.x = -4000
        state = game;
    }
    ctx.font = "60px Arial"
    ctx.fillText("untilted running game",5,80)

    ctx.font = "25px Arial"
    ctx.fillText("press spacebar to jump. dont get rekt.",5,150)

    button.render()
}

function win()
{
    if(clicked(button3))
        {
            state = menu;
        }
        ctx.font = "60px Arial"
        ctx.fillText("you win",5,80)
    
        button3.render()
}
function lose()
{
    if(clicked(button2))
        {
            state = menu;
        }
        ctx.font = "60px Arial"
        ctx.fillText("you lose",5,80)
    
        button2.render()
}

function game()
{
    avatar.vx = 10
        
    if(sp == true && avatar.canJump == true)
    {
        avatar.canJump = false;
        avatar.vy = -15;
    }

    if(a == true)
    {
        avatar.vx += -25;
    }
    if(d == true)
    {
        avatar.vx += 25;
    }

    avatar.vx *= .85;
    avatar.vy += 1;
    avatar.move();

    //used to move the level. 
    var offset = {x:avatar.vx, y:avatar.vy}

    while(ground.isOverPoint(avatar.bottom()))
    {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while(platform.isOverPoint(avatar.bottom()) && avatar.vy >= 0)
    {
        avatar.vy = 0;
        avatar.y--;
        offset.y--;
        avatar.canJump = true;
    }
    while(wall.isOverPoint(avatar) && avatar.vx >= 0)
    {
        avatar.vx = 0;
        avatar.x--;
        offset.x--;
    }

    if(killblock.isOverPoint(avatar)){
        state = lose
    }
    if(winblock.isOverPoint(avatar)){
        state = win
    }

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
        var dx = c.width/2 - avatar.x - 300
        var dy = c.height/2 - avatar.y + 100
        
        level.x += dx*.05; 
        avatar.x += dx*.2; 
        level.y += dy*.15; 
        avatar.y += dy*.15; 
    //----------------------------*/    

    //obstacle[i].render()
    ground.render();
    platform.render();
    wall.render();
    avatar.render();
    killblock.render();
    winblock.render();
}



