class Cell {
  constructor(row, col, grid) {
    this.row = row;
    this.col = col;
    this.neighborCount = 0;

    this.revealed = false;
    this.bee = Math.random() * 2 > 1.8;
    this.grid = grid;
  }

  reveal() {
    this.revealed = true;
    if (this.neighborCount === 0) {
      this.floodFill();
    }

    if (this.bee) {
      this.gameOver();
    }
  }

  neighbors() {
    let neighbors = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (this.row + i < 0) continue;
        if (this.col + j < 0) continue;
        if (this.row + i > this.grid.length - 1) continue;
        if (this.col + j > this.grid.length - 1) continue;
        if (this.grid[this.row + i][this.col + j].bee) {
          neighbors++;
        }
      }
    }

    this.neighborCount = neighbors;
  }

  floodFill() {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (this.row + i < 0) continue;
        if (this.col + j < 0) continue;
        if (this.row + i > this.grid.length - 1) continue;
        if (this.col + j > this.grid.length - 1) continue;
        let neighbor = this.grid[this.row + i][this.col + j]
        if (!neighbor.bee && !neighbor.revealed) {
          neighbor.reveal();
        }
      }
    }
  }

  gameOver() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j].revealed = true;
      }

    }
  }

  show() {
    if (this.revealed) {
      if (this.bee) {
        return "bee"
      } else {
        return this.neighborCount;
      }
    } else {
      return ""
    }
  }
}

export default Cell;