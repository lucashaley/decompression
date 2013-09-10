ig.module(
	'game.entities.enemy'
)
.requires(
	'impact.entity', 
    'game.ui.contextMenu'
)
.defines(function(){
	BaseEnemy = ig.Entity.extend({
		pos : {x : 0, y : 0, }, 
        size : {x : 0, y : 0, }, 

		name : "", 
		description : "", 
		threatLevel : "", 

		currentAnim : null, 
		anims : 
		{
			forwardLeft : null, 
			forwardRight : null, 
			rearLeft : null, 
			rearRight : null, 
		}, 
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

		flipped: false,
		isBoss : false, 

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
		},

		update : function()
		{
			this.parent();
			if (this.animSheet != null) this.animSheet.update();
			if (this.currentRoom.enemies.length < 2) this.spawnedOther = false;
		},

        draw: function(intensity)
        {
        	glSetFlipped(this.flipped);
			//glDraw(this.image.width, this.image.height, this.pos.x, this.pos.y - (this.image.height / 2), intensity, this.texture);
			if (this.animSheet != null) this.animSheet.draw(this.pos.x, this.pos.y - (this.size.y / 2), this.currentRoom);
        	glSetFlipped(false);
			MainFont.draw(this.name, this.pos.x + this.currentRoom.corner.x, this.pos.y + this.currentRoom.corner.y/* - this.size.y - 24*/, ig.Font.ALIGN.CENTER);
		},

        addAnimSheet : function(name, sheet)
        {
        	if (name == undefined || name == null || sheet == undefined || sheet == null) return;
        	switch (name)
        	{
        		case 'FL Idle':
				this.anims.forwardLeft = sheet;
        		break;
				case 'FR Idle':
				this.anims.forwardRight = sheet;
        		break;
				case 'RL Idle':
				this.anims.rearLeft = sheet;
        		break;
				case 'RR Idle':
				this.anims.rearRight = sheet;
        		break;
        		default:
        		break;
        	}
        	this.setAnimSheet(sheet);
        }, 
        setAnimSheet : function(sheet)
        {
        	this.animSheet = sheet;
			if (this.animSheet == null || this.animSheet == undefined) return;
			this.size.x = this.animSheet.sheet.cellw;
			this.size.y = this.animSheet.sheet.cellh;
        }, 
		setPosition : function(x, y)
		{
			this.pos.x = x;
			this.pos.y = y;
		}, 
		isMouseOver : function()
		{
			var halfW = this.size.x / 2;
            var x0 = this.pos.x + this.currentRoom.corner.x;
            var y0 = this.pos.y + this.currentRoom.corner.y;

            if(
            	ig.input.mouse.x >= x0 - halfW && 
            	ig.input.mouse.x <= x0 + halfW && 
            	ig.input.mouse.y >= y0 - this.size.y && 
            	ig.input.mouse.y <= y0)
            {
            	return true;
            }
            else
            {
            	return false;
            }
		}, 

		onPlayerEnter : function(player)
		{
			if (this.sendRoomIntoLockDown) this.currentRoom.isLockedDown = true;
			if (!this.allowPlayerScavenging) this.currentRoom.canScavenge = false;
            if (this.damageOnPlayerEnter) this.attack(player);
		}, 
		onPlayerExit : function(player)
		{
			if (this.damageOnPlayerExit) this.attack(player);
		}, 
		onPlayerMiss : function(player)
		{
			if (this.runAwayOnPlayerMiss) this.currentRoom.removeEnemy(this);
		}, 
		onPlayerAction : function(player)
		{
			return;
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
            		Chat.push(this.name + ScriptCore.EnemySpawningOther + newEnemyName);
            		var newEnemy = this.currentRoom.addEnemy(newEnemyName);
            		if (newEnemy != null)
            		{
	            		this.spawnedOther = true;
	            		newEnemy.onPlayerEnter();
	            	}
            	}
            }

            var dx = player.pos.x - this.pos.x;
            var dy = player.pos.y - this.pos.y;
            if (dy < 0 && dx >= 0)// topRight
            {
            	this.setAnimSheet(this.anims.rearRight);
            }
            else if (dy >= 0 && dx >= 0)// bottomRight
            {
            	this.setAnimSheet(this.anims.forwardRight);
            }
            else if (dy >= 0 && dx < 0)// bottomLeft
            {
            	this.setAnimSheet(this.anims.rearLeft);
            }
            else if (dy < 0 && dx < 0)// topLeft
            {
            	this.setAnimSheet(this.anims.forwardLeft);
            }
		}, 
		onPlayerTurnEnd : function(player)
		{
            if (this.damageOnPlayerTurnEnd) this.attack(player);
		}, 
		onDestroy : function(player)
		{
			if (this.sendRoomIntoLockDown) this.currentRoom.isLockedDown = false;
			if (!this.allowPlayerScavenging) this.currentRoom.canScavenge = true;
		}, 

		damageDealt : function(player)
		{
			return this.status.damage - player.status.armor;
		}, 
		attack : function(player)
		{
			if (player == null) return;
			if (this.status.damage < 1 || this.status.attackChance <= 0.0 || !this.status.alive) return;
			Chat.push(this.name + ScriptCore.EnemyAttackingPlayer + player.name);
			//console.log(this, ' ATTACKING ', player);
			//console.log('PLAYER HP BEFORE ', player.status.health);

			var attack = Math.random();
			//console.log('ENEMY ATTACK ', attack);
			if (attack <= this.status.attackChance)
			{
				var damage = this.damageDealt(player);
				player.takeDamage(damage);
			}
			else
			{
				Chat.push(ScriptCore.EnemyAttackMissed);
			}
			
			//console.log('PLAYER HP AFTER ', player.status.health);
			if (this.selfDestructOnAttack) this.death();
		}, 

		death : function()
		{
			Chat.push(this.name + ScriptCore.EnemyDeath);
			//this.status.health = 0;
			this.status.alive = false;
			this.currentRoom.addLoot(this.status.lootDropped);
		}, 
	});

});