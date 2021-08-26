# Asteroids Game
Play the game here: </br> 
[Asteroids Game](https://osvaldopicazo.github.io/asteroids-game/)

## Description
Shoot the asteroids and try to stay alive! </br> 

A rendition to the old school arcade game. Asteroids come at you from all directions, move your spaceship to avoid them! Master your spaceship driving skills: acceleration and inertia are hard to master. Destroy as many asteroids as possible! Can you destroy 100s of them?

## MVP
- Player moves horizontally and vertically
- Acceleration/Inertia mechanics in the spaceship motion
- Player shoots bullets
- Asteroids are generated randomly around the gaming area
- Asteroids travel in random directions
- When the player gets hit, the game is over
- When the player hits an asteroid, they get 1 point
- When the player reaches 100 points, the game ends

## Backlog
- Choose your Characters/spaceships=
- Ability to turn/rotate spaceship, as in the original Asteroids game
- Difficulty levels (increase asteroid rate of creation, speed, etc.)
- Different asteroid sizes and speeds
- Different weapons
- Level Ups (health, special weapons, etc.)
- Store highest scores
- Add sound effects and animations

## Data Structure
### script.js
- homePage(){}
- startGame(){}
- gameOver(){}
- winGame(){}
- restartGame(){} </br>

- update(){}
- updateCanvas(){}
- updateShip(){}
- updateAsteroids(){}
- updateBullets(){}
- checkHit(){}
- checkCollisionFromCenter(){}
- updateScore(){}
### ship.js
- draw(){}
- move(){}
### asteroid.js
- draw(){}
- move(){}
### bullet.js
- draw(){}
- move(){}
### background.js
- draw(){}

## States and Transitions
- Home Screen
- Game Screen
- Game Over Screen
- Win Game Screen

## Task
- script.js - set DOM elements
- script.js - set variables 
- script.js - set event listeners
- script.js - homePage
- script.js - startGame
- script.js - createAsteroids 
- script.js - update(loop)
- script.js - clearRect
- background.js - draw
- ship.js - draw
- ship.js - move
- asteroid.js - draw
- asteroid.js - move
- bullet.js - draw
- bullet.js - move
- script.js - checkHit
- script.js - checkCollision
- script.js - updateScore
- script.js - gameOver
- script.js - winGame
- script.js - restartGame

## Additional Links

### Trello

[POM - Asteroids Game](https://trello.com/b/PHylsOBC/pom-asteroids-game)

### Slides



