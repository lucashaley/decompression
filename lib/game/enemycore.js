ig.module(
	'game.enemycore'
)
.requires(
	'impact.entity', 

	'game.entities.enemy', 

	'game.entities.enemies.smallRoamer', 
	'game.entities.enemies.corruptedScout', 
	'game.entities.enemies.suicidalDrone', 
	'game.entities.enemies.mediBot', 
	'game.entities.enemies.navGuide', 
	'game.entities.enemies.crewAutotron', 
	'game.entities.enemies.bionicZombie', 
	'game.entities.enemies.peaceWatcher', 
	'game.entities.enemies.planetsideMiner', 
	'game.entities.enemies.rampantWalker', 
	'game.entities.enemies.nanoBots', 
	'game.entities.enemies.cleanser', 
	'game.entities.enemies.securityDroid', 

	'game.entities.bosses.psiAssassin', 
	'game.entities.bosses.hacker', 
	'game.entities.bosses.mobOfBionicZombies', 
	'game.entities.bosses.tyche'
)
.defines(function(){
	EntityEnemyCore = ig.Entity.extend(
	{
		allEnemyNames : 
		[
			'Small Roamer', 'Corrupted Scout', 'Suicidal Drone', 'PeaceWatcher', 'Rampant Walker', 'Security Droid', 
			'Bionic Zombie', 'NavGuide', 
			'NanoBots', 'MediBot', 'Cleanser', 
			'Crew Autotron', 'Planetside Miner', 
		], 
		allSpawnableEnemyNames : 
		[
			'Small Roamer', 'Corrupted Scout', 'Suicidal Drone', 'PeaceWatcher', 'Rampant Walker', 
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
			//console.log('INIT ENEMYCORE');
		}, 

		requestEnemyByName : function(name)
		{
			switch (name)
			{
				case 'Small Roamer':
				return new SmallRoamer();
				break;
				case 'Corrupted Scout':
				return new CorruptedScout();
				break;
				case 'Suicidal Drone':
				return new SuicidalDrone();
				break;
				case 'MediBot':
				return new MediBot();
				break;
				case 'NavGuide':
				return new NavGuide();
				break;
				case 'Crew Autotron':
				return new CrewAutotron();
				break;
				case 'Bionic Zombie':
				return new BionicZombie();
				break;
				case 'PeaceWatcher':
				return new PeaceWatcher();
				break;
				case 'Planetside Miner':
				return new PlanetsideMiner();
				break;
				case 'Rampant Walker':
				return new RampantWalker();
				break;
				case 'NanoBots':
				return new NanoBots();
				break;
				case 'Cleanser':
				return new Cleanser();
				break;
				case 'Security Droid':
				return new SecurityDroid();
				break;

				case 'PSI Assassin':
				return new PSIAssassin();
				break;
				case 'Hacker':
				return new Hacker();
				break;
				case 'Mob of Bionic Zombies':
				return new ModOfBionicZombies();
				break;
				case 'Tyche':
				return new TycheBoss();
				break;

				default:
				break;
			}
			return null;
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
					return this.requestEnemyByName('Corrupted Scout');
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

		generateRandomEnemyName : function()
		{
			var index = Math.floor(Math.random() * this.allEnemyNames.length);
			var name = this.allEnemyNames[index];
			return name;
		}, 
		generateRandomSpawnableEnemyName : function()
		{
			var index = Math.floor(Math.random() * this.allSpawnableEnemyNames.length);
			var name = this.allSpawnableEnemyNames[index];
			return name;
		}, 
		generateRandomBossName : function()
		{
			var index = Math.floor(Math.random() * this.allBossNames.length);
			var name = this.allBossNames[index];
			return name;
		}, 
		generateRandomEnemy : function()
		{
			var name = this.generateRandomEnemyName();
			return this.requestEnemyByName(name);
		}, 
		generateRandomSpawnableEnemy : function()
		{
			var name = this.generateRandomSpawnableEnemyName();
			return this.requestEnemyByName(name);
		}, 
		generateRandomBoss : function()
		{
			var name = this.generateRandomBossName();
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