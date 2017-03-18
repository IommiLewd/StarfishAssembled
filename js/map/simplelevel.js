/**
 * base class for a simple game level.
 *
 * @constructor  {}
 * @method   :
 * @property :
 * startPosition {} (x,y)
 */

class SimpleLevel extends Phaser.State {
    constructor() {
        super();
        // can be use later to identify tiles and tile_map
        // this.name = level_name;
    }

    _loadLevel() {
        this.game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        }
        this.game.world.setBounds(0, 0, 840, 560);
        this.tilesprite = game.add.tileSprite(0, 0, 840, 560, 'background');
        
        
//        this.game.world.setBounds(0, 0, 840, 560);
//        this.tilesprite = game.add.tileSprite(0, 0, 840, 560, 'background');
    }

    _addPlayer(x, y) {
        this.player = new Player(this.game, x, y, 'player');
        this.game.camera.follow(this.player);
    }


    _laserPointer() {
        this._laserPointer = this.game.add.tileSprite(0, 0, 800, 0.5, 'pointer');
      //  this.player.addChild(this._laserPointer);
        this._laserPointer.anchor.setTo(0.0, 0.5);
        this._laserPointer.alpha = 0.7;

    }

    _checkCollision() {}
        //public methods :
        //@override:
    preload() {}

    create() {
        //set the physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this._loadLevel();
        this._addPlayer(100, 100);
        this._laserPointer();
    }

    update() {
        this._laserPointer.rotation = this.game.physics.arcade.angleToPointer(this.player);
        this._laserPointer.x = this.player.x;
        this._laserPointer.y = this.player.y;

    }
}