ig.module(
	'game.items.smallSnack'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	SmallSnack = BaseItem.extend({

		isAction : true, 

        init : function()
        {
            this.parent();
            this.name = ScriptCore.ItemSmallSnackName;
            this.description = ScriptCore.ItemSmallSnackDescription;
            this.useText = ScriptCore.ItemSmallSnackUse;
            this.cannotUseText = ScriptCore.ItemSmallSnackCannotUse;
        }, 

        canUse : function(player)
        {
        	return player.status.health < player.status.maxHealth;
        }, 
        onUse : function(player)
        {
        	player.status.health += 2;
        	if (player.status.health > player.status.maxHealth) player.status.health = player.status.maxHealth;
        }, 
	});
});