ig.module(
	'game.entities.enemies.cleanser'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	Cleanser = BaseEnemy.extend({

		threatLevel : "Low", 

		init : function()
		{
			this.parent();
			this.addAnimSheet('FL Idle', AssetCore.requestAnim('Cleanser FL Idle'));
			this.addAnimSheet('FR Idle', AssetCore.requestAnim('Cleanser FR Idle'));
			this.addAnimSheet('RL Idle', AssetCore.requestAnim('Cleanser RL Idle'));
			this.addAnimSheet('RR Idle', AssetCore.requestAnim('Cleanser RR Idle'));
			this.name = ScriptCore.CleanserName;
			this.description = ScriptCore.CleanserDescription;
			this.status.hitChance = 0.0;
			this.status.damage = 1;
			this.status.lootDropped = 0;
			this.indestructible = true;
			this.allowPlayerScavenging = true;
			this.damageOnPlayerExit = false;
			this.menu.init(['inspect']);
		},
	});
});