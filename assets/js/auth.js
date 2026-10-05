/**
 * AURELIS — Authentication & User Profile Management
 * Frontend session state, interests personalization, auth modal and navbar synchronization.
 */

const AurelisAuth = (() => {
  const USER_KEY = 'aurelis_auth_user';

  const getUser = () => {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error parsing user data', e);
      return null;
    }
  };

  const isLoggedIn = () => {
    return getUser() !== null;
  };

  const login = (email, password, remember = true) => {
    // Mock authentication logic with predefined and customizable accounts
    const namePart = email.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    
    const user = {
      id: 'usr_' + Date.now(),
      name: formattedName || 'Collector',
      email: email,
      interests: ['Horology', 'Fine Jewelry', 'Gemstones', 'Movements'],
      joinedAt: new Date().toISOString()
    };

    localStorage.setItem(USER_KEY, JSON.stringify(user));
    updateNavUI();
    window.dispatchEvent(new CustomEvent('aurelisAuthChanged', { detail: { user } }));
    
    if (window.AurelisNotifications) {
      window.AurelisNotifications.show(`Welcome back, ${user.name}`, 'success');
    }
    return user;
  };

  const signup = (fullName, email, password, interests = []) => {
    const user = {
      id: 'usr_' + Date.now(),
      name: fullName,
      email: email,
      interests: interests.length > 0 ? interests : ['Fine Jewelry', 'Watches', 'Gemstones'],
      joinedAt: new Date().toISOString()
    };

    localStorage.setItem(USER_KEY, JSON.stringify(user));
    updateNavUI();
    window.dispatchEvent(new CustomEvent('aurelisAuthChanged', { detail: { user } }));

    if (window.AurelisNotifications) {
      window.AurelisNotifications.show(`Account created. Welcome to AURELIS, ${user.name}.`, 'success');
    }
    return user;
  };

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    updateNavUI();
    window.dispatchEvent(new CustomEvent('aurelisAuthChanged', { detail: { user: null } }));

    if (window.AurelisNotifications) {
      window.AurelisNotifications.show('You have been signed out.', 'info');
    }
  };

  const updateInterests = (interests) => {
    const user = getUser();
    if (user) {
      user.interests = interests;
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      window.dispatchEvent(new CustomEvent('aurelisInterestsUpdated', { detail: { interests } }));
    }
  };

  const updateNavUI = () => {
    const user = getUser();
    const authContainers = document.querySelectorAll('.auth-nav-container');

    authContainers.forEach((container) => {
      if (user) {
        container.innerHTML = `
          <div class="d-flex align-items-center gap-2">
            <div class="dropdown d-inline-block position-relative user-nav-dropdown">
              <button class="btn-aurelis btn-aurelis-outline btn-aurelis-sm dropdown-toggle d-flex align-items-center gap-2" id="userMenuBtn" type="button" aria-expanded="false">
                <i class="bi bi-person-circle text-bronze"></i>
                <span class="d-none d-sm-inline">${user.name}</span>
              </button>
              <div class="dropdown-menu-custom" style="right: 0; left: auto; transform: translateY(10px); min-width: 200px;" id="userMenuDropdown">
                <div class="px-3 py-2 border-bottom border-subtle-custom mb-2">
                  <div class="small fw-bold text-truncate">${user.name}</div>
                  <div class="text-muted-custom" style="font-size: 0.75rem;">${user.email}</div>
                </div>
                <a href="explore.html" class="dropdown-item-custom"><i class="bi bi-compass"></i> Discover Topics</a>
                <a href="knowledge.html" class="dropdown-item-custom"><i class="bi bi-book"></i> Knowledge Base</a>
                <div class="divider-subtle my-2"></div>
                <button class="dropdown-item-custom w-100 text-start border-0 bg-transparent text-danger logout-btn-trigger">
                  <i class="bi bi-box-arrow-right text-danger"></i> Sign Out
                </button>
              </div>
            </div>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div class="d-flex align-items-center gap-2">
            <a href="signup.html" class="btn-aurelis btn-aurelis-primary btn-aurelis-sm">Sign Up</a>
          </div>
        `;
      }
    });

    // Attach click listeners for dynamic logout triggers
    document.querySelectorAll('.logout-btn-trigger').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
      });
    });

    // Also update mobile drawer auth area
    const mobileAuthContainers = document.querySelectorAll('.mobile-auth-container');
    mobileAuthContainers.forEach((mContainer) => {
      if (user) {
        mContainer.innerHTML = `
          <div class="p-3 bg-secondary-custom rounded mb-3">
            <div class="fw-bold">${user.name}</div>
            <div class="small text-muted-custom mb-3">${user.email}</div>
            <div class="d-flex flex-column gap-2">
              <button class="btn-aurelis btn-aurelis-dark btn-aurelis-sm w-100 justify-content-center logout-btn-trigger">
                <i class="bi bi-box-arrow-right"></i> Sign Out
              </button>
            </div>
          </div>
        `;
      } else {
        mContainer.innerHTML = `
          <div class="d-grid gap-2">
            <a href="signup.html" class="btn-aurelis btn-aurelis-primary w-100 justify-content-center">Sign Up</a>
          </div>
        `;
      }
    });

    // Reattach mobile logout
    document.querySelectorAll('.mobile-auth-container .logout-btn-trigger').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
      });
    });
  };

  const requireAuth = (callback, promptMessage = 'Please sign in to continue.') => {
    if (isLoggedIn()) {
      if (typeof callback === 'function') callback(getUser());
    } else {
      if (window.AurelisNotifications) {
        window.AurelisNotifications.show(promptMessage, 'info');
      }
      setTimeout(() => {
        window.location.href = `login.html?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`;
      }, 1000);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    updateNavUI();
  });

  return {
    getUser,
    isLoggedIn,
    login,
    signup,
    logout,
    updateInterests,
    updateNavUI,
    requireAuth
  };
})();

window.AurelisAuth = AurelisAuth;
