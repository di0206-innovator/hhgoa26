// Web Audio API Synthesizer for Forge Goa Micro-Interactions

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playClickSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.warn('Audio click error:', e);
  }
}

export function playChimeSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.06, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.2);
    });
  } catch (e) {
    console.warn('Audio chime error:', e);
  }
}

export function playStampSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Heavy thud
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);

    // High resonance sparkle
    setTimeout(() => playChimeSound(), 100);
  } catch (e) {
    console.warn('Audio stamp error:', e);
  }
}

let oceanGainNode: GainNode | null = null;
let oceanSourceNode: AudioBufferSourceNode | null = null;
let isOceanPlaying = false;

export function toggleOceanAmbient(): boolean {
  try {
    const ctx = getAudioContext();

    if (isOceanPlaying && oceanGainNode) {
      oceanGainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      setTimeout(() => {
        if (oceanSourceNode) {
          oceanSourceNode.stop();
          oceanSourceNode.disconnect();
          oceanSourceNode = null;
        }
        oceanGainNode = null;
      }, 500);
      isOceanPlaying = false;
      return false;
    } else {
      // Create Pink Noise Buffer for ocean waves
      const bufferSize = ctx.sampleRate * 3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        data[i] *= 0.05;
        b6 = white * 0.115926;
      }

      oceanSourceNode = ctx.createBufferSource();
      oceanSourceNode.buffer = buffer;
      oceanSourceNode.loop = true;

      // Low pass filter to emulate waves
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);

      // LFO for wave swelling
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // 10s wave period
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(250, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      oceanGainNode = ctx.createGain();
      oceanGainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      oceanGainNode.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1);

      oceanSourceNode.connect(filter);
      filter.connect(oceanGainNode);
      oceanGainNode.connect(ctx.destination);

      lfo.start();
      oceanSourceNode.start();
      isOceanPlaying = true;
      return true;
    }
  } catch (e) {
    console.warn('Ocean ambient error:', e);
    return false;
  }
}
