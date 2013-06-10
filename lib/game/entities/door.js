ig.module(
	'game.entities.door'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityDoor = ig.Entity.extend({
		image: new ig.Image('lib/game/media/door1.png'),
		x: 100,
		y: 100,
		available: false,
		doorHoverColor : new Color(0.2, 0.2, 0.2),
		doorActiveColor : new Color(0.4, 0.4, 0.4),
		doorColor : new Color(0.0, 0.0, 0.0),
		flip: false,
		hovering: false,
		active: false,
		texture: null,
		connectingRoom: null,

		init : function(x, y) {
			this.x = x;
			this.y = y - this.image.height/2;
			this.texture = glLoadTexture(this.image.data);
		},

		isOnDoor : function() {
			var halfW = this.image.width / 2;
            var halfH = this.image.height / 2;

            if(ig.input.mouse.x > this.x - halfW && ig.input.mouse.x < this.x+halfW && ig.input.mouse.y > this.y - halfH && ig.input.mouse.y < this.y+halfH) {
            	this.hovering = true;
            	return true;
            }else{
            	this.hovering = false;
            	return false;
            }
		},

		draw: function() {
			var usingColor = null;
			if(this.hovering) usingColor = this.doorHoverColor;
			else if(this.active) usingColor = this.doorActiveColor;
			else usingColor = this.doorColor;

			glDraw(this.image.width, this.image.height, this.x, this.y, 1.0, this.texture);
		}
	});
});