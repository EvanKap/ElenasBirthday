class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'IntroScene' });
        this.currentTextIndex = 0;
        this.texts = [
            "Χρόνια σου πολλά Έλενα.",
            "Αυτό είναι για σένα",
            "Αλλά κάτσε..\n Ας σιγουρευτώ μια πως είσαι η σωστή Έλενα"
        ];
    }

    create() {

        this.displayText = this.add.text(240, 400, '', {
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 400 }
        }).setOrigin(0.5).setAlpha(0);

        // Add click/tap to skip
        this.input.on('pointerdown', () => {
            this.skipToNext();
        });

        // Show first text
        this.showNextText();
    }

    showNextText() {
        if (this.currentTextIndex >= this.texts.length) {
            // All texts shown, move to next scene
            this.currentTextIndex = 0;
            this.scene.start('InputScene');
            return;
        }

        const text = this.texts[this.currentTextIndex];
        this.displayText.setText(text);

        // Fade in
        this.tweens.add({
            targets: this.displayText,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(2000, () => {
                    this.fadeOutAndNext();
                });
            }
        });

        this.currentTextIndex++;
    }

    fadeOutAndNext() {
        this.tweens.add({
            targets: this.displayText,
            alpha: 0,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.showNextText();
            }
        });
    }

    skipToNext() {
        // Kill all tweens and timers
        this.tweens.killTweensOf(this.displayText);
        this.time.removeAllEvents();
        
        // Immediately fade out and go to next
        this.displayText.setAlpha(0);
        this.showNextText();
    }
}