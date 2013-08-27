ig.module(
	'game.entities.enemies.securityDroid'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	SecurityDroid = BaseEnemy.extend({

		threatLevel : "Low", 

		init : function()
		{
			this.parent();
			this.name = ScriptCore.SecurityDroidName;
			this.description = ScriptCore.SecurityDroidDescription;
			this.setAnimSheet(AssetCore.requestAnim('Zombie Idle'));
			this.status.hitChance = 0.0;
			this.status.damage = 0;
			this.status.lootDropped = 0;
			this.status.spawnOtherChance = 0.5;
			this.indestructible = true;
			this.allowPlayerScavenging = true;
			this.damageOnPlayerExit = false;
			this.spawnOtherOnPlayerTurnStart = true;
		},
	});
});