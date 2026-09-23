import { useSyncExternalStore } from 'react';
import { sound, type SpeechSnapshot } from '@/lib/audio';

export function useTts(): SpeechSnapshot & {
  isSpeaking: (key: string) => boolean;
  toggle: (text: string, key: string) => void;
} {
  const snapshot = useSyncExternalStore(
    sound.subscribeSpeech,
    sound.getSpeechSnapshot,
    sound.getSpeechSnapshot,
  );

  return {
    ...snapshot,
    isSpeaking: key => snapshot.status === 'speaking' && snapshot.key === key,
    toggle: (text, key) => {
      if (snapshot.status === 'speaking' && snapshot.key === key) {
        sound.stopSpeech();
      } else {
        sound.speakText(text, key);
      }
    },
  };
}
