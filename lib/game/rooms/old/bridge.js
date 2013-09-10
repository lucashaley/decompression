ig.module( 
	'game.rooms.bridge' 
)
.requires(
	'impact.game',
    'game.rooms.baseRoom'
)
.defines(function(){
    Bridge = BaseRoom.extend({
        name : "Bridge", 

        init: function(){
            this.textures.diffuse = AssetCore.textures.bridge_D;
            this.textures.normal = AssetCore.textures.bridge_N;
            this.textures.relief = AssetCore.textures.bridge_R;
            this.textures.emissive = AssetCore.textures.bridge_E;
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(400, 265, 'topLeft');
            this.addDoor(248, 830, 'bottomLeft');
            this.addPlayerSpawn(200, 532);
            this.addPlayerSpawn(384, 748);
            this.addPlayerSpawn(648, 748);
            this.addPlayerSpawn(570, 532);
            this.addEnemySpawn(800, 480);
            this.addEnemySpawn(700, 680);
            this.setHighChanceItemClasseNames(['Movement']);
            this.setLowChanceItemClasseNames(['Implant']);
            this.setLootAmount(4);
        },
    });
});