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
			this.addAnimSheet('FL Idle', AssetCore.requestAnim('NavGuide FL Idle'));
			this.addAnimSheet('FR Idle', AssetCore.requestAnim('NavGuide FR Idle'));
			this.addAnimSheet('RL Idle', AssetCore.requestAnim('NavGuide RL Idle'));
			this.addAnimSheet('RR Idle', AssetCore.requestAnim('NavGuide RR Idle'));
			this.name = ScriptCore.NavGuideName;
			this.description = ScriptCore.NavGuideDescription;
			this.status.hitChance = 0.3;
			this.status.damage = 2;
			this.status.lootDropped = 0;
		},
	});
});