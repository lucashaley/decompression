ig.module(
	'game.entities.bosses.tyche'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	TycheBoss = BaseEnemy.extend({

		name : "Tyche", 
		description : "This is Tyche", 
		playerEnterText : "", 
		playerExitText : "", 
		playerAttackText : "", 
		enemyAttackText : "", 
		threatLevel : "High", 

		isBoss : true, 

		init : function()
		{
			this.animSheet = AssetCore.animations.zombie_Idle;
			this.status.hitChance = 0.05;
			this.status.damage = 0;
			this.status.lootDropped = 2;
			this.parent();
		},
	});
});