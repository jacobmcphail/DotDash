/**
 * Created by Jacob (A00840445) on 5/9/2016.
 * JavaScript class for generating random swiping paths for the user to repeat/solve.
 **/

//Point constructor
function Point(x, y) {
    this.x = x;
    this.y = y;
}

//Node constructor
function Node(x, y) {
    this.visited = false;
    this.pos = new Point(x, y);
}

//Grid constructor
function Grid(rows, cols) {
    this.grid = [];
    for (var i = 0; i < rows; i++) {
        this.grid.push([]);
        for (var j = 0; j < cols; j++) {
            this.grid[i].push(new Node(i, j));
        }
    }
}

//Visits a node
function visit(node){
    node.visited = true;
}

//Unvisits a node
function unvisit(node){
    node.visited = false;
}

//Gets the number of unvisited neighbours
function getNumberOfUnvisited(neighbours){
    var unvisited = 0;
    for (var i = 0; i < neighbours.length; i++) {
        if (!neighbours[i].visited) {
            unvisited++;
        }
    }
    return unvisited;
}

//Gets all neighbour node points and returns a array
function getNeighbours(node, gamegrid){
    var neighbours = [];
    for (var i = node.pos.x - 1; i <= node.pos.x+1; i++) {
        if(i < 0 || i > gamegrid.grid.length-1) {
            continue;
        }
        for (var j = node.pos.y-1; j <= node.pos.y+1; j++) {
            if(j < 0 || j > gamegrid.grid[0].length-1) {
                continue;
            }
            if(i == node.pos.x && j == node.pos.y){
                continue;
            }
            neighbours.push(gamegrid.grid[i][j]);
        }
    }
    return neighbours;
}

//Prints the points in a array
function printPath(pathArray){
    for(var i = 0; i < pathArray.length; i++) {
        console.log(pathArray[i].pos.x + " " + pathArray[i].pos.y);
    }
}

//Creates a random tapping path
function generateSequence(gamegrid, length) {
    var path = [];
    var pathsize = 0;
    path.push(gamegrid.grid[(Math.floor((Math.random() * gamegrid.grid.length)))][(Math.floor((Math.random() * gamegrid.grid[0].length)))]);
    visit(path[pathsize]);
    pathsize++;
    while(pathsize < length && pathsize < (gamegrid.grid.length * gamegrid.grid[0].length)) {
        var node = gamegrid.grid[(Math.floor((Math.random() * gamegrid.grid.length)))][(Math.floor((Math.random() * gamegrid.grid[0].length)))];
        if (!node.visited) {
            visit(node);
            path.push(node);
            pathsize++;
        }
    }
    return path;
}

//Creates a random swiping path
function generatePath(gamegrid, length) {
    var path = [];
    var pathsize = 0;
    path.push(gamegrid.grid[(Math.floor((Math.random() * gamegrid.grid.length)))][(Math.floor((Math.random() * gamegrid.grid[0].length)))]);
    visit(path[pathsize]);
    pathsize++;
    while(pathsize < length) {
        var neighbours = getNeighbours(path[pathsize-1], gamegrid);
        var unvisited = getNumberOfUnvisited(neighbours);
        if (unvisited <= 0) {
            break;
        }
        var avaOne = [];
        var avaTwo = [];
        var avaThree = [];
        var lowestNode = null;
        for(var i = 0; i < neighbours.length; i++) {
            if (neighbours[i].visited) {
                continue;
            }
            var avaUnvisited = getNumberOfUnvisited(getNeighbours(neighbours[i], gamegrid));
            if (avaUnvisited <= 1) {
                avaOne.push(neighbours[i]);
            } else if (avaUnvisited <= 2) {
                avaTwo.push(neighbours[i]);
            } else {
                if (lowestNode == null) {
                    lowestNode = neighbours[i];
                    avaThree.push(lowestNode);
                } else if (avaUnvisited == getNumberOfUnvisited(getNeighbours(lowestNode, gamegrid)) || getNeighbours(neighbours[i], gamegrid).length > 7) {
                    avaThree.push(neighbours[i]);
                } else if (avaUnvisited < getNumberOfUnvisited(getNeighbours(lowestNode, gamegrid))) {
                    avaThree = [];
                    lowestNode = neighbours[i];
                    avaThree.push(lowestNode);
                }
            }
        }
        var ranNum;
        if (avaOne.length > 0) {
            ranNum = (Math.floor((Math.random() * avaOne.length)));
            path.push(avaOne[ranNum]);
        } else if (avaTwo.length > 0) {
            ranNum = (Math.floor((Math.random() * avaTwo.length)));
            path.push(avaTwo[ranNum]);
        } else {
            ranNum = (Math.floor((Math.random() * avaThree.length)));
            path.push(avaThree[ranNum]);
        }
        visit(path[pathsize]);
        pathsize++;
    }
    return path;
}

//Resets grid
function reset(gamegrid){
    for(var x = 0; x < gamegrid.grid.length; x++) {
        for(var y= 0; y < gamegrid.grid[x].length; y++) {
            unvisit(gamegrid.grid[x][y]);
        }
    }
}

//Runs path generator
function runPathFinder(gamegrid, length, mode) {
    var array;
    while(true) {
        if (mode == 0) {
            array = generateSequence(gamegrid, length);
        } else {
            array = generatePath(gamegrid, length);
        }
        if (array.length == length) {
            break;
        }
        reset(gamegrid);
    }
   return array;
}

//FOR TESTING
function testPathing(x, y, length, mode){
    var gamegrid = new Grid(x, y);
    var array = runPathFinder(gamegrid, length, mode);
    console.log(array.length);
    printPath(array);
}