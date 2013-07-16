ig.module(
    'game.ui.popupMenu'
)
.requires(
    'impact.game',
    'impact.font'
)
.defines(function () {
    /*PopUpMenu = ig.Class.extend ({
        type: '', //move, attack, or loot
        img: null,
        x: 0,
        y: 0,
        w: 128,
        h: 128,
        texture: null,

        set: function(x, y, type) {
            this.type = type;
            this.img = null;
            if(type == 'move') {
                this.img = new ig.Image('media/PopUps/moveMenu.png');
            }
            else if(type == 'attack') {
                this.img = new ig.Image('media/PopUps/attackMenu.png');
            }
            else if(type == 'loot') {
                this.img = new ig.Image('media/PopUps/lootMenu.png');
            }
            else {
                this.img = new ig.Image('media/PopUps/noActionMenu.png');
            }
            this.texture = null;
            this.texture = glLoadTexture(this.img.data);
            this.x = x;
            this.y = y;
            this.w = this.img.width;
            this.h = this.img.height;
        },
        draw: function(x, y, lightIntense) {
            this.x = x;
            this.y = y;
            if(this.img != null) glDraw(this.img.width, this.img.height, x, y, lightIntense, this.texture)
        },
        isOnPopUp : function() {            
            var halfW = this.w / 2;
            var halfH = this.h / 2;
            if(ig.input.mouse.x > this.x - halfW && ig.input.mouse.x < this.x+halfW && ig.input.mouse.y > this.y - halfH && ig.input.mouse.y < this.y+halfH) {
                this.hovering = true;
                return true;
            }else{
                this.hovering = false;
                return false;
            }
        },
        isClickTop : function() {
            var halfW = this.w / 2;
            var halfH = this.h / 2;
            if(ig.input.mouse.x > this.x - halfW && ig.input.mouse.x < this.x+halfW && ig.input.mouse.y > this.y - halfH && ig.input.mouse.y < this.y) {
                this.hovering = true;
                return true;
            }else{
                this.hovering = false;
                return false;
            }
        },
        isClickBottom : function() {
            var halfW = this.w / 2;
            var halfH = this.h / 2;

            if(ig.input.mouse.x > this.x - halfW && ig.input.mouse.x < this.x+halfW && ig.input.mouse.y > this.y && ig.input.mouse.y < this.y+halfH) {
                this.hovering = true;
                return true;
            }else{
                this.hovering = false;
                return false;
            }
        },
    });*/
});