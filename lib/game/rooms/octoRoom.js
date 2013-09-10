ig.module(
	'game.rooms.octoRoom'
)
.requires(
	'impact.game',
    'game.rooms.baseRoom'
)
.defines(function () {
    OctoRoom = BaseRoom.extend({
        name: "OctoRoom",

        init: function () {
            this.textures.diffuse = AssetCore.textures.octoRoom_D;
            this.textures.normal = AssetCore.textures.octoRoom_N;
            this.textures.relief = AssetCore.textures.octoRoom_R;
            this.parent();
            this.addLight(520, 228, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(518, 600, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(330, 575, 'bottomLeft');
            this.addDoor(314, 383, 'topLeft');
            this.addDoor(700, 385, 'topRight');
            this.addPlayerSpawn(548, 512);
            this.addPlayerSpawn(384, 602);
            this.addPlayerSpawn(530, 600);
            this.addPlayerSpawn(688, 588);
            this.addEnemySpawn(440, 440);
            this.addEnemySpawn(612, 437);
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