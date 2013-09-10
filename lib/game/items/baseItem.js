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

		texture: null,
        menu : null,

		name : '',
		description : '',
        useText : '',
        cannotUseText : '',

		isJunk : false,
		isUsable : true,
		isTradable : true,
		isDestroyable : true,
		isAction : false,
        isImplant : false,

		destroyOnActivate : true,

		init : function()
		{
            this.name = ScriptCore.ItemBaseName;
            this.description = ScriptCore.ItemBaseDescription;
            this.useText = ScriptCore.ItemBaseUse;
            this.cannotUseText = ScriptCore.ItemBaseCannotUse;
			this.texture = AssetCore.textures.bag;
            this.menu = new ContextMenu();
            this.menu.init(['inspect']);
            if (this.isUsable) this.menu.addOption('use');
            if (this.isTradable) this.menu.addOption('give');
            if (this.isDestroyable) this.menu.addOption('destroy');
            if (this.isImplant) this.menu.addOption('lock');
            this.menu.connectingEntity = this;
		},

		update : function()
		{
			this.parent();
		},

        draw: function(x, y)
        {
			if (this.texture != null) glDraw(this.texture.width, this.texture.height, this.x, this.y, 1, this.texture);
			if (this.isMouseOver())
			{
            	MainFont.draw(this.name, ig.input.mouse.x, ig.input.mouse.y - 16, ig.Font.ALIGN.CENTER);
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
        onLock : function(player)
        {
            if (!this.isImplant) return;
            this.menu.init(['inspect']);
        },

        setPosition : function(x, y)
        {
            this.x = x;
            this.y = y;
        },
        isMouseOver: function()
        {
            var halfW = 32 / 2;
            var halfH = 32 / 2;
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