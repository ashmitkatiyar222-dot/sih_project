/**
 * Generates a realistic skeuomorphic mechanical rotary dial click sound.
 * Uses a cached singleton AudioContext to eliminate UI-thread latency when clicking.
 */
let sharedAudioCtx = null;

export function playDialClickSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!sharedAudioCtx) {
      sharedAudioCtx = new AudioContextClass();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume();
    }

    const osc = sharedAudioCtx.createOscillator();
    const gain = sharedAudioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, sharedAudioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, sharedAudioCtx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.18, sharedAudioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, sharedAudioCtx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(sharedAudioCtx.destination);

    osc.start();
    osc.stop(sharedAudioCtx.currentTime + 0.035);
  } catch (e) {
    // Graceful fallback if audio context is blocked
  }
}
