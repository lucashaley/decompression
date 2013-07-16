ig.module( 
	'game.rooms.engineeringCore' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.rooms.baseRoom'
)
.defines(function(){
    EngineeringCore = BaseRoom.extend({
        diffuse: new ig.Image('media/rooms/EngineeringCore/rm_engineeringCore_01_D.png'),
        normal: new ig.Image('media/rooms/EngineeringCore/rm_engineeringCore_01_N.png'),
        relief: new ig.Image('media/rooms/EngineeringCore/rm_engineeringCore_01_R.png'),
        emissive: null,

        init: function(){
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
        },
    });
});