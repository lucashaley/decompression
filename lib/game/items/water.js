ig.module(
	'game.items.water'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	Water = BaseItem.extend({

		isAction : true, 

        init : function()
        {
            this.parent();
            this.name = ScriptCore.ItemWaterName;
            this.description = ScriptCore.ItemWaterDescription;
            this.useText = ScriptCore.ItemWaterUse;
            this.cannotUseText = ScriptCore.ItemWaterCannotUse;
        }, 

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