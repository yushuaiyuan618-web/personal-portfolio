const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const backTop = document.querySelector('.back-top');
const toast = document.querySelector('.toast');
const tipPopover = document.querySelector('.tip-popover');
const progress = document.querySelector('.scroll-progress');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function showTip(message) {
  tipPopover.textContent = message;
  tipPopover.classList.add('show');
  clearTimeout(showTip.timer);
  showTip.timer = setTimeout(() => tipPopover.classList.remove('show'), 2800);
}

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast('邮箱已复制');
    } catch {
      showToast('请手动复制邮箱');
    }
  });
});

document.querySelectorAll('.filter-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter;
    document.querySelectorAll('.filter-chip').forEach((item) => item.classList.remove('active'));
    chip.classList.add('active');

    document.querySelectorAll('.subject-card').forEach((card) => {
      const categories = card.dataset.category.split(' ');
      card.classList.toggle('is-hidden', filter !== 'all' && !categories.includes(filter));
    });
  });
});

document.querySelectorAll('[data-tip]').forEach((button) => {
  button.addEventListener('click', () => showTip(button.dataset.tip));
});

document.querySelectorAll('.timeline-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.timeline-item');
    const shouldOpen = !item.classList.contains('open');

    document.querySelectorAll('.timeline-item.open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.timeline-toggle').setAttribute('aria-expanded', 'false');
      }
    });

    item.classList.toggle('open', shouldOpen);
    button.setAttribute('aria-expanded', String(shouldOpen));
  });
});

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.tab').forEach((item) => item.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.panel === target);
    });
    tab.classList.add('active');
  });
});

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const sections = document.querySelectorAll('header[id], section[id]');

function updatePageState() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;

  let current = 'hero';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  navAnchors.forEach((anchor) => {
    anchor.classList.toggle('active', anchor.getAttribute('href') === `#${current}`);
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

window.addEventListener('scroll', updatePageState);
window.addEventListener('resize', updatePageState);
updatePageState();
