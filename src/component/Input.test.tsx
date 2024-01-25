import { render, fireEvent } from '@testing-library/react';
import Input from './Input';

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

