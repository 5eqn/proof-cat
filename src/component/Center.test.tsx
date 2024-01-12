import { render } from '@testing-library/react';
import Center from './Center';

describe('Center component', () => {
  test('renders the children prop in the center', () => {
    const { container } = render(
      <Center>
        <div>Child 1</div>
        <div>Child 2</div>
      </Center>
    );
    expect(container.firstElementChild).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    });
    expect(container.firstElementChild?.children.length).toBe(2);
    expect(container.firstElementChild?.children[0]).toHaveTextContent('Child 1');
    expect(container.firstElementChild?.children[1]).toHaveTextContent('Child 2');
  });
});
