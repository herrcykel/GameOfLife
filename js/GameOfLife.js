var GameOfLife = (function (undefined) {

    var CELL_MARGIN = 2;
    var CELL_SIZE = 7;

    var DEFAULT_DELAY = 250;

    var BACKGROUND_COLOR = "#FFFFFF";
    var CELL_COLOR = "#000000";
    var GRID_COLOR = "#FFFFFF";

    function GameOfLife(canvas, gridSize, delay) {

        delay = delay || DEFAULT_DELAY;

        var interval = null;

        var self = this;
        var cells = [];
        var ctx = canvas.getContext("2d");


        var init = function() {
            canvas.width = canvas.height = CELL_SIZE * gridSize + CELL_MARGIN * (gridSize - 1);
        };

        var update = function() {
            var nextGen = [];
            cells.forEach(function(col) {
                var newRow = [];
                col.forEach(function(cell) {
                    var newCell = new Cell(cell.getRow(), cell.getCol());
                    var aliveNeighborsCount = getAliveNeighborsCount(cell);
                    if(cell.isAlive()) {
                        if(aliveNeighborsCount < 2 || aliveNeighborsCount > 3) {
                            newCell.kill(); // Under-population or overcrowding
                        }
                    }
                    else {
                        if(aliveNeighborsCount !== 3) {
                            newCell.kill(); // Only exactly 3 neighbors can revive a dead cell.
                        }
                    }
                    newRow.push(newCell);
                });
                nextGen.push(newRow);
            });
            cells = nextGen;
        };

        var draw = function() {
            ctx.fillStyle = GRID_COLOR;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            var curX = 0, curY = 0;
            cells.forEach(function(col) {
                col.forEach(function(cell) {
                    if(cell.isAlive()) {
                        ctx.fillStyle = CELL_COLOR;
                    }
                    else {
                        ctx.fillStyle = BACKGROUND_COLOR;
                    }
                    ctx.fillRect(curX, curY, CELL_SIZE, CELL_SIZE);
                    curX += CELL_SIZE + CELL_MARGIN;
                });
                curX = 0;
                curY += CELL_SIZE + CELL_MARGIN;
            });
        };

        var isOutOfBounds = function(pos) {
            return pos.row < 0 || pos.col < 0 || pos.row >= gridSize || pos.col >= gridSize;
        };

        var getAliveNeighborsCount = function(cell) {
            var count = 0;
            cell.getNeighborsPositions().forEach(function(pos) {
                if(!isOutOfBounds(pos)) {
                    if(cells[pos.row][pos.col].isAlive()) {
                        count++;
                    }
                }
            });
            return count;
        };

        this.isRunning = function() {
            return interval !== null;
        };

        this.start = function() {
            if(interval === null) {
                update();
                draw();

                interval = setInterval(function() {
                    update();
                    draw();
                }, delay);
            }
        };

        this.stop = function() {
            if(interval !== null) {
                clearInterval(interval);
                interval = null;
            }
        };

        this.randomize = function() {
            cells = [];
            for(var i = 0; i < gridSize; i++) {
                var row = [];
                for(var j = 0; j < gridSize; j++) {
                    var cell = new Cell(i, j);
                    if(Math.random() > 0.1) { // Kill ~90%
                        cell.kill();
                    }
                    row.push(cell);
                }
                cells.push(row);
            }
        };

        init();
    }

    function Cell(row, col) {
        var alive = true;

        this.isAlive = function() {
            return alive;
        };

        this.toggleState = function() {
            alive = !alive;
        };

        this.kill = function() {
            alive = false;
        };

        this.revive = function() {
            alive = true;
        };

        this.getNeighborsPositions = function() {
            //Top first, clockwise
            return [ {row: row - 1, col: col},
                {row: row - 1, col: col + 1},
                {row: row, col: col + 1},
                {row: row + 1, col: col + 1},
                {row: row + 1, col: col},
                {row: row + 1, col: col - 1},
                {row: row, col: col - 1},
                {row: row - 1, col: col - 1} ];
        };

        this.getRow = function() {
            return row;
        };

        this.getCol = function() {
            return col;
        };

    }

    return GameOfLife;

}());
