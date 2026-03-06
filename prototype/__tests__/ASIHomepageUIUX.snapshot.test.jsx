import { render } from '@testing-library/react';
import ASIHomepageUIUX from '../ASIHomepageUIUX';

describe('ASIHomepageUIUX snapshot', () => {
  it('matches the overview UI snapshot', () => {
    const { container } = render(<ASIHomepageUIUX />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
