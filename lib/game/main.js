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
        font: new ig.Font( 'media/04b03.font.png' ),
        x : 100,
        y : 400,
        w : 100,
        h : 100,
        buttonText : '',
        buttonColor : '#000',

        init: function (x, y, w, h, texty, color) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            if(texty != null) this.buttonText = texty;
            if(color != null) this.buttonColor = color;
        },

        //handles button clicking
        isOnButton: function() {
            if(ig.input.mouse.x > this.x && ig.input.mouse.x < this.x+this.w && ig.input.mouse.y > this.y && ig.input.mouse.y < this.y+this.h) {
                return true;
            }
            else return false;
        },
        draw: function() {
            //button background color
            var ctx = ig.system.context;
            ctx.fillStyle = this.buttonColor;
            ctx.fillRect(this.x, this.y, this.w, this.h);

            this.font.draw( this.buttonText, this.x, this.y, ig.Font.ALIGN.LEFT );            
        }
    });

    var textField = menuButton.extend({
        isEditing : false,
        fieldColor : '#000',
        fieldText : '',
        maxCharacterLength : 10,

        init: function(x, y, w, h, texty1, color1, color2) {
            this.parent(x, y, w, h, texty1, color1);
            if(color2 != null) this.fieldColor = color2;
        },

        update: function(texty2) {
            if(texty2 != null) this.fieldText = texty2;
        },

        draw: function() {
            //button background color
            var dividerWidth = this.font.widthForString(this.buttonText);
            var ctx = ig.system.context;
            ctx.fillStyle = this.buttonColor;
            ctx.fillRect(this.x, this.y, dividerWidth, this.h);
            ctx.fillStyle = this.fieldColor;
            ctx.fillRect(this.x + dividerWidth, this.y, this.w - dividerWidth, this.h);

            this.font.draw( this.buttonText + ' ' + this.fieldText, this.x, this.y, ig.Font.ALIGN.LEFT );            
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
            this.joinButton.init(ig.system.width * .3, ig.system.height * .9, 70, 30, 'JOIN', '#222');
            this.hostButton.init(ig.system.width * .5, ig.system.height * .9, 70, 30, 'HOST', '#222');
            this.optionsButton.init(ig.system.width * .7, ig.system.height * .9, 70, 30, 'OPTIONS', '#222');
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
        serverNameField : new textField(),
        


        init: function () {
            // Initialize your game here; bind keys etc.
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');

            for ( var i = 48; i <= 90; i++ ){
                var j = String.fromCharCode(i);
                ig.input.bind( i, j );
            }
            ig.input.bind( ig.KEY.BACKSPACE, 'backspace');
            ig.input.bind( ig.KEY.SPACE, 'space');

            this.backButton.init(ig.system.width * .4, ig.system.height * .9, 70, 30, 'BACK', '#222');
            this.createButton.init(ig.system.width * .6, ig.system.height * .9, 70, 30, 'CREATE', '#222');
            this.serverNameField.init(ig.system.width * .45, ig.system.height * .4, 150, 20, 'Server Name:', '#008', '#003')
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
                else if(this.serverNameField.isOnButton()) {
                    this.serverNameField.isEditing = true;
                }
                else {
                    this.serverNameField.isEditing = false;
                }
            }
            //handle input text
            if(this.serverNameField.isEditing) {
                if(serverName.length < this.serverNameField.maxCharacterLength){
                    for ( var i = 48; i <= 90; i++ ){
                        var j = String.fromCharCode(i);
                        if( ig.input.pressed(j) ) {
                            serverName += j;
                        }
                    }
                    if( ig.input.pressed('space') ) {
                        serverName = serverName + " ";
                    }
                }
                if( ig.input.pressed('backspace') ) {
                    serverName = serverName.substring(0, serverName.length - 1);
                }
            }
            this.serverNameField.update(serverName);

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
            //this.font.draw('Server Name:  ' + serverName, cntrX, scrHgt * .4, ig.Font.ALIGN.CENTER);
            this.serverNameField.draw();
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
            this.specificButton.init(ig.system.width * .3, ig.system.height * .9, 70, 30, 'SPECIFIC\nSERVER', '#222');
            this.randomButton.init(ig.system.width * .5, ig.system.height * .9, 70, 30, 'RANDOM\nSERVER', '#222');
            this.backButton.init(ig.system.width * .7, ig.system.height * .9, 70, 30, 'BACK', '#222');
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
            this.backButton.init(ig.system.width * .4, ig.system.height * .9, 70, 30, 'BACK\nTO\nMENU', '#222');
            this.startButton.init(ig.system.width * .6, ig.system.height * .9, 70, 30, 'START\nGAME', '#222');
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
            this.backButton.init(ig.system.width * .5, ig.system.height * .9, 70, 30, 'BACK', '#222');
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
            this.returnStartButton.init(ig.system.width * .6, ig.system.height * .9, 70, 30, 'RETURN\nTO\nMENU', '#222');
            this.returnLobbyButton.init(ig.system.width * .4, ig.system.height * .9, 70, 30, 'RETURN\nTO\nLOBBY', '#222');
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

