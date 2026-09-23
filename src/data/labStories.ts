import type { LabStory } from './types';

export const labTextsData: LabStory[] = [
  {
    "id": "text1",
    "title": "Contoh 1: Kamar Rani",
    "badge": "Menentukan Ide Pokok",
    "fullText": "Setiap pagi, Rani selalu merapikan tempat tidurnya. Ia kemudian membuka jendela agar udara segar masuk ke kamar. Setelah itu, Rani menyapu lantai dan menata buku-bukunya dengan rapi. Kamar Rani menjadi bersih dan nyaman.",
    "sentences": [
      {
        "id": 1,
        "text": "Setiap pagi, Rani selalu merapikan tempat tidurnya.",
        "type": "penjelas"
      },
      {
        "id": 2,
        "text": "Ia kemudian membuka jendela agar udara segar masuk ke kamar.",
        "type": "penjelas"
      },
      {
        "id": 3,
        "text": "Setelah itu, Rani menyapu lantai dan menata buku-bukunya dengan rapi.",
        "type": "penjelas"
      },
      {
        "id": 4,
        "text": "Kamar Rani menjadi bersih dan nyaman.",
        "type": "penjelas"
      }
    ],
    "idePokok": "Rani selalu menjaga kebersihan dan kerapian kamarnya.",
    "kalimatUtamaInfo": "Ide pokok tersirat dari seluruh kegiatan Rani dalam merawat kamar.",
    "mengapa": "Karena seluruh kalimat dalam paragraf ini menceritakan rangkaian kegiatan Rani dalam menjaga kebersihan kamar tidurnya.",
  },
  {
    "id": "text2",
    "title": "Contoh 2: Manfaat Membaca Buku",
    "badge": "Kalimat Utama di Awal",
    "fullText": "Membaca buku memiliki banyak manfaat. Dengan membaca, kita dapat memperoleh pengetahuan baru. Membaca juga dapat menambah kosakata dan melatih kemampuan memahami informasi.",
    "sentences": [
      {
        "id": 1,
        "text": "Membaca buku memiliki banyak manfaat.",
        "type": "utama"
      },
      {
        "id": 2,
        "text": "Dengan membaca, kita dapat memperoleh pengetahuan baru.",
        "type": "penjelas"
      },
      {
        "id": 3,
        "text": "Membaca juga dapat menambah kosakata dan melatih kemampuan memahami informasi.",
        "type": "penjelas"
      }
    ],
    "idePokok": "Manfaat membaca buku.",
    "kalimatUtamaInfo": "Kalimat 1: 'Membaca buku memiliki banyak manfaat.' (Di awal paragraf)",
    "mengapa": "Kalimat pertama menyatakan pernyataan umum, sedangkan kalimat kedua dan ketiga menjelaskan contoh-contoh manfaat membaca secara rinci.",
  },
  {
    "id": "text3",
    "title": "Contoh 3: Edo Bersepeda Bersama Ayah",
    "badge": "Menentukan Ide Pokok Paragraf",
    "fullText": "Ayah mengajak Edo bersepeda pada hari Minggu. Mereka bersepeda mengelilingi lingkungan rumah. Setelah beberapa saat, mereka berhenti untuk beristirahat. Edo merasa senang dapat bersepeda bersama ayahnya.",
    "sentences": [
      {
        "id": 1,
        "text": "Ayah mengajak Edo bersepeda pada hari Minggu.",
        "type": "utama"
      },
      {
        "id": 2,
        "text": "Mereka bersepeda mengelilingi lingkungan rumah.",
        "type": "penjelas"
      },
      {
        "id": 3,
        "text": "Setelah beberapa saat, mereka berhenti untuk beristirahat.",
        "type": "penjelas"
      },
      {
        "id": 4,
        "text": "Edo merasa senang dapat bersepeda bersama ayahnya.",
        "type": "penjelas"
      }
    ],
    "idePokok": "Edo bersepeda bersama ayahnya.",
    "kalimatUtamaInfo": "Kalimat 1: 'Ayah mengajak Edo bersepeda pada hari Minggu.'",
    "mengapa": "Fokus cerita dari awal hingga akhir adalah momen kebersamaan Edo dan ayahnya saat bersepeda keliling rumah.",
  },
  {
    "id": "text4",
    "title": "Contoh 4: Lina Membuat Kue",
    "badge": "Memahami Isi Bacaan (5W1H)",
    "fullText": "Pada hari Sabtu, Lina membantu ibu membuat kue. Lina menyiapkan tepung dan telur. Ibu kemudian mencampurkan semua bahan. Setelah kue matang, Lina membantu menyajikannya di meja.",
    "sentences": [
      {
        "id": 1,
        "text": "Pada hari Sabtu, Lina membantu ibu membuat kue.",
        "type": "utama"
      },
      {
        "id": 2,
        "text": "Lina menyiapkan tepung dan telur.",
        "type": "penjelas"
      },
      {
        "id": 3,
        "text": "Ibu kemudian mencampurkan semua bahan.",
        "type": "penjelas"
      },
      {
        "id": 4,
        "text": "Setelah kue matang, Lina membantu menyajikannya di meja.",
        "type": "penjelas"
      }
    ],
    "idePokok": "Lina membantu ibu membuat kue.",
    "kalimatUtamaInfo": "Kalimat 1",
    "mengapa": "Paragraf menceritakan proses Lina dan Ibu membuat kue bersama di hari Sabtu.",
    "qaList": [
      {
        "q": "Siapa yang membantu ibu?",
        "a": "Lina",
        "tag": "Siapa",
        "highlightSnippet": "Lina membantu ibu"
      },
      {
        "q": "Kapan kegiatan tersebut dilakukan?",
        "a": "Hari Sabtu",
        "tag": "Kapan",
        "highlightSnippet": "Pada hari Sabtu"
      },
      {
        "q": "Apa yang dibuat Lina dan ibu?",
        "a": "Kue",
        "tag": "Apa",
        "highlightSnippet": "membuat kue"
      },
      {
        "q": "Apa yang dilakukan Lina setelah kue matang?",
        "a": "Membantu menyajikannya di meja",
        "tag": "Bagaimana / Apa",
        "highlightSnippet": "membantu menyajikannya di meja"
      }
    ]
  },
  {
    "id": "text5",
    "title": "Contoh 5: Merawat Tanaman di Halaman",
    "badge": "Mencari Informasi Penting",
    "fullText": "Di halaman rumah terdapat berbagai tanaman. Ibu menanam bunga, cabai, dan tomat. Setiap pagi, Dika membantu menyiram tanaman. Dika juga mencabut rumput yang tumbuh di sekitar tanaman.",
    "sentences": [
      {
        "id": 1,
        "text": "Di halaman rumah terdapat berbagai tanaman.",
        "type": "utama"
      },
      {
        "id": 2,
        "text": "Ibu menanam bunga, cabai, dan tomat.",
        "type": "penjelas"
      },
      {
        "id": 3,
        "text": "Setiap pagi, Dika membantu menyiram tanaman.",
        "type": "penjelas"
      },
      {
        "id": 4,
        "text": "Dika juga mencabut rumput yang tumbuh di sekitar tanaman.",
        "type": "penjelas"
      }
    ],
    "idePokok": "Kegiatan merawat tanaman di halaman rumah.",
    "kalimatUtamaInfo": "Kalimat 1",
    "mengapa": "Seluruh kalimat menceritakan jenis tanaman di halaman dan bagaimana Dika beserta ibunya merawatnya.",
    "importantInfo": [
      "Ada berbagai tanaman di halaman rumah.",
      "Ibu menanam bunga, cabai, dan tomat.",
      "Dika membantu menyiram tanaman setiap pagi.",
      "Dika mencabut rumput liar di sekitar tanaman."
    ]
  },
  {
    "id": "text6",
    "title": "Contoh 6: Sinta dan Kucingnya Mimi",
    "badge": "Membuat Ringkasan & Cara Berpikir",
    "fullText": "Sinta memiliki seekor kucing bernama Mimi. Setiap pagi, Sinta memberi Mimi makanan dan minuman. Sinta juga membersihkan tempat tidur Mimi. Ia sangat menyayangi dan merawat Mimi dengan baik.",
    "sentences": [
      {
        "id": 1,
        "text": "Sinta memiliki seekor kucing bernama Mimi.",
        "type": "penjelas"
      },
      {
        "id": 2,
        "text": "Setiap pagi, Sinta memberi Mimi makanan dan minuman.",
        "type": "penjelas"
      },
      {
        "id": 3,
        "text": "Sinta juga membersihkan tempat tidur Mimi.",
        "type": "penjelas"
      },
      {
        "id": 4,
        "text": "Ia sangat menyayangi dan merawat Mimi dengan baik.",
        "type": "utama"
      }
    ],
    "idePokok": "Sinta menyayangi dan merawat kucingnya.",
    "kalimatUtamaInfo": "Tersirat dan ditegaskan pada kalimat terakhir.",
    "ringkasan": "Sinta menyayangi dan merawat kucingnya dengan baik.",
    "mengapa": "Ringkasan mengambil intisari penting dan menghilangkan rincian jadwal makan serta cara membersihkan tempat tidur.",
    "caraBerpikir": "Jangan langsung mencari kalimat terpanjang! Tanyakan: 'Paragraf ini paling banyak membahas apa?' Jawabannya: Kasih sayang Sinta merawat kucingnya."
  }
];
