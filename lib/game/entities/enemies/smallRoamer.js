ig.module(
	'game.entities.enemies.smallRoamer'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	SmallRoamer = BaseEnemy.extend({

		threatLevel : "Low", 

		init : function()
		{
			this.parent();
			this.name = ScriptCore.SmallRoamerName;
			this.description = ScriptCore.SmallRoamerDescription;
			this.setAnimSheet(AssetCore.requestAnim('Zombie Idle'));
			this.status.hitChance = 0.45;
			this.status.damage = 1;
			this.status.lootDropped = 0;
		},
	});
});