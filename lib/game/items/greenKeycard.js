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
        cannotUseText : "This must be used in the starting area", 

		isTradable : false, 
		isDestroyable : false, 

		destroyOnActivate : false, 

        canUse : function(player)
        {
            return GameCore.currentRoom.name == "Tyche";
        }, 
        onUse : function(player)
        {
        	GameCore.keyCardFound.green = true;
        }, 
	});
});