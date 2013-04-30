var http = require("http");
var url = require("url");
var message = "";
var count = 0;
function start(route){
	http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;

	    //console.log("Request received for '"+pathname+"'.");
	    route(pathname)
	 	response.writeHead(200, {"Content-Type": "text/plain"});
	 	response.write("Woot "+ count);
	 	count++;
	 	response.end();
	}).listen(50252);
	console.log("Server has started.");
}

exports.start = start;