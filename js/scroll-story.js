// Scroll-Driven Frame Animation Synchronizer for ScholarBridge by Brandon

export function initScrollStory() {
  const TOTAL_FRAMES = 240;
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: false });
  const scrollSection = document.getElementById('hero-scroll-experience');
  const chapters = document.querySelectorAll('.narrative-chapter');
  const progressSidebar = document.getElementById('scroll-progress-sidebar');
  const progressBarFill = document.getElementById('scroll-fill');
  const progressLabel = document.getElementById('scroll-frame-num');
  const siteHeader = document.querySelector('.site-header');

  const frames = new Array(TOTAL_FRAMES);
  const loaded = new Array(TOTAL_FRAMES).fill(false);
  let framesLoadedCount = 0;
  let hasDrawnFirst = false;

  function getFrameUrl(idx) {
    const padded = String(idx + 1).padStart(3, '0');
    return `frames/ezgif-frame-${padded}.jpg`;
  }

  // Preload and decode images
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = getFrameUrl(i);
    frames[i] = img;

    if (img.decode) {
      img.decode().then(() => {
        loaded[i] = true;
        framesLoadedCount++;
        if (i === 0 && !hasDrawnFirst) {
          drawFrame(0);
        }
      }).catch(() => {
        img.onload = () => {
          loaded[i] = true;
          framesLoadedCount++;
          if (i === 0 && !hasDrawnFirst) drawFrame(0);
        };
      });
    } else {
      img.onload = () => {
        loaded[i] = true;
        framesLoadedCount++;
        if (i === 0 && !hasDrawnFirst) drawFrame(0);
      };
    }
  }

  let targetFrame = 0;
  let currentFrame = 0;
  let lastDrawnFrame = -1;
  let needsRedraw = false;
  const DAMPING = 0.085; // Silky-smooth interpolation

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    needsRedraw = true;
  }

  function getBestFrame(targetIdx) {
    if (loaded[targetIdx] && frames[targetIdx].naturalWidth > 0) {
      return frames[targetIdx];
    }
    // Search backward
    for (let b = targetIdx - 1; b >= 0; b--) {
      if (loaded[b] && frames[b].naturalWidth > 0) return frames[b];
    }
    // Search forward
    for (let f = targetIdx + 1; f < TOTAL_FRAMES; f++) {
      if (loaded[f] && frames[f].naturalWidth > 0) return frames[f];
    }
    return frames[0].naturalWidth > 0 ? frames[0] : null;
  }

  function drawFrame(frameIdx) {
    const idx = Math.min(Math.max(Math.round(frameIdx), 0), TOTAL_FRAMES - 1);
    const img = getBestFrame(idx);
    if (!img || !img.naturalWidth) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const canvasRatio = cw / ch;
    const imgRatio = iw / ih;

    let drawW, drawH, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawW = cw;
      drawH = cw / imgRatio;
      drawX = 0;
      drawY = (ch - drawH) / 2;
    } else {
      drawH = ch;
      drawW = ch * imgRatio;
      drawX = (cw - drawW) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    lastDrawnFrame = idx;
    hasDrawnFirst = true;
    needsRedraw = false;
  }

  function updateScroll() {
    if (!scrollSection) return;

    const rect = scrollSection.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = scrollSection.offsetHeight - window.innerHeight;

    let scrollProgress = (window.scrollY - sectionTop) / sectionHeight;
    scrollProgress = Math.min(Math.max(scrollProgress, 0), 1);

    targetFrame = scrollProgress * (TOTAL_FRAMES - 1);

    // Update Progress Sidebar
    if (progressSidebar) {
      if (window.scrollY < sectionTop + sectionHeight + 100) {
        progressSidebar.classList.remove('hidden');
        if (progressBarFill) progressBarFill.style.width = `${Math.round(scrollProgress * 100)}%`;
        if (progressLabel) {
          const curNum = String(Math.round(targetFrame) + 1).padStart(3, '0');
          progressLabel.textContent = `FRAME ${curNum} / ${TOTAL_FRAMES}`;
        }
      } else {
        progressSidebar.classList.add('hidden');
      }
    }

    // Toggle light header styling when scrolled past hero experience
    if (siteHeader) {
      if (window.scrollY >= sectionTop + sectionHeight - 60) {
        siteHeader.classList.add('scrolled-light');
      } else {
        siteHeader.classList.remove('scrolled-light');
      }
    }

    // Update Active Editorial Chapters
    // Chapter 1: 0 to 59
    // Chapter 2: 60 to 119
    // Chapter 3: 120 to 179
    // Chapter 4: 180 to 239
    const activeFrame = Math.round(targetFrame);
    let activeChapterNum = 1;
    if (activeFrame >= 180) {
      activeChapterNum = 4;
    } else if (activeFrame >= 120) {
      activeChapterNum = 3;
    } else if (activeFrame >= 60) {
      activeChapterNum = 2;
    } else {
      activeChapterNum = 1;
    }

    chapters.forEach(chap => {
      const chapNum = parseInt(chap.getAttribute('data-chapter'), 10);
      if (chapNum === activeChapterNum) {
        chap.classList.add('active');
      } else {
        chap.classList.remove('active');
      }
    });
  }

  function renderLoop() {
    const diff = targetFrame - currentFrame;
    if (Math.abs(diff) > 0.001) {
      currentFrame += diff * DAMPING;
    } else {
      currentFrame = targetFrame;
    }

    const frameToDraw = Math.round(currentFrame);
    if (frameToDraw !== lastDrawnFrame || needsRedraw) {
      drawFrame(frameToDraw);
    }

    requestAnimationFrame(renderLoop);
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', () => {
    resizeCanvas();
    updateScroll();
  }, { passive: true });

  resizeCanvas();
  updateScroll();
  renderLoop();

  if (frames[0].complete && frames[0].naturalWidth > 0) {
    loaded[0] = true;
    drawFrame(0);
  }
}
