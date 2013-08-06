ig.module(
	'game.items.systemReset'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	SystemReset = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		name : "System Reset", 
		description : "Disables the current event", 
        useText : "The current event is disabled", 

        canUse : function(player)
        {
            return true;
        }, 
        onUse : function(player)
        {
        	GameCore.endEvent();
        }, 
	});
});