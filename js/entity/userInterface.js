class UserInterface extends Phaser.Sprite {
    constructor(game) {
        super(game);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5, 0.5);
        this.currentWave = 0;
        this.score = 0;
        this._loadElements();
        this.waveComplete = false;
        this.health = 100;
        this.shield = 50;
        this.regenerating = true;
    }

    _waveComplete() {
        if (this.waveComplete === false) {
            this.waveComplete = true;
            this.NextWaveText.alpha = 1.0;
            this.NextWaveInText.alpha = 1.0;
            this.TextTimer.alpha = 1.0;
        } else {
            this.waveComplete = false;
            this.NextWaveText.alpha = 0.0;
            this.NextWaveInText.alpha = 0.0;
            this.TextTimer.alpha = 0.0;
        }
    }

    _updateDamage(damage){
        this.regenerating = false;
        if(this.shield > 0){
            this.shield -= damage;
        }else {
            
            if(this.health > -5){
        this.health -= damage;
        }}
        this.healthBar.width = this.health / 100 * 162;
        this.shieldBar.width = this.shield / 50 * 162;
        if(this.health < 0){
            console.log('you are dead!!! Bang!!');
            this.healthBar.alpha = 0.0;
            this.shieldBar.alpha = 0.0;
        }
        
        this.game.time.events.add(Phaser.Timer.SECOND * 6, function(){
            this.regenerating = true}, this);
    }
    _updateScore(score) {
        this.score += score;
        this.scoreCounter.setText('Score: ' + this.score);
    }

    _updateWave() {
        this.currentWave++;
        this.waveCounter.setText('Wave: ' + this.currentWave);
    }

    _loadElements() {
        console.log('Load Elements Fired!!!!');
        this.healthBar = this.game.add.tileSprite(10, 8, 162, 10, 'redPixel');
        this.shieldBar = this.game.add.tileSprite(10, 24, 162, 10, 'bluePixel');
        this.statusUi = this.game.add.image(0, 0, 'statusUi');
        this.scoreCounter = this.game.add.text(4, 628, 'Score: ' + this.score);
        this.scoreCounter.font = 'Press Start 2P';
        this.scoreCounter.fontSize = 8;
        this.scoreCounter.addColor("#FFFFFF", 0);

        this.waveCounter = this.game.add.text(4, 618, 'Wave:  ' + this.currentWave, {
            font: "8px Press Start 2P",
            fill: '#ffffff'
        });
        this.NextWaveText = this.game.add.text(350, 80, 'Wave Complete!', {
            font: "16px Press Start 2P",
            fill: '#ffffff'
        });
        this.NextWaveInText = this.game.add.text(350, 100, 'Next Wave In: ', {
            font: "8px Press Start 2P",
            fill: '#ffffff'
        });
        this.TextTimer = this.game.add.text(555, 100, '10', {
            font: "8px Press Start 2P",
            fill: '#ffffff'
        });

   
        this.NextWaveText.alpha = 0.0;
        this.NextWaveInText.alpha = 0.0;
        this.TextTimer.alpha = 0.0;

    }


    update() {
        if(this.regenerating && this.shield < 50){
            this.shield += 0.5;
            this.shieldBar.width = this.shield / 50 * 162;
        }
    }
}
