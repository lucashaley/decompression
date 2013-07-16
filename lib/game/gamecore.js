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
    'game.rooms.room'
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

                  this.rooms.push(new Tyche());
                  this.rooms.push(new Infirmary());

                  for (var i = 0; i < this.rooms.length; i++) this.rooms[i].init();
                  for (var i = 0; i < this.players.length; i++) this.players[i].init();

                  this.currentRoom = this.rooms[0];
                  this.currentRoom.addPlayer(this.players[0]);
                  this.currentRoom.addPlayer(this.players[1]);
                  this.currentRoom.addPlayer(this.players[2]);
                  this.currentRoom.addPlayer(this.players[3]);
                  this.currentRoom.addEnemy();
                  this.currentRoom.connectTo(this.rooms[1], 'topRight');
                  //console.log('ROOMS', this.rooms);
            }, 

		update : function()
            {
			this.parent();

                  for (var i = 0; i < this.players.length; i++) this.players[i].update();
                  if (this.currentRoom != this.activePlayer.currentRoom) this.currentRoom = this.activePlayer.currentRoom;
		},

            quit : function()
            {
                  this.onGameEnd();
            },

            registerPlayer : function(username)
            {
                  var player = new EntityPlayer();
                  player.username = username;
                  this.players.push(player);
                  this.playerCount++;
            },
            setActivePlayer : function(index)
            {
                  this.activePlayerIndex = index;
                  this.activePlayer = this.players[index];
            }, 
            movePlayerTo : function(room)
            {
                  this.currentRoom.removePlayer(this.activePlayer);
                  room.addPlayer(this.activePlayer);
                  this.currentRoom = room;
                  //console.log('PLAYERS ', this.players);
            },

		onGameStart : function()
            {
                  this.setActivePlayer(0);
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
                  this.activePlayer = this.players[this.activePlayerIndex];
                  this.activePlayer.startTurn();
                  //console.log(this.activePlayer);
		},

	});

});