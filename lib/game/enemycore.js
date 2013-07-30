ig.module(
	'game.enemycore'
)
.requires(
	'impact.entity', 

	'game.entities.enemy'
)
.defines(function(){
	EntityEnemyCore = ig.Entity.extend(
	{
		allEnemyNames : 
		[
			'Small Roamer', 'Currupted Scout', 'Suicidal Drone', 'PeaceWatcher', 'Rampent Walker', 'Security Droid', 
			'Bionic Zombie', 'NavGuide', 
			'NanoBots', 'MediBot', 'Cleanser', 
			'Crew Autotron', 'Planetside Miner', 
		], 
		allSpawnableEnemyNames : 
		[
			'Small Roamer', 'Currupted Scout', 'Suicidal Drone', 'PeaceWatcher', 'Rampent Walker', 
			'Bionic Zombie', 'NavGuide', 
			'NanoBots', 'MediBot', 
			'Crew Autotron', 'Planetside Miner', 
		], 
		allBossNames : 
		[
			'PSI Assassin', 
			'Hacker', 
			'Mob of Bionic Zombies', 
			'Tyche', 
		], 

		init : function()
		{
			console.log('INIT ENEMYCORE');
		}, 

		requestEnemyByName : function(name)
		{
			var newEnemy = new EntityEnemy();
			switch (name)
			{
				case 'Small Roamer':
				newEnemy.name = 'Small Roamer';
				newEnemy.description = 'This is the Small Roamer';
				newEnemy.status.hitChance = 0.45;
				newEnemy.status.damage = 1;
				newEnemy.status.lootDropped = 0;
				break;
				case 'Currupted Scout':
				newEnemy.name = 'Currupted Scout';
				newEnemy.description = 'This is the Currupted Scout';
				newEnemy.status.hitChance = 0.55;
				newEnemy.status.damage = 1;
				newEnemy.status.lootDropped = 1;
				break;
				case 'Suicidal Drone':
				newEnemy.name = 'Suicidal Drone';
				newEnemy.description = 'This is the Suicidal Drone';
				newEnemy.status.hitChance = 1.0;
				newEnemy.status.damage = 3;
				newEnemy.status.lootDropped = 0;
				newEnemy.status.attackChance = 0.5;
				newEnemy.damageOnPlayerEnter = true;
				newEnemy.selfDestructOnAttack = true;
				break;
				case 'PeaceWatcher':
				newEnemy.name = 'PeaceWatcher';
				newEnemy.description = 'This is the PeaceWatcher';
				newEnemy.status.hitChance = 0.25;
				newEnemy.status.damage = 2;
				newEnemy.status.lootDropped = 1;
				break;
				case 'Rampant Walker':
				newEnemy.name = 'Rampant Walker';
				newEnemy.description = 'This is the Rampant Walker';
				newEnemy.status.hitChance = 0.15;
				newEnemy.status.damage = 1;
				newEnemy.status.lootDropped = 1;
				break;
				case 'Security Droid':
				newEnemy.name = 'Security Droid';
				newEnemy.description = 'This is the Security Droid';
				newEnemy.status.hitChance = 0.0;
				newEnemy.status.damage = 0;
				newEnemy.status.lootDropped = 0;
				break;

				case 'Bionic Zombie':
				newEnemy.name = 'Bionic Zombie';
				newEnemy.description = 'This is the Bionic Zombie';
				newEnemy.status.hitChance = 0.35;
				newEnemy.status.damage = 2;
				newEnemy.status.lootDropped = 0;
				break;
				case 'NavGuide':
				newEnemy.name = 'NavGuide';
				newEnemy.description = 'This is the NavGuide';
				newEnemy.status.hitChance = 0.3;
				newEnemy.status.damage = 2;
				newEnemy.status.lootDropped = 0;
				break;

				case 'NanoBots':
				newEnemy.name = 'NanoBots';
				newEnemy.description = 'This is the NanoBots';
				newEnemy.status.hitChance = 0.1;
				newEnemy.status.damage = 1;
				newEnemy.status.lootDropped = 0;
				break;
				case 'MediBot':
				newEnemy.name = 'MediBot';
				newEnemy.description = 'This is the MediBot';
				newEnemy.status.hitChance = 0.3;
				newEnemy.status.damage = 2;
				newEnemy.status.lootDropped = 0;
				break;
				case 'Cleanser':
				newEnemy.name = 'Cleanser';
				newEnemy.description = 'This is the Cleanser';
				newEnemy.status.hitChance = 0.0;
				newEnemy.status.damage = 0;
				newEnemy.status.lootDropped = 0;
				break;

				case 'Crew Autotron':
				newEnemy.name = 'Crew Autotron';
				newEnemy.description = 'This is the Crew Autotron';
				newEnemy.status.hitChance = 0.3;
				newEnemy.status.damage = 2;
				newEnemy.status.lootDropped = 0;
				break;
				case 'Planetside Miner':
				newEnemy.name = 'Planetside Miner';
				newEnemy.description = 'This is the Planetside Miner';
				newEnemy.status.hitChance = 0.15;
				newEnemy.status.damage = 3;
				newEnemy.status.lootDropped = 1;
				break;

				case 'PSI Assassin':
				break;
				case 'Hacker':
				break;
				case 'Mob of Bionic Zombies':
				break;
				case 'Tyche':
				break;

				default:
				break;
			}
			return newEnemy;
		}, 
		requestEnemyByEnemyClassName : function(className)
		{
			var chance = Math.random();
			switch (className)
			{
				case 'Security':
				if (chance >= 0.7) 
					return this.requestEnemyByName('Small Roamer');
				else if (chance >= 0.5) 
					return this.requestEnemyByName('Currupted Scout');
				else if (chance >= 0.3) 
					return this.requestEnemyByName('Suicidal Drone');
				else if (chance >= 0.2) 
					return this.requestEnemyByName('PeaceWatcher');
				else if (chance >= 0.1) 
					return this.requestEnemyByName('Rampant Walker');
				else 
					return this.requestEnemyByName('Security Drone');
				break;

				case 'Civilian':
				if (chance >= 0.5) 
					return this.requestEnemyByName('Bionic Zombie');
				else 
					return this.requestEnemyByName('NavGuide');
				break;

				case 'Medical':
				if (chance >= 0.7) 
					return this.requestEnemyByName('NanoBots');
				else if (chance >= 0.1) 
					return this.requestEnemyByName('MediBot');
				else 
					return this.requestEnemyByName('Cleanser');
				break;

				case 'Maintenance':
				if (chance >= 0.3) 
					return this.requestEnemyByName('Crew Autotron');
				else 
					return this.requestEnemyByName('Planetside Miner');
				break;

				case 'Boss':
				if (chance >= 0.75) 
					return this.requestEnemyByName('PSI Assassin');
				else if (chance >= 0.5) 
					return this.requestEnemyByName('Hacker');
				else if (chance >= 0.25) 
					return this.requestEnemyByName('Mob of Bionic Zombies');
				else 
					return this.requestEnemyByName('Tyche');
				break;

				default:
				break;
			}
			return null;
		}, 

		generateRandomEnemy : function()
		{
			var index = Math.floor(Math.random() * this.allEnemyNames.length);
			var name = this.allEnemyNames[index];
			return this.requestEnemyByName(name);
		}, 
		generateRandomSpawnableEnemy : function()
		{
			var index = Math.floor(Math.random() * this.allSpawnableEnemyNames.length);
			var name = this.allSpawnableEnemyNames[index];
			return this.requestEnemyByName(name);
		}, 
		generateRandomBoss : function()
		{
			var index = Math.floor(Math.random() * this.allBossNames.length);
			var name = this.allBossNames[index];
			return this.requestEnemyByName(name);
		}, 
		generateEnemyFromEnemyClasseNames : function(listOfClassNames)
		{
			if (listOfClassNames.length < 1) return null;

			var index = Math.floor(Math.random() * listOfClassNames.length);
			var className = listOfClassNames[index];
			return this.requestEnemyByEnemyClassName(className);
		}, 
	});

});