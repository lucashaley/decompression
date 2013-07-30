ig.module(
	'game.items.substanceX'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	SubstanceX = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		name : "Substance X", 
		description : "This is an item", 
        useText : "You are restored to full health", 

		isAction : true, 

        onUse : function(player)
        {
        	player.status.health = player.status.maxHealth;
        }, 
	});
});