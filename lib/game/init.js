ig.module(
    'game.init'
)
.requires(
    'impact.game',
    'impact.font', 

    'game.scriptcore', 
    'game.assetcore', 
    'game.gamecore', 
    'game.itemcore', 
    'game.enemycore', 
    'game.eventcore', 
    'game.roomcore'
)
.defines(function (){
    ig.global.ScriptCore = new EntityScriptCore();
    ig.global.AssetCore = new EntityAssetCore();
    ig.global.GameCore = new EntityGameCore();
    ig.global.ItemCore = new EntityItemCore();
    ig.global.EnemyCore = new EntityEnemyCore();
    ig.global.EventCore = new EntityEventCore();
    ig.global.RoomCore = new EntityRoomCore();
    ig.global.MainFont = new FontSheet( 'media/FontSheet_128.png' );
    
    ig.System.inject({init:function(canvasId,fps,width,height,scale)
        {
            glInit(document.getElementById(canvasId));
            this.fps = fps;
            this.clock = new ig.Timer();
            this.canvas = glCanvas;
            this.context = gl;
            this.resize(width, height, scale);
        }
    });
    ig.System.inject({clear:function(color)
        {
            glClear();
        }
    });
});