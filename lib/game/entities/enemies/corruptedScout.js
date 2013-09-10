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
			this.addAnimSheet('FL Idle', AssetCore.requestAnim('Corrupted Scout FL Idle'));
			this.addAnimSheet('FR Idle', AssetCore.requestAnim('Corrupted Scout FR Idle'));
			this.addAnimSheet('RL Idle', AssetCore.requestAnim('Corrupted Scout RL Idle'));
			this.addAnimSheet('RR Idle', AssetCore.requestAnim('Corrupted Scout RR Idle'));
			this.name = ScriptCore.CorruptedScoutName;
			this.description = ScriptCore.CorruptedScoutDescription;
			this.status.hitChance = 0.55;
			this.status.damage = 1;
			this.status.lootDropped = 1;
			this.runAwayOnPlayerMiss = true;
		},
	});
});