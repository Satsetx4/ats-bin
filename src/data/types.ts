// Data materi, flashcards, lab stories, games, dan bank soal untuk Bahasa Indonesia Kelas 3 SD

export interface ModuleItem {
  id: number;
  title: string;
  badge: string;
  color: string;
  icon: string;
  summary: string;
  detailsHtml: string;
}

export interface FlashcardItem {
  id: string | number;
  front: string;
  back: string;
  icon: string;
  color: string;
}

export interface LabSentence {
  id: string | number;
  text: string;
  type: 'utama' | 'penjelas';
}

export interface LabQA {
  q: string;
  a: string;
  tag: string;
  highlightSnippet: string;
}

export interface LabStory {
  id: string;
  title: string;
  badge: string;
  fullText: string;
  sentences: LabSentence[];
  idePokok: string;
  kalimatUtamaInfo: string;
  mengapa: string;
  qaList?: LabQA[];
  importantInfo?: string[];
  ringkasan?: string;
  caraBerpikir?: string;
}

export interface GamePilahItem {
  id: number;
  sentence: string;
  context?: string;
  type: 'utama' | 'penjelas';
  reason: string;
}

export interface Game5W1HItem {
  id?: number | string;
  qWord: string;
  targetMatch: string;
}

export interface QuestionItem {
  id: number;
  category: 'A' | 'B' | 'C' | 'D';
  categoryName: string;
  passage?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  detectiveTip: string;
}
