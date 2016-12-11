var mainState = {
    preload: function(){
        // Load all the assets.
        game.load.image('player', 'src/assets/player.png');
        game.load.image('wall', 'src/assets/wall.png');
        game.load.image('coin', 'src/assets/coin.png');
        game.load.image('enemy', 'src/assets/enemy.png');
    },

    create: function(){
        // Background, physics and enable gravity on all.
        game.stage.backgroundColor = '#3598db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;

        // Player size, controls and gravity.
        this.cursor = game.input.keyboard.createCursorKeys();
        this.player = game.add.sprite(70, 100, 'player');
        this.player.body.gravity.y = 600;

        // World.
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();

        // Design the level. x = wall, o = coin, ! = lava.
        var level = [
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            '!         !                                      x',
            '!                 o                      o       x',
            '!         o                       xx             x',
            '!                   xx        xx        xx       x',
            '!     o   !    x     x      x                    x',
            'xxxxxxxxxxxxxxxx!!!!!x    xxx!!!!!!!!!!!!!!!!!!!!x',
            '                     x      x                     ',
            '                     xx    ox                     ',
            '                     x    xxx                     ',
            '                     !!!!!!!!                     ',
        ];

        // Create the level by going through the array
        // Image size = 20, padding = 30.
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {

                // Create a wall and add it to the 'walls' group
                if (level[i][j] == 'x') {
                    var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true; 
                }

                // Create a coin and add it to the 'coins' group
                else if (level[i][j] == 'o') {
                    var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
                    this.coins.add(coin);
                }

                // Create a enemy and add it to the 'enemies' group
                else if (level[i][j] == '!') {
                    var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
                    this.enemies.add(enemy);
                }
            }
        }
    },

    update: function(){
        // Colliders and objects.
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);

        // Left and right movement.
        if(this.cursor.left.isDown){
            this.player.body.velocity.x = -200;
        }else if(this.cursor.right.isDown){
            this.player.body.velocity.x = 200;
        }else{
            this.player.body.velocity.x = 0;
        }
        // Jump movement.
        if(this.cursor.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -250;
        }
    },

    // Erase the coin from the screen.
    takeCoin: function(player, coin){
        coin.kill();
    },

    // Restart scene.
    restart: function(){
        game.state.start('main');
    }
};

var game = new Phaser.Game(
    document.getElementById('game-screen').offsetWidth, // Container width.
    document.getElementById('game-screen').offsetHeight, // Container height.
    Phaser.AUTO, 
    'game-screen' // Div where canvas is rendered.
);

game.state.add('main', mainState);
game.state.start('main');