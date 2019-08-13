class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.neighborCount = 0;

    this.revealed = false;
    this.bee = Math.random() * 2 > 1.8;
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
        if (this.row + i > grid.length - 1) continue;
        if (this.col + j > grid.length - 1) continue;
        if (grid[this.row + i][this.col + j].bee) {
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
        if (this.row + i > grid.length - 1) continue;
        if (this.col + j > grid.length - 1) continue;
        let neighbor = grid[this.row + i][this.col + j]
        if (!neighbor.bee && !neighbor.revealed) {
          neighbor.reveal();
        }
      }
    }
  }

  gameOver() {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j].revealed = true;
      }

    }
  }

  show() {
    if (this.revealed) {
      if (this.bee) {
        return "&#9673;"
      } else {
        return this.neighborCount;
      }
    } else {
      return ""
    }
  }
}