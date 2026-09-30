/**
 * ZYRONX - Landing Page Interactions & Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Installation Modal Controls
  const installModal = document.getElementById('installModal');
  const closeInstallModal = document.getElementById('closeInstallModal');
  const modalUnderstoodBtn = document.getElementById('modalUnderstoodBtn');
  const installTriggers = document.querySelectorAll('.trigger-install-modal');

  function openModal() {
    if (installModal) {
      installModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (installModal) {
      installModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  installTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Allow download to happen if it's an anchor, then show modal instructions
      setTimeout(openModal, 600);
    });
  });

  if (closeInstallModal) closeInstallModal.addEventListener('click', closeModal);
  if (modalUnderstoodBtn) modalUnderstoodBtn.addEventListener('click', closeModal);

  if (installModal) {
    installModal.addEventListener('click', (e) => {
      if (e.target === installModal) {
        closeModal();
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close others
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Tournament Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const tournamentCards = document.querySelectorAll('.tournament-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      tournamentCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || filterCategory === cardCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Live Toast Notifications for Winners & Registrations
  const toastContainer = document.getElementById('toastContainer');
  const notifications = [
    { name: 'Sameer_07', match: 'Solo Battle Royale', amount: '₹480', type: 'win' },
    { name: 'Viper_FF', match: 'Lone Wolf 1v1', amount: '₹150', type: 'win' },
    { name: 'Karan_Esports', match: 'Clash Squad 4v4', amount: '₹1,200', type: 'win' },
    { name: 'Rahul_Booyah', match: 'Bermuda Squad', amount: '₹750', type: 'win' },
    { name: 'Dev_Gamer', match: 'Joined Solo Match', amount: '', type: 'join' },
    { name: 'Amit_Pro', match: 'Lone Wolf 1v1', amount: '₹220', type: 'win' }
  ];

  let notifIndex = 0;

  function showToast() {
    if (!toastContainer) return;

    const notif = notifications[notifIndex];
    notifIndex = (notifIndex + 1) % notifications.length;

    const toast = document.createElement('div');
    toast.className = 'live-toast';

    if (notif.type === 'win') {
      toast.innerHTML = `
        <div class="toast-avatar">🏆</div>
        <div class="toast-text">
          <h5>${notif.name} just won <strong>${notif.amount}</strong>!</h5>
          <p>${notif.match} • Instant UPI Paid</p>
        </div>
      `;
    } else {
      toast.innerHTML = `
        <div class="toast-avatar">🎮</div>
        <div class="toast-text">
          <h5>${notif.name} registered for tournament</h5>
          <p>${notif.match} • Slot Confirmed</p>
        </div>
      `;
    }

    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // Remove after 4.5s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 4500);
  }

  // Fire first toast after 3 seconds, then every 9 seconds
  setTimeout(() => {
    showToast();
    setInterval(showToast, 9000);
  }, 3000);
});
