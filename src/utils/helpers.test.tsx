import { checkWinner } from './helpers'
import { Board, Player, WinResult } from './types';

describe('checkWinner helpers function', () => {
  it('if the board is empty, there is no winner to return', () => {
    const board: Board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ];
    const player: Player = 'red';
    const result: WinResult = checkWinner(board, player);
    expect(result.hasWon).toBe(false);
    expect(result.winningCells).toBe(null);
  });

  it('detects a horizontal win', () => {
    const board: Board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ['red', 'red', 'red', 'red', null, null, null],
    ];
    const player: Player = 'red';
    const result: WinResult = checkWinner(board, player);
    expect(result.hasWon).toBe(true);
    expect(result.winningCells).toEqual([[5, 0], [5, 1], [5, 2], [5, 3]]);
  });

  it('detects a vertical win', () => {
    const board: Board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
    ];
    const player: Player = 'red';
    const result: WinResult = checkWinner(board, player);
    expect(result.hasWon).toBe(true);
    expect(result.winningCells).toEqual([[4, 0], [5, 0], [6, 0], [7, 0]]);
  });

  it('detects a diagonal win (top-left to bottom-right)', () => {
    const board: Board = [
      ['red', null, null, null, null, null, null],
      [null, 'red', null, null, null, null, null],
      [null, null, 'red', null, null, null, null],
      [null, null, null, 'red', null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ];
    const player: Player = 'red';
    const result: WinResult = checkWinner(board, player);
    expect(result.hasWon).toBe(true);
    expect(result.winningCells).toEqual([[0, 0], [1, 1], [2, 2], [3, 3]]);
  });

  it('detects a diagonal win (bottom-left to top-right)', () => {
    const board: Board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ['red', null, null, null, null, null, null],
    ];
    const player: Player = 'red';
    const result: WinResult = checkWinner(board, player);
    expect(result.hasWon).toBe(false);
  });

  it('if there are not enough cells in a row, a win is not detected', () => {
    const board: Board = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ['red', 'red', 'red', null, null, null, null],
    ];
    const player: Player = 'red';
    const result: WinResult = checkWinner(board, player);
    expect(result.hasWon).toBe(false);
    expect(result.winningCells).toBe(null);
  });
});
