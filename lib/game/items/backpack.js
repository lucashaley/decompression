ig.module(
	'game.items.backpack'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	Backpack = BaseItem.extend({

        init : function()
        {
            this.parent();
            this.texture = AssetCore.textures.icon_Backpack;
            this.name = ScriptCore.ItemBackpackName;
            this.description = ScriptCore.ItemBackpackDescription;
            this.useText = ScriptCore.ItemBackpackUse;
        }, 

        canUse : function(player)
        {
            return true;
        }, 
        onUse : function(player)
        {
        	player.status.inventoryCap += 1;
        }, 
	});
});