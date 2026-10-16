// Achievements Search, Filtering, and Modal Handler for ScholarBridge

import { ACHIEVEMENTS } from './data/achievements.js';

export function initAchievementsArchive() {
  const grid = document.getElementById('achievements-grid');
  const searchInput = document.getElementById('achievements-search');
  const categoryButtons = document.querySelectorAll('.category-pill-btn');
  const countBadge = document.getElementById('achievements-count');

  if (!grid) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function renderCards() {
    const filtered = ACHIEVEMENTS.filter(item => {
      const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        item.title.toLowerCase().includes(query) ||
        item.organization.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.date.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} Verified Entries`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: #fff; border: 1px solid #DED8CD; border-radius: 4px;">
          <p style="font-family: var(--font-serif); font-size: 1.25rem; color: #101D2C; margin-bottom: 8px;">No verified achievements match your search.</p>
          <p style="color: #687583; font-size: 0.875rem;">Try clearing your search query or selecting a different category tab.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <article class="achievement-item-card" data-id="${item.id}">
        <div>
          <div class="achievement-meta">
            <span class="editorial-tag ${item.highlight ? 'copper' : ''}">${item.categoryLabel}</span>
            <span class="achievement-date">${item.date}</span>
          </div>
          <h3 class="achievement-title">${item.title}</h3>
          <p class="achievement-org">${item.organization}</p>
          <p class="achievement-desc">${item.description}</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #DED8CD; padding-top: 12px; margin-top: 12px;">
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #37635F; font-weight: 600;">${item.status}</span>
          ${item.evidenceUrl ? `
            <a href="${item.evidenceUrl}" target="_blank" rel="noopener noreferrer" class="evidence-btn-link" title="Open verified official evidence document">
              Verify Evidence ↗
            </a>
          ` : ''}
        </div>
      </article>
    `).join('');
  }

  // Event Listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCards();
    });
  }

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderCards();
    });
  });

  // Initial render
  renderCards();
}
