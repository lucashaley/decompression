ig.module( 
	'game.rooms.room' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.init',
    'game.entities.door'
)
.defines(function(){
    /*PopUpMenu = ig.Class.extend ({
        type: '', //move, attack, or loot
        img: null,
        x: 0,
        y: 0,
        w: 128,
        h: 128,
        texture: null,

        set: function(x, y, type) {
            this.type = type;
            this.img = null;
            if(type == 'move') {
                this.img = new ig.Image('media/PopUps/moveMenu.png');
            }
            else if(type == 'attack') {
                this.img = new ig.Image('media/PopUps/attackMenu.png');
            }
            else if(type == 'loot') {
                this.img = new ig.Image('media/PopUps/lootMenu.png');
            }
            else {
                this.img = new ig.Image('media/PopUps/noActionMenu.png');
            }
            this.texture = null;
            this.texture = glLoadTexture(this.img.data);
            this.x = x;
            this.y = y;
            this.w = this.img.width;
            this.h = this.img.height;
        },
        draw: function(x, y, lightIntense) {
            this.x = x;
            this.y = y;
            if(this.img != null) glDraw(this.img.width, this.img.height, x, y, lightIntense, this.texture)
        },
        isOnPopUp : function() {            
            var halfW = this.w / 2;
            var halfH = this.h / 2;
            if(ig.input.mouse.x > this.x - halfW && ig.input.mouse.x < this.x+halfW && ig.input.mouse.y > this.y - halfH && ig.input.mouse.y < this.y+halfH) {
                this.hovering = true;
                return true;
            }else{
                this.hovering = false;
                return false;
            }
        },
        isClickTop : function() {
            var halfW = this.w / 2;
            var halfH = this.h / 2;
            if(ig.input.mouse.x > this.x - halfW && ig.input.mouse.x < this.x+halfW && ig.input.mouse.y > this.y - halfH && ig.input.mouse.y < this.y) {
                this.hovering = true;
                return true;
            }else{
                this.hovering = false;
                return false;
            }
        },
        isClickBottom : function() {
            var halfW = this.w / 2;
            var halfH = this.h / 2;

            if(ig.input.mouse.x > this.x - halfW && ig.input.mouse.x < this.x+halfW && ig.input.mouse.y > this.y && ig.input.mouse.y < this.y+halfH) {
                this.hovering = true;
                return true;
            }else{
                this.hovering = false;
                return false;
            }
        },
    });*/

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
        players : new Array(), 

        playerSpawnPoints : new Array(), 
        enemySpawnPoints : new Array(), 

        intensity : 1,
        fadeRate : .02,

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
            this.players = [];

            this.playerSpawnPoints = [];
            this.enemySpawnPoints = [];
        },
    
        update: function()
        {
            if (ig.input.pressed('leftMouse'))
            {
                for (var i = 0; i < this.doors.length; i++)
                {
                    var door = this.doors[i];
                    if (door != null && door.isMouseOver()) GameCore.targetedDoor = door;
                }
                for (var i = 0; i < this.enemies.length; i++)
                {
                    var enemy = this.enemies[i];
                    if (enemy != null && enemy.isMouseOver()) GameCore.targetedEnemy = enemy;
                }
            }
            else if (ig.input.pressed('rightMouse'))
            {
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

        addDoor : function(x, y, side)
        {
            var newDoor = new EntityDoor();
            newDoor.x = x - ((this.diffuse.width - 1280) / 2);
            newDoor.y = y - ((this.diffuse.height - 800) / 2);
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
        connectTo : function(room, side)
        {
            if (this == room || room == null) return;
            var otherSide = this.oppositeSide(side);

            var thisDoor = this.getDoor(side);
            var otherDoor = this.getDoor(otherSide);

            if (thisDoor == null || otherDoor == null) return;
            thisDoor.connectingRoom = room;
            otherDoor.connectingRoom = this;
            console.log('CONNECTING DOORS ', side, otherSide, thisDoor, otherDoor);
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
            this.playerSpawnPoints.push(spawn);
        }, 
        addEnemySpawn : function(x, y)
        {
            var spawn = {};
            spawn.x = x - ((this.diffuse.width - 1280) / 2);
            spawn.y = y - ((this.diffuse.height - 800) / 2);
            this.enemySpawnPoints.push(spawn);
        }, 

        addPlayer : function(player)
        {
            if (player == null) return;
            if (this.playerSpawnPoints.length < 1)
            {
                player.setPosition(this.x, this.y);
            }
            else
            {
                var index = this.players.length % this.playerSpawnPoints.length;
                var spawn = this.playerSpawnPoints[index];
                player.setPosition(spawn.x, spawn.y);
            }
            this.players.push(player);
            player.currentRoom = this;
        }, 
        removePlayer : function(player)
        {
            var index = -1;
            for (var i = 0; i < this.players.length; i++)
            {
                if (this.players[i] == player) index = i;
            }
            if (index < 0) return;
            this.players.splice(index, 1);
        }, 

        addEnemy : function()
        {
            var newEnemy = new EntityEnemy();
            if (this.enemySpawnPoints.length < 1)
            {
                newEnemy.x = this.x;
                newEnemy.y = this.y;
            }
            else
            {
                var spawn = this.enemySpawnPoints[Math.floor(Math.random() * this.enemySpawnPoints.length)];
                newEnemy.x = spawn.x;
                newEnemy.y = spawn.y;
            }
            this.enemies.push(newEnemy);
        }, 
        removeEnemy : function(enemy)
        {
            var index = -1;
            for (var i = 0; i < this.enemies.length; i++)
            {
                if (this.enemies[i] == enemy) index = i;
            }
            if (index < 0) return;
            this.enemies.splice(index, 1);
        }, 
	});	

    //all the the types of rooms (inheriting from the base room class)

    Armory = BaseRoom.extend({
        diffuse: new ig.Image('media/rooms/Armory/rm_armory_01_D.png'),
        normal: new ig.Image('media/rooms/Armory/rm_armory_01_N.png'),
        relief: new ig.Image('media/rooms/Armory/rm_armory_01_R.png'),
        emissive: null,

        init: function(){
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
        },
    });

    Barracks = BaseRoom.extend({
        diffuse: new ig.Image('media/rooms/Barracks/rm_barracks_01_D.png'),
        normal: new ig.Image('media/rooms/Barracks/rm_barracks_01_N.png'),
        relief: new ig.Image('media/rooms/Barracks/rm_barracks_01_R.png'),
        emissive: null,

        init: function(){
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
        },
    });

    Bridge = BaseRoom.extend({
        diffuse: new ig.Image('media/rooms/Bridge/rm_bridge_01_D.png'),
        normal: new ig.Image('media/rooms/Bridge/rm_bridge_01_N.png'),
        relief: new ig.Image('media/rooms/Bridge/rm_bridge_01_R.png'),
        emissive: null,

        init: function(){
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
        },
    });

    Brig = BaseRoom.extend({
        diffuse: new ig.Image('media/rooms/Brig/rm_brig_01_D.png'),
        normal: new ig.Image('media/rooms/Brig/rm_brig_01_N.png'),
        relief: new ig.Image('media/rooms/Brig/rm_brig_01_R.png'),
        emissive: null,

        init: function(){
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
        },
    });

    EngineeringCore = BaseRoom.extend({
        diffuse: new ig.Image('media/rooms/EngineeringCore/rm_engineeringCore_01_D.png'),
        normal: new ig.Image('media/rooms/EngineeringCore/rm_engineeringCore_01_N.png'),
        relief: new ig.Image('media/rooms/EngineeringCore/rm_engineeringCore_01_R.png'),
        emissive: null,

        init: function(){
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
        },
    });

    EngineeringReactor = BaseRoom.extend({
        diffuse: new ig.Image('media/rooms/EngineeringReactor/rm_engineering_01_D.png'),
        normal: new ig.Image('media/rooms/EngineeringReactor/rm_engineering_01_N.png'),
        relief: new ig.Image('media/rooms/EngineeringReactor/rm_engineering_01_R.png'),
        emissive: null,

        init: function(){
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
        },
    });

    Hangar = BaseRoom.extend({
        diffuse: new ig.Image('media/rooms/Hangar/rm_hangar_01_D.png'),
        normal: new ig.Image('media/rooms/Hangar/rm_hangar_01_N.png'),
        relief: new ig.Image('media/rooms/Hangar/rm_hangar_01_R.png'),
        emissive: new ig.Image('media/rooms/Hangar/rm_hangar_01_E.png'),

        init: function(){
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
        },
    });

    Infirmary = BaseRoom.extend({
        diffuse: new ig.Image('media/rooms/Infirmary/rm_infirmary_01_D.png'),
        normal: new ig.Image('media/rooms/Infirmary/rm_infirmary_01_N.png'),
        relief: new ig.Image('media/rooms/Infirmary/rm_infirmary_01_R.png'),
        emissive: null,

        init: function(){
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(260, 780, 'bottomLeft');
            this.addPlayerSpawn(548, 512);
            this.addPlayerSpawn(384, 602);
            this.addPlayerSpawn(242, 652);
            this.addPlayerSpawn(688, 588);
            this.addEnemySpawn(845, 662);
            this.addEnemySpawn(530, 812);
            this.addEnemySpawn(192, 630);
        },
    });

    RecRoom = BaseRoom.extend({
        diffuse: new ig.Image('media/rooms/Recreation/rm_recreation_01_D.png'),
        normal: new ig.Image('media/rooms/Recreation/rm_recreation_01_N.png'),
        relief: new ig.Image('media/rooms/Recreation/rm_recreation_01_R.png'),
        emissive: new ig.Image('media/rooms/Recreation/rm_recreation_01_E.png'),

        init: function(){
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
        },
    });

    Tyche = BaseRoom.extend({
        diffuse: new ig.Image('media/rooms/Tyche/rm_TycheCPC_Shadowed_01_D.png'),
        normal: new ig.Image('media/rooms/Tyche/rm_TycheCPC_01_N.png'),
        relief: new ig.Image('media/rooms/Tyche/rm_TycheCPC_01_R.png'),
        emissive: null,

        init: function(){
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(230, 480, 'topLeft');
            this.addDoor(800, 480, 'topRight');
            this.addDoor(248, 830, 'bottomLeft');
            this.addDoor(816, 808, 'bottomRight');
            this.addPlayerSpawn(400, 532);
            this.addPlayerSpawn(384, 748);
            this.addPlayerSpawn(648, 748);
            this.addPlayerSpawn(600, 532);
            this.addEnemySpawn(124, 668);
            this.addEnemySpawn(500, 868);
            this.addEnemySpawn(900, 668);
        },
    });
});