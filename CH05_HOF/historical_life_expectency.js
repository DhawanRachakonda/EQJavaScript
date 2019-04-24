var data = JSON.parse(require("./data_analysis/ansestry.data"));

function calculateHistoricalLifeExpectency() {
    var groupData = {};

    var groupBy = function(groupData,element) {
        var century = Math.ceil(element.died / 100)
        if(groupData[century])
            groupData[century].push(element.died - element.born) ;
        else
            groupData[century] = [(element.died - element.born)];
        return groupData;
    }

    var average = function(array) {
        var plus = function(a,b){return a+b}
        return array.reduce(plus) / array.length;
    }

    function start(data,groupData,counter,groupBy) {
        if(counter === data.length) return groupData;
        return start(data,groupBy(groupData,data[counter]),++counter,groupBy);
    }
    var groupedData = start(data,groupData,0,groupBy);

    for(var century in groupedData)
        console.log("century : ",century," ",average(groupData[century]));
}

calculateHistoricalLifeExpectency();