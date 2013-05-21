ig.module(
    'game.init'
)
.requires(
    'impact.game',
    'impact.font'
)
.defines(function () {
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
    ig.Font.inject({draw: function(text, x, y, align)
        {

        }
    });
});