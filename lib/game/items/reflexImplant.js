ig.module(
	'game.items.reflexImplant'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ReflexImplant = BaseItem.extend({

		isUsable : false, 
        isImplant : true, 

        init : function()
        {
            this.parent();
            this.texture = AssetCore.textures.icon_ReflexImplant;
            this.name = ScriptCore.ItemReflexImplantName;
            this.description = ScriptCore.ItemReflexImplantDescription;
        }, 

        onLock : function(player)
        {
            this.parent();
            player.implants.reflex = true;
            player.status.actionsCap += 1;
        }, 
	});
});