new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attackMonster: function() {
      var damage = this.calculateDamge(10, 3);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster: " + damage
      });
      if (this.checkWin()) return;
      this.monsterAttacks();
    },
    specialAttackMonster: function() {
      var damage = this.calculateDamge(20, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster hard: " + damage
      });
      if (this.checkWin()) return;
      this.monsterAttacks();
    },
    healMe: function() {
      if (this.playerHealth <= 90) this.playerHealth += 10;
      else this.playerHealth = 100;
      this.turns.unshift({
        isPlayer: true,
        text: "Player heals 10"
      });
      this.monsterAttacks();
    },
    giveupGame: function() {
      this.gameIsRunning = false;
    },
    monsterAttacks: function() {
      var damage = this.calculateDamge(12, 5);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits player: " + damage
      });
      this.checkWin();
    },
    calculateDamge: function(max, min) {
      return Math.max(Math.floor(Math.random() * max + 1), min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm("You won!\r\nDo you want to play again?")) {
          this.startGame();
        } else this.gameIsRunning = false;
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost!\r\nDo you want to play again?")) {
          this.startGame();
        } else this.gameIsRunning = false;
        return true;
      }
      return false;
    }
  }
});
