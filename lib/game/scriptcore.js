ig.module(
	'game.scriptcore'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityScriptCore = ig.Entity.extend(
	{
		WonGame : "YOU HAVE WON THE GAME", 
		StartingGame : "STARTING GAME", 
		EndingGame : "ENDING GAME", 
		NewPhase : "STARTING NEW PHASE", 
		EndPhase : "ENDING PHASE", 
		NewCycle : "STARTING NEW CYCLE", 
		EndCycle : "ENDING CYCLE", 
		CyclesRemaining : "CYCLES REMAINING "/* number */, 
		Blank : "&nbsp;", 

		StartNewEvent : "STARTING NEW EVENT "/* event name */, 

		BossEnteredRoom : "SPAWNING BOSS "/* boss name */, 

		PlayerRespawnCivilian : /* name */" IS REBORN AS A Civilian", 
		PlayerStartTurn : /* name */" STARTING THEIR TURN", 
		PlayerEndTurn : /* name */" ENDING THEIR TURN", 
		PlayerAttackingEnemy : /* player */" ATTACKING ENEMY "/* enemy */, 
		PlayerAttackMissed : "ATTACK MISSED", 
		PlayerRetryAttack : "RETRYING ATTACK", 
		PlayerDoorLockedDown : "THE ROOM IS LOCKED DOWN", 
		PlayerMoveThroughDoor : "MOVING TO DOOR", 
		PlayerUnlockDoor : "UNLOCK DOOR", 
		PlayerScavenge : "SCAVENGING FOR ITEM "/* item */, 
		PlayerScavengeNoItems : "ROOM HAS NO ITEMS", 
		PlayerScavengeFullInventory : "INVENTORY IS FULL", 
		PlayerHeal : "YOU HEAL ARE HEALED BY "/* amount */, 
		PlayerHealAlreadyFull : "YOU ARE ALREADY AT FULL HEALTH", 
		PlayerConvertJunk : "YOU CONVERT JUNK INTO SOMETHING USABLE", 
		PlayerNeedJunk : "YOU NEED ATLEAST 2 JUNK", 
		PlayerUseItem : "USING ITEM "/* item */, 
		PlayerGiveItem : "GIVING ITEM "/* item */, 
		PlayerDestroyItem : "DESTROYING ITEM "/* item */, 
		PlayerIgnoreDamage : "THE DAMAGE IS IGNORED", 
		PlayerImmuneNeurotoxin : "IMMUNE TO NEUROTOXIN", 
		PlayerDeath : /* name */" HAS DIED", 

		ItemBaseName : "dupe", 
		ItemBaseDescription : "This is an item", 
		ItemBaseUse : "This item cannot be used", 
		ItemBaseCannotUse : "This item cannot be used", 

		ItemAirMaskName : "Air Mask", 
		ItemAirMaskDescription : "Makes you immune to Neurotoxin", 
		ItemBackpackName : "Backpack", 
		ItemBackpackDescription : "Gives +1 inventory slot", 
		ItemBackpackUse : "You gain 1 inventory slot", 
		ItemBlueKeycardName : "Blue Keycard", 
		ItemBlueKeycardDescription : "This is an item", 
		ItemBlueKeycardUse : "You used Blue Keycard", 
		ItemBlueKeycardCannotUse : "This must be used in the starting area", 
		ItemExoSuitName : "Exo-Suit", 
		ItemExoSuitDescription : "Gives you +1 armor", 
		ItemFriendlyDroneName : "Friendly Drone", 
		ItemFriendlyDroneDescription : "This drone will help with attack rolls", 
		ItemGreenKeycardName : "Blue Keycard", 
		ItemGreenKeycardDescription : "This is an item", 
		ItemGreenKeycardUse : "You used Blue Keycard", 
		ItemGreenKeycardCannotUse : "This must be used in the starting area", 
		ItemHealthKitName : "Health Kit", 
		ItemHealthKitDescription : "This is an item", 
		ItemHealthKitUse : "You gain 3 health", 
		ItemHealthKitCannotUse : "You are already at full health", 
		ItemModAName : "Mod A", 
		ItemModADescription : "Gives you +1 accuracy", 
		ItemModBName : "Mod B", 
		ItemModBDescription : "Gives you +2 accuracy", 
		ItemModCName : "Mod C", 
		ItemModCDescription : "Gives you +3 accuracy", 
		ItemOverrideKeyName : "Override Key", 
		ItemOverrideKeyDescription : "Allows you to exit locked down rooms", 
		ItemRedKeycardName : "Red Keycard", 
		ItemRedKeycardDescription : "This is an item", 
		ItemRedKeycardUse : "You used Red Keycard", 
		ItemRedKeycardCannotUse : "This must be used in the starting area", 
		ItemReflexShieldName : "Reflex Shield", 
		ItemReflexShieldDescription : "This is an item", 
		ItemReflexShieldUse : "The next incoming damage is negated", 
		ItemRepairKitName : "Repair Kit", 
		ItemRepairKitDescription : "This is an item", 
		ItemRepairKitUse : "You transform some junk into a usable item", 
		ItemReprogrammingHardwareName : "Reprogramming Hardware", 
		ItemReprogrammingHardwareDescription : "This is an item", 
		ItemReprogrammingHardwareUse : "The hardware searched for the nearest machine to reprogram", 
		ItemReprogrammingHardwareCannotUse : "Chould not find any enemies in the room", 
		ItemResourceDetectorName : "Resource Detector", 
		ItemResourceDetectorDescription : "Refreshes room items", 
		ItemResourceDetectorUse : "This room's items have been refreshed", 
		ItemResourceDetectorCannotUse : "This room has no items", 
		ItemSmallSnackName : "Small Snack", 
		ItemSmallSnackDescription : "This is an item", 
		ItemSmallSnackUse : "You gain 2 health", 
		ItemSmallSnackCannotUse : "You are already at full health", 
		ItemSubstanceXName : "Substance X", 
		ItemSubstanceXDescription : "This is an item", 
		ItemSubstanceXUse : "You are restored to full health", 
		ItemSubstanceXCannotUse : "You are already at full health", 
		ItemSystemResetName : "System Reset", 
		ItemSystemResetDescription : "Disables the current event", 
		ItemSystemResetUse : "The current event is disabled", 
		ItemWaterName : "Water", 
		ItemWaterDescription : "This is an item", 
		ItemWaterUse : "You gain 1 health", 
		ItemWaterCannotUse : "You are already at full health", 

		ItemSensorImplantName : "Sensor Implant", 
		ItemSensorImplantDescription : "", 
		ItemCommandImplantName : "Command Implant", 
		ItemCommandImplantDescription : "", 
		ItemReflexImplantName : "Reflex Implant", 
		ItemReflexImplantDescription : "", 
		ItemQuantumImplantName : "Quantum Implant", 
		ItemQuantumImplantDescription : "", 
		ItemDiscoveryImplantName : "Discovery Implant", 
		ItemDiscoveryImplantDescription : "", 
		ItemDefenseImplantName : "Defense Implant", 
		ItemDefenseImplantDescription : "", 

		ItemJunkName01 : 'A Potted Plant', 
		ItemJunkName02 : 'Empty Bottle', 
		ItemJunkName03 : 'Broken Keycard', 
		ItemJunkName04 : 'Wasted Ammo', 
		ItemJunkName05 : 'Scrap Parts', 
		ItemJunkName06 : 'Empty Cardboard Box', 
		ItemJunkName07 : 'Video Game', 
		ItemJunkName08 : 'Powerless Cell Phone', 
		ItemJunkName09 : 'Trashed Paperwork', 
		ItemJunkName10 : 'Power Cord', 
		ItemJunkDescription : "Just a piece of junk", 

		DoorDescription : "This is a door.", 

		EnemyAttackingPlayer : /* enemy */" ATTACKING "/* player */, 
		EnemyDamage1 : /* player */" TAKING "/* damage amount */, 
		EnemyDamage2 : " DAMAGE", 
		EnemyAttackMissed : "ATTACK MISSED", 
		EnemyDeath : /* enemy */" DESTROYED", 
		EnemySpawningOther : /* spawner */" SPAWNS A "/* spawned */, 

		ModOfBionicZombiesName : "Mod of Bionic Zombies", 
		ModOfBionicZombiesDescription : "", 
		PSIAssassinName : "PSI Assassin", 
		PSIAssassinDescription : "This is a PSI Assassin", 
		HackerName : "Hacker", 
		HackerDescription : "This is a Hacker", 
		HackerSpawnInRoom : /* name */" HAS SPAWNED AN EMEMY IN "/* room */, 
		HackerLockDoors : /* name */" HAS LOCKED ALL DOORS", 
		TycheName : "Tyche", 
		TycheDescription : "This is Tyche", 
		TycheSpawnInRoom : /* name */" HAS SPAWNED AN EMEMY IN "/* room */, 
		TycheDamageAllPlayers : "ALL PLAYERS RECIEVE 2 DAMAGE", 
		TycheDamagePlayer : /* player */" RECIEVES 4 DAMAGE", 
		TycheDoesNothing : /* name */" DOES NOTHING", 
		TycheHealsPlayers : "ALL PLAYERS ARE HEALED BY 1 HITPOINT", 
		TycheGivesKeycard : /* player */" RECIEVES A KEYCARD", 

		BionicZombieName : "Bionic Zombie", 
		BionicZombieDescription : "This is a Bionic Zombie", 
		CleanserName : "Cleanser", 
		CleanserDescription : "This is a Cleanser", 
		SuicidalDroneName : "Suicidal Drone", 
		SuicidalDroneDescription : "This is a Suicidal Drone", 
		SmallRoamerName : "Small Roamer", 
		SmallRoamerDescription : "This is a Small Roamer", 
		SecurityDroidName : "Security Droid", 
		SecurityDroidDescription : "This is a Security SecurityDroidDroid", 
		PlanetsideMinerName : "Planetside Miner", 
		PlanetsideMinerDescription : "This is a Planetside Miner", 
		RampantWalkerName : "Rampant Walker", 
		RampantWalkerDescription : "This is a Rampant Walker", 
		PeaceWatcherName : "PeaceWatcher", 
		PeaceWatcherDescription : "This is a PeaceWatcher", 
		CorruptedScoutName : "Corrupted Scout", 
		CorruptedScoutDescription : "This is a Corrupted Scout", 
		NavGuideName : "NavGuide", 
		NavGuideDescription : "This is a NavGuide", 
		NanoBotsName : "NanoBots", 
		NanoBotsDescription : "This is a NanoBots", 
		SmallMediBotName : "Small MediBot", 
		SmallMediBotDescription : "This is a MediBot", 
		CrewAutotronName : "Crew Autotron", 
		CrewAutotronDescription : "This is a Crew Autotron", 

		init : function()
		{
			//console.log('INIT SCRIPTCORE');
		}, 
	});
});