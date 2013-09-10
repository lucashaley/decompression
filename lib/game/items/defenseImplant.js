ig.module(
	'game.items.defenseImplant'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	DefenseImplant = BaseItem.extend({

		isUsable : false, 
        isImplant : true, 

        init : function()
        {
            this.parent();
            this.texture = AssetCore.textures.icon_DefenseImplant;
            this.name = ScriptCore.ItemAirMaskName;
            this.description = ScriptCore.ItemAirMaskDescription;
        }, 

        onLock : function(player)
        {
            this.parent();
            player.implants.defense = true;
            player.status.maxHealth += 3;
        }, 
	});
});