/**
 * AURELIS — Glossary & Terminology Engine
 * Searchable A-Z horological and gemological encyclopedia with live filtering and cross-references.
 */

const AurelisGlossary = (() => {
  const GLOSSARY_TERMS = [
    {
      letter: 'A',
      term: 'Automatic Movement',
      category: 'Horology',
      definition: 'A mechanical watch movement wound automatically by the natural motion of the wearer’s wrist via an eccentric oscillating weighted rotor.',
      related: ['Rotor', 'Mainspring', 'Power Reserve'],
      article: 'knowledge-details.html?id=automatic-movements'
    },
    {
      letter: 'A',
      term: 'Assay Mark',
      category: 'Metallurgy',
      definition: 'An official stamp made by an independent assay office guaranteeing the proportion of precious metal (fineness) in a jewelry or watch alloy.',
      related: ['Hallmark', 'Karat', 'Fineness'],
      article: 'knowledge-details.html?id=gold-purity'
    },
    {
      letter: 'B',
      term: 'Bezel',
      category: 'Watch Anatomy',
      definition: 'The outer ring surrounding the crystal on the front of a watch case. Can be fixed, fluted, bidirectional, or unidirectional rotating with diving scales.',
      related: ['Sapphire Crystal', 'Case', 'Cerachrom'],
      article: 'knowledge-details.html'
    },
    {
      letter: 'B',
      term: 'Balance Wheel',
      category: 'Horology',
      definition: 'The weighted oscillating wheel in a mechanical movement that, paired with the hairspring, regulates the precision timekeeping rhythm (isochronism).',
      related: ['Hairspring', 'Escapement', 'Incabloc'],
      article: 'knowledge-details.html?id=automatic-movements'
    },
    {
      letter: 'C',
      term: 'Cabochon',
      category: 'Gemology',
      definition: 'A gemstone that has been shaped and polished into a smooth, convex dome without facets, common in star sapphires, opals, and luxury watch crowns.',
      related: ['Crown', 'Faceting', 'Mohs Hardness'],
      article: 'knowledge-details.html?id=gemstone-reports'
    },
    {
      letter: 'C',
      term: 'Carat (ct)',
      category: 'Gemology',
      definition: 'The international unit of mass used for gemstones and pearls, equal to exactly 200 milligrams (0.2 grams). Not to be confused with Karat gold purity.',
      related: ['Karat', 'Points', '4Cs'],
      article: 'knowledge-details.html?id=gemstone-reports'
    },
    {
      letter: 'C',
      term: 'Chronograph',
      category: 'Complications',
      definition: 'A watch complication with an integrated stopwatch function, controlled by pushers to measure elapsed intervals via column wheel or cam actuation.',
      related: ['Column Wheel', 'Flyback', 'Tachymeter'],
      article: 'knowledge-details.html'
    },
    {
      letter: 'E',
      term: 'Escapement',
      category: 'Horology',
      definition: 'The regulating device that converts continuous rotational force from the mainspring into fractional impulses delivered to the balance wheel.',
      related: ['Swiss Lever', 'Co-Axial', 'Pallet Fork'],
      article: 'knowledge-details.html?id=automatic-movements'
    },
    {
      letter: 'F',
      term: 'Fluorescence',
      category: 'Gemology',
      definition: 'The optical emission of visible light (typically blue) by a diamond when subjected to long-wave ultraviolet radiation.',
      related: ['4Cs', 'Clarity', 'GIA Report'],
      article: 'knowledge-details.html?id=gemstone-reports'
    },
    {
      letter: 'G',
      term: 'Guilloché',
      category: 'Finishing & Craft',
      definition: 'An artisanal decorative engraving technique using a manual rose engine lathe to cut precise, repetitive geometric patterns onto dials or cases.',
      related: ['Clous de Paris', 'Grand Feu Enamel', 'Dial'],
      article: 'knowledge-details.html'
    },
    {
      letter: 'H',
      term: 'Hallmark',
      category: 'Metallurgy',
      definition: 'Legally mandated stamps on precious metal articles certifying metal purity (e.g. 750 for 18K, 950 for Pt), maker mark, year, and assay laboratory.',
      related: ['Assay Mark', '750 Gold', '950 Platinum'],
      article: 'knowledge-details.html?id=gold-purity'
    },
    {
      letter: 'I',
      term: 'Incabloc',
      category: 'Horology',
      definition: 'A trademarked spring-loaded shock protection system for the jewel bearings supporting the delicate balance staff in mechanical movements.',
      related: ['Balance Wheel', 'Jewels', 'Kif Shock'],
      article: 'knowledge-details.html?id=automatic-movements'
    },
    {
      letter: 'J',
      term: 'Jewel (Horology)',
      category: 'Horology',
      definition: 'Synthetic corundum (ruby or sapphire) bearings placed at high-friction pivots within a watch movement to minimize mechanical friction and wear.',
      related: ['Pivot', 'Synthetic Sapphire', 'Lubrication'],
      article: 'knowledge-details.html?id=automatic-movements'
    },
    {
      letter: 'K',
      term: 'Karat (K)',
      category: 'Metallurgy',
      definition: 'A measure of gold fineness expressed in 24ths (24K = 100% pure gold, 18K = 75% gold, 14K = 58.5% gold).',
      related: ['Carat', 'Fineness', '18K Alloy'],
      article: 'knowledge-details.html?id=gold-purity'
    },
    {
      letter: 'L',
      term: 'Lug',
      category: 'Watch Anatomy',
      definition: 'The metal projections extending from the watch case that hold the spring bars securing the strap or bracelet.',
      related: ['Spring Bar', 'Case', 'End Link'],
      article: 'knowledge-details.html'
    },
    {
      letter: 'M',
      term: 'Milgrain',
      category: 'Jewelry Detailing',
      definition: 'A delicate decorative jewelry edging technique characterized by a row of tiny raised precious metal beads or granules along borders.',
      related: ['Filigree', 'Vintage Jewelry', 'Pavé'],
      article: 'knowledge-details.html?id=jewelry-settings'
    },
    {
      letter: 'P',
      term: 'Pavé Setting',
      category: 'Jewelry Settings',
      definition: 'A setting technique where numerous small stones are set in close proximity across a surface, creating a continuous paved field of brilliance.',
      related: ['Micro-Pavé', 'Bead Setting', 'Prong'],
      article: 'knowledge-details.html?id=jewelry-settings'
    },
    {
      letter: 'P',
      term: 'Power Reserve',
      category: 'Horology',
      definition: 'The operational running time (in hours or days) of a mechanical movement from a fully wound state until complete stoppage.',
      related: ['Mainspring', 'Barrel', 'Indicator'],
      article: 'knowledge-details.html?id=automatic-movements'
    },
    {
      letter: 'R',
      term: 'Rotor',
      category: 'Horology',
      definition: 'A semi-circular weighted oscillating mass, often crafted in 21K/22K gold, platinum, or tungsten, that swings freely with wrist momentum to wind the mainspring.',
      related: ['Automatic Movement', 'Ball Bearings', 'Reverser Wheel'],
      article: 'knowledge-details.html?id=automatic-movements'
    },
    {
      letter: 'T',
      term: 'Tourbillon',
      category: 'Complications',
      definition: 'A mobile cage housing the balance wheel and escapement that rotates 360° continuously to average out positional rate errors caused by Earth gravity.',
      related: ['Escapement', 'High Horology', 'Breguet'],
      article: 'knowledge-details.html?id=tourbillon-complications'
    }
  ];

  const init = () => {
    const alphabetContainer = document.getElementById('glossaryAlphabetBar');
    const termsContainer = document.getElementById('glossaryTermsContainer');
    const searchInput = document.getElementById('glossarySearchInput');
    const categorySelect = document.getElementById('glossaryCategorySelect');

    if (!termsContainer) return;

    let activeLetter = 'ALL';
    let searchQuery = '';
    let selectedCat = 'ALL';

    const renderAlphabetBar = () => {
      if (!alphabetContainer) return;
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const lettersWithTerms = new Set(GLOSSARY_TERMS.map(t => t.letter.toUpperCase()));

      let html = `<button type="button" class="alpha-btn ${activeLetter === 'ALL' ? 'active' : ''}" data-letter="ALL">ALL</button>`;
      
      alphabet.forEach(letter => {
        const hasTerms = lettersWithTerms.has(letter);
        const isActive = activeLetter === letter;
        html += `<button type="button" class="alpha-btn ${isActive ? 'active' : ''} ${!hasTerms ? 'disabled' : ''}" data-letter="${letter}">${letter}</button>`;
      });

      alphabetContainer.innerHTML = html;

      alphabetContainer.querySelectorAll('.alpha-btn:not(.disabled)').forEach(btn => {
        btn.addEventListener('click', () => {
          activeLetter = btn.getAttribute('data-letter');
          renderAlphabetBar();
          renderTerms();
        });
      });
    };

    const renderTerms = () => {
      let filtered = GLOSSARY_TERMS.filter(item => {
        const matchLetter = activeLetter === 'ALL' || item.letter.toUpperCase() === activeLetter;
        const matchCat = selectedCat === 'ALL' || item.category.toLowerCase() === selectedCat.toLowerCase();
        const matchSearch = !searchQuery || 
          item.term.toLowerCase().includes(searchQuery) ||
          item.definition.toLowerCase().includes(searchQuery);

        return matchLetter && matchCat && matchSearch;
      });

      if (filtered.length === 0) {
        termsContainer.innerHTML = `
          <div class="col-12 text-center py-5">
            <i class="bi bi-book text-muted-custom" style="font-size: 2rem;"></i>
            <h4 class="mt-3">No glossary entries found</h4>
            <p class="text-muted-custom small">Try searching another term or resetting alphabet filter.</p>
          </div>
        `;
        return;
      }

      let html = '';
      filtered.forEach(t => {
        const relatedTags = (t.related || []).map(r => `<span class="aurelis-badge me-1" style="font-size: 0.7rem;">${r}</span>`).join('');
        html += `
          <div class="col-md-6 col-lg-4 mb-4 glossary-card-item" id="${t.term.toLowerCase().replace(/[^a-z0-9]/g, '-')}">
            <div class="glossary-card h-100">
              <div class="glossary-term-header">
                <h4>${t.term}</h4>
                <span class="aurelis-badge">${t.category}</span>
              </div>
              <p class="small text-secondary mb-3">${t.definition}</p>
              <div class="mt-auto pt-2 border-top border-subtle-custom d-flex flex-column gap-2">
                <div class="d-flex align-items-center flex-wrap gap-1">
                  <span class="text-muted-custom font-mono" style="font-size: 0.72rem;">Related:</span>
                  ${relatedTags}
                </div>
                ${t.article ? `<a href="${t.article}" class="small text-bronze fw-semibold d-inline-flex align-items-center gap-1 mt-1">Explore Article <i class="bi bi-arrow-right"></i></a>` : ''}
              </div>
            </div>
          </div>
        `;
      });

      termsContainer.innerHTML = html;
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        renderTerms();
      });
    }

    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        selectedCat = e.target.value;
        renderTerms();
      });
    }

    renderAlphabetBar();
    renderTerms();
  };

  document.addEventListener('DOMContentLoaded', () => {
    init();
  });

  return {
    terms: GLOSSARY_TERMS
  };
})();

window.AurelisGlossary = AurelisGlossary;
