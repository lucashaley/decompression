ig.module(
	'game.items.blueKeycard'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	BlueKeycard = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		name : "Blue Keycard", 
		description : "This is an item", 
        useText : "You used Blue Keycard", 

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