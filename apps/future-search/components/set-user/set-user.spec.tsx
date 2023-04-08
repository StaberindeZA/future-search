import { render } from '@testing-library/react';

import SetUser from './set-user';

describe('SetUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SetUser />);
    expect(baseElement).toBeTruthy();
  });
});
