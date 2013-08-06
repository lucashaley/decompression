ig.module( 
	'game.rooms.hangar' 
)
.requires(
	'impact.game',
    'game.rooms.baseRoom'
)
.defines(function(){
    Hangar = BaseRoom.extend({
        init: function(){
            this.textures.diffuse = AssetCore.textures.hangar_D;
            this.textures.normal = AssetCore.textures.hangar_N;
            this.textures.relief = AssetCore.textures.hangar_R;
            this.textures.emissive = AssetCore.textures.hangar_E;
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(230, 480, 'topLeft');
            this.addDoor(260, 780, 'bottomLeft');
            this.addPlayerSpawn(495, 415);
            this.addPlayerSpawn(80, 660);
            this.addPlayerSpawn(940, 675);
            this.addPlayerSpawn(365, 465);
 //           this.addEnemySpawn(845, 662);
            this.addEnemySpawn(650, 470);
            this.addEnemySpawn(192, 630);
        },
    });
});