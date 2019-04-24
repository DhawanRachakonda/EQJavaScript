(function() {
    var multipleOfThree = "Fizz", multipleOfFive="Buzz", endOfNumber=16;
    var multipleOfThreeAndFive = multipleOfThree+multipleOfFive;
    var isMultipleOf3 = function(number) {
        return number % 3 === 0;
    };
    var isMultipleOf5 = function(number) {
        return number % 5 === 0;
    };
    var isMultipleOf3And5 = function(number) {
        return isMultipleOf3.apply(null,arguments) && isMultipleOf5.apply(null,arguments);
    }
    for(var i=0; i<endOfNumber; i++) {
        console.log("Number",i);
        if(isMultipleOf3And5.call(null,[i])) {
            console.log(multipleOfThreeAndFive);
        } else if(isMultipleOf3.call(null,[i])) {
            console.log(multipleOfThree);
        } else if(isMultipleOf5.call(null,[i])) {
            console.log(multipleOfFive);
        }
    }
})();