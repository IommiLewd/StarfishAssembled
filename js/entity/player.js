
class Player extends Phaser.Sprite {
    constructor(game, posx, posy, key) {
        super(game, posx, posy, 'player', 0);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5, 0.5);
        this.body.drag.set(10);
        this._addEmitter();


        this.SPEED = 250; // missile speed pixels/second
        this.TURN_RATE = 5; // turn rate in degrees/frame


    }


    _addEmitter() {

        this.emitter = this.game.add.emitter(0, 0, 200);
        this.emitter.width = 0;
        this.emitter.makeParticles('flame');

        this.emitter.maxParticleSpeed = new Phaser.Point(-100, 50);
        this.emitter.minParticleSpeed = new Phaser.Point(-200, -50);
        this.emitter.minParticleScale = 0.5;
        this.emitter.maxParticleScale = 0.9;
        this.emitter.setRotation(0, 90);
        this.emitter.setAlpha(0.1, 0.6);
        this.emitter.forEach(function (particle) {
            particle.body.allowGravity = true;
        }, this);
        this.emitter.setScale(0.3, 2, 0.3, 2, 300);
        this.emitter.start(false, 300, 1);
        this.addChild(this.emitter);
        this.emitter.on = false;
        this.emitter.y = 0;
        this.emitter.x = -8;
    }
    update() {
        var targetAngle = this.game.math.angleBetween(
            this.x, this.y,
            this.game.input.activePointer.x, this.game.input.activePointer.y
        );

        var delta = targetAngle - this.rotation;
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (this.game.input.activePointer.rightButton.isDown) {
            this.emitter.on = true;
            this.game.physics.arcade.accelerationFromRotation(this.rotation, 180, this.body.acceleration);

            if (delta > 0) {
                this.angle += 2;
            } else {
                this.angle -= 2;
            }
            console.log('Delta is:  ' + delta);
        } else {
            this.body.acceleration.set(0);
            this.emitter.on = false;
        }


    }
}