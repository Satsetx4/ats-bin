import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RichText } from './RichText';

describe('RichText', () => {
  it('renders allowed learning markup and drops executable elements and attributes', () => {
    const { container } = render(<RichText markup={'<p class="font-bold" onclick="alert(1)">Pokok <strong>paragraf</strong></p><script>globalThis.pwned = true</script>'} />);

    const paragraph = container.querySelector('p');
    expect(paragraph).toHaveTextContent('Pokok paragraf');
    expect(paragraph).toHaveClass('font-bold');
    expect(document.querySelector('script')).not.toBeInTheDocument();
    expect(paragraph).not.toHaveAttribute('onclick');
    expect((globalThis as typeof globalThis & { pwned?: boolean }).pwned).toBeUndefined();
  });
});
