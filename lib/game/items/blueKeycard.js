ig.module(
	'game.items.blueKeycard'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	BlueKeycard = BaseItem.extend({

		isTradable : false, 
		isDestroyable : false, 

		destroyOnActivate : false, 

		init : function()
		{
			this.parent();
			this.texture = AssetCore.textures.icon_KeycardBlue;
			this.name = ScriptCore.ItemBlueKeycardName;
			this.description = ScriptCore.ItemBlueKeycardDescription;
			this.useText = ScriptCore.ItemBlueKeycardUse;
			this.cannotUseText = ScriptCore.ItemBlueKeycardCannotUse;
	    }, 

        canUse : function(player)
        {
            return GameCore.currentRoom.name == "Tyche";
        }, 
        onUse : function(player)
        {
        	GameCore.keyCardFound.blue = true;
        }, 
	});
});