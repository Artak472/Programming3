module.exports = class Gishatich extends parent{
    constructor(x, y, index) {
        super(x, y, index,);
        this.anun = 0;
    }

    chooseCell(character1,character2,character3) {
        this.getNewCoordinates();
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
        var empty = this.chooseCell(0,1);
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

        var empty = this.chooseCell(2,5);
        var newCell = random(empty);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            this.energy++
            if (this.energy == 3) {
                this.mul();
            }

        } else {
            this.move();
        }
    }


    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0,1,2);
        var newCell = random(emptyCells);

        //console.log(emptyCells);
        if (newCell && this.energy >= 2) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            var newGrass = new Gishatich(newX, newY, this.index);
            gishatichArr.push(newGrass);
            this.energy = 0;
        }
    }


    die(){
        for (var i in gishatichArr) {
                if (this.x == gishatichArr[i].x && this.y == gishatichArr[i].y) {
                    gishatichArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x]=0;
    }
}

