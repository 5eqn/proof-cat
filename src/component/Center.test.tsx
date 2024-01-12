import { render } from '@testing-library/react';
import Center from './Center';

describe('Center component', () => {
  test('center does not lose children', () => {
    const { container } = render(
      <Center>
        <div className='114'>Child 1</div>
        <div className='514'>Child 2</div>
      </Center>
    );
    expect(container.getElementsByClassName('114')).toHaveLength(1)
    expect(container.getElementsByClassName('514')).toHaveLength(1)
  });
});
