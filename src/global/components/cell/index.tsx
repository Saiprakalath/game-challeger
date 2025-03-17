import React from 'react';
import { CellProps } from '../../../utils/types';

const Cell: React.FC<CellProps> = ({ value, isWinning }) => {
  const bgColor = isWinning && value ? 'bg-yellow-200' : 'bg-black';
  const colorClass: string = value === 'red' 
    ? 'bg-red-500' 
    : value === 'yellow' 
      ? 'bg-yellow-400' 
      : 'bg-white';
  
  return (
    <div data-testid="cell-container" className={`w-12 h-12 rounded-sm p-1 ${bgColor}`}>
      <div  data-testid="cell-content" className={`w-full h-full rounded-full ${colorClass} shadow-inner`}>
        {isWinning && (
          <div data-testid="winning-cell"  className="w-full h-full flex items-center justify-center">
            {value === 'yellow' && <div   data-testid="winning-cell-yellow" className="w-6 h-1 bg-yellow-600 transform rotate-45" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cell;