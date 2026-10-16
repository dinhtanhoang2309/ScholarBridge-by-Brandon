// Main Application Orchestrator for ScholarBridge by Brandon

import { initScrollStory } from './scroll-story.js';
import { initAchievementsArchive } from './achievements-filter.js';
import { initPackageBuilder } from './package-builder.js';
import { initCheckout } from './checkout-payment.js';
import { initFormHandlers } from './form-handler.js';
import { RESOURCES } from './data/resources.js';
import { FAQ_ITEMS } from './data/faq.js';

// Central configuration variable for future video embed (Section 7)
export const siteConfig = {
  founderVideoUrl: "", // Paste future YouTube, Vimeo, or MP4 URL here
  bcaAccount: "5379413109186509",
  bcaHolder: "Tan Hoang DINH",
  bcaSwift: "CENAIDJA"
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Scroll-Driven Animation & Story Synchronizer
  initScrollStory();

  // 2. Initialize Achievements Filter & Search Archive
  initAchievementsArchive();

  // 3. Initialize Services, Pricing & Package Builder
  initPackageBuilder();

  // 4. Initialize Checkout & Payment Verification Flow
  initCheckout();

  // 5. Initialize Formspree Integration & Mentee Registration
  initFormHandlers();

  // 6. Render Resources & Guides
  renderResources();

  // 7. Render FAQ Accordion
  renderFaq();

  // 8. Setup 6-Stage Mentorship Journey Tabs
  initMentorshipStages();

  // 9. Setup Verified Metric Counters
  initCountUps();

  // 10. Setup Video Section Handler
  initVideoPlayer();

  // 11. Setup Mobile Navigation Menu
  initMobileNav();

  // 12. Setup Policy Modals
  initPolicyModals();
});

function renderResources() {
  const container = document.getElementById('resources-grid');
  if (!container) return;

  container.innerHTML = RESOURCES.map(res => `
    <article class="editorial-card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span class="editorial-tag">${res.categoryLabel}</span>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #687583;">${res.readTime}</span>
        </div>
        <h3 style="font-size: 1.25rem; color: #101D2C; margin-bottom: 8px;">${res.title}</h3>
        <p style="font-size: 0.875rem; color: #596773; line-height: 1.55; margin-bottom: 12px;">${res.summary}</p>
      </div>
      <div style="background: #F7F3EB; padding: 10px 14px; border-radius: 4px; border-left: 2px solid #B77A56; margin-top: 12px;">
        <span style="font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.08em; color: #8F5938; display: block; font-weight: 700;">Key Takeaway</span>
        <span style="font-size: 0.8125rem; color: #202A32; font-style: italic;">"${res.keyTakeaway}"</span>
      </div>
    </article>
  `).join('');
}

function renderFaq() {
  const container = document.getElementById('faq-accordion-list');
  if (!container) return;

  container.innerHTML = FAQ_ITEMS.map((item, idx) => `
    <div class="faq-item" data-index="${idx}">
      <button class="faq-question-btn" aria-expanded="false">
        <span>${item.question}</span>
        <span class="faq-icon-cross">+</span>
      </button>
      <div class="faq-answer-panel">
        <p>${item.answer}</p>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.faq-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      const isOpen = parent.classList.contains('active');

      container.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        parent.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initMentorshipStages() {
  const tabs = document.querySelectorAll('.stage-tab-btn');
  const panels = document.querySelectorAll('.stage-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-stage');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

function initCountUps() {
  const counterElements = document.querySelectorAll('.count-up-number');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        let startVal = 0;
        const duration = 1800;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.floor(easeProgress * targetVal);

          el.textContent = currentCount + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = targetVal + suffix;
          }
        }

        requestAnimationFrame(updateCount);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => observer.observe(el));
}

function initVideoPlayer() {
  const playBtn = document.getElementById('video-play-btn');
  if (!playBtn) return;

  playBtn.addEventListener('click', () => {
    if (siteConfig.founderVideoUrl) {
      window.open(siteConfig.founderVideoUrl, '_blank');
    } else {
      alert("Introduction Video Section: Brandon's personal intro video is scheduled for recording. Developers/owners can easily link future videos by setting 'founderVideoUrl' in js/main.js.");
    }
  });
}

function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('mobile-nav-close');

  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && mobileNav) {
    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close when clicking mobile links
  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

function initPolicyModals() {
  const modal = document.getElementById('policy-modal');
  const modalTitle = document.getElementById('policy-modal-title');
  const modalContent = document.getElementById('policy-modal-content');
  const closeBtn = document.getElementById('policy-modal-close');

  const policies = {
    privacy: {
      title: "Privacy & Data Protection Notice",
      content: `
        <p><strong>1. Information Collection & Purpose</strong><br>ScholarBridge by Brandon collects only essential personal information required to deliver mentorship and review application documents (such as your name, email, target educational programmes, and optional application drafts). We never collect government identity numbers, passport scans, or bank login credentials.</p>
        <p><strong>2. Confidentiality & Security</strong><br>Your submitted personal statements, essays, and CVs are held strictly confidential. They are never published, shared with third parties, or used for automated AI model training.</p>
        <p><strong>3. Data Retention & Deletion</strong><br>You may request the full deletion of all submitted application drafts and personal records at any time by emailing dinhtanhoang2309@gmail.com.</p>
      `
    },
    terms: {
      title: "Terms of Service & Mentorship Scope",
      content: `
        <p><strong>1. Peer Mentorship Model</strong><br>ScholarBridge by Brandon is an independent peer mentorship practice founded by Tan Hoang (Brandon) Dinh, an undergraduate Economic Development student and KNB Indonesian Government Scholar. It is not an accredited admissions agency, university representative, or visa legal counsel.</p>
        <p><strong>2. Scope of Services</strong><br>Mentorship is provided for international short-term programmes (youth summits, conferences) and undergraduate scholarship applications. We do not provide Master's or PhD consulting.</p>
        <p><strong>3. No Guarantees</strong><br>ScholarBridge makes no guarantees of scholarship awards, university admissions, visa issuances, or selection outcomes. Official decisions reside solely with evaluation committees.</p>
      `
    },
    refund: {
      title: "Cancellation & Refund Policy",
      content: `
        <p><strong>1. Rescheduling Live Sessions</strong><br>Scheduled 1-on-1 consultations, strategy sessions, and mock interviews may be rescheduled free of charge with at least 24 hours advance notice via email.</p>
        <p><strong>2. Written Document Reviews</strong><br>Refund requests for written document reviews (CVs, personal statements, motivation letters) will be granted in full if requested prior to the mentor initiating review work.</p>
        <p><strong>3. Order Reference Recovery</strong><br>If payment has been verified but technical difficulties occur during Formspree submission, your unique Order Reference securely preserves your entitlement to mentorship without repayment.</p>
      `
    }
  };

  document.querySelectorAll('[data-policy]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const policyKey = btn.getAttribute('data-policy');
      const policy = policies[policyKey];
      if (policy && modal) {
        modalTitle.textContent = policy.title;
        modalContent.innerHTML = policy.content;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
}
