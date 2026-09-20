# 🔍 Web App Pembelajaran Interaktif: Detektif Cilik Membaca (v2.0)
### Bahasa Indonesia Kelas 3 SD — Ide Pokok dan Memahami Isi Bacaan

Aplikasi web interaktif, animatif, dan edukatif yang dirancang khusus untuk memfasilitasi pembelajaran materi Bahasa Indonesia Kelas 3 SD sesuai kurikulum: **Ide Pokok, Kalimat Utama, Kalimat Penjelas, dan Memahami Isi Bacaan (5W1H / ADiKSiMBa)**.

🌐 **Akses Web App Langsung (Live Demo)**:  
👉 **[https://ats-bin.vercel.app](https://ats-bin.vercel.app)**  

🐙 **Repositori GitHub**:  
👉 **[https://github.com/Satsetx4/ats-bin](https://github.com/Satsetx4/ats-bin)**  

---

## 🚀 Golden Tech Stack
Aplikasi dibangun menggunakan **Golden Stack modern**:
- **Framework Core**: React 19 + TypeScript + Vite 6
- **Styling & Theming**: Tailwind CSS v4 (CSS-first, `@import "tailwindcss";`, `@custom-variant dark`)
- **Animasi & Interaktivitas Taktil**: Framer Motion (Natural Spring Physics `stiffness: 350, damping: 25`, reduced motion support)
- **Ikonografi**: Lucide React
- **Efek Suara**: Web Audio API (Sintesis frekuensi tanpa file MP3 eksternal, 0 latency, lazy initialized)
- **Efek Selebrasi**: Canvas Confetti (Local NPM bundle)

---

## 🌟 Fitur Unggulan Aplikasi

### 1. 🌓 Tema Ganda: Mode Terang & Mode Gelap (Dark Mode)
- **Base Dark Elegan**: Mengurangi kelelahan mata saat anak belajar di malam hari bersama orang tua.
- **Light Mode Ceria**: Tampilan pastel hangat untuk belajar di siang hari.
- **Anti-FOUC Script**: Preferensi tema dimuat sebelum paint pertama di `<head>` agar tidak ada kedipan layar.
- **Persistensi Aman**: Disimpan di `localStorage` dengan defensive helper `try/catch`.

### 2. 📱 Navigasi Mobile-First & Anti-Tersesat (Wayfinding)
- **Persistent Bottom Navigation Bar**: 5 tab navigasi utama selalu berada di jangkauan jempol (min `44x44px`) pada layar smartphone:
  1. 📖 **Materi**: Modul & Flashcards
  2. 🔬 **Lab Teks**: Bedah Cerita Interaktif
  3. 🎮 **Games**: Gamifikasi Edukasi
  4. 📝 **Kuis**: Bank Soal & Ujian Berwaktu
  5. 🖨️ **LKS**: Lembar Kerja Siswa A4 Siap Cetak
- **Desktop Navigation**: Tab navigasi atas yang lega untuk laptop dan tablet.

### 3. 📖 Modul Belajar & Flashcard Pintar 3D (6 Konsep Kunci)
- **8 Modul Akordeon**: Penjelasan konsep paragraf, ide pokok, kalimat utama, kalimat penjelas, 5W1H (ADiKSiMBa), cara menjawab pertanyaan, menentukan informasi penting, dan teknik meringkas.
- **6 Flashcard 3D Simetris (2 baris x 3 kolom)**:
  1. *Ide Pokok* 💡
  2. *Kalimat Utama* ⭐
  3. *Kalimat Penjelas* 💬
  4. *Isi Bacaan* 📖
  5. *Ringkasan* 📝
  6. *ADiKSiMBa (5W1H)* 🧭

### 4. 🔬 Laboratorium Bedah Teks (Interactive Reading Lab)
- **6 Cerita Praktik Nyata**:
  1. *Kamar Rani yang Bersih dan Nyaman* (Ide Pokok Tersirat)
  2. *Manfaat Membaca Buku* (Kalimat Utama di Awal Paragraf)
  3. *Edo Bersepeda Bersama Ayah* (Menentukan Ide Pokok dari Paragraf)
  4. *Lina Membantu Ibu Membuat Kue* (Eksplorasi 5W1H Interaktif)
  5. *Dika Merawat Tanaman di Halaman* (Menentukan Informasi Penting)
  6. *Sinta & Kucingnya Mimi* (Membuat Ringkasan & Trik Berpikir)
- **Highlight Interaktif Tanpa Spasi Ganda**: Sorot kalimat utama (emas), penjelas (biru), dan bukti (hijau).
- **Text-to-Speech (TTS)**: Pelafalan ramah anak dengan kontrol Dengarkan / Berhenti Suara.

### 5. 🎮 Taman Bermain Gamifikasi (Mini Games)
- **Game 1: Pilah Kalimat**: Tantangan memilih kalimat utama vs kalimat penjelas dengan skor dan pembahasan instan.
- **Game 2: Pasangkan ADiKSiMBa**: Menghubungkan kata tanya 5W1H dengan fungsinya. Menggunakan **DetectiveModal** kartun ramah anak (tanpa alert browser kaku).

### 6. 📝 Bank Soal Komprehensif (35 Butir)
- **Mode Latihan Mandiri**: Filter kategori A, B, C, D, pembahasan instan, dan tips detektif.
- **Mode Ujian Berwaktu ⏱️**: 15 soal acak dalam 15 menit, progress bar, timer, skor 0-100, bintang prestasi (⭐⭐⭐⭐⭐), evaluasi jawaban, dan auto-scroll mulus ke kartu hasil ujian tanpa terpotong header.

### 7. 🖨️ Lembar Kerja Siswa (Worksheet A4 Siap Cetak)
- Desain siap cetak format A4 ramah printer dengan kop identitas, petunjuk doa, soal pilihan ganda, analisis uraian, serta kotak tanda tangan nilai dan paraf guru/orang tua.

---

## 🛠️ Menjalankan Proyek Secara Lokal

```bash
# Clone repositori
git clone https://github.com/Satsetx4/ats-bin.git
cd ats-bin

# Install dependensi
npm install

# Jalankan server pengembangan lokal
npm run dev

# Buat build produksi
npm run build

# Preview build produksi
npm run preview
```

---

Dibuat dengan penuh semangat belajar untuk kemajuan pendidikan anak Indonesia! 🌟
