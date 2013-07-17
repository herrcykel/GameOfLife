var GameOfLife = (function (undefined) {


    var CELL_MARGIN = 3;
    var CELL_SIZE = 6;

    var BACKGROUND_COLOR = "#FFFFFF";
    var CELL_COLOR = "#000000";
    var GRID_COLOR = "#AAAAAA";

    function GameOfLife(canvas, gridSize, delay) {

        delay = delay || 500;

        var interval;

        var self = this;
        var cells = [];
        var isRunning = false;
        var ctx = canvas.getContext("2d");


        var init = function() {
            canvas.width = canvas.height = gridSize * CELL_SIZE + (gridSize + 1) * CELL_MARGIN;
        };

        var update = function() {

        };

        var draw = function() {

        };

        var isOutOfBounds = function(pos) {
            return pos.row >= 0 && pos.col >= 0 && pos.row < canvas.height && pos.col < canvas.width;
        };

        this.start = function() {
            interval = setInterval(function() {
                update();
                draw();
            }, delay);
        };

        this.stop = function() {
            if(interval !== null) {
                clearInterval(interval);
                interval = null;
            }
        };

        this.randomize = function() {

        };

        init();
    }

    return GameOfLife;

}());