ig.module(
	'game.entities.enemies.smallRoamer'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	SmallRoamer = BaseEnemy.extend({

		threatLevel : "Low", 

		init : function()
		{
			this.parent();
			this.addAnimSheet('FL Idle', AssetCore.requestAnim('Small Roamer FL Idle'));
			this.addAnimSheet('FR Idle', AssetCore.requestAnim('Small Roamer FR Idle'));
			this.addAnimSheet('RL Idle', AssetCore.requestAnim('Small Roamer RL Idle'));
			this.addAnimSheet('RR Idle', AssetCore.requestAnim('Small Roamer RR Idle'));
			this.name = ScriptCore.SmallRoamerName;
			this.description = ScriptCore.SmallRoamerDescription;
			this.status.hitChance = 0.45;
			this.status.damage = 1;
			this.status.lootDropped = 0;
		},
	});
});