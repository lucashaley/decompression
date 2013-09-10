ig.module(
	'game.items.modB'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ModB = BaseItem.extend({
		
		isUsable : false, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        init : function()
        {
            this.parent();
            this.texture = AssetCore.textures.icon_ModB;
            this.name = ScriptCore.ItemModBName;
            this.description = ScriptCore.ItemModBDescription;
        }, 

        onPlayerGet : function(player)
        {
        	player.status.attackBonus += 0.10;
            player.mods.b = true;
        }, 
        onPlayerRemove : function(player)
        {
        	player.status.attackBonus -= 0.10;
            player.mods.b = false;
        }, 
	});
});