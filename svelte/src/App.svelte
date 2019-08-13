<script>
  import { onMount, tick } from "svelte";
  import Cell from "./cell";

  function make2DArray(rows, cols) {
    const arr = Array(rows);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Array(cols);
    }
    return arr;
  }

  let grid = make2DArray(10, 10);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = new Cell(i, j, grid);
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].neighbors();
    }
  }

  window.grid = grid;

  $: computedGrid = grid;
  $: winner = grid.flat().filter(i => !i.revealed && !i.bee).length === 0;
  $: if (winner) {
  }
</script>

<style>
  table {
    border-spacing: 0;
  }

  td {
    height: 60px;
    text-align: center;
    width: 60px;
  }
</style>

<table>
  {#each computedGrid as rows, index}
    <tr>
      {#each rows as cell}
        <td
          style="background-color: {cell.revealed ? 'white' : '#eee'};border-style:{cell.revealed ? 'inset' : 'outset'}"
          on:click={() => {
            cell.reveal();
            grid = [...grid];
          }}>
          {#if cell.show() == 0}
            {''}
          {:else if cell.show() == 'bee'}
            {@html '&#9673;'}
          {:else}{cell.show()}{/if}
        </td>
      {/each}
    </tr>
  {/each}
</table>
