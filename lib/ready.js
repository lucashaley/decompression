window.onresize = function()
{
	var canvasWidth = $("canvas").width();
	var canvasHeight = $("canvas").height();
	var chatWidth = $('#chat').width();
	var chatHeight = $('#chat').height();
	var wikiWidth = $('#wiki').width();
	var wikiHeight = $('#wiki').height();
	$(document).scrollLeft(Math.abs(window.innerWidth - canvasWidth) / 2);
	$(document).scrollTop(Math.abs(window.innerHeight - canvasHeight) / 2);
	$('canvas').css('margin-top', ((window.innerHeight - canvasHeight) / 2) + 'px');
	//$('canvas').css('left', ((window.innerWidth - canvasWidth) / 2) + 'px');
	$('#chat').css('top', (((window.innerHeight - canvasHeight) / 2) + (canvasHeight - chatHeight)) + 'px');
	$('#chat').css('left', ((window.innerWidth - canvasWidth) / 2) + 'px');
	$('#wiki').css('top', ((window.innerHeight - canvasHeight) / 2) + 'px');
	$('#wiki').css('right', ((window.innerWidth - canvasWidth) / 2) + 'px');
}
$(document).ready(function()
{
	$('#chatButton').click(function()
	{
		if (Chat.minimized)
		{
			Chat.open();
		}
		else
		{
			Chat.close();
		}
		window.onresize();
	});
	$('#wikiButton').click(function()
	{
		if (Wiki.minimized)
		{
			Wiki.open();
		}
		else
		{
			Wiki.close();
		}
		window.onresize();
	});
	window.onresize();

	Chat.hide();
	Wiki.hide();
	Wiki.close();
});