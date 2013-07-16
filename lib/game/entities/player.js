ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
	//'game.entities.item'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({

		position : {x : 0, y : 0, }, 
		target : {x : 0, y : 0, }, 

		image: new ig.Image('media/player1.png'),
		texture: null,

		username : "Space Guy",
		jobName : "None", 

		turn : false,
		startedTurn : false, 

		alive : true,
		health : 6,
		job : null,
		inventory : new Array(),
		currentRoom : null, 

		flip : false, 

		attack : 20,
		attackDmg : 1,
		defense : 10,
		armor : 0,
		inventoryCap : 4, 

		actions : 
		{
			hasAttacked : false, 
			hasMoved : false, 
			hasScavenged : false, 
		},
		
		//special status effects
		hasImplantSensor : false,
		hasImplantDiscovery : false,
		hasImplantDefense : false,
		hasImplantCommand : false,
		hasImplantReflex : false,
		hasImplantQuantum : false,

		hasFriendlyDrone : false,
		hasReflexShield : false,
		hasKeyCard : false,


		//Constructor and initialization functions
		init : function()
		{
			this.texture = glLoadTexture(this.image.data);
		},

		update : function()
		{
			this.parent();
			if (this.turn && this.currentRoom != null) this.onTurnUpdate();
			this.onMoveUpdate();
		},

        draw: function(intensity)
        {
        	//console.log('PLAYER DRAW', this.position.x, this.position.y);
			glDraw(this.image.width, this.image.height, this.position.x, this.position.y - (this.image.height / 2), intensity, this.texture);
        },

        onTurnUpdate : function()
        {
    		if (!this.startedTurn)
    		{
    			this.onTurnStart();
    			this.startedTurn = true;
    		}

    		if (!this.actions.hasAttacked && false)// selected attack action
    		{
    			this.attack(null);// attack selected target
				this.actions.hasAttacked = true;
    		}
    		if (!this.actions.hasMoved && GameCore.targetedDoor != null && GameCore.targetedDoor.connectingRoom != null)// selected move action
    		{
    			this.transition(GameCore.targetedDoor);// transition to new room
    			this.actions.hasMoved = true;
    		}
    		if (!this.actions.hasScavenged && false)// selected scavenge action
    		{
    			this.scavenge();// scavenge for item
    			this.actions.hasScavenged = true;
    		}

    		if (this.actions.hasAttacked && this.actions.hasMoved && this.actions.hasScavenged)
    		{
    			this.onTurnEnd();
    		}
        }, 
		onTurnStart : function()
		{
			console.log('STARING MY TURN ', this.username);
        	this.turn = true;
        	this.startedTurn = false;
			this.actions.hasAttacked = false;
			this.actions.hasMoved = false;
			this.actions.hasScavenged = false;
    		GameCore.onTurnStart();
		},
		onTurnEnd : function()
		{
			console.log('ENDING MY TURN ', this.username);
        	this.turn = false;
    		this.onStartTurn = false;
    		GameCore.onTurnEnd();
		},
        startTurn : function()
        {
        	this.turn = true;
        	this.startedTurn = false;
        }, 
        endTurn : function()
        {
			this.actions.hasAttacked = true;
			this.actions.hasMoved = true;
			this.actions.hasScavenged = true;
        }, 

		attack : function(targetEnemy)
		{
			if(Math.floor((Math.random()*20)+1+this.attack) >= targetEnemy.defense)
			{
				targetEnemy.takeDamage(this.attackDmg);
			}
		},
		transition : function(targetDoor)
		{
			console.log('MOVING TO DOOR ', targetDoor);
			if (targetDoor.connectingRoom == null) return;
			this.moveTo(targetDoor.x, targetDoor.y);
			GameCore.movePlayerTo(targetDoor.connectingRoom);
		}, 
		scavenge : function()
		{
		},

		setPosition : function(x, y)
		{
			this.position.x = x;
			this.position.y = y;
			this.target.x = x;
			this.target.y = y;
		}, 
		moveTo : function(x, y)
		{
			this.target.x = x;
			this.target.y = y;
		}, 
		onMoveUpdate : function()
		{
			var disX = this.target.x - this.position.x;
			var disY = this.target.y - this.position.y;
			var mag = Math.sqrt((disX * disX) + (disY * disY));
			if (mag > 1)
			{
				var nX = disX / mag;
				var nY = disY / mag;
				this.position.x += nX;
				this.position.y += nY;
			}
		},

		giveJob : function(jobName)
		{
			this.jobName = jobName;
		}, 

		addItem : function(item)
		{
			this.inventory.push(item);
		}, 
		removeItem : function(index)
		{
			this.inventory.splice(index, 1);
		}, 
		useItem : function(targetEntity, index)
		{
			// use item
			this.removeItem(index);
		},
		giveItem : function(targetPlayer, index)
		{
			// give item to player
			this.removeItem(index);
		},

		takeDamage : function(dmgAmount)
		{
			this.health -= dmgAmount;
			if(this.health <= 0) this.death();
		},

		death : function()
		{
			this.alive = false;
		},
	});

});