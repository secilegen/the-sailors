document.getElementById('startbutton').addEventListener('click', startGame);
document.getElementById('restart').addEventListener('click', ()=>location.reload());

let posX = 0
let posY = 0;
let shipWidth = 40;
let shipHeight = 40;
let speedX = 2;
let speedY = 0;
let myInterval;
let score = 0;
let myObstacles = [];

function startGame(){

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    document.getElementById('start').style.display = 'none';
    document.getElementById('finish').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    //tried below to start game without reloading, didn't work
    // context.clearRect(0,0, canvas.width, canvas.height);

    posX = 0
    posY = canvas.height*2/3
    speedX = 2;
    speedY = 0;

    myInterval = setInterval(updateGame, 1000/10);
    
    canvas.addEventListener('click', changeDirection)
    createObstacles();

}

function updateGame() {
         drawGame();
        updateObstacles();
        drawPlayer();
        movePlayer();
        CrashCheck();
        calculateScore();
}

function changeDirection(event) {
    //FOR LATER if click did not happen in boundary of ship, do nothing
    // console.log(
    //     "clientX: " + event.clientX +
    //     " - clientY: " + event.clientY);

    //console.log('direction changed');
    if (score>300) {
        if (speedX > 0) { 
            speedX = 0;
            speedY = 4;
        }
        else if (speedX < 0) {
            speedX = 0;
            speedY = -4;
        }
        else if (speedY < 0) {
            speedX = 4;
            speedY = 0;
        }
        else if (speedY > 0) {
            speedX = -4;
            speedY = 0;
        }
    }
    else {
        if (speedX > 0) { 
            speedX = 0;
            speedY = 2;
        }
        else if (speedX < 0) {
            speedX = 0;
            speedY = -2;
        }
        else if (speedY < 0) {
            speedX = 2;
            speedY = 0;
        }
        else if (speedY > 0) {
            speedX = -2;
            speedY = 0;
        }
    }
}

function drawGame() {
    // context.fillStyle = '#30D5C8';
    // context.fillRect(0,0,canvas.width, canvas.height);
    const gameBackground = new Image();
    gameBackground.src = 'images/gamebackground.png';
    context.drawImage(gameBackground, 0, 0,canvas.width, canvas.height);

    drawPlayer();
    movePlayer();
}

function drawPlayer() {
    // context.fillStyle = 'black';
    // context.fillRect(posX,posY, shipWidth, shipHeight);
    const img = new Image();
    img.src = 'images/sailing-boat.png';
    context.drawImage(img, posX, posY, shipWidth, shipHeight);

}

function movePlayer(){
    posX += speedX;
    posY += speedY;

}

class Obstacle {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height; 
        // this.color = color;
        this.x = x;
        this.y = y;
    }
    update() {
        const obstacleBackground = new Image();
        obstacleBackground.src = 'images/palm-tree.png';
        context.fillStyle = context.createPattern(obstacleBackground, 'repeat');
        // context.fillRect(0,0,canvas.width, canvas.height);
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

function createObstacles() {

    //create obstacles randomly by dividing the canvas in 3 on the X axis
    let obstacle1W = Math.floor(Math.random() * (400-100+1) +100);
    let obstacle1H = Math.floor(Math.random() * (300-150+1) +150);

    let obstacle1X = Math.floor(Math.random()*(400-100) +100);
    let obstacle1Y = Math.floor(Math.random()*500)-obstacle1H;

    let obstacle2W = Math.floor(Math.random() * (400-100 +1) + 100);
    let obstacle2H = Math.floor(Math.random() * (300-150+1) +150);

    let obstacle2X = Math.floor(Math.random()* (800 -400 +1) +400) - obstacle2W;
    let obstacle2Y = Math.floor(Math.random()*(canvas.height - obstacle2H));

    let obstacle3W = Math.floor(Math.random() * (400-100 +1) + 100);
    let obstacle3H = Math.floor(Math.random() * (300-150+1) +150);

    let obstacle3X = Math.floor(Math.random()*(1200 -800 +1) +800) - obstacle3W;
    let obstacle3Y = Math.floor(Math.random()*(canvas.height - obstacle3H));

    myObstacles.push(new Obstacle(obstacle1W,obstacle1H,obstacle1X, obstacle1Y));
    myObstacles.push(new Obstacle(obstacle2W,obstacle2H,obstacle2X, obstacle2Y));
    myObstacles.push(new Obstacle(obstacle3W,obstacle3H,obstacle3X, obstacle3Y));

    // console.log(`obs 1 is H: ${obstacle1H} W: ${obstacle1W} X: ${obstacle1X} Y: ${obstacle1Y}`);
    // console.log(`obs 1 is H: ${obstacle2H} W: ${obstacle2W} X: ${obstacle2X} Y: ${obstacle2Y}`);
    // console.log(`obs 1 is H: ${obstacle3H} W: ${obstacle3W} X: ${obstacle3X} Y: ${obstacle3Y}`);
    // console.log(myObstacles);
}

function updateObstacles() {
     for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].update();
      }
}

function calculateScore() {
    score++;
    context.fillStyle = 'black';
    context.fillText(`Score = ${score} points`, 1100, 30)
}

function isShipClicked(clickX, clickY, shipX, shipWidth, shipY, shipHeight) {
    //FOR LATER calculate if click hits the ship
    return false
}

function checkBoundary(ship, shipSize, boundaryStart, boundarySize) {
    return ship +shipSize >= boundaryStart 
        && ship <= boundaryStart + boundarySize
}

function CrashCheck() {
    for(let j=0; j < myObstacles.length; j++ ) {
        
        if ((checkBoundary(posX, shipWidth, myObstacles[j].x, myObstacles[j].width) 
        && checkBoundary(posY, shipHeight, myObstacles[j].y, myObstacles[j].height))
        || posX > canvas.width-shipWidth || posX < 0 || posY < 0 || posY > canvas.height-shipHeight) {
            stopGame();
        }
    }   
    }
    
function stopGame() {
    clearInterval(myInterval);
    document.getElementById('finish').style.display = 'block';
    document.getElementById('canvas').style.display = 'none';
}