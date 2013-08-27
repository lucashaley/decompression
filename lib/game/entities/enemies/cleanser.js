ig.module(
	'game.entities.enemies.cleanser'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	Cleanser = BaseEnemy.extend({

		threatLevel : "Low", 

		init : function()
		{
			this.parent();
			this.name = ScriptCore.CleanserName;
			this.description = ScriptCore.CleanserDescription;
			this.setAnimSheet(AssetCore.requestAnim('Zombie Idle'));
			this.status.hitChance = 0.0;
			this.status.damage = 1;
			this.status.lootDropped = 0;
			this.indestructible = true;
			this.allowPlayerScavenging = true;
			this.damageOnPlayerExit = false;
		},
	});
});