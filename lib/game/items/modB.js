ig.module(
	'game.items.modB'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ModB = BaseItem.extend({
		
		image: new ig.Image('media/bag.png'),

		name : "Mod B", 
		description : "Gives you +2 accuracy", 

		isUsable : false, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

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