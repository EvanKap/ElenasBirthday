const CORRECT_BIRTHDAY = "30/12/1999";
const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 800,
    parent: 'game-container',
    backgroundColor: '#1a1a2e',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 480,
        height: 800
    },
    scene: [IntroScene, ChatScene, InputScene, ErrorScene, RevealScene, ChatMistakeScene]
};
const game = new Phaser.Game(config);