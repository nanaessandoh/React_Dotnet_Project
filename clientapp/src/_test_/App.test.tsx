import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('App Component', () => {
  it('renders Vite + React heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/Reactivities/i);
    expect(headingElement).toBeInTheDocument();
  });
});

