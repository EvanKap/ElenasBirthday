class ErrorScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ErrorScene' });
    }

    create() {
        const errorBg = this.add.rectangle(240, 400, 400, 500, 0x3a1a1a);
        errorBg.setStrokeStyle(4, 0xff4444);

        const errorIcon = this.add.text(240, 250, '❌', {
            fontSize: '72px',
            padding: { top: 8, bottom: 8 }
        }).setOrigin(0.5);

        const errorTitle = this.add.text(240, 350, 'Λαθος!', {
            fontSize: '38px',
            fontStyle: 'bold',
            color: '#ff6666'
        }).setOrigin(0.5);

        const errorMsg = this.add.text(240, 430, 'Καλά ρε..\nTα γενέθλια σου ξέχασες;', {
            fontSize: '18px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        const retryBtn = this.add.rectangle(240, 550, 280, 60, 0x4a7c59)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => retryBtn.setFillStyle(0x5a9c69))
            .on('pointerout', () => retryBtn.setFillStyle(0x4a7c59))
            .on('pointerdown', () => {
                this.scene.start('InputScene')
            });

        this.add.text(240, 550, 'Επιστροφή', {
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    }
}