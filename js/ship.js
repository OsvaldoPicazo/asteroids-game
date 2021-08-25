//------------------------------------------------------------------------------------------------------------
//                                    Ship class
//------------------------------------------------------------------------------------------------------------

const shipImg = document.createElement('img');
shipImg.src = './images/ship.png';

class Ship {

    constructor (canvasContext, positionX, positionY, width, height, color, angle) {
        this.ctx = canvasContext;
        this.x = positionX;
        this.y = positionY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.angle = angle;
        this.center = [this.x + this.width/2, this.y + this.height/2];  // center of ship

        this.speedX = 0;
        this.speedY = 0;
    }

    draw () {
        this.ctx.drawImage(shipImg, this.x, this.y, this.width, this.height);
        //this.ctx.fillStyle = this.color;
        //this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move () {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    // rotate ship
    rotate () {
        this.ctx.translate(this.center[0], this.center[1]);     // translate origin to center of ship
        this.ctx.rotate(this.angle * Math.PI / 180)             // rotate in radians: degree*PI/180
        this.ctx.translate(0, 0);     // translate origin back to 0,0
    }

}