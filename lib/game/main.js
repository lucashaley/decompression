ig.module(
	'game.main'
)
.requires(
	'impact.game', 

    'game.init'//, 

    //'game.menu'
)
.defines(function () {

    //for when players are in game
    GameScreen = ig.Game.extend({
        staticUI : new ig.Image('media/gameUIClosed.png'), 
        textures: new Array(), 

        abilityButton : null, 
        scavengeButton : null, 
        endTurnButton : null, 

        init: function()
        {
            ig.input.bind(ig.KEY.MOUSE1, 'leftMouse');
            ig.input.bind(ig.KEY.MOUSE2, 'rightMouse');

            AssetCore.load();

            /*GameCore.init();
            ItemCore.init();
            EnemyCore.init();
            RoomCore.init();*/
            RoomCore.generate();

            GameCore.registerPlayer("Lucas", "Cybernetic Warrior");
            GameCore.registerPlayer("Brandon", "PSI Agent");
            GameCore.registerPlayer("Yordan", "Navy Officer");
            GameCore.registerPlayer("Kris", "Scavenger");

            GameCore.rooms[0].addPlayer(GameCore.players[0]);
            GameCore.rooms[0].addPlayer(GameCore.players[1]);
            GameCore.rooms[0].addPlayer(GameCore.players[2]);
            GameCore.rooms[0].addPlayer(GameCore.players[3]);
            GameCore.rooms[0].addEnemy();
            GameCore.rooms[1].addEnemy();

            //for (var i = 0; i < GameCore.players.length; i++) GameCore.players[i].init();

            GameCore.players[0].addItem(ItemCore.requestItemByName('Mod A'));
            GameCore.players[0].addItem(ItemCore.requestItemByName('Mod B'));

            GameCore.players[1].addItem(ItemCore.requestItemByName('Red Keycard'));
            GameCore.players[2].addItem(ItemCore.requestItemByName('Green Keycard'));
            GameCore.players[3].addItem(ItemCore.requestItemByName('Blue Keycard'));

            GameCore.onGameStart();

            this.abilityButton = new MenuButton(ig.system.width - 80, ig.system.height - 240, 'ABILITY');
            this.scavengeButton = new MenuButton((ig.system.width / 2) + 160, 32, 'SCAVENGE');
            this.endTurnButton = new MenuButton((ig.system.width / 2), 32, 'END TURN');
            //this.abilityButton.init(ig.system.width - 80, ig.system.height - 240, 'ABILITY');
            //this.scavengeButton.init((ig.system.width / 2) + 160, 32, 'SCAVENGE');
            //this.endTurnButton.init((ig.system.width / 2), 32, 'END TURN');

            //this.textures.push(glLoadTexture(this.staticUI.data));
        },

        update: function()
        {
            this.parent();
            if (!GameCore.stillPlaying)
            {
                return;
            }
            if (ig.input.pressed('leftMouse'))
            {
                if (this.abilityButton.isMouseOver())
                {
                    GameCore.selectedUseAbility = true;
                }
                if (this.scavengeButton.isMouseOver())
                {
                    GameCore.selectedScavenge = true;
                }
                if (this.endTurnButton.isMouseOver())
                {
                    GameCore.activePlayer.endTurn();
                }
            }

            GameCore.update();
            GameCore.currentRoom.update();
        },

        draw: function()
        {
            GameCore.currentRoom.draw();
            if (!GameCore.activePlayer.actions.usedAbility) this.abilityButton.draw();
            if (GameCore.currentRoom.hasItems) this.scavengeButton.draw();
            this.endTurnButton.draw();
            MainFont.draw('USERNAME      : ' + GameCore.activePlayer.name, 512, ig.system.height - 152, ig.Font.ALIGN.LEFT);
            MainFont.draw('JOB           : ' + GameCore.activePlayer.jobName, 512, ig.system.height - 136, ig.Font.ALIGN.LEFT);
            MainFont.draw('MAX HEALTH    : ' + GameCore.activePlayer.status.maxHealth, 512, ig.system.height - 120, ig.Font.ALIGN.LEFT);
            MainFont.draw('HEALTH        : ' + GameCore.activePlayer.status.health, 512, ig.system.height - 104, ig.Font.ALIGN.LEFT);
            MainFont.draw('ARMOR         : ' + GameCore.activePlayer.status.armor, 512, ig.system.height - 88, ig.Font.ALIGN.LEFT);
            MainFont.draw('INVENTORY CAP : ' + GameCore.activePlayer.status.inventoryCap, 512, ig.system.height - 72, ig.Font.ALIGN.LEFT);
            MainFont.draw('ATTACK BONUS  : ' + GameCore.activePlayer.status.attackBonus, 512, ig.system.height - 56, ig.Font.ALIGN.LEFT);
            MainFont.draw('ALLY BONUS    : ' + GameCore.activePlayer.status.allyBonus, 512, ig.system.height - 40, ig.Font.ALIGN.LEFT);
            MainFont.draw('ACTIONS       : ' + GameCore.activePlayer.actions.remaining, 512, ig.system.height - 24, ig.Font.ALIGN.LEFT);
            MainFont.draw('RED KEYCARD   : ' + GameCore.keyCardFound.red, 24, 24, ig.Font.ALIGN.LEFT);
            MainFont.draw('GREEN KEYCARD : ' + GameCore.keyCardFound.green, 24, 40, ig.Font.ALIGN.LEFT);
            MainFont.draw('BLUE KEYCARD  : ' + GameCore.keyCardFound.blue, 24, 56, ig.Font.ALIGN.LEFT);
            MainFont.draw('ITEMS LEFT    : ' + GameCore.currentRoom.lootAmount, 24, 72, ig.Font.ALIGN.LEFT);
            MainFont.draw('00 : ' + GameCore.activePlayerTimeLeft, ig.system.width / 2, 80, ig.Font.ALIGN.CENTER);
            for (var i = 0; i < GameCore.activePlayer.status.inventoryCap; i++)
            {
                var item = GameCore.activePlayer.inventory[i];
                if (item == undefined || item == null) continue;
                item.setPosition(ig.system.width - 160, ig.system.height - (128 * (GameCore.activePlayer.status.inventoryCap - i - 1)) - 64);
                item.draw();
            }
            if (GameCore.activeContextMenu != null) GameCore.activeContextMenu.draw();
            glDraw(1024, 1024, 0, 0, 1, AssetCore.testSheet);
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