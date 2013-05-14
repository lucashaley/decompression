ig.module(
	'game.gameLoop'
)
.requires(
	'impact.game',
	'impact.font'
)
.defines(function () {
	gameLoop = ig.Class.extend({
	    // Load a font
	    font: new ig.Font('media/04b03.font.png'), 

	    roomCurrent: new ig.Image('lib/game/media/TycheCoreRoom01.jpg'),
	    roomCurrentX: 0,
	    roomCurrentY: 0,
	    roomNext: new ig.Image('lib/game/media/TycheCoreRoom01.jpg'),
	    roomNextX: 0,
	    roomNextY: 0,

	    textures: new Array(), 
	    lights: new Array(), 

		loopInit: function() {
	        this.roomCurrent.init( this.roomCurrentX, this.roomCurrentY, 1280, 1024);
	        // Initialize your game here; bind keys etc.
	        ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');

	        //glInit(document.getElementById("canvas"));

	        this.textures.push(glEmptyTexture());
	        this.textures.push(glEmptyTexture());
	        this.textures.push(glEmptyTexture());
	        this.textures.push(glEmptyTexture());

	        var images = $('#resources img');
	        glLoadTexture(images[3], this.textures[0]);
	        glLoadTexture(images[4], this.textures[1]);
	        glLoadTexture(images[5], this.textures[2]);
	        glLoadTexture(images[6], this.textures[3]);

	        this.lights.push(new Light(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0));
	        this.lights.push(new Light(408, 555, 0.6, 4.0, 24.0, 1.0, 0.8, 0.75));
	        this.lights.push(new Light(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0));
		},
		loopUpdate: function() {
	        if(ig.input.state('leftMouse')) {
	            if(ig.input.mouse.y < ig.system.height/2) {
	                if(ig.input.mouse.x < ig.system.width/2) {
	                    this.roomCurrentX -= 10;
	                    this.roomCurrentY -= 10;
	                }
	                if(ig.input.mouse.x > ig.system.width/2) {
	                    this.roomCurrentX += 10;
	                    this.roomCurrentY -= 10;
	                }
	            }
	            if(ig.input.mouse.y > ig.system.height/2) {
	                if(ig.input.mouse.x < ig.system.width/2) {
	                    this.roomCurrentX -= 10;
	                    this.roomCurrentY += 10;
	                }
	                if(ig.input.mouse.x > ig.system.width/2) {
	                    this.roomCurrentX += 10;
	                    this.roomCurrentY += 10;
	                }
	            }
	        }
	            //ig.system.setGame(StatsScreen);
		},
		loopDraw: function() {
	        var scrWid = ig.system.width;
	        var scrHgt = ig.system.height;
	        var cntrX = scrWid/2;
	        var cntrY = scrHgt/2;

	        this.font.draw('You are playing the game', cntrX, cntrY, ig.Font.ALIGN.CENTER);
	        if(this.roomCurrentX < 0 || this.roomCurrentY > scrWid) {
	            if(this.roomCurrentY < 0 || this.roomCurrentY > scrHeight) {
	                this.roomNext.draw(this.roomCurrentX,this.roomCurrentY);
	            }
	        }


            var ctx = ig.system.context;
            ctx.fillStyle = '#00f';            
            ctx.fillRect(20, 20, 200, 100);
	        this.roomCurrent.draw(this.roomCurrentX, this.roomCurrentY);

	        //glStartDraw();
	        //glDraw(1024, 1024, cntrX, cntrY, this.textures[0], this.textures[1], this.textures[2], this.textures[3], this.lights[0], this.lights[1], null);
	    }
	});
});