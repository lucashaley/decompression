ig.module(
	'game.entities.enemies.peaceWatcher'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	PeaceWatcher = BaseEnemy.extend({

		name : "PeaceWatcher", 
		description : "This is a PeaceWatcher", 
		playerEnterText : "", 
		playerExitText : "", 
		playerAttackText : "", 
		enemyAttackText : "", 
		threatLevel : "High", 

		init : function()
		{
			this.animSheet = AssetCore.animations.zombie_Idle;
			this.status.hitChance = 0.25;
			this.status.damage = 2;
			this.status.lootDropped = 1;
			this.sendRoomIntoLockDown = true;
			this.parent();
		},
	});
});