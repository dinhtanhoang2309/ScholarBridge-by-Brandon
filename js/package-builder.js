// Package Builder & Service Selector for ScholarBridge by Brandon

import { PACKAGES, BUNDLES, SERVICES } from './data/services.js';
import { openCheckoutModal } from './checkout-payment.js';

export function initPackageBuilder() {
  const packagesContainer = document.getElementById('packages-container');
  const bundlesContainer = document.getElementById('bundles-container');
  const servicesContainer = document.getElementById('services-container');
  const catalogTabBtns = document.querySelectorAll('.catalog-tab-btn');
  const catalogViews = document.querySelectorAll('.catalog-view');
  const needSelector = document.getElementById('need-selector');

  // Render Packages
  if (packagesContainer) {
    packagesContainer.innerHTML = PACKAGES.map(pkg => `
      <article class="package-card ${pkg.popular ? 'popular' : ''}" data-id="${pkg.id}">
        ${pkg.popular ? '<span class="popular-badge">Recommended</span>' : ''}
        <h3 style="font-size: 1.4rem; color: #101D2C; margin-bottom: 6px;">${pkg.name}</h3>
        <p style="font-size: 0.8125rem; color: #687583; min-height: 38px;">${pkg.tagline}</p>
        
        <div class="package-price-wrap">
          <span class="currency-sign">$</span>
          <span class="price-num">${pkg.price}</span>
          <span class="price-period">USD / package</span>
        </div>

        <p style="font-size: 0.8125rem; font-weight: 600; color: #37635F; margin-bottom: 8px;">
          Best for: ${pkg.bestFor}
        </p>

        <ul class="inclusions-list">
          ${pkg.inclusions.map(inc => `<li>${inc}</li>`).join('')}
        </ul>

        <ul class="exclusions-list">
          ${pkg.exclusions.map(exc => `<li>${exc}</li>`).join('')}
        </ul>

        <button class="btn ${pkg.popular ? 'btn-copper' : 'btn-primary'} select-item-btn" 
          data-type="package" 
          data-id="${pkg.id}" 
          data-name="${pkg.name}" 
          data-price="${pkg.price}">
          Select This Package
        </button>
      </article>
    `).join('');
  }

  // Render Bundles
  if (bundlesContainer) {
    bundlesContainer.innerHTML = BUNDLES.map(bdl => `
      <article class="editorial-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
            <h3 style="font-size: 1.25rem; color: #101D2C;">${bdl.name}</h3>
            <span class="editorial-tag copper">Save $${bdl.savings}</span>
          </div>
          <p style="font-size: 0.875rem; color: #596773; margin-bottom: 16px;">${bdl.description}</p>
          <div class="package-price-wrap" style="margin: 8px 0 16px;">
            <span class="currency-sign">$</span>
            <span class="price-num">${bdl.price}</span>
            <span style="font-size: 0.875rem; color: #687583; text-decoration: line-through; margin-left: 8px;">$${bdl.originalPrice}</span>
          </div>
          <ul class="inclusions-list" style="margin-bottom: 16px;">
            ${bdl.includes.map(inc => `<li>${inc}</li>`).join('')}
          </ul>
        </div>
        <button class="btn btn-secondary select-item-btn" 
          data-type="bundle" 
          data-id="${bdl.id}" 
          data-name="${bdl.name}" 
          data-price="${bdl.price}">
          Select This Bundle
        </button>
      </article>
    `).join('');
  }

  // Render Individual Services
  if (servicesContainer) {
    servicesContainer.innerHTML = SERVICES.map(srv => `
      <article class="editorial-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
            <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: #101D2C;">${srv.name}</h4>
            <span style="font-family: var(--font-serif); font-size: 1.35rem; color: #B77A56; font-weight: bold; white-space: nowrap;">$${srv.price}</span>
          </div>
          <p style="font-size: 0.8125rem; color: #37635F; font-weight: 600; margin-bottom: 6px;">
            Deliverable: ${srv.deliverable}
          </p>
          <p style="font-size: 0.8125rem; color: #687583; margin-bottom: 12px;">
            Turnaround: ${srv.turnaround}
          </p>
          <ul class="inclusions-list" style="font-size: 0.8125rem; margin-bottom: 14px;">
            ${srv.inclusions.slice(0, 2).map(inc => `<li>${inc}</li>`).join('')}
          </ul>
        </div>
        <button class="btn btn-sm btn-secondary select-item-btn" 
          data-type="service" 
          data-id="${srv.id}" 
          data-name="${srv.name}" 
          data-price="${srv.price}">
          Select Service
        </button>
      </article>
    `).join('');
  }

  // Tab switching between Packages / Bundles / Individual Services
  catalogTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catalogTabBtns.forEach(b => b.classList.remove('active'));
      catalogViews.forEach(v => v.style.display = 'none');

      btn.classList.add('active');
      const targetView = document.getElementById(btn.getAttribute('data-view'));
      if (targetView) targetView.style.display = 'grid';
    });
  });

  // Need Selector interactive recommendation
  if (needSelector) {
    needSelector.addEventListener('change', (e) => {
      const need = e.target.value;
      if (!need) return;

      // Switch to packages tab
      const packagesTab = document.querySelector('.catalog-tab-btn[data-view="packages-view"]');
      if (packagesTab) packagesTab.click();

      // Highlight recommended card
      const cards = document.querySelectorAll('.package-card');
      cards.forEach(c => c.style.outline = 'none');

      let targetId = 'scholarship-application-plus';
      if (need === 'short-term') targetId = 'quick-start';
      if (need === 'cv-essays') targetId = 'application-builder';
      if (need === 'interview') targetId = 'interview-ready';
      if (need === 'exploring') targetId = 'scholarship-starter';
      if (need === 'complete') targetId = 'complete-application-mentorship';

      const match = document.querySelector(`.package-card[data-id="${targetId}"]`);
      if (match) {
        match.scrollIntoView({ behavior: 'smooth', block: 'center' });
        match.style.outline = '3px solid #B77A56';
      }
    });
  }

  // Global delegate for "Select" buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.select-item-btn');
    if (!btn) return;

    const itemName = btn.getAttribute('data-name');
    const itemPrice = parseInt(btn.getAttribute('data-price'), 10);
    const itemType = btn.getAttribute('data-type');
    const itemId = btn.getAttribute('data-id');

    openCheckoutModal({
      id: itemId,
      name: itemName,
      price: itemPrice,
      type: itemType
    });
  });
}
