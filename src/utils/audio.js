// Web Audio API Synthesizer for Authentic Rubber Stamp Thump
// Zero external audio files required, instant playback, works offline!

let audioCtx = null;
let soundEnabled = true;

try {
  const saved = localStorage.getItem('bd_food_passport_sound');
  if (saved !== null) {
    soundEnabled = saved === 'true';
  }
} catch (e) {
  soundEnabled = true;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
  try {
    localStorage.setItem('bd_food_passport_sound', String(enabled));
  } catch (e) {}
}

export function playStampSound() {
  if (!soundEnabled) return;

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx || audioCtx.state === 'suspended') {
      audioCtx = new AudioContextClass();
    }

    const ctx = audioCtx;
    const now = ctx.currentTime;

    // 1. Deep Bass Rubber Impact (Thump)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.12);

    oscGain.gain.setValueAtTime(0.85, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);

    // 2. High-frequency click/snap (Wood handle hit)
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();

    clickOsc.type = 'sine';
    clickOsc.frequency.setValueAtTime(450, now);
    clickOsc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

    clickGain.gain.setValueAtTime(0.5, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);

    clickOsc.start(now);
    clickOsc.stop(now + 0.05);

    // 3. Tactile Paper Friction Noise
    const bufferSize = ctx.sampleRate * 0.06;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 800;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);

    // 4. Mobile Haptic Vibration Feedback if supported
    if (navigator.vibrate) {
      navigator.vibrate([35, 20, 50]);
    }
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
}
