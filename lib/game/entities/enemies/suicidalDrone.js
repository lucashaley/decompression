ig.module(
	'game.entities.enemies.suicidalDrone'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	SuicidalDrone = BaseEnemy.extend({

		threatLevel : "High", 

		init : function()
		{
			this.parent();
			this.addAnimSheet('FL Idle', AssetCore.requestAnim('Suicide Drone FL Idle'));
			this.addAnimSheet('FR Idle', AssetCore.requestAnim('Suicide Drone FR Idle'));
			this.addAnimSheet('RL Idle', AssetCore.requestAnim('Suicide Drone RL Idle'));
			this.addAnimSheet('RR Idle', AssetCore.requestAnim('Suicide Drone RR Idle'));
			this.name = ScriptCore.SuicidalDroneName;
			this.description = ScriptCore.SuicidalDroneDescription;
			this.status.hitChance = 1.0;
			this.status.damage = 3;
			this.status.lootDropped = 0;
			this.status.attackChance = 0.5;
			this.damageOnPlayerEnter = true;
			this.selfDestructOnAttack = true;
		},
	});
});