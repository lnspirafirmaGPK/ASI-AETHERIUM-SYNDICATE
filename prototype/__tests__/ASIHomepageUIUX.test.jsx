import { render, screen } from '@testing-library/react';
import ASIHomepageUIUX from '../ASIHomepageUIUX';
import { BRAND_NAME } from '../constants/brand';

describe('ASIHomepageUIUX', () => {
  it('renders the primary overview sections', () => {
    render(<ASIHomepageUIUX />);

    expect(screen.getByText(BRAND_NAME)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Quick Actions' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'ASI Enterprise Architecture' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'AI Departments' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Pending & Recent Decisions' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Lineage & Audit' })).toBeInTheDocument();
  });
});
