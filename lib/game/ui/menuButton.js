ig.module(
    'game.ui.menuButton'
)
.requires(
    'impact.game',
    'impact.font'
)
.defines(function () {
    //base button class
    menuButton = ig.Class.extend({
        font: new ig.Font( 'media/04b03.font.png' ),
        image: new ig.Image('media/button.png'),
        x : 100,
        y : 400,
        buttonText : '',
        buttonColor : new Color(0.0, 0.0, 0.0),
        buttonHoverColor : new Color(0.2, 0.2, 0.2),
        buttonActiveColor : new Color(0.4, 0.4, 0.4),
        hovering : false,
        active : false,
        texture : null, 

        init: function (x, y, texty, color) {
            this.x = x;
            this.y = y;
            if(texty != null) this.buttonText = texty;
            if(color != null) this.buttonColor = color;
            this.texture = glLoadTexture(this.image.data);
        },

        //handles button clicking
        isMouseOver: function() {
            var halfW = this.image.width / 2;
            var halfH = this.image.height / 2;
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
            var usingColor = null;
            if(this.hovering) usingColor = this.buttonHoverColor;
            else if(this.active) usingColor = this.buttonActiveColor;
            else usingColor = this.buttonColor;
            this.font.draw( this.buttonText, this.x, this.y, ig.Font.ALIGN.LEFT );
            glDraw(this.image.width, this.image.height, this.x, this.y, 1.0, this.texture);
        }
    });

    textField = menuButton.extend({
        isEditing : false,
        fieldColor : new Color(0.0, 0.0, 0.0),
        fieldText : '',
        maxCharacterLength : 10,

        init: function(x, y, color) {
            if(color != null) this.fieldColor = color;
        },

        update: function(texty2) {
            if(texty2 != null) this.fieldText = texty2;
        },

        draw: function() {
            this.parent();
            //this.font.draw( this.buttonText + ' ' + this.fieldText, this.x, this.y, ig.Font.ALIGN.LEFT );
        }
    });
});