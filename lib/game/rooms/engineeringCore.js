ig.module( 
	'game.rooms.engineeringCore' 
)
.requires(
	'impact.game',
    'game.rooms.baseRoom'
)
.defines(function(){
    EngineeringCore = BaseRoom.extend({
        name : "Engineering Core", 

        init: function(){
            this.textures.diffuse = AssetCore.textures.engineeringCore_D;
            this.textures.normal = AssetCore.textures.engineeringCore_N;
            this.textures.relief = AssetCore.textures.engineeringCore_R;
            this.textures.emissive = AssetCore.textures.engineeringCore_E;
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(235, 380, 'topLeft');
            this.addDoor(248, 830, 'bottomLeft');
            this.addPlayerSpawn(400, 532);
            this.addPlayerSpawn(384, 748);
            this.addPlayerSpawn(190, 575);
            this.addPlayerSpawn(600, 532);
            this.addEnemySpawn(395, 460);
            this.addEnemySpawn(760, 500);
            this.setLowChanceItemClasseNames(['Health']);
            this.setHighChanceEnemyClasseNames(['Maintenance']);
            this.setLowChanceEnemyClasseNames(['Cilivian', 'Medical']);
            this.setLootAmount(6);
        },
    });
});