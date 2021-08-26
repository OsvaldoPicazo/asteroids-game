//------------------------------------------------------------------------------------------------------------
//                                    Asteroids Game Tribute
//------------------------------------------------------------------------------------------------------------
// Created by: Osvaldo Picazo
// Keywords: JavaScript, JS, OOP, DOM Manipulation, CSS/HTML



// wait for screen load
window.onload = function () {

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 1: define DOM elements
    //--------------------------------------------------------------------------------------------------------

    // create DOM elements
    const startPage = document.getElementById("start-page");
    const gamePage = document.getElementById("game-page");
    const gameOverPage = document.getElementById("gameOver-page");
    const winPage = document.getElementById("win-page");
    const gameOverScore = document.getElementById("game-over-score");
    const gameWinScore = document.getElementById("game-win-score");

    // create canvas dom element and its context
    const canvas = document.getElementById("my-canvas");
    canvas.height = 768;
    canvas.width = 1024;

    const ctx = canvas.getContext('2d');

    // button elements
    const btnStart = document.getElementById("start-button");
    const btnRestart = document.getElementById("restart-button");
    const btnHome = document.getElementById("home-button");
    const btnWinRestart = document.getElementById("win-restart-button");
    const btnWinHome = document.getElementById("win-home-button");

    // Resize game area to screen size
    // It presents some problems when elements sizes are no proportional to the canvas size
    // it presents problems when not using requestAnimationFrame

    /*
    function resizeGame(){
        const newWidth = window.innerHeight * 0.9
        const newHeight = (1024 / 768) * canvas.height 
        
        canvas.width = newWidth;
        canvas.height = newHeight;

        startPage.width = newWidth;
        startPage.height = newHeight;


        // gamePage.width = 
        // gamePage.height =

        gameOverPage.width = newWidth;
        gameOverPage.height = newHeight;
        
        winPage.width = newWidth;
        winPage.height = newHeight;   
    }
    window.addEventListener("resize", resizeGame)
    */
    
    //--------------------------------------------------------------------------------------------------------
    //                                    Part 2: create variables and objects
    //--------------------------------------------------------------------------------------------------------

    const fps = 30;         // game framerate
    const dt = 1000/fps;    // delta time = 33ms, for the game setInterval
    const winScore = 100;    // score to win
    let score = 0;          // game score

    //fixed background values
    const backgroundColor = 'black';

    // fixed ship values
    const shipWidth = 75;
    const shipHeight = 75;
    const shipPosX =  (canvas.width/2) - (shipWidth/2);
    const shipPosY =  (canvas.height/2) - (shipHeight/2);
    const shipColor = 'white';

    // fixed asteroid values
    const asteroidWidth = 75;
    const asteroidHeight = 75;
    const asteroidColor = 'red';

    // fixed bullet values
    const bulletWidth = 6;
    const bulletHeight = 18;
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
    const asteroidsArray = [];

    // bullets array, empty
    const bulletsArray = [];

    // flags
    let collision = false;      // true if asteroid hits ship
    let hit = false;            // true if bullet hits asteroid

    //setInterval IDs
    let frameId = null;         // game loop
    let asteroidsId = null;     // asteroid
    let bulletsId = null;       // bullet

    //Background, ship and asteroid objects
    const background = new Background (ctx, canvas.width, canvas.height, backgroundColor);
    const ship = new Ship (ctx, shipPosX, shipPosY, shipWidth, shipHeight, shipColor, canvas.width, canvas.height);

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 3: Define Functions (game logic)
    //--------------------------------------------------------------------------------------------------------

    // main update function that goes inside the game loop
    function update () {
        updateCanvas();
        updateShip()
        updateAsteroids();
        updateBullets();
        //checkCollision();
        checkCollisionFromCenter();
        updateScore();

        //test
        //console.log("bullets: ", bulletsArray.length);
        //console.log("asteroids: ", asteroidsArray.length);
        console.log("score: ", score);
        //console.log("ship speed:", ship.speedX, ship.speedY );
    }

    // update canvas
    function updateCanvas () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw();
    }

    // update bird
    function updateShip () {
        ship.draw();
        ship.move();
    }   

    // update asteroids
    function updateAsteroids () {
        asteroidsArray.forEach((asteroid) => {
            asteroid.draw();
            asteroid.move();
            });

        removeAsteroidsOutOfCanvas();
    }

    // update bullets
    function updateBullets () {

        // iterate through each bullet
        bulletsArray.forEach((bullet, i) => {
            bullet.draw();
            bullet.move();
        //-------------------------------------------------------------------- Bug seems to be here
        
            // iterate through each asteroid
            asteroidsArray.forEach((asteroid, j) => {
                checkHit(bullet, asteroid, i, j);       // check collision for each bullet-asteroid combination
            });
         
        //----------------------------------------------------------------------
        
        });

        removeBulletsOutOfCanvas();
    }

    // NOT WORKING, needs to be fixed !!!
    /*
    // function to check if player destroys an asteroid
    function checkHitTwo() {
        for(let i = 0; i < asteroidsArray.length; i++) {
            for(let j = 0; j < bulletsArray.length; j++) {
                const asteroid = asteroidsArray[i];
                const bullet = bulletsArray[j];

                hit = 
                (bullet.x < asteroid.x + asteroid.width &&      // check left side of bullet
                bullet.x + bullet.width > asteroid.x &&         // check right side
                bullet.y < asteroid.y + asteroid.height &&      // check top side
                bullet.y + bullet.height > asteroid.y);         // check bottom side

                // if there is a hit, remove the asteroid and bullet from their array
                if (hit) {
                    bulletsArray.splice(i, 1);
                    asteroidsArray.splice(j, 1);
                    console.log("asteroid: ", asteroid, "hit bullet: ", bullet)
                    hit = false;        // set hit flag back to false
                    score ++;           // increase score
                    if (score === winScore) {
                        winGame();      // if you reach the win score the game finishes
                    }
                }
            }
        }
    }
    */

    //OLD CODE--------------------------------------------------------------------------------------------------
    
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
            asteroidsArray.splice(indexJ, 1);
            hit = false;    // set hit flag back to false
            score ++;       // increase score
            if (score === winScore) {
                winGame();      // if you reach the win score the game finishes
            }
        }
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
    function removeAsteroidsOutOfCanvas() {
        for(let i = 0; i < asteroidsArray.length; i++){
            const asteroid = asteroidsArray[i];
            if (asteroid.x > canvas.width + 1 ||        // right limit
                asteroid.x + asteroid.width < -1 ||     // left limit
                asteroid.y > canvas.height +1 ||        // bottom limit
                asteroid.y + asteroid.height < -1       // upper limit
            ) {
                asteroidsArray.splice(i, 1)
            }
        }
    }

    // needs refactoring with function checkHit
    // check for collisions


    function checkCollision () {
        asteroidsArray.forEach((asteroid) => {
            collision = 
            (ship.x < asteroid.x + asteroid.width &&         // check left side of element (ship or bullet)
            ship.x + ship.width > asteroid.x &&           // check right side
            ship.y < asteroid.y + asteroid.height &&         // check top side
            ship.y + ship.height > asteroid.y);           // check bottom side
    
            // IMPORTANT: if the ship crashes the game is Over
            if (collision) {
                gameOver();
              }
        });
    }

    // alternative function, consider asteroids and spaceship as circles
    function checkCollisionFromCenter () {
        asteroidsArray.forEach((asteroid) => {
            const distanceX = asteroid.center[0] - ship.center[0];
            const distanceY = asteroid.center[1] - ship.center[1];
            const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));    // get distance from center of asteroid to center of spaceship
            
            collision = distance < (asteroid.width/2 + ship.width/2)*0.9;       // if the distance is smaller than the sum of both radius, there is a collision

            // IMPORTANT: if the ship crashes the game is Over
            if (collision) {
                gameOver();
                }
        })
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
    function removeBulletsOutOfCanvas() {
        for(let i =0; i< bulletsArray.length; i++){
            const bullet = bulletsArray[i];
            if(
                bullet.x > canvas.width + 1 ||      // right limit
                bullet.x + bullet.width < -1 ||     // left limit
                bullet.y > canvas.height +1 ||      // bottom limit
                bullet.y + bullet.height < -1       // upper limit
            ) {
                bulletsArray.splice(i,1)
            } 
        }
    }

    function updateScore () {
        ctx.font = "bold 70px Roboto";
        ctx.fillStyle = 'white';
        ctx.fillText(score, canvas.width - 150, 70);
    }

    // handle keydown events
    function keyPressed (event) {
        event.preventDefault();
        switch (event.keyCode) {
            case 38:            // up arrow
                if (ship.speedY > -ship.speedLimit) ship.accelerationY = -0.30;
                else ship.accelerationY = 0;
                //ship.speedY = -6;
            break;
            case 40:            // down arrow
                if (ship.speedY < ship.speedLimit) ship.accelerationY = 0.30;
                else ship.accelerationY = 0;
                //ship.speedY = 6;
            break;
            case 37:            // left arrow
                if (ship.speedX > -ship.speedLimit) ship.accelerationX = -0.30;
                else ship.accelerationX = 0;
                //ship.speedX = -6;
            break;
            case 39:            // right arrow
                if (ship.speedX < ship.speedLimit) ship.accelerationX = 0.30;
                else ship.accelerationX = 0;
                //ship.speedX = 6;
            break;
            case 87:            // "w": shoot front bullets
                if (event.repeat) {
                    break;      // do nothing when event is in repeat mode
                }
                else {
                    //bulletsId = setInterval(createBullets, 250);    // rapid fire bullets 
                    createBullets();                                // create the first bullet
                    break;
                }
        }
    }

    // handle keyup events
    function keyReleased (event) {
        switch (event.keyCode) {
            case 38:            // up arrow
            case 40:            // down arrow
                ship.accelerationY = 0;
                //ship.speedY = 0;
            break;
            case 37:            // left arrow
            case 39:            // right arrow
                ship.accelerationX = 0;
                //ship.speedX = 0;
            break;
            case 87:            // "w": stops shooting bullets
                clearInterval(bulletsId);
            break;
        }
    }

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 4: Define Start Game and restart game functions
    //--------------------------------------------------------------------------------------------------------

    // Initialize Start Screen
    function homePage () {
        startPage.style.display = 'block';      // display html tag as block element
        gamePage.style.display = 'none';        // hide html tag
        gameOverPage.style.display = 'none';
        winPage.style.display = 'none';
        score = 0;
        collision = false;
        hit = false;
        asteroidsArray.splice(0, asteroidsArray.length);
        bulletsArray.splice(0, bulletsArray.length);
        ship.x = shipPosX;
        ship.y = shipPosY;
        ship.speedX = 0;
        ship.speedY = 0;
    }

    // when start button clicked: loop animation update and create asteroids
    function startGame (event) {
        //disable start button 
        //event.currentTarget.disabled = true;
        
        gamePage.style.display = '';
        startPage.style.display = 'none';
        gameOverPage.style.display = 'none';
        winPage.style.display = 'none';

        // game loop
        frameId = setInterval(update, dt);

        // create new asteroids
        asteroidsId = setInterval (createAsteroids, 150);

        //test
        console.log("Game started")
    }

    function restartGame (event) {
        //event.currentTarget.disabled = true;
        score = 0;
        collision = false;
        hit = false;
        asteroidsArray.splice(0, asteroidsArray.length);
        bulletsArray.splice(0, bulletsArray.length);
        ship.x = shipPosX;
        ship.y = shipPosY;
        ship.speedX = 0;
        ship.speedY = 0;
        startGame();
    }

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 5: Define Game Over and Win functions
    //--------------------------------------------------------------------------------------------------------

    function gameOver () {
        if (collision) {
            clearInterval(frameId);
            clearInterval(asteroidsId);
            clearInterval(bulletsId);
            gameOverPage.style.display = 'block'
            gamePage.style.display = 'none';
            gameOverScore.innerText = `Score: ${score}`;
            //alert("Game Over");
            //window.location.reload();
        }
    }

    function winGame () {
        clearInterval(frameId);
        clearInterval(asteroidsId);
        clearInterval(bulletsId);
        gamePage.style.display = 'none';
        winPage.style.display = 'block';
        gameWinScore.innerText = `You reached ${score} points`;
        //alert(`You win! ${winScore} asteroids destroyed`);
        //window.location.reload();
    }

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 6: Set Event listeners
    //--------------------------------------------------------------------------------------------------------

    // Start game when "start" button is clicked
    btnStart.addEventListener('click', startGame);

    // restart game after game over
    btnRestart.addEventListener('click', restartGame);

    // go to home screen after game over
    btnHome.addEventListener('click', homePage);

    // restart game after game win
    btnWinRestart.addEventListener('click', restartGame);

    // go to home screen after game win
    btnWinHome.addEventListener('click', homePage);

    // keydown events
    window.addEventListener('keydown', keyPressed);

    // key up events
    window.addEventListener('keyup', keyReleased);

    //--------------------------------------------------------------------------------------------------------
    //                                    Part 6: Run Game!!!!
    //--------------------------------------------------------------------------------------------------------

    homePage();



};