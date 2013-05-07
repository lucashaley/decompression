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
    var numPlayers = 2;
    var isServerPublic = false;

    //base button class
    var menuButton = ig.Class.extend({
        font: new ig.Font( 'media/04b03.font.png' ),
        x : 100,
        y : 400,
        w : 100,
        h : 100,
        buttonText : '',
        buttonColor : '#000',
        buttonHoverColor : '#333',
        buttonActiveColor : '#666',
        hovering : false,
        active : false,

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
                this.hovering = true;
                return true;
            }
            else {
                this.hovering = false;
                return false;
            }
        },
        draw: function() {
            //button background color
            var ctx = ig.system.context;
            if(this.hovering) ctx.fillStyle = this.buttonHoverColor;
            else if(this.active) ctx.fillStyle = this.buttonActiveColor;
            else ctx.fillStyle = this.buttonColor;
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
            this.font.draw('Lazor Kitty Studios\npresent', cntrX, cntrY, ig.Font.ALIGN.CENTER);

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
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
            this.joinButton.init(ig.system.width * .3, ig.system.height * .9, 70, 30, 'JOIN', '#222');
            this.hostButton.init(ig.system.width * .5, ig.system.height * .9, 70, 30, 'HOST', '#222');
            this.optionsButton.init(ig.system.width * .7, ig.system.height * .9, 70, 30, 'OPTIONS', '#222');
        },
        update: function() {
            //handle buttons
            if(this.joinButton.isOnButton()&&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(JoinScreen)
            }
            else if(this.hostButton.isOnButton()&&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(CreateScreen)
            }
            else if(this.optionsButton.isOnButton()&&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(OptionsScreen)
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
        numPlayerButton2 : new menuButton(),
        numPlayerButton3 : new menuButton(),
        numPlayerButton4 : new menuButton(),
        numPlayerButton5 : new menuButton(),
        numPlayerButton6 : new menuButton(),
        publicButton : new menuButton(),
        privateButton : new menuButton(),

        


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
            this.serverNameField.init(ig.system.width * .45, ig.system.height * .3, 150, 20, 'Server Name:', '#000', '#003');
            this.numPlayerButton2.init(ig.system.width * .3, ig.system.height * .4, 30, 30, '2', '#111');
            this.numPlayerButton3.init(ig.system.width * .4, ig.system.height * .4, 30, 30, '3', '#111');
            this.numPlayerButton4.init(ig.system.width * .5, ig.system.height * .4, 30, 30, '4', '#111');
            this.numPlayerButton5.init(ig.system.width * .6, ig.system.height * .4, 30, 30, '5', '#111');
            this.numPlayerButton6.init(ig.system.width * .7, ig.system.height * .4, 30, 30, '6', '#111');
            this.publicButton.init(ig.system.width * .4, ig.system.height * .6, 40, 30, 'PUBLIC', '#111');
            this.privateButton.init(ig.system.width * .6, ig.system.height * .6, 40, 30, 'PRIVATE', '#111');
        },

        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            //handle buttons
            if(this.backButton.isOnButton() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(StartScreen);
            }
            else if(this.createButton.isOnButton() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(LobbyScreen);
            }
            else if(this.serverNameField.isOnButton() &&ig.input.pressed ('leftMouse')) {
                this.serverNameField.isEditing = true;
            }
            else if(this.numPlayerButton2.isOnButton() &&ig.input.pressed ('leftMouse')) {
                this.numPlayerButton2.active = true;
                this.numPlayerButton3.active = false;
                this.numPlayerButton4.active = false;
                this.numPlayerButton5.active = false;
                this.numPlayerButton6.active = false;
                numPlayers = 2;
            }
            else if(this.numPlayerButton3.isOnButton() &&ig.input.pressed ('leftMouse')) {
                this.numPlayerButton2.active = false;
                this.numPlayerButton3.active = true;
                this.numPlayerButton4.active = false;
                this.numPlayerButton5.active = false;
                this.numPlayerButton6.active = false;
                numPlayers = 3;
            }
            else if(this.numPlayerButton4.isOnButton() &&ig.input.pressed ('leftMouse')) {
                this.numPlayerButton2.active = false;
                this.numPlayerButton3.active = false;
                this.numPlayerButton4.active = true;
                this.numPlayerButton5.active = false;
                this.numPlayerButton6.active = false;
                numPlayers = 4;
            }
            else if(this.numPlayerButton5.isOnButton() &&ig.input.pressed ('leftMouse')) {
                this.numPlayerButton2.active = false;
                this.numPlayerButton3.active = false;
                this.numPlayerButton4.active = false;
                this.numPlayerButton5.active = true;
                this.numPlayerButton6.active = false;
                numPlayers = 5;
            }
            else if(this.numPlayerButton6.isOnButton() &&ig.input.pressed ('leftMouse')) {
                this.numPlayerButton2.active = false;
                this.numPlayerButton3.active = false;
                this.numPlayerButton4.active = false;
                this.numPlayerButton5.active = false;
                this.numPlayerButton6.active = true;
                numPlayers = 6;
            }
            else if(this.publicButton.isOnButton() &&ig.input.pressed ('leftMouse')) {
                this.publicButton.active = true;
                this.privateButton.active = false;
                isServerPublic = true;
            }
            else if(this.privateButton.isOnButton() &&ig.input.pressed ('leftMouse')) {
                this.publicButton.active = false;
                this.privateButton.active = true;
                isServerPublic = false;
            }
            else if(ig.input.pressed ('leftMouse')) {
                this.serverNameField.isEditing = false;
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
            this.font.draw('Number of players:', cntrX, scrHgt * .36, ig.Font.ALIGN.CENTER);
            this.numPlayerButton2.draw();
            this.numPlayerButton3.draw();
            this.numPlayerButton4.draw();
            this.numPlayerButton5.draw();
            this.numPlayerButton6.draw();
            this.font.draw('Server type:', cntrX, scrHgt * .56, ig.Font.ALIGN.CENTER);
            this.publicButton.draw();
            this.privateButton.draw();
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
        serverNameField : new textField(),
        choosingServer : false,
        joinButton : new menuButton(),
        newServer : '',


        init: function () {
            // Initialize your game here; bind keys etc.
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');

            for ( var i = 48; i <= 90; i++ ){
                var j = String.fromCharCode(i);
                ig.input.bind( i, j );
            }
            ig.input.bind( ig.KEY.BACKSPACE, 'backspace');
            ig.input.bind( ig.KEY.SPACE, 'space');

            this.specificButton.init(ig.system.width * .4, ig.system.height * .5, 70, 30, 'SPECIFIC\nSERVER', '#222');
            this.randomButton.init(ig.system.width * .6, ig.system.height * .5, 70, 30, 'RANDOM\nSERVER', '#222');
            this.backButton.init(ig.system.width * .5, ig.system.height * .9, 70, 30, 'BACK', '#222');
            this.serverNameField.init(ig.system.width * .35, ig.system.height * .6, 150, 20, 'Server Name:', '#000', '#003');
            this.joinButton.init(ig.system.width * .4, ig.system.height * .7, 70, 30, 'JOIN\nSERVER', '#222');
        },

        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            //handle buttons
            if(this.specificButton.isOnButton() &&ig.input.pressed ('leftMouse')) {
                this.choosingServer = !this.choosingServer;
            }
            else if(this.randomButton.isOnButton() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(LobbyScreen);
            }
            else if(this.backButton.isOnButton() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(StartScreen);
            }
            if(this.choosingServer) this.ChooseServer();

        },

        draw: function () {
            var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;
            // Draw all entities and backgroundMaps
            this.parent();

            // Add your own drawing code here

            this.font.draw('Join a Server', cntrX, scrHgt * .3, ig.Font.ALIGN.CENTER);
            this.specificButton.draw();
            this.randomButton.draw();
            this.backButton.draw();
            if(this.choosingServer) {
                this.serverNameField.draw();
                this.joinButton.draw();
            }
        },

        ChooseServer: function() {  
            if(this.serverNameField.isOnButton() &&ig.input.pressed ('leftMouse')) {
                this.serverNameField.isEditing = true;
            }  
            else if(this.joinButton.isOnButton() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(LobbyScreen);
            }
            else if(ig.input.pressed ('leftMouse')) {
                this.serverNameField.isEditing = false;
            }   

            if(this.serverNameField.isEditing) {
                if(this.newServer.length < this.serverNameField.maxCharacterLength){
                    for ( var i = 48; i <= 90; i++ ){
                        var j = String.fromCharCode(i);
                        if( ig.input.pressed(j) ) {
                            this.newServer += j;
                        }
                    }
                    if( ig.input.pressed('space') ) {
                        this.newServer = this.newServer + " ";
                    }
                }
                if( ig.input.pressed('backspace') ) {
                    this.newServer = this.newServer.substring(0, this.newServer.length - 1);
                }
            }
            this.serverNameField.update(this.newServer);
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
            if(this.backButton.isOnButton() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(StartScreen);
            }
            else if(this.startButton.isOnButton() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(GameScreen);
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
            if(this.backButton.isOnButton() &&ig.input.pressed ('leftMouse')){
               ig.system.setGame(StartScreen); 
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
            if(this.returnLobbyButton.isOnButton() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(LobbyScreen);
            }
            else if(this.returnStartButton.isOnButton() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(StartScreen);
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

