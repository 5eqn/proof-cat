import { render } from '@testing-library/react';
import Slot from './Slot';

describe('Slot component', () => {
  test('slot does not lose children', () => {
    const { container } = render(
      <Slot level={0}>
        <div className='114'>Child 1</div>
        <div className='514'>Child 2</div>
      </Slot>
    );
    expect(container.getElementsByClassName('114')).toHaveLength(1)
    expect(container.getElementsByClassName('514')).toHaveLength(1)
  });

  test('tagged slot does not lose children', () => {
    const { container } = render(
      <Slot level={8} tagged>
        <div className='114'>Child 1</div>
        <div className='514'>Child 2</div>
      </Slot>
    );
    expect(container.getElementsByClassName('114')).toHaveLength(1)
    expect(container.getElementsByClassName('514')).toHaveLength(1)
  });
});
