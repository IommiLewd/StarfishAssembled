class Preload extends Phaser.State {
    preload() {
        //this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        this.load.image('creature', 'img/creatureTemplate.png');
        this.load.image('pointer', 'img/pointer.png');
        this.load.image('backTiles', 'img/backTiles.png');
        this.load.image('tileset', 'img/tileset.png');
        this.load.image('overlay', 'img/overlay.png');
        this.load.script('Creature', 'js/entity/creature.js');
        this.load.script('simpleLevel', 'js/map/simplelevel.js');
        this.load.tilemap('mainMap', 'json/mainMap.json', null, Phaser.Tilemap.TILED_JSON); 
    }
    create() {
        console.log("Preload.js:  Preload.create-> load_Level");
        this.game.state.add('SimpleLevel', SimpleLevel);
        this.game.state.start('SimpleLevel');
    }

}