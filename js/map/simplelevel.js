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

    _addEnemy(){
                this.enemy = new Enemy(this.game, 100, 100, 'player');
    }

    _laserPointer() {
        this._laserPointer = this.game.add.tileSprite(0, 0, 800, 0.5, 'pointer');
        this._laserPointer.anchor.setTo(0.0, 0.5);
        this._laserPointer.alpha = 0.7;

    }
    
    



    _fireWeapon() {
        this.bullet;
        if (this.game.time.now > this._nextFire) {
            console.log('fired!');
            this._nextFire = this.game.time.now + this.fireRate;
            this.bullet = this.bullets.getFirstDead();
            this.bullet.reset(this.player.x, this.player.y);
            this.game.camera.shake(0.006, 30);
            this.game.physics.arcade.velocityFromAngle(this._laserPointer.angle, 1100, this.bullet.body.velocity);
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
        this._initBullets();
        this.fireRate = 140;
        this._nextFire = 0;
        this._addEnemy();
    
        
    }

    update() {
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