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
        	GameCore.keyCardFound.red = true;
        }, 
	});
});