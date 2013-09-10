ig.module(
	'game.rooms.corridorElbow'
)
.requires(
	'impact.game',
    'game.rooms.baseRoom'
)
.defines(function () {
    CorridorElbow = BaseRoom.extend({
        name: "CorridorElbow",

        init: function () {
            this.textures.diffuse = AssetCore.textures.corridorElbow_D;
            this.textures.normal = AssetCore.textures.corridorElbow_N;
            this.textures.relief = AssetCore.textures.corridorElbow_R;
            this.parent();
            this.addLight(330, 780, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(705, 705, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(330, 780, 'bottomLeft');
            this.addDoor(705, 705, 'bottomRight');
            this.addPlayerSpawn(325, 705);
            this.addPlayerSpawn(428, 631);
            this.addPlayerSpawn(556, 631);
            this.addPlayerSpawn(692, 631);
            this.addEnemySpawn(451, 703);
            this.addEnemySpawn(651, 703);
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