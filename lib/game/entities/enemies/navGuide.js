ig.module(
	'game.entities.enemies.navGuide'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	NavGuide = BaseEnemy.extend({

		name : "NavGuide", 
		description : "This is a NavGuide", 
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