module.exports = class People extends parent{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 5;
        this.anun = 0;
    }


    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x    , this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x - 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y    ],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x    , this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y    ],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y - 2],
            [this.x + 1, this.y - 2]
        ];
    }

    getNewCoordinates1() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(character1,character2,character3,character4) {
        if(ex == "amar"){
            this.getNewCoordinates();
        }
        else if(ex == "dzmer"){
            this.getNewCoordinates1();
        }
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 ||matrix[y][x] == character2 || matrix[y][x] == character3) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    move() {
        var empty = this.chooseCell(0,1,5);
        var cell = random(empty);

        if (cell) {
             var newX = cell[0];
            var newY = cell[1];
            matrix[this.y][this.x]=this.anun;
            if(matrix[newY][newX]==1){
          		this.anun=1;
            }
              if(matrix[newY][newX]==2){
          		this.anun=2;
            }
           
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
        this.energy--
        if (this.energy == 0) {
            this.die()
        }
    }


    eat() {

        var empty = this.chooseCell(3);
        var newCell = random(empty);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            for (var i in gishatichArr) {
                if (newX == gishatichArr[i].x && newY == gishatichArr[i].y) {
                    gishatichArr.splice(i, 1);
                    break;
                }
            }

            this.energy++
            if (this.energy == 5) {
                this.mul();
            }

        } else {
            this.move();
        }
    }


    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0,1,2,3);
        var newCell = random(emptyCells);

        //console.log(emptyCells);
        if (newCell && this.energy >= 5) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            var newGrass = new Gishatich(newX, newY, this.index);
            gishatichArr.push(newGrass);
            this.energy = 0;
        }
    }


    die(){
        for (var i in peopleArr) {
                if (this.x == peopleArr[i].x && this.y == peopleArr[i].y) {
                    peopleArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x]=0;
    }
}

