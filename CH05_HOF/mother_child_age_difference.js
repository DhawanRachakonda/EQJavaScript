var data = JSON.parse(require("./data_analysis/ansestry.data"));
var arrayOperations = require("./data_analysis/operations");


function calculateMotherChidAgeDifferenceAndAverage() {
    function map(person) {
        return person.born - arrayOperations.getByNames()[person.mother].born;
    }

    function reduce(a,b) {
        return a+b;
    }

    var ages = [];

    function calculateAgeDifference(start,end) {
        if(start === end) return;
        if(arrayOperations.getByNames()[data[start].mother]) {
            ages.push(map(data[start]));
        }
        calculateAgeDifference(++start,end);
    }
    calculateAgeDifference(0,data.length);

    var currentAge = ages[0];

    function calculateAverage(counter,element) {
        if(counter === ages.length) return currentAge;
        currentAge = reduce(currentAge,ages[counter]);
        return calculateAverage(++counter);
    }
    return calculateAverage(1,currentAge) / ages.length;
}

console.log(calculateMotherChidAgeDifferenceAndAverage());

function calculateMotherChidAgeDifferenceAndAverage2() {
    var thisPerson = data[0], validEntries = 0, notFound = 0;
    function calculate(person,age,counter) {
        if(counter === data.length) return age / validEntries;
        if(arrayOperations.getByNames()[person.mother]) {
            var motherAge = arrayOperations.getByNames()[person.mother].born;
            validEntries += 1;
            var thisOneAge = person.born;
            return calculate(data[++counter],age + (thisOneAge - motherAge),counter);
        }
        return calculate(data[++counter],age,counter);
    }
    return calculate(thisPerson,0,0)
}

console.log(calculateMotherChidAgeDifferenceAndAverage2());