import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, tapScale } from '@/lib/motion';
import { questionBankData } from '@/data/learningData';
import { selectBalancedQuestions } from '@/lib/exam';
import { sound } from '@/lib/audio';
import { Printer } from 'lucide-react';

export const WorksheetTab: React.FC = () => {
  const selectedForPrint = selectBalancedQuestions(questionBankData, 10, () => 0.5);

  const handlePrint = () => {
    sound.playTap();
    window.print();
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header Aksi Cetak (Disembunyikan saat dicetak) */}
      <motion.div
        variants={itemVariants}
        className="no-print bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="text-left">
          <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-100 dark:bg-blue-950/60 px-3 py-1 rounded-full inline-block">
            Fitur Siap Cetak (Printable)
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Lembar Kerja Siswa (Worksheet)
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Format rapi ukuran A4 untuk tugas kelas, PR, atau asesmen mandiri tertulis.
          </p>
        </div>

        <motion.button
          whileTap={tapScale}
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-3 rounded-2xl shadow-md flex items-center gap-2 text-sm shrink-0"
        >
          <Printer className="w-5 h-5" /> Cetak Lembar Kerja (PDF)
        </motion.button>
      </motion.div>

      {/* Kontainer Dokumen A4 Lembar Kerja Siswa */}
      <motion.div
        variants={itemVariants}
        className="worksheet-container bg-white text-slate-900 rounded-3xl p-8 sm:p-10 border-2 border-slate-300 shadow-lg max-w-4xl mx-auto text-left"
      >
        {/* Kop Lembar Kerja */}
        <div className="border-b-2 border-black pb-4 mb-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-black uppercase tracking-wider text-black">
              LEMBAR KERJA SISWA (LKS)
            </h2>
            <h3 className="text-base font-bold text-slate-800">
              BAHASA INDONESIA KELAS 3 SD
            </h3>
            <p className="text-xs text-slate-600">
              Materi: Ide Pokok, Kalimat Utama & Memahami Isi Bacaan
            </p>
          </div>

          {/* Kolom Identitas Siswa */}
          <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm border p-3 rounded-lg border-slate-400">
            <div className="space-y-1.5">
              <p>
                <strong>Nama Lengkap:</strong> ..............................................................
              </p>
              <p>
                <strong>Nomor Absen:</strong> ..............................................................
              </p>
            </div>
            <div className="space-y-1.5">
              <p>
                <strong>Kelas:</strong> 3 (Tiga) ...................................................
              </p>
              <p>
                <strong>Hari / Tanggal:</strong> ..............................................................
              </p>
            </div>
          </div>
        </div>

        {/* Petunjuk Pengerjaan */}
        <div className="mb-6 p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800">
          <strong>Petunjuk:</strong>
          <ol className="list-decimal list-inside space-y-0.5 mt-1">
            <li>Berdoalah sebelum mengerjakan soal.</li>
            <li>Bacalah setiap teks dan pertanyaan dengan cermat dan teliti.</li>
            <li>Silanglah (X) pada salah satu pilihan jawaban A, B, C, atau D yang paling tepat!</li>
          </ol>
        </div>

        {/* Bagian 1: Soal Pilihan Ganda */}
        <div className="mb-8">
          <h4 className="font-bold text-sm uppercase tracking-wide border-b pb-1 mb-4 text-black">
            I. Pilihan Ganda
          </h4>
          <div className="space-y-4">
            {selectedForPrint.map((q, idx) => (
              <div key={q.id} className="question-block pb-3 border-b border-slate-200">
                <p className="font-bold text-slate-900 text-sm mb-1 leading-snug">
                  {idx + 1}.{' '}
                  {q.passage && (
                    <span className="italic font-normal block mb-1">"{q.passage}"</span>
                  )}
                  {q.question}
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-800 mt-2 pl-4">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx}>
                      <strong>{String.fromCharCode(65 + oIdx)}.</strong> {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bagian 2: Soal Uraian / Analisis Teks */}
        <div className="question-block pt-4 border-t-2 border-black">
          <h4 className="font-bold text-sm uppercase tracking-wide border-b pb-1 mb-4 text-black">
            II. Analisis Teks & Uraian
          </h4>

          <div className="p-4 border border-slate-300 rounded-lg mb-4 bg-slate-50 text-xs sm:text-sm italic leading-relaxed text-slate-800">
            "Setiap pagi, Rani selalu merapikan tempat tidurnya. Ia kemudian membuka jendela agar udara segar masuk ke kamar. Setelah itu, Rani menyapu lantai dan menata buku-bukunya dengan rapi. Kamar Rani menjadi bersih dan nyaman."
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <p className="font-bold mb-1">1. Tuliskan ide pokok dari paragraf tentang Rani di atas!</p>
              <p className="text-slate-400 border-b border-dotted border-slate-400 py-1">
                Jawab: .................................................................................................................................................................................
              </p>
            </div>
            <div>
              <p className="font-bold mb-1">2. Mengapa Rani membuka jendela kamar tidurnya setiap pagi?</p>
              <p className="text-slate-400 border-b border-dotted border-slate-400 py-1">
                Jawab: .................................................................................................................................................................................
              </p>
            </div>
            <div>
              <p className="font-bold mb-1">3. Sebutkan 2 kalimat penjelas yang ada pada teks bacaan di atas!</p>
              <p className="text-slate-400 border-b border-dotted border-slate-400 py-1">
                a) .....................................................................................................................................................................................
              </p>
              <p className="text-slate-400 border-b border-dotted border-slate-400 py-1">
                b) .....................................................................................................................................................................................
              </p>
            </div>
          </div>
        </div>

        {/* Kotak Nilai & Paraf */}
        <div className="mt-10 pt-6 border-t border-slate-300 grid grid-cols-3 gap-4 text-center text-xs">
          <div className="border border-slate-400 p-2 rounded">
            <p className="font-bold mb-8">Nilai</p>
          </div>
          <div className="border border-slate-400 p-2 rounded">
            <p className="font-bold mb-8">Paraf Orang Tua</p>
          </div>
          <div className="border border-slate-400 p-2 rounded">
            <p className="font-bold mb-8">Paraf Guru</p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};
