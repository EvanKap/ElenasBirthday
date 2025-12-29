class RevealScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RevealScene' });
    }
    preload() {
        this.load.image('particle', 'assets/white.png');
    }
    create() {
        // Celebration background
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                const x = Phaser.Math.Between(50, 430);
                const y = Phaser.Math.Between(100, 400);
                this.createFirework(x, y);
            },
            loop: true
        });

        const title = this.add.text(240, 230, 'Αυτό ήταν όλο', {
            fontSize: '26px',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        const message = this.add.text(240, 350, `Έλενα \nΧρόνια πολλάαααα!\n\n🎉🎉🎉🎉🎉🎉🎉`, {
            fontSize: '26px',
            color: '#ffffff',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        const submitBtn = this.add.rectangle(240, 700, 280, 60, 0x4a7c59)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => submitBtn.setFillStyle(0x5a9c69))
            .on('pointerout', () => submitBtn.setFillStyle(0x4a7c59))
            .on('pointerdown', () => {
                this.scene.start('IntroScene');
            });

        this.add.text(240, 700, 'Restart', {
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    }


    createFirework(x, y) {
        const colors = [0xff0000, 0xffa500, 0xffff00, 0x00ff00, 0x000000, 0xff00ff];
        const color = Phaser.Utils.Array.GetRandom(colors);

        // Create particle emitter with different syntax for Phaser 3.55
        const particles = this.add.particles('particle');

        const emitter = particles.createEmitter({
            speed: { min: 150, max: 300 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.3, end: 0 },
            lifespan: 2000,
            gravityY: 200,
            tint: color,
            blendMode: 'ADD',
            on: false  // Don't emit continuously
        });

        emitter.explode(60, x, y);

        this.time.delayedCall(2500, () => particles.destroy());
    }
}
