ig.module(
	'game.entities.enemies.crewAutotron'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	CrewAutotron = BaseEnemy.extend({

		name : "Crew Autotron", 
		description : "This is a Crew Autotron", 
		playerEnterText : "", 
		playerExitText : "", 
		playerAttackText : "", 
		enemyAttackText : "", 
		threatLevel : "Medium", 

		init : function()
		{
			this.animSheet = AssetCore.animations.zombie_Idle;
			this.status.hitChance = 0.3;
			this.status.damage = 2;
			this.status.lootDropped = 0;
			this.parent();
		},
	});
});