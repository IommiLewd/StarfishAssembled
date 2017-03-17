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
        this.game.world.setBounds(0, 0, 1600, 1500);
        this.tilesprite = game.add.tileSprite(0, 0, 1600, 1600, 'background');
    }

    _addPlayer(x, y) {
        this.player = new Player(this.game, x, y, 'player');
        this.game.camera.follow(this.player);
    }


    _laserPointer() {
        this._laserPointer = this.game.add.tileSprite(0, 0, 800, 0.5, 'pointer');
      //  this.player.addChild(this._laserPointer);
        this._laserPointer.anchor.setTo(0.0, 0.5);



    }
    
    
    
//    
//        _calculateAngle() {
//        
//        
////        this.testAngle = this._pointerAngle / this.angle;
//        this.targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(
//            this.player.x, this.player.y,
//            this.game.input.activePointer.x, this.game.input.activePointer.y) ;
////   console.log(this.targetAngle + ' <- This.testAngle');
////   
//    }
//    
//    
    
    
    
    
    
    
        _calculateAngle() {

            
            
        var targetAngle = (360 / (2 * Math.PI)) * game.math.angleBetween(
          this.player.x, this.player.y,
          this.game.input.activePointer.x, this.game.input.activePointer.y) + 90;
            
           console.log(this._laserPointer.angle);
           console.log(this.player.angle);
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
      // this._calculateAngle();
//       // this.player.angle = this.game.physics.arcade.angleToPointer(this);
        this._laserPointer.rotation = this.game.physics.arcade.angleToPointer(this.player);
        
        
        this._laserPointer.x = this.player.x;
        this._laserPointer.y = this.player.y;
 
        
        
        this.storedAngle = this.player.angle;
        this.storedPointerAngle = this._laserPointer.angle;
if(this.storedAngle < 0){
    this.totalAngle = this.storedAngle - this.storedPointerAngle;
    console.log('condition A');
}else{
    this.totalAngle = this.storedAngle + this.storedPointerAngle;
     console.log('condition B');
}
//        c
//console.log('playerangle: ' + this.player.angle);
//console.log( 'pointerangle: ' + this._laserPointer.angle);
        console.log('totalAngle is: ' + this.totalAngle + '   Storedangle is: ' + this.storedPointerAngle + ' pointerAngle is:  ' + this.storedPointerAngle);
//
//
//
////        if (this.contestAngle < -180) {
////            this.contestAngle *= -1;
////        }
//        console.log('pointerA is: ' +  this._laserPointer.angle);
//        console.log('playerA is: ' + this.player.angle);
//        var finalTest = this.player.angle - this._laserPointer.angle;
//        console.log('final test: ' + finalTest);
//        this.player._pointerAngle = this.contestAngle;
    }
}