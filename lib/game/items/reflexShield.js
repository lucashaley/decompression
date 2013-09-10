ig.module(
	'game.items.reflexShield'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ReflexShield = BaseItem.extend({

		isUsable : true, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        init : function()
        {
            this.parent();
            this.texture = AssetCore.textures.icon_ReflexShield;
            this.name = ScriptCore.ItemReflexShieldName;
            this.description = ScriptCore.ItemReflexShieldDescription;
            this.useText = ScriptCore.ItemReflexShieldUse;
        }, 

        canUse : function(player)
        {
            return true;
        }, 
        onUse : function(player)
        {
        	player.ignoreNextDamage = true;
        }, 
	});
});