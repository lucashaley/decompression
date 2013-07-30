ig.module(
	'game.items.reprogrammingHardware'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ReprogrammingHardware = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		name : "Reprogramming Hardware", 
		description : "This is an item", 
        useText : "The hardware searched for the nearest machine to reprogram", 

		isAction : true, 

        onUse : function(player)
        {
        	var enemy = GameCore.currentRoom.getEnemy();
        	if (enemy == null) return;
        	enemy.death();
        }, 
	});
});