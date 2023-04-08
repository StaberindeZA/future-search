import { render } from '@testing-library/react';

import AddSearch from './add-search';

describe('AddSearch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddSearch />);
    expect(baseElement).toBeTruthy();
  });
});
