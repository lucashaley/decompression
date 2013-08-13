ig.module(
	'game.entities.enemies.suicidalDrone'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	SuicidalDrone = BaseEnemy.extend({

		name : "Suicidal Drone", 
		description : "This is a Suicidal Drone", 
		playerEnterText : "", 
		playerExitText : "", 
		playerAttackText : "", 
		enemyAttackText : "", 
		threatLevel : "High", 

		init : function()
		{
			this.animSheet = AssetCore.animations.zombie_Idle;
			this.status.hitChance = 1.0;
			this.status.damage = 3;
			this.status.lootDropped = 0;
			this.status.attackChance = 0.5;
			this.damageOnPlayerEnter = true;
			this.selfDestructOnAttack = true;
			this.parent();
		},
	});
});