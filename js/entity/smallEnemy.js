class smallEnemy extends Phaser.Sprite {
    constructor(game, posx, posy, key) {
        super(game, posx, posy, 'player', 0);
        game.add.existing(this);
        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5, 0.5);
        this.body.drag.set(0.5);
        this._addEmitter();
//        this._addGun();
        this.SPEED = 60; // missile speed pixels/second
        this.TURN_RATE = 3; // turn rate in degrees/frame
        this.playerX = 100;
        this.playerY = 100;
        this.body.bounce.set(0.4);
       
    }

    _addEmitter() {
        this.emitter = this.game.add.emitter(0, 0, 200);
        this.emitter.width = 0;
        this.emitter.makeParticles('flame');
        this.emitter.maxParticleSpeed = new Phaser.Point(-100, 50);
        this.emitter.minParticleSpeed = new Phaser.Point(-200, -50);
        this.emitter.minParticleScale = 0.5;
        this.emitter.maxParticleScale = 8.9;
        this.emitter.setRotation(0, 190);
        this.emitter.setAlpha(0.1, 0.6);
        this.emitter.forEach(function (particle) {
            particle.body.allowGravity = false;
        }, this);
        this.emitter.setScale(0.3, 2, 0.3, 2, 200);
        this.emitter.start(false, 200, 1);
        this.addChild(this.emitter);
        this.emitter.on = false;
        this.emitter.y = 0;
        this.emitter.x = -6;
    }


    update() {
        this.targetDistance = this.game.math.distance(this.x, this.y, this.playerX, this.playerY);
        console.log('targetDistance is' + this.targetDistance);
      
     console.log('playerX is: ' + this.playerX  + '  playerY is: ' + this.playerY);
        var targetAngle = this.game.math.angleBetween(
            this.x, this.y,
            this.playerX, this.playerY
        );

        var delta = targetAngle - this.rotation;
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

          
        if(this.targetDistance > 120){
            this.game.physics.arcade.accelerationFromRotation(this.rotation, this.SPEED, this.body.acceleration);
              this.emitter.on = true;
         } else {
             this.emitter.on = false;
         }
        
            if (delta > 0) {
                this.angle += this.TURN_RATE;
            } else {
                this.angle -= this.TURN_RATE;
            }
    
        }


    }


