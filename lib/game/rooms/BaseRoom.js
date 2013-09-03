ig.module( 
	'game.rooms.baseRoom' 
)
.requires(
	'impact.game',
	'impact.font'
)
.defines(function(){
    BaseRoom = ig.Class.extend({
        pos : {x : 0, y : 0, }, 
        size : {x : 0, y : 0, }, 
        target : {x : 0, y : 0, }, 
        corner : {x : 0, y : 0, }, 
        stopped : true, 

        textures : 
        {
            diffuse : null,
            normal : null,
            relief : null,
            emissive : null, 
        }, 

        name : "", 
        isCorridor : false, 

        //textures : new Array(), 
        lights : new Array(), 
        doors : new Array(),
        enemies : new Array(), 
        players : new Array(), 

        playerSpawnPoints : new Array(), 
        enemySpawnPoints : new Array(), 

        lootAmount : 0, 
        maxLoot : 0, 
        highChanceItemClasseNames : new Array(), 
        lowChanceItemClasseNames : new Array(), 
        highChanceEnemyClasseNames : new Array(), 
        lowChanceEnemyClasseNames : new Array(), 

        index : -1, 
        intensity : 1,
        fadeRate : .02,

        discovered : false, 
        hasEnemies : false, 
        hasItems : false, 
        hasBoss : false, 
        canScavenge : true, 
        isLockedDown : false, 

        init: function()
        {
            this.setPosition(canvas.width / 2, canvas.height / 2);
            this.size.x = this.textures.diffuse.width;
            this.size.y = this.textures.diffuse.height;

            this.lights = [];
            this.doors = [null, null, null, null];
            this.enemies = [];
            this.players = [];

            this.playerSpawnPoints = [];
            this.enemySpawnPoints = [];
            this.highChanceItemClasseNames = [];
            this.lowChanceItemClasseNames = [];
            this.highChanceEnemyClasseNames = [];
            this.lowChanceEnemyClasseNames = [];
        },
    
        update: function()
        {
            //this.lights[0].position.x = ig.input.mouse.x;
            //this.lights[0].position.y = ig.input.mouse.y;
            if (this.hasEnemies)
            {
                for (var i = 0; i < this.enemies.length; i++)
                {
                    var enemy = this.enemies[i];
                    if (!enemy.status.alive)
                    {
                        if (enemy.isBoss) this.hasBoss = false;
                        this.removeEnemy(enemy);
                    }
                    enemy.update();
                }
                if (this.enemies.length < 1) this.hasEnemies = false;
            }
            if (ig.input.pressed('rightMouse'))
            {
                GameCore.targetedDoor = null;
                GameCore.targetedEnemy = null;
                GameCore.targetedItem = null;
                GameCore.activeContextMenu = null;
                GameCore.selectedAttack = false;
                GameCore.selectedMove = false;
                GameCore.selectedUnlock = false;
                GameCore.selectedScavenge = false;
                GameCore.selectedUseAbility = false;
                GameCore.selectedUseItem = false;
                GameCore.selectedGiveItem = false;
                GameCore.selectedLockItem = false;
                GameCore.selectedDestroyItem = false;
                for (var i = 0; i < this.doors.length; i++)
                {
                    var door = this.doors[i];
                    if (door != null && door.isMouseOver())
                    {
                        GameCore.targetedDoor = door;
                        GameCore.activeContextMenu = door.menu;
                        break;
                    }
                }
                for (var i = 0; i < this.enemies.length; i++)
                {
                    var enemy = this.enemies[i];
                    if (enemy != null && enemy.isMouseOver())
                    {
                        GameCore.targetedEnemy = enemy;
                        GameCore.activeContextMenu = enemy.menu;
                        break;
                    }
                }
                for (var i = 0; i < GameCore.activePlayer.inventory.length; i++)
                {
                    var item = GameCore.activePlayer.inventory[i];
                    if (item != null && item.isMouseOver())
                    {
                        GameCore.targetedItem = item;
                        GameCore.activeContextMenu = item.menu;
                        break;
                    }
                }
                if (GameCore.activeContextMenu != null) GameCore.activeContextMenu.setPosition(ig.input.mouse.x, ig.input.mouse.y);
            }
            if (ig.input.pressed('leftMouse'))
            {
                //this.lights[0].position.x = ig.input.mouse.x;
                //this.lights[0].position.y = ig.input.mouse.y;
                if (GameCore.activeContextMenu != null)
                {
                    if (GameCore.activeContextMenu.isMouseOver('inspect'))
                    {
                        Chat.push(GameCore.activeContextMenu.connectingEntity.description);
                    }
                    else if (GameCore.activeContextMenu.isMouseOver('attack'))
                    {
                        GameCore.selectedAttack = true;
                    }
                    else if (GameCore.activeContextMenu.isMouseOver('move'))
                    {
                        GameCore.selectedMove = true;
                    }
                    else if (GameCore.activeContextMenu.isMouseOver('unlock'))
                    {
                        GameCore.selectedUnlock = true;
                    }
                    else if (GameCore.activeContextMenu.isMouseOver('use'))
                    {
                        GameCore.selectedUseItem = true;
                    }
                    else if (GameCore.activeContextMenu.isMouseOver('give'))
                    {
                        GameCore.selectedGiveItem = true;
                    }
                    else if (GameCore.activeContextMenu.isMouseOver('lock'))
                    {
                        GameCore.selectedLockItem = true;
                    }
                    else if (GameCore.activeContextMenu.isMouseOver('destroy'))
                    {
                        GameCore.selectedDestroyItem = true;
                    }
                }
                GameCore.activeContextMenu = null;
            }
        },
        
        draw: function()
        {
            var light1, light2, light3 = null;
            if (this.lights.length > 0)
            {
                light1 = this.lights[0];
                glSetLight(this.size.x, this.size.y, 
                    light1.position.x + this.corner.x, light1.position.y + this.corner.y, 
                    light1.falloff.constant, light1.falloff.linear, light1.falloff.quad, 
                    light1.color.r, light1.color.g, light1.color.b);
            }
            if (this.lights.length > 1)
            {
                light2 = this.lights[1];
                glSetLight(this.size.x, this.size.y, 
                    light2.position.x + this.corner.x, light2.position.y + this.corner.y, 
                    light2.falloff.constant, light2.falloff.linear, light2.falloff.quad, 
                    light2.color.r, light2.color.g, light2.color.b);
            }
            if (this.lights.length > 2)
            {
                light3 = this.lights[2];
                glSetLight(this.size.x, this.size.y, 
                    light3.position.x + this.corner.x, light3.position.y + this.corner.y, 
                    light3.falloff.constant, light3.falloff.linear, light3.falloff.quad, 
                    light3.color.r, light3.color.g, light3.color.b);
            }
            glDraw(this.size.x, this.size.y, this.pos.x, this.pos.y, this.intensity, 
                this.textures.diffuse, this.textures.normal, this.textures.relief, this.textures.emissive);
            for (var i = 0; i < this.enemies.length; i++)
            {
                var enemy = this.enemies[i];
                if (enemy != null) enemy.draw();
            }
            for (var i = 0; i < this.players.length; i++)
            {
                var player = this.players[i];
                if (player != null) player.draw();
            }
            glClearLights();
            for (var i = 0; i < this.doors.length; i++)
            {
                var door = this.doors[i];
                if (door != null) door.draw();
            }
        }, 

        lockDoors : function()
        {
            for (var i = 0; i < this.doors.length; i++)
            {
                var door = this.doors[i];
                if (door != null)
                {
                    door.lock();
                }
            }
        }, 
        unlockDoors : function()
        {
            for (var i = 0; i < this.doors.length; i++)
            {
                var door = this.doors[i];
                if (door != null)
                {
                    door.unlock();
                }
            }
        }, 
        updatePlayerBonuses : function()
        {
            var bonus = 0.0;//(this.players.length - 1) * 0.05;
            for (var i = 0; i < this.players.length; i++)
            {
                var player = this.players[i];
                if (player != null)
                {
                    if (player.implants.command) bonus += 0.15;
                    else bonus += 0.05;
                }
            }
            for (var i = 0; i < this.players.length; i++)
            {
                var player = this.players[i];
                if (player != null)
                {
                    if (player.implants.command) player.status.allyBonus = bonus - 0.15;
                    else player.status.allyBonus = bonus - 0.05;
                }
            }
        }, 

        setPosition : function(x, y)
        {
            this.pos.x = x;
            this.pos.y = y;
            this.target.x = x;
            this.target.y = y;
            this.corner.x = this.pos.x - (this.size.x / 2);
            this.corner.y = this.pos.y - (this.size.y / 2);
            this.stopped = true;
        }, 
        moveTo : function(x, y)
        {
            this.target.x = x;
            this.target.y = y;
            this.stopped = false;
        }, 
        onMoveUpdate : function()
        {
            if (this.stopped) return;
            var disX = this.target.x - this.pos.x;
            var disY = this.target.y - this.pos.y;
            var mag = Math.sqrt((disX * disX) + (disY * disY));
            if (mag > 8)
            {
                var tX = disX * 0.25;
                var tY = disY * 0.25;
                //var nX = disX / mag;
                //var nY = disY / mag;
                this.pos.x += tX;//nX * 8;
                this.pos.y += tY;//nY * 8;
                this.corner.x = this.pos.x - (this.size.x / 2);
                this.corner.y = this.pos.y - (this.size.y / 2);
            }
            else
            {
                this.pos.x = this.target.x;
                this.pos.y = this.target.y;
                this.stopped = true;
            }
        }, 

        onPlayerEnter : function()
        {
            if (this.hasEnemies)
            {
                for (var i = 0; i < this.enemies.length; i++)
                {
                    var enemy = this.enemies[i];
                    if (enemy != null) enemy.onPlayerEnter(GameCore.activePlayer);
                }
            }
            if (!this.discovered)
            {
                GameCore.explored.push(this);
                //console.log('EXPLORED ', GameCore.explored);
            }
            this.discovered = true;
        }, 
        onPlayerExit : function()
        {
            if (this.hasEnemies)
            {
                for (var i = 0; i < this.enemies.length; i++)
                {
                    var enemy = this.enemies[i];
                    if (enemy != null) enemy.onPlayerExit(GameCore.activePlayer);
                }
            }
        }, 
        onPlayerAction : function()
        {
            if (this.hasEnemies)
            {
                for (var i = 0; i < this.enemies.length; i++)
                {
                    var enemy = this.enemies[i];
                    if (enemy != null && enemy.status.alive) enemy.onPlayerAction(GameCore.activePlayer);
                }
            }
        }, 
        onPlayerTurnStart : function()
        {
            if (this.hasEnemies)
            {
                for (var i = 0; i < this.enemies.length; i++)
                {
                    var enemy = this.enemies[i];
                    if (enemy != null) enemy.onPlayerTurnStart(GameCore.activePlayer);
                }
            }
            this.updatePlayerBonuses();
        }, 
        onPlayerTurnEnd : function()
        {
            if (this.hasEnemies)
            {
                for (var i = 0; i < this.enemies.length; i++)
                {
                    var enemy = this.enemies[i];
                    if (enemy != null) enemy.onPlayerTurnEnd(GameCore.activePlayer);
                }
            }
        }, 

        addDoor : function(x, y, side, imageSet, flipped)
        {
            var newDoor = new EntityDoor();
            newDoor.setPosition(x, y);
            newDoor.currentRoom = this;
            switch (side)
            {
                case 'topRight':
                newDoor.transitionDirection.x = 1;
                newDoor.transitionDirection.y = -1;
                this.doors[0] = newDoor;
                break;
                case 'bottomRight':
                this.doors[1] = newDoor;
                newDoor.transitionDirection.x = 1;
                newDoor.transitionDirection.y = 1;
                break;
                case 'bottomLeft':
                this.doors[2] = newDoor;
                newDoor.transitionDirection.x = -1;
                newDoor.transitionDirection.y = 1;
                break;
                case 'topLeft':
                this.doors[3] = newDoor;
                newDoor.transitionDirection.x = -1;
                newDoor.transitionDirection.y = -1;
                break;

                default:
                break;
            }
            if (imageSet != null && imageSet != undefined)
            {
                var doorTextures = AssetCore.requestTextures(imageSet);
                newDoor.setTextures(doorTextures.diffuse, doorTextures.normal, doorTextures.relief, doorTextures.emissive);
            }
            if (flipped != null && flipped != undefined)
            {
                newBoss.flipped = flipped;
            }
            return newDoor;
        }, 
        getDoor : function(side)
        {
            switch (side)
            {
                case 'topRight':
                return this.doors[0];
                break;
                case 'bottomRight':
                return this.doors[1];
                break;
                case 'bottomLeft':
                return this.doors[2];
                break;
                case 'topLeft':
                return this.doors[3];
                break;

                default:
                return null;
                break;
            }
        }, 
        oppositeSide : function(side)
        {
            switch (side)
            {
                case 'topRight':
                return 'bottomLeft';
                break;
                case 'bottomRight':
                return 'topLeft';
                break;
                case 'bottomLeft':
                return 'topRight';
                break;
                case 'topLeft':
                return 'bottomRight';
                break;

                default:
                return '';
                break;
            }
        }, 
        connectTo : function(room, side, lockDoors)
        {
            if (this == room || room == null) return;
            var otherSide = this.oppositeSide(side);

            var thisDoor = this.getDoor(side);
            var otherDoor = room.getDoor(otherSide);

            if (thisDoor == null || otherDoor == null) return;
            thisDoor.connectTo(room, otherDoor);
            otherDoor.connectTo(this, thisDoor);
            if (lockDoors)
            {
                thisDoor.lock();
            }
        },

        addLight : function(x, y, falloutQuad, falloutLinear, falloutConstant, colorR, colorG, colorB)
        {
            this.lights.push(new glLight(x, y, falloutQuad, falloutLinear, falloutConstant, colorR, colorG, colorB));
            return this.lights[this.lights.length - 1];
        }, 
        addPlayerSpawn : function(x, y)
        {
            var spawn = {};
            spawn.x = x;// - ((this.textures.diffuse.width - 1280) / 2);
            spawn.y = y;// - ((this.textures.diffuse.height - 800) / 2);
            spawn.open = true;
            this.playerSpawnPoints.push(spawn);
        }, 
        addEnemySpawn : function(x, y)
        {
            var spawn = {};
            spawn.x = x;// - ((this.textures.diffuse.width - 1280) / 2);
            spawn.y = y;// - ((this.textures.diffuse.height - 800) / 2);
            spawn.open = true;
            this.enemySpawnPoints.push(spawn);
            this.hasEnemies = true;
        }, 
        addPlayer : function(player)
        {
            if (player == null) return null;
            var spawn = this.getOpenPlayerSpawn();
            if (spawn == null) return null;

            spawn.open = false;
            player.setPosition(spawn.x, spawn.y);
            player.spawn = spawn;

            this.players.push(player);
            player.currentRoom = this;
            return player;
        }, 
        addEnemy : function(name)
        {
            var newEnemy = null;
            var spawn = this.getOpenEnemySpawn();
            if (spawn == null) return null;
            if (name == undefined || name == null)
            {
                var chance = Math.random();
                if (chance > 0.5 && this.highChanceEnemyClasseNames.length > 0)
                {
                    newEnemy = EnemyCore.generateEnemyFromEnemyClasseNames(this.highChanceEnemyClasseNames);
                }
                else if (chance > 0.4 && this.lowChanceEnemyClasseNames.length > 0)
                {
                    newEnemy = EnemyCore.generateEnemyFromEnemyClasseNames(this.lowChanceEnemyClasseNames);
                }
                else newEnemy = EnemyCore.generateRandomEnemy();
            }
            else
            {
                newEnemy = EnemyCore.requestEnemyByName(name);
            }
            if (newEnemy == null) return null;

            spawn.open = false;
            newEnemy.setPosition(spawn.x, spawn.y);
            newEnemy.spawn = spawn;
            newEnemy.currentRoom = this;

            this.enemies.push(newEnemy);
            this.hasEnemies = true;
            return newEnemy;
        }, 
        addBoss : function()
        {
            if (this.name != "Tyche" || this.hasBoss) return null;

            var newBoss = EnemyCore.generateRandomBoss();
            if (newBoss == null) return null;
            this.hasBoss = true;
            this.hasEnemies = true;

            //console.log('SPAWNING BOSS ', newBoss);
            Chat.push(ScriptCore.BossEnteredRoom + newBoss.name);

            if (newBoss.name == ScriptCore.ModOfBionicZombiesName)
            {
                this.addEnemy('Bionic Zombie');
                this.addEnemy('Bionic Zombie');
                this.addEnemy('Bionic Zombie');
                this.addEnemy('Bionic Zombie');
                return null;
            }

            var spawn = this.getOpenEnemySpawn();
            spawn.open = false;
            newBoss.setPosition(spawn.x, spawn.y);
            newBoss.spawn = spawn;
            newBoss.currentRoom = this;

            this.enemies.push(newBoss);
            return newBoss;
        }, 

        getEnemy : function()
        {
            if (!this.hasEnemies || this.enemies.length < 1) return null;
            var index = Math.floor(Math.random() * this.enemies.length);
            return this.enemies[index];
        }, 
        getItem : function()
        {
            if (!this.hasItems) return null;
            var item = null;
            var chance = Math.random();
            if (chance > 0.5 && this.highChanceItemClasseNames.length > 0)
            {
                item = ItemCore.generateItemFromItemClasseNames(this.highChanceItemClasseNames);
            }
            else if (chance > 0.4 && this.lowChanceItemClasseNames.length > 0)
            {
                item = ItemCore.generateItemFromItemClasseNames(this.lowChanceItemClasseNames);
            }
            else item = ItemCore.generateRandomItem();
            this.lootAmount--;

            if (this.lootAmount < 1) this.hasItems = false;
            return item;
        }, 

        setLootAmount : function(amount)
        {
            this.maxLoot = amount;
            this.lootAmount = amount;
            if (this.lootAmount > 0) this.hasItems = true;
        }, 
        refreshLoot : function()
        {
            this.lootAmount = this.maxLoot;
            if (this.lootAmount > 0) this.hasItems = true;
        }, 
        addLoot : function(amount)
        {
            this.lootAmount += amount;
            if (this.lootAmount > 0) this.hasItems = true;
        }, 
        setHighChanceItemClasseNames : function(list)
        {
            this.highChanceItemClasseNames = list;
        }, 
        setLowChanceItemClasseNames : function(list)
        {
            this.lowChanceItemClasseNames = list;
        }, 
        setHighChanceEnemyClasseNames : function(list)
        {
            this.highChanceEnemyClasseNames = list;
        }, 
        setLowChanceEnemyClasseNames : function(list)
        {
            this.lowChanceEnemyClasseNames = list;
        }, 

        getOpenPlayerSpawn : function()
        {
            for (var i = 0; i < this.playerSpawnPoints.length; i++)
            {
                var spawn = this.playerSpawnPoints[i];
                if (spawn.open) return spawn;
            }
            return null;
        }, 
        getOpenEnemySpawn : function()
        {
            for (var i = 0; i < this.enemySpawnPoints.length; i++)
            {
                var spawn = this.enemySpawnPoints[i];
                if (spawn.open) return spawn;
            }
            return null;
        }, 

        removePlayer : function(player)
        {
            if (player == null) return;
            player.spawn.open = true;
            player.spawn = null;
            var index = -1;
            for (var i = 0; i < this.players.length; i++)
            {
                if (this.players[i] == player) index = i;
            }
            if (index < 0) return;
            this.players.splice(index, 1);
        }, 
        removeEnemy : function(enemy)
        {
            if (enemy == null) return;
            enemy.spawn.open = true;
            enemy.spawn = null;
            var index = -1;
            for (var i = 0; i < this.enemies.length; i++)
            {
                if (this.enemies[i] == enemy) index = i;
            }
            enemy.onDestroy();
            if (index < 0) return;
            this.enemies.splice(index, 1);
            if (this.enemies.length < 1) this.hasEnemies = false;
        }, 
    });
});