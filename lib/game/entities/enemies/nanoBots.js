ig.module(
	'game.entities.enemies.nanoBots'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	NanoBots = BaseEnemy.extend({

		name : "NanoBots", 
		description : "This is a NanoBots", 
		playerEnterText : "", 
		playerExitText : "", 
		playerAttackText : "", 
		enemyAttackText : "", 
		threatLevel : "High", 

		init : function()
		{
			this.animSheet = AssetCore.animations.nanobots_Idle;
			this.status.hitChance = 0.1;
			this.status.damage = 1;
			this.status.lootDropped = 0;
			this.parent();
		},
	});
});