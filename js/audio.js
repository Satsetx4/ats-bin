// Audio & Speech Synthesis Engine for Petualangan Detektif Membaca
class SoundEffects {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.initAudioContext();
        
        // Cek localStorage untuk status mute
        const savedMute = localStorage.getItem('detektif_audio_muted');
        if (savedMute !== null) {
            this.muted = savedMute === 'true';
        }
    }

    initAudioContext() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('detektif_audio_muted', this.muted);
        if (this.muted) {
            this.stopSpeech();
        }
        return this.muted;
    }

    // Suara Klik / Tap Lembut
    playTap() {
        if (this.muted) return;
        this.initAudioContext();
        this.resume();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(250, this.ctx.currentTime + 0.08);

            gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        } catch (e) {
            console.warn('Audio play error', e);
        }
    }

    // Suara Benar / Sukses (Happy Chime Arpeggio C5 - E5 - G5 - C6)
    playSuccess() {
        if (this.muted) return;
        this.initAudioContext();
        this.resume();
        if (!this.ctx) return;

        try {
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, index) => {
                const startTime = this.ctx.currentTime + (index * 0.08);
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, startTime);

                gain.gain.setValueAtTime(0.18, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(startTime);
                osc.stop(startTime + 0.35);
            });
        } catch (e) {
            console.warn('Audio play error', e);
        }
    }

    // Suara Coba Lagi (Gentle tone)
    playWrong() {
        if (this.muted) return;
        this.initAudioContext();
        this.resume();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(320, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.25);

            gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.25);
        } catch (e) {
            console.warn('Audio play error', e);
        }
    }

    // Suara Balik Kartu (Whoosh)
    playFlip() {
        if (this.muted) return;
        this.initAudioContext();
        this.resume();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.12);

            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.12);
        } catch (e) {
            console.warn('Audio play error', e);
        }
    }

    // Fanfare Kemenangan saat Ujian Selesai
    playFanfare() {
        if (this.muted) return;
        this.initAudioContext();
        this.resume();
        if (!this.ctx) return;

        try {
            const notes = [
                { f: 523.25, d: 0.12, t: 0.00 }, // C5
                { f: 523.25, d: 0.12, t: 0.14 }, // C5
                { f: 523.25, d: 0.12, t: 0.28 }, // C5
                { f: 659.25, d: 0.35, t: 0.42 }, // E5
                { f: 783.99, d: 0.20, t: 0.80 }, // G5
                { f: 1046.50, d: 0.60, t: 1.05 } // C6
            ];

            notes.forEach(note => {
                const startTime = this.ctx.currentTime + note.t;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(note.f, startTime);

                gain.gain.setValueAtTime(0.2, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(startTime);
                osc.stop(startTime + note.d);
            });
        } catch (e) {
            console.warn('Audio play error', e);
        }
    }

    // Text-To-Speech (Membaca Teks Bahasa Indonesia Ramah Anak)
    speakText(text, onStart, onEnd) {
        if (this.muted) {
            if (onEnd) onEnd();
            return;
        }

        if (!('speechSynthesis' in window)) {
            alert('Browser Anda tidak mendukung suara Text-to-Speech.');
            if (onEnd) onEnd();
            return;
        }

        window.speechSynthesis.cancel(); // Stop suara sebelumnya

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        utterance.rate = 0.9; // Kecepatan sedikit santai untuk anak kelas 3
        utterance.pitch = 1.1; // Nada ceria

        // Coba cari suara bahasa Indonesia
        const voices = window.speechSynthesis.getVoices();
        const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID') || v.name.toLowerCase().includes('indonesia'));
        if (idVoice) {
            utterance.voice = idVoice;
        }

        if (onStart) utterance.onstart = onStart;
        utterance.onend = () => {
            if (onEnd) onEnd();
        };
        utterance.onerror = (e) => {
            console.warn('TTS error:', e);
            if (onEnd) onEnd();
        };

        window.speechSynthesis.speak(utterance);
    }

    stopSpeech() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }
}

// Inisialisasi Audio Global
const appSound = new SoundEffects();
