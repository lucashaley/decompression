ig.module(
	'game.entities.bosses.mobOfBionicZombies'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	ModOfBionicZombies = BaseEnemy.extend({

		threatLevel : "High", 

		isBoss : true, 

		init : function()
		{
			this.parent();
			this.name = ScriptCore.ModOfBionicZombiesName;
			this.description = ScriptCore.ModOfBionicZombiesDescription;
			this.status.hitChance = 0.05;
			this.status.damage = 4;
			this.status.lootDropped = 0;
		},
	});
});