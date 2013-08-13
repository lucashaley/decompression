ig.module(
	'game.entities.enemies.smallRoamer'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	SmallRoamer = BaseEnemy.extend({

		name : "Small Roamer", 
		description : "This is a Small Roamer", 
		playerEnterText : "", 
		playerExitText : "", 
		playerAttackText : "", 
		enemyAttackText : "", 
		threatLevel : "Low", 

		init : function()
		{
			this.animSheet = AssetCore.animations.zombie_Idle;
			this.status.hitChance = 0.45;
			this.status.damage = 1;
			this.status.lootDropped = 0;
			this.parent();
		},
	});
});