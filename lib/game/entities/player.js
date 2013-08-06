ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({

		pos : {x : 0, y : 0, }, 
        size : {x : 0, y : 0, }, 
		target : {x : 0, y : 0, }, 

		animSheet : null, 

		name : "Space Guy", 
		jobName : "Civilian", 

		turn : false,
		startedTurn : false, 

		job : null,
		inventory : new Array(), 
		currentRoom : null, 

		status : 
		{
			alive : true, 
			health : 6, 
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
			usedAbility : false, 
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
		ignoreLockDown : false, 
		enableHealButton : false, 

		init : function()
		{
		},

		update : function()
		{
			this.parent();
			this.animSheet.update();
			if (!this.status.alive) this.useJobClass('Civilian');
			if (this.turn && this.currentRoom != null) this.onTurnUpdate();
			this.onMoveUpdate();
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
    		if (GameCore.selectedUnlock && !this.currentRoom.isLockedDown && GameCore.targetedDoor != null)// selected move action
    		{
    			this.unlock(GameCore.targetedDoor);
    			GameCore.selectedUnlock = false;
    			GameCore.targetedDoor = null;
    		}
    		if (GameCore.selectedScavenge && this.currentRoom.canScavenge && this.currentRoom.hasItems)// selected scavenge action
    		{
    			console.log('SCAVENGING');
    			this.scavenge();
    			GameCore.selectedScavenge = false;
    		}

    		if (!this.actions.usedAbility && GameCore.selectedUseAbility)
    		{
    			this.ability();
    			this.actions.usedAbility = true;
    			GameCore.selectedUseAbility = false;
    		}
    		if (GameCore.selectedUseItem && GameCore.targetedItem != null)
    		{
    			this.useItem(GameCore.targetedItem);
    			GameCore.selectedUseItem = false;
    			GameCore.targetedItem = null;
    		}
    		if (GameCore.selectedDestroyItem && GameCore.targetedItem != null)
    		{
    			this.destroyItem(GameCore.targetedItem);
    			GameCore.selectedDestroyItem = false;
    			GameCore.targetedItem = null;
    		}

    		if (this.actions.remaining < 1)
    		{
    			this.onTurnEnd();
    		}
        }, 
		onTurnStart : function()
		{
    		GameCore.onTurnStart();
			Chat.push('STARING MY TURN ' + this.name);
        	this.turn = true;
        	this.startedTurn = false;
			this.actions.remaining = this.status.actionsCap;
			this.actions.taken = 0;
			this.actions.usedAbility = false;
		},
		onTurnEnd : function()
		{
			Chat.push('ENDING MY TURN ' + this.name);
        	this.turn = false;
    		this.onStartTurn = false;
			this.actions.remaining = 0;
			this.actions.taken = 0;
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
			console.log(this.name, 'ATTACKING ENEMY ', targetEnemy);
			Chat.push(this.name + ' ATTACKING ENEMY ' + targetEnemy.name);
			var bonus = this.status.allyBonus + this.status.attackBonus;
			var attack = Math.random() - bonus;
			console.log('PLAYER ATTACK ', attack, bonus);
			if (attack <= targetEnemy.status.hitChance && !targetEnemy.indestructible)
			{
				targetEnemy.death();
			}
			else if (this.canReTryAttack)
			{
				Chat.push('ATTACK MISSED');
				Chat.push('RETRYING ATTACK');
				var attack = Math.random() - bonus;
				console.log('PLAYER ATTACK ', attack, bonus);
				if (attack <= targetEnemy.status.hitChance && !targetEnemy.indestructible)
				{
					targetEnemy.death();
				}
				else
				{
					Chat.push('ATTACK MISSED');
					targetEnemy.onPlayerMiss();
				}
			}
			else
			{
				Chat.push('ATTACK MISSED');
				targetEnemy.onPlayerMiss();
			}
			this.spendAction();
		}, 
		transition : function(targetDoor)
		{
			if (this.currentRoom.isLockedDown && !this.ignoreLockDown)
			{
				Chat.push("THE ROOM IS LOCKED DOWN");
				return;
			}
            GameCore.currentRoom.onPlayerExit();
			Chat.push('MOVING TO DOOR');
			this.moveTo(targetDoor.x, targetDoor.y);
			GameCore.movePlayerTo(targetDoor.connectingRoom);
            GameCore.currentRoom.onPlayerEnter();
			this.spendAction();
		}, 
		unlock : function(targetDoor)
		{
			Chat.push('UNLOCK DOOR');
			targetDoor.unlock();
			if (!this.unlockingTakesNoAction) this.spendAction();
			return;
		}, 
		scavenge : function()
		{
			if (!this.currentRoom.hasItems)
			{
				Chat.push('ROOM HAS NO ITEMS');
				return;
			}
			if (this.inventory.length >= this.status.inventoryCap)
			{
				Chat.push('INVENTORY IS FULL');
				return;
			}
			var item = null;
            var chance = Math.random();
            if (chance <= this.status.scavengeChance)
            {
            	item = this.currentRoom.getItem();
            }
			else
			{
				item = ItemCore.requestJunk();
			}
			if (item == null) return;
			item.init();
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

		giveJob : function(jobName)
		{
			this.jobName = jobName;
		}, 

		addItem : function(item)
		{
			if (this.inventory.length >= this.status.inventoryCap) return;
			if (item == null) return;
			this.inventory.push(item);
			item.onPlayerGet(this);
		}, 
		removeItem : function(item)
		{
			if (item == null) return;
			var index = -1;
			for (var i = 0; i < this.inventory.length; i++)
			{
				if (this.inventory[i] == item) index = i;
			}
			if (index < 0) return;
			var item = this.inventory[index];
			this.inventory.splice(index, 1);
			item.onPlayerRemove(this);
		}, 

		useItem : function(item)
		{
			if (item == null) return;
			Chat.push('USING ITEM ' + item.name);
			if (item.canUse(this))
			{
				item.onUse(this);
				if (item.isAction) this.spendAction();
				Chat.push(item.useText);
				if (item.destroyOnActivate) this.removeItem(item);
			}
			else
			{
				Chat.push(item.cannotUseText);
			}
		}, 
		giveItem : function(targetPlayer, item)
		{
			if (item == null) return;
			Chat.push('GIVING ITEM ' + item.name);
			this.removeItem(item);
			targetPlayer.addItem(item);
		}, 
		destroyItem : function(item)
		{
			if (item == null) return;
			Chat.push('DESTROYING ITEM ' + item.name);
			this.removeItem(item);
		}, 

		takeDamage : function(dmgAmount)
		{
			if (this.ignoreNextDamage)
			{
				this.ignoreNextDamage = false;
				Chat.push('THE DAMAGE IS IGNORED');
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
				case 'Navy Officer':
				this.status.maxHealth = 7;
				this.status.inventoryCap = 3;
				this.status.attackBonus += 0.15;
				break;
				case 'Frontman':
				this.status.maxHealth = 12;
				this.status.inventoryCap = 2;
				break;
				case 'Scavenger':
				this.status.maxHealth = 5;
				this.status.inventoryCap = 4;
				this.status.scavengeChance = 1.0;
				break;
				case 'PSI Agent':
				this.status.maxHealth = 7;
				this.status.inventoryCap = 3;
				this.status.attackBonus += 0.1;
				break;
				case 'Scientist':
				this.status.maxHealth = 5;
				this.status.inventoryCap = 3;
				this.unlockingTakesNoAction = true;
				break;
				case 'Messanger':
				this.status.maxHealth = 5;
				this.status.inventoryCap = 2;
				this.ignoreLockDown = true;
				break;
				case 'Doctor':
				this.status.maxHealth = 7;
				this.status.inventoryCap = 2;
				break;
				case 'Cybernetic Warrior':
				this.status.maxHealth = 7;
				this.status.inventoryCap = 3;
				this.status.actionsCap = 3;
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
				this.status.maxHealth = 3;
				this.status.inventoryCap = 1;
				break;

				default:
				break;
			}
			this.animSheet = AssetCore.animations.testSheet;
			this.size.x = this.animSheet.sheet.cellw;
			this.size.y = this.animSheet.sheet.cellh;
			this.status.health = this.status.maxHealth;
			this.jobName = name;
		}, 
	});
});