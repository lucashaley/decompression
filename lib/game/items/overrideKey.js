ig.module(
	'game.items.overrideKey'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	OverrideKey = BaseItem.extend({
		
		image: new ig.Image('media/bag.png'),

		name : "Override Key", 
		description : "Allows you to exit locked down rooms", 

		isUsable : false, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        onPlayerGet : function(player)
        {
        	player.ignoreLockDown = true;
        }, 
        onPlayerRemove : function(player)
        {
        	if (player.jobName == 'Messanger') return;
        	player.ignoreLockDown = false;
        }, 
	});
});