var player;
var fireKey;
var aliens;
var meteor;
var bullets;
var bulletTime = 1000;
var resetBullet;
var cursors;
var fireButton;
var fireBullet;
var score = 0;
var lives;
var enemyBullet;
var firingTimer = 0;
var stateText;
var spin;
var livingEnemies = [];

var mainState = {
    
    preload: function(){ 
		game.load.image ('stars', 'assets/backgrounds/background_space.png');
        game.load.image ('background', 'assets/backgrounds/background_terrain.png');
        game.load.image ('player', 'assets/sprites/player_ship.png');
        game.load.audio ('bong', 'assets/sounds/meteor_hit.wav');
        game.load.image ('bullet', 'assets/sprites/laser_pew.png');
        game.load.spritesheet ('pipe', 'assets/sprites/meteor_idle308x77x4.png', 77, 77, 4);
	},

    create: function() { 
		game.stage.backgroundColor = '#000000';        
        this.tileSprite = game.add.tileSprite(0, 0, 8000, 490, 'stars');
        this.tileSprite.autoScroll(-150, 0);        
        this.tileSprite = game.add.tileSprite(0, 0, 8000, 490, 'background');
        this.tileSprite.autoScroll(-320, 0);
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;	
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird = game.add.sprite(100, 100, 'player');
        game.physics.arcade.enable(this.bird);
        //this.bird.body.gravity.y = 1000;  
        //var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //spaceKey.onDown.add(this.up, this);      
        var fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        fireKey.onDown.add(this.fireBullet, this);      
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.up, this);
        var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        downKey.onDown.add(this.down, this);         
        this.pipes = game.add.group(); 
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 
        this.score = 0;
        this.labelScore = game.add.text(20, 20, 'Score: ' + this.score, 
        { font: "20px Arial", fill: "#ffffff" });       
		//highscoretext = this.game.add.text(250,20, 'High Score: ' + highscore,
		//{ font: "20px Arial", fill: "#000000" });
		
		//  Our bullet group
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        cursors = this.input.keyboard.createCursorKeys();
    },

    update: function() {
		if (this.bird.y < 0 || this.bird.y > 490)
            this.restartGame();        
        game.physics.arcade.overlap(
        this.bird, this.pipes, this.restartGame, null, this);

        game.physics.arcade.overlap(
            bullets, this.pipes, this.collisionHandler, null, this);
    },

    up: function() {
        //this.bird.body.velocity.y = -200;
        this.bird.y -= 10
        //game.sound.play('bong');
    },
    
    down: function() {
        //this.bird.body.velocity.y = -200;
        this.bird.y += 10;
        //game.sound.play('bong');
    },

    fireBullet: function () {
    
        //  To avoid them being allowed to fire too fast we set a time limit
        if (game.time.now > bulletTime)
        {
            //  Grab the first bullet we can from the pool
            this.bullet = bullets.getFirstExists(false);
    
            if (this.bullet)
            {
                //  And fire it
                this.bullet.reset(this.bird.y, this.bird.y + 8);
                this.bullet.body.velocity.x = 400;
                bulletTime = game.time.now + 200;
                
            }
        }
    
    },

    restartGame: function() {
		//if (dispScore > highscore)
		//	highscore = dispScore;
        game.state.start('main');
    },    
    
    addOnePipe: function(x, y) {
        pipe = game.add.sprite(x, y, 'pipe');
        pipe.animations.add('spin');
        pipe.animations.play('spin', 5, true);        
        this.pipes.add(pipe);
        game.physics.arcade.enable(pipe);
        pipe.body.velocity.x = -200; 
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
    
    addRowOfPipes: function() {
        var hole = Math.floor(Math.random() * 5) + 1;
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1) 
                this.addOnePipe(740, i * 60 + 10);
        this.score += 1;
        if (this.score >= 2){
            dispScore = this.score - 2;
            this.labelScore.text = 'Score: ' + dispScore;
        }
    },    
    
    fireBullet: function () {
    
        //  To avoid them being allowed to fire too fast we set a time limit
        if (game.time.now > bulletTime)
        {
            //  Grab the first bullet we can from the pool
            this.bullet = bullets.getFirstExists(false);
    
            if (this.bullet)
            {
                //  And fire it
                this.bullet.reset(this.bird.y, this.bird.y + 8);
                this.bullet.body.velocity.x = 300;
                bulletTime = game.time.now + 500;
            }
        }
    
    },

    resetBullets: function (bullet) {
    
        //  Called if the bullet goes out of the screen
        bullet.kill();
    
    },
    
    collisionHandler: function (bullet, pipe) {
        game.sound.play('bong');
    //  When a bullet hits an pipe we kill them both
        bullet.kill();
        pipe.kill();

    //  Increase the score
    //score += 20;
    //scoreText.text = scoreString + score;

    //  And create an explosion :)
    //var explosion = explosions.getFirstExists(false);
    //explosion.reset(alien.body.x, alien.body.y);
    //explosion.play('kaboom', 30, false, true);
    //game.sound.play('ef');

    //if (aliens.countLiving() == 0)
    //{
    //    score += 1000;
    //    scoreText.text = scoreString + score;

    //    enemyBullets.callAll('kill',this);
    //    stateText.text = " You Won, \n Click to restart";
    //    stateText.visible = true;

        //the "click to restart" handler
    //    game.input.onTap.addOnce(restart,this);
    }
};

var game = new Phaser.Game(800, 490, Phaser.AUTO, 'flappy');
game.state.add('main', mainState); 
game.state.start('main');
