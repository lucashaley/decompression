ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({

		pos : {x : 0, y : 0, }, 
		target : {x : 0, y : 0, }, 

		image: new ig.Image('media/player1.png'),
		texture: null,

		username : "Space Guy", 
		jobName : "Civilian", 

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
			damage : 1, 
			armor : 0, 
			maxHealth : 6, 
			inventoryCap : 4, 
			actionsCap : 2, 
			attackBonus : 0.0, 
			allyBonus : 0.0, 
			scavengeChance : 0.5, 
		}, 
		resistances : 
		{
			neurotoxin : false, 
		}, 

		actions : 
		{
			remaining : 0, 
			taken : 0, 
		},
		
		hasImplantSensor : false,
		hasImplantDiscovery : false,
		hasImplantDefense : false,
		hasImplantCommand : false,
		hasImplantReflex : false,
		hasImplantQuantum : false,

		canReTryAttack : false,
		ignoreNextDamage : false,
		unlockingTakesNoAction : false, 

		init : function()
		{
			this.texture = glLoadTexture(this.image.data);
			this.useJobClass('Civilian');
		},

		update : function()
		{
			this.parent();
			if (this.turn && this.currentRoom != null) this.onTurnUpdate();
			this.onMoveUpdate();
		},

        draw: function(intensity)
        {
			glDraw(this.image.width, this.image.height, this.pos.x, this.pos.y - (this.image.height / 2), intensity, this.texture);
        },

        onTurnUpdate : function()
        {
    		if (!this.startedTurn)
    		{
    			this.onTurnStart();
    			this.startedTurn = true;
    		}

    		if (GameCore.selectedAttack && GameCore.targetedEnemy != null && this.currentRoom.hasEnemies)// selected attack action
    		{
    			this.attack(GameCore.targetedEnemy);// attack selected target
    			GameCore.selectedAttack = false;
    			GameCore.targetedEnemy = null;
    		}
    		if (GameCore.selectedMove && GameCore.targetedDoor != null && GameCore.targetedDoor.connectingRoom != null)// selected move action
    		{
    			this.transition(GameCore.targetedDoor);// transition to new room
    			GameCore.selectedMove = false;
    			GameCore.targetedDoor = null;
    		}
    		if (GameCore.selectedUnlock && GameCore.targetedDoor != null)// selected move action
    		{
    			this.unlock(GameCore.targetedDoor);
    			GameCore.selectedUnlock = false;
    			GameCore.targetedDoor = null;
    		}
    		if (GameCore.selectedScavenge && this.currentRoom.hasItems)// selected scavenge action
    		{
    			this.scavenge();
    			GameCore.selectedScavenge = false;
    		}

    		if (!this.actions.usedAbility && GameCore.selectedAbility)
    		{
    			this.ability();
    			GameCore.selectedAbility = false;
    		}

    		if (this.actions.remaining < 1)
    		{
    			this.onTurnEnd();
    		}
        }, 
		onTurnStart : function()
		{
    		GameCore.onTurnStart();
			console.log('STARING MY TURN ', this.username);
			Chat.push('STARING MY TURN ' + this.username);
        	this.turn = true;
        	this.startedTurn = false;
			this.actions.remaining = this.status.actionsCap;
			this.actions.taken = 0;
		},
		onTurnEnd : function()
		{
			console.log('ENDING MY TURN ', this.username);
			Chat.push('ENDING MY TURN ' + this.username);
        	this.turn = false;
    		this.onStartTurn = false;
			this.actions.remaining = 0;
			this.actions.taken = 0;
			this.getAttacked();
    		GameCore.onTurnEnd();
		},
        startTurn : function()
        {
        	this.turn = true;
        	this.startedTurn = false;
        }, 
        endTurn : function()
        {
			this.actions.remaining = 0;
        }, 

		attack : function(targetEnemy)
		{
			console.log('ATTACKING ENEMY ', targetEnemy);
			Chat.push('ATTACKING ENEMY ' + targetEnemy);
			console.log('ENEMY HP BEFORE ', targetEnemy.status.health);
			var attack = Math.random() + this.status.allyBonus + this.status.attackBonus;
			console.log('PLAYER ATTACK ', attack);
			if (attack >= targetEnemy.status.hitChance)
			{
				/*console.log('DEALING DAMAGE ', this.status.damage);
				Chat.push('DEALING DAMAGE ', this.status.damage);
				targetEnemy.takeDamage(this.status.damage);*/
				targetEnemy.death();
			}
			else if (this.canReTryAttack)
			{
				console.log('RETRYING ATTACK');
				Chat.push('RETRYING ATTACK');
				var attack = Math.random() + this.status.allyBonus + this.status.attackBonus;
				console.log('PLAYER ATTACK ', attack);
				if (attack >= targetEnemy.status.hitChance)
				{
					/*console.log('DEALING DAMAGE ', this.status.damage);
					Chat.push('DEALING DAMAGE ', this.status.damage);
					targetEnemy.takeDamage(this.status.damage);*/
					targetEnemy.death();
				}
			}
			console.log('ENEMY HP AFTER ', targetEnemy.status.health);
			this.spendAction();
		}, 
		transition : function(targetDoor)
		{
			console.log('MOVING TO DOOR ', targetDoor);
			Chat.push('MOVING TO DOOR ' + targetDoor);
			this.moveTo(targetDoor.x, targetDoor.y);
			GameCore.movePlayerTo(targetDoor.connectingRoom);
			this.spendAction();
		}, 
		unlock : function(targetDoor)
		{
			console.log('UNLOCK DOOR ', targetDoor);
			Chat.push('UNLOCK DOOR ' + targetDoor);
			targetDoor.unlock();
			if (!this.unlockingTakesNoAction) this.spendAction();
			return;
		}, 
		scavenge : function()
		{
			if (this.inventory.length >= this.status.inventoryCap) return;
			var item = this.currentRoom.getItem();
			if (item == null) return;
			item.init();
			console.log('SCAVENGING FOR ITEM ', item);
			Chat.push('SCAVENGING FOR ITEM ' + item.name);
			this.addItem(item);
			this.spendAction();
		}, 
		ability : function()
		{
			this.spendAction();
		}, 

		spendAction : function()
		{
			this.actions.remaining--;
			this.actions.taken++;
		}, 
		getAttacked : function()
		{
			//console.log('GETTING ATTAKED');
			if (this.currentRoom == null) return;
			if (!this.currentRoom.hasEnemies) return;
            for (var i = 0; i < this.currentRoom.enemies.length; i++)
            {
                var enemy = this.currentRoom.enemies[i];
                enemy.attack(this);
            }
		}, 

		setPosition : function(x, y)
		{
			this.pos.x = x;
			this.pos.y = y;
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
			var disX = this.target.x - this.pos.x;
			var disY = this.target.y - this.pos.y;
			var mag = Math.sqrt((disX * disX) + (disY * disY));
			if (mag > 1)
			{
				var nX = disX / mag;
				var nY = disY / mag;
				this.pos.x += nX;
				this.pos.y += nY;
			}
		},

		giveJob : function(jobName)
		{
			this.jobName = jobName;
		}, 

		addItem : function(item)
		{
			if (this.inventory.length >= this.status.inventoryCap) return;
			item.setPosition(48, 48 + (this.inventory.length * item.image.width));
			this.inventory.push(item);
			//console.log('INVENTORY ', this.inventory);
		}, 
		removeItem : function(index)
		{
			this.inventory.splice(index, 1);
			for (var i = 0; i < this.inventory.length; i++)
			{
				this.inventory[i].setPosition(48, 48 + (i * item.image.width));
			}
		}, 
		useItem : function(targetEntity, index)
		{
			this.removeItem(index);
		},
		giveItem : function(targetPlayer, index)
		{
			var item = this.inventory[index];
			this.removeItem(index);
			targetPlayer.addItem(item);
		}, 

		takeDamage : function(dmgAmount)
		{
			if (this.ignoreNextDamage)
			{
				this.ignoreNextDamage = false;
				return;
			}
			this.status.health -= dmgAmount;
			if(this.status.health <= 0) this.death();
		},

		death : function()
		{
			this.status.health = 0;
			this.status.alive = false;
		}, 

		useJobClass : function(name)
		{
			switch (name)
			{
				case 'Cybernetic Warrior':
				this.status.maxHealth = 7;
				this.status.inventoryCap = 3;
				this.status.actionsCap = 3;
				break;
				case 'Frontman':
				this.status.maxHealth = 12;
				this.status.inventoryCap = 2;
				break;
				case 'PSI Agent':
				this.status.maxHealth = 7;
				this.status.inventoryCap = 3;
				this.status.attackBonus += 0.1;
				break;
				case 'Scavenger':
				this.status.maxHealth = 5;
				this.status.inventoryCap = 4;
				this.status.scavengeChance = 1.0;
				break;
				case 'Scientist':
				this.status.maxHealth = 5;
				this.status.inventoryCap = 3;
				this.unlockingTakesNoAction = true;
				break;
				case 'Navy Officer':
				this.status.maxHealth = 7;
				this.status.inventoryCap = 3;
				this.status.attackBonus += 0.15;
				break;
				case 'Messanger':
				this.status.maxHealth = 5;
				this.status.inventoryCap = 2;
				break;
				case 'Doctor':
				this.status.maxHealth = 7;
				this.status.inventoryCap = 2;
				break;
				case 'Junker':
				this.status.maxHealth = 5;
				this.status.inventoryCap = 4;
				break;
				case 'Space Walker':
				this.status.maxHealth = 7;
				this.status.inventoryCap = 2;
				this.resistances.neurotoxin = true;
				break;
				case 'Civilian':
				this.status.maxHealth = 6;
				this.status.inventoryCap = 3;
				break;

				default:
				break;
			}
			this.status.health = this.status.maxHealth;
			this.jobName = name;
		}, 
	});
});