ig.module(
    'game.ui.contextMenu'
)
.requires(
    'impact.game',
    'impact.font'
)
.defines(function () {
    ContextMenu = ig.Entity.extend ({
        x : 0, 
        y : 0, 

        sheet: new ig.Image('media/contextMenu.png'), 
        texture: null, 

        options : [], 
        connectingEntity : null, 

        init : function(options)
        {
            this.texture = glLoadTexture(this.sheet.data);
            this.options = options;
        }, 

        update : function()
        {
            this.parent();
        }, 

        draw: function()
        {
            //glDraw(this.image.width, this.image.height, this.x, this.y, 1, this.texture);
            var cw = this.sheet.width;
            var ch = this.sheet.height / 4;
            var halfW = cw / 2;
            var halfH = ch / 2;
            for (var i = 0; i < this.options.length; i++)
            {
                var row = this.getRow(this.options[i]);
                if (row < 0) continue;
                var offset = (i + 0) * ch;
                glDrawCell(
                    cw, ch, 0, row, 
                    this.x + halfW, (this.y + halfH) + offset, 
                    this.sheet.width, this.sheet.height, 
                    GameCore.currentRoom.diffuse.width, GameCore.currentRoom.diffuse.height, GameCore.currentRoom.x, GameCore.currentRoom.y, 
                    1, 
                    this.texture);
            }
        }, 

        setPosition : function(x, y)
        {
            this.x = x;
            this.y = y;
        }, 
        isMouseOver : function(option)
        {
            var row = this.options.indexOf(option);
            if (row < 0) return false;
            
            var cw = this.sheet.width;
            var ch = this.sheet.height / 4;
            var halfW = cw / 2;
            var halfH = ch / 2;
            var offset = (row + 0) * ch;
            var x0 = this.x;
            var y0 = (this.y) + offset;
            var x1 = x0 + cw;
            var y1 = y0 + ch;
            if (ig.input.mouse.x > x0 && ig.input.mouse.x < x1 && ig.input.mouse.y > y0 && ig.input.mouse.y < y1)
            {
                return true;
            }
            return false;
        }, 

        getRow : function(option)
        {
            switch (option)
            {
                case 'inspect':
                return 0;
                case 'loot':
                return 1;
                case 'attack':
                return 2;
                case 'move':
                return 3;

                default:
                return -1;
            }
        }, 
    });
});