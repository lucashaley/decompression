ig.module(
	'game.entities.laser'
)
.requires(
	'impact.entity', 
    'game.ui.contextMenu'
)
.defines(function(){
	EntityLaser = ig.Entity.extend({
		pos : {x : 0, y : 0, }, 
		size : {x : 64, y : 64, }, 

		textures : 
		{
			diffuse : null,
			normal : null,
			relief : null,
			emissive : null, 
		}, 

		init : function(x0, y0, x1, y1)
		{
		},

		draw: function()
		{
        	glSetFlipped(this.flipped);
			glDraw(this.size.x, this.size.y, this.pos.x + this.currentRoom.corner.x, this.pos.y + this.currentRoom.corner.y, this.currentRoom.intensity, 
				this.textures.diffuse);
        	glSetFlipped(false);
		}, 
	});
});