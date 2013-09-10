ig.module(
	'game.items.greenKeycard'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	GreenKeycard = BaseItem.extend({

		isTradable : false, 
		isDestroyable : false, 

		destroyOnActivate : false, 

        init : function()
        {
            this.parent();
            this.texture = AssetCore.textures.icon_KeycardGreen;
            this.name = ScriptCore.ItemGreenKeycardName;
            this.description = ScriptCore.ItemGreenKeycardDescription;
            this.useText = ScriptCore.ItemGreenKeycardUse;
            this.cannotUseText = ScriptCore.ItemGreenKeycardCannotUse;
        }, 

        canUse : function(player)
        {
            return GameCore.currentRoom.name == "Tyche";
        }, 
        onUse : function(player)
        {
        	GameCore.keyCardFound.green = true;
        }, 
	});
});