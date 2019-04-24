function logFive(sequence) {
    for(var i=0; i<5; i++) {
        if(!sequence.next())
            break;
        console.log(sequence.print(i));
    }
}

/**
 * @param {Array} arrayElements 
 */
function ArraySequence(arrayElements) {
    this.elements = arrayElements;
    this.counter = 0;
    this.maxCounter = arrayElements.length - 1;
}

ArraySequence.prototype.next = function() {
    return this.counter <= this.maxCounter;
}

ArraySequence.prototype.print = function() {
    return this.elements[this.counter++];
}

function RangeSequence(from, to){
    this.from = Number(from);
    this.to = Number(to);
    this.counter = this.from;
    this.maxCounter = this.to;
}

RangeSequence.prototype.next = function() {
    return this.counter <= this.maxCounter;
}

RangeSequence.prototype.print = function() {
    return this.counter++;
}


logFive(new ArraySequence([1, 2]));
// → 1
// → 2
logFive(new RangeSequence(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104