import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import ComicGrid from './ComicGrid';

describe('ComicGrid', () => {
  const comics = [
    { id: 1, title: 'Comic 1', thumbnail: { path: 'path', extension: 'jpg' } },
    { id: 2, title: 'Comic 2', thumbnail: { path: 'path', extension: 'jpg' } },
    { id: 3, title: 'Comic 3', thumbnail: { path: 'path', extension: 'jpg' } },
  ];

  test('renders a list of ComicCard components', () => {
    render(<ComicGrid comics={comics} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  test('passes the correct props to each ComicCard component', () => {
    render(<ComicGrid comics={comics} />);
    comics.forEach((comic) => {
      expect(screen.getByText(comic.title)).toBeInTheDocument();
    });
  });
});
