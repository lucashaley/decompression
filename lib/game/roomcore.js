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
    'game.rooms.armory'
)

.defines(function(){
    EntityRoomCore = ig.Entity.extend(
    {
        init : function()
        {
            console.log('INIT ROOMCORE');
        }, 

        generate : function()
        {
            GameCore.rooms = [];
            GameCore.addRoom(new Tyche());
            GameCore.addRoom(new Infirmary());

            for (var i = 0; i < GameCore.rooms.length; i++) GameCore.rooms[i].init();

            GameCore.rooms[0].connectTo(GameCore.rooms[1], 'topRight', true);
            GameCore.currentRoom = GameCore.rooms[0];
            GameCore.startingRoom = GameCore.currentRoom;
        }, 
    });
})