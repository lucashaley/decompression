ig.module(
	'game.items.reprogrammingHardware'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	ReprogrammingHardware = BaseItem.extend({

		isAction : true, 

        init : function()
        {
            this.parent();
            this.name = ScriptCore.ItemReprogrammingHardwareName;
            this.description = ScriptCore.ItemReprogrammingHardwareDescription;
            this.useText = ScriptCore.ItemReprogrammingHardwareUse;
            this.cannotUseText = ScriptCore.ItemReprogrammingHardwareCannotUse;
        }, 

        canUse : function(player)
        {
            return GameCore.currentRoom.hasEnemies;
        }, 
        onUse : function(player)
        {
        	var enemy = GameCore.currentRoom.getEnemy();
        	if (enemy == null) return;
        	enemy.death();
        }, 
	});
});