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




    }
    _updateScore(score) {
        this.score += score;
        this.scoreCounter.setText('Score: ' + this.score);
    }
    
    _updateWave(){
        this.currentWave + 1;
        this.waveCounter.setText('Wave: ' + this.currentWave);
    }

    _loadElements() {
        console.log('Load Elements Fired!!!!');
        this.healthBar = this.game.add.tileSprite(10, 8, 162, 10, 'redPixel');
        this.healthBar = this.game.add.tileSprite(10, 24, 162, 10, 'bluePixel');
        this.statusUi = this.game.add.image(0, 0, 'statusUi');
        this.scoreCounter = this.game.add.text(4, 628, 'Score: ' + this.score);
        this.scoreCounter.font = 'Press Start 2P';
        this.scoreCounter.fontSize = 8;
        this.scoreCounter.addColor("#FFFFFF", 0); //red
        
        this.waveCounter = this.game.add.text(4, 618, 'Wave:  ' + this.currentWave);
        this.waveCounter.font = 'Press Start 2P';
        this.waveCounter.fontSize = 8;
        this.waveCounter.addColor("#FFFFFF", 0); //red

    }


    update() {

    }
}






/*


this.testSignal = this.fish.events.fishBirth.add(this._fishBirthing, this, 0, this.locationX, this.locationY);

this.events.fishBirth = new Phaser.Signal();
this.events.fishBirth.dispatch(this.locationX, this.locationY);

*/