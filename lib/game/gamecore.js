ig.module(
	'game.gamecore'
)
.requires(
	'impact.entity',
	'game.entities.item',
	'game.entities.player',
	'game.entities.enemy'
)
.defines(function(){
	EntityGameCore = ig.Entity.extend({
		//animSheet: new ig.AnimationSheet('media/sfxSheet.png', 96, 192),
		//size: {x: 96, y:96},	
		//flip : false,		

		// name, portrait image, images for 4 pawn facing directions
		gamename : "Game Name",

		//Data!!!
		playerMax : 6,
		playerCount : 4,
		cyclesMax : 20,
		cyclesRemaining : 20,
		roomMax : 30,
		roomsFound : 0,
		
		KeyCardRedFound : false,
		KeyCardGreenFound : false,
		KeyCardBlueFound : false,

		bossInCore : false,

		//Players total health as percentage
		playerTeamHealth : 1.0,

        // Load the list of game items
        players : new Array(),
        itemList : new Array(),
        enemyList : new Array(),

		//which player's turn is active?
		activePlayer : 0,

		// Game states
		stateGameStart : 0,
		stateTurnStart : 1,
		stateTurnMid : 2,
		stateTurnEnd : 3,
		stateCreateEvent : 4,
		stateGameEnd : 9,
		

		//Constructor and initialization functions
		init : function(x, y, settings, playerCount) {
			this.parent( x, y, settings );
			this.playerCount = playerCount;
	        // function to append to the list
	        itemList.prototype.appendItem = function (num,name){
	            //Adds item to the array, num is both slot number and idNum
	            this[num].itemName = name;
	            this[num].idNum = num;
	        },   			

            ////////////////Create the list of items////////
            // Junk items
            itemList.appendItem(0, 'PottedPlant');
            itemList.appendItem(1, 'EmptyBottle');
            itemList.appendItem(2, 'BrokenKeyCard');
            itemList.appendItem(3, 'WastedAmmo');
            itemList.appendItem(4, 'ScrapParts');

            itemList.appendItem(5, 'EmptyBox');
            itemList.appendItem(6, 'VideoGame');
            itemList.appendItem(7, 'PowerlessCellPhone');
            itemList.appendItem(8, 'TrashedPapers');
            itemList.appendItem(9, 'PowerCord');
            
            // Key items
            itemList.appendItem(10, 'KeyCardRed');
            itemList.appendItem(11, 'KeyCardGreen');
            itemList.appendItem(12, 'KeyCardBlue');

            // Weapon items
            itemList.appendItem(20, 'WeaponModA');
            itemList.appendItem(21, 'WeaponModB');

            // Healing items
            itemList.appendItem(30, 'Water');
            itemList.appendItem(31, 'HealthKit');
            itemList.appendItem(32, 'SmallSnack');
            itemList.appendItem(33, 'SubstanceX');
            //Augmentation items
            itemList.appendItem(40, 'SensorImplant');
            itemList.appendItem(49, 'ExoSuit');
            // Misc items
            itemList.appendItem(60, 'Backpack');
            itemList.appendItem(61, 'Teleporter');
            itemList.appendItem(62, 'RepairKit');
            itemList.appendItem(63, 'SystemReset');
            itemList.appendItem(64, 'Reprogrammer');

            itemList.appendItem(65, 'AirMask');
            itemList.appendItem(66, 'RevivalKey');
            itemList.appendItem(67, 'FriendlyDrone');
            itemList.appendItem(68, 'ResourceDetector');
            itemList.appendItem(69, 'OverrideKey');
            

            // Trap triggering items
            itemList.appendItem(90, 'ShortCircuit');
            itemList.appendItem(91, 'TheyAwaken');
            itemList.appendItem(92, 'LaserTripwire');			
			
		},

		update : function() {
			this.parent();			
		},

		//Functions for events at beginning and end of this player's turn 
		onPhaseStart : function() {
			
		},
		onPhaseEnd : function() {
			
		},

		onCycleStart : function() {
					
		},

		onCycleEnd : function() {


		},		
		onTurnStart : function() {
			activePlayer.onTurnStart();
		},
		onTurnEnd : function() {
			
			activePlayer.onTurnEnd();
			activePlayer += 1;
			if(activePlayer > playerMax) {
				activePlayer = 0;	
				cyclesRemaining -= 1;	
				onCycleEnd();
				onCycleStart();	
			}
		},

	});

});