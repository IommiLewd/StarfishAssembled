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
    }

    _loadLevel() {
        this.game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            }
            // this.game.stage.backgroundColor = "#4488AA";
        this._backgroundImage = this.game.add.image(0, 0, 'backTiles');
        this._map = this.add.tilemap('mainMap');
        this._map.addTilesetImage('tileset', 'tileset');
        //        //create layers
        //        this._back_tiles = this._map.createLayer('BackTiles');
        this._background_layer = this._map.createLayer('BackgroundLayer');
        this._collision_layer = this._map.createLayer('CollisionLayer');
        this._collision_layer.resizeWorld();
        this._map.setCollisionBetween(0, 160, true, this._collision_layer);
        //        this._ladder_layer = this._map.createLayer('LadderLayer');
        this._front_layer = this._map.createLayer('ForegroundLayer');
        //        this._front_layer.bringToTop();
        //        this.game.world.sendToBack(this._background_layer);
        //        this.game.world.sendToBack(this._back_tiles);
        //        this.game.world.sendToBack(this.background);
    }
    _loadCreature() {
        this.creature = new Creature(this.game, 80, 20, 'creature' /*, this.map*/ );
        this.game.world.bringToTop(this._front_layer);
    }
    _checkCollision() {
        this.game.physics.arcade.collide(this.creature, this._collision_layer);
       this.game.physics.arcade.collide(this.creature.target, this._collision_layer);
    }

    preload() {

    }
    create() {
        this._loadLevel();
        this._loadCreature();
        //this.overlay = this.game.add.image(0, 0, 'overlay');
    }
    update() {
        this._checkCollision();

    }
}








/*
  _addEnemies() {
        //Create Group enemies to handle collisions
        this.enemies = this.add.group();
        //Create Array to store all objects with the type 'enemy'
        var enemyArr = this._findObjectsByType('enemy', this._map, 'ObjectLayer');
        //For Each element in array create Enemy Instance
        enemyArr.forEach(function (element) {
            this.enemy = new Enemy(this.game, element.x, element.y, 'monster', undefined, this.map, 80);
            //add enemy to enemies array
            this.amountOfEnemies++;
            this.enemies.add(this.enemy);

        }, this);

    }

    _enemy_hit(bullet, enemy) {
        enemy.animations.play('FastMovement');
        bullet.kill();
        enemy._health -= this._damage;

        enemy._enemy_MovementReset();
        enemy.body.velocity.y = 0;
        enemy._player_spotted = true;
        enemy._damage_animation();
        if (enemy._health < 1) {
            enemy.kill();
            this.player._activeEnemies--;
            this.player._enemyProgressUpdate();
            if (this.player._activeEnemies === 0) {
                console.log('arghblargh');
                this.amountOfEnemies = 0;

                this._monster_Spawner();
                this.player._activeEnemies = this.amountOfEnemies;
                this.player._enemiesInRound = this.amountOfEnemies;
                this.player._enemyProgressUpdate();
                console.log()

            }
        }


    }
    
    
    
        _enemy_hit(bullet, enemy) {

        bullet.kill();
        enemy._health -= this._damage;
        enemy._enemy_MovementReset();
        if (enemy._health < 1) {
            enemy.kill();
                console.log('enemyHit!);

            }
        }


    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        _player_damage(player, enemy) {
        if (this.player._health < 1) {
            this.player._health = 0;
        } else if (this.time.now > this.biteTimer && this.player._health > 1) {
            this.game.camera.shake(0.06, 40);
            this.player._health -= 30;
            this.biteTimer = this.time.now + 450;
            enemy._enemy_MovementReset();
        }

        this.game.time.events.add(Phaser.Timer.SECOND * 1, enemy._enemy_MovementReset, enemy);
    }
*/




/*

    //  this.game.physics.arcade.overlap(this.bullet, this._collision_layer, this._kill_bullet, null, this);
           // this.game.physics.arcade.collide(this.player, this.enemies, this._player_damage, null, this);

            //this.game.physics.arcade.collide(this.enemies, this._collision_layer);
           // this.game.physics.arcade.collide(this.bullet, this.enemies, this._enemy_hit, null, this);











  _monster_Spawner() {
            this._current_wave++;
            this._waveModifier += 2;
            this.player._currentWave.setText(this._current_wave);
            console.log('MonsterSpawner Fired! Current Wave Count ' + this._current_wave);
            var spawnArr = this._findObjectsByType('MonsterSpawner', this._map, 'ObjectLayer');
            //For Each element in array create Enemy Instance
            for (this.r = 0; this.r < 4 + this._waveModifier; this.r++) {
                spawnArr.forEach(function (element) {
                    for (this.i = 0; this.i < 1; this.i++) {
                        this.enemy = new Enemy(this.game, element.x, element.y, 'monster', undefined, this.map, 80);
                        console.log('Enemy Added');
                    }
                       this.amountOfEnemies++;
                    //add enemy to enemies array
                    this.enemies.add(this.enemy);
                }, this);
            }
        }*/






/*


create() { // bullet group    APP.bullets = game.add.group();    APP.bullets.createMultiple(10, 'bullet');    APP.bullets.setAll('anchor.x', 0.5);    APP.bullets.setAll('anchor.y', 1);    // ensure that all bullets have physics, rather than setting individually    APP.bullets.enableBody = true;    APP.bullets.physicsBodyType = Phaser.Physics.ARCADE;}update(){if (APP.fireButton.isDown)        {            fireBullet();        }// Changed the overlap to check the layer against the whole group instead of// an individual global bullet reference which will keep changing.game.physics.arcade.overlap(APP.layer, APP.bullets, function(bullet, layer) {        bullet.kill();    }, null, this);}}function fireBullet() {    if (game.time.now > APP.bulletTime) {        //game.sound.play('fire');        APP.bulletTime = game.time.now + APP.bulletRate;        // Grab the first bullet we can from the pool that's dead (to ensure        // you don't accidentally grab bullets which are mid-flight)        var currentBullet = APP.bullets.getFirstDead();        if (currentBullet)        {            currentBullet.lifespan = 2000; // kill after 2000ms            if (APP.facing === "right") {                //  And fire it                currentBullet.reset(APP.player.x + 15, APP.player.y + 15);                currentBullet.body.velocity.x = APP.bulletvelocity;            }            else if (APP.facing === "left") {                currentBullet.reset(APP.player.x, APP.player.y + 15);                currentBullet.body.velocity.x = -APP.bulletvelocity;            }        }    }}*/