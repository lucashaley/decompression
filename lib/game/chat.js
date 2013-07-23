
var Chat = {};

Chat.push = function(string)
{
	$('#chat').append('<p>' + string + '</p>')
}
Chat.clear = function()
{
	$('#chat').empty();
}