var mainState = { 
  preload: function() { 
    game.load.image('target', 'assets/target.png'); 
    game.load.image('bow', 'assets/bow.gif'); 
    game.load.image('arrow', 'assets/arrow.gif'); 
    game.load.image('woodland', 'assets/woodland.jpg'); 
    game.load.audio('shootArrow','assets/soundeffect.wav');
  }, 
 
  create: function() { 
    cursors = game.input.keyboard.createCursorKeys(); 
    game.world.setBounds(0, 0, 2000, 600); 
    game.add.tileSprite(0, 0, 2000, 600,'woodland');    
    game.physics.startSystem(Phaser.Physics.P2JS);     
    bow = game.add.sprite(150, 450, 'bow'); 
    bow.anchor.setTo(0.5); 
   
    target = game.add.sprite(game.rnd.integerInRange(500, 1900), game.rnd.integerInRange(100, 500),'target'); 
    target.anchor.setTo(0.5); 
    arrow = game.add.sprite(bow.x, bow.y, 'arrow'); 
    arrow.anchor.setTo(0.5); 
    arrow.scale.setTo(0.5); 
    arrow.angle = bow.angle; 
    x = oldx = arrow.x; 
    y = oldy = arrow.y; 
    game.input.onUp.add(this.shootArrow, this);
    //Create Lives 
    lives = game.add.group(); 
    livesText = game.add.text(800, 10, 'Lives : ', { font: '20px Arial', fill: '#fff' }); 
    livesText.fixedToCamera = true;     
    lives.fixedToCamera = true;     
 
    for (var i = 0; i < 5; i++)  
    { 
      var arrowLive = lives.create(950 , 80 - (15 * i), 'arrow'); 
      arrowLive.anchor.setTo(0.3,0.3); 
      arrowLive.scale.setTo(0.5);    
      arrowLive.angle = 90; 
      arrowLive.alpha = 0.8; 
    } 
     
    // Create Score 
    scoreText = game.add.text(20, 10, 'Score : ' + score, { font: '20px Arial', fill: '#fff' }); 
    scoreText.fixedToCamera = true; 
     
    // Create end game text then hide   
    stateText = game.add.text(500,300,' ', { font: '84px Arial', fill: '#fff' }); 
    stateText.anchor.setTo(0.5, 0.5); 
    stateText.visible = false;   
    stateText.fixedToCamera = true; 
  }, 
 
  update: function() { 
     
    if (cursors.left.isDown) 
    { 
        game.camera.x -= 10; 
    } 
    else if (cursors.right.isDown) 
    { 
        game.camera.x += 10; 
    } 
    if (!shot) { 
      angle = Math.atan2(game.input.mousePointer.x - bow.x, -(game.input.mousePointer.y - bow.y)) * (180 / Math.PI) - 180; 
      bow.angle = arrow.angle = angle; 
    } else { 
      x += xVel; 
      y += yVel; 
      yVel += g; 
 
      newArrow.x = x; 
      newArrow.y = y; 
     
      this.arrowAngle = Math.atan2(x-oldx, -(y-oldy)) * (180 / Math.PI); 
      newArrow.angle = this.arrowAngle; 
 
      oldx = x; 
      oldy = y; 
     
      if(newArrow.y>600 || newArrow.x > 2000) { 
        newArrow.kill(); 
        this.resetArrow(); 
        game.camera.reset(); 
      } 
     
      var intersects = Phaser.Rectangle.intersection(newArrow, target); 
       
      if(intersects.width>0) { 
        newArrow.kill(); 
        target.kill();
        game.camera.reset(); 
        target = game.add.sprite(game.rnd.integerInRange(500, 1900), game.rnd.integerInRange(100, 500),'target'); 
        target.anchor.setTo(0.5);    
        score=score+50;   
        scoreText.text = "Score: " + score; 
        hit = true; 
      } 
 
    } 
  }, 
 
  resetArrow: function() { 
    shot = false; 
    arrow.x=bow.x; 
    arrow.y=bow.y; 
 
    x=oldx=arrow.x; 
    y=oldy=arrow.y; 
    if(!hit){ 
      var live = lives.getFirstAlive(); 
      if(live){ 
        live.kill();       
      } 
      if (lives.countLiving() < 1) 
      { 
        target.kill(); 
        game.camera.reset(); 
        stateText.text=" GAME OVER \n Click to restart"; 
        stateText.visible = true; 
        game.input.onTap.addOnce(this.reStartGame,this); 
      } 
    } 
  }, 
  reStartGame: function() { 
    shot = false; 
    hit = false; 
    score = 0; 
    game.state.start('main'); 
  }, 
 
  shootArrow: function(pointer) { 
    if(!shot) { 
      game.sound.play('shootArrow');
      shot = true; 
      hit = false; 
      newArrow = game.add.sprite(bow.x, bow.y, 'arrow'); 
      newArrow.anchor.setTo(0.5); 
      newArrow.scale.setTo(0.5); 
      newArrow.angle = bow.angle; 
      //game.physics.p2.enable(newArrow);     
      game.camera.follow(newArrow);        
      xVel = - (game.input.mousePointer.x-bow.x)/6; 
      yVel = - (game.input.mousePointer.y-bow.y)/6; 
    } 
    this.lastDuration = pointer.duration; 
     
  } 
}; 
 
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'bow'); 
 
var bow, target, arrow, angle, newArrow; 
var score=0; 
var scoreText; 
var x;
var y; 
var oldx, oldy; 
var xVel;   
var yVel;   
var g = 0.25; 
var shot = false; 
var lives; 
var livesText; 
var hit; 
var stateText; 
var cursors; 
 
game.state.add('main', mainState);   game.state.start('main');