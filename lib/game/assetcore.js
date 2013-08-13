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

			zombie_Idle_D : null, 
			zombie_Idle_N : null, 
			nanobots_Idle_D : null, 

			testSheet : null, 

			player : null, 
			bag : null, 
			door : null, 
		}, 
		animations : 
		{
			testSheet : null, 
			zombie_Idle : null, 
			nanobots_Idle : null, 
		}, 
        init : function()
        {
            console.log('INIT ASSETCORE');
        }, 

		load : function()
		{
			console.log('ASSET IMAGES', this.images);

			this.textures.button = glLoadTexture(this.images.button.data);
			this.textures.contextMenu = glLoadTexture(this.images.contextMenu.data);
			this.textures.tyche_D = glLoadTexture(this.images.tyche_D.data);
			this.textures.tyche_N = glLoadTexture(this.images.tyche_N.data);
			this.textures.tyche_R = glLoadTexture(this.images.tyche_R.data);
			this.textures.recreation_D = glLoadTexture(this.images.recreation_D.data);
			this.textures.recreation_N = glLoadTexture(this.images.recreation_N.data);
			this.textures.recreation_R = glLoadTexture(this.images.recreation_R.data);
			this.textures.infirmary_D = glLoadTexture(this.images.infirmary_D.data);
			this.textures.infirmary_N = glLoadTexture(this.images.infirmary_N.data);
			this.textures.infirmary_R = glLoadTexture(this.images.infirmary_R.data);
			this.textures.zombie_Idle_D = glLoadTexture(this.images.zombie_Idle_D.data);
			this.textures.zombie_Idle_N = glLoadTexture(this.images.zombie_Idle_N.data);
			this.textures.nanobots_Idle_D = glLoadTexture(this.images.nanobots_Idle_D.data);
			this.textures.testSheet = glLoadTexture(this.images.testSheet.data);
			this.textures.bag = glLoadTexture(this.images.bag.data);
			this.textures.door = glLoadTexture(this.images.door.data);

			console.log('ASSET TEXTURES', this.textures);

			this.animations.testSheet = new AnimSheet(this.textures.testSheet, null, null, 1024, 1024, 128, 128, 1.0, [0, 1, 2, 3], false);
			this.animations.zombie_Idle = new AnimSheet(this.textures.zombie_Idle_D, this.textures.zombie_Idle_N, null, 1024, 1024, 96, 192, 0.04, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);
			this.animations.nanobots_Idle = new AnimSheet(this.textures.nanobots_Idle_D, null, null, 1024, 1024, 96, 96, 0.01, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], false);

			console.log('ASSET ANIMATIONS', this.animations);
		}, 
	});
});