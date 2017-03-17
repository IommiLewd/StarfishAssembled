/**
 * base class for the player.
 * @constructor
 *  game : the phaser game.
 *  posx : his location in x.
 *  posy : his location in y.
 * @method toggleCombatMode
 *  change the player mode on Combat Mode.
 * @method reload
 *  TODO: reload the current weapon magazine
 * @property onLadder
 *  the player colliding with a ladder boolean.
 *  @getter : isOnLadder;
 *  @setTrue : setOnLadder;
 *  @reset : resetOnLadder
 * @method update :
 *
 */
class Player extends Phaser.Sprite {
    constructor(game, posx, posy, key) {
        super(game, posx, posy, 'player', 0);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5, 0.5);
        this.body.drag.set(10);
        this._addEmitter();

        this.body.maxAngular = 200;
        this.angularDrag = 50;
        this._pointerAngle = 0;
        //this._laserPointer();
        
    }


    _addEmitter() {
        this.emitter = this.game.add.emitter(0, 0, 200);
        this.emitter.width = 0;
        this.emitter.makeParticles('flame');
        this.emitter.maxParticleSpeed = new Phaser.Point(-100, 50);
        this.emitter.minParticleSpeed = new Phaser.Point(-200, -50);
        this.emitter.minParticleScale = 0.5;
        this.emitter.maxParticleScale = 0.9;
        this.emitter.setRotation(0, 50);
        this.emitter.setAlpha(0.1, 0.6);
        this.emitter.forEach(function (particle) {
            particle.body.allowGravity = false;
        }, this);
        this.emitter.start(false, 500, 5);
        this.addChild(this.emitter);
        this.emitter.on = false;
        this.emitter.y = 0;
        this.emitter.x = -8;

    }


        //@override
    update() {
 //this._laserPointer.rotation = this.game.physics.arcade.angleToPointer(this);
       // this._laserPointer.rotation - this.rotation;
     
        //this.rotation = this.game.physics.arcade.angleToPointer(this);
//        this._laserPointer.x = this.x;
//        this._laserPointer.y = this.y;
        if (this.game.input.activePointer.rightButton.isDown) {
            this.emitter.on = true;
            this.game.physics.arcade.accelerationFromRotation(this.rotation, 80, this.body.acceleration);
         this.rotation = this.game.physics.arcade.angleToPointer(this);
            if (0 < this._pointerAngle) {
                //this.body.angularAcceleration += 1800;
                this.body.rotation += 1.1;
                console.log('woof woof');
            } else if (0 > this._pointerAngle) {
                //this.body.angularAcceleration -= 1800;
                this.body.rotation -= 1.1;
                console.log('Bark Bark');
            } else {
                this.body.angularAcceleration = 0;

            }

        } else {
            this.body.acceleration.set(0);
            this.emitter.on = false;
        }
        
      //     this._calculateAngle();

    }
}