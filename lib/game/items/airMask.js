ig.module(
	'game.items.airMask'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	AirMask = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		name : "Air Mask", 
		description : "Makes you immune to Neurotoxin", 

		isUsable : false, 

		destroyOnActivate : false, 
		acitvateSpendsAction : false, 

        onPlayerGet : function(player)
        {
        	player.resistances.neurotoxin = true;
        }, 
        onPlayerRemove : function(player)
        {
        	if (player.jobName == 'Space Walker') return;
        	player.resistances.neurotoxin = false;
        }, 
	});
});