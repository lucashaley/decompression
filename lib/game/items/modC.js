ig.module(
	'game.items.modC'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ModC = BaseItem.extend({
		
		isUsable : false, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        init : function()
        {
            this.parent();
            this.texture = AssetCore.textures.icon_ModC;
            this.name = ScriptCore.ItemModCName;
            this.description = ScriptCore.ItemModCDescription;
        }, 

        onPlayerGet : function(player)
        {
        	player.status.attackBonus += 0.15;
            player.mods.c = true;
        }, 
        onPlayerRemove : function(player)
        {
        	player.status.attackBonus -= 0.15;
            player.mods.c = false;
        }, 
	});
});