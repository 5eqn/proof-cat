import { render } from '@testing-library/react';
import Slot from './Slot';

describe('Center component', () => {
  test('renders non-primary slot properly', () => {
    const { container } = render(
      <Slot>
        <div>Child 1</div>
        <div>Child 2</div>
      </Slot>
    );
    expect(container.firstElementChild).toHaveStyle({
      height: "32px",
      backgroundColor: "#e3e3e3",
      padding: "8px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "stretch",
    });
    expect(container.firstElementChild?.children.length).toBe(2);
    expect(container.firstElementChild?.children[0]).toHaveTextContent('Child 1');
    expect(container.firstElementChild?.children[1]).toHaveTextContent('Child 2');
  });

  test('renders primary slot properly', () => {
    const { container } = render(
      <Slot primary>
        <div>Child 1</div>
        <div>Child 2</div>
      </Slot>
    );
    expect(container.firstElementChild).toHaveStyle({
      height: "32px",
      backgroundColor: "#e8e8e8",
      padding: "8px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "stretch",
    });
    expect(container.firstElementChild?.children.length).toBe(2);
    expect(container.firstElementChild?.children[0]).toHaveTextContent('Child 1');
    expect(container.firstElementChild?.children[1]).toHaveTextContent('Child 2');
  });
});
