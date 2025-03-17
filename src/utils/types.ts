
export type Player = 'red' | 'yellow';
export type Cell = Player | null;
export type Board = Cell[][];
export type WinningCells = [number, number][] | null;

export interface WinResult {
    hasWon: boolean;
    winningCells: [number, number][] | null;
  }

  export interface InformationProps {
    currentPlayer: Player;
    winner: Player | null;
    gameOver: boolean;
    onReset: () => void;
  }

  export interface BoardProps {
    board: Board;
    onColumnClick: (columnIndex: number) => void;
    currentPlayer: Player;
    gameOver: boolean;
    winningCells: WinningCells ;
  }
  
  export interface CellProps {
    value: Cell;
    isWinning: boolean;
  }

  export interface ButtonProps {
    onClick: () => void;
    currentPlayer: string;
    disabled: boolean;
    colIndex: number;
  }