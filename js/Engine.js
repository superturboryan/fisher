class Engine {

   constructor(theRoot) {
      this.root = theRoot
      this.player = new Player(this.root)
      this.enemies = []
      this.goal = new Goal(this.root)
      addBackground(this.root)
      this.startTime = new Date();
      this.score = 0;
      this.enemyInterval;
      this.playerRefreshInterval;
   }

   gameLoop = () => {

      let loopTime = new Date()
      //Update timer label created in main
      timeLabel.update(`Time: ${Math.floor((loopTime - this.startTime) / 1000)}s`)
      //Get difference between last frame
      if (this.lastFrame === undefined) this.lastFrame = (new Date).getTime()
      let timeDiff = (new Date).getTime() - this.lastFrame
      this.lastFrame = (new Date).getTime()
      this.enemies.forEach(enemy => {
         if (enemy.direction) {
            enemy.moveVerticalDown(timeDiff)
         }
         else {
            enemy.moveVerticalUp(timeDiff)
         }
      })

      this.enemies = this.enemies.filter(enemy => {
         return !enemy.destroyed
      })

      while (this.enemies.length < ENEMY_COUNT) {
         let spot = nextEnemySpot(this.enemies)
         this.enemies.push(new Enemy(this.root, spot))
      }

      //Check for game over
      if (this.isPlayerDead()) {
         document.removeEventListener("keydown", keydownHandler)
         themeMusic.pause()
         new Audio('sounds/doh.mp3').play()
         menu.style.display = "block"
         //Clear intervals
         clearInterval(this.enemyInterval)
         clearInterval(this.playerRefreshInterval)
         return
      }

      if (this.didReachGoal()) {
         this.goal.remove()
         this.goal = new Goal(this.root)
         //Increment score and update label
         if (this.goal.value === 2) {
            this.score += 2
         }
         else {
            this.score++
         }
         if (gameEngine.score === 3) {
            scoreLabel.update(`BAC: Legal limit!`)
         }
         else {
            scoreLabel.update(`BAC: ${(gameEngine.score * 0.025).toFixed(2)}`)
         }

         if (this.score % 10 === 0) {
            new Audio('sounds/hacker.mp3').play()
         }
         else if (this.score % 4 === 0) {
            new Audio('sounds/beer.mp3').play()
         }
         else {
            new Audio('sounds/gulp.mp3').play()
         }
      }
      //Call function recursively with delay
      setTimeout(requestAnimationFrame(this.gameLoop), 1)
   }


   isPlayerDead = () => {
      let collision = false;
      /* 
         Check that enemy's x position is greater than the player's left boundary AND less than the right boundary
         AND enemy's lower boundary is greater than the players top (y) boundary.
      */
      this.enemies.forEach(enemy => {
         if ((enemy.x > this.player.x - (PLAYER_WIDTH / 2) && enemy.x < this.player.x + (PLAYER_WIDTH / 2))
            && (enemy.y + ENEMY_HEIGHT / 2 > this.player.y - (PLAYER_HEIGHT / 2) && enemy.y < this.player.y + (PLAYER_HEIGHT / 2))) {
            collision = true
         }
      })
      return collision;
   }

   didReachGoal = () => {
      let goal = false;

      // if ((this.goal.x > this.player.x - (PLAYER_WIDTH / 2) && this.goal.x < this.player.x + (PLAYER_WIDTH / 2))
      //    && (this.goal.y + ENEMY_HEIGHT / 2 > this.player.y - (PLAYER_HEIGHT / 2) && this.goal.y < this.player.y + (PLAYER_HEIGHT / 2))) {
      if ((this.goal.x > this.player.x - (PLAYER_WIDTH / 2) && this.goal.x < this.player.x + (PLAYER_WIDTH / 2))
         && ((this.goal.y > this.player.y - (PLAYER_HEIGHT / 2) && this.goal.y < this.player.y + (PLAYER_HEIGHT / 2)))) {

         goal = true

         this.goal

         // console.log(`Goal x: ${this.goal.x} y: ${this.goal.y}
         // Play x: ${this.player.x} y: ${this.player.y}`)
      }

      return goal
   }

   restartStats = () => {
      this.startTime = new Date();
      this.score = 0;
      scoreLabel.update(`BAC: Sober`)
   }

   resetPlayer = () => {
      this.player.x = 0;
      this.player.y = (GAME_HEIGHT / 2) + (ENEMY_HEIGHT);
      this.player.domElement.style.left = this.player.x + "px"
      this.player.domElement.style.top = this.player.y + "px"
   }


   startGame = () => {
      let instructions = document.getElementById('instructions')
      let woohoo = new Audio('sounds/woohoo.mp3').play()
      themeMusic.load()
      themeMusic.play()
      //Assign arrow keys
      document.addEventListener("keydown", keydownHandler)
      //Hide menus
      menu.style.display = "none"
      if (instructions !== null) {
         instructions.style.display = "none"
      }
      //Reset player position
      this.resetPlayer()
      //Reset enemy count
      ENEMY_COUNT = 2
      updateEnemyCountLabel()
      this.restartStats()
      this.gameLoop()

      this.enemyInterval = setInterval(incrementEnemyCount, 8000)
      this.playerRefreshInterval = setInterval(this.player.refreshPlayer, 400)

   }


}













