
class Game {
    constructor(){
        this.ctx = null;
        this.bg=null;
        // this.ship=null;
    }

    startGame(){
        const canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');

        const background = new Image();
        background.src = './images/sea.jpeg';

        const ship = new Ship(30, 30, 20, 100);
        // this.player = ship;

        ship.createShip();

        background.onload = () => {
            this.bg = background;
            this.updateCanvas();
        }
		
    }

    drawPlayer(){
        this.ctx.drawImage(this.player.img, )
    }
    updateCanvas() {
        setInterval(()=> {
            this.ctx.clearRect(0,0,600,300)
            this.ctx.drawImage(this.bg,0,0,600,300)
        })
    }
}



class Ship {
    constructor(width, height, x, y){
        this.width = width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.img = this.createShip();
    }
    createShip() {
        const ship = new Image();
        ship.src = './images/ship1.png';
        game.ctx.drawImage(ship, 30,30);
        return ship;
    }
}

const game = new Game();
game.startGame();








// const sea = {
//     canvas: document.getElementById('canvas'),
//     start: function() {
//         // this.canvas.width=600;
//         // this.canvas.height=300;
//         this.canvas.style.backgroundColor= '#30D5C8';
//         this.context = this.canvas.getContext('2d');
//     }
// }
// // below part was to test to see if I have the canvas on the screen
// sea.start();
// const ctx = sea.context;
// ctx.fillStyle = 'purple';
// ctx.fillRect(100, 100, 100, 100);











