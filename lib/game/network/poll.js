accounts = require("./accounts")
function poll(response,pathList){
	currentUser = accounts.handShake(pathList[3])
	if(pathlist[2]==="chat"){pollChat(response,currentUser)}
	if(pathlist[2]==="midturn"){pollMidTurn(response,currentUser)}
	if(pathlist[2]==="fullturn"){pollfullTurn(response,currentUser)}
	if(pathlist[2]==="list"){
		currentUser.currentGame.lastList(response)
	}
}
function pollChat(response,currentUser){
	currentUser.currentGame.lastChat(response);
}
function pollMidTurn(response,currentUser){
	currentUser.currentGame.lastMidTurn(response);
}
function pollFullTurn(response,currentUser){
	currentUser.currentGame.lastFullTurn(response);
}
exports.poll = poll;