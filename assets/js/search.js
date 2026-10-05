/**
 * AURELIS — Global Knowledge Search Engine
 * Full-text multi-index search across Knowledge Articles, Videos, Resources, Glossary & Discussions.
 * Includes '/' keyboard shortcut, live categorized filtering, and recent query tracking.
 */

const AurelisSearch = (() => {
  const RECENT_SEARCHES_KEY = 'aurelis_recent_searches';

  // Comprehensive Knowledge Index
  const SEARCH_DATABASE = [
    // Knowledge Articles
    {
      id: 'art-1',
      type: 'knowledge',
      title: 'Understanding Automatic Watch Movements',
      category: 'Watch Movements',
      snippet: 'Deep dive into the kinetic rotor, mainspring winding mechanism, escapement geometry, and power reserve regulation.',
      link: 'knowledge-details.html?id=automatic-movements',
      difficulty: 'Intermediate'
    },
    {
      id: 'art-2',
      type: 'knowledge',
      title: 'How to Read a Certified Gemstone Report',
      category: 'Gemstones',
      snippet: 'Decoding GIA, SSEF, and Gübelin lab reports: 4Cs, heat treatment indicators, geographic origin signatures, and inclusions.',
      link: 'knowledge-details.html?id=gemstone-reports',
      difficulty: 'Beginner'
    },
    {
      id: 'art-3',
      type: 'knowledge',
      title: 'Precious Metals & Gold Purity Explained',
      category: 'Precious Metals',
      snippet: 'Comparative analysis of 18K yellow, white, and rose gold alloys vs 950 Platinum, tensile strength, and hallmark stamping.',
      link: 'knowledge-details.html?id=gold-purity',
      difficulty: 'Beginner'
    },
    {
      id: 'art-4',
      type: 'knowledge',
      title: 'Anatomy of Fine Jewelry Settings',
      category: 'Fine Jewelry',
      snippet: 'Prong, pavé, bezel, tension, and channel setting architectures: security, light refraction, and craftsmanship standards.',
      link: 'knowledge-details.html?id=jewelry-settings',
      difficulty: 'Intermediate'
    },
    {
      id: 'art-5',
      type: 'knowledge',
      title: 'The Tourbillon & High Complications',
      category: 'Horology Complications',
      snippet: 'Counteracting gravity with single and multi-axis tourbillon cages, resonance balances, and perpetual calendars.',
      link: 'knowledge-details.html?id=tourbillon-complications',
      difficulty: 'Advanced'
    },

    // Glossary Terms
    {
      id: 'glo-1',
      type: 'glossary',
      title: 'Escapement',
      category: 'Watchmaking Terminology',
      snippet: 'The regulating mechanism comprising escape wheel, pallet fork, and ruby jewels that controls the release of energy.',
      link: 'glossary.html#escapement',
      difficulty: 'Technical'
    },
    {
      id: 'glo-2',
      type: 'glossary',
      title: 'Pavé Setting',
      category: 'Jewelry Setting Terminology',
      snippet: 'A setting technique where small diamonds or gemstones are set close together with tiny beads of precious metal.',
      link: 'glossary.html#pave',
      difficulty: 'Technical'
    },
    {
      id: 'glo-3',
      type: 'glossary',
      title: 'Hallmark',
      category: 'Assay & Metallurgy',
      snippet: 'Official stamped marks indicating the purity and origin of precious metals (e.g., 750 for 18K gold, 950 for platinum).',
      link: 'glossary.html#hallmark',
      difficulty: 'Technical'
    },
    {
      id: 'glo-4',
      type: 'glossary',
      title: 'Cabochon',
      category: 'Gemstone Cutting',
      snippet: 'A gemstone that has been shaped and polished into a smooth, convex dome without facets.',
      link: 'glossary.html#cabochon',
      difficulty: 'Technical'
    },
    {
      id: 'glo-5',
      type: 'glossary',
      title: 'Power Reserve',
      category: 'Watch Specifications',
      snippet: 'The duration (in hours or days) a fully wound mechanical watch movement will operate before stopping.',
      link: 'glossary.html#power-reserve',
      difficulty: 'Technical'
    },
    {
      id: 'glo-6',
      type: 'glossary',
      title: 'Tourbillon',
      category: 'Horology Complications',
      snippet: 'An escapement mounted in a rotating cage designed to eliminate positional errors caused by Earth gravity.',
      link: 'glossary.html#tourbillon',
      difficulty: 'Technical'
    },

    // Videos
    {
      id: 'vid-1',
      type: 'videos',
      title: 'How a Mechanical Movement Works (Teardown & Analysis)',
      category: 'Movements',
      snippet: 'Macro 4K teardown of an automatic caliber showing mainspring barrel, gear train, pallet fork, and balance wheel.',
      link: 'video-details.html?id=movement-works',
      difficulty: 'Intermediate'
    },
    {
      id: 'vid-2',
      type: 'videos',
      title: 'Diamond 4Cs Masterclass: Color & Clarity under 40x Zoom',
      category: 'Gemstones',
      snippet: 'Visual examination of VVS1 vs SI2 inclusions, natural fluorescence, and ideal cut proportions.',
      link: 'video-details.html?id=diamond-4cs',
      difficulty: 'Beginner'
    },
    {
      id: 'vid-3',
      type: 'videos',
      title: 'Fine Jewelry Ultrasonic & Steam Cleaning Protocols',
      category: 'Care & Maintenance',
      snippet: 'Safe cleaning methods for diamonds, sapphires, emeralds, and pearls, preventing thermal shock and oil loss.',
      link: 'video-details.html?id=jewelry-cleaning',
      difficulty: 'Beginner'
    },

    // Resources
    {
      id: 'res-1',
      type: 'resources',
      title: 'Vintage & Pre-Owned Watch Buying Due Diligence Checklist',
      category: 'Collector Resources',
      snippet: '18-point inspection guide covering case polishing, movement serial verification, dial patina, and amplitude metrics.',
      link: 'resource-details.html?id=watch-checklist',
      difficulty: 'All Levels'
    },
    {
      id: 'res-2',
      type: 'resources',
      title: 'Gemstone Hardness & Ultrasonic Cleaning Compatibility Sheet',
      category: 'Reference Sheets',
      snippet: 'Mohs scale ranking, cleavage plane vulnerabilities, and solvent safety reference for 32 popular precious stones.',
      link: 'resource-details.html?id=gemstone-compatibility',
      difficulty: 'Reference'
    },
    {
      id: 'res-3',
      type: 'resources',
      title: 'International Ring & Bangle Sizing Master Calibration Guide',
      category: 'Measurement Guides',
      snippet: 'Standard cross-conversion table for US, UK, European, and Japanese diameter and circumference tolerances.',
      link: 'resource-details.html?id=ring-sizing-guide',
      difficulty: 'Reference'
    },

    // Community Discussions
    {
      id: 'dis-1',
      type: 'community',
      title: 'How often should a modern mechanical watch be serviced?',
      category: 'Watch Care',
      snippet: 'Debating manufacturer 5-year intervals vs synthetic oil longevity and real-world timegrapher amplitude indicators.',
      link: 'discussion-details.html?id=servicing-interval',
      difficulty: 'Discussion'
    },
    {
      id: 'dis-2',
      type: 'community',
      title: 'Is 950 Platinum really superior to 18K White Gold for daily rings?',
      category: 'Metals & Metallurgy',
      snippet: 'Comparing density, patina development, rhodium replating requirements, and prong wear resistance over decades.',
      link: 'discussion-details.html?id=platinum-vs-white-gold',
      difficulty: 'Discussion'
    },
    {
      id: 'dis-3',
      type: 'community',
      title: 'Understanding Sapphire vs Mineral Crystal scratch & impact resistance',
      category: 'Watch Specifications',
      snippet: 'Real-world comparisons of Mohs 9 synthetic corundum vs hardened mineral glass and acrylic domed crystals.',
      link: 'discussion-details.html?id=sapphire-vs-mineral',
      difficulty: 'Discussion'
    }
  ];

  let currentTab = 'all';

  const init = () => {
    setupOverlay();
    setupKeyboardShortcuts();
  };

  const getRecentSearches = () => {
    try {
      const data = localStorage.getItem(RECENT_SEARCHES_KEY);
      return data ? JSON.parse(data) : ['automatic movement', 'diamond clarity', 'gold hallmarks', 'watch servicing'];
    } catch (e) {
      return ['automatic movement', 'diamond clarity'];
    }
  };

  const saveRecentSearch = (query) => {
    if (!query || query.trim().length < 2) return;
    let list = getRecentSearches();
    list = list.filter(q => q.toLowerCase() !== query.toLowerCase());
    list.unshift(query.trim());
    if (list.length > 6) list = list.slice(0, 6);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(list));
  };

  const openSearch = (initialQuery = '') => {
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchModalInput');
    if (!overlay || !input) return;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (initialQuery) {
      input.value = initialQuery;
      executeSearch(initialQuery);
    } else {
      renderRecentAndPopular();
    }

    setTimeout(() => {
      input.focus();
      if (initialQuery) input.select();
    }, 100);
  };

  const closeSearch = () => {
    const overlay = document.getElementById('searchOverlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  const executeSearch = (query) => {
    const resultsContainer = document.getElementById('searchResultsArea');
    if (!resultsContainer) return;

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      renderRecentAndPopular();
      return;
    }

    let filtered = SEARCH_DATABASE.filter(item => {
      const matchesText = item.title.toLowerCase().includes(trimmed) ||
                          item.category.toLowerCase().includes(trimmed) ||
                          item.snippet.toLowerCase().includes(trimmed);
      const matchesTab = (currentTab === 'all') || (item.type === currentTab);
      return matchesText && matchesTab;
    });

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-search text-muted-custom" style="font-size: 2.5rem;"></i>
          <h4 class="mt-3">No matching records found</h4>
          <p class="small text-muted-custom">Try searching for terms like <em>movement, diamond, hallmark, platinum, or escapement</em>.</p>
        </div>
      `;
      return;
    }

    let html = `<div class="small text-muted-custom mb-3">Found ${filtered.length} matching entries:</div>`;
    filtered.forEach(item => {
      let icon = 'bi-journal-text';
      let typeLabel = 'Article';
      if (item.type === 'videos') { icon = 'bi-play-circle'; typeLabel = 'Video'; }
      if (item.type === 'resources') { icon = 'bi-file-earmark-arrow-down'; typeLabel = 'Resource'; }
      if (item.type === 'glossary') { icon = 'bi-bookmark'; typeLabel = 'Glossary'; }
      if (item.type === 'community') { icon = 'bi-chat-left-text'; typeLabel = 'Discussion'; }

      html += `
        <a href="${item.link}" class="search-result-item" onclick="AurelisSearch.saveRecent('${item.title.replace(/'/g, "\\'")}')">
          <div class="search-result-icon">
            <i class="bi ${icon}"></i>
          </div>
          <div class="search-result-content flex-grow-1">
            <div class="d-flex align-items-center justify-content-between">
              <span class="aurelis-badge" style="font-size: 0.68rem; padding: 1px 6px;">${typeLabel} • ${item.category}</span>
              <span class="text-muted-custom font-mono" style="font-size: 0.72rem;">${item.difficulty || ''}</span>
            </div>
            <h5 class="mt-1">${item.title}</h5>
            <p>${item.snippet}</p>
          </div>
        </a>
      `;
    });

    resultsContainer.innerHTML = html;
  };

  const renderRecentAndPopular = () => {
    const resultsContainer = document.getElementById('searchResultsArea');
    if (!resultsContainer) return;

    const recent = getRecentSearches();
    let recentHtml = recent.map(r => `
      <button type="button" class="btn-aurelis btn-aurelis-outline btn-aurelis-sm query-chip-btn" data-query="${r}">
        <i class="bi bi-clock-history me-1 text-bronze"></i> ${r}
      </button>
    `).join('');

    resultsContainer.innerHTML = `
      <div class="mb-4">
        <h6 class="text-bronze mb-3"><i class="bi bi-clock-history me-2"></i> Recent Searches</h6>
        <div class="d-flex flex-wrap gap-2">
          ${recentHtml || '<span class="text-muted-custom small">No recent searches yet.</span>'}
        </div>
      </div>
      <div class="mb-2">
        <h6 class="text-bronze mb-3"><i class="bi bi-fire me-2"></i> Suggested Topics</h6>
        <div class="d-flex flex-wrap gap-2">
          <button type="button" class="btn-aurelis btn-aurelis-outline btn-aurelis-sm query-chip-btn" data-query="automatic movement">Automatic Movements</button>
          <button type="button" class="btn-aurelis btn-aurelis-outline btn-aurelis-sm query-chip-btn" data-query="diamond clarity">Diamond 4Cs Clarity</button>
          <button type="button" class="btn-aurelis btn-aurelis-outline btn-aurelis-sm query-chip-btn" data-query="gold hallmarks">750 Gold Hallmarks</button>
          <button type="button" class="btn-aurelis btn-aurelis-outline btn-aurelis-sm query-chip-btn" data-query="platinum vs gold">Platinum vs Gold</button>
          <button type="button" class="btn-aurelis btn-aurelis-outline btn-aurelis-sm query-chip-btn" data-query="tourbillon">Tourbillon Escapement</button>
        </div>
      </div>
    `;

    resultsContainer.querySelectorAll('.query-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.getAttribute('data-query');
        const input = document.getElementById('searchModalInput');
        if (input) {
          input.value = q;
          executeSearch(q);
        }
      });
    });
  };

  const setupOverlay = () => {
    // Inject search overlay HTML into DOM if not already present
    if (!document.getElementById('searchOverlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'searchOverlay';
      overlay.className = 'search-overlay';
      overlay.innerHTML = `
        <div class="search-modal-container" role="dialog" aria-modal="true" aria-label="Global Knowledge Search">
          <div class="search-input-header">
            <i class="bi bi-search"></i>
            <input type="text" id="searchModalInput" class="search-input-field" placeholder="Search jewelry, watches, movements, gemstones, care..." autocomplete="off">
            <button type="button" class="btn-icon-action" id="closeSearchModalBtn" aria-label="Close search">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="search-tabs">
            <button type="button" class="search-tab-btn active" data-tab="all">All Results</button>
            <button type="button" class="search-tab-btn" data-tab="knowledge">Knowledge</button>
            <button type="button" class="search-tab-btn" data-tab="videos">Videos</button>
            <button type="button" class="search-tab-btn" data-tab="resources">Resources</button>
            <button type="button" class="search-tab-btn" data-tab="glossary">Glossary</button>
            <button type="button" class="search-tab-btn" data-tab="community">Discussions</button>
          </div>
          <div class="search-results-area" id="searchResultsArea"></div>
          <div class="search-footer-tags">
            <span><kbd>ESC</kbd> to exit &nbsp;•&nbsp; <kbd>/</kbd> to open anywhere</span>
            <span class="text-bronze fw-semibold">AURELIS Knowledge Base</span>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      // Listeners
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeSearch();
      });

      document.getElementById('closeSearchModalBtn').addEventListener('click', closeSearch);

      const input = document.getElementById('searchModalInput');
      input.addEventListener('input', (e) => {
        executeSearch(e.target.value);
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          saveRecentSearch(input.value);
        }
      });

      const tabBtns = overlay.querySelectorAll('.search-tab-btn');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentTab = btn.getAttribute('data-tab');
          executeSearch(input.value);
        });
      });
    }

    // Attach search trigger buttons
    document.querySelectorAll('.search-trigger-btn, .search-open-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openSearch();
      });
    });
  };

  const setupKeyboardShortcuts = () => {
    window.addEventListener('keydown', (e) => {
      // Don't trigger if user is typing in another input/textarea
      const tag = (e.target && e.target.tagName) || '';
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) && e.target.id !== 'searchModalInput') {
        return;
      }

      if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        openSearch();
      }

      if (e.key === 'Escape') {
        const overlay = document.getElementById('searchOverlay');
        if (overlay && overlay.classList.contains('active')) {
          closeSearch();
        }
      }
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    init();
  });

  return {
    open: openSearch,
    close: closeSearch,
    saveRecent: saveRecentSearch,
    database: SEARCH_DATABASE
  };
})();

window.AurelisSearch = AurelisSearch;
