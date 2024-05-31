import { render, screen } from '@testing-library/react';
import CharacterSingleLayout from './CharacterSingleLayout';
import { describe, expect, test } from 'vitest';

describe('CharacterListLayout', () => {
  test('renders correctly', () => {
    const text = 'Test';
    render(
      <CharacterSingleLayout>
        <div>{text}</div>
      </CharacterSingleLayout>,
    );
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
