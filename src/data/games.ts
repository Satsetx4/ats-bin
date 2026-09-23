import type { Game5W1HItem, GamePilahItem } from './types';

export const miniGamesData = {
  pilahKalimat: [
  {
    "id": 1,
    "sentence": "Menjaga kebersihan lingkungan sangat penting bagi kita semua.",
    "context": "Menjaga kebersihan lingkungan sangat penting bagi kita semua. Sampah plastik harus dibuang ke tempat sampah anorganik.",
    "type": "utama",
    "reason": "Kalimat ini memuat inti gagasan umum yang menjadi dasar kalimat lainnya."
  },
  {
    "id": 2,
    "sentence": "Sampah plastik harus dibuang ke tempat sampah anorganik.",
    "context": "Menjaga kebersihan lingkungan sangat penting bagi kita semua. Sampah plastik harus dibuang ke tempat sampah anorganik.",
    "type": "penjelas",
    "reason": "Ini adalah rincian/contoh tindakan untuk mendukung pentingnya menjaga kebersihan."
  },
  {
    "id": 3,
    "sentence": "Membaca buku memiliki banyak manfaat bagi perkembangan otak.",
    "context": "Membaca buku memiliki banyak manfaat bagi perkembangan otak. Dengan membaca, kita dapat mengenal berbagai ilmu pengetahuan baru.",
    "type": "utama",
    "reason": "Kalimat utama yang menyatakan gagasan pokok mengenai faedah membaca."
  },
  {
    "id": 4,
    "sentence": "Dengan membaca, kita dapat mengenal berbagai ilmu pengetahuan baru.",
    "context": "Membaca buku memiliki banyak manfaat bagi perkembangan otak. Dengan membaca, kita dapat mengenal berbagai ilmu pengetahuan baru.",
    "type": "penjelas",
    "reason": "Menjelaskan salah satu bukti manfaat membaca."
  },
  {
    "id": 5,
    "sentence": "Lina menyiapkan tepung dan telur di atas meja dapur.",
    "context": "Lina membuat kue bersama ibunya. Lina menyiapkan tepung dan telur di atas meja dapur.",
    "type": "penjelas",
    "reason": "Memberikan rincian kegiatan memasak kue bersama ibu."
  },
  {
    "id": 6,
    "sentence": "Olahraga lari pagi membuat tubuh kita menjadi sehat dan bugar.",
    "context": "Olahraga lari pagi membuat tubuh kita menjadi sehat dan bugar. Keringat yang keluar saat berolahraga membantu membuang racun tubuh.",
    "type": "utama",
    "reason": "Inti pembicaraan umum mengenai manfaat lari pagi."
  },
  {
    "id": 7,
    "sentence": "Keringat yang keluar saat berolahraga membantu membuang racun tubuh.",
    "context": "Olahraga lari pagi membuat tubuh kita menjadi sehat dan bugar. Keringat yang keluar saat berolahraga membantu membuang racun tubuh.",
    "type": "penjelas",
    "reason": "Menjelaskan alasan ilmiah mengapa tubuh menjadi sehat saat olahraga."
  },
  {
    "id": 8,
    "sentence": "Dika mencabut rumput liar yang tumbuh di samping pot bunga.",
    "context": "Dika merawat tanaman di halaman rumah. Dika mencabut rumput liar yang tumbuh di samping pot bunga.",
    "type": "penjelas",
    "reason": "Kalimat rincian kegiatan merawat tanaman di halaman rumah."
  }
] as GamePilahItem[],
  pasangKataTanya: [
  {
    "qWord": "Apa?",
    "targetMatch": "Peristiwa atau hal yang dibicarakan",
  },
  {
    "qWord": "Siapa?",
    "targetMatch": "Orang atau tokoh yang terlibat",
  },
  {
    "qWord": "Kapan?",
    "targetMatch": "Waktu terjadinya peristiwa",
  },
  {
    "qWord": "Di mana?",
    "targetMatch": "Tempat terjadinya peristiwa",
  },
  {
    "qWord": "Mengapa?",
    "targetMatch": "Alasan atau penyebab peristiwa terjadi",
  },
  {
    "qWord": "Bagaimana?",
    "targetMatch": "Proses atau cara peristiwa terjadi",
  }
] as Game5W1HItem[]
};
