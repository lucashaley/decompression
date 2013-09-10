ig.module(
	'game.entities.enemies.bionicZombie'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	BionicZombie = BaseEnemy.extend({

		threatLevel : "Medium", 

		init : function()
		{
			this.parent();
			this.addAnimSheet('FL Idle', AssetCore.requestAnim('Zombie FL Idle'));
			this.addAnimSheet('FR Idle', AssetCore.requestAnim('Zombie FR Idle'));
			this.addAnimSheet('RL Idle', AssetCore.requestAnim('Zombie RL Idle'));
			this.addAnimSheet('RR Idle', AssetCore.requestAnim('Zombie RR Idle'));
			this.name = ScriptCore.BionicZombieName;
			this.description = ScriptCore.BionicZombieDescription;
			this.status.hitChance = 0.35;
			this.status.damage = 2;
			this.status.lootDropped = 0;
		},
	});
});