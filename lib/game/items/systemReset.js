ig.module(
	'game.items.systemReset'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	SystemReset = BaseItem.extend({

        init : function()
        {
            this.parent();
            this.name = ScriptCore.ItemSystemResetName;
            this.description = ScriptCore.ItemSystemResetDescription;
            this.useText = ScriptCore.ItemSystemResetUse;
        }, 

        canUse : function(player)
        {
            return true;
        }, 
        onUse : function(player)
        {
        	GameCore.endEvent();
        }, 
	});
});