class UserInterface extends Phaser.Sprite {
    constructor(game) {
        super(game);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5, 0.5);
        this.score = 0;
        this._loadElements();
        this._updateScore(20);



    }
    _updateScore(score) {
        this.score += score;
        this.scoreCounter.setText('Score: ' + this.score)
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

    }


    update() {

    }
}