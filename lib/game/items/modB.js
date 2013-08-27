ig.module(
	'game.items.modB'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ModB = BaseItem.extend({
		
		isUsable : false, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        init : function()
        {
            this.parent();
            this.name = ScriptCore.ItemModBName;
            this.description = ScriptCore.ItemModBDescription;
        }, 

        onPlayerGet : function(player)
        {
        	player.status.attackBonus += 0.10;
        }, 
        onPlayerRemove : function(player)
        {
        	player.status.attackBonus -= 0.10;
        }, 
	});
});