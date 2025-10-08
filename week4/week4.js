document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay');
  const overlayTextEl = document.getElementById('overlayText');
  const response = document.getElementById('response');
  const meterFill = document.getElementById('meterFill');

  let progress = 0;
  const clickGain = 7;
  const decayPerTick = 1.1;
  const tickMs = 90;
  let shakeLevel = '';

  function setProgress(p) {
    progress = Math.max(0, Math.min(100, p));
    meterFill.style.height = progress + '%';

    overlay.classList.remove('shakeLight', 'shakeMedium', 'shakeStrong', 'shakeExtreme');
    if (progress > 20 && progress < 50) {
      overlay.classList.add('shakeLight');
    } else if (progress >= 50 && progress < 75) {
      overlay.classList.add('shakeMedium');
    } else if (progress >= 75 && progress < 90) {
      overlay.classList.add('shakeStrong');
    } else if (progress >= 90 && progress < 100) {
      overlay.classList.add('shakeExtreme');
    }

    if (progress >= 100) breakOverlay();
  }

  const timer = setInterval(() => {
    if (overlay.dataset.broken === '1') return;
    setProgress(progress - decayPerTick);
  }, tickMs);

  function breakOverlay() {
    if (overlay.dataset.broken === '1') return;
    overlay.dataset.broken = '1';
    overlay.classList.remove('shakeLight', 'shakeMedium', 'shakeStrong', 'shakeExtreme');
    overlay.classList.add('breaking');

    setTimeout(() => {
      overlay.style.display = 'none';
      response.classList.remove('hidden');
      clearInterval(timer);
    }, 1500);
  }

  function handleActivate() {
    if (overlay.dataset.broken === '1') return;
    setProgress(progress + clickGain);
  }

  overlay.addEventListener('click', handleActivate);
  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleActivate();
    }
  });
});