ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
    'game.gamecore',
    'game.init', 

    'game.ui.menuButton', 
    'game.ui.popupMenu', 

    'game.menu'
)
.defines(function () {

    //for when players are in game
    GameScreen = ig.Game.extend({
        staticUI : new ig.Image('media/gameUIClosed.png'),        
        textures: new Array(), 

        init: function () {
            ig.input.bind(ig.KEY.MOUSE1, 'leftMouse');
            ig.input.bind(ig.KEY.MOUSE2, 'rightMouse');

            GameCore.init();
            GameCore.onGameStart();

            //this.textures.push(glLoadTexture(this.staticUI.data));
        },

        update: function () {
            this.parent();

            GameCore.update();
            GameCore.currentRoom.update();
            if(ig.input.pressed('rightMouse'))
            {
                //GameCore.activePlayer.moveTo(ig.input.mouse.x, ig.input.mouse.y);
                GameCore.activePlayer.endTurn();
            }
        },

        draw: function () {
            /*var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;*/

            GameCore.currentRoom.draw();
        }
    });

    //load screen (can remove this to default to basic white load bar)
    MyLoader = ig.Loader.extend({
        draw: function()
        {
        }
    });

    ig.global.GameCore = new EntityGameCore();

    ig.main('canvas', GameScreen, 60, 1280, 800, 1, MyLoader);
    //ig.main('canvas', LogoScreen, 60, 1280, 800, 1, MyLoader);
});