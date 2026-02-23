/**
 * DemoSounds - Web Audio API sound effects
 */

interface WebkitWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

let audioCtx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext {
  if (!audioCtx) {
    const W = window as WebkitWindow;
    const AudioCtxClass = window.AudioContext || W.webkitAudioContext;
    if (!AudioCtxClass) throw new Error('AudioContext not supported');
    audioCtx = new AudioCtxClass();
  }
  return audioCtx;
}

function playTone(freq: number, duration: number, type: OscillatorType, volume = 0.15): void {
  if (muted) return;
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = type;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (_e) { /* ignore */ }
}

interface DemoSoundsAPI {
  pop(): void;
  whoosh(): void;
  success(): void;
  notification(): void;
  setMuted(m: boolean): void;
  isMuted(): boolean;
}

const DemoSounds: DemoSoundsAPI = {
  pop() {
    playTone(400, 0.08, 'sine', 0.12);
    setTimeout(() => playTone(600, 0.06, 'sine', 0.08), 30);
  },
  whoosh() {
    if (muted) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.4);
      filter.frequency.value = 2000;
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } catch (_e) { /* ignore */ }
  },
  success() {
    playTone(523, 0.15, 'sine', 0.1);
    setTimeout(() => playTone(659, 0.15, 'sine', 0.1), 120);
    setTimeout(() => playTone(784, 0.25, 'sine', 0.12), 240);
  },
  notification() {
    if (muted) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch (_e) { /* ignore */ }
  },
  setMuted(m: boolean) { muted = m; },
  isMuted() { return muted; },
};

export default DemoSounds;
