ig.module(
	'game.entities.item'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityItem = ig.Entity.extend({
		itemSheet: new ig.AnimationSheet('media/itemsLarge.png', 150, 150),
		size: {x: 96, y:96},	
		flip : false,		
		//Does this item exist?
		active : false,

		//item type and idNum, refers to a list
		idNum : 0,
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

		//enumerated item types
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
			this.addAnim( 'OverrideKey', 1, [24] );
			this.addAnim( 'ExoSuit', 1, [25] );
			switch(itemName){
				case ('PottedPlant'):
					idNum = 0;
					displayName = "Potted Plant";					
					itemType = Junk;
					description = "";					
					this.currentAnim = this.anims.PottedPlant;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable = false;

					break;
				case ('ScrapParts'):
					idNum = 1;
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
					idNum = 10;
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
					idNum = 11;
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
					idNum = 12;
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
				case ('LaserPistol'):
					idNum = 20;
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
					idNum = 21;
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
				case ('Water'):
					idNum = 30;
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
				case ('HealthKit'):
					idNum = 31;
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
					idNum = 32;
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
				case ('SubstanceX'):
					idNum = 33;
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
				case ('Backpack'):
					idNum = 40;
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
					idNum = 41;
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
					idNum = 42;
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
					idNum = 43;
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
					idNum = 44;
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
					idNum = 45;
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
					idNum = 46;
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
					idNum = 47;
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
					idNum = 48;
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
					idNum = 49;
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
					idNum = 50;
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
					idNum = 51;
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
				case ('ShortCircuit'):
					idNum = 90;
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
				case ('LaserTripwire'):
					idNum = 91;
					displayName = "They Awaken";					
					itemType = Trap;
					description = "Spawn a boss in the Core";
					this.currentAnim = this.anims.LaserTripwire;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;
					
					isTradeable = false;
					isUsable= false;

					break;					
				case ('TheyAwaken'):
					idNum = 92;
					displayName = "They Awaken";					
					itemType = Trap;
					description = "Spawn creeps in all unoccupied rooms";
					this.currentAnim = this.anims.TheyAwaken;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;
					
					isTradeable = false;
					isUsable= false;

					break;						
			};
		},

		update : function() {
			this.currentAnim.flip.x = this.flip;
			this.parent();			
		},
		//When this item is used by the player
		onUse : function(usingPlayer, targetEntity, itemName) {
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
				case ('HealthKit'):
					targetEntity.hp += this.healValue;
					this.uses = 0;
					break;
				case ('SmallSnack'):
					targetEntity.hp += this.healValue;
					this.uses = 0;
					break;	
				case ('SubstanceX'):
					targetEntity.hp += this.healValue;
					this.uses = 0;
					break;					
				case ('Teleporter'):
					//description = "Instantly move to any explored room";
					this.uses = 0;
					break;
				case ('SensorImplant'):
					//description : "Get an additional item whenever you loot";
					usingPlayer.hasSensorImplant = true;
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
		//When this item is first picked up by lootingPlayer
		onLoot : function(gameLogic, lootingPlayer) {
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
		//When this item is removed from player inventory
		remove : function() {

		},

	});
});