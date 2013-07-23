ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
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

		job : null,
		inventory : new Array(),
		currentRoom : null, 

		flip : false, 

		status : 
		{
			alive : true,
			health : 6, 
			attack : 20,
			damage : 1,
			defense : 10,
			armor : 0,
			inventoryCap : 4, 
		}, 

		actions : 
		{
			hasAttacked : false, 
			hasMoved : false, 
			hasScavenged : false, 
			usedAbility : false, 
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

    		if (!this.actions.hasAttacked && GameCore.selectedAttack && GameCore.targetedEnemy != null && this.currentRoom.hasEnemies)// selected attack action
    		{
    			this.attack(GameCore.targetedEnemy);// attack selected target
    		}
    		if (!this.actions.hasMoved && GameCore.selectedMove && GameCore.targetedDoor != null && GameCore.targetedDoor.connectingRoom != null)// selected move action
    		{
    			this.transition(GameCore.targetedDoor);// transition to new room
    		}
    		if (!this.actions.hasScavenged && GameCore.selectedScavenge && this.currentRoom.hasItems)// selected scavenge action
    		{
    			this.scavenge();
    		}

    		if (!this.actions.usedAbility && GameCore.selectedAbility)
    		{
    			this.ability();
    		}

    		if (this.actions.hasAttacked && this.actions.hasMoved && this.actions.hasScavenged)
    		{
    			this.onTurnEnd();
    		}
        }, 
		onTurnStart : function()
		{
			console.log('STARING MY TURN ', this.username);
			Chat.push('STARING MY TURN ');
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
			Chat.push('ENDING MY TURN ');
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
			this.actions.usedAbility = true;
        }, 

		attack : function(targetEnemy)
		{
			console.log('ATTACKING ENEMY ', targetEnemy);
			console.log('ENEMY HP BEFORE ', targetEnemy.status.health);
			var diceRoll = Math.ceil(Math.random() * 20);
			console.log('DICE ROLL ', diceRoll);
			if((diceRoll + this.status.attack) >= targetEnemy.status.defense)
			{
				console.log('APPLYING DAMAGE ', this.status.damage);
				targetEnemy.takeDamage(this.status.damage);
			}
			console.log('ENEMY HP AFTER ', targetEnemy.status.health);
			this.actions.hasAttacked = true;
		}, 
		transition : function(targetDoor)
		{
			console.log('MOVING TO DOOR ', targetDoor);
			if (targetDoor.connectingRoom == null) return;
			this.moveTo(targetDoor.x, targetDoor.y);
			GameCore.movePlayerTo(targetDoor.connectingRoom);
    		this.actions.hasMoved = true;
		}, 
		scavenge : function()
		{
			var item = new EntityItem();
			item.init();
			this.addItem(item);
    		this.actions.hasScavenged = true;
		}, 
		ability : function()
		{
			this.actions.usedAbility = true;
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
			if (this.inventory.length >= this.status.inventoryCap) return;
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
			this.status.health -= dmgAmount;
			if(this.status.health <= 0) this.death();
		},

		death : function()
		{
			this.alive = false;
		},
	});

});