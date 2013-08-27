ig.module(
	'game.entities.enemies.navGuide'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	NavGuide = BaseEnemy.extend({

		threatLevel : "Medium", 

		init : function()
		{
			this.parent();
			this.name = ScriptCore.NavGuideName;
			this.description = ScriptCore.NavGuideDescription;
			this.setAnimSheet(AssetCore.requestAnim('Zombie Idle'));
			this.status.hitChance = 0.3;
			this.status.damage = 2;
			this.status.lootDropped = 0;
		},
	});
});