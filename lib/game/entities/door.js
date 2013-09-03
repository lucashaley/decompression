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

		description : '', 

		//image: null,
        textures : 
        {
            diffuse : null,
            normal : null,
            relief : null,
            emissive : null, 
        }, 
		menu : null, 

		locked: false,
		flipped: false,

		currentRoom : null, 
		connectingRoom: null, 
		connectingDoor: null, 
		transitionDirection : 
		{
			x : 0, 
			y : 0, 
		}, 

		init : function()
		{
			this.description = ScriptCore.DoorDescription;
			this.textures.diffuse = AssetCore.textures.door;
            this.size.x = this.textures.diffuse.width;
            this.size.y = this.textures.diffuse.height;
			this.menu = new ContextMenu();
			this.menu.init(['inspect']);
            this.menu.connectingEntity = this;
		},

		draw: function()
		{
        	glSetFlipped(this.flipped);
			glDraw(this.size.x, this.size.y, this.pos.x + this.currentRoom.corner.x, this.pos.y + this.currentRoom.corner.y, 
				this.currentRoom.intensity, this.textures.diffuse, this.textures.normal, this.textures.relief, this.textures.emissive);
        	glSetFlipped(false);
		}, 

		setPosition : function(x, y)
		{
			this.pos.x = x;
			this.pos.y = y;
		}, 
		setTextures : function(diffuse, normal, relief, emissive)
		{
			this.textures.diffuse = diffuse;
			this.textures.normal = normal;
			this.textures.relief = relief;
			this.textures.emissive = emissive;
            this.size.x = this.textures.diffuse.width;
            this.size.y = this.textures.diffuse.height;this.textures.diffuse = diffuse;
		}, 
		isMouseOver : function()
		{
			var halfW = this.size.x / 2;
            var halfH = this.size.y / 2;
            var x0 = this.pos.x + this.currentRoom.corner.x;
            var y0 = this.pos.y + this.currentRoom.corner.y;

            if (
            	ig.input.mouse.x >= x0 - halfW && 
            	ig.input.mouse.x <= x0 + halfW && 
            	ig.input.mouse.y >= y0 - halfH && 
            	ig.input.mouse.y <= y0 + halfH)
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