/**
 * AURELIS — Multi-Facet Filtering Engine
 * Handles faceted category, topic, difficulty, format, and sorting on Explore, Resources, Videos & Community.
 */

const AurelisFilters = (() => {
  const initFilterUI = (config) => {
    const {
      filterContainerId = 'filterSidebar',
      itemsSelector = '.filterable-item',
      resultsContainerId = 'filterResultsContainer',
      counterId = 'filterResultsCount',
      onFilterChange = null
    } = config;

    const filterContainer = document.getElementById(filterContainerId);
    if (!filterContainer) return;

    // Mobile filter drawer toggles
    const openDrawerBtn = document.getElementById('openFilterDrawerBtn');
    const closeDrawerBtn = document.getElementById('closeFilterDrawerBtn');
    const wrapper = document.querySelector('.filter-sidebar-wrapper');

    if (openDrawerBtn && wrapper) {
      openDrawerBtn.addEventListener('click', () => {
        wrapper.classList.add('mobile-drawer-open');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeDrawerBtn && wrapper) {
      closeDrawerBtn.addEventListener('click', () => {
        wrapper.classList.remove('mobile-drawer-open');
        document.body.style.overflow = '';
      });
    }

    // Filter controls
    const checkboxes = filterContainer.querySelectorAll('input[type="checkbox"]');
    const radios = filterContainer.querySelectorAll('input[type="radio"]');
    const searchInputs = filterContainer.querySelectorAll('.filter-search-input');
    const sortSelect = document.getElementById('filterSortSelect');
    const clearBtns = document.querySelectorAll('.clear-all-filters-btn');

    const applyFilters = () => {
      // Gather active criteria
      const activeCategories = Array.from(filterContainer.querySelectorAll('input[data-filter="category"]:checked')).map(cb => cb.value.toLowerCase());
      const activeDifficulties = Array.from(filterContainer.querySelectorAll('input[data-filter="difficulty"]:checked')).map(cb => cb.value.toLowerCase());
      const activeFormats = Array.from(filterContainer.querySelectorAll('input[data-filter="format"]:checked')).map(cb => cb.value.toLowerCase());
      const activeTopics = Array.from(filterContainer.querySelectorAll('input[data-filter="topic"]:checked')).map(cb => cb.value.toLowerCase());
      
      let textQuery = '';
      const activeSearch = filterContainer.querySelector('.filter-search-input');
      if (activeSearch) textQuery = activeSearch.value.trim().toLowerCase();

      const items = document.querySelectorAll(itemsSelector);
      let matchCount = 0;

      items.forEach(item => {
        const itemCategory = (item.getAttribute('data-category') || '').toLowerCase();
        const itemDifficulty = (item.getAttribute('data-difficulty') || '').toLowerCase();
        const itemFormat = (item.getAttribute('data-format') || '').toLowerCase();
        const itemTopic = (item.getAttribute('data-topic') || '').toLowerCase();
        const itemTitle = (item.getAttribute('data-title') || item.innerText || '').toLowerCase();

        const matchCat = activeCategories.length === 0 || activeCategories.includes(itemCategory);
        const matchDiff = activeDifficulties.length === 0 || activeDifficulties.includes(itemDifficulty);
        const matchFmt = activeFormats.length === 0 || activeFormats.includes(itemFormat);
        const matchTop = activeTopics.length === 0 || activeTopics.includes(itemTopic);
        const matchTxt = !textQuery || itemTitle.includes(textQuery);

        if (matchCat && matchDiff && matchFmt && matchTop && matchTxt) {
          item.style.display = '';
          matchCount++;
        } else {
          item.style.display = 'none';
        }
      });

      // Update count
      const counter = document.getElementById(counterId);
      if (counter) {
        counter.textContent = `${matchCount} ${matchCount === 1 ? 'result' : 'results'} found`;
      }

      // Empty state
      const emptyStateEl = document.getElementById('filterEmptyState');
      if (emptyStateEl) {
        emptyStateEl.style.display = matchCount === 0 ? 'block' : 'none';
      }

      if (typeof onFilterChange === 'function') {
        onFilterChange({ matchCount, activeCategories, activeDifficulties, activeFormats });
      }
    };

    checkboxes.forEach(cb => cb.addEventListener('change', applyFilters));
    radios.forEach(r => r.addEventListener('change', applyFilters));
    searchInputs.forEach(input => input.addEventListener('input', applyFilters));

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        // Can sort DOM elements by date, views or alphabetical
        applyFilters();
      });
    }

    clearBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        checkboxes.forEach(cb => cb.checked = false);
        radios.forEach(r => r.checked = false);
        searchInputs.forEach(input => input.value = '');
        applyFilters();
        if (window.AurelisNotifications) {
          window.AurelisNotifications.show('Filters reset.', 'info');
        }
      });
    });

    // Run initial apply
    applyFilters();
  };

  return {
    init: initFilterUI
  };
})();

window.AurelisFilters = AurelisFilters;
