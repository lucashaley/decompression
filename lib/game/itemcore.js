ig.module(
	'game.itemcore'
)
.requires(
	'impact.entity', 

	'game.items.baseItem', 

	'game.items.redKeycard', 
	'game.items.blueKeycard', 
	'game.items.greenKeycard', 

	'game.items.water', 
	'game.items.smallSnack', 
	'game.items.healthKit', 
	'game.items.substanceX', 
	'game.items.reflexShield', 
	'game.items.airMask', 
	'game.items.exoSuit', 

	'game.items.modA', 
	'game.items.modB', 
	'game.items.modC', 
	'game.items.reprogrammingHardware', 
	'game.items.friendlyDrone', 

	'game.items.overrideKey', 

	'game.items.systemReset', 

	'game.items.backpack', 

	'game.items.repairKit', 
	'game.items.resourceDetector', 

	'game.items.sensorImplant', 
	'game.items.discoveryImplant', 
	'game.items.defenseImplant', 
	'game.items.commandImplant', 
	'game.items.reflexImplant', 
	'game.items.quantumImplant', 

	'game.items.junkItem'
)
.defines(function(){
	EntityItemCore = ig.Entity.extend(
	{
		itemClasses : 
		[
			{name : 'Keycard', items : 
				[
					{name : 'Red Keycard',            remaining : 0, maxRemaining : 2}, 
					{name : 'Blue Keycard',           remaining : 0, maxRemaining : 2}, 
					{name : 'Green Keycard',          remaining : 0, maxRemaining : 2}, 
				]}, 
			{name : 'Health', items : 
				[
					{name : 'Water',                  remaining : 0, maxRemaining : 5}, 
					{name : 'Small Snack',            remaining : 0, maxRemaining : 2}, 
					{name : 'Health Kit',             remaining : 0, maxRemaining : 2}, 
					{name : 'Substance X',            remaining : 0, maxRemaining : 1}, 
					{name : 'Reflex Shield',          remaining : 0, maxRemaining : 1}, 
					{name : 'Air Mask',               remaining : 0, maxRemaining : 1}, 
					{name : 'Exo-Suit',               remaining : 0, maxRemaining : 1}, 
				]}, 
			{name : 'Attack', items : 
				[
					{name : 'Mod A',                  remaining : 0, maxRemaining : 10}, 
					{name : 'Mod B',                  remaining : 0, maxRemaining : 3}, 
					{name : 'Mod C',                  remaining : 0, maxRemaining : 2}, 
					{name : 'Reprogramming Hardware', remaining : 0, maxRemaining : 1}, 
					{name : 'Friendly Drone',         remaining : 0, maxRemaining : 1}, 
				]}, 
			{name : 'Movement', items : 
				[
					//{name : 'Teleporter',             remaining : 0, maxRemaining : 1}, 
					{name : 'Override Key',           remaining : 0, maxRemaining : 1}, 
				]}, 
			{name : 'Event', items : 
				[
					{name : 'System Reset',           remaining : 0, maxRemaining : 1}, 
				]}, 
			{name : 'Inventory', items : 
				[
					{name : 'Backpack',               remaining : 0, maxRemaining : 2}, 
				]}, 
			{name : 'Scavenge', items : 
				[
					{name : 'Repair Kit',             remaining : 0, maxRemaining : 1}, 
					{name : 'Resource Detector',      remaining : 0, maxRemaining : 1}, 
				]}, 
			{name : 'Implant', items : 
				[
					{name : 'Sensor Implant',         remaining : 0, maxRemaining : 1}, 
					{name : 'Discovery Implant',      remaining : 0, maxRemaining : 1}, 
					{name : 'Defense Implant',        remaining : 0, maxRemaining : 1}, 
					{name : 'Command Implant',        remaining : 0, maxRemaining : 1}, 
					{name : 'Reflex Implant',         remaining : 0, maxRemaining : 1}, 
					{name : 'Quantum Implant',        remaining : 0, maxRemaining : 1}, 
				]}, 
		], 
		itemsLeft : new Array(), 

		init : function()
		{
			this.reset();
			//console.log('ITEM CLASSES ', this.itemClasses);
		}, 

		reset : function()
		{
			this.itemsLeft = [];
			for (var i = 0; i < this.itemClasses.length; i++)
			{
				var itemClass = this.itemClasses[i];
				for (var k = 0; k < itemClass.items.length; k++)
				{
					var item = itemClass.items[k];
					item.remaining = item.maxRemaining;
					this.itemsLeft.push(item.name);
				}
			}
		}, 

		isItemClassEmpty : function(itemClass)
		{
			var count = 0;
			for (var i = 0; i < itemClass.items.length; i++)
			{
				var item = itemClass.items[i];
				count += item.remaining;
			}
			//console.log(count);
			if (count < 1) return true;
			return false;
		}, 
		areItemClassesEmpty : function(listOfItemClasses)
		{
			var result = true;
			for (var i = 0; i < listOfItemClasses.length; i++)
			{
				result = result && this.isItemClassEmpty(listOfItemClasses[i]);
			}
			return result;
		}, 
		getOpenItemFromItemClass : function(itemClass)
		{
			var available = [];
			for (var i = 0; i < itemClass.items.length; i++)
			{
				var item = itemClass.items[i];
				if (item.remaining > 0) available.push(item);
			}

			if (available.length < 1) return null;
			var index = Math.floor(Math.random() * available.length);
			return available[index];
		}, 
		getOpenItemClass : function()
		{
			var available = [];
			for (var i = 0; i < this.itemClasses.length; i++)
			{
				var itemClass = this.itemClasses[i];
				//console.log(itemClass);
				if (!this.isItemClassEmpty(itemClass)) available.push(itemClass);
			}
			//console.log(available);

			if (available.length < 1) return null;
			var index = Math.floor(Math.random() * available.length);
			return available[index];
		}, 

		requestJunk : function()
		{
            var chance = Math.random();
            if (chance <= 0.05)
            {
            	// Short Circuit
            }
            else if (chance <= 0.075)
            {
            	// Laser Trip Wire
            }
            else if (chance <= 0.010)
            {
            	// They Awaken
            }
			return new JunkItem();
		}, 
		requestItemByName : function(itemName)
		{
			switch (itemName)
			{
				case 'Red Keycard':
				return new RedKeycard();
				case 'Blue Keycard':
				return new BlueKeycard();
				case 'Green Keycard':
				return new GreenKeycard();

				case 'Water':
				return new Water();
				case 'Small Snack':
				return new SmallSnack();
				case 'Health Kit':
				return new HealthKit();
				case 'Substance X':
				return new SubstanceX();
				case 'Reflex Shield':
				return new ReflexShield();
				case 'Air Mask':
				return new AirMask();
				case 'Exo-Suit':
				return new ExoSuit();

				case 'Mod A':
				return new ModA();
				case 'Mod B':
				return new ModB();
				case 'Mod C':
				return new ModC();
				case 'Reprogramming Hardware':
				return new ReprogrammingHardware();
				case 'Friendly Drone':
				return new FriendlyDrone();

				case 'Override Key':
				return new OverrideKey();

				case 'System Reset':
				return new SystemReset();

				case 'Backpack':
				return new Backpack();

				case 'Repair Kit':
				return new RepairKit();
				case 'Resource Detector':
				return new ResourceDetector();

				case 'Sensor Implant':
				return new SensorImplant();
				case 'Discovery Implant':
				return new DiscoveryImplant();
				case 'Defense Implant':
				return new DefenseImplant();
				case 'Command Implant':
				return new CommandImplant();
				case 'Reflex Implant':
				return new ReflexImplant();
				case 'Quantum Implant':
				return new QuantumImplant();

				default:
				break;
			}
			return this.requestJunk();
		}, 
		requestItemByItemClass : function(itemClass)
		{
			if (itemClass == null) return this.requestJunk();
			var item = this.getOpenItemFromItemClass(itemClass);
			//console.log(item);
			if (item == null) return this.requestJunk();
			item.remaining--;
			return this.requestItemByName(item.name);
		}, 
		requestItemByItemClassName : function(itemClassName)
		{
			for (var i = 0; i < this.itemClasses.length; i++)
			{
				var itemClass = this.itemClasses[i];
				if (itemClass.name != itemClassName) continue;

				return this.requestItemByItemClass(itemClass);
			}
			return this.requestJunk();
		}, 

		otherItemClasses : function(listOfItemClasseNames)
		{
			if (listOfItemClasseNames.length < 1) return [];
			var result = [];
			for (var i = 0; i < this.itemClasses.length; i++)
			{
				var itemClass = this.itemClasses[i];
				var alreadyHave = false;
				for (var k = 0; k < listOfItemClasseNames.length; k++)
				{
					if (itemClass.name == listOfItemClasseNames[k]) alreadyHave = true;
				}
				if (!alreadyHave) result.push(itemClass.name);
			}
			return result;
		}, 

		generateRandomItem : function()
		{
			var itemClass = this.getOpenItemClass(this.itemClasses);
			return this.requestItemByItemClass(itemClass);
		}, 
		generateRandomNonKeycardItem : function()
		{
			return this.generateItemFromItemClasseNames(['Health', 'Attack', 'Movement', 'Event', 'Inventory', 'Scavenge', 'Implant']);
		}, 
		generateItemFromItemClasseNames : function(listOfItemClasseNames)
		{
			if (listOfItemClasseNames.length < 1) return this.requestJunk();

			var itemClass = this.getOpenItemClass(listOfItemClasseNames);
			return this.requestItemByItemClass(itemClass);
		}, 
	});

});