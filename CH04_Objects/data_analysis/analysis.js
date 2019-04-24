const journal = require("./journal.data");

//  0   0
//  0   0
function pi(table) {
    return ((table[0] * table[3]) - (table[1] * table[2]))/
    Math.sqrt((table[0] + table[1]) * (table[2]+table[3]) * (table[0]+table[2]) * (table[1]+table[3])); 
}

//console.log(pi([76,9,4,1]).toFixed(9));
/**
 * @param {String} eventName 
 * @param {Object} journal 
 * @description sample data : {"events":["lettuce","brushed teeth","work"],"squirrel":false} 
 */
function hasEvent(eventName,journal) {
    return journal.events.indexOf(eventName) != -1;
}

/**
 * 
 * @param {Object} event 
 * @param {Array} journal 
 */
function tableFor(event,journal) {
    var table = [0,0,0,0];
    for(var i=0; i<journal.length; i++) {
        var entry = journal[i], corelation = 0;
        if(hasEvent(event,entry)) corelation += 1;
        if(entry.squirrel) corelation += 2;
        table[corelation] += 1;
    }
    return table;
}

//console.log(tableFor("pizza",journal));

//const corelation = pi(tableFor("pizza",journal));
//console.log("Corelation -> ",corelation);

/**
 * @param {Array} journal 
 * @description sample data(each record) : {"events":["lettuce","brushed teeth","work"],"squirrel":false} 
 */
function gatherCorelations(journal) {
    /**
     * @type {Object}
     */
    var map = {};
    for(var i=0; i<journal.length; i++) {
        var entry = journal[i];
        var events = entry.events;
        for(var j=0; j<events.length; j++) {
            var eventName = events[j];
            if(!(eventName in map)) {
                map[eventName] = pi(tableFor(eventName,journal));
            }
        }
    }
    return map;
}

//console.log("Corelation Data for all -> ", gatherCorelations(journal));

for(var i=0; i<journal.length; i++) {
    var entry = journal[i];
    if(hasEvent("peanuts",entry) && !hasEvent("brushed teeth",entry)) {
        entry.events.push("peanut teeth");
    }
}

console.log(pi(tableFor("peanut teeth",journal)));