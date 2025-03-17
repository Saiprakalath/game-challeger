
import { render, fireEvent } from '@testing-library/react';
import Button from '.';
import '@testing-library/jest-dom';

describe('<Button/>', () => {
  const defaultProps = {
    onClick: jest.fn(),
    currentPlayer: 'red',
    disabled: false,
    colIndex: 0,
  };

  it('renders as expected', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    expect(getByText('↓')).toBeInTheDocument();
  });
  
  it('when clicked, onClick is invoked', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    const button = getByText('↓');
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('when the disabled prop is true, it is disabled.', () => {
    const props = { ...defaultProps, disabled: true };
    const { getByText } = render(<Button {...props} />);
    const button = getByText('↓');
    expect(button).toBeDisabled();
  });

  it('has correct aria-label', () => {
    const { getByLabelText } = render(<Button {...defaultProps} />);
    expect(getByLabelText(`Drop token in column ${defaultProps.colIndex + 1}`)).toBeInTheDocument();
  });

  it('when enabled, renders with the correct hover class.', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    const button = getByText('↓');
    expect(button).toHaveClass('hover:bg-red-500');
  });

  it('when disabled, the hover class is displayed correctly.', () => {
    const props = { ...defaultProps, disabled: true };
    const { getByText } = render(<Button {...props} />);
    const button = getByText('↓');
    expect(button).toHaveClass('cursor-not-allowed opacity-50');
  });

  it('the yellow player is rendered with the correct hover class.', () => {
    const props = { ...defaultProps, currentPlayer: 'yellow' };
    const { getByText } = render(<Button {...props} />);
    const button = getByText('↓');
    expect(button).toHaveClass('hover:bg-yellow-400');
  });

  it('the red player is rendered with the correct hover class.r', () => {
    const props = { ...defaultProps, currentPlayer: 'red' };
    const { getByText } = render(<Button {...props} />);
    const button = getByText('↓');
    expect(button).toHaveClass('hover:bg-red-500');
  });
});
