
var Wiki = {};

Wiki.goto = function(addr)
{
	$('iframe').attr('src', addr);
}