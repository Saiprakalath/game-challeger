import { Board, Player, WinResult } from "./types";
const directions = [
  [[0, 1], [0, 2], [0, 3]],
  [[1, 0], [2, 0], [3, 0]],
  [[1, 1], [2, 2], [3, 3]],
  [[-1, 1], [-2, 2], [-3, 3]],
];

export const checkWinner = (board: Board, player: Player): WinResult => {
  const rows = board.length;
  const cols = board[0].length;
  let hasWon = false;
  let winningCells: [number, number][] | null = null;

  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === player) {
        directions.forEach(direction => {
          const cells: [number, number][] = [[r, c]];
          let valid = true;

          direction.forEach(([dr, dc]) => {
            const nr = r + dr;
            const nc = c + dc;

            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || board[nr][nc] !== player) {
              valid = false;
            } else {
              cells.push([nr, nc]);
            }
          });

          if (valid && cells.length === 4) {
            hasWon = true;
            winningCells = cells;
          }
        });
      }

      if (hasWon) return;
    });

    if (hasWon) return;
  });

  return { hasWon, winningCells };
};
