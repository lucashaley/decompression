ig.module( 
	'game.rooms.engineeringReactor' 
)
.requires(
	'impact.game',
    'game.rooms.baseRoom'
)
.defines(function(){
    EngineeringReactor = BaseRoom.extend({
        init: function(){
            this.textures.diffuse = AssetCore.textures.engineeringReactor_D;
            this.textures.normal = AssetCore.textures.engineeringReactor_N;
            this.textures.relief = AssetCore.textures.engineeringReactor_R;
            this.textures.emissive = AssetCore.textures.engineeringReactor_E;
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(320, 493, 'topLeft');
            this.addDoor(365, 695, 'bottomLeft');
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