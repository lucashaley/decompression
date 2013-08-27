function filter(a,b) {
		if (a.token > b.token){
			return -1;
		}
    	
		if (a.token < b.token){
			return 1;
		}	
		return 0;
}

//FIND WITH ATTRIBUTE FUNCTION
function findWithAttr(array, attr, value){
	for(var i = 0; i < array.length; i += 1){
		if(array[i][attr] == value){
			return i;
		}
	}
}
//findWithAttr(slot, 'username', 'Player'); // returns 0

var pool = [
	{username: "Gary", userType: "client", token: 3},
	{username: "Brandon", userType: "client", token: 2},
	{username: "Max", userType: "client", token: 1},
	{username: "Yordan", userType: "client", token: 4}

];

pool[-1] = undefined;


function giveToken(){
		this.token +=1;	
}

function sortThis(array, attr){
	array[attr].sort(function(a,b){return a - b});

}

function drainPool(){
	pool[0] = pool[-1];
	pool.forEach(giveToken);

	pool.sort(filter);
}

/////////////////////PLAYER ARRAY//////////////////////
var players = [
	{username: "HOST", userType: "host", token: 0},
];

////////////////////SLOT STATES////////////////////////
var _SLOTSTATE_OPEN = 0;
var _SLOTSTATE_CLOSE = 1;
var _SLOTSTATE_PLAYER = 2;

//////////////////////////SLOT ARRAY//////////////////////////
var slot = [
	{state: _SLOTSTATE_PLAYER, player: players[0], show: null},
	{state: _SLOTSTATE_OPEN, player: players[1], show: null},
	{state: _SLOTSTATE_OPEN, player: players[2], show: null},
	{state: _SLOTSTATE_OPEN, player: players[3], show: null},
	{state: _SLOTSTATE_OPEN, player: players[4], show: null},
	{state: _SLOTSTATE_OPEN, player: players[5], show: null}
];

var serverName = (players[0].username + "'s Lobby");
var mySlot = undefined;


function slotCheck(){
	/////////////////////////FILL EMPTY SLOTS///////////////////////
    if(slot[0].player != null && slot[0].player != undefined){
    	slot[0].state = _SLOTSTATE_PLAYER;
    }
    if(slot[1].player != null && slot[1].player != undefined){
        slot[1].state = _SLOTSTATE_PLAYER;
    }
    if(slot[2].player != null && slot[2].player != undefined){
        slot[2].state = _SLOTSTATE_PLAYER;
    }
    if(slot[3].player != null && slot[3].player != undefined){
        slot[3].state = _SLOTSTATE_PLAYER;
    }
    if(slot[4].player != null && slot[4].player != undefined){
        slot[4].state = _SLOTSTATE_PLAYER;
    }
    if(slot[5].player != null && slot[5].player != undefined){
        slot[5].state = _SLOTSTATE_PLAYER;
    }

	/////////////////////////OPEN EMPTY SLOTS///////////////////////
	if(slot[0].state != _SLOTSTATE_CLOSE && slot[0].state != _SLOTSTATE_PLAYER){
	slot[0].state = _SLOTSTATE_OPEN;
	}
	if(slot[1].state != _SLOTSTATE_CLOSE && slot[1].state != _SLOTSTATE_PLAYER){
	slot[1].state = _SLOTSTATE_OPEN;
	}
	if(slot[2].state != _SLOTSTATE_CLOSE && slot[2].state != _SLOTSTATE_PLAYER){
		slot[2].state = _SLOTSTATE_OPEN;
	}
	if(slot[3].state != _SLOTSTATE_CLOSE && slot[3].state != _SLOTSTATE_PLAYER){
		slot[3].state = _SLOTSTATE_OPEN;
	}
	if(slot[4].state != _SLOTSTATE_CLOSE && slot[4].state != _SLOTSTATE_PLAYER){
		slot[4].state = _SLOTSTATE_OPEN;
	}
	if(slot[5].state != _SLOTSTATE_CLOSE && slot[5].state != _SLOTSTATE_PLAYER){
		slot[5].state = _SLOTSTATE_OPEN;
	}

	////////////////OPEN SLOTS//////////////
	if(slot[0].state == _SLOTSTATE_OPEN || slot[0].state == undefined){
		slot[0].show = "open";
		slot[0].player = undefined;
	}
	if(slot[1].state == _SLOTSTATE_OPEN || slot[1].state == undefined){
		slot[1].show = "open";
		slot[1].player = undefined;
	}
	if(slot[2].state == _SLOTSTATE_OPEN || slot[2].state == undefined){
		slot[2].show = "open";
		slot[2].player = undefined;
	}
	if(slot[3].state == _SLOTSTATE_OPEN || slot[3].state == undefined){
		slot[3].show = "open";
		slot[3].player = undefined;
	}
	if(slot[4].state == _SLOTSTATE_OPEN || slot[4].state == undefined){
		slot[4].show = "open";
		slot[4].player = undefined;
	}
	if(slot[5].state == _SLOTSTATE_OPEN || slot[5].state == undefined){
		slot[5].show = "open";
		slot[5].player = undefined;
	}

	////////////////CLOSE SLOTS//////////////
	if(slot[0].state == _SLOTSTATE_CLOSE){
		slot[0].show = "closed";
		slot[0].player = undefined;
	}
	if(slot[1].state == _SLOTSTATE_CLOSE){
		slot[1].show = "closed";
		slot[1].player = undefined;
	}
	if(slot[2].state == _SLOTSTATE_CLOSE){
		slot[2].show = "closed";
		slot[2].player = undefined;
	}
	if(slot[3].state == _SLOTSTATE_CLOSE){
		slot[3].show = "closed";
		slot[3].player = undefined;
	}
	if(slot[4].state == _SLOTSTATE_CLOSE){
		slot[4].show = "closed";
		slot[4].player = undefined;
	}
	if(slot[5].state == _SLOTSTATE_CLOSE){
		slot[5].show = "closed";
		slot[5].player = undefined;
	}

	///////////////PLAYER SLOTS//////////////
	if(slot[0].state == _SLOTSTATE_PLAYER){
		slot[0].show = slot[0].player.username;
	}
	if(slot[1].state == _SLOTSTATE_PLAYER){
		slot[1].show = slot[1].player.username;
	}
	if(slot[2].state == _SLOTSTATE_PLAYER){
		slot[2].show = slot[2].player.username;
	}
	if(slot[3].state == _SLOTSTATE_PLAYER){
		slot[3].show = slot[3].player.username;
	}
	if(slot[4].state == _SLOTSTATE_PLAYER){
		slot[4].show = slot[4].player.username;
	}
	if(slot[5].state == _SLOTSTATE_PLAYER){
		slot[5].show = slot[5].player.username;
	}
}

function joinLobby(){

	var openSlot = findWithAttr(slot, 'state', _SLOTSTATE_OPEN);
	if(openSlot !== undefined){
		user = pool[0];
		user.token = openSlot;
		players.push(user);
		slot[openSlot].player = user;
		slot[openSlot].state = _SLOTSTATE_PLAYER;
		mySlot = openSlot;
		user = null;
		openSlot = undefined;
		drainPool();
		slotCheck();
	}
	else{
		alert("Lobby Full");
		slotCheck();
	}
}

function leaveLobby(){
	//open leaving players slot
	slot[mySlot].state = _SLOTSTATE_OPEN;
	mySlot = undefined;
	slotCheck();

}

function swapSlots(value1, value2){
	if(slot[value2].state == _SLOTSTATE_OPEN){
		slot[value2].player = slot[value1].player;
		mySlot = value2;
		slot[value1].player = undefined;
		slot[value1].state = _SLOTSTATE_OPEN;
		
	}
	slotCheck();
}

function closeSlot(value){
	if(slot[value].state == _SLOTSTATE_OPEN){
		slot[value].state = _SLOTSTATE_CLOSE;
	}
	slotCheck();
}

function openSlot(value){
	if(slot[value].state == _SLOTSTATE_CLOSE){
		slot[value].state = _SLOTSTATE_OPEN;
	}
	slotCheck();
}

//main player lobby screen
LobbyScreen = ig.Game.extend({

    font: new ig.Font('media/04b03.font.png'),
    backButton : new menuButton(),
    startButton : new menuButton(),
    //readyButton : new menuButton(),

    slotButton0 : new menuButton(),
    slotButton1 : new menuButton(),
    slotButton2 : new menuButton(),
    slotButton3 : new menuButton(),
    slotButton4 : new menuButton(),
    slotButton5 : new menuButton(),


    init: function () {
        // Initialize your game here; bind keys etc.
        ig.input.bind( ig.KEY.MOUSE1, 'leftMouse');
        this.backButton.init(ig.system.width * .4, ig.system.height * .9, 'BACK\nTO\nMENU', new Color(0.2, 0.2, 0.2));
        this.startButton.init(ig.system.width * .6, ig.system.height * .9, 'START\nGAME', new Color(0.1, 0.4, 0.1));
        //this.readyButton.init(ig.system.width * .6, ig.system.height * .9, 'READY\nUP', new Color(0.1, 0.4, 0.1));
        this.slotButton0.init(ig.system.width * .1, ig.system.height * .9, slot[0].show, new Color(0.2, 0.2, 0.2));
        this.slotButton1.init(ig.system.width * .1, ig.system.height * .8, slot[1].show, new Color(0.2, 0.2, 0.2));
        this.slotButton2.init(ig.system.width * .1, ig.system.height * .7, slot[2].show, new Color(0.2, 0.2, 0.2));
        this.slotButton3.init(ig.system.width * .1, ig.system.height * .6, slot[3].show, new Color(0.2, 0.2, 0.2));
        this.slotButton4.init(ig.system.width * .1, ig.system.height * .5, slot[4].show, new Color(0.2, 0.2, 0.2));
        this.slotButton5.init(ig.system.width * .1, ig.system.height * .4, slot[5].show, new Color(0.2, 0.2, 0.2));

    },

    update: function () {
        // Update all entities and backgroundMaps
        slotCheck();
        this.parent();

        //handle buttons
        if(this.backButton.isOnButton() &&ig.input.pressed ('leftMouse')) {
            ig.system.setGame(StartScreen);
            leaveLobby();
        }
        if(this.startButton.isOnButton() &&ig.input.pressed ('leftMouse')) {
            ig.system.setGame(GameScreen);
        }

        //MOVE TO SLOTS
        if(this.slotButton0.isOnButton() &&ig.input.pressed ('leftMouse')) {
            //check if slot is empty, swap to slot if it is
            if(slot[0].state == _SLOTSTATE_PLAYER){
            	//do nothing
            }
            if(slot[0].state == _SLOTSTATE_OPEN){
            	swapSlots(mySlot, 0);
            }
        }
        if(this.slotButton1.isOnButton() &&ig.input.pressed ('leftMouse')) {
            if(slot[1].state == _SLOTSTATE_PLAYER){
            	//do nothing
            }
            if(slot[1].state == _SLOTSTATE_OPEN){
            	swapSlots(mySlot, 1);
            }
        }
        if(this.slotButton2.isOnButton() &&ig.input.pressed ('leftMouse')) {
            if(slot[2].state == _SLOTSTATE_PLAYER){
            	//do nothing
            }
            if(slot[2].state == _SLOTSTATE_OPEN){
            	swapSlots(mySlot, 2);
            }
        }
        if(this.slotButton3.isOnButton() &&ig.input.pressed ('leftMouse')) {
            if(slot[3].state == _SLOTSTATE_PLAYER){
            	//do nothing
            }
            if(slot[3].state == _SLOTSTATE_OPEN){
            	swapSlots(mySlot, 3);
            }
        }
        if(this.slotButton4.isOnButton() &&ig.input.pressed ('leftMouse')) {
            if(slot[4].state == _SLOTSTATE_PLAYER){
            	//do nothing
            }
            if(slot[4].state == _SLOTSTATE_OPEN){
            	swapSlots(mySlot, 4);
            }
        }
        if(this.slotButton5.isOnButton() &&ig.input.pressed ('leftMouse')) {
            if(slot[5].state == _SLOTSTATE_PLAYER){
            	//do nothing
            }
            if(slot[5].state == _SLOTSTATE_OPEN){
            	swapSlots(mySlot, 5);
            }
        }

        //CLOSE AND OPEN SLOTS
        if(this.slotButton0.isOnButton() &&ig.input.pressed ('rightMouse')) {
        	//check if slot is host, close slot if not
        	if(slot[0].state == _SLOTSTATE_OPEN){
				closeSlot(0);
			}
			else{
				openSlot(0);
			}  
        }
        if(this.slotButton1.isOnButton() &&ig.input.pressed ('rightMouse')) {
            if(slot[1].state == _SLOTSTATE_OPEN){
				closeSlot(1);
			}
			else{
				openSlot(1);
			}  
        }
        if(this.slotButton2.isOnButton() &&ig.input.pressed ('rightMouse')) {
            if(slot[2].state == _SLOTSTATE_OPEN){
				closeSlot(2);
			}
			else{
				openSlot(2);
			}  
        }
        if(this.slotButton3.isOnButton() &&ig.input.pressed ('rightMouse')) {
            if(slot[3].state == _SLOTSTATE_OPEN){
				closeSlot(3);
			}
			else{
				openSlot(3);
			}  
        }
        if(this.slotButton4.isOnButton() &&ig.input.pressed ('rightMouse')) {
            if(slot[4].state == _SLOTSTATE_OPEN){
				closeSlot(4);
			}
			else{
				openSlot(4);
			}  
        }
        if(this.slotButton5.isOnButton() &&ig.input.pressed ('rightMouse')) {
            if(slot[5].state == _SLOTSTATE_OPEN){
				closeSlot(5);
			}
			else{
				openSlot(5);
			}  
        }

    },

    draw: function () {
        var scrWid = ig.system.width;
        var scrHgt = ig.system.height;
        var cntrX = scrWid/2;
        var cntrY = scrHgt/2;

        this.font.draw('Waiting for Players...', cntrX, scrHgt * .2, ig.Font.ALIGN.CENTER);
        this.font.draw('Server Name: ' + serverName, cntrX, scrHgt * .4, ig.Font.ALIGN.CENTER);
        this.backButton.draw();
        this.startButton.draw();
        //this.readyButton.draw();
        this.slotButton0.draw();
        this.slotButton1.draw();
        this.slotButton2.draw();
        this.slotButton3.draw();
        this.slotButton4.draw();
        this.slotButton5.draw();
        
    }
});