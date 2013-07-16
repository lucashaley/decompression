ig.module(
	'game.entities.door'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityDoor = ig.Entity.extend({
		x: 0,
		y: 0,

		image: new ig.Image('media/door.png'),
		texture: null,

		locked: false,
		hovering: false,

		connectingRoom: null, 
		transitionDirection : 
		{
			x : 0, 
			y : 0, 
		}, 

		init : function()
		{
			this.texture = glLoadTexture(this.image.data);
		},

		draw: function(intensity)
		{
			glDraw(this.image.width, this.image.height, this.x, this.y, intensity, this.texture);
		}, 

		isMouseOver : function() {
			var halfW = this.image.width / 2;
            var halfH = this.image.height / 2;

            if(
            	ig.input.mouse.x >= this.x - halfW && 
            	ig.input.mouse.x <= this.x + halfW && 
            	ig.input.mouse.y >= this.y - halfH && 
            	ig.input.mouse.y <= this.y + halfH)
            {
            	return true;
            }
            else
            {
            	return false;
            }
		},
	});
});