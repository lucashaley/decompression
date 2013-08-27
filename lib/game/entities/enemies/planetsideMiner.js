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
			this.name = ScriptCore.PlanetsideMinerName;
			this.description = ScriptCore.PlanetsideMinerDescription;
			this.setAnimSheet(AssetCore.requestAnim('Zombie Idle'));
			this.status.hitChance = 0.15;
			this.status.damage = 3;
			this.status.lootDropped = 1;
		},
	});
});