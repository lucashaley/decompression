ig.module(
	'game.events.disablingField'
)
.requires(
	'impact.entity',
    'game.events.baseEvent'
)
.defines(function(){
	DisablingField = BaseEvent.extend({

        name : "Disabling Field", 
        description : "Any items in the player's inventory are immediatly destroyed.", 

        onStart : function()
        {
            for (var i = 0; i < GameCore.players.length; i++)
            {
                var player = GameCore.players[i];
                if (player != null)
                {
                    for (var k = 0; k < player.inventory.length; k++)
                    {
                        var item = player.inventory[k];
                        if (item != null && item.isDestroyable)
                        {
                            player.removeItem(item);
                        }
                    }
                }
            }
        }, 
    });
});