import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';
import renderWithClient from '../../../test-utils';

describe('App Component', () => {
  it('renders Vite + React heading', () => {
    const mockActivities = [
      { activityId: '1', title: 'Mock 1', description: '', category: '', city: '', venue: '', date: new Date().toISOString() },
    ];

    renderWithClient(<App />, { initialQueries: [{ queryKey: ['activities'], data: mockActivities }] });
    const headingElement = screen.getByText(/Reactivities/i);
    expect(headingElement).toBeInTheDocument();
  });
});

