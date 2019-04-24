function flattern(elements,fn) {
    var max = elements.length, refinedElements;
    if(elements[0].length) {
        refinedElements = elements[0];
    } else {
        refinedElements = [elements[0]];
    }
    function startProcess(counter) {
        if(counter === max) return refinedElements;
        refinedElements = fn(refinedElements,elements[counter]);
        return startProcess(++counter);
    }
    return startProcess(1);
}

console.log(flattern([1,2,4,5,[7,8,5],10,11,12], function(elements,current) {
    return elements.concat(current);
}));