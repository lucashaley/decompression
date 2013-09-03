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
		stopped : true, 

		animSheet : null, 

		name : "Space Guy", 
		jobName : "Civilian", 

		turn : false,
		startedTurn : false, 
		flipped: false,

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
		implants : 
		{
			sensor : false, 
			discovery : false, 
			defense : false, 
			command : false, 
			reflex : false, 
			quantum : false, 
		}, 

		actions : 
		{
			remaining : 0, 
			taken : 0, 
			usedAbility : false, 
		},

		abilityName : "None", 
		hasAbility : false, 
		
		canReTryAttack : false,
		ignoreNextDamage : false,
		unlockingTakesNoAction : false, 
		ignoreLockDown : false, 
		enableHealButton : false, 

		limitActions : false, 
		disableBonuses : false, 
		disableAbility : false, 

		init : function()
		{
		},

		update : function()
		{
			this.parent();
			this.animSheet.update();
			if (this.turn && this.currentRoom != null) this.onTurnUpdate();
			this.onMoveUpdate();
		},

        draw: function()
        {
        	glSetFlipped(this.flipped);
			this.animSheet.draw(this.pos.x, this.pos.y - (this.size.y / 2), this.currentRoom);
			glSetFlipped(false);
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
    			//console.log('SCAVENGING');
    			this.scavenge();
    			GameCore.selectedScavenge = false;
    		}

    		if (this.hasAbility && !this.actions.usedAbility && !this.disableAbility && GameCore.selectedUseAbility)
    		{
    			this.ability();
    			GameCore.selectedUseAbility = false;
    		}
    		if (GameCore.selectedUseItem && GameCore.targetedItem != null)
    		{
    			this.useItem(GameCore.targetedItem);
    			GameCore.selectedUseItem = false;
    			GameCore.targetedItem = null;
    		}
    		if (GameCore.selectedLockItem && GameCore.targetedItem != null)
    		{
    			GameCore.targetedItem.onLock(this);
    			GameCore.selectedLockItem = false;
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
			if (!this.status.alive)
			{
				this.respawn();
			}
			Chat.push(this.name + ScriptCore.PlayerStartTurn);
        	this.turn = true;
        	this.startedTurn = false;
			this.actions.remaining = this.status.actionsCap;
			this.actions.taken = 0;
			this.actions.usedAbility = false;
		},
		onTurnEnd : function()
		{
			Chat.push(this.name + ScriptCore.PlayerEndTurn);
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
			//console.log(this.name, 'ATTACKING ENEMY ', targetEnemy);
			Chat.push(this.name + ScriptCore.PlayerAttackingEnemy + targetEnemy.name);
			var bonus = this.status.allyBonus + this.status.attackBonus;
			if (this.disableBonuses) bonus = 0;
			var attack = Math.random() - bonus;
			//console.log('PLAYER ATTACK ', attack, bonus);
			if (attack <= targetEnemy.status.hitChance && !targetEnemy.indestructible)
			{
				targetEnemy.death();
			}
			else if (this.canReTryAttack)
			{
				Chat.push(ScriptCore.PlayerAttackMissed);
				Chat.push(ScriptCore.PlayerRetryAttack);
				var attack = Math.random() - bonus;
				//console.log('PLAYER ATTACK ', attack, bonus);
				if (attack <= targetEnemy.status.hitChance && !targetEnemy.indestructible)
				{
					targetEnemy.death();
				}
				else
				{
					Chat.push(ScriptCore.PlayerAttackMissed);
					targetEnemy.onPlayerMiss();
				}
			}
			else
			{
				Chat.push(ScriptCore.PlayerAttackMissed);
				targetEnemy.onPlayerMiss();
			}
			this.spendAction();
		}, 
		transition : function(targetDoor)
		{
			if (this.currentRoom.isLockedDown && !this.ignoreLockDown)
			{
				Chat.push(ScriptCore.PlayerDoorLockedDown);
				return;
			}
            GameCore.currentRoom.onPlayerExit();
			Chat.push(ScriptCore.PlayerMoveThroughDoor);
			this.moveTo(targetDoor.x, targetDoor.y);
			GameCore.movePlayerTo(targetDoor.connectingRoom);

            var cx = canvas.width / 2;
            var cy = canvas.height / 2;
            GameCore.currentRoom.setPosition(cx + (targetDoor.transitionDirection.x * canvas.width), cy + (targetDoor.transitionDirection.y * 240));
            GameCore.currentRoom.moveTo(cx, cy);
            GameCore.lastRoom.moveTo(cx + (-targetDoor.transitionDirection.x * canvas.width), cy + (-targetDoor.transitionDirection.y * 240));

			var notDiscovered = GameCore.explored.indexOf(this.currentRoom) < 0;
            GameCore.currentRoom.onPlayerEnter();

			if (notDiscovered && this.implants.discovery) return;
			this.spendAction();
		}, 
		unlock : function(targetDoor)
		{
			Chat.push(ScriptCore.PlayerUnlockDoor);
			targetDoor.unlock();
			if (!this.unlockingTakesNoAction) this.spendAction();
			return;
		}, 
		scavenge : function()
		{
			if (!this.currentRoom.hasItems)
			{
				Chat.push();
				return;
			}
			if (this.inventory.length >= this.status.inventoryCap)
			{
				Chat.push(ScriptCore.PlayerScavengeFullInventory);
				return;
			}
			var item = null;
            var chance = Math.random();
            if (chance <= this.status.scavengeChance || this.implants.sensor)
            {
            	item = this.currentRoom.getItem();
            }
			else
			{
				item = ItemCore.requestJunk();
			}
			if (item == null) return;
			item.init();
			Chat.push(ScriptCore.PlayerScavenge + item.name);
			this.addItem(item);
			this.spendAction();
		}, 
		ability : function()
		{
			switch (this.abilityName)
			{
				case "Heal":
				this.heal(2);
				break;

				case "Convert Junk":
				var item1 = null;
				var item2 = null;
				var junkFound = 0;
				for (var i = 0; i < this.inventory.length; i++)
				{
					item = this.inventory[i];
					if (item.isJunk)
					{
						junkFound++;
						if (foundJunk == 1) item1 = item;
						else if (foundJunk == 2) item2 = item;
						break;
					}
				}
				if (junkFound != 2 || item1 == null || item2 == null)
				{
					Chat.push(ScriptCore.PlayerNeedJunk);
					return;
				}

				Chat.push(ScriptCore.PlayerConvertJunk);
				this.removeItem(item1);
				this.removeItem(item2);
				this.addItem(ItemCore.generateRandomNonKeycardItem());
				break;

				default:
				break;
			}
    		this.actions.usedAbility = true;
			this.spendAction();
		}, 
		respawn : function()
		{
			Chat.push(this.name + ScriptCore.PlayerRespawnCivilian);
			this.useJobClass('Civilian');
			this.status.alive = true;
			if (this.implants.quantum)
			{
				var infirmary = GameCore.getRoomByName('Infirmary');
				if (infirmary != null)
				{
					GameCore.movePlayerTo(infirmary);
		            GameCore.currentRoom.onPlayerEnter();
				}
			}
		}, 

		spendAction : function()
		{
			this.currentRoom.onPlayerAction();
			this.actions.remaining--;
			this.actions.taken++;
			if (this.limitActions) this.actions.remaining = 0;
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
			this.stopped = false;
		}, 
		onMoveUpdate : function()
		{
			if (this.stopped) return;
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
			else this.stopped = true;
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
			Chat.push(ScriptCore.PlayerUseItem + item.name);
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
			Chat.push(ScriptCore.PlayerGiveItem + item.name);
			this.removeItem(item);
			targetPlayer.addItem(item);
		}, 
		destroyItem : function(item)
		{
			if (item == null) return;
			Chat.push(ScriptCore.PlayerDestroyItem + item.name);
			this.removeItem(item);
		}, 

		takeDamage : function(dmgAmount, isNeurotoxin)
		{
			if (this.ignoreNextDamage)
			{
				this.ignoreNextDamage = false;
				Chat.push(ScriptCore.PlayerIgnoreDamage);
				return;
			}
			if (isNeurotoxin && this.resistances.neurotoxin)
			{
				Chat.push(ScriptCore.PlayerImmuneNeurotoxin);
				return;
			}
			this.status.health -= dmgAmount;
			if(this.status.health <= 0) this.death();
		}, 
		heal : function(amount)
		{
			if (this.status.health >= this.status.maxHealth)
			{
				Chat.push(ScriptCore.PlayerHealAlreadyFull);
				return;
			}
			Chat.push(ScriptCore.PlayerHeal + amount);
			this.status.health += amount;
			if (this.status.health > this.status.maxHealth) this.status.health = this.status.maxHealth;
		}, 

		death : function()
		{
			Chat.push(this.name + ScriptCore.PlayerDeath);
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
				this.abilityName = "Heal";
				this.hasAbility = true;
				break;
				case 'Cybernetic Warrior':
				this.status.maxHealth = 7;
				this.status.inventoryCap = 3;
				this.status.actionsCap = 3;
				break;
				case 'Junker':
				this.status.maxHealth = 5;
				this.status.inventoryCap = 4;
				this.abilityName = "Convert Junk";
				this.hasAbility = true;
				break;
				case 'Space Walker':
				this.status.maxHealth = 7;
				this.status.inventoryCap = 2;
				this.addItem(ItemCore.generateRandomNonKeycardItem());
				this.addItem(ItemCore.generateRandomNonKeycardItem());
				break;
				case 'Civilian':
				this.status.maxHealth = 3;
				this.status.inventoryCap = 1;
				this.status.actionsCap = 2;
				this.status.scavengeChance = 0.5;
				this.unlockingTakesNoAction = false;
				this.ignoreLockDown = false;
				this.abilityName = "None";
				this.hasAbility = false;
				break;

				default:
				break;
			}
			this.animSheet = AssetCore.requestAnim('Player');
			this.size.x = this.animSheet.sheet.cellw;
			this.size.y = this.animSheet.sheet.cellh;
			this.status.health = this.status.maxHealth;
			this.jobName = name;
		}, 
	});
});