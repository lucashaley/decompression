ig.module( 
	'game.rooms.hangar' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.rooms.baseRoom'
)
.defines(function(){
    Hangar = BaseRoom.extend({
        diffuse: new ig.Image('media/rooms/Hangar/rm_hangar_01_D.png'),
        normal: new ig.Image('media/rooms/Hangar/rm_hangar_01_N.png'),
        relief: new ig.Image('media/rooms/Hangar/rm_hangar_01_R.png'),
        emissive: new ig.Image('media/rooms/Hangar/rm_hangar_01_E.png'),

        init: function(){
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
        },
    });
});