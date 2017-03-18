class UserInterface extends Phaser.Sprite {
    constructor(game) {
        super(game);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5, 0.5);
        this._loadElements();
 
       
    }

    _loadElements(){
        console.log('Load Elements Fired!!!!');
        this.statusUi = this.game.add.image(0, 0, 'statusUi');
    }
    
    
    update() {

    }
}
