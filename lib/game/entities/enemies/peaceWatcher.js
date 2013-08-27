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
			this.name = ScriptCore.PeaceWatcherName;
			this.description = ScriptCore.PeaceWatcherDescription;
			this.setAnimSheet(AssetCore.requestAnim('Zombie Idle'));
			this.status.hitChance = 0.25;
			this.status.damage = 2;
			this.status.lootDropped = 1;
			this.sendRoomIntoLockDown = true;
		},
	});
});