class SimpleLevel extends Phaser.State {
    constructor() {
        super();
        // can be use later to identify tiles and tile_map
        // this.name = level_name;
    }

    _loadLevel() {
        console.log('simplelevel.js: -> _LoadLevel fired');
        this.game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            }
            //        this.game.world.setBounds(0, 0, 840, 560);
            //        this.tilesprite = game.add.tileSprite(0, 0, 840, 560, 'background');

        this.game.world.setBounds(0, 0, 920, 640);
        this.background = game.add.tileSprite(0, 0, 920, 640, 'background');
        this.overlay = game.add.tileSprite(-300, -300, 1020, 740, 'Overlay');
    }

    _addPlayer(x, y) {
        this.player = new Player(this.game, x, y, 'player');
        this.game.camera.follow(this.player);
    }

    _addEnemy() {
        this.enemies = this.game.add.group();
        this.enemy = new smallEnemy(this.game, 820, 100, 'player');
        this.enemies.add(this.enemy);
    }

    _laserPointer() {
        this._laserPointer = this.game.add.tileSprite(0, 0, 1100, 0.5, 'pointer');
        this._laserPointer.anchor.setTo(0.0, 0.5);
        this._laserPointer.alpha = 0.7;
    }

    _loadUi() {
        this.userInterface = new UserInterface(this.game);
    }


    _enemy_hit(bullet, enemy) {
        console.log('enemyHit!');
        bullet.destroy();
        enemy.body.velocity.x = 10;
        enemy.body.velocity.y = 10;
        this.explosion.x = enemy.x;
        this.explosion.y = enemy.y;
        this.explosion.on = true;
        this.game.time.events.add(Phaser.Timer.SECOND * 0.3, this._endExplosion, this);
    }

    _endExplosion() {
        this.explosion.on = false;
    }

    _fireWeapon() {
        this.bullet;
        if (this.game.time.now > this._nextFire) {
            this._nextFire = this.game.time.now + this.fireRate;
            this.bullet = this.bullets.getFirstDead();
            this.bullet.reset(this.player.x, this.player.y);
            this.game.camera.shake(0.004, 40);
            this.game.physics.arcade.velocityFromAngle(this._laserPointer.angle, 800, this.bullet.body.velocity);
            this.bullet.angle = this._laserPointer.angle;
            this.bullet.bringToTop();
            
            this.bullets.add(this.bullet);
        }
    }

    _initBullets() {
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(500, 'bullet');
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        //  --- Disable Gravity for Each Bullet
        this.bullets.forEach(function (L) {
            L.body.allowGravity = false;
        })
    }

    _addExplosion() {
        this.explosion = this.game.add.emitter(0, 0, 200);
        this.explosion.width = 0;
        this.explosion.makeParticles('blueFlame');
        this.explosion.minParticleSpeed.setTo(-200, -200);
        this.explosion.maxParticleSpeed.setTo(200, 200);
        this.explosion.setRotation(0, 190);
        this.explosion.setAlpha(0.1, 1);
        this.explosion.forEach(function (particle) {
            particle.body.allowGravity = false;
        }, this);
        this.explosion.setScale(0.3, 1, 0.3, 1, 220);
        this.explosion.start(false, 220, 1);
        this.explosion.on = false;
    }

    _checkCollision() {
        this.game.physics.arcade.collide(this.player, this.enemies);
        this.game.physics.arcade.collide(this.bullets, this.enemies, this._enemy_hit, null, this);

    }
    preload() {}

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this._loadLevel();
        this._addPlayer(100, 100);
        this._laserPointer();
        this._initBullets();
        this.fireRate = 420;
        this._nextFire = 0;
        this._addEnemy();
        this._addExplosion();
        //this._loadUi();
    }

    update() {
        this.overlay.x = this.player.x * 0.12 - 100;
        this.overlay.y = this.player.y * 0.12 - 100;
        this._checkCollision();

        //enemyAI updater
        this.enemy.playerX = this.player.x;
        this.enemy.playerY = this.player.y;

        this._laserPointer.rotation = this.game.physics.arcade.angleToPointer(this.player);
        this._laserPointer.x = this.player.x;
        this._laserPointer.y = this.player.y;
        if (this.game.input.activePointer.leftButton.isDown) {
            this._fireWeapon();
        }
    }

}