var mainState= {
    preload: function() {
       game.load.image('player','assets/SoulMC.png');
       game.load.image('brick','assets/SoulB.png');
       game.load.image('goal','assets/SoulG.png');
       game.load.image('spike','assets/SoulS.png');
       game.load.image('level 1','assets/level1.png');
       game.load.image('quickk','assets/Soulq.png');
       game.load.image('lava','assets/SoulL.png');
       game.load.image('coin','assets/SoulF.png');
       game.load.image('egg', 'assets/SoulZ.png');
       game.load.image('door','assets/SoulD.png');
       game.load.image('up','assets/Soul1UP.png');
       game.load.image('vp','assets/Soul1VP.png');
    },
    
    create: function() {
        game.stage.backgroundColor = '#3598db';
        game.add.tileSprite(0,0,4000,4000,'level 1');
        game.world.setBounds(0,0, 4000, 4000);

    
        var scoreHeader = game.add.text(30,30, "Score", {
           font:"24px Arial",
           fill: "#f22121",
           align: "center"
        });
        
        scoreHeader.fixedToCamera = true;
        
    
        LivesHeader = game.add.text(230,30, "Lives", {
           font: "24px Arial",
           fill: "#f22121",
           align: "center"
        });
    
        LivesHeader.fixedToCamera = true;
        
        scoreText = game.add.text(130,30,'0', {
            font: "24px Arial",
            fill: "#f22121",
            align: "center"
        });
        
        scoreText.fixedToCamera = true;
    
        livesText = game.add.text(330,30,'0', {
            font: "24px Arial",
            fill: "#f22121",
            align: "center"
        });
    
        livesText.fixedToCamera = true;
    
        score = 0;
    
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;
        this.cursor = game.input.keyboard.createCursorKeys();
        this.player = game.add.sprite(90, 60, 'player');
        game.camera.follow(this.player);
        this.player.body.gravity.y = 600;
        //game.gameEnd.follow(this.player);
        //game.scoreheader.follow(this.player);
        //game.scoreText.follow(this.player);
        //game.livesText.follow(this.player);
        //game.livesHeader.follow(this.player);
        
        this.bricks = game.add.group();
        this.spikes = game.add.group();
        this.goals = game.add.group();
        this.quickks = game.add.group();
        this.lavas = game.add.group();
        this.coins = game.add.group();
        this.eggs = game.add.group();
        this.doors = game.add.group();
        this.ups = game.add.group();
        this.vps = game.add.group();
    
        //Design level. /o = brick/ /# = spike/ /g = goal/ /i/u = ?/ /q = sand/ /l = lava/ /f = coin/ /z = egg/ /d = door/ /u = 1up/ /v = 1vp/
        var level = [
            '                                                                                      z',
            'ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
            'o                                                                                     o',
            'o                                                                                     o',
            'q                                                                                     o',
            'o# #          #       #    ##        ###          q             q            q        o',
            'ooooooooooooooooooooooooooooooooooooooooooooooooooolllllllllllooollllllllllooollllllo o',
            'o                                             oooooooooooooooooooooooooooooooooooooooqo',
            'o          u    #                             o                                     o o',
            'o         oooo  oo    ##                      q                                   z o o',
            'o                   oooooooo             oo   o   ooooqqoooooqqoooqooooqqqooooqooooqo o',
            'o                              o   #    o     o   o                                 o o',
            'oooo                              oo          o  oo                        ooqo    #o o',            
            'o        qqqqqqqq  ooooo#                     o                                   ooo o',
            'o       ollllllllo      o               #oo   o#         oq                         o o',
            'o       oooooooooo             #oo    oooooo  ooqo              #    oqo         o  o o',
            'o #                o       #ooqooo                            qooo           o      o o',
            'o o   o                   ooooq oo     o               #                    ooo     o o',
            'o ooo o#  #    oooo      #       oo      #ooo         ooqo          #               o o',
            'q   o  oooooq       ooo qooo  o     oo  ooooo   #                  ooqoo      ##    o o',
            'o  z            ###          zo##             oooo           oo            qoooooo  o o',
            'o# q ollllllllooooooooolllooooooooo  o  ooo   q u                                o    q',
            'ooooooooooooooooooooooooooooooooooollollooollloooolllllllloooooooollllllllooooooooooolo',
            'ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo',
            '                                                                                       ',
            '                                                                                       ',
            '                                                                                       ',
            '                                                                                       ',
            '                                                                                       ',
            '                                                                                       ',
            '                                                                                       ',
            '                                                                                       ',
            '                                                                                       ',
            '                                                                                       ',
            '                                                                                       ',
            '                                                                              v        ',
            '             z d                                                              #        ',
            '           ooooo                                                            ooooo      ',
            '                                                                                       ',
            '                                                                                       ',
            '                                                                                       '
            
            ];
            
            for (var i=0; i < level.length; i++) {
                for (var j=0; j < level[i].length; j++) {
                    
                    if (level[i][j] == 'o') {
                        var brick = game.add.sprite(30+30*j, 30+30*i, 'brick');
                        this.bricks.add(brick);
                        brick.body.immovable = true;
                    }
                    
                    else if (level[i][j] == '#') {
                        var spike = game.add.sprite(30+30*j, 30+30*i, 'spike');
                        this.spikes.add(spike);
                    }
                    
                    else if (level[i][j] == 'g') {
                        var goal = game.add.sprite(30+30*j, 30+30*i, 'goal');
                        this.goals.add(goal)
                        goal.body.immovable = false;
                    }
                    
                    else if (level[i][j] == 'q') {
                        var quickk = game.add.sprite(30+30*j, 30+30*i, 'quickk');
                        this.quickks.add(quickk)
                        quickk.body.immovable = false;
                    }    
                    
                    else if (level[i][j] == 'l') {
                        var lava = game.add.sprite(30+30*j, 30+30*i, 'lava');
                        this.lavas.add(lava)
                    }
                    
                    else if (level[i][j] == 'f') {
                        var coin = game.add.sprite(30+30*j, 30+30*i, 'coin');
                        this.coins.add(coin)
                    }
                    
                    else if (level[i][j] == 'z') {
                        var egg = game.add.sprite(30+30*j, 30+30*i, 'egg');
                        this.eggs.add(egg)
                    }
                    
                    else if (level[i][j] == 'd') {
                        var door = game.add.sprite(30+30*j, 30+30*i, 'door');
                        this.doors.add(door)
                    }
                    
                    else if (level[i][j] == 'u') {
                        var up = game.add.sprite(30+30*j, 30+30*i, 'up');
                        this.ups.add(up)
                    }
                    
                    else if (level[i][j] == 'v') {
                        var vp = game.add.sprite(30+30*j, 30+30*i, 'vp');
                        this.vps.add(vp)
                    }
                }
                
            }
    },
        
    update: function() {
        
        game.physics.arcade.collide(this.player, this.bricks);
        game.physics.arcade.collide(this.player, this.goals);
        game.physics.arcade.collide(this.player, this.quickks);
        game.physics.arcade.overlap(this.player, this.spikes, this.restart, null, this);
        game.physics.arcade.overlap(this.player, this.lavas, this.restart, null, this);
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
        game.physics.arcade.overlap(this.player, this.eggs, this.takeEgg, null, this);
        game.physics.arcade.overlap(this.player, this.doors, this.move, null, this);
        game.physics.arcade.overlap(this.player, this.ups, this.takeUp, null, this);
        game.physics.arcade.overlap(this.player, this.vps, this.takeVp, null, this);
         
        scoreText.text = score;
        livesText.text = lives;
         
        if (this.cursor.left.isDown) 
            this.player.body.velocity.x = -200;
            
        else if (this.cursor.right.isDown)
            this.player.body.velocity.x = 200;
        else
            this.player.body.velocity.x = 0;
            
        if (this.cursor.up.isDown && this.player.body.touching.down)
            this.player.body.velocity.y = -350;
        
        //if (this.cursor.r.isDown)
           //game.state.start('main');
        
    },
    
    takeCoin: function(player, coin){
        coin.kill();
        score += 50;
    },
    
    takeEgg: function(player, egg){
        egg.kill();
        score += 10;
    },
    
    move: function(player, door){
        this.player.x = 90;
        this.player.y = 60;
    },
    
    takeUp: function(player, up){
        up.kill();
        lives += 1;
    },
    
    takeVp: function(player, vp){
        vp.kill();
        lives += 0.5;
    },
    
    restart: function() {
        if (lives !=0)
        {
            //game.state.start('main')
            this.player.x = 90;
            this.player.y = 60;
            lives -= 1;
        
        }
        else {
            gameEnd = game.add.text(200,150, "End of Game", {
               font: "64px Arial",
                fill: "#ffffff"
            });
            game.paused = true;
            gameEnd.fixedToCamera = true;
       }
    }
    
};
    
var game = new Phaser.Game(800,600, Phaser.AUTO,'platformer');
var scoreHeader, livesText;
var score, lives, runningScore;
runningScore = score;
lives = 3;
game.state.add('main', mainState);
game.state.start('main');