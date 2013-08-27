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
var chatMinimized = false;
var wikiMinimized = true;
$(document).ready(function()
{
	$('#chatButton').click(function()
	{
		if (chatMinimized)
		{
			$('#chat').css('height', '200px');
			$('#chatInner').css('visibility', 'visible');
			chatMinimized = false;
		}
		else
		{
			$('#chat').css('height', $('#chatButton').css('height'));
			$('#chatInner').css('visibility', 'hidden');
			chatMinimized = true;
		}
		window.onresize();
	});
	$('#wikiButton').click(function()
	{
		if (wikiMinimized)
		{
			$('#wiki').css('width', '480px');
			$('#wikiInner').css('visibility', 'visible');
			wikiMinimized = false;
		}
		else
		{
			$('#wiki').css('width', $('#wikiButton').css('width'));
			$('#wikiInner').css('visibility', 'hidden');
			wikiMinimized = true;
		}
		window.onresize();
	});
	window.onresize();

	Wiki.goto('http://wikigame.decompressiongame.com');
});