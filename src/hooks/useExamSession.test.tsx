import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { questionBankData } from '@/data/learningData';
import { useExamSession } from './useExamSession';

const identity = { name: 'Nara', className: '3A', school: '' };
const questions = questionBankData.slice(0, 3);

function ExamHarness() {
  const exam = useExamSession(questions, 10_000, 2);

  return (
    <div>
      <span data-testid="status">{exam.session?.status ?? 'intro'}</span>
      <span data-testid="attempt">{exam.session?.attemptId ?? ''}</span>
      <span data-testid="question-ids">{exam.questions.map(question => question.id).join(',')}</span>
      <span data-testid="answers">{exam.session?.answers.map(answer => answer ?? '-').join(',') ?? ''}</span>
      <span data-testid="index">{exam.session?.currentQuestionIndex ?? ''}</span>
      <span data-testid="remaining">{exam.remainingSeconds}</span>
      <span data-testid="reason">{exam.session?.result?.reason ?? ''}</span>
      <span data-testid="completed-at">{exam.session?.result?.completedAt ?? ''}</span>
      <button onClick={() => exam.start(identity)}>Mulai</button>
      <button onClick={() => exam.setAnswer(0, 2)}>Jawab</button>
      <button onClick={() => exam.goToQuestion(1)}>Pindah soal</button>
      <button onClick={() => exam.finish()}>Selesaikan</button>
    </div>
  );
}

afterEach(() => {
  cleanup();
  window.sessionStorage.clear();
  vi.useRealTimers();
});

describe('useExamSession', () => {
  it('restores the same attempt, answers, and index after unmount and remount', () => {
    const firstRender = render(<ExamHarness />);
    fireEvent.click(screen.getByRole('button', { name: 'Mulai' }));
    fireEvent.click(screen.getByRole('button', { name: 'Jawab' }));
    fireEvent.click(screen.getByRole('button', { name: 'Pindah soal' }));
    const savedAttempt = screen.getByTestId('attempt').textContent;
    const savedQuestionIds = screen.getByTestId('question-ids').textContent;
    firstRender.unmount();

    render(<ExamHarness />);

    expect(screen.getByTestId('status')).toHaveTextContent('active');
    expect(screen.getByTestId('attempt')).toHaveTextContent(savedAttempt ?? '');
    expect(screen.getByTestId('question-ids')).toHaveTextContent(savedQuestionIds ?? '');
    expect(screen.getByTestId('answers')).toHaveTextContent('2,-');
    expect(screen.getByTestId('index')).toHaveTextContent('1');
  });

  it('expires once from the absolute deadline when the page resumes', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 23, 12));
    render(<ExamHarness />);
    fireEvent.click(screen.getByRole('button', { name: 'Mulai' }));

    expect(screen.getByTestId('remaining')).toHaveTextContent('10');
    vi.setSystemTime(Date.now() + 10_500);
    fireEvent(document, new Event('visibilitychange'));

    expect(screen.getByTestId('status')).toHaveTextContent('result');
    expect(screen.getByTestId('reason')).toHaveTextContent('timeout');
    const completedAt = screen.getByTestId('completed-at').textContent;

    vi.setSystemTime(Date.now() + 30_000);
    fireEvent.click(screen.getByRole('button', { name: 'Selesaikan' }));

    expect(screen.getByTestId('completed-at')).toHaveTextContent(completedAt ?? '');
  });

  it('treats answer and finish actions after the absolute deadline as a timeout', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 23, 12));
    render(<ExamHarness />);
    fireEvent.click(screen.getByRole('button', { name: 'Mulai' }));
    vi.setSystemTime(Date.now() + 10_001);

    fireEvent.click(screen.getByRole('button', { name: 'Jawab' }));
    expect(screen.getByTestId('status')).toHaveTextContent('result');
    expect(screen.getByTestId('reason')).toHaveTextContent('timeout');
    expect(screen.getByTestId('answers')).toHaveTextContent('-,-');
  });
});
