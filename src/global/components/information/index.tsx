import React, { JSX } from 'react';
import { InformationProps, Player } from '../../../utils/types'

const Information: React.FC<InformationProps> = ({
  currentPlayer,
  winner,
  gameOver,
  onReset,
}) => {
  const playerColor = (player: Player): JSX.Element => (
    <span
      className={`inline-block w-8 h-8 rounded-full ml-1 ${
        player === 'red' ? 'bg-red-600' : 'bg-yellow-600'
      } shadow-md`}
    />
  );

  const getInformationMessage = (): JSX.Element | string => {
    if (winner) {
      return <span className="text-fuchsia-500 font-bold animate-pulse">Congratulations! Winner Is: {playerColor(winner)}</span>;
    }
    if (gameOver) {
      return <span className="text-orange-500 font-bold animate-bounce"> It's a draw!</span>;
    }
    return <span className="text-indigo-600">Current Player:{playerColor(currentPlayer)}</span>;
  };

  return (
    <div className="mb-6 flex flex-col items-center">
      <div className="text-3xl mb-4 flex items-center">{getInformationMessage()}</div>

      {gameOver && (
        <button
          data-testid="reset-play"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors animate-pulse"
          onClick={onReset}
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default Information;
