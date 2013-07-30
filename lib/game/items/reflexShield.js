ig.module(
	'game.items.reflexShield'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ReflexShield = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		name : "Reflex Shield", 
		description : "This is an item", 
        useText : "The next incoming damage is negated", 

		isUsable : true, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        onUse : function(player)
        {
        	player.ignoreNextDamage = true;
        }, 
	});
});