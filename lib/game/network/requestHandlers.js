var exec = require("child_process").exec;
var pollExtern = require("./poll");
var accountsExtern = require("./accounts");
function chkList(pathList,number){
	if(pathList.length>number){
		return(false)
	}else{
		return(true)
	}
}
function displayError(response,pathList,errorMessage){
	console.log("!ERROR! - " + pathList + " - " + errorMessage)
	response.writeHead(200,{"Content-Type": "text/plain"})
	response.write("error"+errorMessage);
	response.end();
}
function start(response) {
	console.log("   Reuqest handler for 'start' was called");
	response.writeHead(200,{"Content-Type": "text/plain"})
	response.write("started");
	response.end();
}
function poll(response,pathList) {

	if (chkList(pathList,3)){displayError(response,pathList,"");return(null)}
	pollExtern.poll(response.pathList);
}
function accounts(response,pathList){

	if (chkList(pathList,4)){displayError(response,pathList,"");return(null)}
	if(pathList[2]==="login"){
		currentUser = accountsExtern.login(pathList[3],pathList[4]);
		if(currentUser){
			response.writeHead(200,{"Content-Type": "text/plain"})
			response.write(currentUser.username + currentUser.GUID);
			response.end();
		}else{
			displayError(response,pathList,"Invalid Username/Password.")
		}
	}
	if(pathList[2]==="register"){
		currentUser = accountsExtern.register(pathList[3],pathList[4]);
		if(currentUser){
			response.writeHead(200,{"Content-Type": "text/plain"})
			response.write(currentUser.username + currentUser.GUID);
			response.end();
		}else{
			displayError(response,pathList,"Account already in use.")
		}
	}
}
function messages(response,pathList){

	if (chkList(pathList,4)){displayError(response,pathList,"");return(null)}
	if(pathList[2]==="text"){

	}
	if(pathList[2]==="move"){

	}
}
function games(response,pathList){

	if (chkList(pathList,4)){displayError(response,pathList,"");return(null)}
	if(pathList[2]==="create"){

	}
	if(pathList[2]==="join"){

	}
}
exports.start = start;
exports.poll = poll;
exports.accounts = accounts;
exports.messages = messages;
exports.games = games;