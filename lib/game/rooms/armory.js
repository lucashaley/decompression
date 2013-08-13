ig.module( 
	'game.rooms.armory' 
)
.requires(
	'impact.game',
    'game.rooms.baseRoom'
)
.defines(function(){
    Armory = BaseRoom.extend({
        name : "Armory", 

        init: function(){
            this.textures.diffuse = AssetCore.textures.armory_D;
            this.textures.normal = AssetCore.textures.armory_N;
            this.textures.relief = AssetCore.textures.armory_R;
            this.textures.emissive = AssetCore.textures.armory_E;
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(750, 413, 'topRight');
            this.addDoor(248, 830, 'bottomLeft');
            this.addPlayerSpawn(375, 770);
            this.addPlayerSpawn(505, 720);
            this.addPlayerSpawn(545, 570);
            this.addPlayerSpawn(675, 520);
            this.addEnemySpawn(860, 660);
            this.addEnemySpawn(650, 780);
            this.setHighChanceItemClasseNames(['Damage']);
            this.setLowChanceItemClasseNames(['Implant']);
            this.setHighChanceEnemyClasseNames(['Security']);
            this.setLootAmount(15);
        },
    });
});