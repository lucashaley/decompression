ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font'
)
.defines(function () {

    //global variables
    var serverName = 'VOYAGER';

    //base button class
    var menuButton = ig.Class.extend({
        instructText: new ig.Font( 'media/04b03.font.png' ),
        x : 100,
        y : 400,
        w : 100,
        h : 100,
        buttonText : '',

        init: function (texty, x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.buttonText = texty;
        },

        //handles button clicking
        isOnButton: function() {
            if(ig.input.mouse.x > this.x && ig.input.mouse.x < this.x+this.w && ig.input.mouse.y > this.y && ig.input.mouse.y < this.y+this.h) {
                return true;
            }
            else return false;
        },
        draw: function() {
            this.instructText.draw( this.buttonText, this.x, this.y, ig.Font.ALIGN.LEFT );            
        }
    });

    //Starting logo splash screen
    LogoScreen = ig.Game.extend({
        //declare variables
        instructText: new ig.Font( 'media/04b03.font.png' ),
        font: new ig.Font('media/04b03.font.png'),
        background: new ig.Image('lib/game/media/lasercat.jpg'),

        init: function() {
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
        },
        update: function() {
            //to leave screen
            if(ig.input.pressed ('leftMouse')){
                ig.system.setGame(StartScreen)
            }

            this.parent();
        },
        draw: function() {
            var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;
            this.parent();
            this.background.draw(cntrX-this.background.width/2,cntrY-this.background.height/2);
            this.instructText.draw( 'Click to continue', cntrX, scrHgt - 10, ig.Font.ALIGN.CENTER );
            this.font.draw('Lazor Kittens\npresent', cntrX, cntrY, ig.Font.ALIGN.CENTER);
        }
    });

    //Main Menu
    StartScreen = ig.Game.extend({
        //declare variables
        background: new ig.Image('lib/game/media/images.jpg'),
        title: new ig.Image('lib/game/media/Title.PNG'),
        joinButton : new menuButton(),
        hostButton : new menuButton(),
        optionsButton : new menuButton(),
        
        init: function() {
            ig.input.bind( ig.KEY.MOUSE1, 'LMouse');
            this.joinButton.init('JOIN', ig.system.width * .3, ig.system.height * .9, 100, 100);
            this.hostButton.init('HOST', ig.system.width * .5, ig.system.height * .9, 100, 100);
            this.optionsButton.init('OPTIONS', ig.system.width * .7, ig.system.height * .9, 100, 100);
        },
        update: function() {
            //handle buttons
            if(ig.input.pressed ('LMouse')) {
                if(this.joinButton.isOnButton()) {
                    ig.system.setGame(JoinScreen)
                }
                else if(this.hostButton.isOnButton()) {
                    ig.system.setGame(CreateScreen)
                }
                else if(this.optionsButton.isOnButton()) {
                    ig.system.setGame(OptionsScreen)
                }
            }
            this.parent();
        },
        draw: function() {
            var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;
            this.parent();
            this.background.draw(cntrX-this.background.width/2,cntrY-this.background.height/2);
            this.title.draw(cntrX-this.title.width/2,30);
            this.joinButton.draw(); 
            this.hostButton.draw();
            this.optionsButton.draw();
        }
    });
    
    //screen for host to create a game
    CreateScreen = ig.Game.extend({       

        // Load a font
        font: new ig.Font('media/04b03.font.png'),
        backButton : new menuButton(),
        createButton : new menuButton(),

        


        init: function () {
            // Initialize your game here; bind keys etc.
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
            ig.input.bind( ig.KEY.BACKSPACE, 'backspace');
            ig.input.bind( ig.KEY.SPACE, 'space');
            for ( var i = 48; i <= 90; i++ ){
                var j = String.fromCharCode(i);
                ig.input.bind( i, j );
            }
            this.backButton.init('BACK', ig.system.width * .4, ig.system.height * .9, 100, 100);
            this.createButton.init('CREATE', ig.system.width * .6, ig.system.height * .9, 100, 100);
        },

        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            //handle buttons
            if(ig.input.pressed('leftMouse')) {
                if(this.backButton.isOnButton()) {
                    ig.system.setGame(StartScreen);
                }
                else if(this.createButton.isOnButton()) {
                    ig.system.setGame(LobbyScreen);
                }
            }

            //handle input text
            for ( var i = 48; i <= 90; i++ ){
                var j = String.fromCharCode(i);
                if( ig.input.pressed(j) ) {
                    serverName += j;
                }
            }
            if( ig.input.pressed('backspace') ) {
                serverName = serverName.substring(0, serverName.length - 1);
            }
            if( ig.input.pressed('space') ) {
                serverName = serverName + " ";
            }


        },

        draw: function () {
            var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;
            // Draw all entities and backgroundMaps
            this.parent();

            // Add your own drawing code here

            this.font.draw('Create a game', cntrX, scrHgt * .2, ig.Font.ALIGN.CENTER);
            this.font.draw('Server Name:  ' + serverName, cntrX, scrHgt * .4, ig.Font.ALIGN.CENTER);
            this.backButton.draw();
            this.createButton.draw();
        }
    });
    
    //screen for players to choose a server to join
    JoinScreen = ig.Game.extend({       

        font: new ig.Font('media/04b03.font.png'),
        specificButton : new menuButton(),
        randomButton : new menuButton(),
        backButton : new menuButton(),


        init: function () {
            // Initialize your game here; bind keys etc.
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
            this.specificButton.init('SPECIFIC\nSERVER', ig.system.width * .3, ig.system.height * .9, 100, 100);
            this.randomButton.init('RANDOM\nSERVER', ig.system.width * .5, ig.system.height * .9, 100, 100);
            this.backButton.init('BACK', ig.system.width * .7, ig.system.height * .9, 100, 100);
        },

        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            //handle buttons
            if(ig.input.pressed('leftMouse')) {
                if(this.specificButton.isOnButton()) {
                    ig.system.setGame(LobbyScreen);
                }
                else if(this.randomButton.isOnButton()) {
                    ig.system.setGame(LobbyScreen);
                }
                else if(this.backButton.isOnButton()) {
                    ig.system.setGame(StartScreen);
                }
            }

        },

        draw: function () {
            var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;
            // Draw all entities and backgroundMaps
            this.parent();

            // Add your own drawing code here

            this.font.draw('Join a Server', cntrX, cntrY, ig.Font.ALIGN.CENTER);
            this.specificButton.draw();
            this.randomButton.draw();
            this.backButton.draw();
        }
    });
    
    //main player lobby screen
    LobbyScreen = ig.Game.extend({

        font: new ig.Font('media/04b03.font.png'),
        backButton : new menuButton(),
        startButton : new menuButton(),


        init: function () {
            // Initialize your game here; bind keys etc.
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
            this.backButton.init('BACK\nTO\nMENU', ig.system.width * .4, ig.system.height * .9, 100, 100);
            this.startButton.init('START\nGAME', ig.system.width * .6, ig.system.height * .9, 100, 100);
        },

        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            //handle buttons
            if(ig.input.pressed('leftMouse')) {
                if(this.backButton.isOnButton()) {
                    ig.system.setGame(StartScreen);
                }
                else if(this.startButton.isOnButton()) {
                    ig.system.setGame(GameScreen);
                }
            }

        },

        draw: function () {
            var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;
            // Draw all entities and backgroundMaps
            this.parent();

            // Add your own drawing code here

            this.font.draw('You are in the lobby...', cntrX, scrHgt * .2, ig.Font.ALIGN.CENTER);
            this.font.draw('Server Name: ' + serverName, cntrX, scrHgt * .4, ig.Font.ALIGN.CENTER);
            this.backButton.draw();
            this.startButton.draw();
        }
    });
    
    //Options menu
    OptionsScreen = ig.Game.extend({
        font: new ig.Font('media/04b03.font.png'),
        backButton: new menuButton(),


        init: function () {
            // Initialize your game here; bind keys etc.
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
            this.backButton.init('BACK', ig.system.width * .5, ig.system.height * .9, 100, 100);
        },

        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            //handle buttons
            if(ig.input.pressed('leftMouse')) {
                if(this.backButton.isOnButton()){
                   ig.system.setGame(StartScreen); 
                }                
            }

        },

        draw: function () {
            var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;
            // Draw all entities and backgroundMaps
            this.parent();

            // Add your own drawing code here

            this.font.draw('Options', cntrX, cntrY, ig.Font.ALIGN.CENTER);
            this.backButton.draw();
        }
    });

    //for when players are in game
    GameScreen = ig.Game.extend({

        // Load a font
        font: new ig.Font('media/04b03.font.png'),


        init: function () {
            // Initialize your game here; bind keys etc.
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
        },

        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            // temporary exit condition for the game screen
            if(ig.input.pressed('leftMouse')) {
                ig.system.setGame(StatsScreen);
            }

        },

        draw: function () {
            var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;
            // Draw all entities and backgroundMaps
            this.parent();

            // Add your own drawing code here

            this.font.draw('You are playing the game', cntrX, cntrY, ig.Font.ALIGN.CENTER);

        }
    });

    //screen to display post-game stats
    StatsScreen = ig.Game.extend({
        font: new ig.Font('media/04b03.font.png'),
        returnStartButton : new menuButton(),
        returnLobbyButton : new menuButton(),


        init: function () {
            // Initialize your game here; bind keys etc.
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
            this.returnStartButton.init('RETURN\nTO\nMENU', ig.system.width * .6, ig.system.height * .9, 100, 100);
            this.returnLobbyButton.init('RETURN\nTO\nLOBBY', ig.system.width * .4, ig.system.height * .9, 100, 100);
        },

        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            //handle buttons
            if(ig.input.pressed('leftMouse')) {
                if(this.returnLobbyButton.isOnButton()) {
                    ig.system.setGame(LobbyScreen);
                }
                else if(this.returnStartButton.isOnButton()) {
                    ig.system.setGame(StartScreen);
                }
            }

        },

        draw: function () {
            var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;
            // Draw all entities and backgroundMaps
            this.parent();

            // Add your own drawing code here

            this.font.draw('Wow, look at those stats...', cntrX, cntrY, ig.Font.ALIGN.CENTER);
            this.returnLobbyButton.draw();
            this.returnStartButton.draw();
        }
    });

    //game screen set up

    //load screen (can remove this to default to basic white load bar)
    MyLoader = ig.Loader.extend({
        draw: function() {
        }
    });

    ig.main('#canvas', LogoScreen, 60, 1280, 800, 1, MyLoader);

});

