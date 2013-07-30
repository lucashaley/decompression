ig.module(
	'game.events.baseEvent'
)
.requires(
	'impact.entity'
)
.defines(function(){
	BaseEvent = ig.Class.extend({

        name : "dupe", 
        description : "This is an event", 

        init : function()
        {
            return;
        },

        update : function()
        {
            this.parent();
            console.log('updating event');
        },

        onStart : function()
        {
            return;
        }, 
        onEnd : function()
        {
            return;
        }, 

        onCycleStart : function()
        {
            return;
        }, 
        onCycleEnd : function()
        {
            return;
        }, 
        onTurnStart : function()
        {
            return;
        }, 
        onTurnEnd : function()
        {
            return;
        }, 
    });
});