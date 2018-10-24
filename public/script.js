var side = 7;
var socket;
var matrix;

function setup() {
    frameRate(0);
    socket = io.connect();

    socket.on('get matrix', function (mtx) {
        noLoop();
        matrix = mtx;
        createCanvas(matrix[0].length * side, matrix.length * side);

        socket.on('redraw', function (mtx) {
            matrix = mtx;
            redraw();
            console.log("tick");
        });
    });

    window.addEventListener('click', function(){
        socket.emit('stop drawing', true);
    })

    background('#acacac');
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix.length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill('#ffff4a');
                rect(x * side, y * side, side, side);
                /*if (ex == "amar"){
                    fill('yellow');
                    rect(x * side, y * side, side, side);
                }
                else if(ex == "dzmer"){
                    
                }*/
            }
            else if (matrix[y][x] == 3) {
                fill('red');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill('purple');
                rect(x * side, y * side, side, side);
                /* if(ex == "amar"){
                     
                 }
                 else if(ex == "dzmer"){
                     fill('#c900c9');
                     rect(x * side, y * side, side, side);
                 }*/
            }
            else if (matrix[y][x] == 5) {
                fill('#0068fd');
                rect(x * side, y * side, side, side);
                /*if(ex == "amar"){
                    fill('blue');
                    rect(x * side, y * side, side, side);
                }
                else if(ex == "dzmer"){
                    
                }*/
            }
            else if (matrix[y][x] == 0) {
                fill('#fff');
                rect(x * side, y * side, side, side);
                /*if(ex == "amar"){
                    fill('#acacac');
                    rect(x * side, y * side, side, side);
                }
                else if(ex == "dzmer"){
                    
                }*/
            }
        }
    }
}