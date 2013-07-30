ig.module(
	'game.items.healthKit'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	HealthKit = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		name : "Health Kit", 
		description : "This is an item", 
        useText : "You gain 3 health", 

		isAction : true, 

        onUse : function(player)
        {
        	player.status.health += 3;
        	if (player.status.health > player.status.maxHealth) player.status.health = player.status.maxHealth;
        }, 
	});
});