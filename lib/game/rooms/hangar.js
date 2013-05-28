ig.module( 
	'game.hangar' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.rooms.room'
)

.defines(function(){
	Hangar = NewRoom.extend({
		diffuse: new ig.Image('media/rm_hangar_01_D.png'),
        normal: new ig.Image('media/rm_hangar_01_N.png'),
        relief: new ig.Image('media/rm_hangar_01_R.png'),
        emissive: new ig.Image('media/rm_hangar_01_E.png'),

        init: function(){
            this.roomX = canvas.width/2;
            this.roomY = canvas.height/2;

        	this.textures = [];

            this.textures.push(glLoadTexture(this.diffuse.data));
            this.textures.push(glLoadTexture(this.normal.data));
            this.textures.push(glLoadTexture(this.relief.data));
            this.textures.push(glLoadTexture(this.emissive.data));

            this.lights = [];
            this.lights.push(new Light(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0));
            this.lights.push(new Light(408, 555, 0.6, 4.0, 24.0, 1.0, 0.8, 0.75));
            this.lights.push(new Light(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0));

            this.tiles = [];
            this.initiateTiles(this.tileGridWidth, this.tileGridHeight, this.tileHeightOffset);
            this.setTile(97, 'lib/game/media/door.png');

            //create the possible room doors tiles (currently positions set according to grid of 10x10)
            this.doors = [];
            this.setDoors(50, 4, 59, 95);
            this.activateDoors(true, false, false, true);
        },

        update: function() {
			this.parent();
		},

		draw: function() {

			var scrWid = canvas.width;
            var scrHgt = canvas.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;

            //this.font.draw('You are playing the game', cntrX, cntrY, ig.Font.ALIGN.CENTER);

            glDraw(this.diffuse.width, this.diffuse.height, this.roomX, this.roomY, [1, 1, 1], 
                this.textures[0], this.textures[1], this.textures[2], this.textures[3], 
                this.lights[0], this.lights[1], null);

            for(var n = 0; n < this.tileGridWidth * this.tileGridHeight; n++) {
                this.tiles[n].draw();
            }
		},
	});
});