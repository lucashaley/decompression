ig.module(
	'game.items.redKeycard'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	RedKeycard = BaseItem.extend({

		isTradable : false, 
		isDestroyable : false, 

		destroyOnActivate : false, 

        init : function()
        {
            this.parent();
            this.name = ScriptCore.ItemRedKeycardName;
            this.description = ScriptCore.ItemRedKeycardDescription;
            this.useText = ScriptCore.ItemRedKeycardUse;
            this.cannotUseText = ScriptCore.ItemRedKeycardCannotUse;
        }, 

        canUse : function(player)
        {
            return GameCore.currentRoom.name == "Tyche";
        }, 
        onUse : function(player)
        {
        	GameCore.keyCardFound.red = true;
        }, 
	});
});