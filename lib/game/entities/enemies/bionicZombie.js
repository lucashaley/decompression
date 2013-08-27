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
			this.name = ScriptCore.BionicZombieName;
			this.description = ScriptCore.BionicZombieDescription;
			this.setAnimSheet(AssetCore.requestAnim('Zombie Idle'));
			this.status.hitChance = 0.35;
			this.status.damage = 2;
			this.status.lootDropped = 0;
		},
	});
});