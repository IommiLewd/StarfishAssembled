class Player extends Phaser.Sprite {
    constructor(game, posx, posy, key) {
        super(game, posx, posy, 'player', 0);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5, 0.5);
        this.body.drag.set(0.5);
        this._addEmitter();
        this._addGun();
        this.SPEED = 220; // missile speed pixels/second
        this.TURN_RATE = 3; // turn rate in degrees/frame
        this.body.bounce.set(0.4);
        this.alive = true;
    }

    _addEmitter() {
        this.emitter = this.game.add.emitter(0, 0, 200);
        this.emitter.width = 0;
        this.emitter.makeParticles('blueFlame');
        this.emitter.maxParticleSpeed = new Phaser.Point(-100, 50);
        this.emitter.minParticleSpeed = new Phaser.Point(-200, -50);
        this.emitter.minParticleScale = 0.5;
        this.emitter.maxParticleScale = 8.9;
        this.emitter.setRotation(0, 360);
        //this.emitter.setAlpha(0.1, 0.8);
        this.emitter.setAlpha(1, 0.1, 250);
        this.emitter.forEach(function (particle) {
            
            //Yay, totally works and is cool. Can i reduce this to 3lines ov code?
            particle.animations.add('emit1', [0]);
            particle.animations.add('emit2', [1]);
            particle.animations.add('emit3', [2]);
            var randSpeed = Math.random() * (4 - 0) + 0;
            var randSpeed = Math.floor(randSpeed);

            if (randSpeed === 1) {
                particle.animations.play('emit1', 30, true);
            } else if (randSpeed === 2) {
                particle.animations.play('emit2', 30, true);
            } else {particle.animations.play('emit3', 30, true);}
            
        }, this);
        this.emitter.setScale(0.3, 2, 0.3, 2, 250);
        this.emitter.start(false, 250, 1);
        this.addChild(this.emitter);
        this.emitter.on = false;
        this.emitter.y = 0;
        this.emitter.x = -6;
    }



    _addGun() {
        this.gun = this.game.add.image(0, 0, 'gun');
        this.gun.anchor.setTo(0.5);
    }
    
    _death(){
        
    }

    update() {
        if(this.alive){
        this.gun.x = this.x;
        this.gun.y = this.y;
        this.gun.rotation = this.game.physics.arcade.angleToPointer(this);
        var targetAngle = this.game.math.angleBetween(
            this.x, this.y,
            this.game.input.activePointer.x, this.game.input.activePointer.y
        );

        var delta = targetAngle - this.rotation;
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (this.game.input.activePointer.rightButton.isDown) {
            this.emitter.on = true;
            this.game.physics.arcade.accelerationFromRotation(this.rotation, this.SPEED, this.body.acceleration);

            if (delta > 0) {
                this.angle += this.TURN_RATE;
            } else {
                this.angle -= this.TURN_RATE;
            }
        } else {
            this.body.acceleration.set(0);
            this.emitter.on = false;
        }} else {
            this.angle += 3;
            
        }


    }
}