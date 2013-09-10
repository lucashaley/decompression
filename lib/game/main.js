ig.module(
	'game.main'
)
.requires(
	'impact.game',

    'game.init',

    'game.menu'
)
.defines(function () {

    Startup = ig.Game.extend({
        init: function()
        {},
        draw: function()
        {},
        update: function()
        {
            AssetCore.load();
            ig.system.setGame(GameScreen);
        },
    });

    //for when players are in game
    GameScreen = ig.Game.extend({

        abilityButton : null,
        scavengeButton : null,
        endTurnButton : null,

        init: function()
        {
            ig.input.bind(ig.KEY.MOUSE1, 'leftMouse');
            ig.input.bind(ig.KEY.MOUSE2, 'rightMouse');

            Chat.show();
            Wiki.show();

            RoomCore.generate();

            GameCore.registerPlayer("Lucas", "Junker");
            GameCore.registerPlayer("Brandon", "Doctor");
            GameCore.registerPlayer("Yordan", "Navy Officer");
            GameCore.registerPlayer("Kris", "Scavenger");

            GameCore.startingRoom.addPlayer(GameCore.players[0]);
            GameCore.startingRoom.addPlayer(GameCore.players[1]);
            GameCore.startingRoom.addPlayer(GameCore.players[2]);
            GameCore.startingRoom.addPlayer(GameCore.players[3]);

            console.log('STARTING ROOM', GameCore.startingRoom);
            console.log('PLAYERS', GameCore.players);

            GameCore.onGameStart();
            //GameCore.startingRoom.addBoss();

            //GameCore.startingRoom.setLootAmount(8);

            GameCore.players[0].addItem(ItemCore.requestItemByName('Mod A'));

            this.abilityButton = new MenuButton(646, 565, 'ABILITY');
            this.scavengeButton = new MenuButton(1128, 654, 'SCAVENGE');
            this.endTurnButton = new MenuButton(1128, 730, 'END TURN');
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
                //Chat.push('MOUSE ' + ig.input.mouse.x + ' ' + ig.input.mouse.y);
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
            GameCore.currentRoom.onMoveUpdate();
            GameCore.currentRoom.update();
            if (GameCore.lastRoom != null) GameCore.lastRoom.onMoveUpdate();
        },

// glDrawCell(cellw, cellh, column, row, x, y, imageWidth, imageHeight, intensity, diffuse)

        draw: function()
        {
            if (GameCore.lastRoom != null && !GameCore.lastRoom.stopped) GameCore.lastRoom.draw();
            GameCore.currentRoom.draw();
            //glDraw(AssetCore.images.ui_StatsMain.width, AssetCore.images.ui_StatsMain.height, ig.system.width / 2, ig.system.height / 2, 1, AssetCore.textures.ui_StatsMain);
            glDrawCell(750, 300, 0, 0, ig.system.width - 400, ig.system.height - 150, AssetCore.images.ui_StatsMain.width, AssetCore.images.ui_StatsMain.height, 1, AssetCore.textures.ui_StatsMain);
            var chatOffset = 0;
            if (Chat.minimized) chatOffset = 254;
            glDrawCell(512, 270, 0, 0, 256, ig.system.height - 135 + chatOffset, AssetCore.images.ui_ChatMain.width, AssetCore.images.ui_ChatMain.height, 1, AssetCore.textures.ui_ChatMain);
            if (GameCore.activePlayer.actions.remaining > 0) glDraw(AssetCore.images.ui_StatsActionIcon.width, AssetCore.images.ui_StatsActionIcon.height, 759, 581, 1, AssetCore.textures.ui_StatsActionIcon);
            if (GameCore.activePlayer.actions.remaining > 1) glDraw(AssetCore.images.ui_StatsActionIcon.width, AssetCore.images.ui_StatsActionIcon.height, 783, 581, 1, AssetCore.textures.ui_StatsActionIcon);
            if (GameCore.activePlayer.actions.remaining > 2) glDraw(AssetCore.images.ui_StatsActionIcon.width, AssetCore.images.ui_StatsActionIcon.height, 807, 581, 1, AssetCore.textures.ui_StatsActionIcon);
            if (GameCore.activePlayer.status.health > 0) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1003, 631, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.status.health > 1) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1003, 648, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.status.health > 2) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1003, 665, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.status.health > 3) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1003, 682, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.status.health > 4) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1003, 699, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.status.health > 5) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1003, 716, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.status.health > 6) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1003, 733, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.status.health > 7) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1003, 750, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.status.health > 8) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1023, 631, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.status.health > 9) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1023, 648, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.status.health > 10) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1023, 665, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.status.health > 11) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1023, 682, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.status.health > 12) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1023, 699, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.status.health > 13) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1023, 716, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.status.health > 14) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1023, 733, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.status.health > 15) glDraw(AssetCore.images.ui_StatsHealthIcon.width, AssetCore.images.ui_StatsHealthIcon.height, 1023, 750, 1, AssetCore.textures.ui_StatsHealthIcon);
            if (GameCore.activePlayer.mods.a) glDraw(AssetCore.images.ui_StatsModA.width, AssetCore.images.ui_StatsModA.height, 945, 548, 1, AssetCore.textures.ui_StatsModA);
            if (GameCore.activePlayer.mods.b) glDraw(AssetCore.images.ui_StatsModB.width, AssetCore.images.ui_StatsModB.height, 851, 558, 1, AssetCore.textures.ui_StatsModB);
            if (GameCore.activePlayer.mods.c) glDraw(AssetCore.images.ui_StatsModC.width, AssetCore.images.ui_StatsModC.height, 966, 610, 1, AssetCore.textures.ui_StatsModC);
            var wikiOffset = 0;
            if (Wiki.minimized) wikiOffset = 399;
            glDrawCell(523, 620, 0, 0, ig.system.width - 260 + wikiOffset, 290, AssetCore.images.ui_PDABottom.width, AssetCore.images.ui_PDABottom.height, 1, AssetCore.textures.ui_PDABottom);
            if (GameCore.activePlayer.hasAbility && !GameCore.activePlayer.actions.usedAbility) this.abilityButton.draw();
            if (GameCore.currentRoom.hasItems) this.scavengeButton.draw();
            this.endTurnButton.draw();
            MainFont.draw('RED KEYCARD   : ' + GameCore.keyCardFound.red, 24, 24, ig.Font.ALIGN.LEFT);
            MainFont.draw('GREEN KEYCARD : ' + GameCore.keyCardFound.green, 24, 40, ig.Font.ALIGN.LEFT);
            MainFont.draw('BLUE KEYCARD  : ' + GameCore.keyCardFound.blue, 24, 56, ig.Font.ALIGN.LEFT);
            MainFont.draw('ITEMS LEFT    : ' + GameCore.currentRoom.lootAmount, 24, 72, ig.Font.ALIGN.LEFT);
            MainFont.draw('USERNAME      : ' + GameCore.activePlayer.name, 24, 128, ig.Font.ALIGN.LEFT);
            MainFont.draw('JOB           : ' + GameCore.activePlayer.jobName, 24, 144, ig.Font.ALIGN.LEFT);
            MainFont.draw('MAX HEALTH    : ' + GameCore.activePlayer.status.maxHealth, 24, 160, ig.Font.ALIGN.LEFT);
            MainFont.draw('HEALTH        : ' + GameCore.activePlayer.status.health, 24, 176, ig.Font.ALIGN.LEFT);
            MainFont.draw('ARMOR         : ' + GameCore.activePlayer.status.armor, 24, 192, ig.Font.ALIGN.LEFT);
            MainFont.draw('INVENTORY CAP : ' + GameCore.activePlayer.status.inventoryCap, 24, 208, ig.Font.ALIGN.LEFT);
            MainFont.draw('ATTACK BONUS  : ' + GameCore.activePlayer.status.attackBonus, 24, 224, ig.Font.ALIGN.LEFT);
            MainFont.draw('ALLY BONUS    : ' + GameCore.activePlayer.status.allyBonus, 24, 240, ig.Font.ALIGN.LEFT);
            MainFont.draw('ACTIONS       : ' + GameCore.activePlayer.actions.remaining, 24, 256, ig.Font.ALIGN.LEFT);
            MainFont.draw('00 : ' + GameCore.activePlayerTimeLeft, ig.system.width / 2, 80, ig.Font.ALIGN.CENTER);
            MainFont.draw('CYCLES : ' + GameCore.cyclesRemaining, ig.system.width / 2, 96, ig.Font.ALIGN.CENTER);
            for (var i = 0; i < GameCore.activePlayer.status.inventoryCap; i++)
            {
                var item = GameCore.activePlayer.inventory[i];
                if (item == undefined || item == null) continue;
                var yOffset = 0;
                if (i > 2) yOffset = 36;
                item.setPosition(759 + yOffset, 675 + (Math.floor(i % 3) * 36));
                //item.setPosition(ig.system.width - 160, ig.system.height - (128 * (GameCore.activePlayer.status.inventoryCap - i - 1)) - 64);
                item.draw();
            }
            if (GameCore.activeContextMenu != null) GameCore.activeContextMenu.draw();
        }
    });

    //load screen (can remove this to default to basic white load bar)
    MyLoader = ig.Loader.extend({
        draw: function()
        {
        },
    });

    ig.main('canvas', Startup, 60, 1280, 800, 1, MyLoader);
});