// Controller Utama Aplikasi Petualangan Detektif Membaca

document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi ikon Lucide
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Inisialisasi Komponen
    initNavigation();
    initModules();
    initFlashcards();
    initLabTexts();
    initMiniGames();
    initQuiz();
    initWorksheet();
    initMuteButton();
});

// 1. Sistem Navigasi Tab
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-target');
            appSound.playTap();

            // Ubah style tombol aktif
            navButtons.forEach(b => {
                b.classList.remove('bg-amber-400', 'text-amber-950', 'shadow-md', 'scale-105');
                b.classList.add('bg-white/80', 'text-slate-700', 'hover:bg-amber-100');
            });
            btn.classList.add('bg-amber-400', 'text-amber-950', 'shadow-md', 'scale-105');
            btn.classList.remove('bg-white/80', 'hover:bg-amber-100');

            // Beralih panel
            tabPanels.forEach(panel => {
                panel.classList.add('hidden');
            });
            const activePanel = document.getElementById(targetTab);
            if (activePanel) {
                activePanel.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Hentikan suara TTS jika berpindah tab
            appSound.stopSpeech();
            updateTtsBtnState(false);

            if (window.lucide) window.lucide.createIcons();
        });
    });
}

// 2. Modul Materi & Akordeon Interaktif
function initModules() {
    const container = document.getElementById('modules-container');
    if (!container) return;

    container.innerHTML = modulesData.map((m, idx) => `
        <div class="bg-white rounded-2xl border-2 border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
            <button class="w-full p-4 sm:p-5 flex items-center justify-between text-left module-toggle-btn gap-3 hover:bg-slate-50/80 transition-colors" data-mod-id="${m.id}">
                <div class="flex items-center gap-3 sm:gap-4">
                    <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-lg shrink-0 shadow-inner">
                        ${m.id}
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">${m.badge}</span>
                        </div>
                        <h4 class="font-bold text-slate-800 text-base sm:text-lg mt-0.5">${m.title}</h4>
                    </div>
                </div>
                <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 toggle-icon shrink-0">
                    <i data-lucide="chevron-down" class="w-5 h-5 transition-transform"></i>
                </div>
            </button>
            <div class="module-content hidden px-4 sm:px-6 pb-5 pt-1 border-t border-slate-100">
                <div class="p-3 bg-slate-50 rounded-xl mb-3 text-sm text-slate-600 font-medium italic">
                    "${m.summary}"
                </div>
                ${m.details}
            </div>
        </div>
    `).join('');

    // Toggle logic
    const toggles = container.querySelectorAll('.module-toggle-btn');
    toggles.forEach(btn => {
        btn.addEventListener('click', () => {
            appSound.playTap();
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.toggle-icon i');
            const isHidden = content.classList.contains('hidden');

            // Close others
            container.querySelectorAll('.module-content').forEach(c => c.classList.add('hidden'));
            container.querySelectorAll('.toggle-icon i').forEach(i => i.classList.remove('rotate-180'));

            if (isHidden) {
                content.classList.remove('hidden');
                if (icon) icon.classList.add('rotate-180');
            }
        });
    });

    // Buka modul pertama secara default
    if (toggles[0]) {
        toggles[0].click();
    }
}

// 3. Flashcards 3D "Cara Cepat Mengingat"
function initFlashcards() {
    const container = document.getElementById('flashcards-container');
    if (!container) return;

    container.innerHTML = flashcardsData.map(fc => `
        <div class="perspective-1000 cursor-pointer flashcard-card group h-52 sm:h-56" data-fc-id="${fc.id}">
            <div class="flashcard-inner relative w-full h-full transform-style-3d shadow-md hover:shadow-lg rounded-2xl transition-transform duration-500">
                <!-- Front Side -->
                <div class="absolute inset-0 w-full h-full bg-gradient-to-br ${fc.color} text-white rounded-2xl p-6 flex flex-col items-center justify-between backface-hidden border-2 border-white/40 shadow-inner">
                    <span class="text-xs font-bold uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full">Klik untuk Membuka</span>
                    <div class="text-center my-auto">
                        <span class="text-4xl block mb-2">${fc.icon}</span>
                        <h4 class="text-xl sm:text-2xl font-bold tracking-wide">${fc.front}</h4>
                    </div>
                    <span class="text-xs opacity-80 flex items-center gap-1">
                        <i data-lucide="rotate-cw" class="w-3.5 h-3.5"></i> Putar Kartu
                    </span>
                </div>
                <!-- Back Side -->
                <div class="absolute inset-0 w-full h-full bg-white text-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between rotate-y-180 backface-hidden border-2 border-amber-300 shadow-md">
                    <div class="flex items-center justify-between w-full border-b pb-2">
                        <span class="text-xs font-bold text-amber-600 uppercase tracking-wide">Arti / Penjelasan</span>
                        <span class="text-sm font-bold text-slate-500">${fc.front}</span>
                    </div>
                    <p class="text-center text-sm sm:text-base text-slate-700 font-medium my-auto px-2">
                        ${fc.back}
                    </p>
                    <span class="text-xs text-amber-600 font-medium">Klik untuk membalikkan</span>
                </div>
            </div>
        </div>
    `).join('');

    const cards = container.querySelectorAll('.flashcard-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            appSound.playFlip();
            const inner = card.querySelector('.flashcard-inner');
            inner.classList.toggle('is-flipped');
        });
    });
}

// 4. Laboratorium Bedah Paragraf Interaktif
let currentLabText = labTextsData[0];

function initLabTexts() {
    const selectorContainer = document.getElementById('lab-text-selector');
    if (!selectorContainer) return;

    // Render tombol pilihan teks
    selectorContainer.innerHTML = labTextsData.map((t, idx) => `
        <button class="lab-text-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 transition-all flex items-center gap-2 ${idx === 0 ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}" data-text-id="${t.id}">
            <span class="w-6 h-6 rounded-full bg-white/80 text-slate-700 flex items-center justify-center text-xs font-bold">${idx + 1}</span>
            <span class="truncate max-w-[140px] sm:max-w-[180px]">${t.title.split(':')[1] || t.title}</span>
        </button>
    `).join('');

    const textBtns = selectorContainer.querySelectorAll('.lab-text-btn');
    textBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textId = btn.getAttribute('data-text-id');
            currentLabText = labTextsData.find(t => t.id === textId);
            appSound.playTap();

            textBtns.forEach(b => {
                b.classList.remove('bg-amber-400', 'border-amber-500', 'text-amber-950', 'shadow-sm');
                b.classList.add('bg-white', 'border-slate-200', 'text-slate-600');
            });
            btn.classList.add('bg-amber-400', 'border-amber-500', 'text-amber-950', 'shadow-sm');
            btn.classList.remove('bg-white', 'border-slate-200', 'text-slate-600');

            renderLabDisplay();
            if (window.lucide) window.lucide.createIcons();
        });
    });

    // Kontrol Aksi Lab
    setupLabControls();
    renderLabDisplay();
}

function renderLabDisplay() {
    if (!currentLabText) return;

    // Judul & Badge
    document.getElementById('lab-title').textContent = currentLabText.title;
    document.getElementById('lab-badge').textContent = currentLabText.badge;

    // Render Kalimat Teks Interaktif
    const textWrapper = document.getElementById('lab-sentences-wrapper');
    textWrapper.innerHTML = currentLabText.sentences.map(s => `
        <span class="sentence-interactive font-medium text-slate-800 text-base sm:text-lg" data-sid="${s.id}" data-stype="${s.type}">
            ${s.text}
        </span>
    `).join(' ');

    // Add click event to each sentence
    textWrapper.querySelectorAll('.sentence-interactive').forEach(sEl => {
        sEl.addEventListener('click', () => {
            appSound.playTap();
            const sType = sEl.getAttribute('data-stype');
            const sid = sEl.getAttribute('data-sid');
            highlightSingleSentence(sid, sType);
        });
    });

    // Render Box Analisis & Ide Pokok
    document.getElementById('lab-ide-pokok').textContent = currentLabText.idePokok;
    document.getElementById('lab-kalimat-utama').textContent = currentLabText.kalimatUtamaInfo;
    document.getElementById('lab-mengapa').textContent = currentLabText.mengapa;

    // Bagian Khusus 5W1H (jika ada)
    const qaSection = document.getElementById('lab-5w1h-section');
    if (currentLabText.qaList) {
        qaSection.classList.remove('hidden');
        const qaContainer = document.getElementById('lab-5w1h-container');
        qaContainer.innerHTML = currentLabText.qaList.map((qa, i) => `
            <div class="bg-purple-50 border border-purple-200 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 hover:bg-purple-100/70 transition-colors">
                <div>
                    <span class="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-200 text-purple-800 mr-2">${qa.tag}</span>
                    <strong class="text-slate-800 text-sm">${qa.q}</strong>
                    <p class="text-purple-900 font-bold text-sm mt-0.5">➡ Jawab: ${qa.a}</p>
                </div>
                <button class="highlight-evidence-btn text-xs bg-purple-600 hover:bg-purple-700 text-white font-bold px-3 py-1.5 rounded-lg shadow-sm shrink-0 flex items-center gap-1" data-snippet="${qa.highlightSnippet}">
                    <i data-lucide="eye" class="w-3.5 h-3.5"></i> Lihat Bukti di Teks
                </button>
            </div>
        `).join('');

        qaContainer.querySelectorAll('.highlight-evidence-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                appSound.playSuccess();
                const snippet = btn.getAttribute('data-snippet');
                highlightSnippetInText(snippet);
            });
        });
    } else {
        qaSection.classList.add('hidden');
    }

    // Bagian Informasi Penting / Ringkasan (jika ada)
    const extraSection = document.getElementById('lab-extra-section');
    if (currentLabText.importantInfo || currentLabText.ringkasan) {
        extraSection.classList.remove('hidden');
        let html = '';
        if (currentLabText.importantInfo) {
            html += `
                <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-3">
                    <h5 class="font-bold text-emerald-900 text-sm mb-2 flex items-center gap-2">
                        <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600"></i> Informasi Penting yang Ditemukan:
                    </h5>
                    <ul class="list-disc list-inside space-y-1 text-sm text-slate-700">
                        ${currentLabText.importantInfo.map(info => `<li>${info}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        if (currentLabText.ringkasan) {
            html += `
                <div class="bg-rose-50 border border-rose-200 rounded-xl p-4">
                    <h5 class="font-bold text-rose-900 text-sm mb-1 flex items-center gap-2">
                        <i data-lucide="file-text" class="w-4 h-4 text-rose-600"></i> Hasil Ringkasan:
                    </h5>
                    <p class="text-rose-950 font-bold text-sm bg-white p-2.5 rounded-lg border border-rose-200">
                        "${currentLabText.ringkasan}"
                    </p>
                    ${currentLabText.caraBerpikir ? `
                        <p class="text-xs text-slate-600 mt-2 italic bg-amber-50 p-2 rounded border border-amber-200">
                            <strong>💡 Trik Cara Berpikir:</strong> ${currentLabText.caraBerpikir}
                        </p>
                    ` : ''}
                </div>
            `;
        }
        document.getElementById('lab-extra-content').innerHTML = html;
    } else {
        extraSection.classList.add('hidden');
    }

    // Reset status tombol TTS
    appSound.stopSpeech();
    updateTtsBtnState(false);
}

function setupLabControls() {
    const btnAll = document.getElementById('btn-highlight-all');
    const btnUtama = document.getElementById('btn-highlight-utama');
    const btnPenjelas = document.getElementById('btn-highlight-penjelas');
    const btnReset = document.getElementById('btn-highlight-reset');
    const btnTts = document.getElementById('btn-lab-tts');

    if (btnAll) {
        btnAll.addEventListener('click', () => {
            appSound.playTap();
            document.querySelectorAll('.sentence-interactive').forEach(el => {
                const sType = el.getAttribute('data-stype');
                el.classList.remove('highlight-utama', 'highlight-penjelas', 'highlight-5w1h');
                if (sType === 'utama') el.classList.add('highlight-utama');
                else el.classList.add('highlight-penjelas');
            });
        });
    }

    if (btnUtama) {
        btnUtama.addEventListener('click', () => {
            appSound.playSuccess();
            document.querySelectorAll('.sentence-interactive').forEach(el => {
                el.classList.remove('highlight-utama', 'highlight-penjelas', 'highlight-5w1h');
                if (el.getAttribute('data-stype') === 'utama') {
                    el.classList.add('highlight-utama');
                }
            });
        });
    }

    if (btnPenjelas) {
        btnPenjelas.addEventListener('click', () => {
            appSound.playTap();
            document.querySelectorAll('.sentence-interactive').forEach(el => {
                el.classList.remove('highlight-utama', 'highlight-penjelas', 'highlight-5w1h');
                if (el.getAttribute('data-stype') === 'penjelas') {
                    el.classList.add('highlight-penjelas');
                }
            });
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            appSound.playTap();
            document.querySelectorAll('.sentence-interactive').forEach(el => {
                el.classList.remove('highlight-utama', 'highlight-penjelas', 'highlight-5w1h');
            });
        });
    }

    if (btnTts) {
        btnTts.addEventListener('click', () => {
            if (!currentLabText) return;
            appSound.playTap();

            if (btnTts.classList.contains('is-speaking')) {
                appSound.stopSpeech();
                updateTtsBtnState(false);
            } else {
                updateTtsBtnState(true);
                appSound.speakText(
                    currentLabText.fullText,
                    () => updateTtsBtnState(true),
                    () => updateTtsBtnState(false)
                );
            }
        });
    }
}

function updateTtsBtnState(isSpeaking) {
    const btnTts = document.getElementById('btn-lab-tts');
    if (!btnTts) return;
    if (isSpeaking) {
        btnTts.classList.add('is-speaking', 'bg-rose-500', 'text-white', 'animate-pulse');
        btnTts.classList.remove('bg-amber-100', 'text-amber-800');
        btnTts.innerHTML = `<i data-lucide="square" class="w-4 h-4 fill-current"></i> Berhenti`;
    } else {
        btnTts.classList.remove('is-speaking', 'bg-rose-500', 'text-white', 'animate-pulse');
        btnTts.classList.add('bg-amber-100', 'text-amber-800');
        btnTts.innerHTML = `<i data-lucide="volume-2" class="w-4 h-4"></i> Dengarkan Suara`;
    }
    if (window.lucide) window.lucide.createIcons();
}

function highlightSingleSentence(sid, sType) {
    document.querySelectorAll('.sentence-interactive').forEach(el => {
        el.classList.remove('highlight-utama', 'highlight-penjelas', 'highlight-5w1h');
    });
    const target = document.querySelector(`.sentence-interactive[data-sid="${sid}"]`);
    if (target) {
        if (sType === 'utama') {
            target.classList.add('highlight-utama');
        } else {
            target.classList.add('highlight-penjelas');
        }
    }
}

function highlightSnippetInText(snippet) {
    const wrapper = document.getElementById('lab-sentences-wrapper');
    if (!wrapper || !snippet) return;

    // Reset dan highlight kalimat yang memuat snippet
    document.querySelectorAll('.sentence-interactive').forEach(el => {
        el.classList.remove('highlight-utama', 'highlight-penjelas', 'highlight-5w1h');
        if (el.textContent.toLowerCase().includes(snippet.toLowerCase())) {
            el.classList.add('highlight-5w1h');
        }
    });
}

// 5. Mini Games Interaktif
let gamePilahIndex = 0;
let gamePilahScore = 0;

function initMiniGames() {
    initGamePilah();
    initGame5W1H();
}

// Game 1: Pilah Kalimat
function initGamePilah() {
    gamePilahIndex = 0;
    gamePilahScore = 0;
    renderGamePilahCard();

    const btnUtama = document.getElementById('game-btn-utama');
    const btnPenjelas = document.getElementById('game-btn-penjelas');
    const btnRestart = document.getElementById('game-btn-restart');

    if (btnUtama) {
        btnUtama.addEventListener('click', () => checkGamePilahAnswer('utama'));
    }
    if (btnPenjelas) {
        btnPenjelas.addEventListener('click', () => checkGamePilahAnswer('penjelas'));
    }
    if (btnRestart) {
        btnRestart.addEventListener('click', () => {
            appSound.playTap();
            gamePilahIndex = 0;
            gamePilahScore = 0;
            renderGamePilahCard();
        });
    }
}

function renderGamePilahCard() {
    const questions = miniGamesData.pilahKalimat;
    const feedbackBox = document.getElementById('game-pilah-feedback');
    const progressEl = document.getElementById('game-pilah-progress');
    const scoreEl = document.getElementById('game-pilah-score');
    const cardEl = document.getElementById('game-pilah-sentence');
    const buttonsArea = document.getElementById('game-pilah-buttons');
    const restartArea = document.getElementById('game-pilah-restart-area');

    if (feedbackBox) feedbackBox.classList.add('hidden');
    if (scoreEl) scoreEl.textContent = gamePilahScore;

    if (gamePilahIndex >= questions.length) {
        // Game selesai
        appSound.playFanfare();
        triggerConfetti();
        if (progressEl) progressEl.textContent = `Selesai!`;
        if (cardEl) {
            cardEl.innerHTML = `
                <div class="text-center py-6">
                    <span class="text-5xl block mb-3">🏆</span>
                    <h3 class="text-2xl font-bold text-amber-900 mb-2">Hebat Sekali!</h3>
                    <p class="text-slate-700">Kamu berhasil memilah semua kalimat dengan skor akhir: <strong>${gamePilahScore * 10} poin</strong>!</p>
                </div>
            `;
        }
        if (buttonsArea) buttonsArea.classList.add('hidden');
        if (restartArea) restartArea.classList.remove('hidden');
        return;
    }

    if (buttonsArea) buttonsArea.classList.remove('hidden');
    if (restartArea) restartArea.classList.add('hidden');

    if (progressEl) progressEl.textContent = `Soal ${gamePilahIndex + 1} dari ${questions.length}`;
    const currentQ = questions[gamePilahIndex];
    if (cardEl) {
        cardEl.innerHTML = `
            <p class="text-lg sm:text-xl font-semibold text-slate-800 leading-relaxed text-center">
                "${currentQ.sentence}"
            </p>
        `;
    }
}

function checkGamePilahAnswer(chosenType) {
    const currentQ = miniGamesData.pilahKalimat[gamePilahIndex];
    const feedbackBox = document.getElementById('game-pilah-feedback');
    const isCorrect = chosenType === currentQ.type;

    if (isCorrect) {
        appSound.playSuccess();
        gamePilahScore += 1;
        feedbackBox.className = "p-4 rounded-xl text-sm font-medium bg-emerald-100 text-emerald-900 border border-emerald-300";
        feedbackBox.innerHTML = `
            <div class="flex items-center gap-2 mb-1">
                <span class="text-lg">🎉</span>
                <strong>Benar Sekali!</strong>
            </div>
            <p>${currentQ.reason}</p>
        `;
    } else {
        appSound.playWrong();
        feedbackBox.className = "p-4 rounded-xl text-sm font-medium bg-rose-100 text-rose-900 border border-rose-300";
        feedbackBox.innerHTML = `
            <div class="flex items-center gap-2 mb-1">
                <span class="text-lg">💡</span>
                <strong>Kurang Tepat!</strong> Jawaban yang benar adalah <strong>Kalimat ${currentQ.type === 'utama' ? 'Utama' : 'Penjelas'}</strong>.
            </div>
            <p>${currentQ.reason}</p>
        `;
    }

    feedbackBox.classList.remove('hidden');

    // Geser ke soal berikutnya setelah 1.8 detik
    setTimeout(() => {
        gamePilahIndex++;
        renderGamePilahCard();
    }, 1800);
}

// Game 2: Hubungkan 5W1H (ADiKSiMBa)
let selectedQWord = null;
let matched5W1HCount = 0;

function initGame5W1H() {
    const wordList = miniGamesData.pasangKataTanya;
    matched5W1HCount = 0;
    selectedQWord = null;

    const wordsContainer = document.getElementById('game-5w1h-words');
    const targetsContainer = document.getElementById('game-5w1h-targets');
    if (!wordsContainer || !targetsContainer) return;

    // Acak urutan target agar menantang
    const shuffledTargets = [...wordList].sort(() => Math.random() - 0.5);

    wordsContainer.innerHTML = wordList.map(w => `
        <button class="word-card w-full p-3.5 rounded-xl border-2 border-purple-200 bg-white hover:bg-purple-50 text-purple-900 font-bold text-center transition-all shadow-sm text-base" data-word="${w.qWord}">
            ${w.qWord}
        </button>
    `).join('');

    targetsContainer.innerHTML = shuffledTargets.map(t => `
        <button class="target-card w-full p-3.5 rounded-xl border-2 border-slate-200 bg-slate-50 hover:bg-amber-50 text-slate-700 font-medium text-left transition-all shadow-sm text-sm" data-match="${wrdTargetMatch(t.qWord)}">
            ${t.targetMatch}
        </button>
    `).join('');

    function wrdTargetMatch(w) {
        return wordList.find(x => x.qWord === w).targetMatch;
    }

    // Event listener kata tanya
    wordsContainer.querySelectorAll('.word-card').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('is-matched')) return;
            appSound.playTap();

            wordsContainer.querySelectorAll('.word-card').forEach(b => {
                if (!b.classList.contains('is-matched')) {
                    b.classList.remove('border-purple-600', 'bg-purple-200', 'scale-105');
                    b.classList.add('bg-white', 'border-purple-200');
                }
            });

            btn.classList.add('border-purple-600', 'bg-purple-200', 'scale-105');
            btn.classList.remove('bg-white', 'border-purple-200');
            selectedQWord = btn.getAttribute('data-word');
        });
    });

    // Event listener target arti
    targetsContainer.querySelectorAll('.target-card').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('is-matched')) return;
            if (!selectedQWord) {
                alert('Silakan pilih salah satu kata tanya di sebelah kiri terlebih dahulu!');
                return;
            }

            const targetVal = btn.getAttribute('data-match');
            const expectedTarget = wordList.find(x => x.qWord === selectedQWord).targetMatch;

            if (targetVal === expectedTarget) {
                // Cocok!
                appSound.playSuccess();
                matched5W1HCount++;

                // Tandai kartu kata
                const activeWordBtn = wordsContainer.querySelector(`.word-card[data-word="${selectedQWord}"]`);
                if (activeWordBtn) {
                    activeWordBtn.classList.add('is-matched', 'bg-emerald-500', 'text-white', 'border-emerald-600');
                    activeWordBtn.classList.remove('bg-purple-200', 'border-purple-600', 'scale-105');
                    activeWordBtn.disabled = true;
                }

                // Tandai kartu target
                btn.classList.add('is-matched', 'bg-emerald-100', 'text-emerald-950', 'border-emerald-500', 'font-semibold');
                btn.classList.remove('bg-slate-50', 'border-slate-200');
                btn.disabled = true;

                selectedQWord = null;

                if (matched5W1HCount === wordList.length) {
                    setTimeout(() => {
                        appSound.playFanfare();
                        triggerConfetti();
                        document.getElementById('game-5w1h-success').classList.remove('hidden');
                    }, 400);
                }
            } else {
                // Salah
                appSound.playWrong();
                btn.classList.add('bg-rose-100', 'border-rose-400');
                setTimeout(() => {
                    btn.classList.remove('bg-rose-100', 'border-rose-400');
                }, 800);
            }
        });
    });

    // Reset tombol
    const btnReset5W = document.getElementById('btn-reset-5w1h');
    if (btnReset5W) {
        btnReset5W.addEventListener('click', () => {
            appSound.playTap();
            document.getElementById('game-5w1h-success').classList.add('hidden');
            initGame5W1H();
        });
    }
}

// 6. Bank Soal & Kuis Interaktif
let quizMode = 'latihan'; // 'latihan' atau 'ujian'
let quizFilterCategory = 'ALL';
let activeQuestions = [];
let examCurrentIndex = 0;
let examUserAnswers = [];
let examTimer = null;
let examTimeLeft = 15 * 60; // 15 menit

function initQuiz() {
    setupQuizModeTabs();
    setupCategoryFilters();
    renderPracticeQuiz();

    // Event tombol Ujian
    const btnStartExam = document.getElementById('btn-start-exam');
    if (btnStartExam) {
        btnStartExam.addEventListener('click', startExamMode);
    }
    const btnExamNext = document.getElementById('btn-exam-next');
    if (btnExamNext) {
        btnExamNext.addEventListener('click', nextExamQuestion);
    }
    const btnExamPrev = document.getElementById('btn-exam-prev');
    if (btnExamPrev) {
        btnExamPrev.addEventListener('click', prevExamQuestion);
    }
    const btnExamFinish = document.getElementById('btn-exam-finish');
    if (btnExamFinish) {
        btnExamFinish.addEventListener('click', () => {
            if (confirm('Apakah kamu yakin ingin menyelesaikan ujian sekarang?')) {
                finishExam();
            }
        });
    }
    const btnExamRetake = document.getElementById('btn-exam-retake');
    if (btnExamRetake) {
        btnExamRetake.addEventListener('click', startExamMode);
    }
}

function setupQuizModeTabs() {
    const btnPracticeMode = document.getElementById('mode-practice-btn');
    const btnExamMode = document.getElementById('mode-exam-btn');
    const practiceView = document.getElementById('practice-quiz-view');
    const examIntroView = document.getElementById('exam-intro-view');
    const examActiveView = document.getElementById('exam-active-view');
    const examResultView = document.getElementById('exam-result-view');

    btnPracticeMode.addEventListener('click', () => {
        appSound.playTap();
        quizMode = 'latihan';
        btnPracticeMode.classList.add('bg-amber-400', 'text-amber-950', 'shadow');
        btnPracticeMode.classList.remove('bg-white', 'text-slate-600');
        btnExamMode.classList.add('bg-white', 'text-slate-600');
        btnExamMode.classList.remove('bg-amber-400', 'text-amber-950', 'shadow');

        practiceView.classList.remove('hidden');
        examIntroView.classList.add('hidden');
        examActiveView.classList.add('hidden');
        examResultView.classList.add('hidden');
        clearInterval(examTimer);
    });

    btnExamMode.addEventListener('click', () => {
        appSound.playTap();
        quizMode = 'ujian';
        btnExamMode.classList.add('bg-amber-400', 'text-amber-950', 'shadow');
        btnExamMode.classList.remove('bg-white', 'text-slate-600');
        btnPracticeMode.classList.add('bg-white', 'text-slate-600');
        btnPracticeMode.classList.remove('bg-amber-400', 'text-amber-950', 'shadow');

        practiceView.classList.add('hidden');
        examIntroView.classList.remove('hidden');
        examActiveView.classList.add('hidden');
        examResultView.classList.add('hidden');
    });
}

function setupCategoryFilters() {
    const filterBtns = document.querySelectorAll('.cat-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            appSound.playTap();
            quizFilterCategory = btn.getAttribute('data-category');

            filterBtns.forEach(b => {
                b.classList.remove('bg-amber-500', 'text-white', 'shadow-sm');
                b.classList.add('bg-slate-100', 'text-slate-700');
            });
            btn.classList.add('bg-amber-500', 'text-white', 'shadow-sm');
            btn.classList.remove('bg-slate-100', 'text-slate-700');

            renderPracticeQuiz();
        });
    });
}

// Render Soal Mode Latihan Mandiri
function renderPracticeQuiz() {
    const container = document.getElementById('practice-questions-container');
    if (!container) return;

    let filtered = questionBankData;
    if (quizFilterCategory !== 'ALL') {
        filtered = questionBankData.filter(q => q.category === quizFilterCategory);
    }

    document.getElementById('practice-count-badge').textContent = `${filtered.length} Soal`;

    container.innerHTML = filtered.map((q, idx) => `
        <div class="bg-white rounded-2xl border-2 border-slate-100 shadow-sm p-5 sm:p-6 practice-card" id="p-card-${q.id}">
            <div class="flex items-center justify-between gap-2 mb-3">
                <span class="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    Soal #${q.id} • ${q.categoryName}
                </span>
                <span class="text-xs text-slate-600 font-medium">Klik pilihan untuk melihat pembahasan</span>
            </div>

            ${q.passage ? `
                <div class="bg-amber-50 border-l-4 border-amber-400 p-3.5 rounded-r-xl text-sm text-slate-700 mb-3 italic">
                    "${q.passage}"
                </div>
            ` : ''}

            <h4 class="font-bold text-slate-800 text-base sm:text-lg mb-4 leading-relaxed">
                ${q.question}
            </h4>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                ${q.options.map((opt, optIdx) => `
                    <button class="practice-opt-btn p-3 rounded-xl border-2 border-slate-200 text-left font-medium text-sm hover:bg-slate-50 transition-all flex items-start gap-2.5" data-qid="${q.id}" data-opt="${optIdx}">
                        <span class="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">${String.fromCharCode(65 + optIdx)}</span>
                        <span class="text-slate-700">${opt}</span>
                    </button>
                `).join('')}
            </div>

            <!-- Box Pembahasan & Tips Detektif -->
            <div class="explanation-box hidden mt-4 pt-4 border-t border-slate-100" id="exp-box-${q.id}">
                <div class="result-badge p-2.5 rounded-xl font-bold text-sm mb-3 flex items-center gap-2"></div>
                <div class="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-sm text-slate-700 mb-2">
                    <strong class="text-blue-900 block mb-1">📖 Pembahasan:</strong>
                    ${q.explanation}
                </div>
                <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs sm:text-sm text-amber-950 font-medium flex items-start gap-2">
                    <span class="text-base">💡</span>
                    <span><strong>Trik Detektif:</strong> ${q.detectiveTip}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Event listener tombol opsi latihan
    container.querySelectorAll('.practice-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const qid = parseInt(btn.getAttribute('data-qid'));
            const optIdx = parseInt(btn.getAttribute('data-opt'));
            handlePracticeAnswer(qid, optIdx);
        });
    });
}

function handlePracticeAnswer(qid, chosenIdx) {
    const qData = questionBankData.find(q => q.id === qid);
    if (!qData) return;

    const card = document.getElementById(`p-card-${qid}`);
    const expBox = document.getElementById(`exp-box-${qid}`);
    const badge = expBox.querySelector('.result-badge');
    const allBtns = card.querySelectorAll('.practice-opt-btn');

    const isCorrect = chosenIdx === qData.correctAnswer;

    allBtns.forEach((b, idx) => {
        b.disabled = true;
        b.classList.remove('hover:bg-slate-50');
        if (idx === qData.correctAnswer) {
            b.classList.add('bg-emerald-100', 'border-emerald-500', 'text-emerald-950', 'font-bold');
        } else if (idx === chosenIdx) {
            b.classList.add('bg-rose-100', 'border-rose-500', 'text-rose-950');
        }
    });

    if (isCorrect) {
        appSound.playSuccess();
        badge.className = "result-badge p-2.5 rounded-xl font-bold text-sm mb-3 flex items-center gap-2 bg-emerald-100 text-emerald-900 border border-emerald-300";
        badge.innerHTML = `<span>🎉</span> Jawaban Kamu BENAR! Luar biasa!`;
    } else {
        appSound.playWrong();
        badge.className = "result-badge p-2.5 rounded-xl font-bold text-sm mb-3 flex items-center gap-2 bg-rose-100 text-rose-900 border border-rose-300";
        badge.innerHTML = `<span>❌</span> Belum tepat. Jawaban yang benar adalah pilihan (${String.fromCharCode(65 + qData.correctAnswer)}).`;
    }

    expBox.classList.remove('hidden');
}

// Mode Ujian Asesmen Berwaktu
function startExamMode() {
    appSound.playSuccess();
    // Pilih 15 butir soal secara acak (proporsional per kategori jika memungkinkan)
    const shuffled = [...questionBankData].sort(() => Math.random() - 0.5);
    activeQuestions = shuffled.slice(0, 15);
    examCurrentIndex = 0;
    examUserAnswers = new Array(activeQuestions.length).fill(null);
    examTimeLeft = 15 * 60; // 15 menit

    document.getElementById('exam-intro-view').classList.add('hidden');
    document.getElementById('exam-active-view').classList.remove('hidden');
    document.getElementById('exam-result-view').classList.add('hidden');

    // Mulai Timer
    clearInterval(examTimer);
    updateTimerDisplay();
    examTimer = setInterval(() => {
        examTimeLeft--;
        updateTimerDisplay();
        if (examTimeLeft <= 0) {
            clearInterval(examTimer);
            alert('Waktu ujian telah habis! Hasil ujian kamu akan dihitung sekarang.');
            finishExam();
        }
    }, 1000);

    renderExamQuestion();
    renderExamQuestionNav();
}

function updateTimerDisplay() {
    const mins = Math.floor(examTimeLeft / 60);
    const secs = examTimeLeft % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const timerEl = document.getElementById('exam-timer');
    if (timerEl) timerEl.textContent = formatted;
}

function renderExamQuestionNav() {
    const navContainer = document.getElementById('exam-nav-pills');
    if (!navContainer) return;

    navContainer.innerHTML = activeQuestions.map((_, idx) => `
        <button class="exam-pill w-8 h-8 rounded-lg font-bold text-xs border transition-all ${idx === examCurrentIndex ? 'bg-amber-400 border-amber-600 text-amber-950 font-extrabold scale-110' : examUserAnswers[idx] !== null ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-slate-100 border-slate-300 text-slate-600'}" data-nav-idx="${idx}">
            ${idx + 1}
        </button>
    `).join('');

    navContainer.querySelectorAll('.exam-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            appSound.playTap();
            examCurrentIndex = parseInt(pill.getAttribute('data-nav-idx'));
            renderExamQuestion();
            renderExamQuestionNav();
        });
    });
}

function renderExamQuestion() {
    const q = activeQuestions[examCurrentIndex];
    if (!q) return;

    document.getElementById('exam-q-num').textContent = `Soal ${examCurrentIndex + 1} dari ${activeQuestions.length}`;
    document.getElementById('exam-q-cat').textContent = q.categoryName;

    // Passage
    const passageEl = document.getElementById('exam-q-passage');
    if (q.passage) {
        passageEl.classList.remove('hidden');
        passageEl.innerHTML = `"${q.passage}"`;
    } else {
        passageEl.classList.add('hidden');
    }

    // Text soal
    document.getElementById('exam-q-text').textContent = q.question;

    // Pilihan Opsi
    const optionsContainer = document.getElementById('exam-q-options');
    const selectedAnswer = examUserAnswers[examCurrentIndex];

    optionsContainer.innerHTML = q.options.map((opt, idx) => `
        <button class="exam-opt-btn w-full p-4 rounded-xl border-2 text-left font-medium text-sm transition-all flex items-start gap-3 ${selectedAnswer === idx ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-sm font-bold' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}" data-opt-idx="${idx}">
            <span class="w-7 h-7 rounded-full ${selectedAnswer === idx ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'} flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">${String.fromCharCode(65 + idx)}</span>
            <span class="leading-relaxed">${opt}</span>
        </button>
    `).join('');

    optionsContainer.querySelectorAll('.exam-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            appSound.playTap();
            const optIdx = parseInt(btn.getAttribute('data-opt-idx'));
            examUserAnswers[examCurrentIndex] = optIdx;
            renderExamQuestion();
            renderExamQuestionNav();
        });
    });

    // Kontrol Tombol Prev / Next / Finish
    const btnPrev = document.getElementById('btn-exam-prev');
    const btnNext = document.getElementById('btn-exam-next');
    const btnFinish = document.getElementById('btn-exam-finish');

    btnPrev.disabled = examCurrentIndex === 0;
    if (examCurrentIndex === activeQuestions.length - 1) {
        btnNext.classList.add('hidden');
        btnFinish.classList.remove('hidden');
    } else {
        btnNext.classList.remove('hidden');
        btnFinish.classList.add('hidden');
    }

    // Update Progress Bar
    const answeredCount = examUserAnswers.filter(a => a !== null).length;
    const progressPercent = Math.round((answeredCount / activeQuestions.length) * 100);
    const progressBar = document.getElementById('exam-progress-bar');
    if (progressBar) progressBar.style.width = `${progressPercent}%`;
}

function nextExamQuestion() {
    if (examCurrentIndex < activeQuestions.length - 1) {
        appSound.playTap();
        examCurrentIndex++;
        renderExamQuestion();
        renderExamQuestionNav();
    }
}

function prevExamQuestion() {
    if (examCurrentIndex > 0) {
        appSound.playTap();
        examCurrentIndex--;
        renderExamQuestion();
        renderExamQuestionNav();
    }
}

function finishExam() {
    clearInterval(examTimer);
    appSound.playFanfare();
    triggerConfetti();

    document.getElementById('exam-active-view').classList.add('hidden');
    document.getElementById('exam-result-view').classList.remove('hidden');

    let correctCount = 0;
    activeQuestions.forEach((q, idx) => {
        if (examUserAnswers[idx] === q.correctAnswer) {
            correctCount++;
        }
    });

    const score = Math.round((correctCount / activeQuestions.length) * 100);
    document.getElementById('exam-score-val').textContent = score;
    document.getElementById('exam-correct-count').textContent = `${correctCount} dari ${activeQuestions.length} Soal`;

    // Predikat & Bintang
    let title = "Detektif Cilik Hebat!";
    let stars = "⭐⭐⭐";
    let badgeColor = "text-amber-500";
    if (score === 100) {
        title = "Detektif Master Bintang Emas! Sempurna!";
        stars = "⭐⭐⭐⭐⭐";
    } else if (score >= 80) {
        title = "Detektif Handal! Sangat Cerdas!";
        stars = "⭐⭐⭐⭐";
    } else if (score >= 65) {
        title = "Detektif Baik! Terus Berlatih!";
        stars = "⭐⭐⭐";
    } else {
        title = "Tetap Semangat! Baca Lagi Materinya Ya!";
        stars = "⭐⭐";
    }

    document.getElementById('exam-predikat-title').textContent = title;
    document.getElementById('exam-stars').textContent = stars;

    // Lembar Evaluasi Soal Ujian
    const reviewContainer = document.getElementById('exam-review-container');
    reviewContainer.innerHTML = activeQuestions.map((q, idx) => {
        const userAns = examUserAnswers[idx];
        const isCorrect = userAns === q.correctAnswer;
        return `
            <div class="p-4 rounded-xl border-2 ${isCorrect ? 'border-emerald-200 bg-emerald-50/50' : 'border-rose-200 bg-rose-50/50'} text-left">
                <div class="flex items-center justify-between mb-2">
                    <span class="font-bold text-sm ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}">
                        Soal #${idx + 1} (${isCorrect ? '✔ BENAR' : '❌ SALAH'})
                    </span>
                    <span class="text-xs px-2 py-0.5 rounded-full bg-white font-semibold text-slate-600 border">${q.categoryName}</span>
                </div>
                ${q.passage ? `<p class="italic text-xs text-slate-600 mb-2">"${q.passage}"</p>` : ''}
                <p class="font-semibold text-slate-800 text-sm mb-2">${q.question}</p>
                <div class="text-xs space-y-1">
                    <p class="${isCorrect ? 'text-emerald-700' : 'text-rose-700'} font-medium">
                        Jawabanmu: ${userAns !== null ? `${String.fromCharCode(65 + userAns)}. ${q.options[userAns]}` : '<em>Tidak dijawab</em>'}
                    </p>
                    ${!isCorrect ? `
                        <p class="text-emerald-700 font-bold">
                            Kunci Jawaban: ${String.fromCharCode(65 + q.correctAnswer)}. ${q.options[q.correctAnswer]}
                        </p>
                    ` : ''}
                </div>
                <div class="mt-2.5 pt-2 border-t border-slate-200 text-xs text-slate-600">
                    <strong>Tips:</strong> ${q.explanation}
                </div>
            </div>
        `;
    }).join('');
}

// 7. Lembar Kerja Siswa (Worksheet)
function initWorksheet() {
    const btnPrint = document.getElementById('btn-print-worksheet');
    if (btnPrint) {
        btnPrint.addEventListener('click', () => {
            appSound.playTap();
            window.print();
        });
    }

    renderWorksheetQuestions();
}

function renderWorksheetQuestions() {
    const container = document.getElementById('worksheet-questions-list');
    if (!container) return;

    // Tampilkan 10 soal pilihan untuk dicetak
    const selectedForPrint = questionBankData.slice(0, 10);

    container.innerHTML = selectedForPrint.map((q, idx) => `
        <div class="question-block pb-4 mb-4 border-b border-slate-200">
            <p class="font-bold text-slate-800 text-sm mb-1">
                ${idx + 1}. ${q.passage ? `<span class="italic font-normal block mb-1">"${q.passage}"</span>` : ''}${q.question}
            </p>
            <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-700 mt-2 pl-4">
                ${q.options.map((opt, oIdx) => `
                    <div><strong>${String.fromCharCode(65 + oIdx)}.</strong> ${opt}</div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 8. Sound Mute Control
function initMuteButton() {
    const btnMute = document.getElementById('btn-toggle-sound');
    if (!btnMute) return;

    updateMuteButtonUI(appSound.muted);

    btnMute.addEventListener('click', () => {
        const isMuted = appSound.toggleMute();
        updateMuteButtonUI(isMuted);
    });
}

function updateMuteButtonUI(isMuted) {
    const btnMute = document.getElementById('btn-toggle-sound');
    if (!btnMute) return;

    if (isMuted) {
        btnMute.classList.add('bg-rose-100', 'text-rose-700');
        btnMute.classList.remove('bg-white', 'text-slate-700');
        btnMute.innerHTML = `<i data-lucide="volume-x" class="w-5 h-5"></i>`;
    } else {
        btnMute.classList.remove('bg-rose-100', 'text-rose-700');
        btnMute.classList.add('bg-white', 'text-slate-700');
        btnMute.innerHTML = `<i data-lucide="volume-2" class="w-5 h-5 text-amber-600"></i>`;
    }
    if (window.lucide) window.lucide.createIcons();
}

// Konfeti Perayaan Menggunakan Canvas-Confetti
function triggerConfetti() {
    if (window.confetti) {
        window.confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}
