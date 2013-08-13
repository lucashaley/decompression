ig.module( 
	'game.rooms.recRoom' 
)
.requires(
	'impact.game',
    'game.rooms.baseRoom'
)
.defines(function(){
    RecRoom = BaseRoom.extend({
        name : "RecRoom", 

        init: function(){
            this.textures.diffuse = AssetCore.textures.recreation_D;
            this.textures.normal = AssetCore.textures.recreation_N;
            this.textures.relief = AssetCore.textures.recreation_R;
            this.textures.emissive = AssetCore.textures.recreation_E;
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(270, 460, 'topLeft');
            this.addDoor(280, 720, 'bottomLeft');
            this.addPlayerSpawn(548, 512);
            this.addPlayerSpawn(384, 452);
            this.addPlayerSpawn(400, 652);
            this.addPlayerSpawn(688, 588);
            this.addEnemySpawn(845, 662);
            this.addEnemySpawn(530, 812);
            this.addEnemySpawn(192, 630);
        },
    });
});