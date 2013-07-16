ig.module(
    'game.screens.optionsScreen'
)
.requires(
    'impact.game',
    'impact.font'
)
.defines(function () {
    //Options menu
    OptionsScreen = ig.Game.extend({
        label: new ig.Image('media/Options.png'),
        textures: new Array(), 

        font: new ig.Font('media/04b03.font.png'),
        backButton: new menuButton(),


        init: function () {
            // Initialize your game here; bind keys etc.
            ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
            this.backButton.init(ig.system.width * .5, ig.system.height * .9, 'BACK', new Color(0.2, 0.2, 0.2));

            this.textures.push(glLoadTexture(this.label.data));
        },

        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            //handle buttons
            if(this.backButton.isOnButton() &&ig.input.pressed ('leftMouse')){
               ig.system.setGame(StartScreen); 
            }               

        },

        draw: function () {
            var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;

            //this.font.draw('Options', cntrX, cntrY, ig.Font.ALIGN.CENTER);
            this.backButton.draw();

            glDraw(this.label.width, this.label.height, cntrX, cntrY, 1.0, this.textures[0]);
        }
    });
});