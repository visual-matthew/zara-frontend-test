import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';
import { describe, expect, test } from 'vitest';

describe('NotFoundPage', () => {
  test('renders correctly', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
});
