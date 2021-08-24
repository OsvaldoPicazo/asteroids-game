//------------------------------------------------------------------------------------------------------------
//                                    Bullet class
//------------------------------------------------------------------------------------------------------------

class Bullet {

    constructor (canvasContext, positionX, positionY, width, height, color) {
        this.ctx = canvasContext;
        this.x = positionX;
        this.y = positionY;
        this.width = width;
        this.height = height;
        this.color = color;

        this.center = [this.x + this.width/2, this.y + this.height/2];  // center of ship

        this.speedX = 15;
        this.speedY = 15;
    }

    draw () {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move () {
        //this.x += this.speedX;
        this.y -= this.speedY;      // shoot upwards
    }

}