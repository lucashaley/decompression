ig.module(
	'game.items.friendlyDrone'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	FriendlyDrone = BaseItem.extend({

		isUsable : false, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        init : function()
        {
            this.parent();
            this.name = ScriptCore.ItemFriendlyDroneName;
            this.description = ScriptCore.ItemFriendlyDroneDescription;
        }, 

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