ig.module(
	'game.events.panic'
)
.requires(
	'impact.entity',
    'game.events.baseEvent'
)
.defines(function(){
	Panic = BaseEvent.extend({

        name : "Panic", 
        description : "You do not recive bonuses from your unique character abilities.", 

        onStart : function()
        {
            for (var i = 0; i < GameCore.players.length; i++)
            {
                var player = GameCore.players[i];
                if (player != null)
                {
                    player.disableAbility = true;
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
                    player.disableAbility = false;
                }
            }
        }, 
    });
});