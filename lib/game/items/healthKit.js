ig.module(
	'game.items.healthKit'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	HealthKit = BaseItem.extend({

		isAction : true, 

        init : function()
        {
            this.parent();
            this.texture = AssetCore.textures.icon_HealthKit;
            this.name = ScriptCore.ItemHealthKitName;
            this.description = ScriptCore.ItemHealthKitDescription;
            this.useText = ScriptCore.ItemHealthKitUse;
            this.cannotUseText = ScriptCore.ItemHealthKitCannotUse;
        }, 

        canUse : function(player)
        {
        	return player.status.health < player.status.maxHealth;
        }, 
        onUse : function(player)
        {
        	player.status.health += 3;
        	if (player.status.health > player.status.maxHealth) player.status.health = player.status.maxHealth;
        }, 
	});
});