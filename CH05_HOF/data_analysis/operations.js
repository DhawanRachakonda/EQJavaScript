var ANCESTRY_FILE = JSON.parse(require("./ansestry.data"));

var arrayOperations = (function(data){

    var forEach = function(f,start) {
        var i = 0;
        if(start) i = start;
        for(; i<data.length; i++) {
            f.apply(null, [data[i], i]);
        }
    };

    var byName = {};

    forEach(function(person) {
        byName[person.name] = person;
    })

    return {
        filter : function(test) {
            var passedElements = [];
            count = 0;
            forEach(function(element,i) {
                if(test.apply(null,[element,i])) {
                    passedElements.push(element);
                    count += 1;
                }
            });
            return {"passedElements" : passedElements, "matcheRecords" : count , "totalFetched" : data.length }
        },

        getByNames : function() {
            return byName;
        },

        map : function(mapper) {
            var transformedElements = [];
            forEach(function(element) {
                transformedElements.push(mapper(element));
            });
            return transformedElements;
        },

        reduce : function(combine,start) {
            var i=0, current;
            if(!start) {
                current = data[0];
                i = 1;
            } else {
                current = data[start];
                i = start + 1;
            }
            forEach(function(element) {
                current = combine(current,element);
            },i);
            return current;
        }
    }
})(ANCESTRY_FILE);

// console.log(arrayOperations.filter(function(person){
//     return person.born > 1900 && person.born < 1925;
// }))

// console.log(arrayOperations.map(function(person){
//     return person.name;
// }));

// console.log(arrayOperations.reduce(function(min,current) {
//     return current.born < min.born ? current : min;
// }));

module.exports = arrayOperations;