ig.module(
	'game.events.darkness'
)
.requires(
	'impact.entity',
    'game.events.baseEvent'
)
.defines(function(){
	Darkness = BaseEvent.extend({

        name : "Darkness", 
        description : "Players do not receive any bonuses from each other.", 

        onStart : function()
        {
            for (var i = 0; i < GameCore.players.length; i++)
            {
                var player = GameCore.players[i];
                if (player != null)
                {
                    player.disableBonuses = true;
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
                    player.disableBonuses = false;
                }
            }
        }, 
    });
});