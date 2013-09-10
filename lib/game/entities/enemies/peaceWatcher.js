ig.module(
	'game.entities.enemies.peaceWatcher'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	PeaceWatcher = BaseEnemy.extend({

		threatLevel : "High", 

		init : function()
		{
			this.parent();
			this.addAnimSheet('FL Idle', AssetCore.requestAnim('PeaceWatcher FL Idle'));
			this.addAnimSheet('FR Idle', AssetCore.requestAnim('PeaceWatcher FR Idle'));
			this.addAnimSheet('RL Idle', AssetCore.requestAnim('PeaceWatcher RL Idle'));
			this.addAnimSheet('RR Idle', AssetCore.requestAnim('PeaceWatcher RR Idle'));
			this.name = ScriptCore.PeaceWatcherName;
			this.description = ScriptCore.PeaceWatcherDescription;
			this.status.hitChance = 0.25;
			this.status.damage = 2;
			this.status.lootDropped = 1;
			this.sendRoomIntoLockDown = true;
		},
	});
});