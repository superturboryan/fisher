class Engine {

   constructor(theRoot) {
      this.root = theRoot
      this.player = new Player(this.root)
      this.enemies = []
      this.goal = new Goal(this.root)
      addBackground(this.root)
      this.startTime = new Date();
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

      // while (this.enemies.length < ENEMY_COUNT) {
      //    let spot = nextEnemySpot(this.enemies)
      //    this.enemies.push(new Enemy(this.root, spot))
      // }

      if (this.isPlayerDead()) {
         window.alert("Game over")
         return
      }

      if (this.didReachGoal()) {
         window.alert("YOU WIN!")
         return
      }

      setTimeout(this.gameLoop, 5)
   }


   isPlayerDead = () => {
      let collision = false;
      this.enemies.forEach(enemy => {
         /* 
         Check that enemy's x position is greater than the player's left boundary AND less than the right boundary
         AND enemy's lower boundary is greater than the players top (y) boundary.
         */
         if ((enemy.x > this.player.x - (PLAYER_WIDTH / 2) && enemy.x < this.player.x + (PLAYER_WIDTH / 2))
            && (enemy.y + ENEMY_HEIGHT / 2 > this.player.y - (PLAYER_HEIGHT / 2) && enemy.y < this.player.y + (PLAYER_HEIGHT / 2))) {
            collision = true
         }
      })
      return collision;
   }

   didReachGoal = () => {
      let goal = false;

      if ((this.goal.x > this.player.x - (PLAYER_WIDTH / 2) && this.goal.x < this.player.x + (PLAYER_WIDTH / 2))
         && (this.goal.y + ENEMY_HEIGHT / 2 > this.player.y - (PLAYER_HEIGHT / 2) && this.goal.y < this.player.y + (PLAYER_HEIGHT / 2))) {
         goal = true
      }

      return goal
   }

   restartTimer = () => {
      this.startTime = new Date();
   }

   resetPlayer = () => {
      console.log("resetting player")
      this.player.x = 0;
      this.player.y = (GAME_HEIGHT / 2) + (ENEMY_HEIGHT);
      this.player.domElement.style.left = this.player.x + "px"
      this.player.domElement.style.top = this.player.y + "px"

   }


}













