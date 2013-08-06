ig.module(
	'game.items.resourceDetector'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ResourceDetector = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		name : "Resource Detector", 
		description : "Refreshes room items", 
        useText : "This room's items have been refreshed", 
        cannotUseText : "This room has no items", 

        isAction : true, 

        canUse : function(player)
        {
        	if (GameCore.currentRoom.maxLoot < 1) return false;
            return true;
        }, 
        onUse : function(player)
        {
        	GameCore.currentRoom.refreshLoot();
        }, 
	});
});