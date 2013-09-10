
var Wiki = {};

Wiki.minimized = false;

Wiki.open = function()
{
	$('#wiki').css('width', '415px');
	$('#wikiInner').css('visibility', 'visible');
	Wiki.minimized = false;
}
Wiki.close = function()
{
	$('#wiki').css('width', $('#wikiButton').css('width'));
	$('#wikiInner').css('visibility', 'hidden');
	Wiki.minimized = true;
}
Wiki.show = function()
{
	$('#wiki').css('visibility', 'visible');
}
Wiki.hide = function()
{
	$('#wiki').css('visibility', 'hidden');
}
Wiki.goto = function(addr)
{
	$('iframe').attr('src', addr);
	Wiki.open();
}