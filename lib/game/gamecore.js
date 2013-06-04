ig.module(
	'game.gamecore'
)
.requires(
	'impact.entity',
	'game.entities.item',
	'game.entities.player',
	'game.entities.jobs.civilian',
	'game.entities.jobs.frontman',
	'game.entities.jobs.scavenger',
	'game.entities.jobs.psiAgent',
	'game.entities.jobs.doctor',
	'game.entities.jobs.cyberneticWarrior',
	'game.entities.jobs.junker',

	'game.entities.enemy',
	'game.entities.enemies.smallRoamer',
	'game.entities.enemies.corruptedScout',
	'game.entities.enemies.suicidalDrone',
	'game.entities.enemies.mediBot',
	'game.entities.enemies.navGuide',
	'game.entities.enemies.crewAutotron',
	'game.entities.enemies.bionicZombie'
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
        playerJobList : new Array(),
        itemList : new Array(),
        enemyList : new Array(),

		//which player's turn is active? Turn time limits in seconds
		activePlayer : 0,
		activePlayerTimeMax : 30,
		activePlayerTimeLeft : 0,

		// Game states
		stateGameStart : 0,
		stateTurnStart : 1,
		stateTurnMid : 2,
		stateTurnEnd : 3,
		stateCreateEvent : 4,
		stateGameEnd : 9,
		

		//Constructor and initialization functions
		init : function(playerCount) {
			//this.parent( x, y, settings );
			this.playerCount = playerCount;

	        ////////////////Create the list of player jobs/////////		
	        for (var i = 0; i < 20; i++) {
            	this.playerJobList.appendItem(i, null);
            	this.playerJobList[i] = 0;
            }
            this.playerJobList.appendItem(0, 'Civilian');
            this.playerJobList.appendItem(1, 'Frontman');
            this.playerJobList.appendItem(2, 'Scavenger');
            this.playerJobList.appendItem(3, 'Scientist');
            this.playerJobList.appendItem(4, 'PsiAgent');
            this.playerJobList.appendItem(5, 'Messenger');
            this.playerJobList.appendItem(6, 'Doctor');
            this.playerJobList.appendItem(7, 'Engineer');
            this.playerJobList.appendItem(8, 'CyberneticWarrior');
            this.playerJobList.appendItem(9, 'Junker');
            this.playerJobList.appendItem(10, 'Sniper');
            this.playerJobList.appendItem(11, 'SpaceWalker');
            this.playerJobList.appendItem(12, 'NavyOfficer');

            this.playerJobList[0].entity = new EntityPlayerCivilian('');
            this.playerJobList[1].entity = new EntityPlayerFrontman('');
            this.playerJobList[2].entity = new EntityPlayerScavenger('');
            this.playerJobList[3].entity = new EntityPlayerCivilian('');
            this.playerJobList[4].entity = new EntityPlayerPsiAgent('');
            this.playerJobList[5].entity = new EntityPlayerCivilian('');
            this.playerJobList[6].entity = new EntityPlayerDoctor('');
            this.playerJobList[7].entity = new EntityPlayerCivilian('');
            this.playerJobList[8].entity = new EntityPlayerCyberneticWarrior('');
            this.playerJobList[9].entity = new EntityPlayerJunker('');
            this.playerJobList[10].entity = new EntityPlayerCivilian('');
            this.playerJobList[11].entity = new EntityPlayerCivilian('');
            this.playerJobList[12].entity = new EntityPlayerCivilian('');
          
            ////////////////Create the list of players/////////////	
            for(var p = 0; p < this.playerMax; p++) {
            	this.players[p] = 0;
            	this.players[p] = this.playerJobList[0].entity;
            }

            ////////////////Create the list of items///////////////
            for (var i = 0; i < 99; i++) {
            	this.itemList.appendItem(i, null);
            	this.itemList[i] = 0;
            }
            // Junk items
            this.itemList.appendItem(0, 'PottedPlant');
            this.itemList.appendItem(1, 'EmptyBottle');
            this.itemList.appendItem(2, 'BrokenKeyCard');
            this.itemList.appendItem(3, 'WastedAmmo');
            this.itemList.appendItem(4, 'ScrapParts');

            this.itemList.appendItem(5, 'EmptyBox');
            this.itemList.appendItem(6, 'VideoGame');
            this.itemList.appendItem(7, 'PowerlessCellPhone');
            this.itemList.appendItem(8, 'TrashedPapers');
            this.itemList.appendItem(9, 'PowerCord');
            
            // Key items
            this.itemList.appendItem(10, 'KeyCardRed');
            this.itemList.appendItem(11, 'KeyCardGreen');
            this.itemList.appendItem(12, 'KeyCardBlue');

            // Weapon items
            this.itemList.appendItem(20, 'WeaponModA');
            this.itemList.appendItem(21, 'WeaponModB');

            // Healing items
            this.itemList.appendItem(30, 'Water');
            this.itemList.appendItem(31, 'HealthKit');
            this.itemList.appendItem(32, 'SmallSnack');
            this.itemList.appendItem(33, 'SubstanceX');
            //Augmentation items
            this.itemList.appendItem(40, 'SensorImplant');
            this.itemList.appendItem(49, 'ExoSuit');
            // Misc items
            this.itemList.appendItem(60, 'Backpack');
            this.itemList.appendItem(61, 'Teleporter');
            this.itemList.appendItem(62, 'RepairKit');
            this.itemList.appendItem(63, 'SystemReset');
            this.itemList.appendItem(64, 'Reprogrammer');

            this.itemList.appendItem(65, 'AirMask');
            this.itemList.appendItem(66, 'RevivalKey');
            this.itemList.appendItem(67, 'FriendlyDrone');
            this.itemList.appendItem(68, 'ResourceDetector');
            this.itemList.appendItem(69, 'OverrideKey');
            

            // Trap triggering items
            this.itemList.appendItem(90, 'ShortCircuit');
            this.itemList.appendItem(91, 'TheyAwaken');
            this.itemList.appendItem(92, 'LaserTripwire');			
			
            ////////////////Create the list of enemies//////////////		
           	for (var i = 0; i < 20; i++) {
            	this.enemyList.appendItem(i, null);
            	this.enemyList[i] = 0;
            }            
            this.enemyList.appendItem(0, 'SmallRoamer');
            this.enemyList.appendItem(1, 'CorruptedScout');
            this.enemyList.appendItem(2, 'SuicidalDrone');
            this.enemyList.appendItem(3, 'MediBot');
            this.enemyList.appendItem(4, 'NavGuide');
            this.enemyList.appendItem(5, 'CrewAutotron');
            this.enemyList.appendItem(6, 'BionicZombie');

            this.enemyList[0].entity = new EntityEnemySmallRoamer();
            //this.enemyList[1].entity = new EntityEnemyCorruptedScout();            
            this.enemyList[2].entity = new EntityEnemySuicidalDrone();
            this.enemyList[3].entity = new EntityEnemyMediBot();  
            this.enemyList[4].entity = new EntityEnemyNavGuide();
            this.enemyList[5].entity = new EntityEnemyCrewAutotron();
            this.enemyList[6].entity = new EntityEnemyBionicZombie();
		},

		update : function() {
			this.parent();	
			if(this.activePlayer.actions <= 0) {
				this.onTurnEnd();
			}		
		},

		onGameStart : function() {
			//enemy creation examples
			//this.gamecore.room[x].enemies[0] = this.gamecore.enemyList[2].entity;
			//room[x].enemies[0] = this.enemyList[2].entity;
		},

		onGameEnd : function() {

		},

		//Functions for events at beginning and end of this player's turn 
		onPhaseStart : function() {
			//Create a new event
		},
		onPhaseEnd : function() {
			
		},

		onCycleStart : function() {
			
		},

		onCycleEnd : function() {
			//Reduce the cycle counter by one
			this.cyclesRemaining -= 1;
			onCycleStart();	
		},		
		onTurnStart : function() {
			this.players[this.activePlayer].onTurnStart();
			this.activePlayerTimeLeft = this.activePlayerTimeMax;
		},
		onTurnEnd : function() {
			
			this.players[this.activePlayer].onTurnEnd();
			this.activePlayer += 1;
			if(this.activePlayer > this.playerCount) {
				this.activePlayer = 0;		
				onCycleEnd();
			}
		},

	});

});