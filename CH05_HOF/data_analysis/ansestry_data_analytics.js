var arrayOperations = require("./operations");


function reduceAncestors(person,f,defaultValue) {
    function valueFor(person) {
        if(!person) {
            return defaultValue;
        } else {
            return f(person,valueFor(arrayOperations.getByNames()[person.mother]), valueFor(arrayOperations.getByNames()[person.father]));
        }
    }
    return valueFor(person);
}

function sharedDNA(person,fromMother, fromFather) {
    if(person.name == "Pauwels van Haverbeke")
        return 1;
    else
        return (fromMother + fromFather) / 2;
}

var ph = arrayOperations.getByNames()["Philibert Haverbeke"];
var reduceValue = reduceAncestors(ph,sharedDNA,0);
console.log(reduceValue / 4);

function reduceToRoot(person,f) {
    function getParent(person) {
        if(!person) 
            return 0;
        else
            return f(person,getParent(arrayOperations.getByNames()[person.mother]), getParent(arrayOperations.getByNames()[person.father]));
    }
    return getParent(person);
}

function countAncesters(person,test) {
    var combine = function(current,fromFather,fromMother) {
        var thisOneCounts = person != current && test(current);
        return fromFather + fromMother + (thisOneCounts ? 1 : 0);
    }
    return reduceToRoot(person,combine);
}

function longLivePercentage(person) {
    var all = countAncesters(person,function(){return true});

    var above69 = countAncesters(person,function(current) {
        return (current.died - current.born) >= 70;
    });
    return above69 / all;
}

console.log(longLivePercentage(arrayOperations.getByNames()["Emile Haverbeke"]))