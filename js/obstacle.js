//------------------------------------------------------------------------------------------------------------
//                                    Obstacle class
//------------------------------------------------------------------------------------------------------------

class Obstacle {

    constructor (canvasContext, positionX, positionY, width, height, color) {
        this.ctx = canvasContext;
        this.x = positionX;
        this.y = positionY;
        this.width = width;
        this.height = height;
        this.color = color;
        
        this.speedX = 0;
        this.speedY = 0;
    }

    draw () {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    newPos () {
        this.x += this.speedX;
        this.y += this.speedY;
    }

}