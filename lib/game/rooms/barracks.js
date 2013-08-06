ig.module( 
	'game.rooms.barracks' 
)
.requires(
	'impact.game',
    'game.rooms.baseRoom'
)
.defines(function(){
    Barracks = BaseRoom.extend({
        init: function(){
            this.textures.diffuse = AssetCore.textures.barracks_D;
            this.textures.normal = AssetCore.textures.barracks_N;
            this.textures.relief = AssetCore.textures.barracks_R;
            this.textures.emissive = AssetCore.textures.barracks_E;
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(400, 265, 'topLeft');
            this.addDoor(248, 830, 'bottomLeft');
            this.addPlayerSpawn(375, 770);
            this.addPlayerSpawn(475, 720);
            this.addPlayerSpawn(575, 570);
            this.addPlayerSpawn(675, 520);
            this.addEnemySpawn(800, 480);
            this.addEnemySpawn(700, 680);
        },
    });
});