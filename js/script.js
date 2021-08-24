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

    const fps = 30;         // game framerate
    const dt = 1000/30;     // time delta = 33ms

    //fixed background values
    const backgroundColor = 'black';

    // fixed ship values
    const shipWidth = 50;
    const shipHeight = 50;
    const shipPosX =  (canvas.width/2) - (shipWidth/2);
    const shipPosY =  (canvas.height/2) - (shipHeight/2);
    const shipColor = 'white';

    // fixed asteroid values
    const asteroidWidth = 50;
    const asteroidHeight = 50;
    const asteroidColor = 'red';

    //changing ship values
    let shipAngle = 0;     // in degrees

    // changing asteroid values
    let asteroidPosX = 0;
    let asteroidPosY = 0;
    let asteroidDirection = 0;  // direction in degrees, 0 = X-axis 

    // flags
    let collision = false;      // true if asteroid hits ship
    let hit = false;            // true if bullet hits asteroid

    //setInterval IDs
    let frameId = null;       // game loop
    let asteroidsId = null;   // asteroid frequency

    //Background, ship and asteroid objects
    const background = new Background (ctx, canvas.width, canvas.height, backgroundColor);
    const ship = new Ship (ctx, shipPosX, shipPosY, shipWidth, shipHeight, shipColor, shipAngle);

    // asteroids array, empty
    let asteroidsArray = [];

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 3: Functions (game logic)
    //--------------------------------------------------------------------------------------------------------

    // main update function that goes inside the game loop
    function update () {
        updateCanvas();
        updateShip()
        updateAsteroids();

        //test
        console.log(asteroidsArray.length);

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

    // update asteroids
    function updateAsteroids () {
        asteroidsArray.forEach((asteroid) => {
            asteroid.draw();
            asteroid.move();
            checkCollision(ship, asteroid, collision);
            });

        removeAsteroids();
    }
    
    // create random asteroids
    function createAsteroids () {
        randomAsteroidOrigin();
        randomAsteroidDirection();

        let asteroid = new Asteroid (
            ctx,
            asteroidPosX,       // random
            asteroidPosY,       // random
            asteroidWidth,
            asteroidHeight,
            asteroidColor,
            asteroidDirection   // random
        );
        
        // add asteroid to array
        asteroidsArray.push(asteroid);
    }

    // remove obstacle from array: when the go too far away from the canvas
    function removeAsteroids() {
        asteroidsArray = asteroidsArray.filter(function (asteroid) {
            return (asteroid.x > (-2*asteroid.width) &&             // left limit
            asteroid.x < (canvas.width + 2*asteroid.width) &&       // right limit
            asteroid.y > (-2*asteroid.height) &&                    // top limit
            asteroid.y < (canvas.height + 2*asteroid.height));      // bottom limit
        });
    }

    // check for collisions 
    function checkCollision (element, asteroid, event) {
        event = 
        (element.x < asteroid.x + asteroid.width &&         // check left side of element (ship or bullet)
        element.x + element.width > asteroid.x &&           // check right side
        element.y < asteroid.y + asteroid.height &&          // check top side
        element.y + element.height > asteroid.y)            // check bottom side

        if (event) {
            clearInterval(frameId);
            clearInterval(asteroidsId);
            alert("Game Over");
            window.location.reload();
          }

    }

    // generate random asteroid origin coordinates, just outside and around the canvas
    function randomAsteroidOrigin () {
        asteroidPosX = Math.round(Math.random()*(canvas.width+2*asteroidWidth)) - asteroidWidth;            // created just outside the canvas
        if (asteroidPosX + asteroidWidth <= 0 || asteroidPosX >= canvas.width) {
            asteroidPosY = Math.round(Math.random()*(canvas.height+2*asteroidHeight)) - asteroidHeight;     // if ouside canvas width then it is free to randomly create the position y
        } else {
            if (Math.round(Math.random()) * 2 -1 > 0) {
                asteroidPosY = canvas.height                                                                 // if posX inside the canvas, then posY must be outside the canvas height
            }
            else {
                asteroidPosY = 0 - asteroidHeight;
            }
        }
    }

    // generate random direction 
    function randomAsteroidDirection () {
        asteroidDirection = Math.random()*360;
    }

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 4: Start Game function
    //--------------------------------------------------------------------------------------------------------

    // when start button clicked: loop animation update and create asteroids
    function startGame () {

        // game loop
        frameId = setInterval(update, dt);
        //frameId = requestAnimationFrame(startGame);

        // create new asteroids
        asteroidsId = setInterval (createAsteroids, 500);

        console.log("Game started")
    }

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 5: Event listeners
    //--------------------------------------------------------------------------------------------------------

    btnStart.addEventListener('click', (event) => {
        
        // Start the game
        startGame();
        event.currentTarget.disabled = true;

      });


};