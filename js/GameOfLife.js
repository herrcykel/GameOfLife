var GameOfLife = (function (undefined) {

    var CELL_MARGIN = 1;
    var CELL_SIZE = 8;

    var BACKGROUND_COLOR = "#FFFFFF";
    var CELL_COLOR = "#000000";
    var GRID_COLOR = "#CCCCCC";

    function GameOfLife(canvas, gridSize, delay) {

        delay = delay || 500;

        var interval = null;

        var self = this;
        var cells = [];
        var ctx = canvas.getContext("2d");


        var init = function() {
            canvas.width = canvas.height = CELL_SIZE * gridSize + CELL_MARGIN * (gridSize - 1);
        };

        var update = function() {

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
            return pos.row >= 0 && pos.col >= 0 && pos.row < canvas.height && pos.col < canvas.width;
        };

        this.isRunning = function() {
            return interval !== null;
        }

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
            for(var i = 0; i < gridSize;i++) {
                var row = [];
                for(var j = 0; j < gridSize;j++) {
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

        this.getNeighborPositions = function() {
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

    }

    return GameOfLife;

}());
