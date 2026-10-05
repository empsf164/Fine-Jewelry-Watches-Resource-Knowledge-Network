/**
 * AURELIS — Theme Manager
 * Light & Dark mode controller with localStorage persistence & system preference detection
 */

const AurelisTheme = (() => {
  const THEME_KEY = 'aurelis_theme';
  const root = document.documentElement;

  const init = () => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    setTheme(initialTheme, false);

    // Watch for system preference changes if no manual preference stored
    if (!savedTheme && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
          setTheme(e.matches ? 'dark' : 'light', false);
        }
      });
    }

    // Attach click listeners to all theme toggles
    document.addEventListener('DOMContentLoaded', () => {
      setupToggleButtons();
    });
  };

  const setTheme = (theme, persist = true) => {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }

    if (persist) {
      localStorage.setItem(THEME_KEY, theme);
    }

    updateToggleIcons(theme);
    window.dispatchEvent(new CustomEvent('aurelisThemeChanged', { detail: { theme } }));
  };

  const toggleTheme = () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme, true);
    if (window.AurelisNotifications) {
      window.AurelisNotifications.show(`Switched to ${newTheme === 'dark' ? 'Obsidian Dark' : 'Ivory Light'} mode`, 'info');
    }
  };

  const updateToggleIcons = (theme) => {
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    buttons.forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun-fill';
          btn.setAttribute('aria-label', 'Switch to light mode');
          btn.setAttribute('title', 'Switch to Ivory Light mode');
        } else {
          icon.className = 'bi bi-moon-stars-fill';
          btn.setAttribute('aria-label', 'Switch to dark mode');
          btn.setAttribute('title', 'Switch to Obsidian Dark mode');
        }
      }
    });
  };

  const setupToggleButtons = () => {
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });
    });
    const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    updateToggleIcons(currentTheme);
  };

  const getCurrentTheme = () => {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  };

  // Immediate init on script load to prevent flash of wrong theme
  init();

  return {
    toggle: toggleTheme,
    set: setTheme,
    get: getCurrentTheme,
    setupButtons: setupToggleButtons
  };
})();

window.AurelisTheme = AurelisTheme;
