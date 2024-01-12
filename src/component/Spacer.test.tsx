import { render } from '@testing-library/react';
import Spacer from './Spacer';

describe('Center component', () => {
  test('renders spacer properly', () => {
    const { container } = render(
      <Spacer />
    );
    expect(container.firstElementChild).toHaveStyle({
      marginLeft: 'auto',
    });
  });
});
