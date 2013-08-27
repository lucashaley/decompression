ig.module(
	'game.items.sensorImplant'
)
.requires(
	'impact.entity', 
	'game.items.baseItem'
)
.defines(function(){
	SensorImplant = BaseItem.extend({

		isUsable : false, 
        isImplant : true, 

        init : function()
        {
            this.parent();
            this.name = ScriptCore.ItemSensorImplantName;
            this.description = ScriptCore.ItemSensorImplantDescription;
        }, 

        onLock : function(player)
        {
            this.parent();
            player.implants.sensor = true;
        }, 
	});
});