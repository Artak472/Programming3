class GrassEater extends parent{

    chooseCell(character1,character2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 ||matrix[y][x] == character2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var empty = this.chooseCell(0);
        var cell = random(empty);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy--
            if (this.energy == 0) {
                this.die()
            }
        }
    }
    eat() {

        var empty = this.chooseCell(1);
        var cell = random(empty);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            this.energy++
            if (this.energy == 3 && ex == "amar") {
                this.mul();
            }
            else if(this.energy == 8 && ex == "dzmer"){
                this.mul();
            }

        } else {
            this.move();
        }
    }
    mul() {
       var emptyCells = this.chooseCell(0,1);
        var newCell = random(emptyCells);

        //console.log(emptyCells);
        if (newCell && this.energy >= 3) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            var newGrass = new GrassEater(newX, newY, this.index);
            grassEaterArr.push(newGrass);
            this.energy = 0;
        }
    }
    die(){
        for (var i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x]=0;
    }
}

