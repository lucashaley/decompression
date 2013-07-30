ig.module(
	'game.items.repairKit'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	RepairKit = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		name : "Repair Kit", 
		description : "This is an item", 
        useText : "You transform some junk into a usable item", 

        onUse : function(player)
        {
        	var index = -1;
        	for (var i = 0; i < player.inventory.length; i++)
        	{
        		if (player.inventory[i].isJunk)
        		{
        			index = i;
        			break;
        		}
        	}
        	if (index < 0) return;

        	player.removeItem(index);
        	player.addItem(ItemCore.generateRandomNonKeycardItem());
        }, 
	});
});