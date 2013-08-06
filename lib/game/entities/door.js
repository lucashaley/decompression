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
        size : {x : 64, y : 64, }, 

		description : "This is a door.", 

		//image: null,
		texture: null, 
		menu : null, 

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
			this.texture = AssetCore.textures.door;//glLoadTexture(this.image.data);
			this.size.x = this.texture.width;
			this.size.y = this.texture.height;
			this.menu = new ContextMenu();
			this.menu.init(['inspect']);
            this.menu.connectingEntity = this;
		},

		draw: function(intensity)
		{
			glDraw(this.size.x, this.size.y, this.pos.x, this.pos.y, intensity, this.texture);
		}, 

		setPosition : function(x, y)
		{
			this.pos.x = x;
			this.pos.y = y;
		}, 
		isMouseOver : function()
		{
			var halfW = this.size.x / 2;
            var halfH = this.size.y / 2;

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