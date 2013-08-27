ig.module(
	'game.items.substanceX'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	SubstanceX = BaseItem.extend({

		isAction : true, 

        init : function()
        {
            this.parent();
            this.name = ScriptCore.ItemSubstanceXName;
            this.description = ScriptCore.ItemSubstanceXDescription;
            this.useText = ScriptCore.ItemSubstanceXUse;
            this.cannotUseText = ScriptCore.ItemSubstanceXCannotUse;
        }, 

        canUse : function(player)
        {
        	return player.status.health < player.status.maxHealth;
        }, 
        onUse : function(player)
        {
        	player.status.health = player.status.maxHealth;
        }, 
	});
});