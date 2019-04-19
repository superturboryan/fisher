let mainDiv = document.getElementById('app')

let gameEngine = new Engine(mainDiv)

let scoreLabel = document.getElementById('enemyLabel')
scoreLabel.style.position = "absolute"
scoreLabel.style.top = (ENEMY_HEIGHT * 2) + GAME_HEIGHT + 10 + "px"

let startLabel = new Text(mainDiv, 250, ENEMY_HEIGHT / 2, 60)

startLabel.update("Press space to begin!")

let timeLabel = new Text(mainDiv, 850, 25, 30);

let interval;

let refreshInterval;

let refreshPlayer = () => {

   gameEngine.player.domElement.src === "file:///Users/ryan/decode/my-workshops/nyan-cat/images/fish.png" ?
      gameEngine.player.domElement.src = "file:///Users/ryan/decode/my-workshops/nyan-cat/images/fish2.png"
      : gameEngine.player.domElement.src = "file:///Users/ryan/decode/my-workshops/nyan-cat/images/fish.png"

   console.log("Current player image: ", gameEngine.player.domElement.src)
}

let startGame = () => {
   startLabel.update("")
   clearInterval(interval)
   clearInterval(refreshInterval)
   ENEMY_COUNT = 5;
   updateScoreLabel();
   gameEngine.restartTimer();
   gameEngine.gameLoop();
   refreshInterval = setInterval(refreshPlayer, 1500)
   interval = setInterval(incrementEnemyCount, 3000);
}


let keydownHandler = event => {
   if (event.code === "ArrowLeft") {
      gameEngine.player.moveLeft()
   }
   if (event.code === "ArrowRight") {
      gameEngine.player.moveRight()
   }
   if (event.code === "ArrowUp") {
      gameEngine.player.moveUp()
   }
   if (event.code === "ArrowDown") {
      gameEngine.player.moveDown()
   }
   if (event.code === "Space") {
      gameEngine.resetPlayer();
      startGame()
   }

}

//Disable normal arrow controls
window.addEventListener("keydown", event => {
   // space and arrow keys
   if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
      event.preventDefault();
   }
}, false);

document.addEventListener("keydown", keydownHandler)





