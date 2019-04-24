(function(number1,number2) {
    var calculateMinimumNumber = function(number1, number2) {
        if(!isNaN(number1) && !isNaN(number2)) {
            return number1 === number2 ? number1 : number1 > number2 ? number2 : number1;
        }
        else {
            return null; 
        }
    }
    console.log("Minimum Number ->",calculateMinimumNumber(number1,number2));
})(5,10);