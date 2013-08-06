ig.module(
    'game.ui.fontSheet'
)
.requires(
    'impact.game',
    'impact.font'
)
.defines(function () {
    FontSheet = ig.Font.extend({

        texture : null, 

        onload : function(ev)
        {
            this.parent(ev);
            this.texture = glLoadTexture(this.data);
            console.log('FONT TEXTURE', this.data, this.texture);
        }, 

        draw : function(text, x, y, align)
        {
            if(typeof(text) != 'string')
            {
                text = text.toString();
            }
            text = text.toUpperCase();
            var cellSize = this.width / 8;
            var charSpacing = cellSize * 0.7;
            for (var i = 0; i < text.length; i++)
            {
                var ch = text[i];
                var column = -1;
                var row = -1;
                var offset = i * charSpacing;
                if (align == ig.Font.ALIGN.CENTER) offset -= (Math.floor(text.length / 2) * charSpacing) - (charSpacing / 2);

                switch (ch)
                {
                    case 'A':
                    column = 0;
                    row = 0;
                    break;
                    case 'B':
                    column = 1;
                    row = 0;
                    break;
                    case 'C':
                    column = 2;
                    row = 0;
                    break;
                    case 'D':
                    column = 3;
                    row = 0;
                    break;
                    case 'E':
                    column = 4;
                    row = 0;
                    break;
                    case 'F':
                    column = 5;
                    row = 0;
                    break;
                    case 'G':
                    column = 6;
                    row = 0;
                    break;
                    case 'H':
                    column = 7;
                    row = 0;
                    break;
                    case 'I':
                    column = 0;
                    row = 1;
                    break;
                    case 'J':
                    column = 1;
                    row = 1;
                    break;
                    case 'K':
                    column = 2;
                    row = 1;
                    break;
                    case 'L':
                    column = 3;
                    row = 1;
                    break;
                    case 'M':
                    column = 4;
                    row = 1;
                    break;
                    case 'N':
                    column = 5;
                    row = 1;
                    break;
                    case 'O':
                    column = 6;
                    row = 1;
                    break;
                    case 'P':
                    column = 7;
                    row = 1;
                    break;
                    case 'Q':
                    column = 0;
                    row = 2;
                    break;
                    case 'R':
                    column = 1;
                    row = 2;
                    break;
                    case 'S':
                    column = 2;
                    row = 2;
                    break;
                    case 'T':
                    column = 3;
                    row = 2;
                    break;
                    case 'U':
                    column = 4;
                    row = 2;
                    break;
                    case 'V':
                    column = 5;
                    row = 2;
                    break;
                    case 'W':
                    column = 6;
                    row = 2;
                    break;
                    case 'X':
                    column = 7;
                    row = 2;
                    break;
                    case 'Y':
                    column = 0;
                    row = 3;
                    break;
                    case 'Z':
                    column = 1;
                    row = 3;
                    break;

                    case '1':
                    column = 0;
                    row = 5;
                    break;
                    case '2':
                    column = 1;
                    row = 5;
                    break;
                    case '3':
                    column = 2;
                    row = 5;
                    break;
                    case '4':
                    column = 3;
                    row = 5;
                    break;
                    case '5':
                    column = 4;
                    row = 5;
                    break;
                    case '6':
                    column = 5;
                    row = 5;
                    break;
                    case '7':
                    column = 6;
                    row = 5;
                    break;
                    case '8':
                    column = 7;
                    row = 5;
                    break;
                    case '9':
                    column = 0;
                    row = 6;
                    break;
                    case '0':
                    column = 1;
                    row = 6;
                    break;

                    case ',':
                    column = 2;
                    row = 3;
                    break;
                    case '.':
                    column = 3;
                    row = 3;
                    break;
                    case '"':
                    column = 4;
                    row = 3;
                    break;
                    case '!':
                    column = 5;
                    row = 3;
                    break;
                    case '?':
                    column = 6;
                    row = 3;
                    break;
                    case ':':
                    column = 7;
                    row = 3;
                    break;
                    case ';':
                    column = 0;
                    row = 4;
                    break;
                    case '@':
                    column = 1;
                    row = 4;
                    break;
                    case '#':
                    column = 2;
                    row = 4;
                    break;
                    case '$':
                    column = 3;
                    row = 4;
                    break;
                    case '%':
                    column = 4;
                    row = 4;
                    break;
                    case '^':
                    column = 5;
                    row = 4;
                    break;
                    case '&':
                    column = 6;
                    row = 4;
                    break;
                    case '*':
                    column = 7;
                    row = 4;
                    break;

                    default:
                    break;
                }
                if (column < 0 || row < 0) continue;
                //console.log(this, text, x, y);

                glDrawCell(
                    cellSize, cellSize, column, row, 
                    x + offset, y, 
                    this.width, this.height, 
                    1, 
                    this.texture);
            }
        }, 
    });
});