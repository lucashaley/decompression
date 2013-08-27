ig.module(
	'game.items.exoSuit'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ExoSuit = BaseItem.extend({
		
		isUsable : false, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        init : function()
        {
            this.parent();
            this.name = ScriptCore.ItemExoSuitName;
            this.description = ScriptCore.ItemExoSuitDescription;
        }, 

        onPlayerGet : function(player)
        {
        	player.status.armor += 1;
        }, 
        onPlayerRemove : function(player)
        {
        	player.status.armor -= 1;
        }, 
	});
});