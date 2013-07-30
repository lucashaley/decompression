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

		name : "Enemy Dupe", 
		description : "This is an enemy potatoe", 
		menu : new ContextMenu(), 
        font: new FontSheet( 'media/FontSheet_128.png' ), 

		image: new ig.Image('media/enemyTemp.png'), 
		texture: null, 

		currentRoom : null, 

		flip : false, 

		status : 
		{
			alive : true, 
			damage : 1, 
			attackChance : 1.0, 
			hitChance : 0.5, 
			lootDropped : 0, 
		}, 

		damageOnPlayerEnter : false, 
		damageOnPlayerExit : true, 
		damageOnPlayerTurnStart : false, 
		selfDestructOnAttack : false, 
		spawnOtherEnemy : false, 
		sendRoomIntoLockDown : false, 
		allowPlayerScavenging : false, 
		
		init : function()
		{
			this.texture = glLoadTexture(this.image.data);
			this.menu.init(['inspect', 'attack']);
            this.menu.connectingEntity = this;
		},

		update : function()
		{
			this.parent();
		},

        draw: function(intensity)
        {
			glDraw(this.image.width, this.image.height, this.pos.x, this.pos.y - (this.image.height / 2), intensity, this.texture);
			if (this.isMouseOver())
			{
            	this.font.draw(this.name, ig.input.mouse.x, ig.input.mouse.y - 16, ig.Font.ALIGN.LEFT);
			}
        },

		setPosition : function(x, y)
		{
			this.pos.x = x;
			this.pos.y = y;
		}, 
		isMouseOver : function()
		{
			var halfW = this.image.width / 2;

            if(
            	ig.input.mouse.x >= this.pos.x - halfW && 
            	ig.input.mouse.x <= this.pos.x + halfW && 
            	ig.input.mouse.y >= this.pos.y - this.image.height && 
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
		},
		onPlayerExit : function(targetPlayer)
		{
		},
		onPlayerMisses : function(attackingPlayer)
		{
		}, 		

		attack : function(targetPlayer)
		{
			console.log('ENEMY ATTACKING PLAYER ', targetPlayer);
			Chat.push('ENEMY ATTACKING PLAYER ' + targetPlayer);
			console.log('PLAYER HP BEFORE ', targetPlayer.status.health);

			var damage = this.status.damage - targetPlayer.status.armor;
			console.log('TAKING DAMAGE ', damage);
			Chat.push('TAKING DAMAGE ', damage);
			targetPlayer.takeDamage(this.status.damage);
			
			console.log('PLAYER HP AFTER ', targetPlayer.status.health);
		},

		/*takeDamage : function(dmgAmount)
		{
			//console.log('ENEMY TAKING DAMAGE', dmgAmount);
			this.status.health -= dmgAmount;
			if(this.status.health <= 0) this.death();
		}, */

		death : function()
		{
			//this.status.health = 0;
			this.status.alive = false;
		}, 
	});

});