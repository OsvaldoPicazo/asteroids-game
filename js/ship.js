//------------------------------------------------------------------------------------------------------------
//                                    Ship class
//------------------------------------------------------------------------------------------------------------

const shipImg = document.createElement('img');
shipImg.src = './images/ship.png';

class Ship {

    constructor (canvasContext, positionX, positionY, width, height, color, canvasWidth, canvasHeight) {
        this.ctx = canvasContext;
        this.x = positionX;
        this.y = positionY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.center = [this.x + this.width/2, this.y + this.height/2];  // center of ship

        this.speedX = 0;
        this.speedY = 0;
        this.speedLimit = 10;

        this.accelerationX = 0;
        this.accelerationY = 0;

        this.previousX = 0;
        this.previousY = 0;
    }

    draw () {
        this.ctx.drawImage(shipImg, this.x, this.y, this.width, this.height);
        //this.ctx.fillStyle = this.color;
        //this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move () {
        this.speedX += this.accelerationX;
        this.speedY += this.accelerationY;

        // check if spaceship is inside the canvas
        if (
            this.x + this.width < this.canvasWidth &&   // right side of spaceship with right border of canvas
            this.x > 0 &&                               // left side with left border of canvas
            this.y > 0 &&                               // top side of ship with top side of canvas
            this.y + this.height < this.canvasHeight)   // bottom side of ship with bottom side of canvas
            {
                this.previousX = this.x;    
                this.previousY = this.y;
                this.x += this.speedX;
                this.y += this.speedY;
            } else {
                this.x = this.previousX;        // if space ship is outside, move it to its previous position and set velocity to zero
                this.y = this.previousY;
                this.speedX = 0;
                this.speedY = 0;
            }

        this.center = [this.x + this.width/2, this.y + this.height/2];
    }

    // rotate ship
    rotate () {
        this.ctx.translate(this.center[0], this.center[1]);     // translate origin to center of ship
        this.ctx.rotate(this.angle * Math.PI / 180)             // rotate in radians: degree*PI/180
        this.ctx.translate(0, 0);     // translate origin back to 0,0
    }

}