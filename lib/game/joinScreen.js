ig.module(
    'game.screens.joinScreen'
)
.requires(
    'impact.game',
    'impact.font'
)
.defines(function () {
    //screen for players to choose a server to join
    JoinScreen = ig.Game.extend({ 
        label: new ig.Image('media/JoinGame.png'),
        textures: new Array(), 

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

            this.textures.push(glLoadTexture(this.label.data));
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

            //this.font.draw('Join a Server', cntrX, scrHgt * .3, ig.Font.ALIGN.CENTER);
            this.specificButton.draw();
            this.randomButton.draw();
            this.backButton.draw();
            if(this.choosingServer) {
                this.serverNameField.draw();
                this.joinButton.draw();
            }

            glDraw(this.label.width, this.label.height, cntrX, cntrY-150, 1.0, this.textures[0]);
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
});