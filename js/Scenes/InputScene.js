class InputScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InputScene' });
    }
    
    submitBirthday(inputValue) {
        if (inputValue === CORRECT_BIRTHDAY) {
            this.registry.set('dialogueStep', 0);
            this.scene.start('ChatScene');
        } else {
            this.scene.start('ErrorScene');
        }
    }
    
    create() {
        const title = this.add.text(240, 150, `Βάλε μια την ημερομενία γέννησης σου:`, {
            fontSize: '18px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        const hint = this.add.text(240, 170, `(Ολόκληρη)`, {
            fontSize: '12px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        const inputBg = this.add.rectangle(240, 290, 280, 60, 0x2a2a3e);
        inputBg.setStrokeStyle(2, 0xffd700);

        const inputText = this.add.text(240, 290, '', {
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        let inputValue = '';

        // Create virtual keyboard - optimized for portrait
        const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'C', 'CE'];
        const startX = 180;
        const startY = 400;
        const spacing = 65;

        keys.forEach((key, index) => {
            const col = index % 3;
            const row = Math.floor(index / 3);
            const x = startX + col * spacing;
            const y = startY + row * spacing;

            const keyBg = this.add.rectangle(x, y, 50, 50, 0x4a4a6e)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => keyBg.setFillStyle(0x6a6a8e))
                .on('pointerout', () => keyBg.setFillStyle(0x4a4a6e))
                .on('pointerdown', () => {

                    let oldValue = inputText._text;
                    if (key == 'CE') {
                        inputValue = '';
                    }
                    else if (key == 'C') {
                        inputValue = oldValue.slice(0, oldValue.length - 1);
                    }
                    else if (oldValue.length < 10) {
                        if (inputValue.length == 2 || inputValue.length == 5) {
                            inputValue += '/';
                        }
                        inputValue += key;
                    }
                    inputText.setText(inputValue);
                });

            this.add.text(x, y, key, {
                fontSize: '24px',
                color: '#ffffff'
            }).setOrigin(0.5);
        });

        // Submit button
        const submitBtn = this.add.rectangle(240, 700, 280, 60, 0x4a7c59)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => submitBtn.setFillStyle(0x5a9c69))
            .on('pointerout', () => submitBtn.setFillStyle(0x4a7c59))
            .on('pointerdown', () => {
                this.submitBirthday(inputValue);
            });

        this.add.text(240, 700, 'Submit', {
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    }

}