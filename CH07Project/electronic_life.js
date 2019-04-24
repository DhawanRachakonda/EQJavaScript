
var plan = ["############################",
"#      #    #      o      ##",
"#                          #",
"#          #####           #",
"##         #   #    ##     #",
"###           ##     #     #",
"#           ###      #     #",
"#   ####                   #",
"#   ##       o             #",
"# o  #         o       ### #",
"#    #                     #",
"############################"];

function Vector(x,y) {
    this.x = x;
    this.y = y;
}

/**
 * 
 * @param {Vector} vector 
 */
Vector.prototype.plus = function(vector) {
    return new Vector((this.x + vector.x) , (this.y + vector.y))
}

/**
 * 
 * @param {Vector} vector 
 */
Vector.prototype.minus = function(vector) {
    return new Vector((this.x - vector.x ) , (this.y - vector.y));
}

Object.defineProperty(Vector.prototype,"length",{
    get : function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
});

function Grid(width,height) {
    this.space = new Array(width*height);
    this.width = width;
    this.height = height;
}

/**
 * 
 * @param {Vector} vector 
 */
Grid.prototype.isInside = function(vector) {
    return vector.y < this.height && vector.y >= 0 && 
        vector.x < this.width && vector.x >= 0;
}

/**
 * 
 * @param {Vector} vector 
 */
Grid.prototype.get = function(vector) {
    if(this.isInside(vector))
        return this.space[vector.x + (vector.y * this.width)];
    return undefined;
}

/**
 * 
 * @param {Vector} vector 
 * @param {String} value 
 */
Grid.prototype.set = function(vector, value) {
    if(this.isInside(vector))
        this.space[vector.x + (this.width * vector.y)] = value
}

function gridTest() {
    var grid = new Grid(2,3);
    var vector = new Vector(1,1);
    console.log(grid.get(vector));
    grid.set(vector,"X");
    console.log(grid.get(vector));
}

//gridTest();

var directions = {
    "n" : new Vector(0,-1),
    "ne" : new Vector(1,-1),
    "e" : new Vector(1,0),
    "se" : new Vector(1,1),
    "s" : new Vector(0,-1),
    "sw" : new Vector(-1,1),
    "w" : new Vector(-1,0),
    "nw" : new Vector(-1,-1),
}

/**
 * 
 * @param {Array} array 
 */
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
    this.direction = randomElement(directionNames);
}

BouncingCritter.prototype.act = function(view) {
    if(view.look(this.direction) != " ")
        this.direction = view.find(" ") || "s";
    return {type : "move", direction : this.direction};
}

function elementFromChar(legend,ch) {
    if(ch === " ")
        return null;
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}

/**
 * 
 * @param {Array} map 
 * @param {Object} legend 
 */
function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function(value,height){
        for(var i=0 ; i<value.length; i++) {
            this.grid.set(new Vector(i,height), elementFromChar(legend,value[i]));
        }
    },this);
}

function charFromElement(element) {
    if(element === null) 
        return " ";
    else
        return element.originChar;
}

// World.prototype.toString = function() {
//     var output = "";
//     for(var y=0; y < this.grid.height; y++) {
//         for(x=0; x<this.grid.width; x++) {
//             var element = this.grid.get(new Vector(x,y));
//             output += charFromElement(element);
//         }
//         output += "\n";
//     }
//     return output;
// }

/**
 * 
 * @param {Function} f 
 * @param {Object} context 
 */
Grid.prototype.forEach = function(f, context) {
    for(var y=0; y < this.height; y++) {
        for(x=0; x<this.width; x++) {
            var value = this.space[x + (this.width * y)];
            f.call(context,value,new Vector(x,y));
        }
    }
};

World.prototype.toString = function() {
    var output = "";
    var thisX = 0;
    this.grid.forEach(function(value , vector){
        if(vector.y - thisX == 1) {
            output += "\n";
            thisX += 1;
        }
       output += charFromElement(this.grid.get(vector)); 
    },this);
    return output;
}

function Wall(){}

//==========================Animation logic starts from here!!=========================

World.prototype.turn = function() {
    var acted = [];
    this.grid.forEach(function(critter,vector){
        if(critter && critter.act && acted.indexOf(critter) == -1) {
            acted.push(critter);
            this.letAct(critter,vector);
        }
    },this);
}

World.prototype.letAct = function(critter,vector) {
    var action = critter.act(new View(this,vector));
    if(action && action.type === "move") {
        var dest = this.checkDestination(action,vector);
        if(dest && this.grid.get(dest) == null) {
            this.grid.set(vector,null);
            this.grid.set(dest,critter);
        }
    }
}

/**
 * 
 * @param {Object} critter 
 * @param {Vector} vector 
 */
World.prototype.checkDestination = function(action,vector) {
    if(directions.hasOwnProperty(action.direction)) {
        var dest = vector.plus(directions[action.direction]);
        if(this.grid.isInside(dest))
            return dest;
    }
}

/**
 * 
 * @param {World} world 
 * @param {Vector} vector 
 */
function View(world,vector) {
    this.world = world;
    this.vector = vector;
}

View.prototype.look = function(dir) {
    var target = this.vector.plus(directions[dir]);
    if(this.world.grid.isInside(target)) {
        return charFromElement(this.world.grid.get(target));
    } else {
        return "#";
    }
};

View.prototype.findAll = function(ch) {
    var found = [];
    for(var dir in directions) {
        if(this.look(dir) == ch)
            found.push(dir);
    }
    return found;
};

View.prototype.find = function(ch) {
    var found = this.findAll(ch);
    if(found.length === 0) return null;
    return randomElement(found);
};

var world = new World(plan,{"#" : Wall,"o" : BouncingCritter});
//console.log(world.toString());

for(var i = 0; i < 5; i++) {
    world.turn();
    console.log(world.toString());
}