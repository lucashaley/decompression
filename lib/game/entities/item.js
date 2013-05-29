ig.module(
	'game.entities.item'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityItem = ig.Entity.extend({
		JunkSheet: new ig.AnimationSheet('lib/game/media/items/JunkSheet.png', 150, 150),
		KeyCardSheet: new ig.AnimationSheet('lib/game/media/items/KeyCardSheet.png', 150, 150),
		WeaponSheet: new ig.AnimationSheet('lib/game/media/items/WeaponSheet.png', 150, 150),
		HealingSheet: new ig.AnimationSheet('lib/game/media/items/HealingSheet.png', 150, 150),
		AugmentSheet: new ig.AnimationSheet('lib/game/media/items/AugmentSheet.png', 150, 150),
		MiscSheet: new ig.AnimationSheet('lib/game/media/items/MiscSheet.png', 150, 150),
		TrapSheet: new ig.AnimationSheet('lib/game/media/items/TrapSheet.png', 150, 150),
			
		flip : false,		
		//Does this item exist?
		active : false,

		//item type and idNum, refers to a list
		idNum : 0,
		itemType : null,
		itemName : null,
		displayName : null,
		description : null,
		// name, portrait image, images for 4 pawn facing directions

		attackValue : 0,
		defenseValue : 0,
		healValue : 0,
		//number of times an item may be used before destroyed
		uses : 1,

		isJunk : false,
		isHealth : false,
		isKeyCard : false,
		isWeapon : false,
		isTradeable : false,
		isDiscardable : true,
		isUsable: false,

		//enumerated item types
		Junk : 0,
		KeyCard : 1,
		Weapon : 2,
		Healing : 3,
		Augment : 4,
		Misc : 6,
		Trap : 9,	

		init : function(itemName) {
			//this.parent( x, y, settings );
			this.itemName = itemName;
			// Add the animations/images
			//Junk items
			var PottedPlant = new ig.Animation(JunkSheet, 1, [0] );
			var EmptyBottle = new ig.Animation(JunkSheet, 1, [1] );
			var BrokenKeyCard = new ig.Animation(JunkSheet, 1, [2] );
			var WastedAmmo = new ig.Animation(JunkSheet, 1, [3] );
			var ScrapParts = new ig.Animation(JunkSheet, 1, [4] );

			var EmptyBox = new ig.Animation(JunkSheet, 1, [5] );
			var VideoGame = new ig.Animation(JunkSheet, 1, [6] );
			var PowerlessCellPhone = new ig.Animation(JunkSheet, 1, [7] );
			var TrashedPapers = new ig.Animation(JunkSheet, 1, [8] );
			var PowerCord = new ig.Animation(JunkSheet, 1, [9] );
			// Key items
			var KeyCardRed = new ig.Animation(KeyCardSheet, 1, [0] );
			var KeyCardGreen = new ig.Animation(KeyCardSheet, 1, [1] );
			var KeyCardBlue = new ig.Animation(KeyCardSheet, 1, [2] );
			// Weapon items
			var WeaponModA = new ig.Animation(WeaponSheet, 1, [0] );
			var WeaponModB = new ig.Animation(WeaponSheet, 1, [1] );
			// Healing items
			var Water = new ig.Animation(HealingSheet, 1, [0] );
			var SubstanceX = new ig.Animation(HealingSheet, 1, [1] );
			var HealthKit = new ig.Animation(HealingSheet, 1, [2] );
			var SmallSnack = new ig.Animation(HealingSheet, 1, [3] );
			//Augmentation items
			var SensorImplant = new ig.Animation(AugmentSheet, 1, [0] );
			var ExoSuit = new ig.Animation(AugmentSheet, 1, [1] );			

			//Misc items
			var Backpack = new ig.Animation(MiscSheet, 1, [0] );
			var Teleporter = new ig.Animation(MiscSheet, 1, [1] );
			var Repairkit = new ig.Animation(MiscSheet, 1, [2] );
			var SystemReset = new ig.Animation(MiscSheet, 1, [3] );
			var Reprogrammer = new ig.Animation(MiscSheet, 1, [4] );

			var AirMask = new ig.Animation(MiscSheet, 1, [5] );
			var RevivalKey = new ig.Animation(MiscSheet, 1, [6] );
			var FriendlyDrone = new ig.Animation(MiscSheet, 1, [7] );
			var ResourceDetector = new ig.Animation(MiscSheet, 1, [8] );
			var OverrideKey = new ig.Animation(MiscSheet, 1, [9] );			
			
			//Trap items
			var ShortCircuit = new ig.Animation(TrapSheet, 1, [0] );
			var TheyAwaken = new ig.Animation(TrapSheet, 1, [1] );
			var LaserTripwire = new ig.Animation(TrapSheet, 1, [2] );

			switch(itemName){
				case ('PottedPlant'):
				case (0):
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
				case ('EmptyBottle'):
				case (1):
					idNum = 1;
					displayName = "EmptyBottle";					
					itemType = Junk;
					description = "";					
					this.currentAnim = this.anims.EmptyBottle;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable = false;

					break;
				case ('BrokenKeyCard'):
				case (2):
					idNum = 2;
					displayName = "Broken Keycard";					
					itemType = Junk;
					description = "";					
					this.currentAnim = this.anims.BrokenKeyCard;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable = false;

					break;
				case ('WastedAmmo'):
				case (3):
					idNum = 3;
					displayName = "Wasted Ammo";					
					itemType = Junk;
					description = "";					
					this.currentAnim = this.anims.WastedAmmo;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable = false;

					break;															
				case ('ScrapParts'):
				case (4):
					idNum = 4;
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
				case ('EmptyBox'):
				case (5):
					idNum = 5;
					displayName = "Empty Box";					
					itemType = Junk;
					description = "";				
					this.currentAnim = this.anims.EmptyBox;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= false;

					break;		
				case ('VideoGame'):
				case (6):
					idNum = 6;
					displayName = "Video Game";					
					itemType = Junk;
					description = "";				
					this.currentAnim = this.anims.VideoGame
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= false;

					break;	
				case ('PowerlessCellPhone'):
				case (7):
					idNum = 7;
					displayName = "Powerless Cellphone";					
					itemType = Junk;
					description = "";				
					this.currentAnim = this.anims.PowerlessCellPhone;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= false;

					break;											
				case ('TrashedPapers'):
				case (8):
					idNum = 8;
					displayName = "Trashed Papers";					
					itemType = Junk;
					description = "";				
					this.currentAnim = this.anims.TrashedPapers;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= false;

					break;		
				case ('PowerCord'):
				case (9):
					idNum = 9;
					displayName = "Power Cord";					
					itemType = Junk;
					description = "";				
					this.currentAnim = this.anims.PowerCord;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= false;

					break;														

				case ('KeyCardRed'):
				case (10):
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
					isDiscardable = false;

					break;
				case ('KeyCardGreen'):
				case (11):
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
					isDiscardable = false;

					break;		
				case ('KeyCardBlue'):
				case (12):
					idNum = 12;
					displayName = "KeycardBlue";					
					itemType = KeyCard;
					description = "";
					this.currentAnim = this.anims.KeyCardBlue;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;
					
					isTradeable = true;
					isUsable= false;
					isDiscardable = false;

					break;	
				case ('WeaponModA'):
				case (20):
					idNum = 20;
					displayName = "Weapon Mod A";					
					itemType = Weapon;
					description = "+2 to attack rolls";
					this.currentAnim = this.anims.WeaponModA;
					
					attackValue = 2;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= false;

					break;	
				case ('WeaponModB'):
				case (21):
					idNum = 21;
					displayName = "Weapon Mod B";					
					itemType = Weapon;
					description = "+3 to attack rolls";
					this.currentAnim = this.anims.WeaponModB;
					
					attackValue = 3;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= false;

					break;					
				case ('Water'):
				case (30):
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
				case (31):
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
				case (32):
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
				case (33):
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
				case ('SensorImplant'):
				case (40):
					idNum = 40;
					displayName = "Sensor Implant";					
					itemType = Augment;
					description = "Get an additional item whenever you loot";
					this.currentAnim = this.anims.SensorImplant;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= true;

					break;	
				case ('ExoSuit'):
				case (49):
					idNum = 41;
					displayName = "ExoSuit";					
					itemType = Augment;
					description = "Decrease all incoming damage by 1";
					this.currentAnim = this.anims.ExoSuit;
					
					attackValue = 0;
					defenseValue = 1;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable = true;
					
					break;									
				case ('Backpack'):
				case (60):
					idNum = 60;
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
				case (61):
					idNum = 61;
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
				case ('RepairKit'):
				case (62):
					idNum = 62;
					displayName = "Repair Kit";					
					itemType = Misc;
					description = "Repair a junk item";
					this.currentAnim = this.anims.RepairKit;
					
					attackValue = 0;
					defenseValue = 0;
					healValue = 0;
					uses = 1;

					isTradeable = true;
					isUsable= true;

					break;
				case ('SystemReset'):
				case (63):
					idNum = 63;
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
				case (64):
					idNum = 64;
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
				case (65):
					idNum = 65;
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
				case (66):
					idNum = 66;
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
				case (67):
					idNum = 67;
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
				case (68):
					idNum = 68;
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
				case (69):
					idNum = 69;
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

		generateRandom : function() {
			this.init(Math.floor(Math.random()*99)+1);
			while(this.itemType = null) {
				this.init(Math.floor(Math.random()*99)+1);
			}			
		}

	});
});