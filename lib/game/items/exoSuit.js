ig.module(
	'game.items.exoSuit'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ExoSuit = BaseItem.extend({
		
		image: new ig.Image('media/bag.png'),

		name : "Exo-Suit", 
		description : "Gives you +1 armor", 

		isUsable : false, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        onPlayerGet : function(player)
        {
        	player.status.armor += 1;
        }, 
        onPlayerRemove : function(player)
        {
        	player.status.armor -= 1;
        }, 
	});
});