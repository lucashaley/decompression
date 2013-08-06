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

        isAction : true, 
        
        canUse : function(player)
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
            if (index < 0) return false;
            return true;
        }, 
        onUse : function(player)
        {
            var item = null;
            var foundJunk = false;
        	for (var i = 0; i < player.inventory.length; i++)
        	{
                item = player.inventory[i];
        		if (item.isJunk)
                {
                    foundJunk = true;
                    break;
                }
        	}
            if (!foundJunk) return;

        	player.removeItem(item);
        	player.addItem(ItemCore.generateRandomNonKeycardItem());
        }, 
	});
});