ig.module(
    'game.menu'
)
.requires(
    'impact.game',
    'game.ui.fontSheet', 
    'game.ui.menuButton'
)
.defines(function () {
    //global variables
    var serverName = 'VOYAGER';
    var numPlayers = 2;
    var isServerPublic = false;

    //Starting logo splash screen
    LogoScreen = ig.Game.extend({
        //declare variables
        font: new FontSheet( 'media/FontSheet_128.png' ), 
        background: new ig.Image('media/lasercat.png'),
        name: new ig.Image('media/BrandName.png'),
        textures: new Array(), 

        init: function() {
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
            this.textures.push(glLoadTexture(this.background.data));
            this.textures.push(glLoadTexture(this.name.data));
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

            glDraw(this.background.width, this.background.height, cntrX, cntrY-100, 1.0, this.textures[0]);
            glDraw(this.name.width, this.name.height, cntrX, cntrY+150, 1.0, this.textures[1]);
            this.font.draw( 'Click to continue', cntrX, scrHgt - 10, ig.Font.ALIGN.CENTER );
            this.font.draw('Lazor Kitty Studios\npresent', cntrX, cntrY, ig.Font.ALIGN.CENTER);
        }
    });

    //Main Menu
    StartScreen = ig.Game.extend({
        //declare variables
        background: new ig.Image('media/logos.jpg'),
        title: new ig.Image('media/title.png'),
        joinButton : null,
        hostButton : null,
        optionsButton : null,
        textures: new Array(), 
        
        init: function() {
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
            this.joinButton = new MenuButton(ig.system.width * .3, ig.system.height * .9, 'JOIN');
            this.hostButton = new MenuButton(ig.system.width * .5, ig.system.height * .9, 'HOST');
            this.optionsButton = new MenuButton(ig.system.width * .7, ig.system.height * .9, 'OPTIONS');

            this.textures.push(glLoadTexture(this.background.data));
            this.textures.push(glLoadTexture(this.title.data));
        },
        update: function() {
            //handle buttons
            if(this.joinButton.isMouseOver()&&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(JoinScreen)
            }
            else if(this.hostButton.isMouseOver()&&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(CreateScreen)
            }
            else if(this.optionsButton.isMouseOver()&&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(OptionsScreen)
            }
            this.parent();
        },
        draw: function() {
            var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;

            glDraw(this.background.width, this.background.height, cntrX, cntrY, 1.0, this.textures[0]);
            glDraw(this.title.width, this.title.height, cntrX, 100, 1.0, this.textures[1]);
            this.joinButton.draw();
            this.hostButton.draw();
            this.optionsButton.draw();
        }
    });
    
    //screen for host to create a game
    CreateScreen = ig.Game.extend({
        label: new ig.Image('media/CreateGame.png'),
        textures: new Array(), 

        // Load a font
        font: new FontSheet( 'media/FontSheet_128.png' ), 
        backButton : null,
        createButton : null,
        serverNameField : null,
        numPlayerButton2 : null,
        numPlayerButton3 : null,
        numPlayerButton4 : null,
        numPlayerButton5 : null,
        numPlayerButton6 : null,
        publicButton : null,
        privateButton : null,

        init: function () {
            // Initialize your game here; bind keys etc.
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');

            for ( var i = 48; i <= 90; i++ ){
                var j = String.fromCharCode(i);
                ig.input.bind( i, j );
            }
            ig.input.bind( ig.KEY.BACKSPACE, 'backspace');
            ig.input.bind( ig.KEY.SPACE, 'space');

            this.backButton = new MenuButton(ig.system.width * .4, ig.system.height * .9, 'BACK');
            this.createButton = new MenuButton(ig.system.width * .6, ig.system.height * .9, 'CREATE');
            this.serverNameField = new TextField(ig.system.width * .45, ig.system.height * .3, 'Server Name:');
            this.numPlayerButton2 = new MenuButton(ig.system.width * .3, ig.system.height * .4, '2');
            this.numPlayerButton3 = new MenuButton(ig.system.width * .4, ig.system.height * .4, '3');
            this.numPlayerButton4 = new MenuButton(ig.system.width * .5, ig.system.height * .4, '4');
            this.numPlayerButton5 = new MenuButton(ig.system.width * .6, ig.system.height * .4, '5');
            this.numPlayerButton6 = new MenuButton(ig.system.width * .7, ig.system.height * .4, '6');
            this.publicButton = new MenuButton(ig.system.width * .4, ig.system.height * .6, 'PUBLIC');
            this.privateButton = new MenuButton(ig.system.width * .6, ig.system.height * .6, 'PRIVATE');


            this.textures.push(glLoadTexture(this.label.data));
        },

        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            //handle buttons
            if(this.backButton.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(StartScreen);
            }
            else if(this.createButton.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(LobbyScreen);
            }
            else if(this.serverNameField.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                this.serverNameField.isEditing = true;
            }
            else if(this.numPlayerButton2.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                this.numPlayerButton2.active = true;
                this.numPlayerButton3.active = false;
                this.numPlayerButton4.active = false;
                this.numPlayerButton5.active = false;
                this.numPlayerButton6.active = false;
                numPlayers = 2;
            }
            else if(this.numPlayerButton3.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                this.numPlayerButton2.active = false;
                this.numPlayerButton3.active = true;
                this.numPlayerButton4.active = false;
                this.numPlayerButton5.active = false;
                this.numPlayerButton6.active = false;
                numPlayers = 3;
            }
            else if(this.numPlayerButton4.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                this.numPlayerButton2.active = false;
                this.numPlayerButton3.active = false;
                this.numPlayerButton4.active = true;
                this.numPlayerButton5.active = false;
                this.numPlayerButton6.active = false;
                numPlayers = 4;
            }
            else if(this.numPlayerButton5.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                this.numPlayerButton2.active = false;
                this.numPlayerButton3.active = false;
                this.numPlayerButton4.active = false;
                this.numPlayerButton5.active = true;
                this.numPlayerButton6.active = false;
                numPlayers = 5;
            }
            else if(this.numPlayerButton6.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                this.numPlayerButton2.active = false;
                this.numPlayerButton3.active = false;
                this.numPlayerButton4.active = false;
                this.numPlayerButton5.active = false;
                this.numPlayerButton6.active = true;
                numPlayers = 6;
            }
            else if(this.publicButton.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                this.publicButton.active = true;
                this.privateButton.active = false;
                isServerPublic = true;
            }
            else if(this.privateButton.isMouseOver() &&ig.input.pressed ('leftMouse')) {
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

            glDraw(this.label.width, this.label.height, cntrX, cntrY-200, 1.0, this.textures[0]);
            this.numPlayerButton2.draw();
            this.numPlayerButton3.draw();
            this.numPlayerButton4.draw();
            this.numPlayerButton5.draw();
            this.numPlayerButton6.draw();
            this.publicButton.draw();
            this.privateButton.draw();
            this.backButton.draw();
            this.createButton.draw();
            this.font.draw('Create a game', cntrX, scrHgt * .2, ig.Font.ALIGN.CENTER);
            this.font.draw('Server Name:  ' + serverName, cntrX, scrHgt * .4, ig.Font.ALIGN.CENTER);
            this.font.draw('Number of players:', cntrX, scrHgt * .36, ig.Font.ALIGN.CENTER);
            this.font.draw('Server type:', cntrX, scrHgt * .56, ig.Font.ALIGN.CENTER);
            this.serverNameField.draw();
        }
    });
    
    //screen for players to choose a server to join
    JoinScreen = ig.Game.extend({ 
        label: new ig.Image('media/JoinGame.png'),
        textures: new Array(), 

        font: new FontSheet( 'media/FontSheet_128.png' ), 
        specificButton : null,
        randomButton : null,
        backButton : null,
        serverNameField : null,
        choosingServer : false,
        joinButton : null,
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

            this.specificButton = new MenuButton(ig.system.width * .4, ig.system.height * .5, 'SPECIFIC\nSERVER');
            this.randomButton = new MenuButton(ig.system.width * .6, ig.system.height * .5, 'RANDOM\nSERVER');
            this.backButton = new MenuButton(ig.system.width * .5, ig.system.height * .9, 'BACK');
            this.serverNameField = new TextField(ig.system.width * .35, ig.system.height * .6, 'Server Name:');
            this.joinButton = new MenuButton(ig.system.width * .4, ig.system.height * .7, 'JOIN\nSERVER');

            this.textures.push(glLoadTexture(this.label.data));
        },

        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            //handle buttons
            if(this.specificButton.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                this.choosingServer = !this.choosingServer;
            }
            else if(this.randomButton.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(LobbyScreen);
            }
            else if(this.backButton.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(StartScreen);
            }
            if(this.choosingServer) this.ChooseServer();

        },

        draw: function () {
            var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;

            glDraw(this.label.width, this.label.height, cntrX, cntrY-150, 1.0, this.textures[0]);
            if(this.choosingServer) 
            {
                this.serverNameField.draw();
                this.joinButton.draw();
            }
            this.specificButton.draw();
            this.randomButton.draw();
            this.backButton.draw();
            this.font.draw('Join a Server', cntrX, scrHgt * .3, ig.Font.ALIGN.CENTER);
        },

        ChooseServer: function() {  
            if(this.serverNameField.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                this.serverNameField.isEditing = true;
            }  
            else if(this.joinButton.isMouseOver() &&ig.input.pressed ('leftMouse')) {
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
        label: new ig.Image('media/Lobby.png'),
        textures: new Array(), 

        font: new FontSheet( 'media/FontSheet_128.png' ), 
        backButton : null,
        startButton : null,


        init: function () {
            // Initialize your game here; bind keys etc.
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
            this.backButton = new MenuButton(ig.system.width * .4, ig.system.height * .9, 'BACK\nTO\nMENU');
            this.startButton = new MenuButton(ig.system.width * .6, ig.system.height * .9, 'START\nGAME');

            this.textures.push(glLoadTexture(this.label.data));
        },

        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            //handle buttons
            if(this.backButton.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(StartScreen);
            }
            else if(this.startButton.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(GameScreen);
            }

        },

        draw: function () {
            var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;

            glDraw(this.label.width, this.label.height, cntrX, cntrY, 1.0, this.textures[0]);
            this.backButton.draw();
            this.startButton.draw();
            this.font.draw('You are in the lobby...', cntrX, scrHgt * .2, ig.Font.ALIGN.CENTER);
            this.font.draw('Server Name: ' + serverName, cntrX, scrHgt * .4, ig.Font.ALIGN.CENTER);
        }
    });
    
    //Options menu
    OptionsScreen = ig.Game.extend({
        label: new ig.Image('media/Options.png'),
        textures: new Array(), 

        font: new FontSheet( 'media/FontSheet_128.png' ), 
        backButton: null,


        init: function () {
            // Initialize your game here; bind keys etc.
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
            this.backButton = new MenuButton(ig.system.width * .5, ig.system.height * .9, 'BACK');

            this.textures.push(glLoadTexture(this.label.data));
        },

        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            //handle buttons
            if(this.backButton.isMouseOver() &&ig.input.pressed ('leftMouse')){
               ig.system.setGame(StartScreen); 
            }               

        },

        draw: function () {
            var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;

            glDraw(this.label.width, this.label.height, cntrX, cntrY, 1.0, this.textures[0]);
            this.backButton.draw();
            this.font.draw('Options', cntrX, cntrY, ig.Font.ALIGN.CENTER);
        }
    });

    //screen to display post-game stats
    StatsScreen = ig.Game.extend({
        label: new ig.Image('media/Stats.png'),
        textures: new Array(), 

        font: new FontSheet( 'media/FontSheet_128.png' ), 
        returnStartButton : null,
        returnLobbyButton : null,


        init: function () {
            // Initialize your game here; bind keys etc.
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
            this.returnStartButton = new MenuButton(ig.system.width * .6, ig.system.height * .9, 70, 30, 'RETURN\nTO\nMENU', '#222');
            this.returnLobbyButton = new MenuButton(ig.system.width * .4, ig.system.height * .9, 70, 30, 'RETURN\nTO\nLOBBY', '#222');

            this.textures.push(glLoadTexture(this.label.data));
        },

        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            //handle buttons
            if(this.returnLobbyButton.isMouseOver() &&ig.input.pressed ('leftMouse')) {
                ig.system.setGame(LobbyScreen);
            }
            else if(this.returnStartButton.isMouseOver() &&ig.input.pressed ('leftMouse')) {
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

            glDraw(this.label.width, this.label.height, cntrX, cntrY, 1.0, this.textures[0]);
            
            this.font.draw('Wow, look at those stats...', cntrX, cntrY, ig.Font.ALIGN.CENTER);
            this.returnLobbyButton.draw();
            this.returnStartButton.draw();
        }
    });
});