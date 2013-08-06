ig.module(
	'game.items.modA'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ModA = BaseItem.extend({
		
		image: new ig.Image('media/bag.png'),

		name : "Mod A", 
		description : "Gives you +1 accuracy", 

		isUsable : false, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        onPlayerGet : function(player)
        {
        	player.status.attackBonus += 0.05;
        }, 
        onPlayerRemove : function(player)
        {
        	player.status.attackBonus -= 0.05;
        }, 
	});
});