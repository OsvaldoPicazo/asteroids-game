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
        this.center = [this.x + this.width/2, this.y + this.height/2];  // center of ship
    }

    draw () {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    newPos () {
        // to do: update ship angle
    }

    // rotate ship
    rotate () {
        this.ctx.translate(this.center[0], this.center[1]);     // translate origin to center of ship
        this.ctx.rotate(this.angle * Math.PI / 180)             // rotate in radians: degree*PI/180
        this.ctx.translate(0, 0);     // translate origin back to 0,0
    }

}