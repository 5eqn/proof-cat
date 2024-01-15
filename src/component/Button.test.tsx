import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('renders the text prop', () => {
    const { getByText } = render(<Button onClick={() => { }}> Hello </Button>);
    expect(getByText('Hello')).toBeInTheDocument();
  });

  test('calls the onClick prop when clicked', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<Button onClick={mockOnClick}> Click me </Button>);
    fireEvent.click(getByText('Click me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

