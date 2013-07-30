ig.module(
	'game.items.redKeycard'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	RedKeycard = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		name : "Red Keycard", 
		description : "This is an item", 
        useText : "You used Red Keycard", 

		isUsable : false, 
		isTradable : false, 
		isDestroyable : false, 

		destroyOnActivate : false, 

        onUse : function(player)
        {
        	return;
        }, 
        onPlayerGet : function(player)
        {
        	return;
        }, 
	});
});