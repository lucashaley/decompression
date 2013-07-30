
var Chat = {};

Chat.push = function(string)
{
	var chat = $('#chat');
	chat.append('<p>' + string + '</p>');
	chat.scrollTop(9999);
}
Chat.clear = function()
{
	$('#chat').empty();
}