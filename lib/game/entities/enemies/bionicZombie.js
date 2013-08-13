ig.module(
	'game.entities.enemies.bionicZombie'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	BionicZombie = BaseEnemy.extend({

		name : "Bionic Zombie", 
		description : "This is a Bionic Zombie", 
		playerEnterText : "", 
		playerExitText : "", 
		playerAttackText : "", 
		enemyAttackText : "", 
		threatLevel : "Medium", 

		init : function()
		{
			this.animSheet = AssetCore.animations.zombie_Idle;
			this.status.hitChance = 0.35;
			this.status.damage = 2;
			this.status.lootDropped = 0;
			this.parent();
		},
	});
});