ig.module(
	'game.entities.enemies.planetsideMiner'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	PlanetsideMiner = BaseEnemy.extend({

		name : "Planetside Miner", 
		description : "This is a Planetside Miner", 
		playerEnterText : "", 
		playerExitText : "", 
		playerAttackText : "", 
		enemyAttackText : "", 
		threatLevel : "High", 

		init : function()
		{
			this.animSheet = AssetCore.animations.zombie_Idle;
			this.status.hitChance = 0.15;
			this.status.damage = 3;
			this.status.lootDropped = 1;
			this.parent();
		},
	});
});