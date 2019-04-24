var MOUNTAINS = require("./mountains");

/**
 * 
 * @param {Array[]} rows 
 */
function rowHeights(rows){
    return rows.map(function(row){
        return row.reduce(function(max,cell){
            return Math.max(max,cell.minHeight());
        },0)
    });
}

function colWidths(rows){
    return rows[0].map(function(_,i){
        return rows.reduce(function(max , row){
            return Math.max(max,row[i].minWidth());
        },0)
    });
}

function drawTable(rows){
    var heights = rowHeights(rows);
    var widths = colWidths(rows);

    /**
     * 
     * @param {Array} blocks 
     * @param {Number} lineNo 
     */
    function drawLine(blocks,lineNo){
        return blocks.map(function(block){
            return block[lineNo];
        }).join(" ");
    }

    function drawRow(row, rowNum){
        var blocks = row.map(function(cell,colNum){
            return cell.draw(widths[colNum],heights[rowNum]);
        });
        //[ [ '##' ], [ '  ' ], [ '##' ], [ '  ' ], [ '##' ] ]
        return blocks[0].map(function(_,lineNo){
            return drawLine(blocks,lineNo);
        }).join("\n");
    }
    return rows.map(drawRow).join("\n");
}

function repeat(string,times){
    var result = "";
    for(var i=0; i<times; i++){
        result += string;
    }
    return result;
}

function TextCell(text){
    this.text = text.split("\n");
}

TextCell.prototype.minWidth = function() {
    return this.text.reduce(function(width, line){
        return Math.max(width,line.length);
    },0);
}

TextCell.prototype.minHeight = function() {
    return this.text.length;
};

TextCell.prototype.draw = function(width, height) {
    var result = [];
    for(var i=0; i<height; i++){
        var line = this.text[i] || "";
        result.push(line + repeat(" ", width - line.length));
    }
    return result;
};

/**
 * 
 * @param {TextCell} textCell 
 */
function UnderlinedCell(textCell) {
    this.textCell = textCell;
}

UnderlinedCell.prototype.minHeight = function () {
    return this.textCell.minHeight();
}

UnderlinedCell.prototype.minWidth = function() {
    return this.textCell.minWidth();
}

UnderlinedCell.prototype.draw = function(width,height) {
    return this.textCell.draw(width,height).concat([repeat("-",width)]);
}

var rows = [];
for(var i=0; i<5; i++){
    var row = [];
    for(var j=0; j<5; j++) {
        if((j+i) % 2 === 0)
            row.push(new TextCell("##\n#"));
        else
            row.push(new TextCell(" "));
    }
    rows.push(row);
}

// var rows = [[1,2,3,8,7],[8,9,5,2,1],[1,2,10,8,7],[11,12,16,8,7]];

// //console.log(rowHeights(rows));
// console.log(colWidths(rows));

console.log("\n",drawTable(rows));

function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function(name){
        return new UnderlinedCell(new TextCell(name))
    });
    var body = data.map(function(row) {
        return keys.map(function(key){
            return new TextCell(String(row[key]));
        })
    });
    return [headers].concat(body);
}

console.log("\n",drawTable(dataTable(MOUNTAINS)));

function RTExtCell(textCell) {
    TextCell.call(this,textCell);
}

RTExtCell.prototype = Object.create(TextCell.prototype);

RTExtCell.prototype.draw = function(width,height) {
    var result = [];
    for(var i=0; i<height; i++) {
        var textLine = this.text[i] || "";
        result.push(repeat(" ",width-textLine.length)+textLine);
    }
    return result;
}

function dataTable1(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function(name){
        return new UnderlinedCell(new TextCell(name))
    });
    var body = data.map(function(row) {
        return keys.map(function(key){
            var value = row[key];
            if(typeof value === "number")
                return new RTExtCell(String(value));
            else
                return new TextCell(String(value));
        })
    });
    return [headers].concat(body);
}

console.log("\n",drawTable(dataTable1(MOUNTAINS)));

module.exports = TextCell;