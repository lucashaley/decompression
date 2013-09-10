ig.module(
	'game.rooms.oddShape'
)
.requires(
	'impact.game',
    'game.rooms.baseRoom'
)
.defines(function () {
    oddShape = BaseRoom.extend({
        name: "oddShape",

        init: function () {
            this.textures.diffuse = AssetCore.textures.oddShape_D;
            this.textures.normal = AssetCore.textures.oddShape_N;
            this.textures.relief = AssetCore.textures.oddShape_R;
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(800, 450, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(260, 780, 'bottomLeft');
            this.addPlayerSpawn(548, 512);
            this.addPlayerSpawn(384, 602);
            this.addPlayerSpawn(530, 752);
            this.addPlayerSpawn(688, 588);
            this.addEnemySpawn(845, 662);
            this.addEnemySpawn(192, 630);
            /*
            this.setHighChanceItemClasseNames(['Health', 'Implant']);
            this.setLowChanceItemClasseNames(['Attack']);
            this.setHighChanceEnemyClasseNames(['Medical']);
            this.setLowChanceEnemyClasseNames(['Maintenance']);
            this.setLootAmount(5);
            */
        },
    });
});