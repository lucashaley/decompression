ig.module(
	'game.entities.enemies.curruptedScout'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	CurruptedScout = BaseEnemy.extend({

		name : "Currupted Scout", 
		description : "This is a Currupted Scout", 
		playerEnterText : "", 
		playerExitText : "", 
		playerAttackText : "", 
		enemyAttackText : "", 
		threatLevel : "Low", 

		init : function()
		{
			this.animSheet = AssetCore.animations.zombie_Idle;
			this.status.hitChance = 0.55;
			this.status.damage = 1;
			this.status.lootDropped = 1;
			this.runAwayOnPlayerMiss = true;
			this.parent();
		},
	});
});