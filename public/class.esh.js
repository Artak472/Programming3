class Esh extends parent{

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
        var empty = this.chooseCell(0,1);
        var cell = random(empty);

        if (cell) {
            var newX = cell[0];
            var newY = cell[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 5;
            this.x = newX;
            this.y = newY;
        }
    }
}