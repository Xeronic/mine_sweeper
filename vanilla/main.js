let width = 40;
let grid = make2DArray(10, 10);

function make2DArray(rows, cols) {
  const arr = Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Array(cols);
  }
  return arr;
}

function setup() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = new Cell(i, j, width);
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].neighbors();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();
      }
    }
  }
}

function drawBoard() {
  let table = document.createElement("table");

  for (let i = 0; i < grid.length; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < grid[i].length; j++) {
      let td = document.createElement("td");
      td.addEventListener("click", () => {
        grid[i][j].reveal();
        draw();
      })

      let data = grid[i][j].show();
      if (data === 0) {
        td.style.backgroundColor = "#ddd";
        td.innerHTML = "";
      } else {
        td.innerHTML = data;
      }
      row.append(td);
    }
    table.append(row);
  }
  return table;
}

function draw() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.append(drawBoard());
}
window.grid = grid;
setup();
draw();