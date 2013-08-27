ig.module(
	'game.items.repairKit'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	RepairKit = BaseItem.extend({

        isAction : true, 

        init : function()
        {
            this.parent();
            this.name = ScriptCore.ItemRepairKitName;
            this.description = ScriptCore.ItemRepairKitDescription;
            this.useText = ScriptCore.ItemRepairKitUse;
        }, 
        
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