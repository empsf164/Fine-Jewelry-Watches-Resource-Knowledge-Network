/**
 * AURELIS — Knowledge Base & Article Engine
 * Reading progress bar, Table of Contents scrollspy, interactive technical diagrams and share actions.
 */

const AurelisKnowledge = (() => {
  const initReadingProgress = () => {
    const progressBar = document.getElementById('reading-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (height > 0) ? (winScroll / height) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
    }, { passive: true });
  };

  const initTableOfContents = () => {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.article-content-body section[id]');

    if (tocLinks.length === 0 || sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));
  };

  const initShareButtons = () => {
    document.querySelectorAll('.btn-share-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = window.location.href;
        const title = document.title;

        if (navigator.share) {
          navigator.share({
            title: title,
            url: url
          }).catch(() => {});
        } else {
          // Copy to clipboard fallback
          navigator.clipboard.writeText(url).then(() => {
            if (window.AurelisNotifications) {
              window.AurelisNotifications.show('Article link copied to clipboard.', 'success');
            }
          }).catch(() => {
            if (window.AurelisNotifications) {
              window.AurelisNotifications.show('Link: ' + url, 'info');
            }
          });
        }
      });
    });
  };

  const initInteractiveTools = () => {
    // Escapement animation step simulator
    const stepBtns = document.querySelectorAll('.escapement-step-btn');
    const stepDisplays = document.querySelectorAll('.escapement-step-display');
    if (stepBtns.length > 0) {
      stepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          stepBtns.forEach(b => b.classList.remove('active', 'btn-aurelis-primary'));
          btn.classList.add('active', 'btn-aurelis-primary');
          const stepIndex = btn.getAttribute('data-step');
          stepDisplays.forEach(disp => {
            disp.style.display = disp.getAttribute('data-step') === stepIndex ? 'block' : 'none';
          });
        });
      });
    }

    // Gold Karat / Fineness Calculator
    const karatSelector = document.getElementById('karatSelect');
    const goldPurityOutput = document.getElementById('goldPurityOutput');
    const goldAlloyOutput = document.getElementById('goldAlloyOutput');
    const goldDensityOutput = document.getElementById('goldDensityOutput');

    if (karatSelector && goldPurityOutput) {
      const KARAT_DATA = {
        '24k': { purity: '99.9% Pure Gold (999)', alloy: 'Pure Elemental Au (No alloying elements)', density: '19.32 g/cm³', durability: 'Extremely soft, unsuitable for high-wear prongs.' },
        '22k': { purity: '91.6% Fine Gold (916)', alloy: '91.6% Au + 5.5% Cu + 2.9% Ag', density: '17.80 g/cm³', durability: 'Traditional high-karat investment jewelry.' },
        '18k': { purity: '75.0% Fine Gold (750)', alloy: '75.0% Au + 12.5% Ag + 12.5% Cu (or Pd for White)', density: '15.58 g/cm³', durability: 'Optimal balance of luxury weight & structural strength.' },
        '14k': { purity: '58.5% Fine Gold (585)', alloy: '58.5% Au + 25% Cu + 16.5% Ag / Zn', density: '13.07 g/cm³', durability: 'High scratch resistance, very durable for daily jewelry.' },
        '950pt': { purity: '95.0% Pure Platinum (950)', alloy: '95.0% Pt + 5.0% Ruthenium or Iridium', density: '21.45 g/cm³', durability: 'Naturally white, hypo-allergenic, displaced patina over time.' }
      };

      karatSelector.addEventListener('change', (e) => {
        const val = e.target.value;
        const d = KARAT_DATA[val] || KARAT_DATA['18k'];
        goldPurityOutput.textContent = d.purity;
        if (goldAlloyOutput) goldAlloyOutput.textContent = d.alloy;
        if (goldDensityOutput) goldDensityOutput.textContent = d.density;
      });
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initReadingProgress();
    initTableOfContents();
    initShareButtons();
    initInteractiveTools();
  });

  return {
    initReadingProgress,
    initTableOfContents
  };
})();

window.AurelisKnowledge = AurelisKnowledge;
