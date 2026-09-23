import { safeStorage, STORAGE_KEYS } from './storage';

export type SpeechStatus = 'idle' | 'speaking' | 'muted';

export interface SpeechSnapshot {
  status: SpeechStatus;
  key: string | null;
  muted: boolean;
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;
  private speechRequestId = 0;
  private speechListeners = new Set<() => void>();
  private speechSnapshot: SpeechSnapshot = { status: 'idle', key: null, muted: false };

  constructor() {
    this.muted = safeStorage.get<boolean>(STORAGE_KEYS.muted, false);
    this.speechSnapshot = {
      status: this.muted ? 'muted' : 'idle',
      key: null,
      muted: this.muted,
    };
  }

  public getSpeechSnapshot = (): SpeechSnapshot => this.speechSnapshot;

  public subscribeSpeech = (listener: () => void): (() => void) => {
    this.speechListeners.add(listener);
    return () => this.speechListeners.delete(listener);
  };

  private publishSpeech(status: SpeechStatus, key: string | null = null): void {
    const nextStatus = this.muted ? 'muted' : status;
    const nextSnapshot: SpeechSnapshot = {
      status: nextStatus,
      key: nextStatus === 'speaking' ? key : null,
      muted: this.muted,
    };
    if (this.speechSnapshot.status === nextSnapshot.status
      && this.speechSnapshot.key === nextSnapshot.key
      && this.speechSnapshot.muted === nextSnapshot.muted) return;

    this.speechSnapshot = nextSnapshot;
    this.speechListeners.forEach(listener => listener());
  }

  // Lazy AudioContext initialization only after user gesture
  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;

    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }

      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      return this.ctx;
    } catch (e) {
      console.warn('AudioContext init error:', e);
      return null;
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  public setMuted(muted: boolean): void {
    if (this.muted === muted && this.speechSnapshot.muted === muted) return;
    this.muted = muted;
    safeStorage.set(STORAGE_KEYS.muted, muted);
    if (muted) {
      this.stopSpeech();
    } else {
      this.publishSpeech('idle');
    }
  }

  public playTap(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.warn('playTap error', e);
    }
  }

  public playSuccess(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const startTime = ctx.currentTime + (index * 0.08);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch (e) {
      console.warn('playSuccess error', e);
    }
  }

  public playWrong(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.warn('playWrong error', e);
    }
  }

  public playFlip(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      console.warn('playFlip error', e);
    }
  }

  public playFanfare(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [
        { f: 523.25, d: 0.12, t: 0.00 }, // C5
        { f: 523.25, d: 0.12, t: 0.14 }, // C5
        { f: 523.25, d: 0.12, t: 0.28 }, // C5
        { f: 659.25, d: 0.35, t: 0.42 }, // E5
        { f: 783.99, d: 0.20, t: 0.80 }, // G5
        { f: 1046.50, d: 0.60, t: 1.05 } // C6
      ];

      notes.forEach(note => {
        const startTime = ctx.currentTime + note.t;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, startTime);

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + note.d);
      });
    } catch (e) {
      console.warn('playFanfare error', e);
    }
  }

  private speakingText: string | null = null;

  // Text-To-Speech (Membaca Teks Bahasa Indonesia Ramah Anak)
  public speakText(text: string, key: string): void {
    if (this.muted) {
      this.publishSpeech('muted');
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.publishSpeech('idle');
      return;
    }

    this.stopSpeech();
    const requestId = this.speechRequestId;
    this.speakingText = text;
    this.publishSpeech('speaking', key);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.92;
    utterance.pitch = 1.06;

    try {
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang.toLowerCase().includes('id')
        || v.name.toLowerCase().includes('indonesia'));
      if (idVoice) utterance.voice = idVoice;

      const finishRequest = () => {
        if (requestId !== this.speechRequestId) return;
        this.speakingText = null;
        this.publishSpeech('idle');
      };

      utterance.onend = finishRequest;
      utterance.onerror = finishRequest;
      utterance.onstart = () => {
        if (requestId === this.speechRequestId) this.publishSpeech('speaking', key);
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.warn('speechSynthesis error:', error);
      this.speakingText = null;
      this.publishSpeech('idle');
    }
  }

  public getSpeakingText(): string | null {
    return this.speakingText;
  }

  public stopSpeech(): void {
    this.speechRequestId += 1;
    this.speakingText = null;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (error) {
        console.warn('speechSynthesis.cancel error:', error);
      }
    }
    this.publishSpeech(this.muted ? 'muted' : 'idle');
  }
}

export const sound = new SoundEngine();

