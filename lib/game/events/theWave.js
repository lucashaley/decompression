ig.module(
	'game.events.theWave'
)
.requires(
	'impact.entity',
    'game.events.baseEvent'
)
.defines(function(){
	TheWave = BaseEvent.extend({

        name : "The Wave", 
        description : "Respawns an enemy in every non-occupied (by creep or player) room/passageway.", 

        onStart : function()
        {
            for (var i = 0; i < GameCore.rooms.length; i++)
            {
                var room = GameCore.rooms[i];
                if (room != null && !room.hasEnemies)
                {
                    room.addEnemy();
                }
            }
        }, 
    });
});