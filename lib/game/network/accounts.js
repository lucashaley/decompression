//player object

accounts = new Array;
function account(username,password,GUID){
	this.username = username;
	this.password = password;
	this.GUID = GUID;
	this.currentGame = null;
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}
//returns account via name (replace with SQL)
function searchAccountName(username){

	console.log(username + " " + accounts)
	for(var x = 0;x<accounts.length;x++){
		if(accounts[x].username === username){
			return accounts[x];
		}
	}
	return(null);
}
//returns account via guid (replace with SQL)
function searchAccountGUID(GUID){
	for(var x = 0;x<accounts.length;x++){
		if(accounts[x].GUID === GUID){
			return accounts[x];
		}
	}
	return(null);
}
//returns GUID of the account
function login(username,password){
	currentUser = searchAccountName(username)
	if(currentUser){
		if(currentUser.password === password){
			currentUser.GUID = guid();
			console.log("User "+currentUser.username + " has logged in.")
			return(currentUser)
		}else{
			//wrong username/password
			return(null)
		}
		//wrong username/password
		return(null)
	}
}
//
function register(username,password){
	currentUser = new account(username,password,guid());
	accounts.push(currentUser);
	console.log("User registerd the name "+currentUser.username+".")
	return(currentUser);
}
//used when polling, and sending information to server (player verification)
function handShake(GUID){
	currentUser = searchAccountGUID(GUID);
	if(currentUser){
		return(currentUser)
	}else{
		//display logging page
		return(null)
	}

}
exports.handShake = handShake;
exports.register = register;
exports.login = login;