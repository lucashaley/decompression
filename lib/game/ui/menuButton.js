ig.module(
    'game.ui.menuButton'
)
.requires(
    'impact.game',
    'impact.font'
)
.defines(function () {
    //base button class
    MenuButton = ig.Class.extend({
        //image: new ig.Image('media/button.png'),
        texture : null, 
        x : 100,
        y : 400,
        buttonText : '',
        hovering : false,
        active : false,

        init: function (x, y, texty) {
            this.x = x;
            this.y = y;
            if(texty != null) this.buttonText = texty;
            this.texture = AssetCore.textures.button;//glLoadTexture(this.image.data);
        },

        //handles button clicking
        isMouseOver: function() {
            var halfW = this.texture.width / 2;
            var halfH = this.texture.height / 2;
            if (ig.input.mouse.x > this.x - halfW && ig.input.mouse.x < this.x+halfW && ig.input.mouse.y > this.y - halfH && ig.input.mouse.y < this.y+halfH) {
                this.hovering = true;
                return true;
            }
            else {
                this.hovering = false;
                return false;
            }
        },
        draw: function() {
            glDraw(this.texture.width, this.texture.height, this.x, this.y, 1.0, this.texture);
            MainFont.draw(this.buttonText, this.x, this.y, ig.Font.ALIGN.CENTER);
        }
    });

    TextField = MenuButton.extend({
        isEditing : false,
        fieldText : '',
        maxCharacterLength : 10,

        init: function(x, y) {
        },

        update: function(texty2) {
            if(texty2 != null) this.fieldText = texty2;
        },

        draw: function() {
            this.parent();
            MainFont.draw( this.buttonText + ' ' + this.fieldText, this.x, this.y, ig.Font.ALIGN.LEFT );
        }
    });
});