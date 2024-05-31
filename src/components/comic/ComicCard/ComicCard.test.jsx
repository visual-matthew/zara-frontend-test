import { render, screen } from '@testing-library/react';
import ComicCard from './ComicCard';
import { describe, expect, test } from 'vitest';

describe('ComicCard', () => {
  const comicInfo = {
    id: 1,
    thumbnail: {
      path: 'path',
      extension: 'jpg',
    },
    title: 'Comic Title',
  };

  test('renders comic title', () => {
    render(<ComicCard comicInfo={comicInfo} />);
    const comicTitle = screen.getByText('Comic Title');
    expect(comicTitle).toBeInTheDocument();
  });

  test('renders comic image with correct src and alt', () => {
    render(<ComicCard comicInfo={comicInfo} />);
    const comicImage = screen.getByAltText('Comic Title');
    expect(comicImage).toHaveAttribute('src', 'path.jpg');
  });
});
