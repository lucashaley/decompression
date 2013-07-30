ig.module(
	'game.items.backpack'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	Backpack = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		name : "Backpack", 
		description : "This is an item", 
        useText : "You gain 1 inventory slot", 

        onUse : function(player)
        {
        	player.status.inventoryCap += 1;
        }, 
	});
});