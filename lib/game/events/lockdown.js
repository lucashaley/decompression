ig.module(
	'game.events.lockdown'
)
.requires(
	'impact.entity',
    'game.events.baseEvent'
)
.defines(function(){
	Lockdown = BaseEvent.extend({

        name : "Lockdown", 
        description : "Any unique (non-passageway) room goes into lockdown.", 

        onStart : function()
        {
            for (var i = 0; i < GameCore.rooms.length; i++)
            {
                var room = GameCore.rooms[i];
                if (room != null && !room.isCorridor && room.name != 'Tyche')
                {
                    room.isLockedDown = true;
                }
            }
        }, 
        onEnd : function()
        {
            for (var i = 0; i < GameCore.rooms.length; i++)
            {
                var room = GameCore.rooms[i];
                if (room != null && !room.isCorridor != 'Tyche')
                {
                    room.isLockedDown = false;
                }
            }
        }, 
    });
});