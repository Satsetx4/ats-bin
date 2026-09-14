// Data Materi, Contoh Teks Laboratorium, Mini Games, dan Bank Soal (35 Butir)

const modulesData = [
    {
        id: 1,
        title: "Pengertian Paragraf",
        badge: "Modul 1",
        color: "blue",
        icon: "book-open",
        summary: "Paragraf adalah kumpulan beberapa kalimat yang membahas satu topik atau gagasan tertentu.",
        details: `
            <div class="space-y-4">
                <p class="text-slate-700 leading-relaxed">
                    Bayangkan sebuah paragraf seperti sebuah <strong>keluarga kalimat</strong>! Mereka berkumpul bersama untuk menceritakan satu hal yang sama.
                </p>
                <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                    <h5 class="font-bold text-blue-900 mb-2">Dalam sebuah paragraf biasanya terdapat:</h5>
                    <ul class="space-y-2 text-slate-700">
                        <li class="flex items-start gap-2">
                            <span class="bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-full font-bold mt-1">1</span>
                            <span><strong>Ide Pokok:</strong> Gagasan utama yang menjadi inti pembicaraan.</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-full font-bold mt-1">2</span>
                            <span><strong>Kalimat Penjelas:</strong> Kalimat-kalimat yang bertugas menjelaskan atau mendukung ide pokok tersebut.</span>
                        </li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        id: 2,
        title: "Ide Pokok",
        badge: "Modul 2",
        color: "amber",
        icon: "lightbulb",
        summary: "Ide pokok adalah gagasan utama yang menjadi dasar pembahasan dalam sebuah paragraf.",
        details: `
            <div class="space-y-4">
                <div class="p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <p class="font-semibold text-amber-900 text-center text-lg">💡 Ide Pokok = Gagasan Utama</p>
                </div>
                <div>
                    <h5 class="font-bold text-slate-800 mb-2">📍 Di mana letak Ide Pokok?</h5>
                    <ul class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-center">
                        <li class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm font-medium text-slate-700">Di <strong>awal</strong> paragraf</li>
                        <li class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm font-medium text-slate-700">Di <strong>akhir</strong> paragraf</li>
                        <li class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm font-medium text-slate-700">Tersirat dalam <strong>seluruh</strong> paragraf</li>
                    </ul>
                </div>
                <div class="bg-amber-100/60 p-4 rounded-xl border border-amber-300">
                    <h5 class="font-bold text-amber-950 mb-2">🔍 5 Langkah Menemukan Ide Pokok:</h5>
                    <ol class="list-decimal list-inside space-y-1.5 text-slate-800 text-sm">
                        <li>Baca paragraf dengan teliti.</li>
                        <li>Pahami semua kalimat dalam paragraf.</li>
                        <li>Tentukan hal yang paling banyak dibahas.</li>
                        <li>Cari kalimat yang paling mewakili isi paragraf.</li>
                        <li>Tuliskan inti pembahasannya dengan kalimat singkat.</li>
                    </ol>
                </div>
                <div class="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-3">
                    <span class="text-2xl">❓</span>
                    <p class="text-xs sm:text-sm text-emerald-900 font-medium">
                        <strong>Pertanyaan Bantuan:</strong> <em>"Paragraf ini membahas tentang apa?"</em> Jawabannya adalah ide pokoknya!
                    </p>
                </div>
            </div>
        `
    },
    {
        id: 3,
        title: "Kalimat Utama",
        badge: "Modul 3",
        color: "emerald",
        icon: "star",
        summary: "Kalimat utama adalah kalimat yang memuat ide pokok suatu paragraf.",
        details: `
            <div class="space-y-4">
                <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center font-bold text-emerald-800">
                    Kalimat Utama = Kalimat yang Berisi Ide Pokok
                </div>
                <h5 class="font-bold text-slate-800">Sifat-sifat Kalimat Utama:</h5>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                    <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <span class="text-emerald-500 font-bold text-base block mb-1">✔ Sifat 1</span>
                        Berisi gagasan utama paragraf.
                    </div>
                    <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <span class="text-emerald-500 font-bold text-base block mb-1">✔ Sifat 2</span>
                        Dapat berdiri sendiri sebagai kalimat utuh.
                    </div>
                    <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <span class="text-emerald-500 font-bold text-base block mb-1">✔ Sifat 3</span>
                        Menjadi dasar atau pokok bagi kalimat lainnya.
                    </div>
                </div>
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 text-sm">
                    <span class="font-bold text-slate-700 block mb-1">Contoh Analisis:</span>
                    <p class="italic text-slate-600 mb-2">"Menjaga kebersihan lingkungan sangat penting. Lingkungan yang bersih membuat kita nyaman. Sampah harus dibuang pada tempatnya."</p>
                    <p class="text-emerald-700"><strong>Kalimat utama:</strong> Menjaga kebersihan lingkungan sangat penting.</p>
                    <p class="text-amber-700"><strong>Ide pokok:</strong> Pentingnya menjaga kebersihan lingkungan.</p>
                </div>
            </div>
        `
    },
    {
        id: 4,
        title: "Kalimat Penjelas",
        badge: "Modul 4",
        color: "sky",
        icon: "message-square",
        summary: "Kalimat penjelas adalah kalimat yang memberikan informasi tambahan untuk menjelaskan ide pokok.",
        details: `
            <div class="space-y-4">
                <p class="text-slate-700 text-sm">
                    Kalimat penjelas bertugas memberi rincian, bukti, atau pendukung agar gagasan utama mudah dimengerti.
                </p>
                <h5 class="font-bold text-slate-800 text-sm">Kalimat penjelas dapat berupa:</h5>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div class="p-2.5 bg-sky-50 text-sky-800 rounded-lg font-medium text-center border border-sky-200">1. Contoh</div>
                    <div class="p-2.5 bg-sky-50 text-sky-800 rounded-lg font-medium text-center border border-sky-200">2. Alasan</div>
                    <div class="p-2.5 bg-sky-50 text-sky-800 rounded-lg font-medium text-center border border-sky-200">3. Keterangan</div>
                    <div class="p-2.5 bg-sky-50 text-sky-800 rounded-lg font-medium text-center border border-sky-200">4. Fakta</div>
                    <div class="p-2.5 bg-sky-50 text-sky-800 rounded-lg font-medium text-center border border-sky-200 col-span-2 sm:col-span-2">5. Penjelasan Lebih Lanjut</div>
                </div>
                <div class="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs sm:text-sm text-blue-900">
                    <strong>Trik Detektif:</strong> Jika kalimat utama berada di awal, maka kalimat-kalimat berikutnya adalah <strong>kalimat penjelas</strong>!
                </div>
            </div>
        `
    },
    {
        id: 5,
        title: "Memahami Isi Bacaan (5W1H)",
        badge: "Modul 5",
        color: "purple",
        icon: "compass",
        summary: "Memahami isi bacaan berarti mengetahui informasi yang disampaikan dalam suatu teks dengan kata tanya ADiKSiMBa.",
        details: `
            <div class="space-y-3">
                <p class="text-slate-700 text-sm">Gunakan rumus 6 kata tanya ajaib (ADiKSiMBa) saat membaca cerita:</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    <div class="p-3 bg-purple-50 rounded-xl border border-purple-200">
                        <strong class="text-purple-900">1. Apa?</strong>
                        <p class="text-slate-600">Mengetahui peristiwa atau hal yang dibicarakan.</p>
                    </div>
                    <div class="p-3 bg-purple-50 rounded-xl border border-purple-200">
                        <strong class="text-purple-900">2. Siapa?</strong>
                        <p class="text-slate-600">Mengetahui orang atau tokoh yang terlibat.</p>
                    </div>
                    <div class="p-3 bg-purple-50 rounded-xl border border-purple-200">
                        <strong class="text-purple-900">3. Kapan?</strong>
                        <p class="text-slate-600">Mengetahui waktu terjadinya peristiwa.</p>
                    </div>
                    <div class="p-3 bg-purple-50 rounded-xl border border-purple-200">
                        <strong class="text-purple-900">4. Di mana?</strong>
                        <p class="text-slate-600">Mengetahui tempat terjadinya peristiwa.</p>
                    </div>
                    <div class="p-3 bg-purple-50 rounded-xl border border-purple-200">
                        <strong class="text-purple-900">5. Mengapa?</strong>
                        <p class="text-slate-600">Mengetahui alasan atau penyebab peristiwa terjadi.</p>
                    </div>
                    <div class="p-3 bg-purple-50 rounded-xl border border-purple-200">
                        <strong class="text-purple-900">6. Bagaimana?</strong>
                        <p class="text-slate-600">Mengetahui proses atau cara suatu peristiwa terjadi.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 6,
        title: "Menjawab Pertanyaan Teks",
        badge: "Modul 6",
        color: "rose",
        icon: "check-circle",
        summary: "Tips menjawab pertanyaan berdasarkan bacaan dengan tepat dan tidak asal menebak.",
        details: `
            <div class="space-y-4">
                <ol class="list-decimal list-inside space-y-2 text-slate-700 text-sm">
                    <li><strong>Baca pertanyaan dengan teliti:</strong> Pahami apa yang sebenarnya ditanyakan.</li>
                    <li><strong>Ingat kembali isi bacaan:</strong> Buka kembali teks cerita jika lupa.</li>
                    <li><strong>Cari informasi yang sesuai:</strong> Temukan bukti kalimatnya di dalam teks.</li>
                    <li><strong>Jawab menggunakan kalimat yang jelas:</strong> Rangkai jawaban dengan rapi.</li>
                    <li><strong>Jangan menjawab berdasarkan tebakan:</strong> Semua jawaban pasti ada di dalam bacaan!</li>
                </ol>
                <div class="p-3 bg-rose-50 border-2 border-rose-300 rounded-xl text-rose-900 text-xs sm:text-sm font-semibold flex items-center gap-3">
                    <span class="text-xl">⚠️</span>
                    <span>PENTING: Jawaban harus selalu sesuai dengan fakta dan informasi yang ada di dalam bacaan!</span>
                </div>
            </div>
        `
    },
    {
        id: 7,
        title: "Menentukan Informasi Penting",
        badge: "Modul 7",
        color: "emerald",
        icon: "bookmark",
        summary: "Tidak semua informasi memiliki tingkat kepentingan yang sama. Cari yang paling utama!",
        details: `
            <div class="space-y-3">
                <p class="text-slate-700 text-sm">Informasi penting dalam cerita biasanya berkaitan erat dengan 8 unsur berikut:</p>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div class="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800">👤 Tokoh</div>
                    <div class="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800">📍 Tempat</div>
                    <div class="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800">⏰ Waktu</div>
                    <div class="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800">🏃 Kegiatan</div>
                    <div class="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800">⚡ Kejadian</div>
                    <div class="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800">💡 Alasan</div>
                    <div class="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800">🎯 Hasil</div>
                    <div class="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg font-medium text-emerald-800">✨ Manfaat</div>
                </div>
            </div>
        `
    },
    {
        id: 8,
        title: "Meringkas Isi Bacaan",
        badge: "Modul 8",
        color: "indigo",
        icon: "file-text",
        summary: "Ringkasan adalah bentuk singkat dari sebuah bacaan yang tetap memuat informasi penting.",
        details: `
            <div class="space-y-4">
                <div class="bg-indigo-50 border border-indigo-200 p-4 rounded-xl">
                    <h5 class="font-bold text-indigo-950 mb-2">5 Langkah Cara Membuat Ringkasan:</h5>
                    <ol class="list-decimal list-inside space-y-1 text-slate-700 text-sm">
                        <li>Baca seluruh bacaan secara menyeluruh.</li>
                        <li>Pahami isi setiap paragraf.</li>
                        <li>Tentukan informasi-informasi penting.</li>
                        <li>Hilangkan informasi atau rincian yang tidak diperlukan.</li>
                        <li>Gabungkan informasi penting menjadi cerita singkat yang padat.</li>
                    </ol>
                </div>
                <div class="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs sm:text-sm text-amber-900">
                    <strong>🧠 Trik Berpikir Detektif:</strong> Kalau ditanya <em>"Apa ide pokok paragraf tersebut?"</em>, <strong>JANGAN</strong> langsung mencari kalimat yang paling panjang! Tanyakan pada dirimu: <em>"Paragraf ini paling banyak membahas tentang apa?"</em>
                </div>
            </div>
        `
    }
];

// Flashcards "Cara Cepat Mengingat"
const flashcardsData = [
    {
        id: "fc1",
        front: "IDE POKOK",
        back: "Inti atau gagasan utama yang menjadi dasar pembahasan dalam sebuah paragraf.",
        color: "from-amber-400 to-amber-500",
        icon: "💡"
    },
    {
        id: "fc2",
        front: "KALIMAT UTAMA",
        back: "Kalimat yang memuat ide pokok suatu paragraf dan dapat berdiri sendiri.",
        color: "from-emerald-400 to-emerald-500",
        icon: "⭐"
    },
    {
        id: "fc3",
        front: "KALIMAT PENJELAS",
        back: "Kalimat yang menjelaskan, memberikan contoh, atau mendukung ide pokok.",
        color: "from-blue-400 to-blue-500",
        icon: "💬"
    },
    {
        id: "fc4",
        front: "ISI BACAAN",
        back: "Informasi keseluruhan yang disampaikan oleh penulis di dalam teks bacaan.",
        color: "from-purple-400 to-purple-500",
        icon: "📖"
    },
    {
        id: "fc5",
        front: "RINGKASAN",
        back: "Bentuk singkat dari sebuah bacaan yang tetap memuat informasi penting.",
        color: "from-rose-400 to-rose-500",
        icon: "📝"
    }
];

// 6 Teks Laboratorium Bedah Teks
const labTextsData = [
    {
        id: "text1",
        title: "Contoh 1: Kamar Rani",
        badge: "Menentukan Ide Pokok",
        fullText: "Setiap pagi, Rani selalu merapikan tempat tidurnya. Ia kemudian membuka jendela agar udara segar masuk ke kamar. Setelah itu, Rani menyapu lantai dan menata buku-bukunya dengan rapi. Kamar Rani menjadi bersih dan nyaman.",
        sentences: [
            { id: 1, text: "Setiap pagi, Rani selalu merapikan tempat tidurnya.", type: "penjelas" },
            { id: 2, text: "Ia kemudian membuka jendela agar udara segar masuk ke kamar.", type: "penjelas" },
            { id: 3, text: "Setelah itu, Rani menyapu lantai dan menata buku-bukunya dengan rapi.", type: "penjelas" },
            { id: 4, text: "Kamar Rani menjadi bersih dan nyaman.", type: "penjelas" }
        ],
        idePokok: "Rani selalu menjaga kebersihan dan kerapian kamarnya.",
        kalimatUtamaInfo: "Ide pokok tersirat dari seluruh kegiatan Rani dalam merawat kamar.",
        mengapa: "Karena seluruh kalimat dalam paragraf ini menceritakan rangkaian kegiatan Rani dalam menjaga kebersihan kamar tidurnya.",
        analysisTips: "Seluruh kalimat bekerja sama menggambarkan usaha Rani merapikan tempat tidur, jendela, lantai, dan buku."
    },
    {
        id: "text2",
        title: "Contoh 2: Manfaat Membaca Buku",
        badge: "Kalimat Utama di Awal",
        fullText: "Membaca buku memiliki banyak manfaat. Dengan membaca, kita dapat memperoleh pengetahuan baru. Membaca juga dapat menambah kosakata dan melatih kemampuan memahami informasi.",
        sentences: [
            { id: 1, text: "Membaca buku memiliki banyak manfaat.", type: "utama" },
            { id: 2, text: "Dengan membaca, kita dapat memperoleh pengetahuan baru.", type: "penjelas" },
            { id: 3, text: "Membaca juga dapat menambah kosakata dan melatih kemampuan memahami informasi.", type: "penjelas" }
        ],
        idePokok: "Manfaat membaca buku.",
        kalimatUtamaInfo: "Kalimat 1: 'Membaca buku memiliki banyak manfaat.' (Di awal paragraf)",
        mengapa: "Kalimat pertama menyatakan pernyataan umum, sedangkan kalimat kedua dan ketiga menjelaskan contoh-contoh manfaat membaca secara rinci.",
        analysisTips: "Kalimat penjelas: 1) Memperoleh pengetahuan baru, 2) Menambah kosakata, 3) Melatih kemampuan memahami informasi."
    },
    {
        id: "text3",
        title: "Contoh 3: Edo Bersepeda Bersama Ayah",
        badge: "Menentukan Ide Pokok Paragraf",
        fullText: "Ayah mengajak Edo bersepeda pada hari Minggu. Mereka bersepeda mengelilingi lingkungan rumah. Setelah beberapa saat, mereka berhenti untuk beristirahat. Edo merasa senang dapat bersepeda bersama ayahnya.",
        sentences: [
            { id: 1, text: "Ayah mengajak Edo bersepeda pada hari Minggu.", type: "utama" },
            { id: 2, text: "Mereka bersepeda mengelilingi lingkungan rumah.", type: "penjelas" },
            { id: 3, text: "Setelah beberapa saat, mereka berhenti untuk beristirahat.", type: "penjelas" },
            { id: 4, text: "Edo merasa senang dapat bersepeda bersama ayahnya.", type: "penjelas" }
        ],
        idePokok: "Edo bersepeda bersama ayahnya.",
        kalimatUtamaInfo: "Kalimat 1: 'Ayah mengajak Edo bersepeda pada hari Minggu.'",
        mengapa: "Fokus cerita dari awal hingga akhir adalah momen kebersamaan Edo dan ayahnya saat bersepeda keliling rumah.",
        analysisTips: "Tanyakan: 'Paragraf ini membahas tentang siapa dan sedang apa?' -> Edo bersepeda bersama ayahnya."
    },
    {
        id: "text4",
        title: "Contoh 4: Lina Membuat Kue",
        badge: "Memahami Isi Bacaan (5W1H)",
        fullText: "Pada hari Sabtu, Lina membantu ibu membuat kue. Lina menyiapkan tepung dan telur. Ibu kemudian mencampurkan semua bahan. Setelah kue matang, Lina membantu menyajikannya di meja.",
        sentences: [
            { id: 1, text: "Pada hari Sabtu, Lina membantu ibu membuat kue.", type: "utama" },
            { id: 2, text: "Lina menyiapkan tepung dan telur.", type: "penjelas" },
            { id: 3, text: "Ibu kemudian mencampurkan semua bahan.", type: "penjelas" },
            { id: 4, text: "Setelah kue matang, Lina membantu menyajikannya di meja.", type: "penjelas" }
        ],
        idePokok: "Lina membantu ibu membuat kue.",
        kalimatUtamaInfo: "Kalimat 1",
        mengapa: "Paragraf menceritakan proses Lina dan Ibu membuat kue bersama di hari Sabtu.",
        qaList: [
            { q: "Siapa yang membantu ibu?", a: "Lina", tag: "Siapa", highlightSnippet: "Lina membantu ibu" },
            { q: "Kapan kegiatan tersebut dilakukan?", a: "Hari Sabtu", tag: "Kapan", highlightSnippet: "Pada hari Sabtu" },
            { q: "Apa yang dibuat Lina dan ibu?", a: "Kue", tag: "Apa", highlightSnippet: "membuat kue" },
            { q: "Apa yang dilakukan Lina setelah kue matang?", a: "Membantu menyajikannya di meja", tag: "Bagaimana / Apa", highlightSnippet: "membantu menyajikannya di meja" }
        ]
    },
    {
        id: "text5",
        title: "Contoh 5: Merawat Tanaman di Halaman",
        badge: "Mencari Informasi Penting",
        fullText: "Di halaman rumah terdapat berbagai tanaman. Ibu menanam bunga, cabai, dan tomat. Setiap pagi, Dika membantu menyiram tanaman. Dika juga mencabut rumput yang tumbuh di sekitar tanaman.",
        sentences: [
            { id: 1, text: "Di halaman rumah terdapat berbagai tanaman.", type: "utama" },
            { id: 2, text: "Ibu menanam bunga, cabai, dan tomat.", type: "penjelas" },
            { id: 3, text: "Setiap pagi, Dika membantu menyiram tanaman.", type: "penjelas" },
            { id: 4, text: "Dika juga mencabut rumput yang tumbuh di sekitar tanaman.", type: "penjelas" }
        ],
        idePokok: "Kegiatan merawat tanaman di halaman rumah.",
        kalimatUtamaInfo: "Kalimat 1",
        mengapa: "Seluruh kalimat menceritakan jenis tanaman di halaman dan bagaimana Dika beserta ibunya merawatnya.",
        importantInfo: [
            "Ada berbagai tanaman di halaman rumah.",
            "Ibu menanam bunga, cabai, dan tomat.",
            "Dika membantu menyiram tanaman setiap pagi.",
            "Dika mencabut rumput liar di sekitar tanaman."
        ]
    },
    {
        id: "text6",
        title: "Contoh 6: Sinta dan Kucingnya Mimi",
        badge: "Membuat Ringkasan & Cara Berpikir",
        fullText: "Sinta memiliki seekor kucing bernama Mimi. Setiap pagi, Sinta memberi Mimi makanan dan minuman. Sinta juga membersihkan tempat tidur Mimi. Ia sangat menyayangi dan merawat Mimi dengan baik.",
        sentences: [
            { id: 1, text: "Sinta memiliki seekor kucing bernama Mimi.", type: "penjelas" },
            { id: 2, text: "Setiap pagi, Sinta memberi Mimi makanan dan minuman.", type: "penjelas" },
            { id: 3, text: "Sinta juga membersihkan tempat tidur Mimi.", type: "penjelas" },
            { id: 4, text: "Ia sangat menyayangi dan merawat Mimi dengan baik.", type: "utama" }
        ],
        idePokok: "Sinta menyayangi dan merawat kucingnya.",
        kalimatUtamaInfo: "Tersirat dan ditegaskan pada kalimat terakhir.",
        ringkasan: "Sinta menyayangi dan merawat kucingnya dengan baik.",
        mengapa: "Ringkasan mengambil intisari penting dan menghilangkan rincian jadwal makan serta cara membersihkan tempat tidur.",
        caraBerpikir: "Jangan langsung mencari kalimat terpanjang! Tanyakan: 'Paragraf ini paling banyak membahas apa?' Jawabannya: Kasih sayang Sinta merawat kucingnya."
    }
];

// Mini Games Data
const miniGamesData = {
    // Game 1: Pilah Kalimat (Utama vs Penjelas)
    pilahKalimat: [
        {
            id: 1,
            sentence: "Menjaga kebersihan lingkungan sangat penting bagi kita semua.",
            type: "utama",
            reason: "Kalimat ini memuat inti gagasan umum yang menjadi dasar kalimat lainnya."
        },
        {
            id: 2,
            sentence: "Sampah plastik harus dibuang ke tempat sampah anorganik.",
            type: "penjelas",
            reason: "Ini adalah rincian/contoh tindakan untuk mendukung pentingnya menjaga kebersihan."
        },
        {
            id: 3,
            sentence: "Membaca buku memiliki banyak manfaat bagi perkembangan otak.",
            type: "utama",
            reason: "Kalimat utama yang menyatakan gagasan pokok mengenai faedah membaca."
        },
        {
            id: 4,
            sentence: "Dengan membaca, kita dapat mengenal berbagai ilmu pengetahuan baru.",
            type: "penjelas",
            reason: "Menjelaskan salah satu bukti manfaat membaca."
        },
        {
            id: 5,
            sentence: "Lina menyiapkan tepung dan telur di atas meja dapur.",
            type: "penjelas",
            reason: "Memberikan rincian kegiatan memasak kue bersama ibu."
        },
        {
            id: 6,
            sentence: "Olahraga lari pagi membuat tubuh kita menjadi sehat dan bugar.",
            type: "utama",
            reason: "Inti pembicaraan umum mengenai manfaat lari pagi."
        },
        {
            id: 7,
            sentence: "Keringat yang keluar saat berolahraga membantu membuang racun tubuh.",
            type: "penjelas",
            reason: "Menjelaskan alasan ilmiah mengapa tubuh menjadi sehat saat olahraga."
        },
        {
            id: 8,
            sentence: "Dika mencabut rumput liar yang tumbuh di samping pot bunga.",
            type: "penjelas",
            reason: "Kalimat rincian kegiatan merawat tanaman di halaman rumah."
        }
    ],

    // Game 2: Pasangkan 5W1H (ADiKSiMBa)
    pasangKataTanya: [
        { qWord: "Apa?", targetMatch: "Peristiwa atau hal yang dibicarakan", desc: "Menanyakan kejadian atau benda" },
        { qWord: "Siapa?", targetMatch: "Orang atau tokoh yang terlibat", desc: "Menanyakan pelaku atau orang" },
        { qWord: "Kapan?", targetMatch: "Waktu terjadinya peristiwa", desc: "Menanyakan jam, hari, tanggal, atau suasana waktu" },
        { qWord: "Di mana?", targetMatch: "Tempat terjadinya peristiwa", desc: "Menanyakan lokasi atau tempat" },
        { qWord: "Mengapa?", targetMatch: "Alasan atau penyebab peristiwa terjadi", desc: "Menanyakan alasan atau latar belakang" },
        { qWord: "Bagaimana?", targetMatch: "Proses atau cara peristiwa terjadi", desc: "Menanyakan langkah atau urutan kejadian" }
    ]
};

// Bank Soal Komprehensif (35 Butir Soal)
const questionBankData = [
    // --- Kategori A: Pengertian Paragraf & Ide Pokok (Soal 1 - 9) ---
    {
        id: 1,
        category: "A",
        categoryName: "Paragraf & Ide Pokok",
        passage: "",
        question: "Kumpulan beberapa kalimat yang membahas satu topik atau gagasan tertentu disebut ....",
        options: ["Huruf", "Kata", "Paragraf", "Puisi"],
        correctAnswer: 2,
        explanation: "Paragraf adalah kumpulan beberapa kalimat yang saling berkaitan dan membahas satu topik atau gagasan tertentu.",
        detectiveTip: "Ingat kembali Modul 1: Beberapa kalimat yang berkumpul membahas topik sama dinamakan paragraf!"
    },
    {
        id: 2,
        category: "A",
        categoryName: "Paragraf & Ide Pokok",
        passage: "",
        question: "Gagasan utama yang menjadi dasar pembahasan dalam sebuah paragraf disebut ....",
        options: ["Kalimat penjelas", "Ide pokok", "Judul cerita", "Kata pengantar"],
        correctAnswer: 1,
        explanation: "Ide pokok sama dengan gagasan utama, yaitu inti yang menjadi dasar pengembangan seluruh paragraf.",
        detectiveTip: "Ide Pokok = Gagasan Utama = Inti Paragraf."
    },
    {
        id: 3,
        category: "A",
        categoryName: "Paragraf & Ide Pokok",
        passage: "",
        question: "Di mana saja letak ide pokok dapat ditemukan dalam sebuah paragraf?",
        options: [
            "Hanya di awal paragraf saja",
            "Di awal, di akhir, atau tersirat dalam seluruh paragraf",
            "Hanya di baris paling bawah",
            "Selalu di luar teks bacaan"
        ],
        correctAnswer: 1,
        explanation: "Ide pokok bisa berada di awal kalimat (deduktif), di akhir kalimat (induktif), atau menyebar tersirat di seluruh kalimat.",
        detectiveTip: "Periksa awal paragraf lebih dahulu, jika tidak ada cek akhir atau baca keseluruhan."
    },
    {
        id: 4,
        category: "A",
        categoryName: "Paragraf & Ide Pokok",
        passage: "Setiap pagi, Rani selalu merapikan tempat tidurnya. Ia kemudian membuka jendela agar udara segar masuk ke kamar. Setelah itu, Rani menyapu lantai dan menata buku-bukunya dengan rapi. Kamar Rani menjadi bersih dan nyaman.",
        question: "Ide pokok dari paragraf tentang Rani di atas adalah ....",
        options: [
            "Rani membeli kasur baru",
            "Rani selalu menjaga kebersihan dan kerapian kamarnya",
            "Jendela kamar Rani sangat lebar",
            "Buku pelajaran Rani sangat tebal"
        ],
        correctAnswer: 1,
        explanation: "Semua kalimat dalam paragraf tersebut menceritakan kebiasaan Rani merapikan tempat tidur, menyapu, dan menata buku agar kamarnya bersih.",
        detectiveTip: "Tanyakan: Paragraf ini membahas apa? Jawabannya: Rani menjaga kebersihan kamarnya."
    },
    {
        id: 5,
        category: "A",
        categoryName: "Paragraf & Ide Pokok",
        passage: "",
        question: "Pertanyaan bantuan paling tepat yang dapat kita ajukan untuk menemukan ide pokok adalah ....",
        options: [
            "Berapa jumlah kata dalam paragraf ini?",
            "Siapakah penerbit buku ini?",
            "Paragraf ini membahas tentang apa?",
            "Berapa harga buku cerita ini?"
        ],
        correctAnswer: 2,
        explanation: "Pertanyaan 'Paragraf ini membahas tentang apa?' langsung menuntun kita pada inti masalah yang dibahas.",
        detectiveTip: "Gunakan pertanyaan bantuan emas: 'Membahas tentang apa?'"
    },
    {
        id: 6,
        category: "A",
        categoryName: "Paragraf & Ide Pokok",
        passage: "Ayah mengajak Edo bersepeda pada hari Minggu. Mereka bersepeda mengelilingi lingkungan rumah. Setelah beberapa saat, mereka berhenti untuk beristirahat. Edo merasa senang dapat bersepeda bersama ayahnya.",
        question: "Apa gagasan utama atau ide pokok dari cerita di atas?",
        options: [
            "Ayah membeli sepeda balap baru",
            "Edo bersepeda bersama ayahnya",
            "Lingkungan rumah Edo sangat luas",
            "Edo kelelahan mengayuh sepeda"
        ],
        correctAnswer: 1,
        explanation: "Paragraf tersebut secara garis besar menceritakan pengalaman Edo bersepeda bersama ayahnya di hari Minggu.",
        detectiveTip: "Fokus pada kegiatan utama para tokoh di dalam cerita."
    },
    {
        id: 7,
        category: "A",
        categoryName: "Paragraf & Ide Pokok",
        passage: "",
        question: "Berikut ini yang BUKAN merupakan langkah menemukan ide pokok adalah ....",
        options: [
            "Membaca paragraf dengan teliti",
            "Menentukan hal yang paling banyak dibahas",
            "Memilih kalimat yang paling panjang hurufnya",
            "Mencari kalimat yang paling mewakili isi paragraf"
        ],
        correctAnswer: 2,
        explanation: "Kalimat terpanjang belum tentu berisi ide pokok. Kita tidak boleh asal memilih kalimat hanya karena panjangnya.",
        detectiveTip: "Pesan Detektif: Jangan terkecoh kalimat paling panjang!"
    },
    {
        id: 8,
        category: "A",
        categoryName: "Paragraf & Ide Pokok",
        passage: "Matahari bersinar terang di pagi hari. Kicauan burung terdengar merdu di atas ranting pohon. Udara pagi terasa sejuk menyegarkan. Suasana pagi hari di desa sangat damai dan indah.",
        question: "Ide pokok paragraf tersebut terletak di ....",
        options: [
            "Awal paragraf",
            "Tengah paragraf",
            "Akhir paragraf",
            "Tersirat di judul"
        ],
        correctAnswer: 2,
        explanation: "Kalimat terakhir 'Suasana pagi hari di desa sangat damai dan indah' menyimpulkan keseluruhan kalimat sebelumnya (paragraf induktif).",
        detectiveTip: "Jika kalimat terakhir merupakan simpulan umum, maka ide pokok ada di akhir paragraf."
    },
    {
        id: 9,
        category: "A",
        categoryName: "Paragraf & Ide Pokok",
        passage: "",
        question: "Sebuah paragraf yang baik biasanya hanya memuat ... ide pokok.",
        options: ["Satu", "Dua", "Lima", "Banyak sekali"],
        correctAnswer: 0,
        explanation: "Satu paragraf yang padu hanya membahas satu topik atau satu ide pokok utama.",
        detectiveTip: "Satu paragraf = satu ide pokok."
    },

    // --- Kategori B: Kalimat Utama & Kalimat Penjelas (Soal 10 - 18) ---
    {
        id: 10,
        category: "B",
        categoryName: "Kalimat Utama & Penjelas",
        passage: "",
        question: "Kalimat yang di dalamnya memuat ide pokok suatu paragraf dinamakan ....",
        options: ["Kalimat penjelas", "Kalimat utama", "Kalimat tanya", "Kalimat perintah"],
        correctAnswer: 1,
        explanation: "Kalimat utama adalah kalimat yang memuat ide pokok atau gagasan utama paragraf.",
        detectiveTip: "Kalimat Utama adalah 'rumah' bagi Ide Pokok."
    },
    {
        id: 11,
        category: "B",
        categoryName: "Kalimat Utama & Penjelas",
        passage: "",
        question: "Berikut ini yang merupakan salah satu sifat dari kalimat utama adalah ....",
        options: [
            "Tidak dapat berdiri sendiri",
            "Hanya berisi contoh-contoh kecil",
            "Dapat berdiri sendiri dan menjadi dasar bagi kalimat lainnya",
            "Selalu berisi tanda seru"
        ],
        correctAnswer: 2,
        explanation: "Kalimat utama bersifat umum, dapat berdiri sendiri tanpa kalimat lain, dan mendasari kalimat penjelas.",
        detectiveTip: "3 Sifat: berisi gagasan utama, dapat berdiri sendiri, dasar kalimat lain."
    },
    {
        id: 12,
        category: "B",
        categoryName: "Kalimat Utama & Penjelas",
        passage: "Membaca buku memiliki banyak manfaat. Dengan membaca, kita dapat memperoleh pengetahuan baru. Membaca juga dapat menambah kosakata dan melatih kemampuan memahami informasi.",
        question: "Kalimat utama pada paragraf di atas adalah ....",
        options: [
            "Membaca buku memiliki banyak manfaat.",
            "Dengan membaca, kita dapat memperoleh pengetahuan baru.",
            "Membaca juga dapat menambah kosakata.",
            "Melatih kemampuan memahami informasi."
        ],
        correctAnswer: 0,
        explanation: "Kalimat pertama merupakan kalimat utama yang menyatakan pernyataan umum tentang manfaat membaca buku.",
        detectiveTip: "Kalimat 1 menyatakan hal umum, kalimat 2 dan 3 memberi rincian contoh manfaatnya."
    },
    {
        id: 13,
        category: "B",
        categoryName: "Kalimat Utama & Penjelas",
        passage: "",
        question: "Kalimat yang berfungsi memberikan informasi tambahan, contoh, atau alasan untuk menjelaskan ide pokok disebut ....",
        options: ["Kalimat sapaan", "Kalimat utama", "Kalimat penjelas", "Kalimat tanya"],
        correctAnswer: 2,
        explanation: "Kalimat penjelas bertugas menjelaskan, menguraikan, dan mendukung kalimat utama.",
        detectiveTip: "Kata kuncinya: 'menjelaskan / memberi informasi tambahan' = Kalimat Penjelas."
    },
    {
        id: 14,
        category: "B",
        categoryName: "Kalimat Utama & Penjelas",
        passage: "Menjaga kebersihan lingkungan sangat penting. (1) Lingkungan yang bersih membuat kita merasa nyaman. (2) Sampah harus dibuang pada tempatnya. (3) Lingkungan juga perlu dibersihkan secara rutin. (4)",
        question: "Berdasarkan kutipan di atas, kalimat nomor (2), (3), dan (4) berkedudukan sebagai ....",
        options: [
            "Kalimat penjelas",
            "Kalimat utama",
            "Judul paragraf",
            "Gagasan pokok"
        ],
        correctAnswer: 0,
        explanation: "Kalimat pertama adalah kalimat utama, sedangkan kalimat nomor (2), (3), dan (4) adalah kalimat-kalimat penjelas.",
        detectiveTip: "Kalimat penjelas menguraikan alasan nyaman dan cara merawat kebersihan."
    },
    {
        id: 15,
        category: "B",
        categoryName: "Kalimat Utama & Penjelas",
        passage: "",
        question: "Kalimat penjelas dalam sebuah paragraf dapat berupa hal-hal berikut, KECUALI ....",
        options: [
            "Contoh-contoh nyata",
            "Alasan atau keterangan",
            "Fakta atau data pendukung",
            "Inti masalah yang berdiri sendiri tanpa bukti"
        ],
        correctAnswer: 3,
        explanation: "Inti masalah umum adalah sifat kalimat utama, bukan kalimat penjelas. Kalimat penjelas berupa contoh, alasan, keterangan, dan fakta.",
        detectiveTip: "Kalimat penjelas selalu berupa uraian detail atau contoh bukti."
    },
    {
        id: 16,
        category: "B",
        categoryName: "Kalimat Utama & Penjelas",
        passage: "(1) Buah jeruk kaya akan vitamin C. (2) Vitamin C sangat baik untuk menjaga daya tahan tubuh kita. (3) Selain itu, vitamin C juga dapat mencegah sariawan.",
        question: "Kalimat utama pada kutipan di atas terdapat pada nomor ....",
        options: ["(1)", "(2)", "(3)", "Semua kalimat"],
        correctAnswer: 0,
        explanation: "Nomor (1) adalah kalimat utama. Kalimat (2) dan (3) adalah penjelas yang menerangkan kegunaan vitamin C yang ada di buah jeruk.",
        detectiveTip: "Pernyataan paling umum ada pada kalimat pertama."
    },
    {
        id: 17,
        category: "B",
        categoryName: "Kalimat Utama & Penjelas",
        passage: "",
        question: "Apa perbedaan paling mendasar antara kalimat utama dan kalimat penjelas?",
        options: [
            "Kalimat utama berisi inti topik, sedangkan kalimat penjelas berisi rincian pendukung",
            "Kalimat utama selalu pendek, sedangkan kalimat penjelas selalu panjang",
            "Kalimat utama tidak boleh ada titik, sedangkan kalimat penjelas ada koma",
            "Kalimat utama ditulis dengan huruf besar semua"
        ],
        correctAnswer: 0,
        explanation: "Kalimat utama memuat inti bahasan umum, sedangkan kalimat penjelas memaparkan rincian, bukti, dan contoh.",
        detectiveTip: "Ingat peran keduanya: Satu sebagai ketua (inti), yang lain sebagai anggota pendukung (rincian)."
    },
    {
        id: 18,
        category: "B",
        categoryName: "Kalimat Utama & Penjelas",
        passage: "Kucing adalah hewan peliharaan yang menggemaskan. Bulunya yang halus sangat lembut saat dibelai. Tingkah lakunya saat bermain bola wol selalu membuat kita tersenyum.",
        question: "Berapa jumlah kalimat penjelas pada paragraf di atas?",
        options: ["1 kalimat", "2 kalimat", "3 kalimat", "4 kalimat"],
        correctAnswer: 1,
        explanation: "Ada 3 kalimat total. Kalimat ke-1 kalimat utama, kalimat ke-2 dan ke-3 adalah 2 kalimat penjelas.",
        detectiveTip: "Hitung total kalimat, lalu kurangi kalimat utama (3 - 1 = 2)."
    },

    // --- Kategori C: Memahami Isi Bacaan & 5W1H (Soal 19 - 27) ---
    {
        id: 19,
        category: "C",
        categoryName: "Memahami Bacaan (5W1H)",
        passage: "",
        question: "Kata tanya yang digunakan untuk menanyakan orang atau tokoh yang terlibat dalam suatu peristiwa adalah ....",
        options: ["Apa", "Siapa", "Kapan", "Di mana"],
        correctAnswer: 1,
        explanation: "'Siapa' berfungsi menanyakan orang, pelaku, atau tokoh di dalam cerita.",
        detectiveTip: "Siapa = Tokoh / Orang."
    },
    {
        id: 20,
        category: "C",
        categoryName: "Memahami Bacaan (5W1H)",
        passage: "Pada hari Sabtu, Lina membantu ibu membuat kue di dapur. Lina menyiapkan tepung dan telur dengan hati-hati.",
        question: "Kapan peristiwa tersebut terjadi?",
        options: ["Hari Minggu", "Hari Sabtu", "Hari Senin", "Hari libur nasional"],
        correctAnswer: 1,
        explanation: "Di awal teks tertulis jelas: 'Pada hari Sabtu, Lina membantu ibu membuat kue'.",
        detectiveTip: "Kata tanya 'Kapan' dijawab dengan waktu (Hari Sabtu)."
    },
    {
        id: 21,
        category: "C",
        categoryName: "Memahami Bacaan (5W1H)",
        passage: "Di halaman rumah terdapat berbagai tanaman. Ibu menanam bunga, cabai, dan tomat. Setiap pagi, Dika membantu menyiram tanaman.",
        question: "Di mana letak tanaman-tanaman tersebut berada?",
        options: ["Di kebun sekolah", "Di dalam ruang tamu", "Di halaman rumah", "Di pasar tradisional"],
        correctAnswer: 2,
        explanation: "Berdasarkan kalimat pertama teks: 'Di halaman rumah terdapat berbagai tanaman'.",
        detectiveTip: "Kata tanya 'Di mana' dijawab dengan tempat / lokasi."
    },
    {
        id: 22,
        category: "C",
        categoryName: "Memahami Bacaan (5W1H)",
        passage: "Beni tidak masuk sekolah karena ia sedang demam tinggi. Dokter menyarankan Beni untuk beristirahat di rumah selama dua hari.",
        question: "Mengapa Beni tidak masuk sekolah?",
        options: [
            "Karena sepedanya rusak",
            "Karena ia sedang demam tinggi",
            "Karena ia ingin bermain game",
            "Karena bangun kesiangan"
        ],
        correctAnswer: 1,
        explanation: "Kata tanya 'Mengapa' menanyakan alasan atau sebab: 'karena ia sedang demam tinggi'.",
        detectiveTip: "Mengapa selalu berhubungan dengan kata 'karena' atau 'sebab'."
    },
    {
        id: 23,
        category: "C",
        categoryName: "Memahami Bacaan (5W1H)",
        passage: "Ibu mencampurkan tepung, gula, dan telur ke dalam wadah besar, lalu mengaduknya secara merata menggunakan mixer.",
        question: "Kata tanya yang tepat untuk mengetahui langkah-langkah ibu mencampur adonan tersebut adalah ....",
        options: ["Siapa", "Bagaimana", "Kapan", "Di mana"],
        correctAnswer: 1,
        explanation: "Kata tanya 'Bagaimana' menanyakan proses, cara, atau langkah terjadinya sesuatu.",
        detectiveTip: "Bagaimana = Menanyakan cara atau proses."
    },
    {
        id: 24,
        category: "C",
        categoryName: "Memahami Bacaan (5W1H)",
        passage: "Setelah kue matang, Lina membantu menyajikannya di meja makan.",
        question: "Apa yang dilakukan Lina setelah kue matang?",
        options: [
            "Membeli tepung tambahan",
            "Membantu menyajikannya di meja makan",
            "Tidur siang di kamar",
            "Pergi bermain bersama teman"
        ],
        correctAnswer: 1,
        explanation: "Sesuai isi bacaan: 'Lina membantu menyajikannya di meja makan'.",
        detectiveTip: "Cari kalimat yang memuat kata kunci 'setelah kue matang'."
    },
    {
        id: 25,
        category: "C",
        categoryName: "Memahami Bacaan (5W1H)",
        passage: "",
        question: "Ketika menjawab pertanyaan berdasarkan sebuah bacaan, aturan terpenting yang harus kita patuhi adalah ....",
        options: [
            "Boleh menebak sesuka hati asalkan cepat",
            "Jawaban harus sesuai dengan informasi yang ada dalam bacaan",
            "Menjawab dengan tulisan sepanjang mungkin",
            "Mengarang cerita baru yang lebih seru"
        ],
        correctAnswer: 1,
        explanation: "Semua jawaban pertanyaan teks harus sesuai dan berlandaskan fakta yang ada di dalam bacaan, tidak boleh menebak.",
        detectiveTip: "Aturan emas: Cari buktinya di dalam teks sebelum menjawab!"
    },
    {
        id: 26,
        category: "C",
        categoryName: "Memahami Bacaan (5W1H)",
        passage: "Dika mencabut rumput yang tumbuh liar di sekitar pot cabai agar tanaman cabai tumbuh subur.",
        question: "Apa tujuan Dika mencabut rumput liar tersebut?",
        options: [
            "Untuk makanan kelinci",
            "Agar tanaman cabai tumbuh subur",
            "Karena disuruh tetangga",
            "Untuk dijadikan hiasan"
        ],
        correctAnswer: 1,
        explanation: "Teks menyebutkan 'agar tanaman cabai tumbuh subur'. Kata 'agar' menunjukkan tujuan/maksud kegiatan.",
        detectiveTip: "Perhatikan kata penghubung seperti 'agar' atau 'supaya'."
    },
    {
        id: 27,
        category: "C",
        categoryName: "Memahami Bacaan (5W1H)",
        passage: "",
        question: "Singkatan ADiKSiMBa merupakan padanan bahasa Indonesia untuk 5W1H. Huruf 'M' dan 'Ba' merupakan singkatan dari ....",
        options: [
            "Melihat dan Membaca",
            "Mengapa dan Bagaimana",
            "Mendengar dan Bekerja",
            "Mencari dan Berlari"
        ],
        correctAnswer: 1,
        explanation: "ADiKSiMBa = Apa, Di mana, Kapan, Siapa, Mengapa, Bagaimana.",
        detectiveTip: "A = Apa, Di = Di mana, K = Kapan, Si = Siapa, M = Mengapa, Ba = Bagaimana."
    },

    // --- Kategori D: Informasi Penting & Ringkasan (Soal 28 - 35) ---
    {
        id: 28,
        category: "D",
        categoryName: "Informasi Penting & Ringkasan",
        passage: "",
        question: "Bentuk singkat dari sebuah bacaan yang tetap memuat intisari dan informasi penting dinamakan ....",
        options: ["Dongeng", "Ringkasan", "Puisi", "Kamus"],
        correctAnswer: 1,
        explanation: "Ringkasan adalah penyajian singkat dari suatu bacaan panjang dengan tetap mempertahankan isi pokoknya.",
        detectiveTip: "Cerita panjang yang dibuat pendek tanpa mengubah isi = Ringkasan."
    },
    {
        id: 29,
        category: "D",
        categoryName: "Informasi Penting & Ringkasan",
        passage: "Sinta memiliki seekor kucing bernama Mimi. Setiap pagi, Sinta memberi Mimi makanan dan minuman. Sinta juga membersihkan tempat tidur Mimi. Ia sangat menyayangi dan merawat Mimi dengan baik.",
        question: "Ringkasan yang paling tepat untuk bacaan tentang Sinta dan Mimi adalah ....",
        options: [
            "Sinta memiliki kucing galak yang suka mencakar sofa",
            "Sinta menyayangi dan merawat kucingnya dengan baik",
            "Mimi suka makan ikan goreng setiap sore",
            "Tempat tidur kucing Sinta terbuat dari kayu jati"
        ],
        correctAnswer: 1,
        explanation: "Kalimat 'Sinta menyayangi dan merawat kucingnya dengan baik' merangkum seluruh kegiatan memberi makan dan membersihkan tempat tidur Mimi.",
        detectiveTip: "Ringkasan mencakup inti seluruh kegiatan secara padat."
    },
    {
        id: 30,
        category: "D",
        categoryName: "Informasi Penting & Ringkasan",
        passage: "",
        question: "Langkah pertama yang paling awal dilakukan saat akan membuat ringkasan adalah ....",
        options: [
            "Langsung menulis judul baru",
            "Membaca seluruh isi bacaan dengan cermat",
            "Menghapus semua tanda titik",
            "Mengganti nama tokoh cerita"
        ],
        correctAnswer: 1,
        explanation: "Sebelum meringkas, kita harus membaca seluruh bacaan terlebih dahulu agar memahami keseluruhan alur dan isi cerita.",
        detectiveTip: "Langkah 1: Baca seluruh bacaan sampai tuntas."
    },
    {
        id: 31,
        category: "D",
        categoryName: "Informasi Penting & Ringkasan",
        passage: "",
        question: "Informasi penting dalam sebuah bacaan biasanya berkaitan erat dengan hal-hal berikut, KECUALI ....",
        options: [
            "Tokoh dan waktu kejadian",
            "Tempat dan alur peristiwa",
            "Warna baju penulis saat menulis buku",
            "Alasan, hasil, dan manfaat peristiwa"
        ],
        correctAnswer: 2,
        explanation: "Warna baju penulis sama sekali tidak berhubungan dengan isi cerita di dalam bacaan.",
        detectiveTip: "Informasi penting berkaitan dengan isi teks: tokoh, waktu, tempat, kegiatan, hasil."
    },
    {
        id: 32,
        category: "D",
        categoryName: "Informasi Penting & Ringkasan",
        passage: "Di halaman rumah, ibu menanam aneka sayuran seperti cabai dan tomat. Dika selalu membantu menyiramnya setiap pagi.",
        question: "Informasi penting mengenai kegiatan Dika adalah ....",
        options: [
            "Membeli pupuk di toko pertanian",
            "Membantu menyiram tanaman setiap pagi",
            "Memetik bunga mawar",
            "Menjual cabai ke pasar"
        ],
        correctAnswer: 1,
        explanation: "Teks secara lugas menyatakan kegiatan Dika: 'membantu menyiramnya setiap pagi'.",
        detectiveTip: "Perhatikan kata kunci nama tokoh 'Dika'."
    },
    {
        id: 33,
        category: "D",
        categoryName: "Informasi Penting & Ringkasan",
        passage: "",
        question: "Ketika kita menggabungkan informasi-informasi penting menjadi sebuah ringkasan, hal yang perlu dihilangkan adalah ....",
        options: [
            "Informasi yang tidak penting atau rincian yang berlebihan",
            "Semua nama tokoh utama",
            "Pesan moral cerita",
            "Topik bahasan utama"
        ],
        correctAnswer: 0,
        explanation: "Dalam meringkas, rincian kecil yang tidak penting dihilangkan agar teks menjadi padat dan singkat.",
        detectiveTip: "Simpan yang penting, singkirkan rincian yang tidak perlu."
    },
    {
        id: 34,
        category: "D",
        categoryName: "Informasi Penting & Ringkasan",
        passage: "Warga desa Sukamaju mengadakan kerja bakti membersihkan selokan pada hari Minggu. Selokan yang bersih dapat mencegah banjir saat musim hujan tiba.",
        question: "Informasi penting mengenai manfaat membersihkan selokan dari teks tersebut adalah ....",
        options: [
            "Dapat mencegah banjir saat musim hujan",
            "Membuat selokan menjadi tempat bermain ikan",
            "Agar warga mendapat hadiah dari kepala desa",
            "Supaya air selokan bisa diminum"
        ],
        correctAnswer: 0,
        explanation: "Teks menegaskan: 'Selokan yang bersih dapat mencegah banjir saat musim hujan tiba'.",
        detectiveTip: "Fokus pada kalimat yang menerangkan kata kunci 'manfaat'."
    },
    {
        id: 35,
        category: "D",
        categoryName: "Informasi Penting & Ringkasan",
        passage: "",
        question: "Mengapa kita tidak boleh langsung memilih kalimat terpanjang sebagai ide pokok?",
        options: [
            "Karena kalimat terpanjang seringkali hanyalah kalimat penjelas yang berisi rincian",
            "Karena kalimat terpanjang selalu salah ejaannya",
            "Karena ide pokok hanya boleh terdiri dari 1 kata saja",
            "Karena buku pelajaran melarang kalimat panjang"
        ],
        correctAnswer: 0,
        explanation: "Kalimat terpanjang biasanya memuat contoh atau rincian penjelasan, bukan inti atau ide pokoknya.",
        detectiveTip: "Pola pikir detektif: Tanyakan inti pembicaraannya, bukan panjang kalimatnya!"
    }
];
