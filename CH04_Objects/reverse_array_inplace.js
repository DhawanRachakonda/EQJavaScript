/**
 * 
 * @param {Array} elements 
 */
function reverseArrayInPlace(elements) {
    var len = elements.length
    for(var i=0 ; i < Math.floor(len / 2); i++) {
        var element = elements[i];
        elements[i] = elements[(len - 1) - i];
        elements[(len - 1) - i] = element;
    }
}
var numbers = [1,2,3,4,5,6,7,8,9,10];
reverseArrayInPlace(numbers);
console.log("Reverse In place -> ",numbers);