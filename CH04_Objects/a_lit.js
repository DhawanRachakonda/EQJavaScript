var listConvertor = (function() {

    const findN = function(list,n,counter) {
        if(!list) return undefined;
        else if(n === counter) return list.value;
        return findN(list.rest,n, counter+1);
    };

    const convertListToArray = function(arrayToList,elements) {
        if(!arrayToList.rest) return elements.push(arrayToList.value);
        elements.push(arrayToList.value);
        convertListToArray(arrayToList.rest,elements);
    };

    return {
        arrayToList : function(elements) {
            if(elements.length === 1) return {value : elements[0], rest : null};
            return {value : elements[0], rest : this.arrayToList(elements.slice(1))};
        },

        prepend : function(value,rest) {
            return {value : value, rest : rest || null};
        },

        nth : function(list,n) {
            return findN(list,n,0);
        },

        

        listToArray : function(arrayToList) {
            var elements = [];
            convertListToArray(arrayToList,elements);
            return elements;
        }
    };
})();

var arrayToList = listConvertor.arrayToList([10,20,30,40,50]);
console.log(JSON.stringify(arrayToList));
var listToArray = listConvertor.listToArray(arrayToList);
console.log(listToArray);
var entry = listConvertor.prepend(10,listConvertor.prepend(20,null));
console.log(entry);
console.log("nth -> ",listConvertor.nth(arrayToList,2));