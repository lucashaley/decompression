ig.module(
	'game.entities.bosses.tyche'
)
.requires(
	'impact.entity', 
    'game.entities.enemy'
)
.defines(function(){
	TycheBoss = BaseEnemy.extend({

		threatLevel : "High", 

		isBoss : true, 

		init : function()
		{
			this.parent();
			this.name = ScriptCore.TycheName;
			this.description = ScriptCore.TycheDescription;
			this.setAnimSheet(AssetCore.requestAnim('Zombie Idle'));
			this.status.hitChance = 0.05;
			this.status.damage = 0;
			this.status.lootDropped = 2;
		}, 

		onPlayerAction : function(player)
		{
            var chance = Math.random();
            if (chance <= 0.25)
            {
				var index = Math.floor(Math.random() * GameCore.explored.length);
				var room = GameCore.explored[index];
				room.addEnemy();
				Chat.push(this.name + ScriptCore.TycheSpawnInRoom + room.name);
            }
            else if (chance <= 0.5)
            {
            	Chat.push(ScriptCore.TycheDamageAllPlayers);
            	for (var i = 0; i < GameCore.players.length; i++)
            	{
            		var player = GameCore.players[i];
            		if (player != null) player.takeDamage(2, false);
            	}
            }
            else if (chance <= 0.75)
            {
            	var index = Math.floor(Math.random() * GameCore.players.length);
            	var player = GameCore.players[index];
            	if (player != null)
            	{
            		Chat.push(player.name + ScriptCore.TycheDamagePlayer);
            		player.takeDamage(4, false);
            	}
            }
            else if (chance <= 0.85)
            {
            	Chat.push(ScriptCore.TycheDoesNothing);
            }
            else if (chance <= 0.95)
            {
            	Chat.push(ScriptCore.TycheHealsPlayers);
            	for (var i = 0; i < GameCore.players.length; i++)
            	{
            		var player = GameCore.players[i];
            		if (player != null) player.heal(1);
            	}
            }
            else
            {
            	var index = Math.floor(Math.random() * GameCore.players.length);
            	var player = GameCore.players[index];
            	if (player != null)
            	{
            		Chat.push(player.name + ScriptCore.TycheGivesKeycard);
            		player.addItem(ItemCore.requestItemByItemClassName('Keycard'));
            	}
            }
			this.parent();
		}, 
	});
});