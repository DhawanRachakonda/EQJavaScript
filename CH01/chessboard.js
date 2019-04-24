(function() {
    var gridSize = 8, chessBoard=" ";
    var printNewLine = function() {
        chessBoard += "\n";
    }
    var goToNextRow = function() {
        printNewLine.apply(null,[]);
    }
    var goToNextRowAndAddExtraSpace = function() {
        goToNextRow.apply(null,[]);
        chessBoard += " ";
    }
    var printOddColumn = function() {
        chessBoard += " ";
    }
    var printEventColumn = function() {
        chessBoard += "#";
    }
    var printBaedOn = function(columnNumber) {
        if(!isNaN(columnNumber) && columnNumber % 2 === 0)
            printEventColumn.apply(null,[]);
        else
            printOddColumn.apply(null,[]);
    }
    for(var i=0; i<gridSize; i++) {
        for(var j=0; j<gridSize; j++) {
            printBaedOn.apply(null,[j]);
        }
        if(i%2 === 0) {
            goToNextRow.apply(null,[]);
        } else {
            goToNextRowAndAddExtraSpace.apply(null,[]);
        }
    }
    console.log(chessBoard);
})();