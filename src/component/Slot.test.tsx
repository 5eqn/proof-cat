import { render } from '@testing-library/react';
import Slot from './Slot';

describe('Slot component', () => {
  test('non-primary slot does not lose children', () => {
    const { container } = render(
      <Slot>
        <div className='114'>Child 1</div>
        <div className='514'>Child 2</div>
      </Slot>
    );
    expect(container.getElementsByClassName('114')).toHaveLength(1)
    expect(container.getElementsByClassName('514')).toHaveLength(1)
  });

  test('primary slot does not lose children', () => {
    const { container } = render(
      <Slot primary>
        <div className='114'>Child 1</div>
        <div className='514'>Child 2</div>
      </Slot>
    );
    expect(container.getElementsByClassName('114')).toHaveLength(1)
    expect(container.getElementsByClassName('514')).toHaveLength(1)
  });
});
