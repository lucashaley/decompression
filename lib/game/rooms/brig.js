ig.module( 
	'game.rooms.brig' 
)
.requires(
	'impact.game',
    'game.rooms.baseRoom'
)
.defines(function(){
    Brig = BaseRoom.extend({
        name : "Brig", 

        init: function(){
            this.textures.diffuse = AssetCore.textures.brig_D;
            this.textures.normal = AssetCore.textures.brig_N;
            this.textures.relief = AssetCore.textures.brig_R;
            this.textures.emissive = AssetCore.textures.brig_E;
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(900, 420, 'topRight');
            this.addDoor(248, 830, 'bottomLeft');
            this.addPlayerSpawn(375, 770);
            this.addPlayerSpawn(505, 720);
            this.addPlayerSpawn(545, 570);
            this.addPlayerSpawn(675, 520);
            this.addEnemySpawn(800, 480);
            this.addEnemySpawn(700, 720);
            this.setHighChanceItemClasseNames(['Damage']);
            this.setLowChanceItemClasseNames(['Implant']);
            this.setHighChanceEnemyClasseNames(['Security']);
            this.setLootAmount(3);
        },
    });
});