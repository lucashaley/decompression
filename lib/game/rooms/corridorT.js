ig.module(
	'game.rooms.corridorT'
)
.requires(
	'impact.game',
    'game.rooms.baseRoom'
)
.defines(function () {
    CorridorT = BaseRoom.extend({
        name: "CorridorT",

        init: function () {
            this.textures.diffuse = AssetCore.textures.corridorT_D;
            this.textures.normal = AssetCore.textures.corridorT_N;
            this.textures.relief = AssetCore.textures.corridorT_R;
            this.parent();
            this.addLight(608, 338, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(465, 395, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(320, 729, 'bottomLeft');
            this.addDoor(655, 702, 'bottomRight');
            this.addDoor(359, 487, 'topLeft');
            this.addDoor(709, 452, 'topRight');
            this.addPlayerSpawn(375, 700);
            this.addPlayerSpawn(439, 636);
            this.addPlayerSpawn(495, 572);
            this.addPlayerSpawn(600, 500);
            this.addEnemySpawn(580, 680);
            this.addEnemySpawn(630, 610);
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