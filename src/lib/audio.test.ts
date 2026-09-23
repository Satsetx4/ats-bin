import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { sound } from './audio';

interface FakeUtterance {
  text: string;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

class MockUtterance implements FakeUtterance {
  lang = '';
  rate = 1;
  pitch = 1;
  voice: SpeechSynthesisVoice | null = null;
  onstart: (() => void) | null = null;
  onend: (() => void) | null = null;
  onerror: (() => void) | null = null;

  constructor(public text: string) {}
}

describe('shared speech state', () => {
  let utterances: FakeUtterance[];
  let cancel: ReturnType<typeof vi.fn>;
  let speechSynthesisDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
    utterances = [];
    cancel = vi.fn();
    speechSynthesisDescriptor = Object.getOwnPropertyDescriptor(window, 'speechSynthesis');
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        cancel,
        getVoices: () => [],
        speak: (utterance: FakeUtterance) => utterances.push(utterance),
        speaking: false,
      },
    });
    vi.stubGlobal('SpeechSynthesisUtterance', MockUtterance);
    sound.setMuted(false);
  });

  afterEach(() => {
    sound.stopSpeech();
    sound.setMuted(false);
    vi.unstubAllGlobals();
    if (speechSynthesisDescriptor) {
      Object.defineProperty(window, 'speechSynthesis', speechSynthesisDescriptor);
    } else {
      Reflect.deleteProperty(window, 'speechSynthesis');
    }
  });

  it('publishes speaking and muted state to every subscribed control', () => {
    const listener = vi.fn();
    const unsubscribe = sound.subscribeSpeech(listener);

    sound.speakText('Bacaan pendek', 'lab:cerita-1');
    expect(sound.getSpeechSnapshot()).toEqual({
      status: 'speaking',
      key: 'lab:cerita-1',
      muted: false,
    });

    sound.setMuted(true);
    expect(sound.getSpeechSnapshot()).toEqual({ status: 'muted', key: null, muted: true });
    expect(cancel).toHaveBeenCalled();
    expect(listener).toHaveBeenCalled();
    unsubscribe();
  });

  it('returns to idle after speech end or error', () => {
    sound.speakText('Teks pertama', 'quiz:1');
    utterances[0].onend?.();
    expect(sound.getSpeechSnapshot().status).toBe('idle');

    sound.speakText('Teks kedua', 'quiz:2');
    utterances[1].onerror?.();
    expect(sound.getSpeechSnapshot().status).toBe('idle');
  });
});
