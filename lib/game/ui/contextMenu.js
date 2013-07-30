ig.module(
    'game.ui.contextMenu'
)
.requires(
    'impact.game',
    'impact.font'
)
.defines(function () {
    ContextMenu = ig.Class.extend ({
        x : 0, 
        y : 0, 

        sheet: new ig.Image('media/contextMenu.png'), 
        cellWidth : 128, 
        cellHeight : 32, 
        texture: null, 

        options : [], 
        connectingEntity : null, 

        init : function(options)
        {
            this.texture = glLoadTexture(this.sheet.data);
            this.setOptions(options);
        }, 

        update : function()
        {
            this.parent();
        }, 

        draw: function()
        {
            var halfW = this.cellWidth / 2;
            var halfH = this.cellHeight / 2;
            for (var i = 0; i < this.options.length; i++)
            {
                var cell = this.getCell(this.options[i]);
                if (cell == null) continue;
                var offset = (i + 0) * this.cellHeight;
                glDrawCell(
                    this.cellWidth, this.cellHeight, cell.column, cell.row, 
                    this.x + halfW, (this.y + halfH) + offset, 
                    this.sheet.width, this.sheet.height, 
                    1, 
                    this.texture);
            }
        }, 

        setPosition : function(x, y)
        {
            this.x = x;
            this.y = y;
        }, 
        setOptions : function(options)
        {
            this.options = options;
        }, 
        isMouseOver : function(option)
        {
            var index = this.options.indexOf(option);
            if (index < 0) return false;
            
            var x0 = this.x;
            var y0 = this.y + (index * this.cellHeight);
            var x1 = x0 + this.cellWidth;
            var y1 = y0 + this.cellHeight;
            if (ig.input.mouse.x > x0 && ig.input.mouse.x < x1 && ig.input.mouse.y > y0 && ig.input.mouse.y < y1)
            {
                return true;
            }
            return false;
        }, 

        getCell : function(option)
        {
            switch (option)
            {
                case 'inspect':
                return {column : 0, row : 0};
                case 'loot':
                return {column : 0, row : 1};
                case 'attack':
                return {column : 0, row : 2};
                case 'move':
                return {column : 0, row : 3};
                case 'unlock':
                return {column : 1, row : 0};

                default:
                return null;
            }
        }, 
    });
});