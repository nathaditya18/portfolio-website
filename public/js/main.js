// ============================================================
// main.js — Aditya Nath Portfolio
// ============================================================
'use strict';

const $ = (id) => document.getElementById(id);

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbar();
    initScrollReveal();
    initBackToTop();
    initHamburger();
    loadSkills();
    initContactForm();
    initCurrentYear();
    initTypingEffect(['BSc Data Science Student', 'Web Developer', 'Problem Solver', 'Tech Enthusiast']);
});

// ── Particles ────────────────────────────────────────────────
function initParticles() {
    const container = $('particles');
    if (!container) return;
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `top:${Math.random() * 100}%;left:${Math.random() * 100}%;animation-delay:${Math.random() * 5}s;animation-duration:${2 + Math.random() * 4}s;`;
        container.appendChild(p);
    }
}

// ── Navbar ───────────────────────────────────────────────────
function initNavbar() {
    const navbar = $('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
        let current = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
        navLinks.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === `#${current}`); });
    }, { passive: true });
}

// ── Scroll Reveal ─────────────────────────────────────────────
function initScrollReveal() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); obs.unobserve(e.target); }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── Back to Top ───────────────────────────────────────────────
function initBackToTop() {
    const btn = $('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Hamburger ─────────────────────────────────────────────────
function initHamburger() {
    const ham = $('hamburger'), links = $('nav-links');
    if (!ham) return;
    ham.addEventListener('click', () => { ham.classList.toggle('active'); links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { ham.classList.remove('active'); links.classList.remove('open'); }));
}

// ── Typing Animation ──────────────────────────────────────────
function initTypingEffect(titles) {
    const el = $('typed-text');
    if (!el) return;
    let tIdx = 0, cIdx = 0, del = false;
    function type() {
        const cur = titles[tIdx];
        el.textContent = del ? cur.substring(0, --cIdx) : cur.substring(0, ++cIdx);
        if (!del && cIdx === cur.length) { del = true; setTimeout(type, 2000); return; }
        if (del && cIdx === 0) { del = false; tIdx = (tIdx + 1) % titles.length; setTimeout(type, 400); return; }
        setTimeout(type, del ? 45 : 85);
    }
    type();
}

// ── Load Skills via GET /api/skills ───────────────────────────
async function loadSkills() {
    const grid = $('skills-grid');
    if (!grid) return;
    try {
        const res = await fetch('/api/skills');
        const json = await res.json();
        if (!json.success) throw new Error(json.message);

        grid.innerHTML = json.data.map(skill => `
      <div class="skill-card reveal" data-category="${skill.category}">
        <div class="skill-header">
          <div class="skill-info">
            <div class="skill-icon"><i class="${skill.icon_class || 'fas fa-code'}"></i></div>
            <div>
              <p class="skill-name">${skill.name}</p>
              <p class="skill-category">${skill.category}</p>
            </div>
          </div>
          <span class="skill-percent">${skill.level}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" data-level="${skill.level}" style="width:0"></div>
        </div>
      </div>
    `).join('');

        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    const bar = e.target.querySelector('.skill-bar-fill');
                    if (bar) setTimeout(() => { bar.style.width = bar.dataset.level + '%'; }, 200);
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.2 });
        grid.querySelectorAll('.skill-card').forEach(c => obs.observe(c));

    } catch (err) {
        grid.innerHTML = `<p style="color:var(--text-secondary);grid-column:1/-1;text-align:center;padding:40px">Could not load skills. Make sure the server is running.</p>`;
    }
}

// ── Contact Form via POST /api/contact ────────────────────────
function initContactForm() {
    const form = $('contact-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        ['name-error', 'email-error', 'message-error'].forEach(id => { const el = $(id); if (el) el.textContent = ''; });
        const name = $('contact-name').value.trim();
        const email = $('contact-email').value.trim();
        const subject = $('contact-subject').value.trim();
        const message = $('contact-message').value.trim();

        let err = false;
        if (!name) { setErr('name-error', 'Name is required.'); err = true; }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('email-error', 'Valid email required.'); err = true; }
        if (!message) { setErr('message-error', 'Message is required.'); err = true; }
        if (err) return;

        const btn = $('submit-btn');
        btn.disabled = true;
        btn.querySelector('i').className = 'fas fa-spinner fa-spin';
        btn.querySelector('span').textContent = 'Sending...';

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
            });
            const json = await res.json();
            const resp = $('form-response');
            resp.textContent = json.success ? '🎉 ' + json.message : '❌ ' + json.message;
            resp.className = 'form-response ' + (json.success ? 'success' : 'error');
            if (json.success) { form.reset(); showToast('Message sent! 🚀'); }
            setTimeout(() => { resp.style.display = 'none'; resp.className = 'form-response'; }, 6000);
        } catch {
            const resp = $('form-response');
            resp.textContent = '❌ Network error. Check if the server is running.';
            resp.className = 'form-response error';
        } finally {
            btn.disabled = false;
            btn.querySelector('i').className = 'fas fa-paper-plane';
            btn.querySelector('span').textContent = 'Send Message';
        }
    });
}

function setErr(id, msg) { const el = $(id); if (el) el.textContent = msg; }

function showToast(msg) {
    const t = $('toast');
    if (!t) return;
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
}

function initCurrentYear() {
    const el = $('footer-year');
    if (el) el.textContent = new Date().getFullYear();
}
