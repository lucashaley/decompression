ig.module(
	'game.main'
)
.requires(
	'impact.game', 

    'game.ui.menuButton', 
    'game.ui.contextMenu', 

    'game.gamecore', 
    'game.itemcore', 
    'game.enemycore', 
    'game.init', 

    'game.menu'
)
.defines(function () {

    ig.global.ItemCore = new EntityItemCore();
    ig.global.EnemyCore = new EntityEnemyCore();
    ig.global.GameCore = new EntityGameCore();

    //for when players are in game
    GameScreen = ig.Game.extend({
        staticUI : new ig.Image('media/gameUIClosed.png'), 
        textures: new Array(), 

        scavengeButton : new menuButton(), 
        endTurnButton : new menuButton(), 

        init: function()
        {
            ig.input.bind(ig.KEY.MOUSE1, 'leftMouse');
            ig.input.bind(ig.KEY.MOUSE2, 'rightMouse');

            ItemCore.init();
            EnemyCore.init();
            GameCore.init();
            GameCore.onGameStart();

            this.scavengeButton.init((ig.system.width / 2), 32, 'SCAVENGE');
            this.endTurnButton.init((ig.system.width / 2) + 160, 32, 'END TURN');

            //this.textures.push(glLoadTexture(this.staticUI.data));
        },

        update: function()
        {
            this.parent();
            if (!GameCore.stillPlaying)
            {
                return;
            }

            GameCore.update();
            GameCore.currentRoom.update();
            if (ig.input.pressed('leftMouse'))
            {
                if (this.scavengeButton.isMouseOver())
                {
                    GameCore.activePlayer.scavenge();
                }
                if (this.endTurnButton.isMouseOver())
                {
                    GameCore.activePlayer.endTurn();
                }
            }
        },

        draw: function()
        {
            GameCore.currentRoom.draw();
            this.scavengeButton.draw();
            this.endTurnButton.draw();
            if (GameCore.activeContextMenu != null) GameCore.activeContextMenu.draw();
            for (var i = 0; i < GameCore.activePlayer.inventory.length; i++)
            {
                GameCore.activePlayer.inventory[i].draw();
            }
        }
    });

    //load screen (can remove this to default to basic white load bar)
    MyLoader = ig.Loader.extend({
        draw: function()
        {
        }
    });

    ig.main('canvas', GameScreen, 60, 1280, 800, 1, MyLoader);
    //ig.main('canvas', LogoScreen, 60, 1280, 800, 1, MyLoader);
});