ig.module(
	'game.items.greenKeycard'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	GreenKeycard = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		name : "Green Keycard", 
		description : "This is an item", 
        useText : "You used Green Keycard", 

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