import React, { useState, useCallback, useMemo } from 'react';
import GameBoard from './global/components/board';
import Information from './global/components/information';
import { checkWinner } from './utils/helpers';
import { Board, Player, WinningCells } from './utils/types';

const App: React.FC = () => {
  const initialBoard: Board = useMemo(() => 
    Array(6).fill(null).map(() => Array(7).fill(null)), 
  []);
  
  const [board, setBoard] = useState<Board>(initialBoard);
  const [currentPlayerColor, setCurrentPlayerColor] = useState<Player>('red');
  const [winner, setWinner] = useState<Player | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winningCells, setWinningCells] = useState<WinningCells>(null);
  
  const HandleReset = useCallback((): void => {
    setBoard(Array(6).fill(null).map(() => Array(7).fill(null)));
    setCurrentPlayerColor('red');
    setWinner(null);
    setGameOver(false);
    setWinningCells(null);
  }, []);
  
  const handleColumnClick = useCallback((columnIndex: number): void => {
    if (gameOver) return;
    
    const newBoard: Board = JSON.parse(JSON.stringify(board));
    let rowPlaced: number = -1;
    
    for (let rowIndex: number = 5; rowIndex >= 0; rowIndex--) {
      if (newBoard[rowIndex][columnIndex] === null) {
        newBoard[rowIndex][columnIndex] = currentPlayerColor;
        rowPlaced = rowIndex;
        break;
      }
    }
    
    if (rowPlaced === -1) return;
    
    const winResult = checkWinner(newBoard, currentPlayerColor);
    
    if (winResult.hasWon) {
      setBoard(newBoard);
      setWinner(currentPlayerColor);
      setGameOver(true);
      setWinningCells(winResult.winningCells);
      return;
    }
    
    const isDraw: boolean = newBoard.every(row => row.every(cell => cell !== null));
    
    if (isDraw) {
      setBoard(newBoard);
      setGameOver(true);
      return;
    }
    
    setBoard(newBoard);
    setCurrentPlayerColor(currentPlayerColor === 'red' ? 'yellow' : 'red');
  }, [board, currentPlayerColor, gameOver]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-5xl font-bold mb-8 text-black">Challeger App</h1>
      
      <Information 
        currentPlayer={currentPlayerColor} 
        winner={winner} 
        gameOver={gameOver} 
        onReset={HandleReset} 
      />
      
      <GameBoard 
        board={board} 
        onColumnClick={handleColumnClick} 
        currentPlayer={currentPlayerColor} 
        gameOver={gameOver}
        winningCells={winningCells}
      />
    </div>
  );
};

export default App;