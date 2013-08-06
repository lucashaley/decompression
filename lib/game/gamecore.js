ig.module(
	'game.gamecore'
)
.requires(
	'impact.entity', 

	'game.entities.player', 
    'game.entities.door', 

    'game.events.baseEvent'
)
.defines(function(){
	EntityGameCore = ig.Entity.extend(
    {
		gamename : "Untitled Game",
		playerCount : 0, 
        stillPlaying : true, 
        wonGame : false, 

        cyclesInPhase : 5, 
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
        startingRoom : null, 
        currentRoom : null, 
        currentEvent : null, 

        targetedEnemy : null, 
        targetedDoor : null, 
        targetedItem : null, 
        activeContextMenu : null, 
        selectedAttack : false, 
        selectedMove : false, 
        selectedUnlock : false, 
        selectedScavenge : false, 
        selectedUseAbility : false, 
        selectedUseItem : false, 
        selectedGiveItem : false, 
        selectedDestroyItem : false, 

        players : new Array(),
        rooms : new Array(), 

		keyCardFound : 
        {
            red : false, 
            blue : false, 
            green : false, 
        },

        date : null, 
        secondCount : 0, 
        deltaTime : 0.0, 

		init : function()
        {
            console.log('INIT GAMECORE');
            this.players = [];
            this.rooms = [];
        }, 

		update : function()
        {
            this.parent();

            this.date = new Date();
            this.deltaTime = this.date.getMilliseconds() / 1000;
            var newSeconds = this.date.getSeconds();
            var deltaSeconds = newSeconds - this.secondCount;
            if (deltaSeconds < 0) deltaSeconds = 0;
            this.activePlayerTimeLeft -= deltaSeconds;
            //if (deltaSeconds != 0) console.log(this.secondCount, newSeconds, deltaSeconds);
            this.secondCount = newSeconds;

            for (var i = 0; i < this.players.length; i++) this.players[i].update();
            if (this.currentRoom != this.activePlayer.currentRoom) this.setRoom(this.activePlayer.currentRoom);
            //this.currentEvent.update();

            if (this.activePlayerTimeLeft < 1) GameCore.activePlayer.endTurn();

            if (this.keyCardFound.red && this.keyCardFound.green && this.keyCardFound.blue)
            {
                Chat.push("YOU HAVE WON THE GAME");
                this.stillPlaying = false;
                this.wonGame = true;
            }
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

        registerPlayer : function(username, jobname)
        {
            var player = new EntityPlayer();
            player.name = username;
            player.index = this.players.length;
            player.useJobClass(jobname);
            this.players.push(player);
            //player.init();
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
            if (this.currentRoom != null)
            {
                this.currentRoom.removePlayer(this.activePlayer);
            }
            room.addPlayer(this.activePlayer);
            this.setRoom(room);
        }, 

        endEvent : function()
        {
            this.currentEvent = null;
        }, 
        onEventStart : function()
        {
            this.currentEvent = new BaseEvent();
            Chat.push('STARTING NEW EVENT ' + this.currentEvent.name);
            this.currentEvent.init();
        }, 
        onEventEnd : function()
        {
            this.endEvent();
        }, 

		onGameStart : function()
        {
            Chat.push('STARTING GAME');
            this.setActivePlayerByIndex(0);
            this.activePlayer.startTurn();
            this.onPhaseStart();
            this.currentRoom.onPlayerEnter();
            console.log('ROOMS ', this.rooms);
            console.log('PLAYERS ', this.players);
		},
		onGameEnd : function()
        {
            Chat.push('ENDING GAME');
            this.stillPlaying = false;
		},

		onPhaseStart : function()
        {
            Chat.push('STARTING NEW PHASE');
            this.onEventStart();
		},
		onPhaseEnd : function()
        {
            Chat.push('ENDING PHASE');
            this.onEventEnd();
            if (this.cyclesRemaining < 1)
            {
                this.onGameEnd();
                return;
            }
            this.onPhaseStart();
		},

		onCycleStart : function()
        {
            Chat.push('STARTING NEW CYCLE');
            Chat.push('CYCLES REMAINING ' + this.cyclesRemaining);
		},
		onCycleEnd : function()
        {
            Chat.push("&nbsp;");
            Chat.push('ENDING CYCLE');
    		this.cyclesRemaining--;
            this.activePlayerIndex = 0;
            if ((this.cyclesRemaining % this.cyclesInPhase) < 1) this.onPhaseEnd();
		},		
		onTurnStart : function()
        {
            if (this.activePlayerIndex == 0) this.onCycleStart();
            Chat.push("&nbsp;");
			this.activePlayerTimeLeft = this.activePlayerTimeMax;
            this.currentRoom.onPlayerTurnStart();
		},
		onTurnEnd : function()
        {
            //console.log('END PLAYER TURN ', this.activePlayerIndex);
            //console.log('ACTIVE PLAYERS', this.players);
            this.currentRoom.onPlayerTurnEnd();
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
            this.targetedItem = null;
            this.selectedAttack = false;
            this.selectedMove = false;
            this.selectedUnlock = false;
            this.selectedScavenge = false;
            this.selectedUseAbility = false;
            this.selectedUseItem = false;
            this.selectedGiveItem = false;
            this.selectedDestroyItem = false;
		},

	});

});