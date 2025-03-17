import React from 'react';
import { ButtonProps } from '../../../utils/types';

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  currentPlayer, 
  disabled,
  colIndex
}) => {
  const hoverClass: string = disabled 
    ? 'cursor-not-allowed opacity-50' 
    : `hover:bg-opacity-70 ${currentPlayer === 'red' ? 'hover:bg-red-500' : 'hover:bg-yellow-400'}`;
  
  return (
    
    <button
      className={`w-13 h-8 bg-black rounded-t-lg font-bold text-lg flex text-white items-center justify-center ${hoverClass}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Drop token in column ${colIndex + 1}`}
    >
      ↓
    </button>
  );
};

export default Button;