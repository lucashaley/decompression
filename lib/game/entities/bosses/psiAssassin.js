ig.module(
	'game.entities.bosses.psiAssassin'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	PSIAssassin = BaseEnemy.extend({

		name : "PSI Assassin", 
		description : "This is a PSI Assassin", 
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
			this.status.damage = 6;
			this.status.lootDropped = 2;
			this.parent();
		},
	});
});