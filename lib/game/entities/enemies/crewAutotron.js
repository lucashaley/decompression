ig.module(
	'game.entities.enemies.crewAutotron'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	CrewAutotron = BaseEnemy.extend({

		threatLevel : "Medium", 

		init : function()
		{
			this.parent();
			this.name = ScriptCore.CrewAutotronName;
			this.description = ScriptCore.CrewAutotronDescription;
			this.setAnimSheet(AssetCore.requestAnim('Zombie Idle'));
			this.status.hitChance = 0.3;
			this.status.damage = 2;
			this.status.lootDropped = 0;
		},
	});
});