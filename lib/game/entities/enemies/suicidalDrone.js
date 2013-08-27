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
			this.name = ScriptCore.SuicidalDroneName;
			this.description = ScriptCore.SuicidalDroneDescription;
			this.setAnimSheet(AssetCore.requestAnim('Zombie Idle'));
			this.status.hitChance = 1.0;
			this.status.damage = 3;
			this.status.lootDropped = 0;
			this.status.attackChance = 0.5;
			this.damageOnPlayerEnter = true;
			this.selfDestructOnAttack = true;
		},
	});
});