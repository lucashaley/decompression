ig.module(
	'game.entities.enemies.rampantWalker'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	RampantWalker = BaseEnemy.extend({

		threatLevel : "High", 

		init : function()
		{
			this.parent();
			this.addAnimSheet('FL Idle', AssetCore.requestAnim('RampantWalker FL Idle'));
			this.addAnimSheet('FR Idle', AssetCore.requestAnim('RampantWalker FR Idle'));
			this.addAnimSheet('RL Idle', AssetCore.requestAnim('RampantWalker RL Idle'));
			this.addAnimSheet('RR Idle', AssetCore.requestAnim('RampantWalker RR Idle'));
			this.name = ScriptCore.RampantWalkerName;
			this.description = ScriptCore.RampantWalkerDescription;
			this.status.hitChance = 0.15;
			this.status.damage = 1;
			this.status.lootDropped = 1;
		},
	});
});