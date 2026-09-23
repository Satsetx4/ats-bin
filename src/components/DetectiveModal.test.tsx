import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DetectiveModal, type ModalProps } from './DetectiveModal';

const closedProps: ModalProps = {
  isOpen: false,
  title: 'Reset data?',
  message: 'Semua data aplikasi akan dihapus.',
  type: 'confirm',
  confirmText: 'Reset',
  cancelText: 'Batal',
  onConfirm: vi.fn(),
  onCancel: vi.fn(),
};

describe('DetectiveModal accessibility', () => {
  it('labels a modal, traps keyboard focus, closes with Escape, and restores focus', () => {
    const onCancel = vi.fn();
    const props = { ...closedProps, onCancel };
    const { rerender } = render(
      <div>
        <button>Open</button>
        <DetectiveModal {...props} />
      </div>,
    );
    const trigger = screen.getByRole('button', { name: 'Open' });
    trigger.focus();

    rerender(
      <div>
        <button>Open</button>
        <DetectiveModal {...props} isOpen />
      </div>,
    );

    const dialog = screen.getByRole('dialog', { name: 'Reset data?' });
    const close = screen.getByRole('button', { name: 'Tutup modal' });
    const confirm = screen.getByRole('button', { name: 'Reset' });

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleDescription('Semua data aplikasi akan dihapus.');
    expect(close).toHaveFocus();

    confirm.focus();
    fireEvent.keyDown(confirm, { key: 'Tab' });
    expect(close).toHaveFocus();
    fireEvent.keyDown(close, { key: 'Tab', shiftKey: true });
    expect(confirm).toHaveFocus();

    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(onCancel).toHaveBeenCalledOnce();

    rerender(
      <div>
        <button>Open</button>
        <DetectiveModal {...props} />
      </div>,
    );
    expect(trigger).toHaveFocus();
  });
});
