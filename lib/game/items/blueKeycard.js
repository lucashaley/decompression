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
        	GameCore.keyCardFound.blue = true;
        }, 
	});
});