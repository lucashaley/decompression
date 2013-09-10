
var Chat = {};

Chat.minimized = false;

Chat.open = function()
{
	$('#chat').css('height', '270px');
	$('#chatInner').css('visibility', 'visible');
	Chat.minimized = false;
}
Chat.close = function()
{
	$('#chat').css('height', $('#chatButton').css('height'));
	$('#chatInner').css('visibility', 'hidden');
	Chat.minimized = true;
}
Chat.show = function()
{
	$('#chat').css('visibility', 'visible');
}
Chat.hide = function()
{
	$('#chat').css('visibility', 'hidden');
}
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