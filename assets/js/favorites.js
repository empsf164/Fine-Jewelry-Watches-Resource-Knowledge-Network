/**
 * AURELIS — Bookmarks & Saved Content Manager
 * Multi-format bookmarking for articles, videos, resources, glossary, and discussions.
 */

const AurelisFavorites = (() => {
  const STORAGE_KEY = 'aurelis_saved_library';

  const getAllSaved = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading saved library', e);
      return [];
    }
  };

  const isSaved = (id) => {
    const list = getAllSaved();
    return list.some(item => String(item.id) === String(id));
  };

  const saveItem = (item) => {
    const list = getAllSaved();
    if (!list.some(i => String(i.id) === String(item.id))) {
      const newItem = {
        ...item,
        id: String(item.id),
        savedAt: new Date().toISOString()
      };
      list.push(newItem);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('aurelisSavedUpdated', { detail: { list } }));
      
      if (window.AurelisNotifications) {
        window.AurelisNotifications.show(`“${item.title || 'Item'}” saved to your library.`, 'success');
      }
      return true;
    }
    return false;
  };

  const removeSaved = (id) => {
    let list = getAllSaved();
    const existing = list.find(i => String(i.id) === String(id));
    list = list.filter(i => String(i.id) !== String(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('aurelisSavedUpdated', { detail: { list } }));

    if (window.AurelisNotifications && existing) {
      window.AurelisNotifications.show(`“${existing.title}” removed from saved library.`, 'info');
    }
    return true;
  };

  const toggleSave = (item) => {
    if (isSaved(item.id)) {
      removeSaved(item.id);
      return false;
    } else {
      saveItem(item);
      return true;
    }
  };

  const getSavedByType = (type) => {
    const list = getAllSaved();
    if (!type || type === 'all') return list;
    return list.filter(item => item.type === type);
  };

  const initBookmarkButtons = () => {
    const buttons = document.querySelectorAll('.btn-bookmark-action, .bookmark-toggle-btn');
    buttons.forEach((btn) => {
      const id = btn.getAttribute('data-id');
      if (!id) return;

      const saved = isSaved(id);
      updateBtnVisual(btn, saved);

      // Avoid duplicate click listeners
      if (!btn.dataset.initialized) {
        btn.dataset.initialized = 'true';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const itemData = {
            id: id,
            type: btn.getAttribute('data-type') || 'article',
            title: btn.getAttribute('data-title') || 'Knowledge Resource',
            category: btn.getAttribute('data-category') || 'General',
            summary: btn.getAttribute('data-summary') || '',
            link: btn.getAttribute('data-link') || window.location.href,
            image: btn.getAttribute('data-image') || '',
            difficulty: btn.getAttribute('data-difficulty') || 'Intermediate'
          };

          const newState = toggleSave(itemData);
          updateBtnVisual(btn, newState);

          // Update any sibling buttons on the page with the same ID
          document.querySelectorAll(`[data-id="${id}"]`).forEach(sibling => {
            updateBtnVisual(sibling, newState);
          });
        });
      }
    });
  };

  const updateBtnVisual = (btn, isSavedState) => {
    const icon = btn.querySelector('i');
    if (isSavedState) {
      btn.classList.add('saved');
      btn.setAttribute('aria-label', 'Remove from saved');
      btn.setAttribute('title', 'Remove from saved library');
      if (icon) {
        icon.className = 'bi bi-bookmark-fill text-bronze';
      }
      const textSpan = btn.querySelector('.bookmark-text');
      if (textSpan) textSpan.textContent = 'Saved in Library';
    } else {
      btn.classList.remove('saved');
      btn.setAttribute('aria-label', 'Save to library');
      btn.setAttribute('title', 'Save to your knowledge library');
      if (icon) {
        icon.className = 'bi bi-bookmark';
      }
      const textSpan = btn.querySelector('.bookmark-text');
      if (textSpan) textSpan.textContent = 'Save for Later';
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initBookmarkButtons();
  });

  return {
    getAll: getAllSaved,
    getByType: getSavedByType,
    isSaved,
    save: saveItem,
    remove: removeSaved,
    toggle: toggleSave,
    initButtons: initBookmarkButtons
  };
})();

window.AurelisFavorites = AurelisFavorites;
