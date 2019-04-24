(function() {
    /**
     * 
     * @param {String} str 
     * @param {String} charToCount 
     */
    var countChar = function(str,charToCount) {
        if(str.length === 1) {
            return str === charToCount ? 1 : 0;
        } else if(str.length === 0) {
            return 0;
        } else {
            return countChar(str[0],charToCount) + countChar(str.slice(1),charToCount);
        }
    }
    var countBs = function(str) {
        console.log("B's in "+str+" -> ",countChar(str,"B"));;
    }
    var countKs = function(str) {
        console.log("K's in "+str+" -> ",countChar(str,"k"));;
    }
    countBs("BBC");
    countKs("kakkerlak");
})();