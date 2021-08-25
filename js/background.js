//------------------------------------------------------------------------------------------------------------
//                                    Background class
//------------------------------------------------------------------------------------------------------------

const backgroundImg = document.createElement('img');
backgroundImg.src = './images/background.png';

class Background {

    constructor (canvasContext, width, height, color) {
        this.ctx = canvasContext;
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw () {
        this.ctx.drawImage(backgroundImg, this.x, this.y, this.width, this.height);
        //this.ctx.fillStyle = this.color;
        //this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}