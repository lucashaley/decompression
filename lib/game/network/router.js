function route (handle, pathList, response) {
	//console.log("About to route request for "+pathList);
	path = pathList[1];
	if(typeof handle[path]==='function'){
		handle[path](response,pathList);
	}else{
		console.log("No reqest handler found for " + path);
		response.writeHead(404,{"Content-Type": "text/plain"});
		response.write("404 Noob!");
		response.end();
	}
}
exports.route = route;