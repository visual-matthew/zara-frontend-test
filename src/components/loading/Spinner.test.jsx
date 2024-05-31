import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Spinner from './Spinner';

describe('Spinner', () => {
  test('renders correctly', () => {
    render(<Spinner />);
    expect(screen.getByAltText('loading')).toBeInTheDocument();
  });
});
