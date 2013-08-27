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
			this.name = ScriptCore.SmallMediBotName;
			this.description = ScriptCore.MediBotDescription;
			this.setAnimSheet(AssetCore.requestAnim('Zombie Idle'));
			this.status.hitChance = 0.3;
			this.status.damage = 2;
			this.status.lootDropped = 0;
		},
	});
});