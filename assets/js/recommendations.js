/**
 * AURELIS — Personalized Knowledge Recommendations
 * Delivers curated topic feeds based on the user's explicit interest preferences.
 */

const AurelisRecommendations = (() => {
  const init = () => {
    const user = (window.AurelisAuth && window.AurelisAuth.getUser());
    const interests = user?.interests || ['Horology', 'Fine Jewelry', 'Gemstones', 'Movements'];
    const container = document.getElementById('personalizedFeedContainer');

    if (!container) return;

    const banner = document.getElementById('personalizedFeedBanner');
    if (banner && user) {
      banner.innerHTML = `
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <div class="d-flex align-items-center gap-2">
            <span class="aurelis-badge" style="background-color: var(--accent-bronze-subtle); color: var(--accent-bronze);">
              <i class="bi bi-stars"></i> Curated for ${user.name}
            </span>
            <span class="text-muted-custom small">Based on: ${interests.join(', ')}</span>
          </div>
          <a href="signup.html" class="small text-bronze text-decoration-none">Update Preferences</a>
        </div>
      `;
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    init();
  });

  return {
    init
  };
})();

window.AurelisRecommendations = AurelisRecommendations;
