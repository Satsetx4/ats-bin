import type { ModuleItem } from './types';

export const modulesData: ModuleItem[] = [
  {
    "id": 1,
    "title": "Pengertian Paragraf",
    "badge": "Modul 1",
    "color": "blue",
    "icon": "book-open",
    "summary": "Paragraf adalah kumpulan beberapa kalimat yang membahas satu topik atau gagasan tertentu.",
    "detailsHtml": "\n            <div class=\"space-y-4\">\n                <p class=\"text-slate-700 leading-relaxed\">\n                    Bayangkan sebuah paragraf seperti sebuah <strong>keluarga kalimat</strong>! Mereka berkumpul bersama untuk menceritakan satu hal yang sama.\n                </p>\n                <div class=\"bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl\">\n                    <h5 class=\"font-bold text-blue-900 mb-2\">Dalam sebuah paragraf biasanya terdapat:</h5>\n                    <ul class=\"space-y-2 text-slate-700\">\n                        <li class=\"flex items-start gap-2\">\n                            <span class=\"bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-full font-bold mt-1\">1</span>\n                            <span><strong>Ide Pokok:</strong> Gagasan utama yang menjadi inti pembicaraan.</span>\n                        </li>\n                        <li class=\"flex items-start gap-2\">\n                            <span class=\"bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-full font-bold mt-1\">2</span>\n                            <span><strong>Kalimat Penjelas:</strong> Kalimat-kalimat yang bertugas menjelaskan atau mendukung ide pokok tersebut.</span>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        "
  },
  {
    "id": 2,
    "title": "Ide Pokok",
    "badge": "Modul 2",
    "color": "amber",
    "icon": "lightbulb",
    "summary": "Ide pokok adalah gagasan utama yang menjadi dasar pembahasan dalam sebuah paragraf.",
    "detailsHtml": "\n            <div class=\"space-y-4\">\n                <div class=\"p-4 bg-amber-50 rounded-xl border border-amber-200\">\n                    <p class=\"font-semibold text-amber-900 text-center text-lg\">💡 Ide Pokok = Gagasan Utama</p>\n                </div>\n                <div>\n                    <h5 class=\"font-bold text-slate-800 mb-2\">📍 Di mana letak Ide Pokok?</h5>\n                    <ul class=\"grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-center\">\n                        <li class=\"p-3 bg-white rounded-xl border border-slate-200 shadow-sm font-medium text-slate-700\">Di <strong>awal</strong> paragraf</li>\n                        <li class=\"p-3 bg-white rounded-xl border border-slate-200 shadow-sm font-medium text-slate-700\">Di <strong>akhir</strong> paragraf</li>\n                        <li class=\"p-3 bg-white rounded-xl border border-slate-200 shadow-sm font-medium text-slate-700\">Tersirat dalam <strong>seluruh</strong> paragraf</li>\n                    </ul>\n                </div>\n                <div class=\"bg-amber-100/60 p-4 rounded-xl border border-amber-300\">\n                    <h5 class=\"font-bold text-amber-950 mb-2\">🔍 5 Langkah Menemukan Ide Pokok:</h5>\n                    <ol class=\"list-decimal list-inside space-y-1.5 text-slate-800 text-sm\">\n                        <li>Baca paragraf dengan teliti.</li>\n                        <li>Pahami semua kalimat dalam paragraf.</li>\n                        <li>Tentukan hal yang paling banyak dibahas.</li>\n                        <li>Cari kalimat yang paling mewakili isi paragraf.</li>\n                        <li>Tuliskan inti pembahasannya dengan kalimat singkat.</li>\n                    </ol>\n                </div>\n                <div class=\"p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-3\">\n                    <span class=\"text-2xl\">❓</span>\n                    <p class=\"text-xs sm:text-sm text-emerald-900 font-medium\">\n                        <strong>Pertanyaan Bantuan:</strong> <em>\"Paragraf ini membahas tentang apa?\"</em> Jawabannya adalah ide pokoknya!\n                    </p>\n                </div>\n            </div>\n        "
  },
  {
    "id": 3,
    "title": "Kalimat Utama",
    "badge": "Modul 3",
    "color": "emerald",
    "icon": "star",
    "summary": "Kalimat utama adalah kalimat yang memuat ide pokok suatu paragraf.",
    "detailsHtml": "\n            <div class=\"space-y-4\">\n                <div class=\"p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center font-bold text-emerald-800\">\n                    Kalimat Utama = Kalimat yang Berisi Ide Pokok\n                </div>\n                <h5 class=\"font-bold text-slate-800\">Sifat-sifat Kalimat Utama:</h5>\n                <div class=\"grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm\">\n                    <div class=\"bg-white p-3 rounded-xl border border-slate-200 shadow-sm\">\n                        <span class=\"text-emerald-500 font-bold text-base block mb-1\">✔ Sifat 1</span>\n                        Berisi gagasan utama paragraf.\n                    </div>\n                    <div class=\"bg-white p-3 rounded-xl border border-slate-200 shadow-sm\">\n                        <span class=\"text-emerald-500 font-bold text-base block mb-1\">✔ Sifat 2</span>\n                        Dapat berdiri sendiri sebagai kalimat utuh.\n                    </div>\n                    <div class=\"bg-white p-3 rounded-xl border border-slate-200 shadow-sm\">\n                        <span class=\"text-emerald-500 font-bold text-base block mb-1\">✔ Sifat 3</span>\n                        Menjadi dasar atau pokok bagi kalimat lainnya.\n                    </div>\n                </div>\n                <div class=\"bg-slate-50 p-3 rounded-xl border border-slate-200 text-sm\">\n                    <span class=\"font-bold text-slate-700 block mb-1\">Contoh Analisis:</span>\n                    <p class=\"italic text-slate-600 mb-2\">\"Menjaga kebersihan lingkungan sangat penting. Lingkungan yang bersih membuat kita nyaman. Sampah harus dibuang pada tempatnya.\"</p>\n                    <p class=\"text-emerald-700\"><strong>Kalimat utama:</strong> Menjaga kebersihan lingkungan sangat penting.</p>\n                    <p class=\"text-amber-700\"><strong>Ide pokok:</strong> Pentingnya menjaga kebersihan lingkungan.</p>\n                </div>\n            </div>\n        "
  },
  {
    "id": 4,
    "title": "Kalimat Penjelas",
    "badge": "Modul 4",
    "color": "sky",
    "icon": "message-square",
    "summary": "Kalimat penjelas adalah kalimat yang memberikan informasi tambahan untuk menjelaskan ide pokok.",
    "detailsHtml": "\n            <div class=\"space-y-4\">\n                <p class=\"text-slate-700 text-sm\">\n                    Kalimat penjelas bertugas memberi rincian, bukti, atau pendukung agar gagasan utama mudah dimengerti.\n                </p>\n                <h5 class=\"font-bold text-slate-800 text-sm\">Kalimat penjelas dapat berupa:</h5>\n                <div class=\"grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs\">\n                    <div class=\"p-2.5 bg-sky-50 text-sky-800 rounded-lg font-medium text-center border border-sky-200\">1. Contoh</div>\n                    <div class=\"p-2.5 bg-sky-50 text-sky-800 rounded-lg font-medium text-center border border-sky-200\">2. Alasan</div>\n                    <div class=\"p-2.5 bg-sky-50 text-sky-800 rounded-lg font-medium text-center border border-sky-200\">3. Keterangan</div>\n                    <div class=\"p-2.5 bg-sky-50 text-sky-800 rounded-lg font-medium text-center border border-sky-200\">4. Fakta</div>\n                    <div class=\"p-2.5 bg-sky-50 text-sky-800 rounded-lg font-medium text-center border border-sky-200 col-span-2 sm:col-span-2\">5. Penjelasan Lebih Lanjut</div>\n                </div>\n                <div class=\"p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs sm:text-sm text-blue-900\">\n                    <strong>Trik Detektif:</strong> Jika kalimat utama berada di awal, maka kalimat-kalimat berikutnya adalah <strong>kalimat penjelas</strong>!\n                </div>\n            </div>\n        "
  },
  {
    "id": 5,
    "title": "Memahami Isi Bacaan (5W1H)",
    "badge": "Modul 5",
    "color": "purple",
    "icon": "compass",
    "summary": "Memahami isi bacaan berarti mengetahui informasi yang disampaikan dalam suatu teks dengan kata tanya ADiKSiMBa.",
    "detailsHtml": "\n            <div class=\"space-y-3\">\n                <p class=\"text-slate-700 text-sm\">Gunakan rumus 6 kata tanya ajaib (ADiKSiMBa) saat membaca cerita:</p>\n                <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm\">\n                    <div class=\"p-3 bg-purple-50 rounded-xl border border-purple-200\">\n                        <strong class=\"text-purple-900\">1. Apa?</strong>\n                        <p class=\"text-slate-600\">Mengetahui peristiwa atau hal yang dibicarakan.</p>\n                    </div>\n                    <div class=\"p-3 bg-purple-50 rounded-xl border border-purple-200\">\n                        <strong class=\"text-purple-900\">2. Siapa?</strong>\n                        <p class=\"text-slate-600\">Mengetahui orang atau tokoh yang terlibat.</p>\n                    </div>\n                    <div class=\"p-3 bg-purple-50 rounded-xl border border-purple-200\">\n                        <strong class=\"text-purple-900\">3. Kapan?</strong>\n                        <p class=\"text-slate-600\">Mengetahui waktu terjadinya peristiwa.</p>\n                    </div>\n                    <div class=\"p-3 bg-purple-50 rounded-xl border border-purple-200\">\n                        <strong class=\"text-purple-900\">4. Di mana?</strong>\n                        <p class=\"text-slate-600\">Mengetahui tempat terjadinya peristiwa.</p>\n                    </div>\n                    <div class=\"p-3 bg-purple-50 rounded-xl border border-purple-200\">\n                        <strong class=\"text-purple-900\">5. Mengapa?</strong>\n                        <p class=\"text-slate-600\">Mengetahui alasan atau penyebab peristiwa terjadi.</p>\n                    </div>\n                    <div class=\"p-3 bg-purple-50 rounded-xl border border-purple-200\">\n                        <strong class=\"text-purple-900\">6. Bagaimana?</strong>\n                        <p class=\"text-slate-600\">Mengetahui proses atau cara suatu peristiwa terjadi.</p>\n                    </div>\n                </div>\n            </div>\n        "
  },
  {
    "id": 6,
    "title": "Menjawab Pertanyaan Teks",
    "badge": "Modul 6",
    "color": "rose",
    "icon": "check-circle",
    "summary": "Tips menjawab pertanyaan berdasarkan bacaan dengan tepat dan tidak asal menebak.",
    "detailsHtml": "\n            <div class=\"space-y-4\">\n                <ol class=\"list-decimal list-inside space-y-2 text-slate-700 text-sm\">\n                    <li><strong>Baca pertanyaan dengan teliti:</strong> Pahami apa yang sebenarnya ditanyakan.</li>\n                    <li><strong>Ingat kembali isi bacaan:</strong> Buka kembali teks cerita jika lupa.</li>\n                    <li><strong>Cari informasi yang sesuai:</strong> Temukan bukti kalimatnya di dalam teks.</li>\n                    <li><strong>Jawab menggunakan kalimat yang jelas:</strong> Rangkai jawaban dengan rapi.</li>\n                    <li><strong>Jangan menjawab berdasarkan tebakan:</strong> Semua jawaban pasti ada di dalam bacaan!</li>\n                </ol>\n                <div class=\"p-3 bg-rose-50 border-2 border-rose-300 rounded-xl text-rose-900 text-xs sm:text-sm font-semibold flex items-center gap-3\">\n                    <span class=\"text-xl\">⚠️</span>\n                    <span>PENTING: Jawaban harus selalu sesuai dengan fakta dan informasi yang ada di dalam bacaan!</span>\n                </div>\n            </div>\n        "
  },
  {
    "id": 7,
    "title": "Menentukan Informasi Penting",
    "badge": "Modul 7",
    "color": "emerald",
    "icon": "bookmark",
    "summary": "Tidak semua informasi memiliki tingkat kepentingan yang sama. Cari yang paling utama!",
    "detailsHtml": "\n            <div class=\"space-y-3\">\n                <p class=\"text-slate-700 text-sm\">Informasi penting dalam cerita biasanya berkaitan erat dengan 8 unsur berikut:</p>\n                <div class=\"grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs\">\n                    <div class=\"p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800\">👤 Tokoh</div>\n                    <div class=\"p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800\">📍 Tempat</div>\n                    <div class=\"p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800\">⏰ Waktu</div>\n                    <div class=\"p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800\">🏃 Kegiatan</div>\n                    <div class=\"p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800\">⚡ Kejadian</div>\n                    <div class=\"p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800\">💡 Alasan</div>\n                    <div class=\"p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800\">🎯 Hasil</div>\n                    <div class=\"p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800\">✨ Manfaat</div>\n                </div>\n            </div>\n        "
  },
  {
    "id": 8,
    "title": "Meringkas Isi Bacaan",
    "badge": "Modul 8",
    "color": "indigo",
    "icon": "file-text",
    "summary": "Ringkasan adalah bentuk singkat dari sebuah bacaan yang tetap memuat informasi penting.",
    "detailsHtml": "\n            <div class=\"space-y-4\">\n                <div class=\"bg-indigo-50 border border-indigo-200 p-4 rounded-xl\">\n                    <h5 class=\"font-bold text-indigo-950 mb-2\">5 Langkah Cara Membuat Ringkasan:</h5>\n                    <ol class=\"list-decimal list-inside space-y-1 text-slate-700 text-sm\">\n                        <li>Baca seluruh bacaan secara menyeluruh.</li>\n                        <li>Pahami isi setiap paragraf.</li>\n                        <li>Tentukan informasi-informasi penting.</li>\n                        <li>Hilangkan informasi atau rincian yang tidak diperlukan.</li>\n                        <li>Gabungkan informasi penting menjadi cerita singkat yang padat.</li>\n                    </ol>\n                </div>\n                <div class=\"p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs sm:text-sm text-amber-900\">\n                    <strong>🧠 Trik Berpikir Detektif:</strong> Kalau ditanya <em>\"Apa ide pokok paragraf tersebut?\"</em>, <strong>JANGAN</strong> langsung mencari kalimat yang paling panjang! Tanyakan pada dirimu: <em>\"Paragraf ini paling banyak membahas tentang apa?\"</em>\n                </div>\n            </div>\n        "
  }
];
