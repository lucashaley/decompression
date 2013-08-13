ig.module(
	'game.entities.bosses.mobOfBionicZombies'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	ModOfBionicZombies = BaseEnemy.extend({

		name : "Mod of Bionic Zombies", 
		description : "This is a Mod of Bionic Zombies", 
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
			this.status.damage = 4;
			this.status.lootDropped = 0;
			this.parent();
		},
	});
});