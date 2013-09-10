ig.module(
	'game.entities.enemies.planetsideMiner'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	PlanetsideMiner = BaseEnemy.extend({

		threatLevel : "High", 

		init : function()
		{
			this.parent();
			this.addAnimSheet('FL Idle', AssetCore.requestAnim('Miner FL Idle'));
			this.addAnimSheet('FR Idle', AssetCore.requestAnim('Miner FR Idle'));
			this.addAnimSheet('RL Idle', AssetCore.requestAnim('Miner RL Idle'));
			this.addAnimSheet('RR Idle', AssetCore.requestAnim('Miner RR Idle'));
			this.name = ScriptCore.PlanetsideMinerName;
			this.description = ScriptCore.PlanetsideMinerDescription;
			this.status.hitChance = 0.15;
			this.status.damage = 3;
			this.status.lootDropped = 1;
		},
	});
});