ig.module(
	'game.entities.enemy'
)
.requires(
	'impact.entity', 
    'game.ui.contextMenu'
)
.defines(function(){
	EntityEnemy = ig.Entity.extend({
		pos : {x : 0, y : 0, }, 
        size : {x : 0, y : 0, }, 

		name : "Enemy Dupe", 
		description : "This is an enemy potatoe", 
		playerEnterText : "", 
		playerExitText : "", 
		playerAttackText : "", 
		enemyAttackText : "", 
		threatLevel : "", 

		animSheet : null, 
		menu : null, 

		currentRoom : null, 

		status : 
		{
			alive : true, 
			damage : 0, 
			attackChance : 1.0, 
			hitChance : 1.0, 
			spawnOtherChance : 0.0, 
			lootDropped : 0, 
		}, 

		damageOnPlayerEnter : false, 
		damageOnPlayerExit : true, 
		damageOnPlayerTurnStart : false, 
		damageOnPlayerTurnEnd : true, 
		indestructible : false, 
		selfDestructOnAttack : false, 
		spawnOtherOnPlayerTurnStart : false, 
		sendRoomIntoLockDown : false, 
		allowPlayerScavenging : false, 
		runAwayOnPlayerMiss : false, 

		spawnedOther : false, 
		
		init : function()
		{
			this.menu = new ContextMenu();
			this.menu.init(['inspect', 'attack']);
            this.menu.connectingEntity = this;
			if (this.animSheet == null) return;
			this.size.x = this.animSheet.sheet.cellw;
			this.size.y = this.animSheet.sheet.cellh;
		},

		update : function()
		{
			this.parent();
			this.animSheet.update();
			if (this.currentRoom.enemies.length < 2) this.spawnedOther = false;
		},

        draw: function(intensity)
        {
			//glDraw(this.image.width, this.image.height, this.pos.x, this.pos.y - (this.image.height / 2), intensity, this.texture);
			this.animSheet.draw(this.pos.x, this.pos.y - (this.size.y / 2), this.currentRoom);
			if (this.isMouseOver())
			{
            	MainFont.draw(this.name, ig.input.mouse.x, ig.input.mouse.y - 16, ig.Font.ALIGN.CENTER);
			}
        },

		setPosition : function(x, y)
		{
			this.pos.x = x;
			this.pos.y = y;
		}, 
		isMouseOver : function()
		{
			var halfW = this.size.x / 2;

            if(
            	ig.input.mouse.x >= this.pos.x - halfW && 
            	ig.input.mouse.x <= this.pos.x + halfW && 
            	ig.input.mouse.y >= this.pos.y - this.size.y && 
            	ig.input.mouse.y <= this.pos.y)
            {
            	return true;
            }
            else
            {
            	return false;
            }
		}, 

		onPlayerEnter : function(targetPlayer)
		{
			if (this.sendRoomIntoLockDown) this.currentRoom.isLockedDown = true;
			if (!this.allowPlayerScavenging) this.currentRoom.canScavenge = false;
            if (this.damageOnPlayerEnter) this.attack(targetPlayer);
		}, 
		onPlayerExit : function(targetPlayer)
		{
			if (this.damageOnPlayerExit) this.attack(targetPlayer);
		}, 
		onPlayerMiss : function(attackingPlayer)
		{
			if (this.runAwayOnPlayerMiss) this.currentRoom.removeEnemy(this);
		}, 
		onPlayerTurnStart : function(player)
		{
            if (this.damageOnPlayerTurnStart) this.attack(player);
            if (this.spawnOtherOnPlayerTurnStart && !this.spawnedOther)
            {
            	var chance = Math.random();
            	if (chance <= this.status.spawnOtherChance)
            	{
            		var newEnemyName = EnemyCore.generateRandomSpawnableEnemyName();
            		Chat.push(this.name + ' SPAWNS A ' + newEnemyName);
            		var newEnemy = this.currentRoom.addEnemy(newEnemyName);
            		this.spawnedOther = true;
            		newEnemy.onPlayerEnter();
            	}
            }
		}, 
		onPlayerTurnEnd : function(player)
		{
            if (this.damageOnPlayerTurnEnd) this.attack(player);
		}, 
		onDestroy : function(targetPlayer)
		{
			if (this.sendRoomIntoLockDown) this.currentRoom.isLockedDown = false;
			if (!this.allowPlayerScavenging) this.currentRoom.canScavenge = true;
		}, 

		attack : function(targetPlayer)
		{
			if (targetPlayer == null) return;
			if (this.status.damage < 1 || this.status.attackChance <= 0.0 || !this.status.alive) return;
			Chat.push(this.name + ' ATTACKING ' + targetPlayer.name);
			console.log('PLAYER HP BEFORE ', targetPlayer.status.health);

			var attack = Math.random();
			console.log('ENEMY ATTACK ', attack);
			if (attack <= this.status.attackChance)
			{
				var damage = this.status.damage - targetPlayer.status.armor;
				Chat.push(targetPlayer.name + ' TAKING ' + damage + ' DAMAGE');
				targetPlayer.takeDamage(this.status.damage);
			}
			else
			{
				Chat.push('ATTACK MISSED');
			}
			
			console.log('PLAYER HP AFTER ', targetPlayer.status.health);
			if (this.selfDestructOnAttack) this.death();
		},

		/*takeDamage : function(dmgAmount)
		{
			//console.log('ENEMY TAKING DAMAGE', dmgAmount);
			this.status.health -= dmgAmount;
			if(this.status.health <= 0) this.death();
		}, */

		death : function()
		{
			Chat.push(this.name + ' DESTROYED');
			//this.status.health = 0;
			this.status.alive = false;
		}, 
	});

});