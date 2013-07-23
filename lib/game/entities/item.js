ig.module(
	'game.entities.item'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityItem = ig.Entity.extend({
		x : 0, 
		y : 0, 

		icon: new ig.Image('media/bag.png'),
		texture: null,

		init : function()
		{
			this.texture = glLoadTexture(this.icon.data);
		},

		update : function()
		{
			this.parent();
		},

        draw: function()
        {
			glDraw(this.image.width, this.image.height, this.x, this.y, 1, this.texture);
        },

        applyEffect : function(playerThatUsed)
        {
        	return;
        }, 
	});
});