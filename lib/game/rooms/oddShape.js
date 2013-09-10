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
            this.addLight(320, 335, 0.5, 2.4, 12.0, 0.8, 0.9, 1.0);
            this.addLight(755, 400, 0.6, 3.2, 18.0, 1.0, 1.0, 1.0);
            this.addDoor(176, 471, 'topLeft');
            this.addDoor(851, 470, 'topRight');
            this.addDoor(805, 825, 'bottomRight');
            this.addPlayerSpawn(300, 640);
            this.addPlayerSpawn(428, 640);
            this.addPlayerSpawn(556, 640);
            this.addPlayerSpawn(682, 640);
            this.addEnemySpawn(790, 600);
            this.addEnemySpawn(790, 728);
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