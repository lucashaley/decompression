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
			this.name = ScriptCore.NanoBotsName;
			this.description = ScriptCore.NanoBotsDescription;
			this.setAnimSheet(AssetCore.requestAnim('NanoBots Idle'));
			this.status.hitChance = 0.1;
			this.status.damage = 1;
			this.status.lootDropped = 0;
		},
	});
});