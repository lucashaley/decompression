ig.module(
	'game.entities.bosses.psiAssassin'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	PSIAssassin = BaseEnemy.extend({

		threatLevel : "High", 

		isBoss : true, 

		init : function()
		{
			this.parent();
			this.name = ScriptCore.PSIAssassinName;
			this.description = ScriptCore.PSIAssassinDescription;
			this.setAnimSheet(AssetCore.requestAnim('Zombie Idle'));
			this.status.hitChance = 0.05;
			this.status.damage = 6;
			this.status.lootDropped = 2;
		},

		damageDealt : function(targetPlayer)
		{
			if (targetPlayer.status.health <= 1) return 1;
			if (targetPlayer.status.health <= 6) return targetPlayer.status.health - 1;
			return this.status.damage - targetPlayer.status.armor;
		}, 
	});
});