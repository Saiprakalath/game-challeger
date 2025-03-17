import React from 'react';
import Cell from '../cell';
import Button from '../button';
import {BoardProps} from '../../../utils/types'

const Board: React.FC<BoardProps> = ({ 
  board, 
  onColumnClick, 
  currentPlayer, 
  gameOver,
  winningCells
}) => {
 
  const isWinningCellPlayer = (rowIndex: number, colIndex: number): boolean => {
    if (!winningCells) return false;
    return winningCells.some(([row, col]) => row === rowIndex && col === colIndex);
  };
  
  return (
    <div data-testid="board-box" className="flex flex-col items-center">
      <div className="flex mb-1 ">
        {Array(7).fill(null).map((_, colIndex: number) => (
          <Button 
            key={colIndex} 
            onClick={() => onColumnClick(colIndex)}
            currentPlayer={currentPlayer}
            disabled={gameOver || board[0][colIndex] !== null}
            colIndex={colIndex}
          />
        ))}
      </div>

      <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
        <div className="grid grid-cols-7 gap-1">
          {board.map((row, rowIndex: number) => (
            row.map((cell, colIndex: number) => (
              <Cell 
                key={`${rowIndex}-${colIndex}`} 
                value={cell}
                isWinning={isWinningCellPlayer(rowIndex, colIndex)}
              />
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;