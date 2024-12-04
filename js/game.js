
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

 var blocks = []
 var block = new GameObject();
// var numberOfBlocks = 10

function init()
{
    state = menu

    avatar.color = `red`;
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

    killblock.h = 50
    killblock.w = 50
    killblock.x = avatar.x + 600
    killblock.y = 420
    killblock.color = `black`
    killblock.world = level

    winblock.h = 50
    winblock.w = 50
    winblock.x = avatar.x + 300
    winblock.y = 420
    winblock.color = `blue`
    winblock.world = level

    button2.x = 200
    button3.x = 500

    block.h = 50
    block.w = 50
    block.x = avatar.x + 300
    block.y = 420
    block.color = `blue`
    block.world = level    
    
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

     winblock.x --
     wall.x --
     killblock.x --
     winblock.x --
     wall.x --
     killblock.x --
     winblock.x --
     wall.x --
     killblock.x --
     winblock.x --
     wall.x --
     killblock.x --
     winblock.x --
     wall.x --
     killblock.x --
    //  for(var i = 0; i<numberOfBlocks; i++){
    //     blocks[i] = new GameObject()
    //     blocks[i].color = "black"
    //     blocks[i].w = 50
    //     blocks[i].h = 50
    //     blocks[i].x = rand(100,700)
    //     blocks[i].y = 0
    //     blocks[i].world = level
    // }

    //  for(var i = 0; i<blocks.length; i++){
    //     //blocks[i].render()
    //     //blocks[i].render
    //     //reset the blocks if they're offscreen from bottom.
    //     if(blocks[i].y > c.height + blocks[i].h){
    //         blocks[i].y = rand(-c.height, 0)
    //         blocks[i].x = rand(0, c.width)   
    //         //console.log(enemies[i].x, enemies[i].y)
    //         //enemies[i].vy = -3
    //     }

     if(avatar.x > winblock.x + 200){
        winblock.x += rand(1000,2000)
     }
        
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
        winblock.x += rand(1000,2000)
    }

    // if(avatar.x >= winblock.x){
    //     winblock.x = avatar.x + 100
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

    //obstacle[i].render()
    ground.render();
    platform.render();
    wall.render();
    avatar.render();
    killblock.render();
    winblock.render();
    //blocks[i].render()
}