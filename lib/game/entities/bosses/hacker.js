ig.module(
	'game.entities.bosses.hacker'
)
.requires(
	'impact.entity',
    'game.entities.enemy'
)
.defines(function(){
	Hacker = BaseEnemy.extend({

		threatLevel : "High",

		isBoss : true,

		init : function()
		{
			this.parent();
			GameCore.startingRoom.textures.diffuse = AssetCore.textures.tyche_D_Hacker;
            this.addAnimSheet('FL Idle', AssetCore.requestAnim('NavGuide FL Idle'));
			this.addAnimSheet('FR Idle', AssetCore.requestAnim('NavGuide FR Idle'));
			this.addAnimSheet('RL Idle', AssetCore.requestAnim('NavGuide RL Idle'));
			this.addAnimSheet('RR Idle', AssetCore.requestAnim('NavGuide RR Idle'));
			this.size.x = 128;
			this.size.y = 128;
			this.name = ScriptCore.HackerName;
			this.description = ScriptCore.HackerDescription;
			this.status.hitChance = 0.05;
			this.status.damage = 0;
			this.status.lootDropped = 2;
		},

		onPlayerMiss : function(attackingPlayer)
		{
			var index = Math.floor(Math.random() * GameCore.explored.length);
			var room = GameCore.explored[index];
			room.addEnemy();
			Chat.push(this.name + ScriptCore.HackerSpawnInRoom + room.name);
			//console.log(this, ScriptCore.HackerSpawnInRoom, room);
			this.parent();
		},
		onPlayerTurnStart : function(player)
		{
            var chance = Math.random();
            if (chance <= 0.25)
            {
            	Chat.push(this.name + ScriptCore.HackerLockDoors);
            	//console.log(this, ScriptCore.HackerLockDoors);
            	for (var i = 0; i < GameCore.explored.length; i++)
            	{
            		var room = GameCore.explored[i];
            		if (room != null) room.lockDoors();
            	}
            }
			this.parent(player);
		},
	});
});