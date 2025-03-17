import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Board from '.'

describe('<Board/>', () => {
  const board: ('red' | 'yellow' | null)[][] = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, 'red', 'yellow', 'red', 'yellow', 'red'],
    ['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
    ['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
  ];
  const onColumnClick = jest.fn();
  const currentPlayer = 'red';
  const gameOver = false;
  const winningCells: [number, number][] = [[3, 2], [4, 2], [5, 2]];

  it('renders buttons for each column', () => {
    const { getAllByRole } = render(
      <Board
        board={board}
        onColumnClick={onColumnClick}
        currentPlayer={currentPlayer}
        gameOver={gameOver}
        winningCells={winningCells}
      />
    );
    expect(getAllByRole('button')).toHaveLength(7);
  });
  

  it('when a button is clicked, it triggers calls onColumnClick', () => {
    const { getAllByRole } = render(
      <Board
        board={board}
        onColumnClick={onColumnClick}
        currentPlayer={currentPlayer}
        gameOver={gameOver}
        winningCells={winningCells}
      />
    );
    const buttons = getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(onColumnClick).toHaveBeenCalledTimes(1);
    expect(onColumnClick).toHaveBeenCalledWith(0);
  });

  it('disables buttons when game is over', () => {
    const { getAllByRole } = render(
      <Board
        board={board}
        onColumnClick={onColumnClick}
        currentPlayer={currentPlayer}
        gameOver={true} 
        winningCells={winningCells}
      />
    );
    const buttons = getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it('disables buttons when column is full', () => {
    const fullBoard: ('red' | 'yellow' | null)[][] = [
      ['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
      ['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
      ['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
      ['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
      ['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
      ['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
    ];
    const { getAllByRole } = render(
      <Board
        board={fullBoard}
        onColumnClick={onColumnClick}
        currentPlayer={currentPlayer}
        gameOver={gameOver}
        winningCells={winningCells}
      />
    );
    const buttons = getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it('each cell on the board (6 rows x 7 columns) is rendered correctly', () => {
    const { container } = render(
      <Board
        board={board}
        onColumnClick={onColumnClick}
        currentPlayer={currentPlayer}
        gameOver={gameOver}
        winningCells={winningCells}
      />
    );
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid?.children).toHaveLength(42);
  });

  it('correctly highlight winning cells based on winningCells prop.', () => {
    const { container } = render(
      <Board
        board={board}
        onColumnClick={onColumnClick}
        currentPlayer={currentPlayer}
        gameOver={gameOver}
        winningCells={winningCells}
      />
    );
    const grid = container.querySelector('.grid');
    const cells = grid?.children;
    winningCells.forEach(([rowIndex, colIndex]) => {
      const cellIndex = rowIndex * 7 + colIndex;
      const cellElement = cells?.[cellIndex];
      expect(cellElement).toHaveClass('bg-yellow-200'); 
    });
  });
  
  it('handles null winningCells return false', () => {
    const { container } = render(
      <Board
        board={board}
        onColumnClick={onColumnClick}
        currentPlayer={currentPlayer}
        gameOver={gameOver}
        winningCells={null}
      />
    );
    const grid = container.querySelector('.grid');
    const cells = grid?.children; 
    Array.from(cells || []).forEach((cell) => {
      expect(cell).not.toHaveClass('bg-yellow-200');
    });
  });
});
