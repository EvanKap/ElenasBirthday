class ChatMistakeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ChatMistakeScene' });
    }

    create() {

        const errorTitle = this.add.text(240, 250, 'Όντως τώρα;', {
            fontSize: '38px',
            fontStyle: 'bold',
            color: '#ff6666'
        }).setOrigin(0.5);

        const errorMsg = this.add.text(240, 350, this.scene.settings.data.failureMsg, {
            fontSize: '20px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        const retryBtn = this.add.rectangle(240, 700, 280, 60, 0x4a7c59)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => retryBtn.setFillStyle(0x5a9c69))
            .on('pointerout', () => retryBtn.setFillStyle(0x4a7c59))
            .on('pointerdown', () => {
                this.scene.start('ChatScene')
            });

        this.add.text(240, 700, 'Επιστροφή', {
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    }
}