import { render } from '@testing-library/react';
import Text from './Text';

describe('Center component', () => {
  test('renders the text prop', () => {
    const { getByText } = render(<Text text="Hello" />);
    expect(getByText('Hello')).toBeInTheDocument();
  });
});
