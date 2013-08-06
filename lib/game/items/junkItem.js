ig.module(
	'game.items.junkItem'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	JunkItem = BaseItem.extend({

		image: new ig.Image('media/bag.png'), 

		description : "Just a piece of junk.", 

		isJunk : true, 
		isUsable : false, 
		isTradable : false, 
		isDestroyable : true, 
		isAction : false, 

		destroyOnActivate : false, 

		init : function()
		{
			this.parent();

			var junkNames = 
			[
				'A Potted Plant', 
				'Empty Bottle', 
				'Broken Keycard', 
				'Wasted Ammo', 
				'Scrap Parts', 
				'Empty Cardboard Box', 
				'Video Game', 
				'Powerless Cell Phone', 
				'Trashed Paperwork', 
				'Power Cord'
			];
			var index = Math.floor(Math.random() * junkNames.length);
			this.name = junkNames[index];
		},
	});
});