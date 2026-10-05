/**
 * AURELIS — Notifications System
 * Toast notifications for feedback, bookmarking, downloads, auth, and actions.
 */

const AurelisNotifications = (() => {
  let container = null;

  const ensureContainer = () => {
    if (!container) {
      container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
      }
    }
    return container;
  };

  const show = (message, type = 'info', duration = 3600) => {
    const parent = ensureContainer();
    const toast = document.createElement('div');
    toast.className = `aurelis-toast toast-${type}`;

    let iconClass = 'bi-info-circle';
    if (type === 'success') iconClass = 'bi-check2-circle';
    if (type === 'error') iconClass = 'bi-exclamation-triangle';

    toast.innerHTML = `
      <i class="bi ${iconClass} text-bronze" style="font-size: 1.15rem;"></i>
      <div style="flex: 1; line-height: 1.4;">${message}</div>
      <button type="button" class="btn-close-toast" style="background:none;border:none;color:var(--text-muted);cursor:pointer;padding:2px 4px;font-size:0.9rem;" aria-label="Close notification">
        <i class="bi bi-x"></i>
      </button>
    `;

    const closeBtn = toast.querySelector('.btn-close-toast');
    const dismiss = () => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    };

    closeBtn.addEventListener('click', dismiss);
    parent.appendChild(toast);

    if (duration > 0) {
      setTimeout(dismiss, duration);
    }
  };

  return {
    show
  };
})();

window.AurelisNotifications = AurelisNotifications;
