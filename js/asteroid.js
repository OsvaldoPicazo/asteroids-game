//------------------------------------------------------------------------------------------------------------
//                                    Asteroid class
//------------------------------------------------------------------------------------------------------------

const asteroidImg = document.createElement('img');
asteroidImg.src = '../images/asteroid.png';

class Asteroid {

    constructor (canvasContext, positionX, positionY, width, height, color, direction) {
        this.ctx = canvasContext;
        this.x = positionX;
        this.y = positionY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.direction = direction;

        this.speedX = 6;
        this.speedY = 6;
    }

    draw () {
        this.ctx.drawImage(asteroidImg, this.x, this.y, this.width, this.height);
        //this.ctx.fillStyle = this.color;
        //this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move () {
        this.x += (this.speedX) * Math.cos(this.direction * Math.PI / 180);
        this.y += -(this.speedY) * Math.sin(this.direction * Math.PI / 180);
    }

}