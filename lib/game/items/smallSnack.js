ig.module(
	'game.items.smallSnack'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	SmallSnack = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		name : "Small Snack", 
		description : "This is an item", 
        useText : "You gain 2 health", 

		isAction : true, 

        onUse : function(player)
        {
        	player.status.health += 2;
        	if (player.status.health > player.status.maxHealth) player.status.health = player.status.maxHealth;
        }, 
	});
});