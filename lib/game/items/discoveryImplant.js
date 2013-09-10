ig.module(
	'game.items.discoveryImplant'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	DiscoveryImplant = BaseItem.extend({

		isUsable : false, 
        isImplant : true, 

        init : function()
        {
            this.parent();
            this.texture = AssetCore.textures.icon_DiscoveryImplant;
            this.name = ScriptCore.ItemDiscoveryImplantName;
            this.description = ScriptCore.ItemDiscoveryImplantDescription;
        }, 

        onLock : function(player)
        {
            this.parent();
            player.implants.discovery = true;
        }, 
	});
});