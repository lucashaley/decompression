ig.module(
	'game.rooms.corridorPit'
)
.requires(
	'impact.game',
    'game.rooms.baseRoom'
)
.defines(function () {
    CorridorPit = BaseRoom.extend({
        name: "CorridorPit",

        init: function () {
            this.textures.diffuse = AssetCore.textures.corridorPit_D;
            this.textures.normal = AssetCore.textures.corridorPit_N;
            this.textures.relief = AssetCore.textures.corridorPit_R;
            this.parent();
            this.addLight(480, 253, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(680, 253, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(369, 360, 'topLeft');
            this.addDoor(655, 350, 'topRight');
            this.addPlayerSpawn(400, 430);
            this.addPlayerSpawn(600, 430);
            this.addPlayerSpawn(464, 478);
            this.addPlayerSpawn(564, 478);
            this.addEnemySpawn(515, 438);
            this.addEnemySpawn(517, 533);
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