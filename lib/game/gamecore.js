ig.module(
	'game.gamecore'
)
.requires(
	'impact.entity', 

	'game.entities.item',

	'game.entities.player',
	/*'game.entities.jobs.civilian',
	'game.entities.jobs.frontman',
	'game.entities.jobs.scavenger',
	'game.entities.jobs.psiAgent',
	'game.entities.jobs.doctor',
	'game.entities.jobs.cyberneticWarrior',
	'game.entities.jobs.junker',*/

	'game.entities.enemy', 
	/*'game.entities.enemies.smallRoamer',
	'game.entities.enemies.corruptedScout',
	'game.entities.enemies.suicidalDrone',
	'game.entities.enemies.mediBot',
	'game.entities.enemies.navGuide',
	'game.entities.enemies.crewAutotron',
	'game.entities.enemies.bionicZombie'*/

      'game.entities.door', 

      'game.rooms.baseRoom', 
      'game.rooms.armory', 
      'game.rooms.barracks', 
      'game.rooms.bridge', 
      'game.rooms.brig', 
      'game.rooms.engineeringCore', 
      'game.rooms.engineeringReactor', 
      'game.rooms.hangar', 
      'game.rooms.infirmary', 
      'game.rooms.recRoom', 
      'game.rooms.tyche'
)
.defines(function(){
	EntityGameCore = ig.Entity.extend(
      {
		gamename : "Untitled Game",

		playerCount : 0,
		cyclesMax : 20,
		cyclesRemaining : 20,
		roomMax : 30,
		roomsFound : 0,
            bossInCore : false,
		
            activePlayerIndex : 0,
            activePlayerTimeMax : 30,
            activePlayerTimeLeft : 0,
            currentRoomIndex : 0, 

            clientPlayer : null, 
            activePlayer : null, 
            currentRoom : null, 

            targetedEnemy : null, 
            targetedDoor : null, 
            activeContextMenu : null, 
            selectedAttack : false, 
            selectedMove : false, 
            selectedScavenge : false, 
            selectedAbility : false, 

            players : new Array(),
            rooms : new Array(), 

		keyCardFound : 
            {
                  red : false, 
                  blue : false, 
                  green : false, 
            },

            playerJobList : new Array(),
            itemList : new Array(),
            enemyList : new Array(),

		init : function()
            {
                  console.log('INIT GAMECORE');
                  this.players = [];
                  this.rooms = [];

                  this.registerPlayer("Lucas");
                  this.registerPlayer("Brandon");
                  this.registerPlayer("Yordan");
                  this.registerPlayer("Kris");

                  this.addRoom(new Tyche());
                  this.addRoom(new Infirmary());

                  for (var i = 0; i < this.rooms.length; i++) this.rooms[i].init();
                  for (var i = 0; i < this.players.length; i++) this.players[i].init();

                  this.rooms[0].addPlayer(this.players[0]);
                  this.rooms[0].addPlayer(this.players[1]);
                  this.rooms[0].addPlayer(this.players[2]);
                  this.rooms[0].addPlayer(this.players[3]);
                  this.rooms[0].addEnemy();
                  this.rooms[1].addEnemy();
                  this.rooms[1].addEnemy();
                  this.rooms[0].connectTo(this.rooms[1], 'topRight');
                  this.currentRoom = this.rooms[0];
                  //console.log('ROOMS', this.rooms);
            }, 

		update : function()
            {
			this.parent();

                  for (var i = 0; i < this.players.length; i++) this.players[i].update();
                  if (this.currentRoom != this.activePlayer.currentRoom) this.setRoom(this.activePlayer.currentRoom);
		},

            quit : function()
            {
                  this.onGameEnd();
            },

            addRoom : function(room)
            {
                  room.index = this.rooms.length;
                  this.rooms.push(room);
            }, 
            setRoom : function(room)
            {
                  var index = room.index;
                  this.setRoomByIndex(index);
            }, 
            setRoomByIndex : function(index)
            {
                  if (index < 0 || index >= this.rooms.length) return;
                  this.currentRoomIndex = index;
                  this.currentRoom = this.rooms[index];
            }, 

            registerPlayer : function(username)
            {
                  var player = new EntityPlayer();
                  player.username = username;
                  player.index = this.players.length;
                  this.players.push(player);
            },
            setActivePlayer : function(player)
            {
                  var index = player.index;
                  this.setActivePlayerByIndex(index);
            }, 
            setActivePlayerByIndex : function(index)
            {
                  if (index < 0 || index >= this.players.length) return;
                  this.activePlayerIndex = index;
                  this.activePlayer = this.players[index];
            }, 
            movePlayerTo : function(room)
            {
                  this.currentRoom.removePlayer(this.activePlayer);
                  room.addPlayer(this.activePlayer);
                  this.setRoom(room);
                  console.log('PLAYERS ', this.players);
            },

		onGameStart : function()
            {
                  this.setActivePlayerByIndex(0);
                  this.activePlayer.startTurn();
		},
		onGameEnd : function()
            {
		},

		onPhaseStart : function()
            {
                  //Create a new event
		},
		onPhaseEnd : function()
            {
		},

		onCycleStart : function()
            {
		},
		onCycleEnd : function()
            {
			this.cyclesRemaining--;
                  this.activePlayerIndex = 0;
		},		
		onTurnStart : function()
            {
			this.activePlayerTimeLeft = this.activePlayerTimeMax;
		},
		onTurnEnd : function()
            {
                  //console.log('END PLAYER TURN ', this.activePlayerIndex);
                  //console.log('ACTIVE PLAYERS', this.players);
			this.activePlayerIndex++;
			if(this.activePlayerIndex >= this.players.length)
                  {
				this.onCycleEnd();
			}
                  //console.log('STARTING NEW TURN ', this.activePlayerIndex);
                  this.setActivePlayerByIndex(this.activePlayerIndex);
                  this.activePlayer.startTurn();
                  //console.log(this.activePlayer);
                  this.targetedEnemy = null;
                  this.targetedDoor = null;
                  this.selectedAttack = false;
                  this.selectedMove = false;
                  this.selectedScavenge = false;
                  this.selectedAbility = false;
		},

	});

});