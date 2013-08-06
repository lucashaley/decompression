ig.module( 
	'game.rooms.recRoom' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.rooms.baseRoom'
)
.defines(function(){
    RecRoom = BaseRoom.extend({
        diffuse: new ig.Image('media/rooms/Recreation/rm_recreation_01_D.png'),
        normal: new ig.Image('media/rooms/Recreation/rm_recreation_01_N.png'),
        relief: new ig.Image('media/rooms/Recreation/rm_recreation_01_R.png'),
        emissive: new ig.Image('media/rooms/Recreation/rm_recreation_01_E.png'),

        name : "Rec Room", 

        init: function(){
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
        },
    });
});