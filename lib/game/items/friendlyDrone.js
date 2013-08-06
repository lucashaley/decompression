ig.module(
	'game.items.friendlyDrone'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	FriendlyDrone = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		name : "Friendly Drone", 
		description : "This drone will help with attack rolls", 

		isUsable : false, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        onPlayerGet : function(player)
        {
        	player.canReTryAttack = true;
        }, 
        onPlayerRemove : function(player)
        {
        	player.canReTryAttack = false;
        }, 
	});
});