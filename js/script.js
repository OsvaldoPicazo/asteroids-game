//------------------------------------------------------------------------------------------------------------
//                                    Asteroids Game Tribute
//------------------------------------------------------------------------------------------------------------
// Created by: Osvaldo Picazo
// Keywords: OOP, JS DOM Manipulation



// wait for screen load
window.onload = function () {

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 1: define DOM elements
    //--------------------------------------------------------------------------------------------------------

    // create canvas dom element and its context
    const canvas = document.getElementById("my-canvas");
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    // start button element
    const btnStart = document.getElementById("start-button");

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 2: create variables and objects
    //--------------------------------------------------------------------------------------------------------

    //fixed background values
    const backgroundColor = 'black';

    // fixed ship values
    const shipWidth = 50;
    const shipHeight = 50;
    const shipPosX =  (canvas.width/2) - (shipWidth/2);
    const shipPosY =  (canvas.height/2) + (shipHeight/2);
    const shipColor = 'white';

    // fixed obstacle values
    const obstacleWidth = 100;
    const obstacleHeight = 100;
    const obstacleColor = 'red';

    //changing ship values
    let shipAngle = 0;

    // changing obstacle values
    let obstaclePosX = 0;
    let obstaclePosY = 0;

    //collision flag
    let collision = false;

    //setInterval IDs
    let frameId = null;       // game loop
    let obstaclesId = null;   // obstacles frequency

    //Background, ship and obstacle objects
    const background = new Background (ctx, canvas.width, canvas.height, backgroundColor);
    const ship = new Ship (ctx, shipPosX, shipPosY, shipWidth, shipHeight, shipColor, shipAngle);
    
    let asteroid = new Obstacle (
        ctx,
        obstaclePosX,       // changing
        obstaclePosY,       // changing
        obstacleWidth,
        obstacleHeight,
        obstacleColor
    );

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 3: Functions (game logic)
    //--------------------------------------------------------------------------------------------------------

    // main update function that goes inside the game loop
    function update () {
        updateCanvas();
        updateShip()
        updateObstacles();
    }

    // update canvas
    function updateCanvas () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw();
    }

    // update bird
    function updateShip () {
        //ship.newPos()
        ship.draw();
    }   

    function updateObstacles () {
        //obstaclesArray.forEach((element) => {
            asteroid.draw();
          //ship.move();
          //checkCollision(ship,element)
        //});
    }   

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 4: SetIntervals
    //--------------------------------------------------------------------------------------------------------

    // when start button clicked: loop animation and update
    function startGame () {

        frameId = requestAnimationFrame(startGame);

        console.log("Game started")

        update();
    }

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 5: Event listeners
    //--------------------------------------------------------------------------------------------------------

    btnStart.addEventListener('click', (event) => {
        startGame();
        //console.log(event.currentTarget)
        event.currentTarget.disabled = true;
      });


};