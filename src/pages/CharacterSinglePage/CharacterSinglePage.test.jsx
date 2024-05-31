import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import CharacterSinglePage from '@/pages/CharacterSinglePage/CharacterSinglePage';

import { useParams } from 'react-router-dom';
import { getCharactersById, getCharacterComicsById } from '@/services/getCharacterById';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

vi.mock('@/services/getCharacterById', () => ({
  getCharactersById: vi.fn(),
  getCharacterComicsById: vi.fn(),
}));

vi.mock('@/components/character/CharacterDetail', () => ({ default: () => <div data-testid="character-detail" /> }));

vi.mock('@/components/comic/ComicGrid', () => ({ default: () => <div data-testid="comic-grid" /> }));

vi.mock('@/components/loading/Spinner', () => ({ default: () => <div data-testid="spinner" /> }));

describe('CharacterSinglePage', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: '1' });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render loading spinner when character details and comics are not available', () => {
    render(<CharacterSinglePage />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('should render error message when there is an error fetching character details', async () => {
    const errorMessage = 'Error';
    getCharactersById.mockRejectedValueOnce(new Error(errorMessage));
    render(<CharacterSinglePage />);
    await waitFor(() => expect(screen.getByText(errorMessage)).toBeInTheDocument());
  });

  test('should render character detail and comic grid when character details and comics are available', async () => {
    const characterDetails = { id: '1', name: 'Spider-Man', description: 'His name is Peter Parker' };
    const characterComics = [{ id: '1', title: 'First Spider-Man Comic' }];

    getCharactersById.mockResolvedValueOnce(characterDetails);
    getCharacterComicsById.mockResolvedValueOnce(characterComics);

    render(<CharacterSinglePage />);

    await waitFor(
      () => {
        expect(screen.getByTestId('character-detail')).toBeInTheDocument();
        expect(screen.getByTestId('comic-grid')).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });
});
