ig.module(
	'game.events.nerveGas'
)
.requires(
	'impact.entity',
    'game.events.baseEvent'
)
.defines(function(){
	NerveGas = BaseEvent.extend({

        name : "Nerve Gas", 
        description : "Players take 1 damage at the start of their turn.", 

        onTurnStart : function()
        {
        	for (var i = 0; i < GameCore.currentRoom.enemies.length; i++)
        	{
        		var enemy = GameCore.currentRoom.enemies[i];
        		if (enemy != null && enemy.name == "NanoBots")
        		{
        			Chat.push('NERVE GAS ALREADY PRESENT IN ROOM');
        			return;
        		}
        	}
        	GameCore.activePlayer.takeDamage(1, true);
        }, 
    });
});