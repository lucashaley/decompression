ig.module( 
	'game.rooms.tyche' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.rooms.baseRoom'
)
.defines(function(){
    Tyche = BaseRoom.extend({
        diffuse: new ig.Image('media/rooms/Tyche/rm_TycheCPC_Shadowed_01_D.png'),
        normal: new ig.Image('media/rooms/Tyche/rm_TycheCPC_01_N.png'),
        relief: new ig.Image('media/rooms/Tyche/rm_TycheCPC_01_R.png'),
        emissive: null,

        name : "Tyche", 

        init: function(){
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(230, 480, 'topLeft');
            this.addDoor(800, 480, 'topRight');
            this.addDoor(248, 830, 'bottomLeft');
            this.addDoor(816, 808, 'bottomRight');
            this.addPlayerSpawn(400, 532);
            this.addPlayerSpawn(384, 748);
            this.addPlayerSpawn(648, 748);
            this.addPlayerSpawn(600, 532);
            this.addEnemySpawn(124, 668);
            this.addEnemySpawn(500, 868);
            this.addEnemySpawn(900, 668);
        },
    });
});