ig.module(
	'game.items.modC'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ModC = BaseItem.extend({
		
		image: new ig.Image('media/bag.png'),

		name : "Mod C", 
		description : "Gives you +3 accuracy", 

		isUsable : false, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        onPlayerGet : function(player)
        {
        	player.status.attackBonus += 0.15;
        }, 
        onPlayerRemove : function(player)
        {
        	player.status.attackBonus -= 0.15;
        }, 
	});
});