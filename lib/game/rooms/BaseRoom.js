ig.module( 
	'game.rooms.BaseRoom' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.init',
    'game.entities.door'
)
.defines(function(){
	NewRoom = ig.Class.extend({
		x : canvas.width/2,
        y : canvas.height/2,

        diffuse : new ig.Image('media/rooms/BaseRoom/Infirmary_BaseRoom_d.png'),
        normal : new ig.Image('media/rooms/BaseRoom/Infirmary_BaseRoom_n.png'),
        relief : new ig.Image('media/rooms/BaseRoom/Infirmary_BaseRoom_r.png'),
        emissive : null,

        textures : new Array(), 
        lights : new Array(), 
        doors : new Array(),
        players : new Array(), 

        intensity : 1,
        fadeRate : .02,

        init: function()
        {
            //set initial room position (default center screen)
            this.x = canvas.width/2;
            this.y = canvas.height/2;

            //load the room's textures
        	this.textures = [];
            this.textures.push(glLoadTexture(this.diffuse.data));
            this.textures.push(glLoadTexture(this.normal.data));
            this.textures.push(glLoadTexture(this.relief.data));
            this.textures.push(glLoadTexture(this.emissive.data));

            //create and set lights in the room
            this.lights = [];
            /*this.lights.push(new Light(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, this.lightIntensity));
            this.lights.push(new Light(408, 555, 0.6, 4.0, 24.0, 1.0, 0.8, this.lightIntensity*0.75));
            this.lights.push(new Light(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, this.lightIntensity));*/

            this.doors = [];

            this.players = [];
		},
	
		update: function()
        {
		},
		
		draw: function()
        {
            var light1, light2, light3 = null;
            if (this.lights.length > 0) light1 = this.lights[0];
            if (this.lights.length > 1) light2 = this.lights[1];
            if (this.lights.length > 2) light3 = this.lights[2];
            glDraw(this.diffuse.width, this.diffuse.height, this.x, this.y, this.lightIntensity, 
                this.textures[0], this.textures[1], this.textures[2], this.textures[3], 
                light1, light2, light3);
		},

        addLight : function(x, y, falloutQuad, falloutLinear, falloutConstant, colorR, colorG, colorB)
        {
            this.lights.push(new Light(x, y, falloutQuad, falloutLinear, falloutConstant, colorR, colorG, colorB));
        }, 

	});	
});