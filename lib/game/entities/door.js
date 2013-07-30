ig.module(
	'game.entities.door'
)
.requires(
	'impact.entity', 
    'game.ui.contextMenu'
)
.defines(function(){
	EntityDoor = ig.Entity.extend({
		pos : {x : 0, y : 0, }, 

		description : "This is a door.", 
		menu : null, 

		image: new ig.Image('media/door.png'),
		texture: null,

		locked: false,
		hovering: false,

		connectingRoom: null, 
		connectingDoor: null, 
		transitionDirection : 
		{
			x : 0, 
			y : 0, 
		}, 

		init : function()
		{
			this.texture = glLoadTexture(this.image.data);
			this.menu = new ContextMenu();
			this.menu.init(['inspect']);
            this.menu.connectingEntity = this;
		},

		draw: function(intensity)
		{
			glDraw(this.image.width, this.image.height, this.pos.x, this.pos.y, intensity, this.texture);
		}, 

		setPosition : function(x, y)
		{
			this.pos.x = x;
			this.pos.y = y;
		}, 
		isMouseOver : function()
		{
			var halfW = this.image.width / 2;
            var halfH = this.image.height / 2;

            if (
            	ig.input.mouse.x >= this.pos.x - halfW && 
            	ig.input.mouse.x <= this.pos.x + halfW && 
            	ig.input.mouse.y >= this.pos.y - halfH && 
            	ig.input.mouse.y <= this.pos.y + halfH)
            {
            	return true;
            }
            else
            {
            	return false;
            }
		}, 

		connectTo : function(otherRoom, otherDoor)
		{
			this.connectingRoom = otherRoom;
			this.connectingDoor = otherDoor;
			this.unlock();
		}, 
		unlock : function()
		{
			this.locked = false;
			this.menu.setOptions(['inspect', 'move']);
			if (this.connectingDoor != null)
			{
				this.connectingDoor.locked = false;
				this.connectingDoor.menu.setOptions(['inspect', 'move']);
			}
		}, 
		lock : function()
		{
			this.locked = true;
			this.menu.setOptions(['inspect', 'unlock']);
			if (this.connectingDoor != null)
			{
				this.connectingDoor.locked = true;
				this.connectingDoor.menu.setOptions(['inspect', 'unlock']);
			}
		}, 
	});
});