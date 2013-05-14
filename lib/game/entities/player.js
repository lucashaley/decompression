ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityPlayer = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/player.png', 96, 192),
		size: {x: 96, y:192},	
		flip : false,		
		//Does this player exist?
		active : false,

		//player job, refers to a list
		job : "Frontman",


		// name, portrait image, images for 4 pawn facing directions
		username : "Space Guy",
		portrait: new ig.AnimationSheet('media/playerPortrait.png', 240, 240),

		//Room location, and tile inside that room
		room : {x: 0, y:0},
		tile : {x: 0, y:0},

		facing_direction : "DownRight"

		//is this player's turn active?
		turn : false,

		//HP and other stats
		hp_max : 6,
		hp : 6,

		actions_max : 2,
		actions : 2,

		// Player attack accuracy, damage, possible defense value for evasion, and damage reducing armor
		attack : 0,
		attack_dmg : 1,
		defense : 0,
		armor : 0,

		// number of item slots, and array of item slots
		inventory_max : 4,
		inventory[],
		//inventory[] : {0: 'NULL', 1: "NULL", 2: "NULL", 3: "NULL", 4: "NULL", 5: "NULL"},
		//Constructor and initialization functions
		init : function(x, y, settings, username, job) {
			this.parent( x, y, settings );
			this.username = name;
			this.job = job;
			// Add the animations
			this.addAnim( 'UpIdle', 1, [0] );
			this.addAnim( 'UpWalk', 1, [1] );
			this.addAnim( 'UpAttack', 1, [2] );
			this.addAnim( 'DownIdle', 1, [3] );
			this.addAnim( 'DownWalk', 1, [4] );
			this.addAnim( 'DownAttack', 1, [5] );
			//this.addAnim( 'run', 0.7, [0,1,2,3,4,5] );
			for(var n = 0;n < 6; n++){
				this.inventory[n] = "NULL";
			}
		},

		update : function() {
			this.currentAnim.flip.x = this.flip;
			this.parent();			
		},

		//Functions for events at beginning and end of this player's turn 
		onTurnStart : function() {
			this.actions = this.actions_max;
		},
		onTurnEnd : function() {
			this.active = false;
		},

		// Possible player actions
		moveRooms : function(direction, targetRoom){

			this.facing_direction = direction;
			
			switch(direction){
				case ('UpLeft'):
					this.room.x -= 1;
					this.currentAnim = this.anims.UpIdle;
					this.flip = true;
					break;
				case ('UpRight'):
					this.room.y -= 1;
					this.currentAnim = this.anims.UpIdle;
					this.flip = false;
					break;
				case ('DownLeft'):
					this.room.y += 1;
					this.currentAnim = this.anims.DownIdle;
					this.flip = true;
					break;
				case ('DownRight'):
					this.room.x += 1;
					this.currentAnim = this.anims.DownIdle;
					this.flip = false;
					break;														
			};

			this.room.x = targetRoom.x;
			this.room.y = targetRoom.y;
		},
		attack : function(targetEntity){
			//Roll for attack accuracy
			if(Math.floor((Math.random()*20)+1+this.attack) >= targetEntity.defense) {
				targetEntity.hp -= this.attack_dmg;
			}
			//Subtract action point, check for end of turn
			this.actions -= 1;
			if(this.actions >= 0) {
				this.onTurnEnd();
			};

		},
		loot : function() {
			//Roll to determine item acquired

			//Subtract action point, check for end of turn
			this.actions -= 1;
			if(this.actions >= 0) {
				this.onTurnEnd();
			};
		},

		//use var ability
		ability : function(){

		},
		//use item
		useItem : function(targetEntity, itemSlotNum){

		},

		takeDamage : function(dmgAmount){
			this.hp -= dmgAmount;
		},

		death : function(){
			this.active = false;
		},
	});

/////////////////////////////////////// ITEMS ////////////////////////////
//////////////////////////////////////////////////////////////////////////
	EntityItem = ig.Entity.extend({
		itemSheet: new ig.AnimationSheet('media/itemsLarge.png', 200, 200),
		size: {x: 96, y:96},	
		flip : false,		
		//Does this item exist?
		active : false,

		//item type, refers to a list
		itemType : "NULL",
		itemName : "NULL",
		displayName : "NULL",
		description : "NULL",
		// name, portrait image, images for 4 pawn facing directions

		attackValue : 0,
		defenseValue : 0,
		healValue : 0,
		//number of times an item may be used before destroyed
		uses : 1;

		isJunk : false,
		isHealth : false,
		isKeyCard : false,
		isWeapon : false,
		isTradeable : false,
		isUsable: false;

		//item types
		Junk : 0,
		KeyCard : 1,
		Weapon : 2,
		Healing : 3,
		Misc : 4;
		Trap : 9,		

		init : function(x, y, settings, itemName) {
			this.parent( x, y, settings );
			this.itemName = itemName;
			// Add the animations
			this.addAnim( 'PottedPlant', 1, [0] );
			this.addAnim( 'ScrapParts', 1, [1] );
			this.addAnim( 'KeyCardRed', 1, [2] );
			this.addAnim( 'KeyCardGreen', 1, [3] );
			this.addAnim( 'KeyCardBlue', 1, [4] );
			this.addAnim( 'ShortCircuit', 1, [5] );
			this.addAnim( 'TheyAwaken', 1, [6] );
			this.addAnim( 'LaserTripwire', 1, [7] );
			this.addAnim( 'Water', 1, [8] );
			this.addAnim( 'SubstanceX', 1, [9] );
			this.addAnim( 'HealthKit', 1, [10] );
			this.addAnim( 'SmallSnack', 1, [11] );
			this.addAnim( 'LaserPistol', 1, [12] );
			this.addAnim( 'Shotgun', 1, [13] );
			this.addAnim( 'Backpack', 1, [14] );
			this.addAnim( 'Teleporter', 1, [15] );
			this.addAnim( 'SensorImplant', 1, [16] );
			this.addAnim( 'RepairKit', 1, [17] );
			this.addAnim( 'SystemReset', 1, [18] );
			this.addAnim( 'Reprogrammer', 1, [19] );
			this.addAnim( 'AirMask', 1, [20] );
			this.addAnim( 'RevivalKey', 1, [21] );
			this.addAnim( 'FriendlyDrone', 1, [22] );
			this.addAnim( 'ResourceDetector', 1, [23] );
			this.addAnim( 'OverrideKey', 1, [23] );
			this.addAnim( 'ExoSuit', 1, [23] );

			switch(itemName){
				case ('PottedPlant'):
					displayName = "Potted Plant";					
					itemType = Junk;
					description = "";					
					this.currentAnim = this.anims.PottedPlant;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= false;

					break;
				case ('ScrapParts'):
					displayName = "Scrap Parts";					
					itemType = Junk;
					description = "";				
					this.currentAnim = this.anims.ScrapParts;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= false;

					break;
				case ('KeyCardRed'):
					displayName = "Red Keycard";
					itemType = KeyCard;					
					description = "";
					this.currentAnim = this.anims.KeyCardRed;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= false;

					break;
				case ('KeyCardGreen'):
					displayName = "Green Keycard";					
					itemType = KeyCard;
					description = "";
					this.currentAnim = this.anims.KeyCardGreen;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;
					
					isTradeable = true;
					isUsable= false;

					break;		
				case ('KeyCardBlue'):
					displayName = "KeycardBlue";					
					itemType = KeyCard;
					description = "";
					this.currentAnim = this.anims.KeyCardBlue;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					itemType = Junk;
					
					isTradeable = true;
					isUsable= false;

					break;	
				case ('ShortCircuit'):
					displayName = "Short Circuit";					
					itemType = Trap;
					description = "Immediate 3 damage to player";
					this.currentAnim = this.anims.ShortCircuit;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;
					
					isTradeable = true;
					isUsable= false;

					break;	
				case ('TheyAwaken'):
					displayName = "They Awaken";					
					itemType = Trap;
					description = "Spawn creeps in all unoccupied rooms";
					this.currentAnim = this.anims.TheyAwaken;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;
					
					isTradeable = true;
					isUsable= false;

					break;	
				case ('Water'):
					displayName = "Water";				
					itemType = Healing;
					description = "Restore 1 health point";
					this.currentAnim = this.anims.Water;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 1;
					uses = 1;
					
					isTradeable = true;
					isUsable= true;

					break;
				case ('SubstanceX'):
					displayName = "Substance X";					
					itemType = Healing;
					description = "Restore all health points";
					this.currentAnim = this.anims.SubstanceX;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 10;
					uses = 1;

					isTradeable = true;
					isUsable= true;

					break;
				case ('HealthKit'):
					displayName = "Health Kit";					
					itemType = Healing;
					description = "Restore 3 health points";
					this.currentAnim = this.anims.HealthKit;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 3;
					uses = 1;

					isTradeable = true;
					isUsable= true;

					break;
				case ('SmallSnack'):
					displayName = "Small Snack";					
					itemType = Healing;
					description = "Restore 2 health points";
					this.currentAnim = this.anims.SmallSnack;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 2;
					uses = 1;

					isTradeable = true;
					isUsable= true;

					break;	
				case ('LaserPistol'):
					displayName = "Laser Pistol";					
					itemType = Weapon;
					description = "+2 to attack rolls";
					this.currentAnim = this.anims.LaserPistol;
					
					attackValue = 2;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= false;

					break;	
				case ('Shotgun'):
					displayName = "Shotgun";					
					itemType = Weapon;
					description = "+3 to attack rolls";
					this.currentAnim = this.anims.Shotgun;
					
					attackValue = 3;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= false;

					break;	
				case ('Backpack'):
					displayName = "Backpack";					
					itemType = Misc;
					description = "Max items increased by 2";
					this.currentAnim = this.anims.Backpack;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= false;

					break;
				case ('Teleporter'):
					displayName = "Teleporter";					
					itemType = Misc;
					description = "Instantly move to any explored room";
					this.currentAnim = this.anims.Teleporter;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= true;

					break;
				case ('SensorImplant'):
					displayName = "Sensor Implant";					
					itemType = Misc;
					description = "Get an additional item whenever you loot";
					this.currentAnim = this.anims.SensorImplant;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= true;

					break;
				case ('RepairKit'):
					displayName = "Repair Kit";					
					itemType = Misc;
					description = "Retrieve an item from the discard pile, then discard repair kit";
					this.currentAnim = this.anims.RepairKit;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= true;

					break;
				case ('SystemReset'):
					displayName = "System Reset";					
					itemType = Misc;
					description = "Cancel the current event";
					this.currentAnim = this.anims.SystemReset;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= true;

					break;
				case ('Reprogrammer'):
					displayName = "Reprogrammer";					
					itemType = Misc;
					description = "Destroy any non boss creep";
					this.currentAnim = this.anims.Reprogrammer;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= true;
					
					break;
				case ('AirMask'):
					displayName = "Air Mask";					
					itemType = Misc;
					description = "Take no damage from neurotoxin or nerve gas";
					this.currentAnim = this.anims.AirMask;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= true;
					
					break;
				case ('RevivalKey'):
					displayName = "Revival Key";					
					itemType = Misc;
					description = "Respawn in infirmary or core upon death";
					this.currentAnim = this.anims.RevivalKey;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable = true;
					
					break;
				case ('FriendlyDrone'):
					displayName = "Friendly Drone";					
					itemType = Misc;
					description = "May reroll attack roll 1x per turn";
					this.currentAnim = this.anims.FriendlyDrone;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable = true;
					
					break;
				case ('ResourceDetector'):
					displayName = "Resource Detector";					
					itemType = Misc;
					description = "Refresh room items, spawn a creep";
					this.currentAnim = this.anims.ResourceDetector;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable = true;
					
					break;
				case ('OverrideKey'):
					displayName = "Override Key";					
					itemType = Misc;
					description = "Provides immunity to lockdown";
					this.currentAnim = this.anims.OverrideKey;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable = true;
					
					break;
				case ('ExoSuit'):
					displayName = "ExoSuit";					
					itemType = Misc;
					description = "Decrease all incoming damage by 1";
					this.currentAnim = this.anims.ExoSuit;
					
					attackValue = 0;
					defenseValue = 1;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable = true;
					
					break;
			};
		},

		update : function() {
			this.currentAnim.flip.x = this.flip;
			this.parent();			
		},

		onUse : function(targetEntity, itemName) {
			switch(itemName){
				
				case ('KeyCardRed'):

					break;
				case ('KeyCardGreen'):

					break;		
				case ('KeyCardBlue'):

					break;	
				case ('Water'):
					targetEntity.hp += this.healValue;
					this.uses = 0;
					break;
				case ('SubstanceX'):
					targetEntity.hp += this.healValue;
					this.uses = 0;
					break;
				case ('HealthKit'):
					targetEntity.hp += this.healValue;
					this.uses = 0;
					break;
				case ('SmallSnack'):
					targetEntity.hp += this.healValue;
					this.uses = 0;
					break;	
				case ('Teleporter'):
					//description = "Instantly move to any explored room";
					this.uses = 0;
					break;
				case ('SensorImplant'):
					//description : "Get an additional item whenever you loot";
					this.isTradeable = false;
					isUsable = false;

					break;
				case ('RepairKit'):
					//description : "Retrieve an item from the discard pile, then discard repair kit";
					this.uses = 0;

					break;
				case ('SystemReset'):
					//description : "Cancel the current event";
					this.uses = 0;
					break;
				case ('Reprogrammer'):
					//description : "Destroy any non boss creep";
					this.uses = 0;
					if(!targetEntity.isBoss) {
						targetEntity.hp = 0;	
					} else {
						//Nothing happens
					}
					
					break;
				case ('ResourceDetector'):
					//description : "Refresh room items, spawn a creep";
					this.uses = 0;
					break;
			};
		}, 

		onLoot : function(lootingPlayer) {
			switch(this.itemName){
				case ('ShortCircuit'):
					lootingPlayer.takeDamage(3);

					break;
				case ('TheyAwaken'):

					break;
				case ('LaserTripwire'):

					break;
			};

		},


	});
});