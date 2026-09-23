import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, tapScale } from '@/lib/motion';
import { labTextsData, type LabStory } from '@/data/learningData';
import { sound } from '@/lib/audio';
import { useTts } from '@/hooks/useTts';
import {
  Volume2,
  Square,
  Eye,
  CheckCircle2,
  FileText,
  Lightbulb,
  Compass
} from 'lucide-react';

export const LabTab: React.FC = () => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>(labTextsData[0].id);
  const [highlightMode, setHighlightMode] = useState<'none' | 'utama' | 'penjelas' | 'all' | 'custom'>('none');
  const [activeSentenceId, setActiveSentenceId] = useState<string | number | null>(null);
  const [activeSnippet, setActiveSnippet] = useState<string | null>(null);
  const tts = useTts();

  const currentStory: LabStory = labTextsData.find(t => t.id === selectedStoryId) || labTextsData[0];

  const handleSelectStory = (id: string) => {
    sound.playTap();
    sound.stopSpeech();
    setSelectedStoryId(id);
    setHighlightMode('none');
    setActiveSentenceId(null);
    setActiveSnippet(null);
  };

  const handleToggleTts = () => {
    sound.playTap();
    tts.toggle(currentStory.fullText, `lab:${currentStory.id}`);
  };

  const storySpeechKey = `lab:${currentStory.id}`;
  const isSpeaking = tts.isSpeaking(storySpeechKey);

  const handleSentenceClick = (sid: string | number) => {
    sound.playTap();
    setHighlightMode('custom');
    setActiveSentenceId(sid);
    setActiveSnippet(null);
  };

  const handleShowEvidence = (snippet: string) => {
    sound.playSuccess();
    setHighlightMode('custom');
    setActiveSentenceId(null);
    setActiveSnippet(snippet);
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header Lab */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-blue-200 dark:border-slate-800 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-100 dark:bg-blue-950/60 px-3 py-1 rounded-full inline-block">
              Laboratorium Bedah Paragraf
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Bedah Teks Nyata
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Pilih salah satu teks di bawah untuk menguji kemampuan detektifmu menemukan kalimat utama dan ide pokok!
            </p>
          </div>

          <div>
            <motion.button
              whileTap={tapScale}
              type="button"
              disabled={tts.muted}
              aria-pressed={isSpeaking}
              aria-label={tts.muted ? 'Suara dimatikan' : isSpeaking ? 'Hentikan suara cerita' : 'Dengarkan suara cerita'}
              onClick={handleToggleTts}
              className={`font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ${
                isSpeaking
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-amber-100 dark:bg-amber-950/70 hover:bg-amber-200 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700'
              }`}
              title={tts.muted ? 'Suara dimatikan' : isSpeaking ? 'Hentikan Suara' : 'Dengarkan Suara'}
            >
              {isSpeaking ? (
                <>
                  <Square className="w-4 h-4 fill-current" /> Berhenti Suara
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Dengarkan Suara
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Pilihan 6 Cerita (Tanpa Truncate Potong Kata) */}
        <div className="mt-4">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block mb-2">
            Pilih Cerita Analisis:
          </label>
          <div className="flex flex-wrap gap-2">
            {labTextsData.map((t, idx) => {
              const isCurrent = t.id === selectedStoryId;
              const displayTitle = t.title.includes(':') ? t.title.split(':')[1].trim() : t.title;
              return (
                <motion.button
                  key={t.id}
                  whileTap={tapScale}
                  onClick={() => handleSelectStory(t.id)}
                  className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm border-2 transition-all flex items-center gap-2 ${
                    isCurrent
                      ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-sm font-extrabold'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 flex items-center justify-center text-[11px] font-black shrink-0">
                    {idx + 1}
                  </span>
                  <span>{displayTitle}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Area Interaktif Teks yang Dipilih */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Paragraf & Tombol Highlighting */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-100 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-900 dark:text-white text-lg sm:text-xl">
                {currentStory.title}
              </h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {currentStory.badge}
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 italic">
              Tip: Klik kalimat pada teks untuk menganalisisnya!
            </span>
          </div>

          {/* Toolbar Sorot Warna */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-600 dark:text-slate-400 mr-1">Sorot:</span>

            <motion.button
              whileTap={tapScale}
              onClick={() => {
                sound.playSuccess();
                setHighlightMode('utama');
                setActiveSentenceId(null);
                setActiveSnippet(null);
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-bold border border-amber-300 dark:border-amber-700 transition-colors flex items-center gap-1.5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
              Kalimat Utama
            </motion.button>

            <motion.button
              whileTap={tapScale}
              onClick={() => {
                sound.playTap();
                setHighlightMode('penjelas');
                setActiveSentenceId(null);
                setActiveSnippet(null);
              }}
              className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 font-bold border border-blue-300 dark:border-blue-700 transition-colors flex items-center gap-1.5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block"></span>
              Kalimat Penjelas
            </motion.button>

            <motion.button
              whileTap={tapScale}
              onClick={() => {
                sound.playTap();
                setHighlightMode('all');
                setActiveSentenceId(null);
                setActiveSnippet(null);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors"
            >
              Tampilkan Keduanya
            </motion.button>

            <motion.button
              whileTap={tapScale}
              onClick={() => {
                sound.playTap();
                setHighlightMode('none');
                setActiveSentenceId(null);
                setActiveSnippet(null);
              }}
              className="px-3 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Bersihkan
            </motion.button>
          </div>

          {/* Wadah Paragraf Interaktif (Tanpa Spasi Berlebih) */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200/80 dark:border-slate-700 rounded-2xl p-5 sm:p-6 min-h-[120px] shadow-inner">
            <div className="leading-relaxed text-left">
              {currentStory.sentences.map(s => {
                let highlightClass = '';
                if (highlightMode === 'utama' && s.type === 'utama') highlightClass = 'highlight-utama';
                if (highlightMode === 'penjelas' && s.type === 'penjelas') highlightClass = 'highlight-penjelas';
                if (highlightMode === 'all') {
                  highlightClass = s.type === 'utama' ? 'highlight-utama' : 'highlight-penjelas';
                }
                if (highlightMode === 'custom') {
                  if (activeSentenceId === s.id) {
                    highlightClass = s.type === 'utama' ? 'highlight-utama' : 'highlight-penjelas';
                  } else if (activeSnippet && s.text.toLowerCase().includes(activeSnippet.toLowerCase())) {
                    highlightClass = 'highlight-5w1h';
                  }
                }

                const isSelected = highlightMode === 'custom' && activeSentenceId === s.id;

                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleSentenceClick(s.id)}
                    className={`sentence-interactive font-medium text-slate-800 dark:text-slate-100 text-base sm:text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-sky-500 ${highlightClass}`}
                  >
                    {s.text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bagian Uji Pemahaman 5W1H (ADiKSiMBa) */}
          {currentStory.qaList && (
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-purple-900 dark:text-purple-300 text-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Uji Pemahaman 5W1H (ADiKSiMBa):</span>
              </h4>
              <div className="space-y-2">
                {currentStory.qaList.map((qa, i) => (
                  <div
                    key={i}
                    className="bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 hover:bg-purple-100/60 dark:hover:bg-purple-900/40 transition-colors"
                  >
                    <div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200 mr-2">
                        {qa.tag}
                      </span>
                      <strong className="text-slate-800 dark:text-slate-200 text-sm">{qa.q}</strong>
                      <p className="text-purple-900 dark:text-purple-300 font-bold text-sm mt-0.5">
                        ➡ Jawab: {qa.a}
                      </p>
                    </div>
                    <motion.button
                      whileTap={tapScale}
                      onClick={() => handleShowEvidence(qa.highlightSnippet)}
                      className="text-xs bg-purple-600 hover:bg-purple-700 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm shrink-0 flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Lihat Bukti di Teks
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Informasi Penting & Ringkasan */}
          {(currentStory.importantInfo || currentStory.ringkasan) && (
            <div className="space-y-3 pt-2">
              {currentStory.importantInfo && (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-4">
                  <h5 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Informasi Penting yang Ditemukan:</span>
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    {currentStory.importantInfo.map((info, idx) => (
                      <li key={idx}>{info}</li>
                    ))}
                  </ul>
                </div>
              )}

              {currentStory.ringkasan && (
                <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-xl p-4">
                  <h5 className="font-bold text-rose-900 dark:text-rose-300 text-sm mb-1 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>Hasil Ringkasan:</span>
                  </h5>
                  <p className="text-rose-950 dark:text-rose-100 font-bold text-sm bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-rose-200 dark:border-slate-700">
                    "{currentStory.ringkasan}"
                  </p>
                  {currentStory.caraBerpikir && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 italic bg-amber-50 dark:bg-amber-950/40 p-2 rounded border border-amber-200 dark:border-amber-800/60">
                      <strong>💡 Trik Cara Berpikir:</strong> {currentStory.caraBerpikir}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Kolom Kanan: Buku Catatan Detektif */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-amber-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shadow-inner">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Buku Catatan Detektif
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Hasil analisis paragraf</p>
              </div>
            </div>

            {/* Kotak Ide Pokok */}
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800/60 text-left">
              <span className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400 block mb-1">
                💡 Ide Pokok:
              </span>
              <p className="font-black text-amber-950 dark:text-amber-100 text-base leading-snug">
                {currentStory.idePokok}
              </p>
            </div>

            {/* Kotak Kalimat Utama */}
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800/60 text-left">
              <span className="text-xs font-bold uppercase text-blue-700 dark:text-blue-400 block mb-1">
                ⭐ Letak Kalimat Utama:
              </span>
              <p className="font-bold text-blue-950 dark:text-blue-100 text-sm leading-snug">
                {currentStory.kalimatUtamaInfo}
              </p>
            </div>

            {/* Kotak Mengapa Begitu? */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 text-left">
              <span className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400 block mb-1">
                ❓ Mengapa begitu?
              </span>
              <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 leading-relaxed font-medium">
                {currentStory.mengapa}
              </p>
            </div>
          </div>

          {/* Slogan Pengingat */}
          <div className="p-3 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-950/60 dark:to-slate-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 font-semibold text-center border border-amber-300 dark:border-amber-800">
            "Jangan cari kalimat paling panjang, cari yang paling banyak dibahas!"
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};
