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
		description : "Gives +1 inventory slot", 
        useText : "You gain 1 inventory slot", 

        canUse : function(player)
        {
            return true;
        }, 
        onUse : function(player)
        {
        	player.status.inventoryCap += 1;
        }, 
	});
});