// glitch.js
(() => {
  const glitchBtn = document.getElementById('glitchBtn');
  const resetBtn = document.getElementById('resetBtn');
  const progressWrap = document.getElementById('progressWrap');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const warningPlate = document.getElementById('warningPlate');
  const overlays = {
    scanlines: document.querySelector('.scanlines'),
    noise: document.querySelector('.noise'),
    rgb: document.querySelector('.rgb-split'),
    flicker: document.querySelector('.flicker')
  };
  const content = document.getElementById('content');
  const desc = document.getElementById('desc');
  const corruptTargets = Array.from(document.querySelectorAll('p, li, h1, h2'));

  // small helper: show overlay and hide after time
  function showOverlay(name, opacity=1, timeout=1200) {
    const el = overlays[name];
    if(!el) return;
    el.style.opacity = opacity;
    setTimeout(() => el.style.opacity = 0, timeout);
  }

  // corrupt some characters in a node text for a short time
  function brieflyCorrupt(node, intensity=0.08, duration=900) {
    const original = node.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()[]{}<>?/';
    const arr = original.split('');
    const corrupted = arr.map(c => (Math.random() < intensity && c !== ' ') ? chars[Math.floor(Math.random()*chars.length)] : c).join('');
    node.textContent = corrupted;
    node.classList.add('corrupt');
    setTimeout(() => {
      node.textContent = original;
      node.classList.remove('corrupt');
    }, duration);
  }

  // animate a simulated progress bar from current -> to
  function animateProgress(duration = 5000) {
    progressWrap.style.display = 'flex';
    progressBar.style.width = '0%';
    progressText.innerText = '0% — scanning...';

    const start = Date.now();
    const end = start + duration;
    const step = () => {
      const now = Date.now();
      const pct = Math.min(100, Math.floor(((now - start) / (end - start)) * 100));
      progressBar.style.width = pct + '%';
      if (pct < 100) {
        progressText.innerText = pct + '% — scanning...';
        requestAnimationFrame(step);
      } else {
        progressText.innerText = '100% — threat detected';
      }
    };
    requestAnimationFrame(step);
  }

  // main glitch sequence
  function runGlitchSequence() {
    // initial subtle overlays
    showOverlay('scanlines', 0.25, 1200);
    showOverlay('noise', 0.55, 2000);
    content.style.animation = 'panelFlicker 0.9s linear';
    content.style.boxShadow = '0 10px 60px rgba(255,60,60,0.06)';
    // slight shake
    content.style.transform = 'translateX(0)';
    setTimeout(() => content.style.transform = 'translateX(0)', 1000);

    // show rgb split + flicker multiple times
    setTimeout(()=> showOverlay('rgb', 0.9, 1400), 300);
    setTimeout(()=> showOverlay('flicker', 1.0, 600), 700);
    setTimeout(()=> showOverlay('rgb', 0.9, 900), 1300);
    setTimeout(()=> showOverlay('flicker', 1.0, 400), 1700);

    // corrupt random nodes a few times
    const nodes = corruptTargets.filter(n => n && n.textContent.trim());
    for(let i=0;i<6;i++){
      setTimeout(()=> {
        const node = nodes[Math.floor(Math.random()*nodes.length)];
        brieflyCorrupt(node, 0.16 + Math.random()*0.3, 700 + Math.floor(Math.random()*900));
      }, 500 + i*350);
    }

    // show the warning plate and animate a fake progress
    setTimeout(()=> {
      warningPlate.style.display = 'block';
      warningPlate.style.opacity = '1';
    }, 1200);

    // animate progress bar
    animateProgress(5200);

    // after sequence, keep the warning for a bit then reveal final message
    setTimeout(()=> {
      // final flicker and removal
      showOverlay('flicker', 1.0, 900);
      // show final message by changing the warning body
      document.querySelector('.warning-body').textContent = 'Simulation complete. No data stored. Review the red flags and take the short quiz to practice.';
      // optionally, show small confetti or effect (omitted for simplicity)
    }, 7000);
  }

  function resetAll() {
    progressWrap.style.display = 'none';
    progressBar.style.width = '0%';
    progressText.innerText = '0% — scanning...';
    warningPlate.style.display = 'none';
    // clear any corrupt classes and restore text (reloading page would also restore)
    // simplest: reload original content by location.reload() if dev comfortable
    // but we will quickly restore by reloading text nodes from DOM using dataset if implemented.
  }

  glitchBtn.addEventListener('click', runGlitchSequence);
  resetBtn.addEventListener('click', resetAll);

  // optional: auto-run if you want to demo immediately
  // window.addEventListener('load', () => setTimeout(runGlitchSequence, 1000));
})();
