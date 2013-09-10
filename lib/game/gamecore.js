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
        maxCycles : 20, 

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
        lastRoom : null, 
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
        selectedLockItem : false, 
        selectedDestroyItem : false, 

        players : new Array(), 
        explored : new Array(), 
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
            //console.log('INIT GAMECORE');
            this.players = [];
            this.rooms = [];
            this.explored = [];
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
            this.secondCount = newSeconds;

            for (var i = 0; i < this.players.length; i++) this.players[i].update();

            if (this.activePlayerTimeLeft < 1) GameCore.activePlayer.endTurn();

            if (this.keyCardFound.red && this.keyCardFound.green && this.keyCardFound.blue)
            {
                Chat.push(ScriptCore.WonGame);
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

        getRoomByName : function(name)
        {
            for (var i = 0; i < this.rooms.length; i++)
            {
                var room = this.rooms[i];
                if (room != null && room.name == name)
                {
                    return room;
                }
            }
            return null;
        }, 

        registerPlayer : function(username, jobname)
        {
            var player = new EntityPlayer();
            player.name = username;
            player.index = this.players.length;
            player.useJobClass(jobname);
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
            if (this.currentRoom != null)
            {
                this.currentRoom.removePlayer(this.activePlayer);
            }
            this.lastRoom = this.currentRoom;

            room.addPlayer(this.activePlayer);
            this.setRoom(room);
        }, 

        endEvent : function()
        {
            this.currentEvent.onEnd();
            this.currentEvent = null;
        }, 
        onEventStart : function()
        {
            if (this.cyclesRemaining == this.maxCycles) this.currentEvent = EventCore.requestEventByName('Silence');
            else this.currentEvent = EventCore.generateRandomEvent();
            Chat.push(ScriptCore.StartNewEvent + this.currentEvent.name);
            Chat.push(this.currentEvent.description);
            this.currentEvent.onStart();
        }, 
        onEventEnd : function()
        {
            this.endEvent();
        }, 

		onGameStart : function()
        {
            Chat.push(ScriptCore.StartingGame);
            this.setActivePlayerByIndex(0);
            this.onPhaseStart();
            this.activePlayer.startTurn();
            this.currentRoom.onPlayerEnter();
            //console.log('ROOMS ', this.rooms);
            //console.log('PLAYERS ', this.players);
		},
		onGameEnd : function()
        {
            Chat.push(ScriptCore.EndingGame);
            this.stillPlaying = false;
		},

		onPhaseStart : function()
        {
            Chat.push(ScriptCore.NewPhase);
            this.onEventStart();
		},
		onPhaseEnd : function()
        {
            Chat.push(ScriptCore.EndPhase);
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
            Chat.push(ScriptCore.NewCycle);
            Chat.push(ScriptCore.CyclesRemaining + this.cyclesRemaining);
            this.currentEvent.onCycleStart();
		},
		onCycleEnd : function()
        {
            this.currentEvent.onCycleEnd();
            Chat.push(ScriptCore.Blank);
            Chat.push(ScriptCore.EndCycle);
    		this.cyclesRemaining--;
            this.activePlayerIndex = 0;
            if ((this.cyclesRemaining % this.cyclesInPhase) < 1) this.onPhaseEnd();
		},		
		onTurnStart : function()
        {
            this.lastRoom = null;
            if (this.currentRoom != this.activePlayer.currentRoom) this.setRoom(this.activePlayer.currentRoom);
            this.currentRoom.setPosition(canvas.width / 2, canvas.height / 2);
            if (this.activePlayerIndex == 0) this.onCycleStart();
            Chat.push(ScriptCore.Blank);
			this.activePlayerTimeLeft = this.activePlayerTimeMax;
            this.currentRoom.onPlayerTurnStart();
            this.currentEvent.onTurnStart();
		},
		onTurnEnd : function()
        {
            //console.log('END PLAYER TURN ', this.activePlayerIndex);
            //console.log('ACTIVE PLAYERS', this.players);
            this.currentEvent.onTurnEnd();
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