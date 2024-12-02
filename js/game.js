
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
var avatar = new GameObject();
var ground = new GameObject();
var platform = new GameObject();
var wall = new GameObject();
var level = new GameObject();
var obstacle = []


function init()
{
    state = menu

    avatar.color = `green`;
    avatar.w = 50
    avatar.h = 50

    level.x = 0; 
    level.y = 0;

    ground.color = `brown`;
    ground.w = c.width * 5;
    ground.h = c.height*.05;
    ground.y = c.height - ground.h/2;
    ground.world = level

    platform.w = 200;
    platform.h = 34;
    platform.x = 100;
    platform.y = 400;
    platform.color = `tan`
    platform.world = level

    wall.h = 100;
    wall.w = 100;
    wall.color = `purple`
    wall.x = 300
    wall.y = 500
    wall.world = level

}

init();

/*---------------Game Screens (states)----------------*/
function menu()
{
    if(clicked(button))
    {
        state = game;
    }
    ctx.font = "60px Arial"
    ctx.fillText("untilted survival game",5,80)

    ctx.font = "25px Arial"
    ctx.fillText("shoot enemy and survive until 100 score",5,150)

    button.render()
}

function win()
{

}
function lose()
{

}

function game()
{
    if(sp == true && avatar.canJump == true)
    {
        avatar.canJump = false;
        avatar.vy = -20;
    }

    if(a == true)
    {
        avatar.vx += -1;
    }
    if(d == true)
    {
        avatar.vx += 1;
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
    while(wall.isOverPoint(avatar.right()) && avatar.vx >= 0)
    {
        avatar.vx = 0;
        avatar.x--;
        offset.x--;
    }

    ctx.font = "60px Arial"
    ctx.fillText(`Score: ${score}`,5,80)

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
        // var dx = c.width/2 - avatar.x
        // var dy = c.height/2 - avatar.y
        
        // level.x += dx*.05; 
        // avatar.x += dx*.05; 
        // level.y += dy*.15; 
        // avatar.y += dy*.15; 
    //----------------------------*/
    
    for(let i=0;i<obstacle.length; i++)
        {
         obstacle[i].render();
        }

    //obstacle[i].render()
    ground.render();
    platform.render();
    wall.render();
    avatar.render();
    
}



