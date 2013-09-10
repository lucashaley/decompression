ig.module(
	'game.roomcore'
)
.requires
(
    'game.rooms.baseRoom', 

    'game.rooms.airlock',
    'game.rooms.armory', 
    'game.rooms.barracks',
    'game.rooms.bridge',
    'game.rooms.brig',
    'game.rooms.corridorElbow',
    'game.rooms.corridorPit',
    'game.rooms.corridorStraight',
    'game.rooms.corridorT',
    'game.rooms.engineeringReactor',
    'game.rooms.engineeringCore',
    'game.rooms.hangar',
    'game.rooms.infirmary',
    'game.rooms.octoRoom',
    'game.rooms.oddShape',
    'game.rooms.plainRoom',
    'game.rooms.recRoom',
    'game.rooms.tyche'
)

.defines(function(){
    EntityRoomCore = ig.Entity.extend(
    {
        roomTypes : ['Airlock', 'Armory', 'Barracks', 'Bridge', 'Brig', 'Engineering Core', 'Engineering Reactor', 'Hangar', 'Infirmary', 'RecRoom'], 
        map : 
        [
            [null, null, null, null, null, null, null, ], 
            [null, null, null, null, null, null, null, ], 
            [null, null, null, null, null, null, null, ], 
            [null, null, null, null, null, null, null, ], 
            [null, null, null, null, null, null, null, ], 
            [null, null, null, null, null, null, null, ], 
            [null, null, null, null, null, null, null, ], 
        ], 

        init : function()
        {
            //console.log('INIT ROOMCORE', this.map);
        }, 

        generate : function()
        {
            GameCore.rooms = [];

            this.insertRoomByName(0, 0, 'Tyche');
            this.insertRoomRandom(2, 0);
            this.insertRoomRandom(0, 2);
            this.insertRoomRandom(-2, 0);
            this.insertRoomRandom(0, -2);

            for (var i = 0; i < this.map.length; i++)
            {
                var row = this.map[i];
                for (var k = 0; k < row.length; k++)
                {
                    if (row[k] == null) this.insertCorridor(k - 3, i - 3);
                }
            }
            for (var i = 0; i < this.map.length - 1; i++)
            {
                var row = this.map[i];
                var nextRow = this.map[i + 1];
                for (var k = 0; k < row.length - 1; k++)
                {
                    var current = row[k];
                    var next = row[k + 1];
                    var under = nextRow[k];

                    if (current == null) continue;
                    current.connectTo(next, 'topRight');
                    current.connectTo(under, 'bottomRight');
                    GameCore.addRoom(current);
                }
            }

            //GameCore.addRoom(new Tyche());
            //GameCore.addRoom(new Infirmary());

            //for (var i = 0; i < GameCore.rooms.length; i++) GameCore.rooms[i].init();

            //GameCore.rooms[0].connectTo(GameCore.rooms[1], 'topRight', true);

            GameCore.currentRoom = this.map[3][3];//GameCore.rooms[0];
            GameCore.startingRoom = GameCore.currentRoom;

            //console.log(GameCore.rooms);
        }, 

        requestRoomByName : function(name)
        {
            switch (name)
            {
                case 'Airlock':
                return new Airlock();
                case 'Armory':
                return new Armory();
                case 'Barracks':
                return new Barracks();
                case 'Bridge':
                return new Bridge();
                case 'Brig':
                return new Brig();
                case 'Engineering Core':
                return new EngineeringCore();
                case 'Engineering Reactor':
                return new EngineeringReactor();
                case 'Hangar':
                return new Hangar();
                case 'Infirmary':
                return new Infirmary();
                case 'RecRoom':
                return new RecRoom();
                case 'Tyche':
                return new Tyche();

                default:
                break;
            }
            return null;
        }, 

        insertCorridor : function(x, y)
        {
            if (x > 3 || x < -3 || y > 3 || y < -3) return;

            this.map[y + 3][x + 3] = new CorridorT();
        }, 
        insertRoomRandom : function(x, y)
        {
            var index = Math.floor(Math.random() * this.roomTypes.length);
            var name = this.roomTypes[index];
            var room = this.requestRoomByName(name);

            if (room == null || x > 3 || x < -3 || y > 3 || y < -3) return;
            this.map[y + 3][x + 3] = room;
        }, 
        insertRoomByName : function(x, y, name)
        {
            var room = this.requestRoomByName(name);

            if (room == null || x > 3 || x < -3 || y > 3 || y < -3) return;
            this.map[y + 3][x + 3] = room;
        }, 
    });
})