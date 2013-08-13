ig.module(
	'game.events.challengerApproaches'
)
.requires(
	'impact.entity',
    'game.events.baseEvent'
)
.defines(function(){
	ChallengerApproaches = BaseEvent.extend({

        name : "A Challenger Approaches", 
        description : "New Boss is spawned in the CPC.", 

        onStart : function()
        {
        	GameCore.startingRoom.addBoss();
        }, 
    });
});