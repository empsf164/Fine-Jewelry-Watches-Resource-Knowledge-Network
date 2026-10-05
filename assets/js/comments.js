/**
 * AURELIS — Discussion Comments & Reply Composer
 * Manages reply submissions, nested comment rendering, and helpful upvotes on replies.
 */

const AurelisComments = (() => {
  const STORAGE_REPLIES_PREFIX = 'aurelis_replies_';

  const getRepliesForThread = (threadId) => {
    try {
      const data = localStorage.getItem(STORAGE_REPLIES_PREFIX + threadId);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  };

  const addReply = (threadId, replyData) => {
    const replies = getRepliesForThread(threadId);
    replies.push(replyData);
    localStorage.setItem(STORAGE_REPLIES_PREFIX + threadId, JSON.stringify(replies));
    return replies;
  };

  const init = () => {
    const replyForm = document.getElementById('discussionReplyForm');
    const repliesContainer = document.getElementById('discussionRepliesList');
    const threadId = new URLSearchParams(window.location.search).get('id') || 'servicing-interval';

    if (!replyForm || !repliesContainer) return;

    const renderCustomReplies = () => {
      const customReplies = getRepliesForThread(threadId);
      customReplies.forEach(rep => {
        const div = document.createElement('div');
        div.className = 'p-3 p-md-4 bg-surface-custom border border-subtle-custom rounded mb-3';
        div.innerHTML = `
          <div class="d-flex align-items-center justify-content-between mb-2">
            <div class="d-flex align-items-center gap-2">
              <div class="bg-secondary-custom rounded-circle p-2 text-bronze font-ui fw-bold" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;">
                ${rep.author.charAt(0)}
              </div>
              <div>
                <div class="fw-bold font-ui text-primary">${rep.author}</div>
                <div class="small text-muted-custom">${rep.role || 'Member'} • Just now</div>
              </div>
            </div>
            <button class="btn-aurelis btn-aurelis-outline btn-aurelis-sm"><i class="bi bi-hand-thumbs-up"></i> 0</button>
          </div>
          <p class="mb-0 text-secondary">${rep.text}</p>
        `;
        repliesContainer.appendChild(div);
      });
    };

    renderCustomReplies();

    replyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (window.AurelisAuth && !window.AurelisAuth.isLoggedIn()) {
        window.AurelisAuth.requireAuth(() => {}, 'Please sign in to post a reply.');
        return;
      }

      const textarea = replyForm.querySelector('textarea');
      const text = textarea ? textarea.value.trim() : '';
      if (!text) return;

      const user = (window.AurelisAuth && window.AurelisAuth.getUser()) || { name: 'Knowledge Contributor' };

      const replyData = {
        author: user.name,
        role: 'Community Member',
        text: text,
        date: new Date().toISOString()
      };

      addReply(threadId, replyData);
      
      // Append directly to DOM
      const div = document.createElement('div');
      div.className = 'p-3 p-md-4 bg-surface-custom border border-subtle-custom rounded mb-3';
      div.innerHTML = `
        <div class="d-flex align-items-center justify-content-between mb-2">
          <div class="d-flex align-items-center gap-2">
            <div class="bg-secondary-custom rounded-circle p-2 text-bronze font-ui fw-bold" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;">
              ${replyData.author.charAt(0)}
            </div>
            <div>
              <div class="fw-bold font-ui text-primary">${replyData.author}</div>
              <div class="small text-muted-custom">Member • Just now</div>
            </div>
          </div>
          <button class="btn-aurelis btn-aurelis-outline btn-aurelis-sm"><i class="bi bi-hand-thumbs-up"></i> 0</button>
        </div>
        <p class="mb-0 text-secondary">${replyData.text}</p>
      `;
      repliesContainer.appendChild(div);

      textarea.value = '';
      if (window.AurelisNotifications) {
        window.AurelisNotifications.show('Reply posted successfully.', 'success');
      }
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    init();
  });

  return {
    add: addReply,
    get: getRepliesForThread
  };
})();

window.AurelisComments = AurelisComments;
