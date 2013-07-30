ig.module( 
	'game.rooms.baseRoom' 
)
.requires(
	'impact.game',
	'impact.font'
)
.defines(function(){
    BaseRoom = ig.Class.extend({
        x : 0,
        y : 0,

        diffuse : null,
        normal : null,
        relief : null,
        emissive : null,

        textures : new Array(), 
        lights : new Array(), 
        doors : new Array(),
        enemies : new Array(), 
        items : new Array(), 
        players : new Array(), 

        playerSpawnPoints : new Array(), 
        enemySpawnPoints : new Array(), 

        lootAmount : 0, 
        highChanceItemClasseNames : new Array(), 
        lowChanceItemClasseNames : new Array(), 
        highChanceEnemyClasseNames : new Array(), 
        lowChanceEnemyClasseNames : new Array(), 

        index : -1, 
        intensity : 1,
        fadeRate : .02,
        hasEnemies : false, 
        hasItems : false, 

        init: function()
        {
            this.x = canvas.width/2;
            this.y = canvas.height/2;

            this.textures = [];
            if (this.diffuse != null) this.textures.push(glLoadTexture(this.diffuse.data));
            if (this.normal != null) this.textures.push(glLoadTexture(this.normal.data));
            if (this.relief != null) this.textures.push(glLoadTexture(this.relief.data));
            if (this.emissive != null) this.textures.push(glLoadTexture(this.emissive.data));

            this.lights = [];
            this.doors = [null, null, null, null];
            this.enemies = [];
            this.items = [];
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
            if (this.hasEnemies)
            {
                for (var i = 0; i < this.enemies.length; i++)
                {
                    var enemy = this.enemies[i];
                    if (!enemy.status.alive) this.removeEnemy(enemy);//this.enemies.splice(i, 1);
                }
                if (this.enemies.length < 1) this.hasEnemies = false;
            }
            if (ig.input.pressed('rightMouse'))
            {
                GameCore.targetedDoor = null;
                GameCore.targetedEnemy = null;
                GameCore.activeContextMenu = null;
                GameCore.selectedAttack = false;
                GameCore.selectedMove = false;
                for (var i = 0; i < this.doors.length; i++)
                {
                    var door = this.doors[i];
                    if (door != null && door.isMouseOver())
                    {
                        GameCore.targetedDoor = door;
                        GameCore.activeContextMenu = door.menu;
                        door.menu.setPosition(ig.input.mouse.x, ig.input.mouse.y);
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
                        enemy.menu.setPosition(ig.input.mouse.x, ig.input.mouse.y);
                        break;
                    }
                }
            }
            if (ig.input.pressed('leftMouse'))
            {
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
                }
                GameCore.activeContextMenu = null;
            }
        },
        
        draw: function()
        {
            var light1, light2, light3 = null;
            if (this.lights.length > 0) light1 = this.lights[0];
            if (this.lights.length > 1) light2 = this.lights[1];
            if (this.lights.length > 2) light3 = this.lights[2];
            glDraw(this.diffuse.width, this.diffuse.height, this.x, this.y, this.intensity, 
                this.textures[0], this.textures[1], this.textures[2], this.textures[3], 
                light1, light2, light3);
            for (var i = 0; i < this.doors.length; i++)
            {
                var door = this.doors[i];
                if (door != null) door.draw(this.intensity);
            }
            for (var i = 0; i < this.enemies.length; i++)
            {
                var enemy = this.enemies[i];
                if (enemy != null) enemy.draw(this.intensity);
            }
            for (var i = 0; i < this.players.length; i++)
            {
                var player = this.players[i];
                if (player != null) player.draw(this.intensity);
            }
        }, 

        onPlayerEnter : function()
        {
        }, 
        onPlayerExit : function()
        {
        }, 
        onPlayerScavenge : function()
        {
        }, 

        addDoor : function(x, y, side)
        {
            var newDoor = new EntityDoor();
            //newDoor.x = x - ((this.diffuse.width - 1280) / 2);
            //newDoor.y = y - ((this.diffuse.height - 800) / 2);
            newDoor.setPosition(x - ((this.diffuse.width - 1280) / 2), y - ((this.diffuse.height - 800) / 2));
            if (newDoor.x >= this.x) newDoor.transitionDirection.x = 1;
            else newDoor.transitionDirection.x = -1;
            if (newDoor.y >= this.y) newDoor.transitionDirection.y = 1;
            else newDoor.transitionDirection.y = -1;
            switch (side)
            {
                case 'topRight':
                this.doors[0] = newDoor;
                break;
                case 'bottomRight':
                this.doors[1] = newDoor;
                break;
                case 'bottomLeft':
                this.doors[2] = newDoor;
                break;
                case 'topLeft':
                this.doors[3] = newDoor;
                break;

                default:
                break;
            }
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
            //console.log('CONNECTING DOORS ', side, otherSide, thisDoor, otherDoor);
            //console.log('CONNECTING ROOMS ', this, room);
        },

        addLight : function(x, y, falloutQuad, falloutLinear, falloutConstant, colorR, colorG, colorB)
        {
            this.lights.push(new Light(x, y, falloutQuad, falloutLinear, falloutConstant, colorR, colorG, colorB));
        }, 
        addPlayerSpawn : function(x, y)
        {
            var spawn = {};
            spawn.x = x - ((this.diffuse.width - 1280) / 2);
            spawn.y = y - ((this.diffuse.height - 800) / 2);
            spawn.open = true;
            this.playerSpawnPoints.push(spawn);
        }, 
        addEnemySpawn : function(x, y)
        {
            var spawn = {};
            spawn.x = x - ((this.diffuse.width - 1280) / 2);
            spawn.y = y - ((this.diffuse.height - 800) / 2);
            spawn.open = true;
            this.enemySpawnPoints.push(spawn);
            this.hasEnemies = true;
        }, 

        addPlayer : function(player)
        {
            if (player == null) return;
            var spawn = this.getOpenPlayerSpawn();
            if (spawn == null) return;

            spawn.open = false;
            player.setPosition(spawn.x, spawn.y);
            player.spawn = spawn;

            this.players.push(player);
            player.currentRoom = this;
        }, 
        addEnemy : function()
        {
            var newEnemy = null;//new EntityEnemy();
            var spawn = this.getOpenEnemySpawn();
            if (spawn == null) return;
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
            console.log('GENERATED ENEMY ', chance, newEnemy);
            if (newEnemy == null) return;

            spawn.open = false;
            newEnemy.setPosition(spawn.x, spawn.y);
            newEnemy.spawn = spawn;
            newEnemy.currentRoom = this;

            this.enemies.push(newEnemy);
            this.hasEnemies = true;
        }, 
        addItem : function()
        {
            var newItem = null;
            var chance = Math.random();
            if (chance > 0.5 && this.highChanceItemClasseNames.length > 0)
            {
                newItem = ItemCore.generateItemFromItemClasseNames(this.highChanceItemClasseNames);
            }
            else if (chance > 0.4 && this.lowChanceItemClasseNames.length > 0)
            {
                newItem = ItemCore.generateItemFromItemClasseNames(this.lowChanceItemClasseNames);
            }
            else newItem = ItemCore.generateRandomItem();

            this.items.push(newItem);
            this.hasItems = true;
            this.lootAmount++;
        }, 
        getEnemy : function()
        {
            if (!this.hasEnemies || this.enemies.length < 1) return null;
            var index = Math.floor(Math.random() * this.enemies.length);
            return this.enemies[index];
        }, 
        getItem : function()
        {
            if (this.lootAmount < 1) return null;
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
            this.lootAmount = amount;
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
            if (index < 0) return;
            this.enemies.splice(index, 1);
            if (this.enemies.length < 1) this.hasEnemies = false;
        }, 
        removeItem : function(item)
        {
            if (item == null) return;
            var index = -1;
            for (var i = 0; i < this.items.length; i++)
            {
                if (this.items[i] == items) index = i;
            }
            if (index < 0) return;
            this.items.splice(index, 1);
            if (this.items.length < 1) this.hasItems = false;
        }, 
    });
});