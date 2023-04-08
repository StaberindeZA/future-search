import { render } from '@testing-library/react';

import Searches from './searches';

describe('Searches', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Searches />);
    expect(baseElement).toBeTruthy();
  });
});
