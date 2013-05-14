ig.module( 
	'game.room' 
)
.requires(
	'impact.game',
	'impact.font'
)
.defines(function(){
	NewRoom = ig.Class.extend({
		roomX : window.innerWidth/2,
        roomY : window.innerHeight/2,
        diffuse: new ig.Image('lib/game/media/rm_recreation_01_D.png'),
        normal: new ig.Image('lib/game/media/rm_recreation_01_N.png'),
        relief: new ig.Image('lib/game/media/rm_recreation_01_R.png'),
        emissive: new ig.Image('lib/game/media/rm_recreation_01_E.png'),
        tileSize: new ig.Image('lib/game/media/tile.png'),

        textures: new Array(), 
        lights: new Array(), 
        tiles: new Array(),

        init: function() {
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

            for(var col = 0; col < 10; col++){
				for(var row = 0; row < 10; row++){
					var tilePositionX = (row - col) * this.tileSize.height;

					tilePositionX += (window.innerWidth / 2) - (this.tileSize.width / 2);

					var tilePositionY = (row + col) * (this.tileSize.height / 2);

					var tile = ig.Class.extend ({
						x: tilePositionX,
						y: tilePositionY,
						img: null
					});

					this.tiles.push(tile);
				}
			}
		},
	
		update: function() {
		},
		
		draw: function() {

			var scrWid = window.innerWidth;
            var scrHgt = window.innerHeight;
            var cntrX = scrWid/2;
            var cntrY = scrHgt/2;

            //this.font.draw('You are playing the game', cntrX, cntrY, ig.Font.ALIGN.CENTER);

            glDraw(this.diffuse.width, this.diffuse.height, this.roomX, this.roomY, [1, 1, 1], 
                this.textures[0], this.textures[1], this.textures[2], this.textures[3], 
                this.lights[0], this.lights[1], null);
		},
	});	
});