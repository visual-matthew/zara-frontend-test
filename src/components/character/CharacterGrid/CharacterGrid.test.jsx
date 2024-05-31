import { render, screen } from '@testing-library/react';
import CharacterGrid from './CharacterGrid';
import { describe, expect, test, vi } from 'vitest';

vi.mock('../CharacterCard/Card', () => ({
  default: () => <div data-testid="card-component" />,
}));

vi.mock('react-router-dom');

describe('CharacterGrid', () => {
  test('renders correctly', () => {
    render(<CharacterGrid characters={[]} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  test('renders the correct number of Card components', () => {
    const characters = [{ id: 1, name: 'Spider-Man', thumbnail: { path: 'path', extension: 'jpg' } }];
    render(<CharacterGrid characters={characters} />);
    expect(screen.getAllByTestId('card-component')).toHaveLength(characters.length);
  });
});
