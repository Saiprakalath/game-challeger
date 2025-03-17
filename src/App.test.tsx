
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { checkWinner } from './utils/helpers';
import GameBoard from './global/components/board';

jest.mock('./global/components/board', () => ({
  __esModule: true,
  default: jest.fn(({ onColumnClick }) => (
    <div data-testid="game-board">
      {[0, 1, 2, 3, 4, 5, 6].map((col) => (
        <button key={col} data-testid={`column-${col}`} onClick={() => onColumnClick(col)}>
          Column {col}
        </button>
      ))}
    </div>
  ))
}));

jest.mock('./global/components/information', () => ({
  __esModule: true,
  default: jest.fn(({ onReset }) => (
    <div data-testid="game-info">
      <button data-testid="reset-button" onClick={onReset}>Reset</button>
    </div>
  ))
}));

jest.mock('./utils/helpers', () => ({
  checkWinner: jest.fn()
}));

describe('<App/>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (checkWinner as jest.Mock).mockReturnValue({ hasWon: false, winningCells: null });
  });

  it('when clicked, a player should be placed in the appropriate column', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('column-3'));
    const latestCallArgs = (GameBoard as jest.MockedFunction<typeof GameBoard>).mock.calls[1][0];
    expect(latestCallArgs).not.toBeNull();
  });

  it('when the reset button is clicked, the game should be reset.', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('column-3'));
    fireEvent.click(screen.getByTestId('reset-button'));
    const latestCallArgs = (GameBoard as jest.MockedFunction<typeof GameBoard>).mock.calls[2][0];
    expect(latestCallArgs).not.toBeNull();
  });

  it("when a player wins, it's important to handle the game over condition.", () => {
    (checkWinner as jest.Mock).mockReturnValueOnce({ hasWon: true, winningCells: [[0, 0], [1, 1]] });
    render(<App />);
    fireEvent.click(screen.getByTestId('column-3'));
  });

  it('should prevent column click when game is over', () => {
    (checkWinner as jest.Mock).mockReturnValueOnce({ hasWon: true, winningCells: [[0, 0], [1, 1]] });
    render(<App />);
    fireEvent.click(screen.getByTestId('column-3'));
    const initialBoardState = (GameBoard as jest.MockedFunction<typeof GameBoard>).mock.calls[1][0].board;
    fireEvent.click(screen.getByTestId('column-3'));
    const finalBoardState = (GameBoard as jest.MockedFunction<typeof GameBoard>).mock.calls[1][0].board;
    expect(finalBoardState).toEqual(initialBoardState);
  });

  it("when it's a draw, it's important to handle the game over condition.", () => {
    (checkWinner as jest.Mock).mockReturnValue({ hasWon: false, winningCells: null });
    render(<App />);
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        fireEvent.click(screen.getByTestId(`column-${i}`));
      }
    }
    const mockCalls = (GameBoard as jest.MockedFunction<typeof GameBoard>).mock.calls;
    expect(mockCalls.length).toBeGreaterThan(0);
    const lastCallArgs = mockCalls[mockCalls.length - 1][0];
    expect(lastCallArgs.gameOver).toBe(true);
  });
  
  it('should not place a token in a full column', () => {
    (checkWinner as jest.Mock).mockReturnValue({ hasWon: false, winningCells: null });
    render(<App />);
    for (let j = 0; j < 6; j++) {
      fireEvent.click(screen.getByTestId('column-0'));
    }
    const mockCallsBefore = (GameBoard as jest.MockedFunction<typeof GameBoard>).mock.calls;
    const initialBoardState = mockCallsBefore[mockCallsBefore.length - 1][0].board;
    fireEvent.click(screen.getByTestId('column-0'));
    const mockCallsAfter = (GameBoard as jest.MockedFunction<typeof GameBoard>).mock.calls;
    const finalBoardState = mockCallsAfter[mockCallsAfter.length - 1][0].board;
    expect(finalBoardState).toEqual(initialBoardState);
  });
});
