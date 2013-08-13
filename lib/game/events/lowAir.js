ig.module(
	'game.events.lowAir'
)
.requires(
	'impact.entity',
    'game.events.baseEvent'
)
.defines(function(){
	LowAir = BaseEvent.extend({

        name : "Low Air", 
        description : "Players are limited to 1 action per turn.", 

        onStart : function()
        {
            for (var i = 0; i < GameCore.players.length; i++)
            {
                var player = GameCore.players[i];
                if (player != null)
                {
                    player.limitActions = true;
                }
            }
        }, 
        onEnd : function()
        {
            for (var i = 0; i < GameCore.players.length; i++)
            {
                var player = GameCore.players[i];
                if (player != null)
                {
                    player.limitActions = false;
                }
            }
        }, 
    });
});