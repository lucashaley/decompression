ig.module(
	'game.entities.enemies.corruptedScout'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	CorruptedScout = BaseEnemy.extend({

		threatLevel : "Low", 

		init : function()
		{
			this.parent();
			this.name = ScriptCore.CorruptedScoutName;
			this.description = ScriptCore.CorruptedScoutDescription;
			this.setAnimSheet(AssetCore.requestAnim('Zombie Idle'));
			this.status.hitChance = 0.55;
			this.status.damage = 1;
			this.status.lootDropped = 1;
			this.runAwayOnPlayerMiss = true;
		},
	});
});