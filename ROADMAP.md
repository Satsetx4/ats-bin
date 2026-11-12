# Roadmap — ats-bin (Detektif Cilik Membaca v2.0)

React 19 + TS + Vite 6 + Tailwind v4 + Framer Motion + Lucide + Web Audio + canvas-confetti. Tab: Materi, Lab Teks, Games, Kuis, LKS (`src/components/tabs/`). Data: `modules.ts`, `flashcards.ts` (6 konsep), `labStories.ts` (6 cerita), `games.ts`, `questionBank.ts` (±23KB, 35 butir). Ujian: `useExamSession.ts` + `examSession.ts` (deadline absolut, 15 soal/15 mnt) + `ExamSession.tsx`, `ExamResult.tsx`. LKS: `WorksheetTab.tsx` A4 cetak. Tes vitest (`*.test.ts(x)`) + `verify.yml`. Demo: ats-bin.vercel.app. Belum ada ROADMAP.md.

## Fase 1 — Bank soal & keselarasan kurikulum
- [ ] Audit 35 butir `questionBank.ts` per kategori A–D: sebaran, kunci, pembahasan, tips detektif
- [ ] Tambah butir sampai tiap kategori ≥15 soal unik (acak 15/15 mnt tanpa pengulangan cepat)
- [ ] Selaraskan `modules.ts` (8 modul) ↔ `flashcards.ts` (6 kartu) ↔ `labStories.ts` (6 cerita)
- [ ] Review guru B. Indonesia kelas 3 (ide pokok, kalimat utama/penjelas, ADiKSiMBa)

## Fase 2 — Lab Teks & Games
- [ ] `LabTab.tsx`: highlight emas/biru/hijau tanpa spasi ganda + TTS dengar/berhenti (`useTts.ts`)
- [ ] `GamesTab.tsx`: Pilah Kalimat + Pasangan ADiKSiMBa via `DetectiveModal.tsx` (tanpa `alert`)
- [ ] `audio.ts` lazy-init + uji `reduced-motion` di `motion.ts`
- [ ] Tutup gap `LabTab.test.tsx`, `MateriTab.test.tsx`, `QuizTab.test.tsx`

## Fase 3 — Ujian & LKS cetak
- [ ] Kunci `useExamSession.ts` + `examSession.ts`: deadline absolut, reload/hidden-tab tetap valid
- [ ] `ExamResult.tsx`: skor 0–100, bintang, evaluasi, auto-scroll tidak terpotong header
- [ ] `WorksheetTab.tsx`: kop identitas, doa, PG + uraian, tanda tangan; uji cetak A4 + viewport 360px
- [ ] Lindungi identitas siswa; progres lokal aman (`storage.ts`, `learningProgress.ts`)

## Fase 4 — Aksesibilitas & rilis
- [ ] BottomNav 44px + desktop nav + keyboard + kontras (`BottomNav.tsx`, `Navbar.tsx`, `navItems.ts`)
- [ ] Hijau: `eslint`, `tsc -b`, `vitest run`, `vite build` di CI
- [ ] Smoke Vercel: 5 tab + ujian berwaktu + cetak LKS
- [ ] Tag `v2.1` + catat sisa soal perlu review di README
