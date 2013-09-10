ig.module(
	'game.items.junkItem'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	JunkItem = BaseItem.extend({

		isJunk : true, 
		isUsable : false, 
		isTradable : false, 
		isDestroyable : true, 
		isAction : false, 

		destroyOnActivate : false, 

		init : function()
		{
			this.parent();

			var junkNames = 
			[
				ScriptCore.ItemJunkName01, 
				ScriptCore.ItemJunkName02, 
				ScriptCore.ItemJunkName03, 
				ScriptCore.ItemJunkName04, 
				ScriptCore.ItemJunkName05, 
				ScriptCore.ItemJunkName06, 
				ScriptCore.ItemJunkName07, 
				ScriptCore.ItemJunkName08, 
				ScriptCore.ItemJunkName09, 
				ScriptCore.ItemJunkName10
			];
			var junkDescriptions = 
			[
				ScriptCore.ItemJunkDescription01, 
				ScriptCore.ItemJunkDescription02, 
				ScriptCore.ItemJunkDescription03, 
				ScriptCore.ItemJunkDescription04, 
				ScriptCore.ItemJunkDescription05, 
				ScriptCore.ItemJunkDescription06, 
				ScriptCore.ItemJunkDescription07, 
				ScriptCore.ItemJunkDescription08, 
				ScriptCore.ItemJunkDescription09, 
				ScriptCore.ItemJunkDescription10
			];
			var junkTexures = 
			[
				AssetCore.textures.icon_JunkPlant, 
				AssetCore.textures.icon_JunkBottle, 
				AssetCore.textures.icon_JunkBrokenKey, 
				AssetCore.textures.icon_JunkWastedAmmo, 
				AssetCore.textures.icon_JunkScrap, 
				AssetCore.textures.icon_JunkBox, 
				AssetCore.textures.icon_JunkVideoGame, 
				AssetCore.textures.icon_JunkCell, 
				AssetCore.textures.icon_JunkPaperWork, 
				AssetCore.textures.icon_JunkPowerCord, 
			];
			var index = Math.floor(Math.random() * junkNames.length);
			this.texture = junkTexures[index];
			this.name = junkNames[index];
            this.description = junkDescriptions[index];
		},
	});
});