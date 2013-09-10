ig.module(
	'game.items.resourceDetector'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ResourceDetector = BaseItem.extend({

        isAction : true, 

        init : function()
        {
            this.parent();
            this.texture = AssetCore.textures.icon_ResourceDetector;
            this.name = ScriptCore.ItemResourceDetectorName;
            this.description = ScriptCore.ItemResourceDetectorDescription;
            this.useText = ScriptCore.ItemResourceDetectorUse;
            this.cannotUseText = ScriptCore.ItemResourceDetectorCannotUse;
        }, 

        canUse : function(player)
        {
        	if (GameCore.currentRoom.maxLoot < 1) return false;
            return true;
        }, 
        onUse : function(player)
        {
        	GameCore.currentRoom.refreshLoot();
        }, 
	});
});