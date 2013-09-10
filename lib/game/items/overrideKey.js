ig.module(
	'game.items.overrideKey'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	OverrideKey = BaseItem.extend({

		isUsable : false, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        init : function()
        {
            this.parent();
            this.texture = AssetCore.textures.icon_Override;
            this.name = ScriptCore.ItemOverrideKeyName;
            this.description = ScriptCore.ItemOverrideKeyDescription;
        }, 

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