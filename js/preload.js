class Preload extends Phaser.State {
    preload() {

        //this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        // Images :
   
        this.load.image('player', 'img/playerTemplate.png');
        //this.load.image('pointer', 'img/pointer.png');
        this.load.image('flame', 'img/flame.png');
        this.load.image('background', 'img/tileableBackground.jpg');


        // js scripts :
        this.load.script('player', 'js/entity/player.js');
        this.load.script('simpleLevel', 'js/map/simplelevel.js');

        // json files :
         this.load.image('pointer', 'img/laserPointer.png');
    }
    create() {
        console.log("Preload.js:  Preload.create-> load_Level");
        this.game.state.add('SimpleLevel', SimpleLevel);
        this.game.state.start('SimpleLevel');
    }

}