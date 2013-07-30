var http = require("http");
var url = require("url");
function start(route,handle){
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		var pathList = pathname.split("/");
		console.log("   Request for '" + pathList + "' was received.")
		route(handle,pathList,response);

		
	}
	http.createServer(onRequest).listen(50252);
	console.log("Server is up!")
}
exports.start = start;