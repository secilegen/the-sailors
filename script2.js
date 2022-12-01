document.getElementById('startbutton').addEventListener('click', startGame);
document.getElementById('restart').addEventListener('click', startGame);


function startGame(){
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    document.getElementById('start').style.display = 'none';
    document.getElementById('finish').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    
    //I had to assign an ID in order to clear the interval
    // setInterval(() => {
    //     drawGame();
    //     createObstacles();
    //     drawPlayer();
    //     movePlayer();
    //     crashCheck();
    // }, 1000/2)


    posX = 0
    posY = canvas.height/2
    speedX = 2;
    speedY = 0;

    myInterval = setInterval(updateGame, 1000/10);
    
    canvas.addEventListener('click', changeDirection)
   
}

function updateGame() {
         drawGame();
        createObstacles();
        drawPlayer();
        movePlayer();
        obs1CrashCheck();
        calculateScore();
}

function changeDirection(event) {
    //FOR THURSDAY if click did not happen in boundary of ship, do nothing
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
    context.fillStyle = '#30D5C8';
    context.fillRect(0,0,canvas.width, canvas.height);

    drawPlayer();
    movePlayer();
}

let posX = 0
let posY = canvas.height/2
let speedX = 2;
let speedY = 0;
let obs1X = 0;
let obs1Y = 100;
let obs2X = 400;
let obs2Y = 300;
let obs3X = 800;
let obs3Y = 200;
let obs1W = 100;
let obs1H = 50;
let obs2W = 70;
let obs2H = 250;
let obs3W = 300;
let obs3H = 200;
let myInterval;
let score = 0;


obs1X = Math.random() * (canvas.width - obs1W);
obs1Y = Math.random() * (canvas.height - obs1H)


function drawPlayer() {
    context.fillStyle = 'black';
    context.fillRect(posX,posY,30,30);
}

function movePlayer(){
    posX += speedX;
    posY += speedY;

}

function createObstacles() {
    context.fillStyle = 'magenta';
    context.fillRect(obs1X,obs1Y, obs1W, obs1H);
    context.fillStyle = 'yellow';
    context.fillRect(obs2X,obs2Y, obs2W, obs2H);
    context.fillStyle = 'green';
    context.fillRect(obs3X,obs3Y, obs3W, obs3H);
}
function calculateScore() {
    score++;
    context.fillStyle = 'black';
    context.fillText(`Score = ${score} points`, 1100, 30)
}

function isShipClicked(clickX, clickY, shipX, shipWidth, shipY, shipHeight) {
    //FOR THURSDAY calculate if click hits the ship
    return false
}

function checkBoundary(ship, shipSize, boundaryStart, boundarySize) {
    return ship +shipSize >= boundaryStart 
        && ship <= boundaryStart + boundarySize
}

function obs1CrashCheck() {
    
    if (checkBoundary(posX,30, obs1X, obs1W) 
        && checkBoundary(posY, 30, obs1Y, obs1H)){
            console.log('object collision' )
            stopGame();
        }

    return true;
    // if ((posY < (obs1Y+obs1H)) && (posX<(obs1X+obs1W)) ) {
    //     console.log('object collisio')
    //     stopGame();
    // }
    // return true;
    //console.log(`posY is ${posY} and pos obs is ${obs1Y+obs1H}`)
}

function stopGame() {
    console.log('clear working')
    clearInterval(myInterval);
    document.getElementById('finish').style.display = 'block';
    document.getElementById('canvas').style.display = 'none';

}

// startGame();

