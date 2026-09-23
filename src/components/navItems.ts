import type { LucideIcon } from 'lucide-react';
import { BookOpen, Microscope, Gamepad2, HelpCircle, Printer } from 'lucide-react';

export type TabId = 'materi' | 'lab' | 'games' | 'quiz' | 'worksheet';

export const navItems: Array<{ id: TabId; label: string; icon: LucideIcon }> = [
  { id: 'materi', label: 'Materi & Konsep', icon: BookOpen },
  { id: 'lab', label: 'Laboratorium Teks', icon: Microscope },
  { id: 'games', label: 'Mini Games', icon: Gamepad2 },
  { id: 'quiz', label: 'Bank Soal & Kuis', icon: HelpCircle },
  { id: 'worksheet', label: 'Lembar Kerja (Cetak)', icon: Printer },
];
