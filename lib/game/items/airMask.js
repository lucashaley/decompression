ig.module(
	'game.items.airMask'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	AirMask = BaseItem.extend({

		isUsable : false, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        init : function()
        {
            this.parent();
            this.texture = AssetCore.textures.icon_AirMask;
            this.name = ScriptCore.ItemAirMaskName;
            this.description = ScriptCore.ItemAirMaskDescription;
        }, 

        onPlayerGet : function(player)
        {
        	player.resistances.neurotoxin = true;
        }, 
        onPlayerRemove : function(player)
        {
        	if (player.jobName == 'Space Walker') return;
        	player.resistances.neurotoxin = false;
        }, 
	});
});