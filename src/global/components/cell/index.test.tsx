import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Cell from '.';

describe('<Cell/>', () => {
  it('renders as expected cell component', () => {
    const { getByTestId } = render(<Cell value="red" isWinning={false} />);
    expect(getByTestId('cell-container')).toHaveClass('bg-black');
  });

  it('when winning, the background color is yellow.', () => {
    const { getByTestId } = render(<Cell value="red" isWinning={true} />);
    expect(getByTestId('cell-container')).toHaveClass('bg-yellow-200');
  });

  it('When the value is red, the color is rendered in red.', () => {
    const { getByTestId } = render(<Cell value="red" isWinning={false} />);
    expect(getByTestId('cell-content')).toHaveClass('bg-red-500');
  });

  it('when the value is yellow, the color is rendered in yellow.', () => {
    const { getByTestId } = render(<Cell value="yellow" isWinning={false} />);
    expect(getByTestId('cell-content')).toHaveClass('bg-yellow-400');
  });

  it('when the value is yellow and the cell is winning, it is rendered.', () => {
    const { getByTestId } = render(<Cell value="yellow" isWinning={true} />);
    expect(getByTestId('cell-content')).toHaveClass('bg-yellow-400');
    expect(getByTestId('cell-container')).toHaveClass('bg-yellow-200');
    expect(getByTestId('winning-cell')).toBeInTheDocument();
  });

  it('does not render winning cells when the value is red and the cell is winning.', () => {
    const { queryByTestId } = render(<Cell value="red" isWinning={true} />);
    expect(queryByTestId('winning-cell-yellow')).not.toBeInTheDocument();
  });
});
