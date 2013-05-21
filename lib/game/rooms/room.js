ig.module( 
	'game.rooms.room' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.init',
    'game.entities.door'
)
.defines(function(){
    Tile = ig.Class.extend ({
        x: 0,
        y: 0,
        img: null,
        texture: null,
        init : function(x, y) {
            this.x = x;
            this.y = y;
        },
        setImage : function(imgName) {
            this.img = new ig.Image(imgName);
            this.texture = glLoadTexture(this.img.data);
        },
        draw: function() {
            if(this.img != null) glDraw(this.img.width, this.img.height, this.x, this.y, null, this.texture);
        },
        move: function(dirX, dirY) {
            this.x += dirX;
            this.y += dirY;
        }
    });
	NewRoom = ig.Class.extend({
		roomX : canvas.width/2,
        roomY : canvas.height/2,
        tileGridWidth: 10,
        tileGridHeight: 10,
        tileHeightOffset : 280,
        fadeRate : .1,
        diffuse: new ig.Image('lib/game/media/rm_recreation_01_D.png'),
        normal: new ig.Image('lib/game/media/rm_recreation_01_N.png'),
        relief: new ig.Image('lib/game/media/rm_recreation_01_R.png'),
        emissive: new ig.Image('lib/game/media/rm_recreation_01_E.png'),
        tileSize: new ig.Image('lib/game/media/tile.png'),

        textures: new Array(), 
        lights: new Array(), 
        tiles: new Array(),

        doors: new Array(),

        init: function() {
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
            this.setTiles();

            //create the possible room doors tiles (currently positions set according to grid of 10x10)
            this.doors = [];
            this.setDoors(50, 4, 59, 95);
            this.activateDoors(true, false, false, true);
		},
	
		update: function() {
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

        //moves the room during room transitions
        move: function(inORout, dirX, dirY) {   
            if(inORout == "in") this.fadeRate = (this.fadeRate > 0) ? -this.fadeRate : this.fadeRate;
            if(inORout == "out") this.fadeRate = (this.fadeRate < 0) ? -this.fadeRate : this.fadeRate;

            this.roomX += dirX;
            this.roomY += dirY;
            this.lights[0].position[0] += dirX;
            this.lights[0].position[1] -= dirY;
            this.lights[0].falloff[0] += this.fadeRate;
            this.lights[0].falloff[1] += this.fadeRate;
            this.lights[0].falloff[2] += this.fadeRate;
            this.lights[1].position[0] += dirX;
            this.lights[1].position[1] -= dirY;
            this.lights[1].falloff[0] += this.fadeRate;
            this.lights[1].falloff[1] += this.fadeRate;
            this.lights[1].falloff[2] += this.fadeRate;

            for(var n = 0; n < this.tileGridWidth * this.tileGridHeight; n++) {
               //this.tiles[n].move(dirX, dirY);
            }
        },

        //set the initial location of a room before it enters the screen
        setEnterPosition: function(startCorner){
            var xPos = 1;
            var yPos = 1;
            if(startCorner == "lowRight") {
                xPos = 1;
                yPos = 1;
            }
            else if(startCorner == "lowLeft") {
                xPos = -1;
                yPos = 1;
            }
            else if(startCorner == "highRight") {
                xPos = 1;
                yPos = -1;
            }
            else if(startCorner == "highLeft") {
                xPos = -1;
                yPos = -1;
            }
            this.roomX += canvas.width/2 * xPos;
            this.roomY += canvas.height/2 * yPos;
            this.lights[0].position[0] += canvas.width/2 * xPos;
            this.lights[0].position[1] += canvas.height/2 * -yPos;
            this.lights[1].position[0] += canvas.width/2 * xPos;
            this.lights[1].position[1] += canvas.height/2 * -yPos;            
        },

        //set possible door locations for the room
        setDoors: function(door1Tile, door2Tile, door3Tile, door4Tile) {
            this.doors.push(new EntityDoor(this.tiles[door1Tile].x, this.tiles[door1Tile].y));
            this.doors.push(new EntityDoor(this.tiles[door2Tile].x, this.tiles[door2Tile].y));
            this.doors.push(new EntityDoor(this.tiles[door3Tile].x, this.tiles[door3Tile].y));
            this.doors.push(new EntityDoor(this.tiles[door4Tile].x, this.tiles[door4Tile].y));            
        },

        //activate usable doors
        activateDoors: function(door1, door2, door3, door4) {
            //mark which door is usable : door 0 is top left and goes clockwise around
            this.doors[0].available = door1;
            this.doors[1].available = door2;
            this.doors[2].available = door3;
            this.doors[3].available = door4;
        },

        initiateTiles: function(gridWidth, gridHeight, heightOffset) {
            for(var col = 0; col < gridWidth; col++){
                for(var row = 0; row < gridHeight; row++){
                    var tilePositionX = (row - col) * this.tileSize.height + (canvas.width/2);

                    var tilePositionY = ((row + col) * (this.tileSize.height / 2)) + heightOffset;

                    var tile = new Tile();
                    tile.init(tilePositionX, tilePositionY);

                    this.tiles.push(tile);
                }
            }            
        },

        //set individual tiles with objects
        setTiles: function() {
            //example : this.tiles[0].setImage('image.png');
            this.tiles[47].setImage('lib/game/media/door.png');
        },
	});	
});