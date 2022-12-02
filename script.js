document.getElementById('startbutton').addEventListener('click', startGame);
document.getElementById('restart').addEventListener('click', ()=>location.reload());


function startGame(){

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    document.getElementById('start').style.display = 'none';
    document.getElementById('finish').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    //tried below to start game without reloading, didn't work
    // context.clearRect(0,0, canvas.width, canvas.height);

    posX = 0
    posY = canvas.height/2
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
    console.log(
        "clientX: " + event.clientX +
        " - clientY: " + event.clientY);

    //console.log('direction changed');
  
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

function drawGame() {
    // context.fillStyle = '#30D5C8';
    // context.fillRect(0,0,canvas.width, canvas.height);
    const gameBackground = new Image();
    gameBackground.src = 'images/gamebackground.png';
    context.drawImage(gameBackground, 0, 0,canvas.width, canvas.height);

    drawPlayer();
    movePlayer();
}

let posX = 0
let posY = canvas.height/2
let shipWidth = 40;
let shipHeight = 40;
let speedX = 2;
let speedY = 0;
let myInterval;
let score = 0;
let myObstacles = [];

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

        // context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

function createObstacles() {
    let obstacle1W = Math.floor(Math.random() * 400);
    let obstacle1H = Math.floor(Math.random() * 200);

    let obstacle1X = Math.floor(Math.random()*(canvas.width - obstacle1W));
    let obstacle1Y = Math.floor(Math.random()*(canvas.height - obstacle1H));

    let obstacle2W = Math.floor(Math.random() * 400);
    let obstacle2H = Math.floor(Math.random() * 200);

    let obstacle2X = Math.floor(Math.random()*(canvas.width - obstacle2W));
    let obstacle2Y = Math.floor(Math.random()*(canvas.height - obstacle2H));

    myObstacles.push(new Obstacle(obstacle1W,obstacle1H,obstacle1X, obstacle1Y));
    myObstacles.push(new Obstacle(obstacle2W,obstacle2H,obstacle2X, obstacle2Y));

    // console.log(myObstacles);

}

function updateObstacles() {
     for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].update();
      }
    // context.fillStyle = 'magenta';
    // context.fillRect(obs1X,obs1Y, obs1W, obs1H);
    // context.fillStyle = 'yellow';
    // context.fillRect(obs2X,obs2Y, obs2W, obs2H);
    // context.fillStyle = 'green';
    // context.fillRect(obs3X,obs3Y, obs3W, obs3H);
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
        // console.log(myObstacles[j].x);
        // console.log(myObstacles[j].y);
        // console.log(myObstacles[j].width);
        // console.log(myObstacles[j].height);
        // console.log(posX);
        // console.log(posY); 
        if ((checkBoundary(posX, shipWidth, myObstacles[j].x, myObstacles[j].width) 
        && checkBoundary(posY, shipHeight, myObstacles[j].y, myObstacles[j].height))
        || posX > canvas.width-shipWidth || posX < 0 || posY < 0 || posY > canvas.height-shipHeight) {
            console.log('object collision' )
            stopGame();
        }

    // return true;
    }   
    }
    
function stopGame() {
    console.log('clear working')
    clearInterval(myInterval);
    document.getElementById('finish').style.display = 'block';
    document.getElementById('canvas').style.display = 'none';

}