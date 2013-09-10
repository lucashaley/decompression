ig.module(
	'game.entities.enemies.nanoBots'
)
.requires(
	'impact.entity',
    'game.entities.enemy'
)
.defines(function(){
	NanoBots = BaseEnemy.extend({

		threatLevel : "High",

		init : function()
		{
			this.parent();
			this.addAnimSheet('FL Idle', AssetCore.requestAnim('NanoBots Idle'));
			this.addAnimSheet('FR Idle', AssetCore.requestAnim('NanoBots Idle'));
			this.addAnimSheet('RL Idle', AssetCore.requestAnim('NanoBots Idle'));
			this.addAnimSheet('RR Idle', AssetCore.requestAnim('NanoBots Idle'));
			this.name = ScriptCore.NanoBotsName;
			this.description = ScriptCore.NanoBotsDescription;
			this.status.hitChance = 0.1;
			this.status.damage = 1;
			this.status.lootDropped = 0;
		},
	});
});