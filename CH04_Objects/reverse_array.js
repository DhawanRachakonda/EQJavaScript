/**
 * 
 * @param {Array} arr 
 */
function reverseArray(arr) {
    var noOfIterations = arr.length, toReturn = [];
    for(var i=0; i<noOfIterations; i++) {
        toReturn.push(arr.pop());
    }
    return toReturn;
}

var arr = [1,2,3,4,5,6,7,8,9,10];
arr = reverseArray(arr);
console.log(arr);