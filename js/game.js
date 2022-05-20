config={
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 450,
    },
    parent: "gameDiv",
    fullScreenTarget: document.getElementById('gameDiv'),
    backgroundColor: "b9baff",
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: { y: 0 },
      }
    },
    scene: [StartScene, Level1, Level2, Battle, RecoverScene, Hospital, GymLeaderIntro, Shop, PauseMenu, NewGameScene]
}

const game = new Phaser.Game(config);

const w=game.config.width
const h= game.config.height
console.log(w, h)

