import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { labTextsData } from '@/data/learningData';
import { LabTab } from './LabTab';

describe('LabTab sentence controls', () => {
  it('supports keyboard activation and exposes the selected state', async () => {
    const user = userEvent.setup();
    render(<LabTab />);
    const sentence = labTextsData[0].sentences[0].text;
    const control = screen.getByRole('button', { name: sentence });

    expect(control).toHaveAttribute('aria-pressed', 'false');
    control.focus();
    await user.keyboard('{Enter}');
    expect(control).toHaveAttribute('aria-pressed', 'true');
  });
});
