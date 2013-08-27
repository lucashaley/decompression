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
			var index = Math.floor(Math.random() * junkNames.length);
			this.name = junkNames[index];
            this.description = ScriptCore.ItemJunkDescription;
		},
	});
});