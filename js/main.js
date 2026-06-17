/* ============================================================
   KHADAYATA JYOTI - Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Mobile Navigation ─────────────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
      this.setAttribute('aria-expanded', menu.classList.contains('open'));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('open');
      }
    });

    // Mobile dropdown toggle (click instead of hover)
    document.querySelectorAll('.nav-menu > li').forEach(function (li) {
      const link = li.querySelector('a');
      const dropdown = li.querySelector('.dropdown');
      if (dropdown && link) {
        link.addEventListener('click', function (e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            li.classList.toggle('open');
          }
        });
      }
    });
  }

  /* ── Active Nav Link ───────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu > li > a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.closest('li').classList.add('active');
    }
  });

  /* ── Fade-in on Scroll ─────────────────────────────────── */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });

  /* ── Animated Counter ──────────────────────────────────── */
  function animateCount(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(function () {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start).toLocaleString() + (el.dataset.suffix || '');
    }, 16);
  }

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCount(el, target, 1500);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-target]').forEach(function (el) {
    counterObserver.observe(el);
  });

  /* ── Contact Form Validation ───────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name    = contactForm.querySelector('#name');
      const email   = contactForm.querySelector('#email');
      const message = contactForm.querySelector('#message');
      let valid = true;

      [name, email, message].forEach(function (el) {
        el.style.borderColor = '';
        if (!el.value.trim()) {
          el.style.borderColor = '#e74c3c';
          valid = false;
        }
      });

      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = '#e74c3c';
        valid = false;
      }

      if (valid) {
        const btn = contactForm.querySelector('.btn-submit');
        btn.textContent = '✓ Message Sent! We will contact you shortly.';
        btn.style.background = '#27ae60';
        contactForm.reset();
        setTimeout(function () {
          btn.textContent = 'Send Message';
          btn.style.background = '';
        }, 4000);
      }
    });
  }

  /* ── Members Search ────────────────────────────────────── */
  const memberSearch = document.getElementById('memberSearch');
  if (memberSearch) {
    memberSearch.addEventListener('input', function () {
      const q = this.value.toLowerCase();
      document.querySelectorAll('.members-table tbody tr').forEach(function (row) {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  /* ── Ekda Tabs ─────────────────────────────────────────── */
  document.querySelectorAll('.ekda-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.ekda-tab').forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
      const target = this.dataset.ekda;
      document.querySelectorAll('.ekda-group').forEach(function (g) {
        g.style.display = (target === 'all' || g.dataset.ekda === target) ? '' : 'none';
      });
    });
  });

  /* ── Smooth scroll for anchor links ───────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Ticker pause on hover ─────────────────────────────── */
  const track = document.querySelector('.ticker-track');
  if (track) {
    track.addEventListener('mouseenter', function () { this.style.animationPlayState = 'paused'; });
    track.addEventListener('mouseleave', function () { this.style.animationPlayState = 'running'; });
  }

});
