ig.module(
	'game.items.baseItem'
)
.requires(
	'impact.entity', 
    'game.ui.fontSheet'
)
.defines(function(){
	BaseItem = ig.Class.extend({
		x : 0, 
		y : 0, 

		image: new ig.Image('media/bag.png'),
        font: new FontSheet( 'media/FontSheet_128.png' ), 
		texture: null, 

		name : "dupe", 
		description : "This is an item", 
        useText : "This item cannot be used", 

		isJunk : false, 
		isUsable : true, 
		isTradable : true, 
		isDestroyable : true, 
		isAction : false, 

		destroyOnActivate : true, 

		init : function()
		{
			this.texture = glLoadTexture(this.image.data);
		},

		update : function()
		{
			this.parent();
		},

        draw: function()
        {
			glDraw(this.image.width, this.image.height, this.x, this.y, 1, this.texture);
			if (this.isMouseOver())
			{
            	this.font.draw(this.description, ig.input.mouse.x, ig.input.mouse.y - 16, ig.Font.ALIGN.LEFT);
            	this.font.draw(this.name, ig.input.mouse.x, ig.input.mouse.y - 48, ig.Font.ALIGN.LEFT);
			}
        },

        onUse : function(player)
        {
        	return;
        }, 
        onPlayerGet : function(player)
        {
        	return;
        }, 
        onPlayerRemove : function(player)
        {
        	return;
        }, 

        setPosition : function(x, y)
        {
            this.x = x;
            this.y = y;
        }, 
        isMouseOver: function()
        {
            var halfW = this.image.width / 2;
            var halfH = this.image.height / 2;
            if (ig.input.mouse.x > this.x - halfW && ig.input.mouse.x < this.x+halfW && ig.input.mouse.y > this.y - halfH && ig.input.mouse.y < this.y+halfH)
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