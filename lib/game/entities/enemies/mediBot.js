ig.module(
	'game.entities.enemies.mediBot'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	MediBot = BaseEnemy.extend({

		name : "Small MediBot", 
		description : "This is a MediBot", 
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