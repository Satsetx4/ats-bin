import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { QuizTab } from './QuizTab';
import { STORAGE_KEYS } from '@/lib/storage';

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

describe('QuizTab exam flow', () => {
  it('starts, answers, navigates, and finishes one attempt without saving identity to localStorage', async () => {
    const user = userEvent.setup();
    const showModal = vi.fn((
      _title: string,
      _message: string,
      _type?: string,
      _confirmText?: string,
      _cancelText?: string,
      onConfirm?: () => void,
    ) => onConfirm?.());

    render(<QuizTab onShowModal={showModal} />);

    await user.click(screen.getByRole('button', { name: /Mode Ujian Berwaktu/ }));
    await user.type(screen.getByLabelText(/Nama Lengkap Siswa/), 'Naya');
    await user.click(screen.getByRole('button', { name: 'Mulai Ujian Sekarang' }));
    expect(screen.getByText('Soal 1 dari 15')).toBeInTheDocument();

    const answerGroup = screen.getByRole('group', { name: 'Pilihan jawaban' });
    await user.click(within(answerGroup).getAllByRole('button')[0]);
    expect(within(answerGroup).getAllByRole('button')[0]).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: 'Soal 15, belum dijawab' }));
    await user.click(screen.getByRole('button', { name: 'Soal 1, sudah dijawab' }));
    expect(within(screen.getByRole('group', { name: 'Pilihan jawaban' })).getAllByRole('button')[0])
      .toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: 'Soal 15, belum dijawab' }));
    await user.click(within(screen.getByRole('group', { name: 'Pilihan jawaban' })).getAllByRole('button')[0]);
    await user.click(screen.getByRole('button', { name: 'Selesaikan Ujian' }));

    await waitFor(() => expect(screen.getByRole('heading', { name: 'Detektif Cilik Membaca' })).toBeInTheDocument());
    expect(screen.getByText(/^ID: ATS-\d{8}-[A-Z0-9]{6}$/)).toBeInTheDocument();
    expect(window.localStorage.getItem(STORAGE_KEYS.legacyStudentName)).toBeNull();
    expect(JSON.parse(window.sessionStorage.getItem(STORAGE_KEYS.examSession) ?? '{}').identity.name).toBe('Naya');
    expect(showModal).toHaveBeenCalledOnce();
  });
});
