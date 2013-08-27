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
			this.name = ScriptCore.RampantWalkerName;
			this.description = ScriptCore.RampantWalkerDescription;
			this.setAnimSheet(AssetCore.requestAnim('Zombie Idle'));
			this.status.hitChance = 0.15;
			this.status.damage = 1;
			this.status.lootDropped = 1;
		},
	});
});