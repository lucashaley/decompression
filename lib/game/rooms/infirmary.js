ig.module( 
	'game.rooms.infirmary' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.rooms.baseRoom'
)
.defines(function(){
    Infirmary = BaseRoom.extend({
        diffuse: new ig.Image('media/rooms/Infirmary/rm_infirmary_01_D.png'),
        normal: new ig.Image('media/rooms/Infirmary/rm_infirmary_01_N.png'),
        relief: new ig.Image('media/rooms/Infirmary/rm_infirmary_01_R.png'),
        emissive: null,

        init: function(){
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(260, 780, 'bottomLeft');
            this.addPlayerSpawn(548, 512);
            this.addPlayerSpawn(384, 602);
            this.addPlayerSpawn(732, 600);
            this.addPlayerSpawn(548, 700);
            this.addEnemySpawn(845, 662);
            this.addEnemySpawn(530, 812);
            this.addEnemySpawn(192, 630);
        },
    });
});