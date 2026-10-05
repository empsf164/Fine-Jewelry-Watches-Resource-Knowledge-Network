/**
 * AURELIS — Community Discussions Module
 * Interactive collector forums, topic filtering, thread upvoting, and discussion modal.
 */

const AurelisCommunity = (() => {
  const STORAGE_DISCUSSIONS_KEY = 'aurelis_custom_discussions';
  const STORAGE_UPVOTES_KEY = 'aurelis_discussion_upvotes';

  const DEFAULT_DISCUSSIONS = [
    {
      id: 'dis-servicing-interval',
      title: 'How often should a modern mechanical watch truly be serviced?',
      category: 'Watch Care',
      author: 'HorologyMaster_Geneva',
      authorRole: 'Senior Watchmaker',
      replies: 24,
      views: '1.4k',
      upvotes: 42,
      lastActivity: '2 hours ago',
      excerpt: 'Modern synthetic oils (Moebius 9010, HP-1300) resist gumming far longer than animal oils of the 1960s. Is the standard 5-year service interval still technically necessary, or should we rely on timegrapher amplitude testing?',
      link: 'discussion-details.html?id=servicing-interval'
    },
    {
      id: 'dis-platinum-vs-white-gold',
      title: 'Is 950 Platinum really superior to 18K White Gold for everyday rings?',
      category: 'Precious Metals',
      author: 'AureliaGemologist',
      authorRole: 'GIA Graduate Gemologist',
      replies: 18,
      views: '980',
      upvotes: 35,
      lastActivity: '5 hours ago',
      excerpt: 'Platinum doesn’t lose metal when scratched—it displaces into a unique patina. But white gold rhodium plating gives an unmatched mirror luster. Let’s compare long-term prong retention and maintenance costs.',
      link: 'discussion-details.html?id=platinum-vs-white-gold'
    },
    {
      id: 'dis-sapphire-vs-mineral',
      title: 'Understanding Sapphire vs Mineral Crystal scratch vs shatter resistance in field watches',
      category: 'Watch Specifications',
      author: 'Collector_Vanguard',
      authorRole: 'Vintage Specialist',
      replies: 15,
      views: '840',
      upvotes: 29,
      lastActivity: '1 day ago',
      excerpt: 'Sapphire rates Mohs 9, making it virtually scratch-proof against keys and sand. However, its crystalline lattice makes it more brittle under direct sharp impact compared to plexiglass or mineral glass.',
      link: 'discussion-details.html?id=sapphire-vs-mineral'
    },
    {
      id: 'dis-emerald-oiling',
      title: 'Disclosing Cedarwood Oil vs Polymer Resin in Colombian Emeralds',
      category: 'Gemstones',
      author: 'BogotaBeryl_Expert',
      authorRole: 'Gemstone Appraiser',
      replies: 31,
      views: '2.1k',
      upvotes: 56,
      lastActivity: '2 days ago',
      excerpt: 'Traditional cedarwood oil is accepted worldwide as minor clarity enhancement, whereas epoxy resins (Opticon) can degrade and turn yellow over decades. What is your preferred lab standard?',
      link: 'discussion-details.html?id=emerald-oiling'
    }
  ];

  const getUpvotes = () => {
    try {
      const data = localStorage.getItem(STORAGE_UPVOTES_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  };

  const toggleUpvote = (id) => {
    const votes = getUpvotes();
    const current = !!votes[id];
    votes[id] = !current;
    localStorage.setItem(STORAGE_UPVOTES_KEY, JSON.stringify(votes));
    return !current;
  };

  const isUpvoted = (id) => {
    const votes = getUpvotes();
    return !!votes[id];
  };

  const init = () => {
    // New Discussion Modal setup
    const newDiscussionBtn = document.getElementById('openNewDiscussionModalBtn');
    const modalBackdrop = document.getElementById('newDiscussionModalBackdrop');
    const form = document.getElementById('newDiscussionForm');

    if (newDiscussionBtn && modalBackdrop) {
      newDiscussionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.AurelisAuth && !window.AurelisAuth.isLoggedIn()) {
          window.AurelisAuth.requireAuth(() => {}, 'Please sign in to start a community discussion.');
          return;
        }
        modalBackdrop.classList.add('active');
      });

      const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => modalBackdrop.classList.remove('active'));
      }
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) modalBackdrop.classList.remove('active');
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = form.querySelector('[name="discussionTitle"]')?.value;
        const category = form.querySelector('[name="discussionCategory"]')?.value;
        const content = form.querySelector('[name="discussionBody"]')?.value;

        if (!title || !content) return;

        const user = (window.AurelisAuth && window.AurelisAuth.getUser()) || { name: 'Knowledge Member' };
        
        if (window.AurelisNotifications) {
          window.AurelisNotifications.show(`Discussion “${title}” published successfully.`, 'success');
        }

        if (modalBackdrop) modalBackdrop.classList.remove('active');
        form.reset();
      });
    }

    // Upvote button handler
    document.querySelectorAll('.btn-upvote-action').forEach(btn => {
      const id = btn.getAttribute('data-id');
      if (!id) return;

      const countEl = btn.querySelector('.upvote-count');
      const baseCount = parseInt(countEl?.textContent || '0', 10);

      const updateUI = (active) => {
        if (active) {
          btn.classList.add('active', 'border-bronze');
          if (countEl) countEl.textContent = baseCount + 1;
        } else {
          btn.classList.remove('active', 'border-bronze');
          if (countEl) countEl.textContent = baseCount;
        }
      };

      updateUI(isUpvoted(id));

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const state = toggleUpvote(id);
        updateUI(state);
        if (window.AurelisNotifications) {
          window.AurelisNotifications.show(state ? 'Marked as helpful' : 'Vote removed', 'info', 1500);
        }
      });
    });

    // Discussion filters
    if (document.getElementById('communityFilterSidebar')) {
      if (window.AurelisFilters) {
        window.AurelisFilters.init({
          filterContainerId: 'communityFilterSidebar',
          itemsSelector: '.discussion-card-item',
          resultsContainerId: 'discussionsList',
          counterId: 'discussionsCount'
        });
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    init();
  });

  return {
    discussions: DEFAULT_DISCUSSIONS,
    toggleUpvote,
    isUpvoted
  };
})();

window.AurelisCommunity = AurelisCommunity;
