ig.module(
	'game.entities.enemy'
)
.requires(
	'impact.entity', 
    'game.ui.contextMenu'
)
.defines(function(){
	EntityEnemy = ig.Entity.extend({
		x : 0, 
		y : 0, 

		description : "This is an enemy potatoe", 
		menu : new ContextMenu(), 

		image: new ig.Image('media/enemyTemp.png'),
		texture: null,

		type : null,
		currentRoom : null, 

		flip : false,

		status : 
		{
			alive : false,
			health : 1,
			attack : 20,
			damage : 1,
			defense : 10,
			armor : 0,
		}, 

		threatRates : {high : 1.0, med : 0.66, low : 0.33},
		threatLevel : 0,
		
		spawnRates : {high : 1.0, medHigh : 0.75, medLow : 0.5, low : 0.25},
		spawnChance : 0,

		lootDropped : 1,
		
		init : function()
		{
			this.threatLevel = this.threatRates.low;
			this.spawnChance = this.spawnRates.high;
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
			glDraw(this.image.width, this.image.height, this.x, this.y - (this.image.height / 2), intensity, this.texture);
        },

		isMouseOver : function()
		{
			var halfW = this.image.width / 2;

            if(
            	ig.input.mouse.x >= this.x - halfW && 
            	ig.input.mouse.x <= this.x + halfW && 
            	ig.input.mouse.y >= this.y - this.image.height && 
            	ig.input.mouse.y <= this.y)
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
			if(Math.floor((Math.random()*20)+1+this.status.attack) >= targetPlayer.status.defense)
			{
				targetPlayer.takeDamage(this.status.damage);
			}
		},

		takeDamage : function(dmgAmount)
		{
			console.log('ENEMY TAKING DAMAGE', dmgAmount);
			this.status.health -= dmgAmount;
			if(this.health <= 0) this.death();
		},

		death : function()
		{
			this.active = false;
		},
	});

});