import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Information from '../information/index';

describe('<Information/>', () => {
  const onReset = jest.fn();
  const currentPlayer = 'red';
  const winner = null;
  const gameOver = false;

  it('displays current player information when there is no winner and the game is not over.', () => {
    const { getByText } = render(
      <Information 
        currentPlayer={currentPlayer} 
        winner={winner} 
        gameOver={gameOver} 
        onReset={onReset}
      />
    );
    expect(getByText('Current Player:')).toBeInTheDocument();
  });

  it('renders winner information when there is a winner', () => {
    const winner = 'red';
    const { getByText } = render(
      <Information 
        currentPlayer={currentPlayer} 
        winner={winner} 
        gameOver={true} 
        onReset={onReset}
      />
    );
    expect(getByText('Congratulations! Winner Is:')).toBeInTheDocument();
  });

  it('renders draw message when game is over but no winner', () => {
    const { getByText } = render(
      <Information 
        currentPlayer={currentPlayer} 
        winner={null} 
        gameOver={true} 
        onReset={onReset}
      />
    );
    expect(getByText("It's a draw!")).toBeInTheDocument();
  });

  it('renders play again button when game is over', () => {
    const { getByText } = render(
      <Information 
        currentPlayer={currentPlayer} 
        winner={null} 
        gameOver={true} 
        onReset={onReset}
      />
    );
    expect(getByText('Play Again')).toBeInTheDocument();
  });

  it('when the play again button is clicked, calls are reset.', () => {
    const { getByText } = render(
      <Information 
        currentPlayer={currentPlayer} 
        winner={null} 
        gameOver={true} 
        onReset={onReset}
      />
    );
    const button = getByText('Play Again');
    fireEvent.click(button);
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('when the game is not over, the play again button is not displayed.', () => {
    const { queryByText } = render(
      <Information 
        currentPlayer={currentPlayer} 
        winner={null} 
        gameOver={false} 
        onReset={onReset}
      />
    );
    expect(queryByText('Play Again')).not.toBeInTheDocument();
  });
});
