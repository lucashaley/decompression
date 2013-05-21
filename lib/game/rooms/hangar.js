ig.module( 
	'game.hangar' 
)
.requires(
	'impact.game',
	'impact.font',
)

.defines(function(){
	Hangar = ig.Class.extend({
		roomX = 0,
		roomY = 0,

		diffuse: new ig.Image('media/rm_hangar_01_D.png'),
        normal: new ig.Image('media/rm_hangar_01_N.png'),
        relief: new ig.Image('media/rm_hangar_01_R.png'),
        emissive: new ig.Image('media/rm_hangar_01_E.png'),
        room: new ig.Image('media/tile.png'),

        textures: new Array(),
        lights: new Array(),
        tiles: new Array(),

        init: function(){
        	this.textures.push(glEmptyTexture());
        	this.textures.push(glEmptyTexture());
            this.textures.push(glEmptyTexture());
            this.textures.push(glEmptyTexture());

            glLoadTexture(this.diffuse.data, this.textures[0]);
            glLoadTexture(this.normal.data, this.textures[1]);
            glLoadTexture(this.relief.data, this.textures[2]);
            glLoadTexture(this.emissive.data, this.textures[3]);

            this.lights.push(new Light(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0));
            this.lights.push(new Light(408, 555, 0.6, 4.0, 24.0, 1.0, 0.8, 0.75));
            this.lights.push(new Light(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0));

            for(var col = 0; col < 7; col++){
				for(var row = 0; row < 7; row++){
					var tilePositionX = (row - col) * this.room.height;

					tilePositionX += (ig.system.width / 2) - (this.room.width / 2);

					var tilePositionY = (row + col) * (this.room.height / 2);

					var MyTile = ig.Class.extend({
						x: tilePositionX,
						y: tilePositionY,
						img: null
					})
					this.tileMap.push(MyTile);
				}
			}
        },

        update: function() {
			// Update all entities and backgroundMaps
			this.parent();
			
			// Add your own, additional update code here
		},

		draw: function() {
			// Draw all entities and backgroundMaps
			this.parent();
			// Add your own drawing code here
			var scrWid = ig.system.width;
            var scrHgt = ig.system.height;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;

            //this.font.draw('You are playing the game', cntrX, cntrY, ig.Font.ALIGN.CENTER);

            glDraw(this.diffuse.width, this.diffuse.height, cntrX, cntrY, [1, 1, 1], 
                this.textures[0], this.textures[1], this.textures[2], this.textures[3], 
                this.lights[0], this.lights[1], null);
		},
	});
});