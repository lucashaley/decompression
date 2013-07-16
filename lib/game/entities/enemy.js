ig.module(
	'game.entities.enemy'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityEnemy = ig.Entity.extend({
		x : 0, 
		y : 0, 

		description : "",
		image: new ig.Image('media/enemyTemp.png'),
		texture: null,

		alive : false,
		health : 1,
		type : null,
		currentRoom : null, 

		flip : false,

		attack : 20,
		attackDmg : 1,
		defense : 10,
		armor : 0,

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
			if(Math.floor((Math.random()*20)+1+this.attack) >= targetPlayer.defense)
			{
				targetPlayer.takeDamage(this.attackDmg);
			}
		},

		takeDamage : function(dmgAmount)
		{
			this.health -= dmgAmount;
			if(this.health <= 0) this.death();
		},

		death : function()
		{
			this.active = false;
		},
	});

});