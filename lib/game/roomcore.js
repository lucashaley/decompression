ig.module(
	'game.roomcore'
)
.requires
(
    'game.rooms.baseRoom',
    'game.rooms.tyche',
    'game.rooms.infirmary',
    'game.rooms.recRoom',
    'game.rooms.hangar',
    'game.rooms.engineeringReactor',
    'game.rooms.engineeringCore',
    'game.rooms.brig',
    'game.rooms.bridge',
    'game.rooms.barracks',
    'game.rooms.armory',
    'game.rooms.octoRoom',
    'game.rooms.corridorStraight',
    'game.rooms.corridorPit',
    'game.rooms.corridorElbow',
    'game.rooms.airlock',
    'game.rooms.oddShape',
    'game.rooms.corridorT'
)

.defines(function(){
    EntityRoomCore = ig.Entity.extend(
    {
        init : function()
        {
            console.log('INIT ROOMCORE');
            GameCore.rooms = [];
        }, 

        generate : function()
        {
        //    GameCore.rooms = [];
            var startRoom = new Tyche();
            GameCore.addRoom(startRoom);        //0
            GameCore.addRoom(new Bridge());       //1
            GameCore.addRoom(new Infirmary());    //2
            GameCore.addRoom(new RecRoom());      //3
            GameCore.addRoom(new Hangar());       //4
            GameCore.addRoom(new Brig());         //5
            GameCore.addRoom(new Barracks());     //6
            GameCore.addRoom(new Armory());       //7

            //corridors
            /*GameCore.addRoom(new OctoRoom());         //8
            GameCore.addRoom(new CorridorStraight()); //9
            GameCore.addRoom(new CorridorPit());      //10
            GameCore.addRoom(new CorridorElbow());    //11
            GameCore.addRoom(new oddShape());         //12
            GameCore.addRoom(new CorridorT());        //13
            
            OctoRoom: topRight,bottomLeft,topLeft
            CorridorStraight: topRight,bottomLeft
            CorridorPit: topRight,topLeft
            CorridorElbow: bottomRight,bottomLeft
            oddShape: topRight,bottomRight,topLeft
            CorridorT: topRight,bottomRight,bottomLeft,topLeft
            */
            //for (var i = 0; i < GameCore.rooms.length; i++) GameCore.rooms[i].init();
            var shuffle = function(o){
                for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                    return o;
            };
            var primaryRooms = shuffle([1,2,3,4,5,6,7]);
            var connectRoooms = function(roomA, roomB, corridor)
            {
                var lookingFor = roomA.oppositeSide(corridor)
                var doorsA = roomA.getAvailableDoors();
                var doorsB = roomB.getAvailableDoors();
                if(doorsB.indexOf(lookingFor) != -1)
                {
                    roomA.connectTo(roomB, corridor, true)
                } else {
                    var randomCorridorType = shuffle(doorsB).pop();
                    var randomCorridor = generateCorridor(corridor, randomCorridorType);
                    if(randomCorridorType == corridor)
                    {
                        var T1 = new CorridorT();
                        var T2 = new CorridorT();
                        GameCore.addRoom(T1);
                        GameCore.addRoom(T2);
                        roomA.connectTo(T1, corridor, true)
                        roomB.connectTo(T2, corridor, true)
                        var connectingCorridor = 
                            T1.getAvailableDoors().erase(corridor).pop();
                        console.log(connectingCorridor);
                        T1.connectTo(T2, connectingCorridor, true);

                    } else {
                        GameCore.addRoom(randomCorridor);
                        roomA.connectTo(randomCorridor, corridor, true);
                        roomB.connectTo(randomCorridor, randomCorridorType, true);
                    }
                }

            }
            var generateCorridor = function(doorTypeA, doorTypeB)
            {
                switch(doorTypeA+":"+doorTypeB)
                {
                    case "topLeft:topRight":
                    case "topRight:topLeft":
                        return new CorridorElbow();
                    break;
                    case "topLeft:bottomLeft":
                    case "bottomLeft:topLeft":
                        return new oddShape(); // T
                    break;
                    case "topLeft:bottomRight":
                    case "bottomRight:topLeft":
                        return new oddShape(); //or T
                    break;
                    case "topRight:bottomRight":
                    case "bottomRight:topRight":
                        return new OctoRoom();
                    break;
                    case "topRight:bottomLeft":
                    case "bottomLeft:topRight":
                        return new CorridorStraight()
                    break;
                    case "bottomLeft:bottomRight":
                    case "bottomRight:bottomLeft":
                        return new CorridorPit();
                    break;
                    default:
                        console.log(doorTypeA+":"+doorTypeB);
                        return new CorridorT();
                    break;
                }
            }
            var targetRoom = null;
            var startCorridors = startRoom.getAvailableDoors();
            while(primaryRooms.length > 0)
            {
                if(startCorridors.length == 0)
                {
                    startRoom = targetRoom;
                    startCorridors = startRoom.getAvailableDoors();
                }
                targetRoom = GameCore.rooms[primaryRooms.pop()];
                targetCorridor = startCorridors.pop();
                connectRoooms(startRoom, targetRoom, targetCorridor)
            }
            for(var a=1;a<GameCore.rooms.length;a++)
                console.log(GameCore.rooms[a].name + ": " + GameCore.rooms[a].getAllDoors());
            //connectRoooms(GameCore.rooms[0], GameCore.rooms[1], 'topLeft', 1);


            GameCore.currentRoom = GameCore.rooms[0];
            GameCore.currentRoom = GameCore.rooms[0];
            GameCore.currentRoom = GameCore.rooms[0];
            GameCore.currentRoom = GameCore.rooms[0];
            GameCore.startingRoom = GameCore.currentRoom;

            console.log(GameCore.rooms);
        }, 
    });
})