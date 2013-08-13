ig.module(
	'game.entities.enemies.cleanser'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	Cleanser = BaseEnemy.extend({

		name : "Cleanser", 
		description : "This is a Cleanser", 
		playerEnterText : "", 
		playerExitText : "", 
		playerAttackText : "", 
		enemyAttackText : "", 
		threatLevel : "Low", 

		init : function()
		{
			this.animSheet = AssetCore.animations.zombie_Idle;
			this.status.hitChance = 0.0;
			this.status.damage = 1;
			this.status.lootDropped = 0;
			this.indestructible = true;
			this.allowPlayerScavenging = true;
			this.damageOnPlayerExit = false;
			this.parent();
		},
	});
});