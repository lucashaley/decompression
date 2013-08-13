ig.module(
	'game.entities.enemies.securityDroid'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	SecurityDroid = BaseEnemy.extend({

		name : "Security Droidmer", 
		description : "This is a Security Droid", 
		playerEnterText : "", 
		playerExitText : "", 
		playerAttackText : "", 
		enemyAttackText : "", 
		threatLevel : "Low", 

		init : function()
		{
			this.animSheet = AssetCore.animations.zombie_Idle;
			this.status.hitChance = 0.0;
			this.status.damage = 0;
			this.status.lootDropped = 0;
			this.status.spawnOtherChance = 0.5;
			this.indestructible = true;
			this.allowPlayerScavenging = true;
			this.damageOnPlayerExit = false;
			this.spawnOtherOnPlayerTurnStart = true;
			this.parent();
		},
	});
});