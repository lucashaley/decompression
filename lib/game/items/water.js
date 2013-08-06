ig.module(
	'game.items.water'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	Water = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		name : "Water", 
		description : "This is an item", 
        useText : "You gain 1 health", 
        cannotUseText : "You are already at full health", 

		isAction : true, 

        canUse : function(player)
        {
        	return player.status.health < player.status.maxHealth;
        }, 
        onUse : function(player)
        {
        	player.status.health += 1;
        	if (player.status.health > player.status.maxHealth) player.status.health = player.status.maxHealth;
        }, 
	});
});