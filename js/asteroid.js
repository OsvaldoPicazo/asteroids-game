//------------------------------------------------------------------------------------------------------------
//                                    Asteroid class
//------------------------------------------------------------------------------------------------------------

const asteroidImg = document.createElement('img');
asteroidImg.src = './images/asteroid.png';

class Asteroid {

    constructor (canvasContext, positionX, positionY, width, height, color, direction) {
        this.ctx = canvasContext;
        this.x = positionX;
        this.y = positionY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.direction = direction;
        this.center = [this.x + this.width/2, this.y + this.height/2];  // center of ship

        this.speedX = 4;
        this.speedY = 4;
    }

    draw () {
        this.ctx.drawImage(asteroidImg, this.x, this.y, this.width, this.height);
        //this.ctx.fillStyle = this.color;
        //this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move () {
        this.x += (this.speedX) * Math.cos(this.direction * Math.PI / 180);
        this.y += -(this.speedY) * Math.sin(this.direction * Math.PI / 180);
        this.center = [this.x + this.width/2, this.y + this.height/2];
    }

}