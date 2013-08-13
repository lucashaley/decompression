ig.module(
	'game.events.silence'
)
.requires(
	'impact.entity',
    'game.events.baseEvent'
)
.defines(function(){
	Silence = BaseEvent.extend({

        name : "Silence", 
        description : "No event for this phase. Game progresses as usual.", 
    });
});