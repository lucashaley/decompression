ig.module(
	'game.items.commandImplant'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	CommandImplant = BaseItem.extend({

		isUsable : false, 
        isImplant : true, 

        init : function()
        {
            this.parent();
            this.texture = AssetCore.textures.icon_CommandImplant;
            this.name = ScriptCore.ItemCommandImplantName;
            this.description = ScriptCore.ItemCommandImplantDescription;
        }, 

        onLock : function(player)
        {
            this.parent();
            player.implants.command = true;
        }, 
	});
});