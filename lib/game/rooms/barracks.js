ig.module( 
	'game.rooms.barracks' 
)
.requires(
	'impact.game',
    'game.rooms.baseRoom'
)
.defines(function(){
    Barracks = BaseRoom.extend({
        name : "Barracks", 

        init: function(){
            this.textures.diffuse = AssetCore.textures.barracks_D;
            this.textures.normal = AssetCore.textures.barracks_N;
            this.textures.relief = AssetCore.textures.barracks_R;
            this.textures.emissive = AssetCore.textures.barracks_E;
            this.parent();
            this.addLight(535, 455, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(515, 700, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(382, 435, 'topLeft');
            this.addDoor(248, 830, 'bottomLeft');
            this.addPlayerSpawn(375, 584);
            this.addPlayerSpawn(503, 584);
            this.addPlayerSpawn(631, 584);
            this.addPlayerSpawn(582, 650);
            this.addEnemySpawn(400, 650);
            this.addEnemySpawn(528, 697);
            this.setHighChanceItemClasseNames(['Inventory']);
            this.setHighChanceEnemyClasseNames(['Civilian']);
            this.setLootAmount(3);
        },
    });
});