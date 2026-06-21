const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const modal = document.getElementById('detailModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const toast = document.getElementById('toast');
const backTop = document.getElementById('backTop');

const skillDetails = {
  math: {
    title: '数学能力',
    icon: '∑',
    summary: '扎实的数理基础，竞赛与课程成绩突出，具备逻辑分析与问题拆解能力。',
    highlights: [
      { label: '大学生数学竞赛', value: '三等奖' },
      { label: '高等数学 B Ⅰ', value: '95 / 100' },
      { label: '概率论与数理统计', value: '92 / 100' },
      { label: '高等数学 B Ⅱ', value: '90 / 100' },
      { label: '线性代数', value: '87 / 100' },
    ],
    tags: ['逻辑推理', '竞赛思维', '奥数专题', '数据分析基础'],
    detail:
      '初中阶段数学多次满分；大学期间在高等数学、概率论等核心课程中表现优异。实践中擅长鸡兔同笼、方程、几何面积、立体图形等专题，注重培养独立思考与结构化解题思路。',
  },
  language: {
    title: '语言能力',
    icon: 'A',
    summary: '雅思（IELTS）6.5 分，通过 CET-4 / CET-6，学术英语读写与口语能力突出，可胜任双语资料阅读与书面表达。',
    highlights: [
      { label: 'IELTS', value: '6.5' },
      { label: 'CET-4', value: '已通过' },
      { label: 'CET-6', value: '已通过' },
      { label: '学术英语写作', value: '99 / 100' },
      { label: '学术英语口语', value: '90 / 100' },
      { label: '英语写作 Ⅲ', value: '93 / 100' },
    ],
    tags: ['学术写作', '口语表达', '文献阅读', '跨文化交流'],
    detail:
      '雅思（IELTS）成绩 6.5 分。国际专业背景下长期接触英语授课与学术训练，写作与口语均有系统课程支撑，能够阅读英文资料并完成规范的书面表达。',
  },
  general: {
    title: '综合技能',
    icon: '⚙',
    summary: '兼具技术、运营与组织协调能力，能将数理思维应用于团队协作与项目推进。',
    highlights: [
      { label: 'Java 程序设计', value: '90 / 100' },
      { label: '团队管理', value: '50 人军训排' },
      { label: '新媒体运营', value: '学院公众号' },
      { label: '技术支持', value: '计算机维修部' },
      { label: '平台运营', value: '易班管理' },
    ],
    tags: ['Java', '项目管理', '新媒体', '技术支持', '沟通协调'],
    detail:
      '担任学院新媒体技术运营中心主席团副主任，负责公众号运营、计算机维修与易班平台管理；在新东方助教岗位中积累课堂管理、作业批改与多方沟通经验。',
  },
};

const awardDetails = {
  math: {
    title: '大学生数学竞赛 · 三等奖',
    body: '代表学校参与大学生数学竞赛并获三等奖，体现扎实的数学功底与临场解题能力。',
  },
  gpa: {
    title: '学业成绩 · 专业前 5%',
    body: 'GPA 4.12 / 5，位列专业前 5%。核心数理与英语课程成绩稳定在高分段，学习态度严谨、方法系统。',
  },
  military: {
    title: '军训教官团 · 优秀排 / 优秀学员',
    body: '独立制定并执行新生军训计划，带领 50 人团队完成训练任务；在 8 期暑期集训中获评「优秀学员」，所在排获「优秀排」。',
  },
  practice: {
    title: '实践成果 · 高满意度反馈',
    body: '新东方助教期间跟进 30+ 学生，家长满意度达 95%；家教与辅导项目中多名学生实现显著提分，组织工作亦获积极评价。',
  },
};

const traitDetails = {
  rigor: {
    title: '严谨认真',
    body: '做事注重细节与流程，习惯充分准备、按步骤推进，并在过程中持续复盘与优化。',
  },
  affinity: {
    title: '亲和力强',
    body: '性格开朗，容易与他人建立信任，在沟通中能够营造轻松、可协作的氛围。',
  },
  communicate: {
    title: '善于沟通',
    body: '能够清晰表达观点，也能耐心倾听对方需求，在多方协作中起到桥梁作用。',
  },
  responsible: {
    title: '责任心强',
    body: '对任务全程负责，及时跟进进度并反馈结果，确保事项闭环与质量达标。',
  },
  team: {
    title: '团队协作',
    body: '具备团队组建与项目管理经验，注重分工协调与效率，追求团队共同目标。',
  },
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function openModal(title, html) {
  modalTitle.textContent = title;
  modalBody.innerHTML = html;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function renderSkillModal(data) {
  const highlights = data.highlights
    .map((item) => `<div class="modal-stat"><span>${item.label}</span><strong>${item.value}</strong></div>`)
    .join('');
  const tags = data.tags.map((tag) => `<span class="modal-tag">${tag}</span>`).join('');

  openModal(
    data.title,
    `
      <div class="modal-icon">${data.icon}</div>
      <p class="modal-summary">${data.summary}</p>
      <div class="modal-stats">${highlights}</div>
      <div class="modal-tags">${tags}</div>
      <p class="modal-detail">${data.detail}</p>
    `
  );
}

function renderAwardModal(data) {
  openModal(data.title, `<p class="modal-detail">${data.body}</p>`);
}

function renderDetailModal(trigger) {
  const title = trigger.dataset.title;
  const date = trigger.dataset.date || '';
  const desc = trigger.dataset.desc || '';
  const points = (trigger.dataset.points || '').split('|').filter(Boolean);

  openModal(
    title,
    `
      ${date ? `<p class="modal-meta">${date}</p>` : ''}
      ${desc ? `<p class="modal-summary">${desc}</p>` : ''}
      ${
        points.length
          ? `<ul class="modal-list">${points.map((point) => `<li>${point}</li>`).join('')}</ul>`
          : ''
      }
    `
  );
}

function animateCounter(element) {
  const target = parseFloat(element.dataset.count);
  const decimals = parseInt(element.dataset.decimals || '0', 10);
  const suffix = element.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    const value = target * eased;
    element.textContent = `${value.toFixed(decimals)}${suffix}`;
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-value[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  backTop.classList.toggle('visible', window.scrollY > 480);

  const sections = document.querySelectorAll('section[id], header[id]');
  let current = 'hero';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('[data-skill]').forEach((card) => {
  const toggleExpand = () => card.classList.toggle('expanded');

  card.addEventListener('click', (event) => {
    if (event.target.closest('.skill-expand')) return;
    toggleExpand();
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (event.target.closest('.skill-expand')) return;
      toggleExpand();
    }
  });

  card.querySelector('.skill-expand').addEventListener('click', (event) => {
    event.stopPropagation();
    renderSkillModal(skillDetails[card.dataset.skill]);
  });
});

document.querySelectorAll('[data-award]').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelectorAll('[data-award]').forEach((item) => {
      if (item !== card) item.classList.remove('expanded');
    });
    card.classList.toggle('expanded');
  });

  card.querySelector('.award-more').addEventListener('click', (event) => {
    event.stopPropagation();
    renderAwardModal(awardDetails[card.dataset.award]);
  });
});

document.querySelectorAll('.timeline-toggle').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const item = toggle.closest('.timeline-item');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.timeline-item.open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.timeline-toggle').setAttribute('aria-expanded', 'false');
      }
    });

    item.classList.toggle('open', !isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });
});

document.querySelectorAll('.timeline-detail-btn, .campus-detail-btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    renderDetailModal(button);
  });
});

document.querySelectorAll('.campus-card').forEach((card) => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('.campus-detail-btn')) return;
    document.querySelectorAll('.campus-card.expanded').forEach((item) => {
      if (item !== card) item.classList.remove('expanded');
    });
    card.classList.toggle('expanded');
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (event.target.closest('.campus-detail-btn')) return;
      card.click();
    }
  });
});

document.querySelectorAll('.course-tag').forEach((tag) => {
  tag.addEventListener('click', () => {
    openModal(
      tag.dataset.course,
      `<p class="modal-meta">课程成绩</p><p class="modal-summary">${tag.dataset.score}</p><p class="modal-detail">${tag.dataset.detail}</p>`
    );
  });
});

document.querySelectorAll('[data-trait]').forEach((tag) => {
  tag.addEventListener('click', () => {
    document.querySelectorAll('[data-trait]').forEach((item) => item.classList.remove('active'));
    tag.classList.add('active');
    const data = traitDetails[tag.dataset.trait];
    openModal(data.title, `<p class="modal-detail">${data.body}</p>`);
  });
});

document.querySelectorAll('[data-copy]').forEach((element) => {
  element.addEventListener('click', async (event) => {
    if (element.tagName === 'A') event.preventDefault();
    const value = element.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast(`已复制：${value}`);
    } catch {
      showToast('复制失败，请手动复制');
    }
  });
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.querySelectorAll('[data-trait]').forEach((item) => item.classList.remove('active'));
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('.hero .reveal').forEach((element, index) => {
  element.style.transitionDelay = `${index * 0.08}s`;
  element.classList.add('revealed');
});

initCounters();
