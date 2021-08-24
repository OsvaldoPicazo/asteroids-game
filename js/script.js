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
    const dt = 1000/fps;     // delta time = 33ms, for the game setInterval

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

    // fixed bullet values
    const bulletWidth = 10;
    const bulletHeight = 20;
    const bulletColor = 'yellow';

    //changing ship values
    let shipAngle = 0;     // in degrees

    // changing asteroid values
    let asteroidPosX = 0;
    let asteroidPosY = 0;
    let asteroidDirection = 0;  // direction in degrees, 0 = X-axis

    // changing bullet values
    let bulletPosX = 0;
    let bulletPosY = 0;

    // asteroids array, empty
    let asteroidsArray = [];

    // bullets array, empty
    let bulletsArray = [];

    // flags
    let collision = false;      // true if asteroid hits ship
    let hit = false;            // true if bullet hits asteroid

    //setInterval IDs
    let frameId = null;         // game loop
    let asteroidsId = null;     // asteroid
    let bulletsId = null;       // bullet

    //Background, ship and asteroid objects
    const background = new Background (ctx, canvas.width, canvas.height, backgroundColor);
    const ship = new Ship (ctx, shipPosX, shipPosY, shipWidth, shipHeight, shipColor, shipAngle);

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 3: Functions (game logic)
    //--------------------------------------------------------------------------------------------------------

    // main update function that goes inside the game loop
    function update () {
        updateCanvas();
        updateShip()
        updateAsteroids();
        updateBullets();

        //test
        console.log("bullets in array: ", bulletsArray.length);
    }

    // update canvas
    function updateCanvas () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw();
    }

    // update bird
    function updateShip () {
        ship.move()
        ship.draw();
    }   

    // update asteroids
    function updateAsteroids () {
        asteroidsArray.forEach((asteroid) => {
            asteroid.draw();
            asteroid.move();
            checkCollision(ship, asteroid);
            });

        removeAsteroids();
    }

    function updateBullets () {
        bulletsArray.forEach((bullet, i) => {
            bullet.draw();
            bullet.move();
            asteroidsArray.forEach((asteroid, j) => {
                checkHit(bullet, asteroid, i, j);
            });
        });

        removeBullets();
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

    // needs refactoring with function checkHit
    // check for collisions
    function checkCollision (element, asteroid) {
        collision = 
        (element.x < asteroid.x + asteroid.width &&         // check left side of element (ship or bullet)
        element.x + element.width > asteroid.x &&           // check right side
        element.y < asteroid.y + asteroid.height &&         // check top side
        element.y + element.height > asteroid.y);           // check bottom side

        // IMPORTANT: if the ship crashes the game is Over
        if (collision) {
            gameOver();
          }

    }

    // generate random asteroid origin coordinates, just outside and around the canvas
    function randomAsteroidOrigin () {
        asteroidPosX = Math.round(Math.random()*(canvas.width+2*asteroidWidth)) - asteroidWidth;            // randomly created just outside the canvas
        if (asteroidPosX + asteroidWidth <= 0 || asteroidPosX >= canvas.width) {
            asteroidPosY = Math.round(Math.random()*(canvas.height+2*asteroidHeight)) - asteroidHeight;     // if posX outside canvas  then it is free to randomly create the position y
        } else {
            if (Math.round(Math.random()) * 2 -1 > 0) {
                asteroidPosY = canvas.height                                                                 // if posX inside the canvas, then posY must be outside the canvas height
            }
            else {
                asteroidPosY = 0 - asteroidHeight;
            }
        }
    }

    // generate random asteroid direction 
    function randomAsteroidDirection () {
        asteroidDirection = Math.random()*360;
    }


    // create bullets
    function createBullets () {
        
        // bullet origin position on front part of ship
        bulletPosX = ship.x + ship.width/2 - bulletWidth/2;
        bulletPosY = ship.y;

        let bullet = new Bullet (
            ctx,
            bulletPosX,   
            bulletPosY,      
            bulletWidth,
            bulletHeight,
            bulletColor
        );
        
        // add bullets to its array
        bulletsArray.push(bullet);
    }

    // remove bullets from the array when they go outside the canvas
    function removeBullets() {
        bulletsArray = bulletsArray.filter(function (bullet) {
            return (bullet.x > (-2*bullet.width) &&             // left limit
            bullet.x < (canvas.width + 2*bullet.width) &&       // right limit
            bullet.y > (-2*bullet.height) &&                    // top limit
            bullet.y < (canvas.height + 2*bullet.height));      // bottom limit
        });
    }

    // function to check if player destroys an asteroid
    function checkHit (element, asteroid, indexI, indexJ) {
        hit = 
        (element.x < asteroid.x + asteroid.width &&         // check left side of element (ship or bullet)
        element.x + element.width > asteroid.x &&           // check right side
        element.y < asteroid.y + asteroid.height &&         // check top side
        element.y + element.height > asteroid.y);           // check bottom side

        // if there is a hit, remove the asteroid and bullet from their array
        if (hit) {
            bulletsArray.splice(indexI, 1);
        
            // remove asteroid too
            asteroidsArray.splice(indexJ, 1);

            // set hit flag back to false
            hit = false;
          };
    }

    // handle keydown events
    function keyPressed (event) {
        event.preventDefault();
        switch (event.keyCode) {
            case 38:            // up arrow
                ship.speedY = -4;
            break;
            case 40:            // down arrow
                ship.speedY = 4;
            break;
            case 37:            // left arrow
                ship.speedX = -4;
            break;
            case 39:            // right arrow
                ship.speedX = 4;
            break;
            case 87:            // "w": shoot front bullets
                if (event.repeat) {
                    break;      // do nothing when event is in repeat mode
                }
                else {
                    createBullets();                                // create the first bullet
                    bulletsId = setInterval(createBullets, 250);    // rapid fire bullets 
                    break;
                }
        }
    }

    // handle keyup events
    function keyReleased (event) {
        switch (event.keyCode) {
            case 38:            // up arrow
            case 40:            // down arrow
                ship.speedY = 0;
            break;
            case 37:            // left arrow
            case 39:            // right arrow
                ship.speedX = 0;
            break;
            case 87:            // "w": stops shooting bullets
                clearInterval(bulletsId);
            break;
        }
    }

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 4: Start Game function
    //--------------------------------------------------------------------------------------------------------

    // when start button clicked: loop animation update and create asteroids
    function startGame (event) {
        //disable start button 
        event.currentTarget.disabled = true;

        // game loop
        frameId = setInterval(update, dt);

        // create new asteroids
        asteroidsId = setInterval (createAsteroids, 500);

        //test
        console.log("Game started")
    }

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 5: Game Over function
    //--------------------------------------------------------------------------------------------------------

    function gameOver () {
        clearInterval(frameId);
        clearInterval(asteroidsId);
        clearInterval(bulletsId);
        alert("Game Over");
        window.location.reload();
    }

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 6: Event listeners
    //--------------------------------------------------------------------------------------------------------

    // Start game when "start" button is clicked
    btnStart.addEventListener('click', startGame);

    // keydown events
    window.addEventListener('keydown', keyPressed);

    // key up events
    window.addEventListener('keyup', keyReleased);





};