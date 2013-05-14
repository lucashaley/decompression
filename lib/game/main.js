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
        image: new ig.Image('lib/game/media/button.png'),
        x : 100,
        y : 400,
        buttonText : '',
        buttonColor : new Color(0.0, 0.0, 0.0),
        buttonHoverColor : new Color(0.2, 0.2, 0.2),
        buttonActiveColor : new Color(0.4, 0.4, 0.4),
        hovering : false,
        active : false,
        texture : null, 

        init: function (x, y, texty, color) {
            this.x = x;
            this.y = y;
            if(texty != null) this.buttonText = texty;
            if(color != null) this.buttonColor = color;
            this.texture = glEmptyTexture();
            glLoadTexture(this.image.data, this.texture);
        },

        //handles button clicking
        isOnButton: function() {
            var halfW = this.image.width / 2;
            var halfH = this.image.height / 2;
            if(ig.input.mouse.x > this.x - halfW && ig.input.mouse.x < this.x+halfW && ig.input.mouse.y > this.y - halfH && ig.input.mouse.y < this.y+halfH) {
                this.hovering = true;
                return true;
            }
            else {
                this.hovering = false;
                return false;
            }
        },
        draw: function() {
            var usingColor = null;
            if(this.hovering) usingColor = this.buttonHoverColor;
            else if(this.active) usingColor = this.buttonActiveColor;
            else usingColor = this.buttonColor;

            glDraw(this.image.width, this.image.height, this.x, this.y, usingColor, this.texture);
            this.font.draw( this.buttonText, this.x, this.y, ig.Font.ALIGN.LEFT );
        }
    });

    var textField = menuButton.extend({
        isEditing : false,
        fieldColor : new Color(0.0, 0.0, 0.0),
        fieldText : '',
        maxCharacterLength : 10,

        init: function(x, y, color) {
            if(color != null) this.fieldColor = color;
        },

        update: function(texty2) {
            if(texty2 != null) this.fieldText = texty2;
        },

        draw: function() {
            this.parent();
            this.font.draw( this.buttonText + ' ' + this.fieldText, this.x, this.y, ig.Font.ALIGN.LEFT );
        }
    });

    //Starting logo splash screen
    LogoScreen = ig.Game.extend({
        //declare variables
        font: new ig.Font('media/04b03.font.png'),
        background: new ig.Image('lib/game/media/lasercat.jpg'),
        textures: new Array(), 

        init: function() {
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');

            this.textures.push(glEmptyTexture());
            glLoadTexture(this.background.data, this.textures[0]);
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

            this.font.draw( 'Click to continue', cntrX, scrHgt - 10, ig.Font.ALIGN.CENTER );
            this.font.draw('Lazor Kitty Studios\npresent', cntrX, cntrY, ig.Font.ALIGN.CENTER);
            glDraw(this.background.width, this.background.height, cntrX, cntrY, null, this.textures[0]);
        }
    });

    //Main Menu
    StartScreen = ig.Game.extend({
        //declare variables
        background: new ig.Image('lib/game/media/ship.jpg'),
        title: new ig.Image('lib/game/media/title.png'),
        joinButton : new menuButton(),
        hostButton : new menuButton(),
        optionsButton : new menuButton(),
        textures: new Array(), 
        
        init: function() {
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
            this.joinButton.init(ig.system.width * .3, ig.system.height * .9, 'JOIN', new Color(0.2, 0.2, 0.2));
            this.hostButton.init(ig.system.width * .5, ig.system.height * .9, 'HOST', new Color(0.2, 0.2, 0.2));
            this.optionsButton.init(ig.system.width * .7, ig.system.height * .9, 'OPTIONS', new Color(0.2, 0.2, 0.2));
            this.textures.push(glEmptyTexture());
            this.textures.push(glEmptyTexture());
            glLoadTexture(this.background.data, this.textures[0]);
            glLoadTexture(this.title.data, this.textures[1]);
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

            glDraw(this.background.width, this.background.height, cntrX, cntrY, null, this.textures[0]);
            glDraw(this.title.width, this.title.height, cntrX, 30, null, this.textures[1]);
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

            this.backButton.init(ig.system.width * .4, ig.system.height * .9, 'BACK', new Color(0.2, 0.2, 0.2));
            this.createButton.init(ig.system.width * .6, ig.system.height * .9, 'CREATE', new Color(0.2, 0.2, 0.2));
            this.serverNameField.init(ig.system.width * .45, ig.system.height * .3, 'Server Name:', new Color(0.0, 0.0, 0.4));
            this.numPlayerButton2.init(ig.system.width * .3, ig.system.height * .4, '2', new Color(0.1, 0.1, 0.1));
            this.numPlayerButton3.init(ig.system.width * .4, ig.system.height * .4, '3', new Color(0.1, 0.1, 0.1));
            this.numPlayerButton4.init(ig.system.width * .5, ig.system.height * .4, '4', new Color(0.1, 0.1, 0.1));
            this.numPlayerButton5.init(ig.system.width * .6, ig.system.height * .4, '5', new Color(0.1, 0.1, 0.1));
            this.numPlayerButton6.init(ig.system.width * .7, ig.system.height * .4, '6', new Color(0.1, 0.1, 0.1));
            this.publicButton.init(ig.system.width * .4, ig.system.height * .6, 'PUBLIC', new Color(0.1, 0.1, 0.1));
            this.privateButton.init(ig.system.width * .6, ig.system.height * .6, 'PRIVATE', new Color(0.1, 0.1, 0.1));
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

            this.font.draw('Create a game', cntrX, scrHgt * .2, ig.Font.ALIGN.CENTER);
            this.font.draw('Server Name:  ' + serverName, cntrX, scrHgt * .4, ig.Font.ALIGN.CENTER);
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

            this.specificButton.init(ig.system.width * .4, ig.system.height * .5, 'SPECIFIC\nSERVER', new Color(0.2, 0.2, 0.2));
            this.randomButton.init(ig.system.width * .6, ig.system.height * .5, 'RANDOM\nSERVER', new Color(0.2, 0.2, 0.2));
            this.backButton.init(ig.system.width * .5, ig.system.height * .9, 'BACK', new Color(0.2, 0.2, 0.2));
            this.serverNameField.init(ig.system.width * .35, ig.system.height * .6, 'Server Name:', new Color(0.0, 0.0, 0.4));
            this.joinButton.init(ig.system.width * .4, ig.system.height * .7, 'JOIN\nSERVER', new Color(0.2, 0.2, 0.2));
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
            this.backButton.init(ig.system.width * .4, ig.system.height * .9, 'BACK\nTO\nMENU', new Color(0.2, 0.2, 0.2));
            this.startButton.init(ig.system.width * .6, ig.system.height * .9, 'START\nGAME', new Color(0.2, 0.2, 0.2));
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
            this.backButton.init(ig.system.width * .5, ig.system.height * .9, 'BACK', new Color(0.2, 0.2, 0.2));
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

            this.font.draw('Options', cntrX, cntrY, ig.Font.ALIGN.CENTER);
            this.backButton.draw();
        }
    });

    //for when players are in game
    GameScreen = ig.Game.extend({
        isMoving: false,
        moveDirX: 8,
        moveDirY: 5,

        roomX: 640,
        roomY: 400,
        nextRoomX: 900,
        nextRoomY: 600,

        // Load a font
        font: new ig.Font('media/04b03.font.png'), 
        diffuse: new ig.Image('lib/game/media/rm_recreation_01_D.png'),
        normal: new ig.Image('lib/game/media/rm_recreation_01_N.png'),
        relief: new ig.Image('lib/game/media/rm_recreation_01_R.png'),
        emissive: new ig.Image('lib/game/media/rm_recreation_01_E.png'),

        textures: new Array(), 
        lights: new Array(), 


        init: function () {
            // Initialize your game here; bind keys etc.
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
            ig.input.bind( ig.KEY.MOUSE2, 'rightMouse');
            ig.input.bind( ig.KEY.Q, 'upLeft');
            ig.input.bind( ig.KEY.W, 'upRight');
            ig.input.bind( ig.KEY.A, 'downLeft');
            ig.input.bind( ig.KEY.S, 'downRight');

            this.textures.push(glEmptyTexture());
            this.textures.push(glEmptyTexture());
            this.textures.push(glEmptyTexture());
            this.textures.push(glEmptyTexture());

            glLoadTexture(this.diffuse.data, this.textures[0]);
            glLoadTexture(this.normal.data, this.textures[1]);
            glLoadTexture(this.relief.data, this.textures[2]);
            glLoadTexture(this.emissive.data, this.textures[3]);

            this.lights.push(new Light(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0));
            this.lights.push(new Light(408, 555, 0.6, 4.0, 24.0, 1.0, 0.8, 0.75));
            this.lights.push(new Light(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0));
            this.lights.push(new Light(1000, 200, 7.3, 9.2, 18.8, 0.8, 0.9, 1.0));
            this.lights.push(new Light(800, 100, 7.3, 10.8, 30.8, 1.0, 0.8, 0.75));
        },

        update: function () {
            this.parent();

            if(ig.input.pressed('leftMouse')) {
                //ig.system.setGame(StatsScreen);

            }
            if(ig.input.state('rightMouse')) {
                this.lights[0].position[0] = ig.input.mouse.x;
                this.lights[0].position[1] = glCanvas.height - ig.input.mouse.y;
            }

            if(ig.input.pressed('upLeft')) {
                this.isMoving = true;
                this.moveDirX = -8;
                this.moveDirY = -5;

                this.nextRoomX = 1180;
                this.nextRoomY = 800;
                this.lights[3].position[0] = 1000;
                this.lights[3].position[1] = 200;
                this.lights[4].position[0] = 800;
                this.lights[4].position[1] = 100;
            }
            else if(ig.input.pressed('upRight')) {
                this.isMoving = true;
                this.moveDirX = 8;
                this.moveDirY = -5;

                this.nextRoomX = 100;
                this.nextRoomY = 800;
                this.lights[3].position[0] = 280;
                this.lights[3].position[1] = 200;
                this.lights[4].position[0] = 480;
                this.lights[4].position[1] = 100;
            }
            else if(ig.input.pressed('downLeft')) {
                this.isMoving = true;
                this.moveDirX = -8;
                this.moveDirY = 5;

                this.nextRoomX = 1180;
                this.nextRoomY = 0;
                this.lights[3].position[0] = 1000;
                this.lights[3].position[1] = 600;
                this.lights[4].position[0] = 800;
                this.lights[4].position[1] = 700;q
            }
            else if(ig.input.pressed('downRight')) {
                this.isMoving = true;
                this.moveDirX = 8;
                this.moveDirY = 5;

                this.nextRoomX = 100;
                this.nextRoomY = 0;
                this.lights[3].position[0] = 280;
                this.lights[3].position[1] = 600;
                this.lights[4].position[0] = 480;
                this.lights[4].position[1] = 700;
            }

            if( this.isMoving) {
                this.roomX += this.moveDirX;
                this.roomY += this.moveDirY;
                this.lights[0].position[0] += this.moveDirX;
                this.lights[0].position[1] -= this.moveDirY;
                this.lights[0].falloff[0] += .1;
                this.lights[0].falloff[1] += .1;
                this.lights[0].falloff[2] += .1;
                this.lights[1].position[0] += this.moveDirX;
                this.lights[1].position[1] -= this.moveDirY;
                this.lights[1].falloff[0] += .1;
                this.lights[1].falloff[1] += .1;
                this.lights[1].falloff[2] += .1;


                this.nextRoomX += this.moveDirX;
                this.nextRoomY += this.moveDirY;
                this.lights[3].position[0] += this.moveDirX;
                this.lights[3].position[1] -= this.moveDirY;
                this.lights[3].falloff[0] -= .1;
                this.lights[3].falloff[1] -= .1;
                this.lights[3].falloff[2] -= .1;
                this.lights[4].position[0] += this.moveDirX;
                this.lights[4].position[1] -= this.moveDirY;
                this.lights[4].falloff[0] -= .1;
                this.lights[4].falloff[1] -= .1;
                this.lights[4].falloff[2] -= .1;

                if(this.roomX <= 100 || this.roomX >=1180) {
                     this.isMoving = false;

                    var temp = this.roomX;
                    this.roomX = this.nextRoomX;
                    this.nextRoomX = temp;

                    temp = this.roomY;
                    this.roomY = this.nextRoomY;
                    this.nextRoomY = temp;

                    temp = this.lights[0];
                    this.lights[0] = this.lights[3];
                    this.lights[3] = temp;

                    temp = this.lights[1];
                    this.lights[1] = this.lights[4];
                    this.lights[4] = temp;
                }
            }
        },

        draw: function () {
            var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;

            //this.font.draw('You are playing the game', cntrX, cntrY, ig.Font.ALIGN.CENTER);

            glDraw(this.diffuse.width, this.diffuse.height, this.nextRoomX, this.nextRoomY, [1, 1, 1], 
                this.textures[0], this.textures[1], this.textures[2], this.textures[3], 
                this.lights[3], this.lights[4], null);

            glDraw(this.diffuse.width, this.diffuse.height, this.roomX, this.roomY, [1, 1, 1], 
                this.textures[0], this.textures[1], this.textures[2], this.textures[3], 
                this.lights[0], this.lights[1], null);
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

    ig.System.inject({init:function(canvasId,fps,width,height,scale)
        {
            glInit(document.getElementById(canvasId));
            this.fps = fps;
            this.clock = new ig.Timer();
            this.canvas = glCanvas;
            this.context = gl;
            this.resize(width, height, scale);
        }
    });
    ig.System.inject({clear:function(color)
        {
            glClear();
        }
    });
    ig.Font.inject({draw: function(text, x, y, align)
        {

        }
    });

    ig.main('canvas', /*LogoScreen*/GameScreen, 60, 1280, 800, 1, MyLoader);
});