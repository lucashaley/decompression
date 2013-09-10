ig.module(
	'game.assetcore'
)
.requires(
	'impact.image', 

    'game.ui.menuButton', 
    'game.ui.contextMenu', 
    'game.ui.fontSheet', 
    'game.ui.animSheet'
)
.defines(function(){
	EntityAssetCore = ig.Entity.extend(
	{
		images : 
		{
			button : new ig.Image('media/button.png'), 
			contextMenu : new ig.Image('media/contextMenu.png'), 

			armory_D : new ig.Image('media/rooms/Armory/rm_armory_01_D.png'),
			armory_N : new ig.Image('media/rooms/Armory/rm_armory_01_N.png'),
			armory_R : new ig.Image('media/rooms/Armory/rm_armory_01_R.png'),
			barracks_D : new ig.Image('media/rooms/Barracks/rm_barracks_01_D.png'),
			barracks_N : new ig.Image('media/rooms/Barracks/rm_barracks_01_N.png'),
			barracks_R : new ig.Image('media/rooms/Barracks/rm_barracks_01_R.png'),
			tyche_D : new ig.Image('media/rooms/Tyche/rm_s_Tyche_01_c.png'),
			tyche_N : new ig.Image('media/rooms/Tyche/rm_s_Tyche_01_n.png'),
			tyche_R : new ig.Image('media/rooms/Tyche/rm_s_Tyche_01_h.png'),
			recreation_D : new ig.Image('media/rooms/Recreation/rm_recreation_01_D.png'),
			recreation_N : new ig.Image('media/rooms/Recreation/rm_recreation_01_N.png'),
			recreation_R : new ig.Image('media/rooms/Recreation/rm_recreation_01_R.png'),
			recreation_E : new ig.Image('media/rooms/Recreation/rm_recreation_01_E.png'),
			infirmary_D : new ig.Image('media/rooms/Infirmary/rm_r_Infirmary_1_c.png'),
			infirmary_N : new ig.Image('media/rooms/Infirmary/rm_r_Infirmary_1_n.png'),
			infirmary_R : new ig.Image('media/rooms/Infirmary/rm_r_Infirmary_1_h.png'),
			hangar_D : new ig.Image('media/rooms/Hangar/rm_hangar_01_D.png'),
			hangar_N : new ig.Image('media/rooms/Hangar/rm_hangar_01_N.png'),
			hangar_R : new ig.Image('media/rooms/Hangar/rm_hangar_01_R.png'),
			hangar_E : new ig.Image('media/rooms/Hangar/rm_hangar_01_E.png'),
			engineeringReactor_D : new ig.Image('media/rooms/EngineeringReactor/rm_engineering_01_D.png'),
			engineeringReactor_N : new ig.Image('media/rooms/EngineeringReactor/rm_engineering_01_N.png'),
			engineeringReactor_R : new ig.Image('media/rooms/EngineeringReactor/rm_engineering_01_R.png'),
			engineeringCore_D : new ig.Image('media/rooms/EngineeringCore/rm_engineeringCore_01_D.png'),
			engineeringCore_N : new ig.Image('media/rooms/EngineeringCore/rm_engineeringCore_01_N.png'),
			engineeringCore_R : new ig.Image('media/rooms/EngineeringCore/rm_engineeringCore_01_R.png'),
			brig_D : new ig.Image('media/rooms/Brig/rm_brig_01_D.png'),
			brig_N : new ig.Image('media/rooms/Brig/rm_brig_01_N.png'),
			brig_R : new ig.Image('media/rooms/Brig/rm_brig_01_R.png'),
			bridge_D : new ig.Image('media/rooms/Bridge/rm_bridge_01_D.png'),
			bridge_N : new ig.Image('media/rooms/Bridge/rm_bridge_01_N.png'),
			bridge_R : new ig.Image('media/rooms/Bridge/rm_bridge_01_R.png'),

			octoRoom_D: new ig.Image('media/rooms/Octo-room/rm_Corridor_Octo_01_D.png'),
			octoRoom_N: new ig.Image('media/rooms/Octo-room/rm_Corridor_Octo_01_N.png'),
			octoRoom_R: new ig.Image('media/rooms/Octo-room/rm_Corridor_Octo_01_R.png'),
			corridorT_D: new ig.Image('media/rooms/Corridor T/rm_corridorT_Armoury_01_D.png'),
			corridorT_N: new ig.Image('media/rooms/Corridor T/rm_corridorT_Armoury_01_N.png'),
			corridorT_R: new ig.Image('media/rooms/Corridor T/rm_corridorT_Armoury_01_R.png'),
			corridorStraight_D: new ig.Image('media/rooms/Corridor_Straight/rm_StraightArmoury_01_D .png'),
			corridorStraight_N: null, //new ig.Image('media/rooms/Corridor_Straight/rm_StraightArmoury_01_N .png'),
			corridorStraight_R: null, //new ig.Image('media/rooms/Corridor_Straight/rm_StraightArmoury_01_R .png'),
			corridorPit_D: new ig.Image('media/rooms/Corridor Pit/rm_ElbowPit_Engineering_01_D.png'),
			corridorPit_N: new ig.Image('media/rooms/Corridor Pit/rm_ElbowPit_Engineering_01_N.png'),
			corridorPit_R: new ig.Image('media/rooms/Corridor Pit/rm_ElbowPit_Engineering_01_R.png'),
			corridorElbow_D: new ig.Image('media/rooms/Corridor_Elbow_02/rm_elbow_engineering_01_D.png'),
			corridorElbow_N: new ig.Image('media/rooms/Corridor_Elbow_02/rm_elbow_engineering_01_N.png'),
			corridorElbow_R: new ig.Image('media/rooms/Corridor_Elbow_02/rm_elbow_engineering_01_R.png'),
			airlock_D: new ig.Image('media/rooms/Airlock/rm_Corridor_Airlock_04_D.png'),
			airlock_N: new ig.Image('media/rooms/Airlock/rm_Corridor_Airlock_04_N.png'),
			airlock_R: new ig.Image('media/rooms/Airlock/rm_Corridor_Airlock_04_R.png'),
			oddShape_D: new ig.Image('media/rooms/Odd Shape/rm_Corridor_Odd_01_D.png'),
			oddShape_N: new ig.Image('media/rooms/Odd Shape/rm_Corridor_Odd_01_N.png'),
			oddShape_R: new ig.Image('media/rooms/Odd Shape/rm_Corridor_Odd_01_R.png'),

			doorFloor_D : new ig.Image('media/doors/rm_door_floor_D.png'),
			doorFloor_N : new ig.Image('media/doors/rm_door_floor_N.png'),
			doorFloor_R : new ig.Image('media/doors/rm_door_floor_R.png'),
			doorPanel_D : new ig.Image('media/doors/rm_door_panel_D.png'),
			doorPanel_N : new ig.Image('media/doors/rm_door_panel_N.png'),
			doorPanel_R : new ig.Image('media/doors/rm_door_panel_R.png'),
			doubleDoorVert_D : new ig.Image('media/doors/rm_door_doubleDoorVert_D.png'),
			doubleDoorVert_N : new ig.Image('media/doors/rm_door_doubleDoorVert_N.png'),
			doubleDoorVert_R : new ig.Image('media/doors/rm_door_doubleDoorVert_R.png'),
			engineeringWide_D : new ig.Image('media/doors/rm_door_engineeringWide_D.png'),
			engineeringWide_N : new ig.Image('media/doors/rm_door_engineeringWide_N.png'),
			engineeringWide_R : new ig.Image('media/doors/rm_door_engineeringWide_R.png'),
			iconHoriz_D : new ig.Image('media/doors/rm_door_iconHorz_D.png'),
			iconHoriz_N : new ig.Image('media/doors/rm_door_iconHorz_N.png'),
			iconHoriz_R : new ig.Image('media/doors/rm_door_iconHorz_R.png'),
			singleTooth_D : new ig.Image('media/doors/rm_door_singleTooth_D.png'),
			singleTooth_N : new ig.Image('media/doors/rm_door_singleTooth_N.png'),
			singleTooth_R : new ig.Image('media/doors/rm_door_singleTooth_R.png'),
			wideFloor_D : new ig.Image('media/doors/rm_door_wideFloor_D.png'),
			wideFloor_N : new ig.Image('media/doors/rm_door_wideFloor_N.png'),
			wideFloor_R : new ig.Image('media/doors/rm_door_wideFloor_R.png'),

			doorLock_active : new ig.Image('media/doors/door_lock_active.png'),
			doorLock_inactive : new ig.Image('media/doors/door_lock_inactive.png'),
			doorLock_lockdown : new ig.Image('media/doors/door_lockdown.png'),

			player : new ig.Image('media/player1.png'), 

			autotron_Idle_FL_D : new ig.Image('media/enemies/Autotron/Autotron_04_D.png'), 
			autotron_Idle_FR_D : new ig.Image('media/enemies/Autotron/Autotron_01_D.png'), 
			autotron_Idle_RL_D : new ig.Image('media/enemies/Autotron/Autotron_03_D.png'), 
			autotron_Idle_RR_D : new ig.Image('media/enemies/Autotron/Autotron_02_D.png'), 
			autotron_Idle_FL_N : new ig.Image('media/enemies/Autotron/Autotron_04_N.png'), 
			autotron_Idle_FR_N : new ig.Image('media/enemies/Autotron/Autotron_01_N.png'), 
			autotron_Idle_RL_N : new ig.Image('media/enemies/Autotron/Autotron_03_N.png'), 
			autotron_Idle_RR_N : new ig.Image('media/enemies/Autotron/Autotron_02_N.png'), 
			autotron_Idle_FL_R : new ig.Image('media/enemies/Autotron/Autotron_04_R.png'), 
			autotron_Idle_FR_R : new ig.Image('media/enemies/Autotron/Autotron_01_R.png'), 
			autotron_Idle_RL_R : new ig.Image('media/enemies/Autotron/Autotron_03_R.png'), 
			autotron_Idle_RR_R : new ig.Image('media/enemies/Autotron/Autotron_02_R.png'), 
			zombie_Idle_FL_D : new ig.Image('media/enemies/BionicZombie/IsoZombie_Idle_FL.png'), 
			zombie_Idle_FR_D : new ig.Image('media/enemies/BionicZombie/IsoZombie_Idle_FR.png'), 
			zombie_Idle_RL_D : new ig.Image('media/enemies/BionicZombie/IsoZombie_Idle_RL.png'), 
			zombie_Idle_RR_D : new ig.Image('media/enemies/BionicZombie/IsoZombie_Idle_RR.png'), 
			zombie_Idle_FR_N : new ig.Image('media/enemies/BionicZombie/IsoZombie_N_Idle_FR.png'), 
			cleanser_Idle_FL_D : new ig.Image('media/enemies/Cleanser/IsoCleanser_FL_sprite_UPDATE.png'), 
			cleanser_Idle_FR_D : new ig.Image('media/enemies/Cleanser/IsoCleanser_FR_sprite_UPDATE.png'), 
			cleanser_Idle_RL_D : new ig.Image('media/enemies/Cleanser/IsoCleanser_BL_sprite_UPDATE.png'), 
			cleanser_Idle_RR_D : new ig.Image('media/enemies/Cleanser/IsoCleanser_BR_sprite_UPDATE.png'), 
			corruptedScout_Idle_FL_D : new ig.Image('media/enemies/CorruptedScout/corruptedScout_01_D.png'), 
			corruptedScout_Idle_FR_D : new ig.Image('media/enemies/CorruptedScout/corruptedScout_02_D.png'), 
			corruptedScout_Idle_FL_N : new ig.Image('media/enemies/CorruptedScout/corruptedScout_01_N.png'), 
			corruptedScout_Idle_FR_N : new ig.Image('media/enemies/CorruptedScout/corruptedScout_02_N.png'), 
			corruptedScout_Idle_FL_R : new ig.Image('media/enemies/CorruptedScout/corruptedScout_01_R.png'), 
			corruptedScout_Idle_FR_R : new ig.Image('media/enemies/CorruptedScout/corruptedScout_02_R.png'), 
			medibot_Idle_FL_D : new ig.Image('media/enemies/Medibot/Medibot_03_D.png'), 
			medibot_Idle_FR_D : new ig.Image('media/enemies/Medibot/Medibot_04_D.png'), 
			medibot_Idle_RL_D : new ig.Image('media/enemies/Medibot/Medibot_01_D.png'), 
			medibot_Idle_RR_D : new ig.Image('media/enemies/Medibot/Medibot_02_D.png'), 
			medibot_Idle_FL_N : new ig.Image('media/enemies/Medibot/Medibot_03_N.png'), 
			medibot_Idle_FR_N : new ig.Image('media/enemies/Medibot/Medibot_04_N.png'), 
			medibot_Idle_RL_N : new ig.Image('media/enemies/Medibot/Medibot_01_N.png'), 
			medibot_Idle_RR_N : new ig.Image('media/enemies/Medibot/Medibot_02_N.png'), 
			medibot_Idle_FL_R : new ig.Image('media/enemies/Medibot/Medibot_03_R.png'), 
			medibot_Idle_FR_R : new ig.Image('media/enemies/Medibot/Medibot_04_R.png'), 
			medibot_Idle_RL_R : new ig.Image('media/enemies/Medibot/Medibot_01_R.png'), 
			medibot_Idle_RR_R : new ig.Image('media/enemies/Medibot/Medibot_02_R.png'), 
			miner_Idle_FL_D : new ig.Image('media/enemies/Miner/Miner_02_D.png'), 
			miner_Idle_FR_D : new ig.Image('media/enemies/Miner/Miner_01_D.png'), 
			navGuide_Idle_FL_D : new ig.Image('media/enemies/NavGuide/NavGuide_04_D.png'), 
			navGuide_Idle_FR_D : new ig.Image('media/enemies/NavGuide/NavGuide_02_D.png'), 
			navGuide_Idle_RL_D : new ig.Image('media/enemies/NavGuide/NavGuide_01_D.png'), 
			navGuide_Idle_RR_D : new ig.Image('media/enemies/NavGuide/NavGuide_03_D.png'), 
			navGuide_Idle_FL_N : new ig.Image('media/enemies/NavGuide/NavGuide_04_N.png'), 
			navGuide_Idle_FR_N : new ig.Image('media/enemies/NavGuide/NavGuide_02_N.png'), 
			navGuide_Idle_RL_N : new ig.Image('media/enemies/NavGuide/NavGuide_01_N.png'), 
			navGuide_Idle_RR_N : new ig.Image('media/enemies/NavGuide/NavGuide_03_N.png'), 
			navGuide_Idle_FL_R : new ig.Image('media/enemies/NavGuide/NavGuide_04_R.png'), 
			navGuide_Idle_FR_R : new ig.Image('media/enemies/NavGuide/NavGuide_02_R.png'), 
			navGuide_Idle_RL_R : new ig.Image('media/enemies/NavGuide/NavGuide_01_R.png'), 
			navGuide_Idle_RR_R : new ig.Image('media/enemies/NavGuide/NavGuide_03_R.png'), 
			peaceWalker_Idle_FL_D : new ig.Image('media/enemies/PeaceWatcher/PeaceWatcher_01_D.png'), 
			peaceWalker_Idle_FR_D : new ig.Image('media/enemies/PeaceWatcher/PeaceWatcher_02_D.png'), 
			rampantWalker_Idle_FL_D : new ig.Image('media/enemies/RampantWalker/RampantWalker_01_D.png'), 
			rampantWalker_Idle_FR_D : new ig.Image('media/enemies/RampantWalker/RampantWalker_02_D.png'), 
			securityDrone_Idle_FL_D : new ig.Image('media/enemies/Security Drone/SecurityDrone_01_D.png'), 
			securityDrone_Idle_FR_D : new ig.Image('media/enemies/Security Drone/SecurityDrone_02_D.png'), 
			securityDrone_Idle_RL_D : new ig.Image('media/enemies/Security Drone/SecurityDrone_04_D.png'), 
			securityDrone_Idle_RR_D : new ig.Image('media/enemies/Security Drone/SecurityDrone_03_D.png'), 

			nanobots_D : new ig.Image('media/enemies/Nanobots/nanobots_sprite.png'), 
			smallRoamer_FL_D : new ig.Image('media/enemies/Small Roamer/smRoamerFL_sprite.png'), 
			smallRoamer_FR_D : new ig.Image('media/enemies/Small Roamer/smRoamerFR_sprite.png'), 
			smallRoamer_RL_D : new ig.Image('media/enemies/Small Roamer/smRoamerBL_sprite.png'), 
			smallRoamer_RR_D : new ig.Image('media/enemies/Small Roamer/smRoamerBR_sprite.png'), 
			suicideDrone_FL_D : new ig.Image('media/enemies/Suicide Drone/suicideDroneFL_sprite.png'), 
			suicideDrone_FR_D : new ig.Image('media/enemies/Suicide Drone/suicideDroneFR_sprite.png'), 
			suicideDrone_RL_D : new ig.Image('media/enemies/Suicide Drone/suicideDroneBL_sprite.png'), 
			suicideDrone_RR_D : new ig.Image('media/enemies/Suicide Drone/suicideDroneBR_sprite.png'), 

			ui_ChatMain : new ig.Image('media/ui/ui_chat_main.png'), 
			ui_ChatScollBar : new ig.Image('media/ui/ui_chat_scrollbar.png'), 
			ui_PDABottom : new ig.Image('media/ui/ui_pda_bot.png'), 
			ui_PDATop : new ig.Image('media/ui/ui_pda_top.png'), 
			ui_StatsActionIcon : new ig.Image('media/ui/ui_stats_actionicon.png'), 
			ui_StatsHealthIcon : new ig.Image('media/ui/ui_stats_healthicon.png'), 
			ui_StatsMain : new ig.Image('media/ui/ui_stats_main.png'), 
			ui_StatsModA : new ig.Image('media/ui/ui_stats_stats_moda.png'), 
			ui_StatsModB : new ig.Image('media/ui/ui_stats_stats_modb.png'), 
			ui_StatsModC : new ig.Image('media/ui/ui_stats_stats_modc.png'), 

			icon_AirMask : new ig.Image('media/items/ui_inventory_airmask.png'), 
			icon_Backpack : new ig.Image('media/items/ui_inventory_backpack.png'), 
			icon_ExoSuit : new ig.Image('media/items/ui_inventory_exosuit.png'), 
			icon_FriendlyDrone : new ig.Image('media/items/ui_inventory_friendlydrone.png'), 
			icon_HealthKit : new ig.Image('media/items/ui_inventory_healthkit.png'), 
			icon_KeycardBlue : new ig.Image('media/items/ui_inventory_keycardblue.png'), 
			icon_KeycardGreen : new ig.Image('media/items/ui_inventory_keycardgreen.png'), 
			icon_KeycardRed : new ig.Image('media/items/ui_inventory_keycardred.png'), 
			icon_ModA : new ig.Image('media/items/ui_inventory_moda.png'), 
			icon_ModB : new ig.Image('media/items/ui_inventory_modb.png'), 
			icon_ModC : new ig.Image('media/items/ui_inventory_modc.png'), 
			icon_Override : new ig.Image('media/items/ui_inventory_override.png'), 
			icon_ReflexShield : new ig.Image('media/items/ui_inventory_reflexshield.png'), 
			icon_RepairKit : new ig.Image('media/items/ui_inventory_repairkit.png'), 
			icon_ReprogrammingHardware : new ig.Image('media/items/ui_inventory_reprograming.png'), 
			icon_ResourceDetector : new ig.Image('media/items/ui_inventory_resourcedetector.png'), 
			icon_SmallSnack : new ig.Image('media/items/ui_inventory_smallsnack.png'), 
			icon_SubstanceX : new ig.Image('media/items/ui_inventory_substancex.png'), 
			icon_SystemReset : new ig.Image('media/items/ui_inventory_systemreset.png'), 
			icon_Teleporter : new ig.Image('media/items/ui_inventory_teleporter.png'), 
			icon_Water : new ig.Image('media/items/ui_inventory_water.png'), 
			icon_CommandImplant : new ig.Image('media/items/ui_inventory_implantcommand.png'), 
			icon_DefenseImplant : new ig.Image('media/items/ui_inventory_implantdefense.png'), 
			icon_DiscoveryImplant : new ig.Image('media/items/ui_inventory_implantdiscovery.png'), 
			icon_QuantumImplant : new ig.Image('media/items/ui_inventory_implantquantum.png'), 
			icon_ReflexImplant : new ig.Image('media/items/ui_inventory_implantreflex.png'), 
			icon_SensoryImplant : new ig.Image('media/items/ui_inventory_implantsensory.png'), 
			icon_JunkBottle : new ig.Image('media/items/ui_inventory_junkbottle.png'), 
			icon_JunkBox : new ig.Image('media/items/ui_inventory_junkbox.png'), 
			icon_JunkBrokenKey : new ig.Image('media/items/ui_inventory_junkbrokenkey.png'), 
			icon_JunkCell : new ig.Image('media/items/ui_inventory_junkcell.png'), 
			icon_JunkPaperWork : new ig.Image('media/items/ui_inventory_junkpaperwork.png'), 
			icon_JunkPlant : new ig.Image('media/items/ui_inventory_junkplant.png'), 
			icon_JunkPowerCord : new ig.Image('media/items/ui_inventory_junkpowercord.png'), 
			icon_JunkScrap : new ig.Image('media/items/ui_inventory_junkscrap.png'), 
			icon_JunkVideoGame : new ig.Image('media/items/ui_inventory_junkvideogame.png'), 
			icon_JunkWastedAmmo : new ig.Image('media/items/ui_inventory_junkwastedammo.png'), 

			bag : new ig.Image('media/bag.png'), 
			door : new ig.Image('media/door.png'), 
			arrow : new ig.Image('media/arrow.png'), 
		}, 
		textures : 
		{
			button : null, 
			contextMenu : null, 

			armory_D : null,
			armory_N : null,
			armory_R : null,
			armory_E : null,
			barracks_D : null, 
			barracks_N : null, 
			barracks_R : null, 
			barracks_E : null, 
			tyche_D : null,
			tyche_N : null,
			tyche_R : null,
			tyche_E : null,
			recreation_D : null,
			recreation_N : null,
			recreation_R : null,
			recreation_E : null,
			infirmary_D : null,
			infirmary_N : null,
			infirmary_R : null,
			infirmary_E : null, 
			hangar_D : null,
			hangar_N : null,
			hangar_R : null,
			hangar_E : null,
			engineeringReactor_D : null,
			engineeringReactor_N : null,
			engineeringReactor_R : null,
			engineeringReactor_E : null,
			engineeringCore_D : null,
			engineeringCore_N : null,
			engineeringCore_R : null,
			engineeringCore_E : null,
			brig_D : null,
			brig_N : null,
			brig_R : null,
			brig_E : null,
			bridge_D : null,
			bridge_N : null,
			bridge_R : null,
			bridge_E : null,

			octoRoom_D: null,
			octoRoom_N: null,
			octoRoom_R: null,
			corridorT_D: null,
			corridorT_N: null,
			corridorT_R: null,
			corridorStraight_D: null,
		    corridorStraight_N: null,
		    corridorStraight_R: null,
			corridorPit_D: null,
			corridorPit_N: null,
			corridorPit_R: null,
			corridorElbow_D: null,
			corridorElbow_N: null,
			corridorElbow_R: null,
			airlock_D: null,
			airlock_N: null,
			airlock_R: null,
			oddShape_D: null,
			oddShape_N: null,
			oddShape_R: null,

			doorFloor_D : null,
			doorFloor_N : null,
			doorFloor_R : null,
			doorPanel_D : null,
			doorPanel_N : null,
			doorPanel_R : null,
			doubleDoorVert_D : null,
			doubleDoorVert_N : null,
			doubleDoorVert_R : null,
			engineeringWide_D : null,
			engineeringWide_N : null,
			engineeringWide_R : null,
			iconHoriz_D : null,
			iconHoriz_N : null,
			iconHoriz_R : null,
			singleTooth_D : null,
			singleTooth_N : null,
			singleTooth_R : null,
			wideFloor_D : null,
			wideFloor_N : null,
			wideFloor_R : null,

			doorLock_active : null,
			doorLock_inactive : null,
			doorLock_lockdown : null, 

			player : null, 

			autotron_Idle_FL_D : null, 
			autotron_Idle_FR_D : null, 
			autotron_Idle_RL_D : null, 
			autotron_Idle_RR_D : null, 
			autotron_Idle_FL_N : null, 
			autotron_Idle_FR_N : null, 
			autotron_Idle_RL_N : null, 
			autotron_Idle_RR_N : null, 
			autotron_Idle_FL_R : null, 
			autotron_Idle_FR_R : null, 
			autotron_Idle_RL_R : null, 
			autotron_Idle_RR_R : null, 
			zombie_Idle_FL_D : null, 
			zombie_Idle_FR_D : null, 
			zombie_Idle_RL_D : null, 
			zombie_Idle_RR_D : null, 
			zombie_Idle_FL_N : null, 
			zombie_Idle_FR_N : null, 
			zombie_Idle_RL_N : null, 
			zombie_Idle_RR_N : null, 
			zombie_Idle_FL_R : null, 
			zombie_Idle_FR_R : null, 
			zombie_Idle_RL_R : null, 
			zombie_Idle_RR_R : null, 
			cleanser_Idle_FL_D : null, 
			cleanser_Idle_FR_D : null, 
			cleanser_Idle_RL_D : null, 
			cleanser_Idle_RR_D : null, 
			cleanser_Idle_FL_N : null, 
			cleanser_Idle_FR_N : null, 
			cleanser_Idle_RL_N : null, 
			cleanser_Idle_RR_N : null, 
			cleanser_Idle_FL_R : null, 
			cleanser_Idle_FR_R : null, 
			cleanser_Idle_RL_R : null, 
			cleanser_Idle_RR_R : null, 
			corruptedScout_Idle_FL_D : null, 
			corruptedScout_Idle_FR_D : null, 
			corruptedScout_Idle_RL_D : null, 
			corruptedScout_Idle_RR_D : null, 
			corruptedScout_Idle_FL_N : null, 
			corruptedScout_Idle_FR_N : null, 
			corruptedScout_Idle_RL_N : null, 
			corruptedScout_Idle_RR_N : null, 
			corruptedScout_Idle_FL_R : null, 
			corruptedScout_Idle_FR_R : null, 
			corruptedScout_Idle_RL_R : null, 
			corruptedScout_Idle_RR_R : null, 
			medibot_Idle_FL_D : null, 
			medibot_Idle_FR_D : null, 
			medibot_Idle_RL_D : null, 
			medibot_Idle_RR_D : null, 
			medibot_Idle_FL_N : null, 
			medibot_Idle_FR_N : null, 
			medibot_Idle_RL_N : null, 
			medibot_Idle_RR_N : null, 
			medibot_Idle_FL_R : null, 
			medibot_Idle_FR_R : null, 
			medibot_Idle_RL_R : null, 
			medibot_Idle_RR_R : null, 
			miner_Idle_FL_D : null, 
			miner_Idle_FR_D : null, 
			miner_Idle_RL_D : null, 
			miner_Idle_RR_D : null, 
			miner_Idle_FL_N : null, 
			miner_Idle_FR_N : null, 
			miner_Idle_RL_N : null, 
			miner_Idle_RR_N : null, 
			miner_Idle_FL_R : null, 
			miner_Idle_FR_R : null, 
			miner_Idle_RL_R : null, 
			miner_Idle_RR_R : null, 
			navGuide_Idle_FL_D : null, 
			navGuide_Idle_FR_D : null, 
			navGuide_Idle_RL_D : null, 
			navGuide_Idle_RR_D : null, 
			navGuide_Idle_FL_N : null, 
			navGuide_Idle_FR_N : null, 
			navGuide_Idle_RL_N : null, 
			navGuide_Idle_RR_N : null, 
			navGuide_Idle_FL_R : null, 
			navGuide_Idle_FR_R : null, 
			navGuide_Idle_RL_R : null, 
			navGuide_Idle_RR_R : null, 
			peaceWalker_Idle_FL_D : null, 
			peaceWalker_Idle_FR_D : null, 
			peaceWalker_Idle_RL_D : null, 
			peaceWalker_Idle_RR_D : null, 
			peaceWalker_Idle_FL_N : null, 
			peaceWalker_Idle_FR_N : null, 
			peaceWalker_Idle_RL_N : null, 
			peaceWalker_Idle_RR_N : null, 
			peaceWalker_Idle_FL_R : null, 
			peaceWalker_Idle_FR_R : null, 
			peaceWalker_Idle_RL_R : null, 
			peaceWalker_Idle_RR_R : null, 
			rampantWalker_Idle_FL_D : null, 
			rampantWalker_Idle_FR_D : null, 
			rampantWalker_Idle_RL_D : null, 
			rampantWalker_Idle_RR_D : null, 
			rampantWalker_Idle_FL_N : null, 
			rampantWalker_Idle_FR_N : null, 
			rampantWalker_Idle_RL_N : null, 
			rampantWalker_Idle_RR_N : null, 
			rampantWalker_Idle_FL_R : null, 
			rampantWalker_Idle_FR_R : null, 
			rampantWalker_Idle_RL_R : null, 
			rampantWalker_Idle_RR_R : null, 
			securityDrone_Idle_FL_D : null, 
			securityDrone_Idle_FR_D : null, 
			securityDrone_Idle_RL_D : null, 
			securityDrone_Idle_RR_D : null, 
			securityDrone_Idle_FL_N : null, 
			securityDrone_Idle_FR_N : null, 
			securityDrone_Idle_RL_N : null, 
			securityDrone_Idle_RR_N : null, 
			securityDrone_Idle_FL_R : null, 
			securityDrone_Idle_FR_R : null, 
			securityDrone_Idle_RL_R : null, 
			securityDrone_Idle_RR_R : null, 

			nanobots_D : null, 
			nanobots_N : null, 
			nanobots_R : null, 
			smallRoamer_FL_D : null, 
			smallRoamer_FR_D : null, 
			smallRoamer_RL_D : null, 
			smallRoamer_RR_D : null, 
			smallRoamer_FL_N : null, 
			smallRoamer_FR_N : null, 
			smallRoamer_RL_N : null, 
			smallRoamer_RR_N : null, 
			smallRoamer_FL_R : null, 
			smallRoamer_FR_R : null, 
			smallRoamer_RL_R : null, 
			smallRoamer_RR_R : null, 
			suicideDrone_FL_D : null, 
			suicideDrone_FR_D : null, 
			suicideDrone_RL_D : null, 
			suicideDrone_RR_D : null, 
			suicideDrone_FL_N : null, 
			suicideDrone_FR_N : null, 
			suicideDrone_RL_N : null, 
			suicideDrone_RR_N : null, 
			suicideDrone_FL_R : null, 
			suicideDrone_FR_R : null, 
			suicideDrone_RL_R : null, 
			suicideDrone_RR_R : null, 

			ui_ChatMain : null, 
			ui_ChatScollBar : null, 
			ui_PDABottom : null, 
			ui_PDATop : null, 
			ui_StatsActionIcon : null, 
			ui_StatsHealthIcon : null, 
			ui_StatsMain : null, 
			ui_StatsModA : null, 
			ui_StatsModB : null, 
			ui_StatsModC : null, 

			icon_AirMask : null, 
			icon_Backpack : null, 
			icon_ExoSuit : null, 
			icon_FriendlyDrone : null, 
			icon_HealthKit : null, 
			icon_KeycardBlue : null, 
			icon_KeycardGreen : null, 
			icon_KeycardRed : null, 
			icon_ModA : null, 
			icon_ModB : null, 
			icon_ModC : null, 
			icon_Override : null, 
			icon_ReflexShield : null, 
			icon_RepairKit : null, 
			icon_ReprogrammingHardware : null, 
			icon_ResourceDetector : null, 
			icon_SmallSnack : null, 
			icon_SubstanceX : null, 
			icon_SystemReset : null, 
			icon_Teleporter : null, 
			icon_Water : null, 
			icon_CommandImplant : null, 
			icon_DefenseImplant : null, 
			icon_DiscoveryImplant : null, 
			icon_QuantumImplant : null, 
			icon_ReflexImplant : null, 
			icon_SensoryImplant : null, 
			icon_JunkBottle : null, 
			icon_JunkBox : null, 
			icon_JunkBrokenKey : null, 
			icon_JunkCell : null, 
			icon_JunkPaperWork : null, 
			icon_JunkPlant : null, 
			icon_JunkPowerCord : null, 
			icon_JunkScrap : null, 
			icon_JunkVideoGame : null, 
			icon_JunkWastedAmmo : null, 

			bag : null, 
			door : null, 
		}, 

        init : function()
        {
            //console.log('INIT ASSETCORE');
        }, 

		load : function()
		{
			//console.log('ASSET IMAGES', this.images, this.textures);

			this.textures.button = glLoadTexture(this.images.button.data);
			this.textures.contextMenu = glLoadTexture(this.images.contextMenu.data);

			this.textures.armory_D = glLoadTexture(this.images.armory_D.data);
			this.textures.armory_N = glLoadTexture(this.images.armory_N.data);
			this.textures.armory_R = glLoadTexture(this.images.armory_R.data);
			this.textures.barracks_D = glLoadTexture(this.images.barracks_D.data);
			this.textures.barracks_N = glLoadTexture(this.images.barracks_N.data);
			this.textures.barracks_R = glLoadTexture(this.images.barracks_R.data);
			this.textures.tyche_D = glLoadTexture(this.images.tyche_D.data);
			this.textures.tyche_N = glLoadTexture(this.images.tyche_N.data);
			this.textures.tyche_R = glLoadTexture(this.images.tyche_R.data);
			this.textures.recreation_D = glLoadTexture(this.images.recreation_D.data);
			this.textures.recreation_N = glLoadTexture(this.images.recreation_N.data);
			this.textures.recreation_R = glLoadTexture(this.images.recreation_R.data);
			this.textures.infirmary_D = glLoadTexture(this.images.infirmary_D.data);
			this.textures.infirmary_N = glLoadTexture(this.images.infirmary_N.data);
			this.textures.infirmary_R = glLoadTexture(this.images.infirmary_R.data);
			this.textures.hangar_D = glLoadTexture(this.images.hangar_D.data);
			this.textures.hangar_N = glLoadTexture(this.images.hangar_N.data);
			this.textures.hangar_R = glLoadTexture(this.images.hangar_R.data);
			this.textures.engineeringReactor_D = glLoadTexture(this.images.engineeringReactor_D.data);
			this.textures.engineeringReactor_N = glLoadTexture(this.images.engineeringReactor_N.data);
			this.textures.engineeringReactor_R = glLoadTexture(this.images.engineeringReactor_R.data);
			this.textures.engineeringCore_D = glLoadTexture(this.images.engineeringCore_D.data);
			this.textures.engineeringCore_N = glLoadTexture(this.images.engineeringCore_N.data);
			this.textures.engineeringCore_R = glLoadTexture(this.images.engineeringCore_R.data);
			this.textures.brig_D = glLoadTexture(this.images.brig_D.data);
			this.textures.brig_N = glLoadTexture(this.images.brig_N.data);
			this.textures.brig_R = glLoadTexture(this.images.brig_R.data);
			this.textures.bridge_D = glLoadTexture(this.images.bridge_D.data);
			this.textures.bridge_N = glLoadTexture(this.images.bridge_N.data);
			this.textures.bridge_R = glLoadTexture(this.images.bridge_R.data);

			this.textures.octoRoom_D = glLoadTexture(this.images.octoRoom_D.data);
			this.textures.octoRoom_N = glLoadTexture(this.images.octoRoom_N.data);
			this.textures.octoRoom_R = glLoadTexture(this.images.octoRoom_R.data);
			this.textures.corridorT_D = glLoadTexture(this.images.corridorT_D.data);
			this.textures.corridorT_N = glLoadTexture(this.images.corridorT_N.data);
			this.textures.corridorT_R = glLoadTexture(this.images.corridorT_R.data);
			this.textures.corridorStraight_D = glLoadTexture(this.images.corridorStraight_D.data);
			this.textures.corridorPit_D = glLoadTexture(this.images.corridorPit_D.data);
			this.textures.corridorPit_N = glLoadTexture(this.images.corridorPit_N.data);
			this.textures.corridorPit_R = glLoadTexture(this.images.corridorPit_R.data);
			this.textures.corridorElbow_D = glLoadTexture(this.images.corridorElbow_D.data);
			this.textures.corridorElbow_N = glLoadTexture(this.images.corridorElbow_N.data);
			this.textures.corridorElbow_R = glLoadTexture(this.images.corridorElbow_R.data);
			this.textures.airlock_D = glLoadTexture(this.images.airlock_D.data);
			this.textures.airlock_N = glLoadTexture(this.images.airlock_N.data);
			this.textures.airlock_R = glLoadTexture(this.images.airlock_R.data);
			this.textures.oddShape_D = glLoadTexture(this.images.oddShape_D.data);
			this.textures.oddShape_N = glLoadTexture(this.images.oddShape_N.data);
			this.textures.oddShape_R = glLoadTexture(this.images.oddShape_R.data);

			this.textures.doorFloor_D = glLoadTexture(this.images.doorFloor_D.data);
			this.textures.doorFloor_N = glLoadTexture(this.images.doorFloor_N.data);
			this.textures.doorFloor_R = glLoadTexture(this.images.doorFloor_R.data);
			this.textures.doorPanel_D = glLoadTexture(this.images.doorPanel_D.data);
			this.textures.doorPanel_N = glLoadTexture(this.images.doorPanel_N.data);
			this.textures.doorPanel_R = glLoadTexture(this.images.doorPanel_R.data);
			this.textures.doubleDoorVert_D = glLoadTexture(this.images.doubleDoorVert_D.data);
			this.textures.doubleDoorVert_N = glLoadTexture(this.images.doubleDoorVert_N.data);
			this.textures.doubleDoorVert_R = glLoadTexture(this.images.doubleDoorVert_R.data);
			this.textures.engineeringWide_D = glLoadTexture(this.images.engineeringWide_D.data);
			this.textures.engineeringWide_N = glLoadTexture(this.images.engineeringWide_N.data);
			this.textures.engineeringWide_R = glLoadTexture(this.images.engineeringWide_R.data);
			this.textures.iconHoriz_D = glLoadTexture(this.images.iconHoriz_D.data);
			this.textures.iconHoriz_N = glLoadTexture(this.images.iconHoriz_N.data);
			this.textures.iconHoriz_R = glLoadTexture(this.images.iconHoriz_R.data);
			this.textures.singleTooth_D = glLoadTexture(this.images.singleTooth_D.data);
			this.textures.singleTooth_N = glLoadTexture(this.images.singleTooth_N.data);
			this.textures.singleTooth_R = glLoadTexture(this.images.singleTooth_R.data);
			this.textures.wideFloor_D = glLoadTexture(this.images.wideFloor_D.data);
			this.textures.wideFloor_N = glLoadTexture(this.images.wideFloor_N.data);
			this.textures.wideFloor_R = glLoadTexture(this.images.wideFloor_R.data);

			this.textures.doorLock_active = glLoadTexture(this.images.doorLock_active.data);
			this.textures.doorLock_inactive = glLoadTexture(this.images.doorLock_inactive.data);
			this.textures.doorLock_lockdown = glLoadTexture(this.images.doorLock_lockdown.data);

			this.textures.autotron_Idle_FL_D = glLoadTexture(this.images.autotron_Idle_FL_D.data);
			this.textures.autotron_Idle_FR_D = glLoadTexture(this.images.autotron_Idle_FR_D.data);
			this.textures.autotron_Idle_RL_D = glLoadTexture(this.images.autotron_Idle_RL_D.data);
			this.textures.autotron_Idle_RR_D = glLoadTexture(this.images.autotron_Idle_RR_D.data);
			this.textures.autotron_Idle_FL_N = glLoadTexture(this.images.autotron_Idle_FL_N.data);
			this.textures.autotron_Idle_FR_N = glLoadTexture(this.images.autotron_Idle_FR_N.data);
			this.textures.autotron_Idle_RL_N = glLoadTexture(this.images.autotron_Idle_RL_N.data);
			this.textures.autotron_Idle_RR_N = glLoadTexture(this.images.autotron_Idle_RR_N.data);
			this.textures.autotron_Idle_FL_R = glLoadTexture(this.images.autotron_Idle_FL_R.data);
			this.textures.autotron_Idle_FR_R = glLoadTexture(this.images.autotron_Idle_FR_R.data);
			this.textures.autotron_Idle_RL_R = glLoadTexture(this.images.autotron_Idle_RL_R.data);
			this.textures.autotron_Idle_RR_R = glLoadTexture(this.images.autotron_Idle_RR_R.data);
			this.textures.zombie_Idle_FL_D = glLoadTexture(this.images.zombie_Idle_FL_D.data);
			this.textures.zombie_Idle_FR_D = glLoadTexture(this.images.zombie_Idle_FR_D.data);
			this.textures.zombie_Idle_RL_D = glLoadTexture(this.images.zombie_Idle_RL_D.data);
			this.textures.zombie_Idle_RR_D = glLoadTexture(this.images.zombie_Idle_RR_D.data);
			this.textures.zombie_Idle_FR_N = glLoadTexture(this.images.zombie_Idle_FR_N.data);
			this.textures.cleanser_Idle_FL_D = glLoadTexture(this.images.cleanser_Idle_FL_D.data);
			this.textures.cleanser_Idle_FR_D = glLoadTexture(this.images.cleanser_Idle_FR_D.data);
			this.textures.cleanser_Idle_RL_D = glLoadTexture(this.images.cleanser_Idle_RL_D.data);
			this.textures.cleanser_Idle_RR_D = glLoadTexture(this.images.cleanser_Idle_RR_D.data);
			this.textures.corruptedScout_Idle_FL_D = glLoadTexture(this.images.corruptedScout_Idle_FL_D.data);
			this.textures.corruptedScout_Idle_FR_D = glLoadTexture(this.images.corruptedScout_Idle_FR_D.data);
			this.textures.corruptedScout_Idle_FL_N = glLoadTexture(this.images.corruptedScout_Idle_FL_N.data);
			this.textures.corruptedScout_Idle_FR_N = glLoadTexture(this.images.corruptedScout_Idle_FR_N.data);
			this.textures.corruptedScout_Idle_FL_R = glLoadTexture(this.images.corruptedScout_Idle_FL_R.data);
			this.textures.corruptedScout_Idle_FR_R = glLoadTexture(this.images.corruptedScout_Idle_FR_R.data);
			this.textures.medibot_Idle_FL_D = glLoadTexture(this.images.medibot_Idle_FL_D.data);
			this.textures.medibot_Idle_FR_D = glLoadTexture(this.images.medibot_Idle_FR_D.data);
			this.textures.medibot_Idle_RL_D = glLoadTexture(this.images.medibot_Idle_RL_D.data);
			this.textures.medibot_Idle_RR_D = glLoadTexture(this.images.medibot_Idle_RR_D.data);
			this.textures.medibot_Idle_FL_N = glLoadTexture(this.images.medibot_Idle_FL_N.data);
			this.textures.medibot_Idle_FR_N = glLoadTexture(this.images.medibot_Idle_FR_N.data);
			this.textures.medibot_Idle_RL_N = glLoadTexture(this.images.medibot_Idle_RL_N.data);
			this.textures.medibot_Idle_RR_N = glLoadTexture(this.images.medibot_Idle_RR_N.data);
			this.textures.medibot_Idle_FL_R = glLoadTexture(this.images.medibot_Idle_FL_R.data);
			this.textures.medibot_Idle_FR_R = glLoadTexture(this.images.medibot_Idle_FR_R.data);
			this.textures.medibot_Idle_RL_R = glLoadTexture(this.images.medibot_Idle_RL_R.data);
			this.textures.medibot_Idle_RR_R = glLoadTexture(this.images.medibot_Idle_RR_R.data);
			this.textures.miner_Idle_FL_D = glLoadTexture(this.images.miner_Idle_FL_D.data);
			this.textures.miner_Idle_FR_D = glLoadTexture(this.images.miner_Idle_FR_D.data);
			this.textures.navGuide_Idle_FL_D = glLoadTexture(this.images.navGuide_Idle_FL_D.data);
			this.textures.navGuide_Idle_FR_D = glLoadTexture(this.images.navGuide_Idle_FR_D.data);
			this.textures.navGuide_Idle_RL_D = glLoadTexture(this.images.navGuide_Idle_RL_D.data);
			this.textures.navGuide_Idle_RR_D = glLoadTexture(this.images.navGuide_Idle_RR_D.data);
			this.textures.navGuide_Idle_FL_N = glLoadTexture(this.images.navGuide_Idle_FL_N.data);
			this.textures.navGuide_Idle_FR_N = glLoadTexture(this.images.navGuide_Idle_FR_N.data);
			this.textures.navGuide_Idle_RL_N = glLoadTexture(this.images.navGuide_Idle_RL_N.data);
			this.textures.navGuide_Idle_RR_N = glLoadTexture(this.images.navGuide_Idle_RR_N.data);
			this.textures.navGuide_Idle_FL_R = glLoadTexture(this.images.navGuide_Idle_FL_R.data);
			this.textures.navGuide_Idle_FR_R = glLoadTexture(this.images.navGuide_Idle_FR_R.data);
			this.textures.navGuide_Idle_RL_R = glLoadTexture(this.images.navGuide_Idle_RL_R.data);
			this.textures.navGuide_Idle_RR_R = glLoadTexture(this.images.navGuide_Idle_RR_R.data);
			this.textures.peaceWalker_Idle_FL_D = glLoadTexture(this.images.peaceWalker_Idle_FL_D.data);
			this.textures.peaceWalker_Idle_FR_D = glLoadTexture(this.images.peaceWalker_Idle_FR_D.data);
			this.textures.rampantWalker_Idle_FL_D = glLoadTexture(this.images.rampantWalker_Idle_FL_D.data);
			this.textures.rampantWalker_Idle_FR_D = glLoadTexture(this.images.rampantWalker_Idle_FR_D.data);
			this.textures.securityDrone_Idle_FL_D = glLoadTexture(this.images.securityDrone_Idle_FL_D.data);
			this.textures.securityDrone_Idle_FR_D = glLoadTexture(this.images.securityDrone_Idle_FR_D.data);
			this.textures.securityDrone_Idle_RL_D = glLoadTexture(this.images.securityDrone_Idle_RL_D.data);
			this.textures.securityDrone_Idle_RR_D = glLoadTexture(this.images.securityDrone_Idle_RR_D.data);

			this.textures.nanobots_D = glLoadTexture(this.images.nanobots_D.data);
			this.textures.smallRoamer_FL_D = glLoadTexture(this.images.smallRoamer_FL_D.data);
			this.textures.smallRoamer_FR_D = glLoadTexture(this.images.smallRoamer_FR_D.data);
			this.textures.smallRoamer_RL_D = glLoadTexture(this.images.smallRoamer_RL_D.data);
			this.textures.smallRoamer_RR_D = glLoadTexture(this.images.smallRoamer_RR_D.data);
			this.textures.suicideDrone_FL_D = glLoadTexture(this.images.suicideDrone_FL_D.data);
			this.textures.suicideDrone_FR_D = glLoadTexture(this.images.suicideDrone_FR_D.data);
			this.textures.suicideDrone_RL_D = glLoadTexture(this.images.suicideDrone_RL_D.data);
			this.textures.suicideDrone_RR_D = glLoadTexture(this.images.suicideDrone_RR_D.data);

			this.textures.ui_ChatMain = glLoadTexture(this.images.ui_ChatMain.data);
			this.textures.ui_ChatScollBar = glLoadTexture(this.images.ui_ChatScollBar.data);
			this.textures.ui_PDABottom = glLoadTexture(this.images.ui_PDABottom.data);
			this.textures.ui_PDATop = glLoadTexture(this.images.ui_PDATop.data);
			this.textures.ui_StatsActionIcon = glLoadTexture(this.images.ui_StatsActionIcon.data);
			this.textures.ui_StatsHealthIcon = glLoadTexture(this.images.ui_StatsHealthIcon.data);
			this.textures.ui_StatsMain = glLoadTexture(this.images.ui_StatsMain.data);
			this.textures.ui_StatsModA = glLoadTexture(this.images.ui_StatsModA.data);
			this.textures.ui_StatsModB = glLoadTexture(this.images.ui_StatsModB.data);
			this.textures.ui_StatsModC = glLoadTexture(this.images.ui_StatsModC.data);

			this.textures.icon_AirMask = glLoadTexture(this.images.icon_AirMask.data);
			this.textures.icon_Backpack = glLoadTexture(this.images.icon_Backpack.data);
			this.textures.icon_ExoSuit = glLoadTexture(this.images.icon_ExoSuit.data);
			this.textures.icon_FriendlyDrone = glLoadTexture(this.images.icon_FriendlyDrone.data);
			this.textures.icon_HealthKit = glLoadTexture(this.images.icon_HealthKit.data);
			this.textures.icon_KeycardBlue = glLoadTexture(this.images.icon_KeycardBlue.data);
			this.textures.icon_KeycardGreen = glLoadTexture(this.images.icon_KeycardGreen.data);
			this.textures.icon_KeycardRed = glLoadTexture(this.images.icon_KeycardRed.data);
			this.textures.icon_ModA = glLoadTexture(this.images.icon_ModA.data);
			this.textures.icon_ModB = glLoadTexture(this.images.icon_ModB.data);
			this.textures.icon_ModC = glLoadTexture(this.images.icon_ModC.data);
			this.textures.icon_Override = glLoadTexture(this.images.icon_Override.data);
			this.textures.icon_ReflexShield = glLoadTexture(this.images.icon_ReflexShield.data);
			this.textures.icon_RepairKit = glLoadTexture(this.images.icon_RepairKit.data);
			this.textures.icon_ReprogrammingHardware = glLoadTexture(this.images.icon_ReprogrammingHardware.data);
			this.textures.icon_ResourceDetector = glLoadTexture(this.images.icon_ResourceDetector.data);
			this.textures.icon_SmallSnack = glLoadTexture(this.images.icon_SmallSnack.data);
			this.textures.icon_SubstanceX = glLoadTexture(this.images.icon_SubstanceX.data);
			this.textures.icon_SystemReset = glLoadTexture(this.images.icon_SystemReset.data);
			this.textures.icon_Teleporter = glLoadTexture(this.images.icon_Teleporter.data);
			this.textures.icon_Water = glLoadTexture(this.images.icon_Water.data);
			this.textures.icon_CommandImplant = glLoadTexture(this.images.icon_CommandImplant.data);
			this.textures.icon_DefenseImplant = glLoadTexture(this.images.icon_DefenseImplant.data);
			this.textures.icon_DiscoveryImplant = glLoadTexture(this.images.icon_DiscoveryImplant.data);
			this.textures.icon_QuantumImplant = glLoadTexture(this.images.icon_QuantumImplant.data);
			this.textures.icon_ReflexImplant = glLoadTexture(this.images.icon_ReflexImplant.data);
			this.textures.icon_SensoryImplant = glLoadTexture(this.images.icon_SensoryImplant.data);
			
			this.textures.icon_JunkBottle = glLoadTexture(this.images.icon_JunkBottle.data);
			this.textures.icon_JunkBox = glLoadTexture(this.images.icon_JunkBox.data);
			this.textures.icon_JunkBrokenKey = glLoadTexture(this.images.icon_JunkBrokenKey.data);
			this.textures.icon_JunkCell = glLoadTexture(this.images.icon_JunkCell.data);
			this.textures.icon_JunkPaperWork = glLoadTexture(this.images.icon_JunkPaperWork.data);
			this.textures.icon_JunkPlant = glLoadTexture(this.images.icon_JunkPlant.data);
			this.textures.icon_JunkPowerCord = glLoadTexture(this.images.icon_JunkPowerCord.data);
			this.textures.icon_JunkScrap = glLoadTexture(this.images.icon_JunkScrap.data);
			this.textures.icon_JunkVideoGame = glLoadTexture(this.images.icon_JunkVideoGame.data);
			this.textures.icon_JunkWastedAmmo = glLoadTexture(this.images.icon_JunkWastedAmmo.data);

			this.textures.player = glLoadTexture(this.images.player.data);
			this.textures.bag = glLoadTexture(this.images.bag.data);
			this.textures.door = glLoadTexture(this.images.door.data);

			ig.soundManager.format = 'mp3';
			//ig.music.add('Start_Theme_Demo_Aug26th_v1.mp3', 'start');
			//ig.music.add('Ending_Theme_Demo_Aug26th_v1.mp3', 'end');
			ig.music.add('Music_Main_Theme_Aug26_V1.mp3', 'main');

			ig.music.play('main');
			console.log('MUSIC TRACKS ', ig.music);
		}, 

		requestAnim : function(name)
		{
			switch (name)
			{
				case 'Player':
				return new AnimSheet(this.textures.player, null, null, 128, 128, 128, 128, 1.0, [0], false);

				case 'Autotron FL Idle':
				return new AnimSheet(
					this.textures.autotron_Idle_FL_D, this.textures.autotron_Idle_FL_N, this.textures.autotron_Idle_FL_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'Autotron FR Idle':
				return new AnimSheet(
					this.textures.autotron_Idle_FR_D, this.textures.autotron_Idle_FR_N, this.textures.autotron_Idle_FR_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'Autotron RL Idle':
				return new AnimSheet(
					this.textures.autotron_Idle_RL_D, this.textures.autotron_Idle_RL_N, this.textures.autotron_Idle_RL_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'Autotron RR Idle':
				return new AnimSheet(
					this.textures.autotron_Idle_RR_D, this.textures.autotron_Idle_RR_N, this.textures.autotron_Idle_RR_R, 128, 128, 128, 128, 1.0, [0], false);

				case 'Zombie FL Idle':
				return new AnimSheet(
					this.textures.zombie_Idle_FL_D, this.textures.zombie_Idle_FL_N, this.textures.zombie_Idle_FL_R, 1024, 1024, 96, 192, 0.04, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);
				case 'Zombie FR Idle':
				return new AnimSheet(
					this.textures.zombie_Idle_FR_D, this.textures.zombie_Idle_FR_N, this.textures.zombie_Idle_FR_R, 1024, 1024, 96, 192, 0.04, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);
				case 'Zombie RL Idle':
				return new AnimSheet(
					this.textures.zombie_Idle_RL_D, this.textures.zombie_Idle_RL_N, this.textures.zombie_Idle_RL_R, 1024, 1024, 96, 192, 0.04, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);
				case 'Zombie RR Idle':
				return new AnimSheet(
					this.textures.zombie_Idle_RR_D, this.textures.zombie_Idle_RR_N, this.textures.zombie_Idle_RR_R, 1024, 1024, 96, 192, 0.04, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);

				case 'Cleanser FL Idle':
				return new AnimSheet(
					this.textures.cleanser_Idle_FL_D, this.textures.cleanser_Idle_FL_N, this.textures.cleanser_Idle_FL_R, 1024, 1024, 192, 144, 0.04, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);
				case 'Cleanser FR Idle':
				return new AnimSheet(
					this.textures.cleanser_Idle_FR_D, this.textures.cleanser_Idle_FR_N, this.textures.cleanser_Idle_FR_R, 1024, 1024, 192, 144, 0.04, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);
				case 'Cleanser RL Idle':
				return new AnimSheet(
					this.textures.cleanser_Idle_RL_D, this.textures.cleanser_Idle_RL_N, this.textures.cleanser_Idle_RL_R, 1024, 1024, 192, 144, 0.04, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);
				case 'Cleanser RR Idle':
				return new AnimSheet(
					this.textures.cleanser_Idle_RR_D, this.textures.cleanser_Idle_RR_N, this.textures.cleanser_Idle_RR_R, 1024, 1024, 192, 144, 0.04, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);

				case 'Corrupted Scout FL Idle':
				return new AnimSheet(
					this.textures.corruptedScout_Idle_FL_D, this.textures.corruptedScout_Idle_FL_N, this.textures.corruptedScout_Idle_FL_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'Corrupted Scout FR Idle':
				return new AnimSheet(
					this.textures.corruptedScout_Idle_FR_D, this.textures.corruptedScout_Idle_FR_N, this.textures.corruptedScout_Idle_FR_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'Corrupted Scout RL Idle':
				return new AnimSheet(
					this.textures.corruptedScout_Idle_FL_D, this.textures.corruptedScout_Idle_FL_N, this.textures.corruptedScout_Idle_FL_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'Corrupted Scout RR Idle':
				return new AnimSheet(
					this.textures.corruptedScout_Idle_FR_D, this.textures.corruptedScout_Idle_FR_N, this.textures.corruptedScout_Idle_FR_R, 128, 128, 128, 128, 1.0, [0], false);

				case 'MediBot FL Idle':
				return new AnimSheet(
					this.textures.medibot_Idle_FL_D, this.textures.medibot_Idle_FL_N, this.textures.medibot_Idle_FL_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'MediBot FR Idle':
				return new AnimSheet(
					this.textures.medibot_Idle_FR_D, this.textures.medibot_Idle_FR_N, this.textures.medibot_Idle_FR_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'MediBot RL Idle':
				return new AnimSheet(
					this.textures.medibot_Idle_RL_D, this.textures.medibot_Idle_RL_N, this.textures.medibot_Idle_RL_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'MediBot RR Idle':
				return new AnimSheet(
					this.textures.medibot_Idle_RR_D, this.textures.medibot_Idle_RR_N, this.textures.medibot_Idle_RR_R, 128, 128, 128, 128, 1.0, [0], false);

				case 'Miner FL Idle':
				return new AnimSheet(
					this.textures.miner_Idle_FL_D, this.textures.miner_Idle_FL_N, this.textures.miner_Idle_FL_R, 256, 256, 256, 256, 1.0, [0], false);
				case 'Miner FR Idle':
				return new AnimSheet(
					this.textures.miner_Idle_FR_D, this.textures.miner_Idle_FR_N, this.textures.miner_Idle_FR_R, 256, 256, 256, 256, 1.0, [0], false);
				case 'Miner RL Idle':
				return new AnimSheet(
					this.textures.miner_Idle_FL_D, this.textures.miner_Idle_FL_N, this.textures.miner_Idle_FL_R, 256, 256, 256, 256, 1.0, [0], false);
				case 'Miner RR Idle':
				return new AnimSheet(
					this.textures.miner_Idle_FR_D, this.textures.miner_Idle_FR_N, this.textures.miner_Idle_FR_R, 256, 256, 256, 256, 1.0, [0], false);

				case 'NavGuide FL Idle':
				return new AnimSheet(
					this.textures.navGuide_Idle_FL_D, this.textures.navGuide_Idle_FL_N, this.textures.navGuide_Idle_FL_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'NavGuide FR Idle':
				return new AnimSheet(
					this.textures.navGuide_Idle_FR_D, this.textures.navGuide_Idle_FR_N, this.textures.navGuide_Idle_FR_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'NavGuide RL Idle':
				return new AnimSheet(
					this.textures.navGuide_Idle_RL_D, this.textures.navGuide_Idle_RL_N, this.textures.navGuide_Idle_RL_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'NavGuide RR Idle':
				return new AnimSheet(
					this.textures.navGuide_Idle_RR_D, this.textures.navGuide_Idle_RR_N, this.textures.navGuide_Idle_RR_R, 128, 128, 128, 128, 1.0, [0], false);

				case 'PeaceWatcher FL Idle':
				return new AnimSheet(
					this.textures.peaceWalker_Idle_FL_D, this.textures.peaceWalker_Idle_FL_N, this.textures.peaceWalker_Idle_FL_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'PeaceWatcher FR Idle':
				return new AnimSheet(
					this.textures.peaceWalker_Idle_FR_D, this.textures.peaceWalker_Idle_FR_N, this.textures.peaceWalker_Idle_FR_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'PeaceWatcher RL Idle':
				return new AnimSheet(
					this.textures.peaceWalker_Idle_FL_D, this.textures.peaceWalker_Idle_FL_N, this.textures.peaceWalker_Idle_FL_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'PeaceWatcher RR Idle':
				return new AnimSheet(
					this.textures.peaceWalker_Idle_FR_D, this.textures.peaceWalker_Idle_FR_N, this.textures.peaceWalker_Idle_FR_R, 128, 128, 128, 128, 1.0, [0], false);

				case 'RampantWalker FL Idle':
				return new AnimSheet(
					this.textures.rampantWalker_Idle_FL_D, this.textures.rampantWalker_Idle_FL_N, this.textures.rampantWalker_Idle_FL_R, 256, 256, 256, 256, 1.0, [0], false);
				case 'RampantWalker FR Idle':
				return new AnimSheet(
					this.textures.rampantWalker_Idle_FR_D, this.textures.rampantWalker_Idle_FR_N, this.textures.rampantWalker_Idle_FR_R, 256, 256, 256, 256, 1.0, [0], false);
				case 'RampantWalker RL Idle':
				return new AnimSheet(
					this.textures.rampantWalker_Idle_FL_D, this.textures.rampantWalker_Idle_FL_N, this.textures.rampantWalker_Idle_FL_R, 256, 256, 256, 256, 1.0, [0], false);
				case 'RampantWalker RR Idle':
				return new AnimSheet(
					this.textures.rampantWalker_Idle_FR_D, this.textures.rampantWalker_Idle_FR_N, this.textures.rampantWalker_Idle_FR_R, 256, 256, 256, 256, 1.0, [0], false);

				case 'Security Drone FL Idle':
				return new AnimSheet(
					this.textures.securityDrone_Idle_FL_D, this.textures.securityDrone_Idle_FL_N, this.textures.securityDrone_Idle_FL_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'Security Drone FR Idle':
				return new AnimSheet(
					this.textures.securityDrone_Idle_FR_D, this.textures.securityDrone_Idle_FR_N, this.textures.securityDrone_Idle_FR_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'Security Drone RL Idle':
				return new AnimSheet(
					this.textures.securityDrone_Idle_RL_D, this.textures.securityDrone_Idle_RL_N, this.textures.securityDrone_Idle_RL_R, 128, 128, 128, 128, 1.0, [0], false);
				case 'Security Drone RR Idle':
				return new AnimSheet(
					this.textures.securityDrone_Idle_RR_D, this.textures.securityDrone_Idle_RR_N, this.textures.securityDrone_Idle_RR_R, 128, 128, 128, 128, 1.0, [0], false);

				case 'NanoBots Idle':
				return new AnimSheet(
					this.textures.nanobots_Idle_D, this.textures.nanobots_N, this.textures.nanobots_R, 1024, 1024, 96, 96, 0.01, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);

				case 'Small Roamer FL Idle':
				return new AnimSheet(
					this.textures.smallRoamer_FL_D, this.textures.smallRoamer_FL_N, this.textures.smallRoamer_FL_R, 1024, 1024, 96, 96, 0.04, 
					[45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74], false);
				case 'Small Roamer FR Idle':
				return new AnimSheet(
					this.textures.smallRoamer_FR_D, this.textures.smallRoamer_FR_N, this.textures.smallRoamer_FR_R, 1024, 1024, 96, 96, 0.04, 
					[45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74], false);
				case 'Small Roamer RL Idle':
				return new AnimSheet(
					this.textures.smallRoamer_RL_D, this.textures.smallRoamer_RL_N, this.textures.smallRoamer_RL_R, 1024, 1024, 96, 96, 0.04, 
					[45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74], false);
				case 'Small Roamer RR Idle':
				return new AnimSheet(
					this.textures.smallRoamer_RR_D, this.textures.smallRoamer_RR_N, this.textures.smallRoamer_RR_R, 1024, 1024, 96, 96, 0.04, 
					[45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74], false);
				case 'Small Roamer FL Death':
				return new AnimSheet(
					this.textures.smallRoamer_FL_D, this.textures.smallRoamer_FL_N, this.textures.smallRoamer_FL_R, 1024, 1024, 96, 96, 0.04, 
					[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], false);
				case 'Small Roamer FR Death':
				return new AnimSheet(
					this.textures.smallRoamer_FR_D, this.textures.smallRoamer_FR_N, this.textures.smallRoamer_FR_R, 1024, 1024, 96, 96, 0.04, 
					[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], false);
				case 'Small Roamer RL Death':
				return new AnimSheet(
					this.textures.smallRoamer_RL_D, this.textures.smallRoamer_RL_N, this.textures.smallRoamer_RL_R, 1024, 1024, 96, 96, 0.04, 
					[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], false);
				case 'Small Roamer RR Death':
				return new AnimSheet(
					this.textures.smallRoamer_RR_D, this.textures.smallRoamer_RR_N, this.textures.smallRoamer_RR_R, 1024, 1024, 96, 96, 0.04, 
					[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], false);
				case 'Small Roamer FL Attack':
				return new AnimSheet(
					this.textures.smallRoamer_FL_D, this.textures.smallRoamer_FL_N, this.textures.smallRoamer_FL_R, 1024, 1024, 96, 96, 0.04, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], false);
				case 'Small Roamer FR Attack':
				return new AnimSheet(
					this.textures.smallRoamer_FR_D, this.textures.smallRoamer_FR_N, this.textures.smallRoamer_FR_R, 1024, 1024, 96, 96, 0.04, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], false);
				case 'Small Roamer RL Attack':
				return new AnimSheet(
					this.textures.smallRoamer_RL_D, this.textures.smallRoamer_RL_N, this.textures.smallRoamer_RL_R, 1024, 1024, 96, 96, 0.04, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], false);
				case 'Small Roamer RR Attack':
				return new AnimSheet(
					this.textures.smallRoamer_RR_D, this.textures.smallRoamer_RR_N, this.textures.smallRoamer_RR_R, 1024, 1024, 96, 96, 0.04, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], false);

				case 'Suicide Drone FL Idle':
				return new AnimSheet(
					this.textures.suicideDrone_FL_D, this.textures.suicideDrone_FL_N, this.textures.suicideDrone_FL_R, 1024, 1024, 96, 96, 0.01, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);
				case 'Suicide Drone FR Idle':
				return new AnimSheet(
					this.textures.suicideDrone_FR_D, this.textures.suicideDrone_FR_N, this.textures.suicideDrone_FR_R, 1024, 1024, 96, 96, 0.01, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);
				case 'Suicide Drone RL Idle':
				return new AnimSheet(
					this.textures.suicideDrone_RL_D, this.textures.suicideDrone_RL_N, this.textures.suicideDrone_RL_R, 1024, 1024, 96, 96, 0.01, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);
				case 'Suicide Drone RR Idle':
				return new AnimSheet(
					this.textures.suicideDrone_RR_D, this.textures.suicideDrone_RR_N, this.textures.suicideDrone_RR_R, 1024, 1024, 96, 96, 0.01, 
					[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);
				case 'Suicide Drone FL Attack':
				return new AnimSheet(
					this.textures.suicideDrone_FL_D, this.textures.suicideDrone_FL_N, this.textures.suicideDrone_FL_R, 1024, 1024, 96, 96, 0.01, 
					[30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59], false);
				case 'Suicide Drone FR Attack':
				return new AnimSheet(
					this.textures.suicideDrone_FR_D, this.textures.suicideDrone_FR_N, this.textures.suicideDrone_FR_R, 1024, 1024, 96, 96, 0.01, 
					[30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59], false);
				case 'Suicide Drone FL Attack':
				return new AnimSheet(
					this.textures.suicideDrone_RL_D, this.textures.suicideDrone_RL_N, this.textures.suicideDrone_RL_R, 1024, 1024, 96, 96, 0.01, 
					[30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59], false);
				case 'Suicide Drone FL Attack':
				return new AnimSheet(
					this.textures.suicideDrone_RR_D, this.textures.suicideDrone_RR_N, this.textures.suicideDrone_RR_R, 1024, 1024, 96, 96, 0.01, 
					[30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59], false);

				default:
				return null;
			}
		}, 
		requestTextures : function(imageSet)
		{
			switch (imageSet)
			{
				case 'rm_door_floor':
				return {diffuse : this.textures.doorFloor_D, normal : this.textures.doorFloor_N, relief : this.textures.doorFloor_R, emissive : null};
				case 'rm_door_panel':
				return {diffuse : this.textures.doorPanel_D, normal : this.textures.doorPanel_N, relief : this.textures.doorPanel_R, emissive : null};
				case 'rm_door_doubleDoorVert':
				return {diffuse : this.textures.doubleDoorVert_D, normal : this.textures.doubleDoorVert_N, relief : this.textures.doubleDoorVert_R, emissive : null};
				case 'rm_door_engineeringWide':
				return {diffuse : this.textures.engineeringWide_D, normal : this.textures.engineeringWide_N, relief : this.textures.engineeringWide_R, emissive : null};
				case 'rm_door_iconHorz':
				return {diffuse : this.textures.iconHoriz_D, normal : this.textures.iconHoriz_N, relief : this.textures.iconHoriz_R, emissive : null};
				case 'rm_door_singleTooth':
				return {diffuse : this.textures.singleTooth_D, normal : this.textures.singleTooth_N, relief : this.textures.singleTooth_R, emissive : null};
				case 'rm_door_wideFloor':
				return {diffuse : this.textures.wideFloor_D, normal : this.textures.wideFloor_N, relief : this.textures.wideFloor_R, emissive : null};

				default:
				return {diffuse : null, normal : null, relief : null, emissive : null};
			}
		}
	});
});