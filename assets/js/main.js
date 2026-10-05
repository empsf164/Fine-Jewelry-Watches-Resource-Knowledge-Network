/**
 * AURELIS — Main Orchestration & Global UI Interactions
 * Handles mobile drawer navigation, header scroll effects, GSAP micro-animations,
 * newsletter forms, and global interactive components.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileBackdrop = document.getElementById('mobileNavBackdrop');
  const closeMobileDrawerBtn = document.getElementById('closeMobileDrawerBtn');

  const openMobileNav = () => {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.add('active');
      mobileBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMobileNav = () => {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.remove('active');
      mobileBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileNav);
  if (closeMobileDrawerBtn) closeMobileDrawerBtn.addEventListener('click', closeMobileNav);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileNav);

  // Mobile submenu accordion toggles
  document.querySelectorAll('.mobile-submenu-toggle').forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = toggle.getAttribute('data-target');
      const submenu = document.getElementById(targetId);
      const icon = toggle.querySelector('.submenu-arrow-icon');
      if (submenu) {
        const isOpen = submenu.classList.contains('open');
        // Close other open submenus
        document.querySelectorAll('.mobile-submenu').forEach(s => s.classList.remove('open'));
        document.querySelectorAll('.submenu-arrow-icon').forEach(i => i.style.transform = 'rotate(0deg)');

        if (!isOpen) {
          submenu.classList.add('open');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      }
    });
  });

  // 2. Sticky Header Scroll Effect
  const header = document.querySelector('.aurelis-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 3. Highlight Current Page in Navigation
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link-custom, .mobile-menu-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 4. Newsletter Form Submissions
  document.querySelectorAll('.newsletter-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        if (window.AurelisNotifications) {
          window.AurelisNotifications.show(`Thank you. ${emailInput.value} has been subscribed to the AURELIS Editorial Dispatch.`, 'success');
        }
        emailInput.value = '';
      }
    });
  });

  // 5. GSAP Micro-Animations
  if (typeof gsap !== 'undefined') {
    gsap.from('.hero-editorial .gsap-reveal', {
      y: 24,
      opacity: 0,
      duration: 0.85,
      stagger: 0.12,
      ease: 'power2.out'
    });

    // Fade-in on scroll triggers
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.utils.toArray('.aurelis-card, .topic-card, .video-card, .resource-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    }
  }

  // 6. Global Copy Link Tool
  document.querySelectorAll('.btn-copy-url').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(window.location.href).then(() => {
        if (window.AurelisNotifications) {
          window.AurelisNotifications.show('Link copied to clipboard.', 'success');
        }
      });
    });
  });
});
