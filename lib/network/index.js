var server = require("./server")
var router = require("./router")
var requestHandlers = require("./requestHandlers")
var handle = {}
handle[""] = requestHandlers.start;
handle["start"] = requestHandlers.start;
handle["poll"] = requestHandlers.poll;
handle["accounts"] = requestHandlers.accounts;
handle["games"] = requestHandlers.games;
handle["messages"] = requestHandlers.messages;
server.start(router.route, handle);