ig.module(
	'game.rooms.corridorStraight'
)
.requires(
	'impact.game',
    'game.rooms.baseRoom'
)
.defines(function () {
    CorridorStraight = BaseRoom.extend({
        name: "CorridorStraight",

        init: function () {
            this.textures.diffuse = AssetCore.textures.corridorStraight_D;
 //           this.textures.normal = AssetCore.textures.corridorStraight_N;
 //           this.textures.relief = AssetCore.textures.corridorStraight_R;
            this.parent();
            this.addLight(689, 378, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(250, 420, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(369, 705, 'bottomLeft');
            this.addDoor(656, 483, 'topRight');
            this.addPlayerSpawn(493, 712);
            this.addPlayerSpawn(384, 602);
            this.addPlayerSpawn(540, 602);
            this.addPlayerSpawn(688, 588);
            this.addEnemySpawn(611, 670);
            this.addEnemySpawn(390, 676);
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