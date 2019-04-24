/**
 * 
 * @param {Array} elements 
 * @param {Function} condition 
 */
function some(elements,condition) {
    function someTest(elements,counter) {
        if(elements.length === counter)
            return false;
        return condition.apply(null,[elements[counter]]) || someTest(elements,++counter);
    }
    return someTest(elements,0);
}

console.log(some([1,2,5,NaN,3,5,8,7],isNaN));

/**
 * @param {Array} elements 
 * @param {Function} conditions 
 */
function every(elements,condition) {
    function everyTest(elements,counter) {
        if(elements.length === counter)
            return true;
        return condition.apply(null,[elements[counter]]) && everyTest(elements,++counter);
    }
    return everyTest(elements,0);
}

console.log(every([NaN,5,NaN],isNaN));