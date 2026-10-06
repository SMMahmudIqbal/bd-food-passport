import confetti from 'canvas-confetti';

export function fireStampConfetti() {
  confetti({
    particleCount: 25,
    spread: 55,
    origin: { y: 0.8 },
    colors: ['#006a4e', '#f42a41', '#0d9488', '#f59e0b', '#10b981'],
    disableForReducedMotion: true
  });
}

export function fireMilestoneConfetti() {
  confetti({
    particleCount: 50,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#f59e0b', '#10b981', '#06b6d4', '#ec4899', '#8b5cf6'],
    disableForReducedMotion: true
  });
}
