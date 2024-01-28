import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

jest.mock('react-autowidth-input', () => {
  return {
    __esModule: true,
    AutowidthInput: (props: any) => {
      // Delete extraWidth field to suppress warning
      const copied = { ...props }
      delete copied['extraWidth']

      // Mock autowidth input in test with regular input
      return <input {...copied} />
    }
  };
})

describe('Input component', () => {
  test('renders input element with given value', () => {
    // Arrange
    const value = 'Hello';
    const onChange = jest.fn();

    // Act
    const { getByTestId } = render(<Input
      value={value}
      onChange={onChange}
      data-testid="input"
    />);

    // Assert
    const inputElement = getByTestId("input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(value);
  });

  test('calls onChange handler when input value changes', () => {
    // Arrange
    const value = 'Hello';
    const onChange = jest.fn();

    // Act
    const { getByTestId } = render(<Input
      value={value}
      onChange={onChange}
      data-testid="input"
    />);
    const inputElement = getByTestId("input");
    fireEvent.change(inputElement, { target: { value: 'World' } });

    // Assert
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('World');
  });
});

