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
			this.addAnimSheet('FL Idle', AssetCore.requestAnim('Autotron FL Idle'));
			this.addAnimSheet('FR Idle', AssetCore.requestAnim('Autotron FR Idle'));
			this.addAnimSheet('RL Idle', AssetCore.requestAnim('Autotron RL Idle'));
			this.addAnimSheet('RR Idle', AssetCore.requestAnim('Autotron RR Idle'));
			this.name = ScriptCore.CrewAutotronName;
			this.description = ScriptCore.CrewAutotronDescription;
			this.status.hitChance = 0.3;
			this.status.damage = 2;
			this.status.lootDropped = 0;
		},
	});
});