ig.module(
	'game.eventcore'
)
.requires(
	'impact.entity', 

	'game.events.baseEvent', 

	'game.events.silence', 
	'game.events.challengerApproaches', 
	'game.events.lockdown', 
	'game.events.lowAir', 
	'game.events.nerveGas', 
	'game.events.disablingField', 
	'game.events.theWave', 
	'game.events.panic', 
	'game.events.darkness'
)
.defines(function(){
	EntityEventCore = ig.Entity.extend(
	{
		allEventNames : 
		[
			'Silence', 
			'A Challenger Approaches', 
			'Lockdown', 
			'Nerve Gas', 
			'Low Air', 
			'Disabling Field', 
			'The Wave', 
			'Panic', 
			'Darkness', 
		], 

		init : function()
		{
			//console.log('INIT EVENTCORE');
		}, 

		requestEventByName : function(name)
		{
			switch (name)
			{
				case 'Silence':
				return new Silence();
				break;
				case 'A Challenger Approaches':
				return new ChallengerApproaches();
				break;
				case 'Lockdown':
				return new Lockdown();
				break;
				case 'Nerve Gas':
				return new NerveGas();
				break;
				case 'Low Air':
				return new LowAir();
				break;
				case 'Disabling Field':
				return new DisablingField();
				break;
				case 'The Wave':
				return new TheWave();
				break;
				case 'Panic':
				return new Panic();
				break;
				case 'Darkness':
				return new Darkness();
				break;

				default:
				break;
			}
			return new BaseEvent();
		}, 

		generateRandomEventName : function()
		{
			var index = Math.floor(Math.random() * this.allEventNames.length);
			var name = this.allEventNames[index];
			return name;
		}, 
		generateRandomEvent : function()
		{
			var name = this.generateRandomEventName();
			return this.requestEventByName(name);
		}, 
	});
});