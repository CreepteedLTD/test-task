$(document).ready(function () {

    // Initialise

    var mines = 20;
    var width = 10;
    var height = 10;
    var randomizer;
    var rowChecker = 0;
    var slotCount = 0;
    var minedPoles = new Array();
    var flag = new Array();

    // create grid
    function createMatrix(rows, columns) {
        var grid = new Array();
        flag = new Array();
        for (var i = 0; i < columns; i++) {
            grid[i] = new Array();
            flag[i] = new Array();
            for (var j = 0; j < rows; j++) {
                flag[i][j] = 0;
                randomizer = Math.random() * 10;
                if (randomizer < 3.5 && mines != 0 && rowChecker <= 2) {
                    grid[i][j] = true
                    rowChecker += 1;
                    mines -= 1;
                }
                else {
                    grid[i][j] = false
                }
            }
            rowChecker = 0;
        }
        return grid;
    }
    var minerGrid = createMatrix(width, height);


    // append mines
    for (var i = 0; i < minerGrid.length; i++) {
        for (var j = 0; j < minerGrid[i].length; j++) {
            if (minerGrid[i][j]) {
                minedPoles.push(i.toString() + j.toString());
            }
            $('#app').append('<div class="slot" id="' + i + j + '"></div>')

        }
    }


    // generatePoints
    var pointGrid = (createMatrix(width, height))

    for (var i = 0; i < minerGrid.length; i++) {
        for (var j = 0; j < minerGrid[i].length; j++) {
            if (i > 0) {
                if (typeof(minerGrid[i - 1][j - 1]) != 'undefined' &&
                    minerGrid[i - 1][j - 1]) {
                    slotCount++
                }
                if (typeof minerGrid[i - 1][j] != 'undefined' &&
                    minerGrid[i - 1][j]) {
                    slotCount++
                }
                if (typeof minerGrid[i - 1][j + 1] != 'undefined' &&
                    minerGrid[i - 1][j + 1]) {
                    slotCount++
                }
            }
            if (j > 0) {
                if (typeof minerGrid[i + 1] != 'undefined' &&
                    typeof minerGrid[i + 1][j - 1] != 'undefined' &&
                    minerGrid[i + 1][j - 1]) {
                    slotCount++
                }
                if (typeof minerGrid[i][j - 1] != 'undefined' &&
                    minerGrid[i][j - 1]) {
                    slotCount++
                }
            }
            if (typeof minerGrid[i] != 'undefined' &&
                typeof minerGrid[i][j + 1] != 'undefined' &&
                minerGrid[i][j + 1]) {
                slotCount++
            }
            if (typeof minerGrid[i + 1] != 'undefined' &&
                typeof minerGrid[i + 1][j + 1] != 'undefined' &&
                minerGrid[i + 1][j + 1]) {
                slotCount++
            }
            if (typeof minerGrid[i + 1] != 'undefined' &&
                typeof minerGrid[i + 1][j] != 'undefined' &&
                minerGrid[i + 1][j]) {
                slotCount++
            }

            pointGrid[i][j] = slotCount;
            slotCount = 0;
        }
    }


    // insert points
    for (var i = 0; i < minerGrid.length; i++) {
        for (var j = 0; j < minerGrid[i].length; j++) {
            if (!minerGrid[i][j] && pointGrid[i][j] != 0) {
                document.getElementById(i.toString() + j.toString()).innerHTML = pointGrid[i][j].toString()
            } else {
                document.getElementById(i.toString() + j.toString()).innerHTML = " . "
            }
        }
    }

    // expand nearby
    function expand(x, y) {
        x = parseInt(x);
        y = parseInt(y);
        var xMin = (x - 1 >= 0) ? x - 1 : x;
        var xMax = (x + 1 < this.x) ? x + 1 : x;
        var yMin = (y - 1 >= 0) ? y - 1 : y;
        var yMax = (y + 1 < this.y) ? y + 1 : y;
        d = $('#'+x+y);
        if(!minerGrid[x][y]) {
            d.addClass('opened');
        }
        flag[x][y] = 1;
        if (pointGrid[x][y] > 0) {
            d.text(pointGrid[x][y]);
            return;
        }
        for (var i = xMin; i <= xMax; i++) {
            for (var j = yMin; j <= yMax; j++) {
                if (flag[i][j] == 0 &&  pointGrid[i][j] == 0) {
                    expand(i, j);
                }
            }
        }
    }

    // click event
    $('.slot').on('click', function () {
        var coord = $(this).attr('id')
        var x = parseInt(coord[0]);
        var y = parseInt(coord[1]);
        if (minerGrid[x][y]) {
            $(this).addClass('mined')
            $('.boom').fadeIn(500)
        }
        else {
            $(this).addClass('opened')
        }
        expand(x, y)
    });

});
