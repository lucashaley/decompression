ig.module(
	'game.entities.enemies.rampantWalker'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	RampantWalker = BaseEnemy.extend({

		name : "Rampant Walker", 
		description : "This is a Rampant Walker", 
		playerEnterText : "", 
		playerExitText : "", 
		playerAttackText : "", 
		enemyAttackText : "", 
		threatLevel : "High", 

		init : function()
		{
			this.animSheet = AssetCore.animations.zombie_Idle;
			this.status.hitChance = 0.15;
			this.status.damage = 1;
			this.status.lootDropped = 1;
			this.parent();
		},
	});
});