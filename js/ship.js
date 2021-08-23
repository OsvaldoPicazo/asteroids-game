//------------------------------------------------------------------------------------------------------------
//                                    Ship class
//------------------------------------------------------------------------------------------------------------

class Ship {

    constructor (canvasContext, positionX, positionY, width, height, color, angle) {
        this.ctx = canvasContext;
        this.x = positionX;
        this.y = positionY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.angle = angle;
    }

    draw () {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    newPos () {
        // to do: update ship angle
    }

}