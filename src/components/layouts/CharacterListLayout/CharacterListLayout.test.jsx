import { render, screen } from '@testing-library/react';
import CharacterListLayout from './CharacterListLayout';
import { describe, expect, test } from 'vitest';

describe('CharacterListLayout', () => {
  test('renders correctly', () => {
    const text = 'Test';
    render(
      <CharacterListLayout>
        <div>{text}</div>
      </CharacterListLayout>,
    );
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
