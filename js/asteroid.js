//------------------------------------------------------------------------------------------------------------
//                                    Asteroid class
//------------------------------------------------------------------------------------------------------------

class Asteroid {

    constructor (canvasContext, positionX, positionY, width, height, color, direction) {
        this.ctx = canvasContext;
        this.x = positionX;
        this.y = positionY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.direction = direction;

        this.speedX = 1;
        this.speedY = 1;
    }

    draw () {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move () {
        this.x += (this.speedX) * Math.cos(this.direction * Math.PI / 180);
        this.y += -(this.speedY) * Math.sin(this.direction * Math.PI / 180);
    }

}