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
			this.addAnimSheet('FL Idle', AssetCore.requestAnim('Security Drone FL Idle'));
			this.addAnimSheet('FR Idle', AssetCore.requestAnim('Security Drone FR Idle'));
			this.addAnimSheet('RL Idle', AssetCore.requestAnim('Security Drone RL Idle'));
			this.addAnimSheet('RR Idle', AssetCore.requestAnim('Security Drone RR Idle'));
			this.name = ScriptCore.SecurityDroidName;
			this.description = ScriptCore.SecurityDroidDescription;
			this.status.hitChance = 0.0;
			this.status.damage = 0;
			this.status.lootDropped = 0;
			this.status.spawnOtherChance = 0.5;
			this.indestructible = true;
			this.allowPlayerScavenging = true;
			this.damageOnPlayerExit = false;
			this.spawnOtherOnPlayerTurnStart = true;
			this.menu.init(['inspect']);
		},
	});
});