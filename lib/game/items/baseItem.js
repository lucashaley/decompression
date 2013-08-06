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

		//image: new ig.Image('media/bag.png'),
		texture: null, 
        menu : null, 

		name : "dupe", 
		description : "This is an item", 
        useText : "This item cannot be used", 
        cannotUseText : "This item cannot be used", 

		isJunk : false, 
		isUsable : true, 
		isTradable : true, 
		isDestroyable : true, 
		isAction : false, 

		destroyOnActivate : true, 

		init : function()
		{
			this.texture = AssetCore.textures.bag;//glLoadTexture(this.image.data);
            this.menu = new ContextMenu();
            this.menu.init(['inspect']);
            if (this.isUsable) this.menu.addOption('use');
            if (this.isTradable) this.menu.addOption('give');
            if (this.isDestroyable) this.menu.addOption('destroy');
            this.menu.connectingEntity = this;
		}, 

		update : function()
		{
			this.parent();
		}, 

        draw: function(x, y)
        {
			glDraw(this.texture.width, this.texture.height, this.x, this.y, 1, this.texture);
			if (this.isMouseOver())
			{
            	MainFont.draw(this.description, ig.input.mouse.x, ig.input.mouse.y - 16, ig.Font.ALIGN.CENTER);
            	MainFont.draw(this.name, ig.input.mouse.x, ig.input.mouse.y - 48, ig.Font.ALIGN.CENTER);
			}
        }, 

        canUse : function(player)
        {
            return false;
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
            var halfW = this.texture.width / 2;
            var halfH = this.texture.height / 2;
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