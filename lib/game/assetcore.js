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

			/*octoRoom_D: new ig.Image('media/rooms/Octo-room/rm_Corridor_Octo_01_D.png'),
			octoRoom_N: new ig.Image('media/rooms/Octo-room/rm_Corridor_Octo_01_N.png'),
			octoRoom_R: new ig.Image('media/rooms/Octo-room/rm_Corridor_Octo_01_R.png'),
			corridorT_D: new ig.Image('media/rooms/Corridor T/rm_corridorT_Armoury_01_D.png'),
			corridorT_N: new ig.Image('media/rooms/Corridor T/rm_corridorT_Armoury_01_N.png'),
			corridorT_R: new ig.Image('media/rooms/Corridor T/rm_corridorT_Armoury_01_R.png'),
			corridorStraight_D: new ig.Image('media/rooms/Corridor_Straight/rm_StraightArmoury_01_D .png'),
			corridorStraight_N: new ig.Image('media/rooms/Corridor_Straight/rm_StraightArmoury_01_N .png'),
			corridorStraight_R: new ig.Image('media/rooms/Corridor_Straight/rm_StraightArmoury_01_R .png'),
			corridorPit_D: new ig.Image('media/rooms/Corridor Pit/rm_ElbowPit_Engineering_01_D.png'),
			corridorPit_N: new ig.Image('media/rooms/Corridor Pit/rm_ElbowPit_Engineering_01_N.png'),
			corridorPit_R: new ig.Image('media/rooms/Corridor Pit/rm_ElbowPit_Engineering_01_R.png'),
			corridorElbow_D: new ig.Image('media/rooms/Corridor_Elbow_02/rm_elbow_engineering_01_D.png'),
			corridorElbow_N: new ig.Image('media/rooms/Corridor_Elbow_02/rm_elbow_engineering_01_N.png'),
			corridorElbow_R: new ig.Image('media/rooms/Corridor_Elbow_02/rm_elbow_engineering_01_R.png'),
			airlock_D: new ig.Image('media/rooms/Airlock/rm_Corridor_Airlock_01_D.png'),
			airlock_N: new ig.Image('media/rooms/Airlock/rm_Corridor_Airlock_01_N.png'),
			airlock_R: new ig.Image('media/rooms/Airlock/rm_Corridor_Airlock_01_R.png'),
			oddShape_D: new ig.Image('media/rooms/Odd Shape/rm_Corridor_Odd_01_D.png'),
			oddShape_N: new ig.Image('media/rooms/Odd Shape/rm_Corridor_Odd_01_N.png'),
			oddShape_R: new ig.Image('media/rooms/Odd Shape/rm_Corridor_Odd_01_R.png'),*/

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

			zombie_Idle_D : new ig.Image('media/enemies/IsoZombie_Idle_FR.png'), 
			zombie_Idle_N : new ig.Image('media/enemies/IsoZombie_N_Idle_FR.png'), 
			nanobots_Idle_D : new ig.Image('media/enemies/Nanobots_Idle.png'), 

			testSheet : new ig.Image('media/sheet.png'), 

			player : new ig.Image('media/player1.png'), 
			bag : new ig.Image('media/bag.png'), 
			door : new ig.Image('media/door.png'), 
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

			zombie_Idle_D : null, 
			zombie_Idle_N : null, 
			nanobots_Idle_D : null, 

			testSheet : null, 

			player : null, 
			bag : null, 
			door : null, 
		}, 
		sounds : 
		{
		}, 

        init : function()
        {
            //console.log('INIT ASSETCORE');
        }, 

		load : function()
		{
			console.log('ASSET IMAGES', this.images, this.textures);

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

			/*this.textures.octoRoom_D = glLoadTexture(this.images.octoRoom_D.data);
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
			this.textures.airlock_D = glLoadTexture(this.images.Airlock_D.data);
			this.textures.airlock_N = glLoadTexture(this.images.Airlock_N.data);
			this.textures.airlock_R = glLoadTexture(this.images.Airlock_R.data);
			this.textures.oddShape_D = glLoadTexture(this.images.oddShape_D.data);
			this.textures.oddShape_N = glLoadTexture(this.images.oddShape_N.data);
			this.textures.oddShape_R = glLoadTexture(this.images.oddShape_R.data);*/

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

			this.textures.zombie_Idle_D = glLoadTexture(this.images.zombie_Idle_D.data);
			this.textures.zombie_Idle_N = glLoadTexture(this.images.zombie_Idle_N.data);
			this.textures.nanobots_Idle_D = glLoadTexture(this.images.nanobots_Idle_D.data);

			this.textures.testSheet = glLoadTexture(this.images.testSheet.data);
			this.textures.player = glLoadTexture(this.images.player.data);
			this.textures.bag = glLoadTexture(this.images.bag.data);
			this.textures.door = glLoadTexture(this.images.door.data);

			console.log('MUSIC TRACKS ', ig.music);
			ig.music.add('Start_Theme_Demo_Aug26th_v1.mp3', 'start');
			ig.music.add('Ending_Theme_Demo_Aug26th_v1.mp3', 'end');
			ig.music.add('Main_Theme_Demo_Aug26_V1.mp3', 'main');

			//ig.music.play('main');
		}, 

		requestAnim : function(name)
		{
			switch (name)
			{
				case 'Test':
				return new AnimSheet(this.textures.testSheet, null, null, 1024, 1024, 128, 128, 1.0, [0, 1, 2, 3], false);
				case 'Player':
				return new AnimSheet(this.textures.player, null, null, 128, 128, 128, 128, 1.0, [0], false);

				case 'Zombie Idle':
				return new AnimSheet(this.textures.zombie_Idle_D, this.textures.zombie_Idle_N, null, 1024, 1024, 96, 192, 0.04, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);
				case 'NanoBots Idle':
				return new AnimSheet(this.textures.nanobots_Idle_D, null, null, 1024, 1024, 96, 96, 0.01, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);

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