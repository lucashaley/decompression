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
        name : "Tyche", 

        init: function(){
            this.textures.diffuse = AssetCore.textures.tyche_D;
            this.textures.normal = AssetCore.textures.tyche_N;
            this.textures.relief = AssetCore.textures.tyche_R;
            this.textures.emissive = AssetCore.textures.tyche_E;
            this.parent();
            this.addLight(48, 800, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(400, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(230, 460, 'topLeft');
            this.addDoor(800, 460, 'topRight');
            this.addDoor(248, 830, 'bottomLeft');
            this.addDoor(816, 808, 'bottomRight');
            this.addPlayerSpawn(400, 532);
            this.addPlayerSpawn(384, 748);
            this.addPlayerSpawn(648, 748);
            this.addPlayerSpawn(600, 532);
            this.addEnemySpawn(144, 656);
            this.addEnemySpawn(196, 772);
            this.addEnemySpawn(828, 772);
            this.addEnemySpawn(880, 656);
        },
    });
});