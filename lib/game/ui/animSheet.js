ig.module(
    'game.ui.animSheet'
)
.requires(
    'impact.game',
    'impact.animation'
)
.defines(function () {
    AnimSheet = ig.Animation.extend({

        textures : 
        {
            diffuse : null, 
            normal : null, 
            relief : null, 
        }, 
        sheet : 
        {
            columns : 0, 
            rows : 0, 
            cellw : 0, 
            cellh : 0, 
            width : 0, 
            height : 0, 
        }, 

        init : function(diffuse, normal, relief, imagew, imageh, cellw, cellh, frameTime, sequence, stop)
        {
            /*this.sheet = new ig.AnimationSheet(pathDiffuse, cellw, cellh);
            this.diffuseTexture = glLoadTexture(this.sheet.image.data);
            if (pathNormal != null && pathNormal != undefined)
            {
                this.normalImage = new ig.Image(pathNormal);
                this.normalTexture = glLoadTexture(this.normalImage.data);
            }
            if (pathRelief != null && pathRelief != undefined)
            {
                this.reliefImage = new ig.Image(pathRelief);
                this.reliefTexture = glLoadTexture(this.reliefImage.data);
            }
            this.parent(this.sheet, frameTime, sequence, stop);
            this.columns = Math.floor(this.sheet.image.width / cellw);
            this.rows = Math.floor(this.sheet.image.height / cellh);*/
            this.textures.diffuse = diffuse;
            this.textures.normal = normal;
            this.textures.relief = relief;
            this.sheet.cellw = cellw;
            this.sheet.cellh = cellh;
            this.sheet.width = imagew;
            this.sheet.height = imageh;
            this.sheet.columns = Math.floor(this.sheet.width / this.sheet.cellw);
            this.sheet.rows = Math.floor(this.sheet.height / this.sheet.cellh);
            this.parent(this.sheet, frameTime, sequence, stop);
            console.log('ANIM ', this);
        }, 

        draw : function(x, y, room)
        {
            var cellw = this.sheet.cellw;
            var cellh = this.sheet.cellh;
            var row = Math.floor(this.tile / this.sheet.columns);
            var column = this.tile - (row * this.sheet.columns);
            var light1, light2, light3 = null;
            if (room.lights.length > 0) light1 = room.lights[0];
            if (room.lights.length > 1) light2 = room.lights[1];
            if (room.lights.length > 2) light3 = room.lights[2];

            //console.log(cellw, cellh, column, row);
            glDrawCell(this.sheet.cellw, this.sheet.cellh, column, row, x, y, this.sheet.width, this.sheet.height, room.intensity, 
                this.textures.diffuse, this.textures.normal, this.textures.relief, null, light1, light2, light3, 
                room.size.x, room.size.y, room.pos.x, room.pos.y, room.textures.relief
            );
        }, 
    });
});