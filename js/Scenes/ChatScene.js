class ChatScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ChatScene' });
    }

    preload() {
        this.load.image('avatar', 'assets/avatar.jpg');
    }

    create() {
        // Create floating orb
        this.createOrb();
        const dialogueBg = this.add.rectangle(240, 550, 440, 400, 0x2a2a3e, 0.95);
        dialogueBg.setStrokeStyle(2, 0x9370db);

        let step = this.registry.get('dialogueStep') ?? 0;
        let previousAnswerCode = this.scene.settings.data?.answerCode;
        const dialogue = dialogueTree[step];

        this.handleImage(dialogue.showImage);

        let orbText = dialogue.orbContext.find(c => c.conditionCode == previousAnswerCode).text;
        const hasOptions = dialogue.options?.length > 0;
        let orbTextY = (hasOptions) ? 420 : 560;
        let orbTextX = (dialogue.showImage) ? 170 : 240;

        const dialogueText = this.add.text(orbTextX, orbTextY, orbText, {
            fontSize: '17px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: (dialogue.showImage) ? 200 : 400 }
        }).setOrigin(0.5);

        if (!hasOptions) {
            this.input.on('pointerdown', () => {
                this.changeScene(++step);
            });
        }
        else {
            dialogue.options.forEach((option, index) => {
                const y = 550 + index * 100;
                const btn = this.add.rectangle(240, y, 400, 80, 0x4a4a6e)
                    .setInteractive({ useHandCursor: true })
                    .on('pointerover', () => btn.setFillStyle(0x6a6a8e))
                    .on('pointerout', () => btn.setFillStyle(0x4a4a6e))
                    .on('pointerdown', () => {
                        if (option.isMistake) {
                            this.scene.start('ChatMistakeScene', { failureMsg: option.failureText });
                            return;
                        }
                        this.changeScene(++step, option.code);
                    });

                this.add.text(240, y, option.text, {
                    fontSize: '16px',
                    color: '#ffffff',
                    align: 'center',
                    wordWrap: { width: 370 },
                    padding: { top: 3, bottom: 3 }
                }).setOrigin(0.5);
            });
        }
    }

    changeScene(newStep, code) {
        this.registry.set('dialogueStep', newStep);

        if (newStep >= dialogueTree.length) {
            this.scene.start('RevealScene');
        }
        else {
            this.scene.start('ChatScene', { answerCode: code });
        }
    }

    handleImage(showImage) {
        if (showImage) {
            const avatar = this.add.image(380, 420, "avatar").setOrigin(0.5);
            avatar.scale = 0.1;
        }
    }

    createOrb() {
        const orb = this.add.circle(240, 150, 50, 0x6a5acd);
        orb.setStrokeStyle(4, 0x9370db);
        this.orb = orb;

        // Add glow effect
        const glow = this.add.circle(240, 150, 70, 0x9370db, 0.3);
        this.orb.glow = glow;

        this.time.addEvent({
            delay: 100,
            callback: () => {
                if (this.orb) {
                    if (this.orb.glow) {
                        this.orb.glow.setPosition(this.orb.x, this.orb.y);
                    }
                }
            },
            loop: true
        });
    }

    update() {
        // Update orb floating animation
        if (this.orb) {
            this.orb.y = 180 + Math.sin(this.time.now / 500) * 20;
            if (this.orb.glow) {
                this.orb.glow.y = this.orb.y;
            }
        }
    }
}