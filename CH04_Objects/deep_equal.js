function deepEqual(a,b) {
    if(a===b) return true;

    var aKeys = Object.keys(a), bKeys = Object.keys(b);
    
    if(aKeys.length !== bKeys.length) return false;

    for(key of aKeys) {
        if( (bKeys.indexOf(key) === -1) || !deepEqual(a[key], b[key]) ) return false;
    }
    return true;
}

let obj = {here: {is: "an", has : null}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an", has : null}, object: 2}));