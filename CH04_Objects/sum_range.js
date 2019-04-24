var rangeStatistics = (function(){

    var traker = {
        number : 0,
        rangeOfNumbers : [],
        sum : 0
    };

    return {
            
        showRange : function() {
            return traker.rangeOfNumbers;
        },

        step : function(step) {
            traker.number += step || 1;
        },
    
        hasLimitReached : function(limit) {
            return traker.number >= limit || traker.number <= 0;
        },

        range : function(start,end) {
            if(arguments[2] && arguments[2] < 0) {
                for(traker.number = start; traker.number >= end; traker.number += arguments[2]) {
                    traker.rangeOfNumbers.push(traker.number);
                }
            } else {
                traker.number = start;
                while(!this.hasLimitReached(end+1)) {
                    traker.rangeOfNumbers.push(traker.number);
                    this.step(arguments[2]);
                }
            }
        },

        sumOnRange : function(numbers) {
            if(numbers.length === 0) return 0;
            return numbers[0] + this.sumOnRange(numbers.slice(1));
        },

        sum : function() {
            traker.sum = this.sumOnRange(traker.rangeOfNumbers);
            return traker.sum;
        }
    }
})();

rangeStatistics.range(5,2,-1);
console.log("Range -> ",rangeStatistics.showRange());
console.log("Sum : ",rangeStatistics.sum());