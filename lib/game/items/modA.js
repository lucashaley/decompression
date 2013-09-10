ig.module(
	'game.items.modA'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ModA = BaseItem.extend({
		
		isUsable : false, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        init : function()
        {
            this.parent();
            this.texture = AssetCore.textures.icon_ModA;
            this.name = ScriptCore.ItemModAName;
            this.description = ScriptCore.ItemModADescription;
        }, 

        onPlayerGet : function(player)
        {
        	player.status.attackBonus += 0.05;
            player.mods.a = true;
        }, 
        onPlayerRemove : function(player)
        {
        	player.status.attackBonus -= 0.05;
            player.mods.a = false;
        }, 
	});
});