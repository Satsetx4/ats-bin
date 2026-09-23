import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MateriTab } from './MateriTab';

describe('MateriTab accordion', () => {
  it('exposes its expanded state and controlled panel to keyboard users', async () => {
    const user = userEvent.setup();
    render(<MateriTab />);
    const firstModule = screen.getByRole('button', { name: /paragraf/i });

    expect(firstModule).toHaveAttribute('aria-expanded', 'true');
    const panelId = firstModule.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId ?? '')).toBeInTheDocument();

    firstModule.focus();
    await user.keyboard('{Enter}');
    expect(firstModule).toHaveAttribute('aria-expanded', 'false');

    await user.keyboard(' ');
    expect(firstModule).toHaveAttribute('aria-expanded', 'true');
  });

  it('flips flashcards with Enter and Space without nesting the audio control', async () => {
    const user = userEvent.setup();
    render(<MateriTab />);
    const card = screen.getAllByRole('button', { name: /ide pokok.*tampilkan penjelasan/i })[0];

    expect(card).toHaveAttribute('aria-pressed', 'false');
    card.focus();
    await user.keyboard('{Enter}');
    expect(card).toHaveAttribute('aria-pressed', 'true');

    const audioButton = screen.getByRole('button', { name: 'Dengarkan arti' });
    expect(card).not.toContainElement(audioButton);
    await user.keyboard(' ');
    expect(card).toHaveAttribute('aria-pressed', 'false');
  });
});
