ig.module(
	'game.items.quantumImplant'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	QuantumImplant = BaseItem.extend({

		isUsable : false, 
        isImplant : true, 

        init : function()
        {
            this.parent();
            this.texture = AssetCore.textures.icon_QuantumImplant;
            this.name = ScriptCore.ItemQuantumImplantName;
            this.description = ScriptCore.ItemQuantumImplantDescription;
        }, 

        onLock : function(player)
        {
            this.parent();
            player.implants.quantum = true;
        }, 
	});
});