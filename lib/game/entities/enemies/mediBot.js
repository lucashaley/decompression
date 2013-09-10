ig.module(
	'game.entities.enemies.mediBot'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	MediBot = BaseEnemy.extend({

		threatLevel : "Medium", 

		init : function()
		{
			this.parent();
			this.addAnimSheet('FL Idle', AssetCore.requestAnim('MediBot FL Idle'));
			this.addAnimSheet('FR Idle', AssetCore.requestAnim('MediBot FR Idle'));
			this.addAnimSheet('RL Idle', AssetCore.requestAnim('MediBot RL Idle'));
			this.addAnimSheet('RR Idle', AssetCore.requestAnim('MediBot RR Idle'));
			this.name = ScriptCore.SmallMediBotName;
			this.description = ScriptCore.MediBotDescription;
			this.status.hitChance = 0.3;
			this.status.damage = 2;
			this.status.lootDropped = 0;
		},
	});
});