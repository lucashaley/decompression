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
		description : "This is an item", 
        useText : "The current event is disabled", 

        onUse : function(player)
        {
        	GameCore.currentEvent = null;
        }, 
	});
});