
var Chat = {};

Chat.push = function(string)
{
	var chat = $('#chatInner');
	chat.append('<p>' + string + '</p>');
	chat.scrollTop(9999);
}
Chat.clear = function()
{
	$('#chatInner').empty();
}