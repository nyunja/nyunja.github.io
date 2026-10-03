/* NyunjaOS 1.0 — turns the page's [data-app] sections into a desktop.
   No dependencies, no build step: GitHub Pages serves this file as-is. */
(function () {
  'use strict';

  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };
  var session = {
    get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };

  var EMAIL = 'Nyunja.jp@gmail.com';
  var GITHUB = 'https://github.com/nyunja';
  var LINKEDIN = 'https://linkedin.com/in/nyunja';

  /* ------------------------------------------------------------------ */
  /* Icons (48×48, line art + accent fill)                               */
  /* ------------------------------------------------------------------ */
  var A = 'var(--accent)', T = 'currentColor';
  var ICONS = {
    doc: '<svg viewBox="0 0 48 48" fill="none" stroke="' + T + '" stroke-width="2"><path d="M12 5h17l9 9v29H12z" fill="var(--surface)"/><path d="M29 5v9h9"/><path d="M17 22h15M17 28h15M17 34h10" stroke="' + A + '"/></svg>',
    log: '<svg viewBox="0 0 48 48" fill="none" stroke="' + T + '" stroke-width="2"><path d="M12 5h17l9 9v29H12z" fill="var(--surface)"/><path d="M29 5v9h9"/><circle cx="18" cy="23" r="2" fill="' + A + '" stroke="none"/><circle cx="18" cy="31" r="2" fill="' + A + '" stroke="none"/><path d="M23 23h9M23 31h9"/></svg>',
    folder: '<svg viewBox="0 0 48 48" fill="none" stroke="' + T + '" stroke-width="2"><path d="M4 11h15l4 5h21v25H4z" fill="var(--surface)"/><path d="M4 20h40" /><path d="M4 20h40v21H4z" fill="' + A + '" fill-opacity=".9"/></svg>',
    pdf: '<svg viewBox="0 0 48 48" fill="none" stroke="' + T + '" stroke-width="2"><path d="M12 5h17l9 9v29H12z" fill="var(--surface)"/><path d="M29 5v9h9"/><rect x="7" y="24" width="24" height="12" fill="' + A + '" stroke="none"/><text x="19" y="33.5" text-anchor="middle" font-family="Space Mono, monospace" font-size="8" font-weight="700" fill="var(--on-accent)" stroke="none">PDF</text></svg>',
    terminal: '<svg viewBox="0 0 48 48" fill="none" stroke="' + T + '" stroke-width="2"><rect x="4" y="8" width="40" height="32" fill="#0a0a0a"/><path d="M4 14h40"/><path d="M11 22l6 5-6 5" stroke="' + A + '" stroke-width="2.5"/><path d="M21 33h12" stroke="#d8d6cf"/></svg>',
    mail: '<svg viewBox="0 0 48 48" fill="none" stroke="' + T + '" stroke-width="2"><rect x="4" y="10" width="40" height="28" fill="var(--surface)"/><path d="M4 10l20 16 20-16" stroke="' + A + '" stroke-width="2.5"/></svg>',
    notes: '<svg viewBox="0 0 48 48" fill="none" stroke="' + T + '" stroke-width="2"><rect x="9" y="6" width="30" height="36" fill="var(--surface)"/><path d="M9 6h30v7H9z" fill="' + A + '"/><path d="M15 21h18M15 27h18M15 33h12"/></svg>',
    settings: '<svg viewBox="0 0 48 48" fill="none" stroke="' + T + '" stroke-width="2"><path d="M24 4l4 5 6-2 1 6 6 2-2 6 5 3-5 3 2 6-6 2-1 6-6-2-4 5-4-5-6 2-1-6-6-2 2-6-5-3 5-3-2-6 6-2 1-6 6 2z" fill="var(--surface)"/><circle cx="24" cy="24" r="6" fill="' + A + '"/></svg>',
    github: '<svg viewBox="0 0 48 48"><rect x="4" y="4" width="40" height="40" fill="var(--surface)" stroke="currentColor" stroke-width="2"/><path transform="translate(12 12) scale(1.5)" fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
    linkedin: '<svg viewBox="0 0 48 48"><rect x="4" y="4" width="40" height="40" fill="var(--surface)" stroke="currentColor" stroke-width="2"/><rect x="13" y="20" width="5" height="15" fill="currentColor"/><circle cx="15.5" cy="14.5" r="3" fill="' + A + '"/><path d="M22 20h5v2.5c1-1.8 3-3 5.5-3 3.5 0 5.5 2.2 5.5 6.5v9h-5v-8c0-2-1-3.2-2.8-3.2-1.9 0-3.2 1.3-3.2 3.6V35h-5z" fill="currentColor"/></svg>',
    min: '<svg viewBox="0 0 12 12"><path d="M2 9h8" stroke="currentColor" stroke-width="1.6"/></svg>',
    max: '<svg viewBox="0 0 12 12" fill="none"><rect x="2" y="2" width="8" height="8" stroke="currentColor" stroke-width="1.6"/></svg>',
    close: '<svg viewBox="0 0 12 12"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" stroke-width="1.6"/></svg>'
  };

  /* ------------------------------------------------------------------ */
  /* Shared enhancements (run in desktop *and* classic view)             */
  /* ------------------------------------------------------------------ */
  function enhanceContent(scope) {
    // Mail form → prefilled mailto:
    scope.querySelectorAll('form.mail-form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var to = form.getAttribute('data-mailto') || EMAIL;
        var subject = form.elements.subject.value.trim();
        var body = form.elements.body.value.trim();
        location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      });
    });
    // Resume viewer: inline PDF where the browser can render it, links otherwise
    scope.querySelectorAll('.resume-frame').forEach(function (box) {
      if (box.childElementCount) return;
      var src = box.getAttribute('data-src');
      var canInline = navigator.pdfViewerEnabled !== false && !window.matchMedia('(max-width: 760px)').matches;
      if (canInline) {
        var obj = document.createElement('iframe');
        obj.src = src + '#view=FitH';
        obj.title = 'Resume PDF preview';
        obj.loading = 'lazy';
        box.appendChild(obj);
      } else {
        box.innerHTML = '<div class="resume-fallback"><p>This device can\'t preview PDFs inline.</p><p><a class="btn btn-primary" href="' + src + '" target="_blank" rel="noopener">Open resume ↗</a></p></div>';
        box.style.height = 'auto';
        box.style.minHeight = '0';
      }
    });
  }

  function onReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  /* ------------------------------------------------------------------ */
  /* Desktop                                                             */
  /* ------------------------------------------------------------------ */
  var desktop, iconsEl, tasksEl, startBtn, startMenu;
  var wins = {};          // id → { el, task, app }
  var z = 10, cascade = 0;
  var mq = window.matchMedia('(max-width: 760px)');
  var isPhone = function () { return mq.matches; };

  // App registry: content apps come from the page; built-ins are created here.
  var apps = {};
  document.querySelectorAll('[data-app]').forEach(function (sec) {
    apps[sec.dataset.app] = {
      id: sec.dataset.app,
      title: sec.dataset.title,
      icon: sec.dataset.icon,
      w: +sec.dataset.w || 600,
      h: +sec.dataset.h || 480,
      section: sec
    };
  });
  apps.terminal = { id: 'terminal', title: 'Terminal', icon: 'terminal', w: 640, h: 420, build: buildTerminal, flush: true };
  apps.settings = { id: 'settings', title: 'Settings', icon: 'settings', w: 440, h: 470, build: buildSettings };
  apps.projects.build = buildExplorer;
  apps.projects.flush = true;

  var DESKTOP_ICONS = ['about', 'projects', 'resume', 'terminal', 'contact', 'skills', 'education', 'notes', 'settings',
    { id: 'github', title: 'GitHub', icon: 'github', href: GITHUB },
    { id: 'linkedin', title: 'LinkedIn', icon: 'linkedin', href: LINKEDIN }];

  var projects = Array.prototype.map.call(document.querySelectorAll('.project'), function (el) {
    return {
      slug: el.dataset.slug,
      el: el,
      title: el.querySelector('h3').textContent.trim(),
      meta: el.querySelector('.project-meta span').textContent.trim(),
      year: el.querySelector('.project-meta span:last-child').textContent.trim(),
      desc: el.querySelector('.project-info > p:not([class])').textContent.trim(),
      thumb: el.querySelector('img').dataset.thumb,
      featured: el.hasAttribute('data-featured'),
      tags: Array.prototype.map.call(el.querySelectorAll('.tags li'), function (li) { return li.textContent; })
    };
  });

  function boot() {
    buildShell();
    root.classList.add('os-ready');

    var params = new URLSearchParams(location.search);
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var start = function () {
      // Deep links: #projects, #project-rentbase, #terminal …
      var hash = decodeURIComponent(location.hash.slice(1));
      if (hash.indexOf('project-') === 0 && document.getElementById(hash)) {
        if (!isPhone()) openApp('projects');
        openProject(hash.slice(8));
      } else if (apps[hash]) {
        openApp(hash);
      } else if (!isPhone()) {
        openApp('about');   // a welcome window so visitors know where to start
      }
    };
    if (session.get('nyos.booted') || reduce || params.has('noboot')) start();
    else runBootScreen(start);
  }

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'text') n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    if (html != null) n.innerHTML = html;
    return n;
  }

  function buildShell() {
    desktop = el('div', { class: 'desktop', role: 'application', 'aria-label': 'NyunjaOS desktop' });

    var card = el('div', { class: 'home-card' },
      '<div class="home-time" data-clock="time"></div>' +
      '<p>John Paul Nyunja · <strong>Full-stack engineer</strong></p>' +
      '<p class="muted">Go · TypeScript · PostgreSQL — Kisumu, Kenya. Tap an app to explore, or <a href="?classic">switch to classic view</a>.</p>');
    desktop.appendChild(card);

    iconsEl = el('div', { class: 'icons', role: 'list', 'aria-label': 'Desktop' });
    DESKTOP_ICONS.forEach(function (item) {
      var app = typeof item === 'string' ? apps[item] : item;
      var b;
      if (app.href) {
        b = el('a', { class: 'icon', href: app.href, target: '_blank', rel: 'noopener noreferrer', role: 'listitem', 'aria-label': app.title + ' (opens in new tab)' });
      } else {
        b = el('button', { class: 'icon', type: 'button', role: 'listitem', 'data-app': app.id, 'aria-label': 'Open ' + app.title });
      }
      b.innerHTML = ICONS[app.icon] + '<span>' + app.title + '</span>';
      iconsEl.appendChild(b);
    });
    desktop.appendChild(iconsEl);
    desktop.appendChild(el('div', { class: 'wordmark', 'aria-hidden': 'true' }, 'Nyunja<br>OS<small>v1.0 · kisumu build</small>'));

    // Icon interaction: single click selects, double-click / Enter opens. Phones: tap opens.
    iconsEl.addEventListener('click', function (e) {
      var b = e.target.closest('.icon');
      if (!b || b.tagName === 'A') return;
      if (isPhone() || e.detail === 0) { openApp(b.dataset.app); return; }  // detail 0 = keyboard
      selectIcon(b);
    });
    iconsEl.addEventListener('dblclick', function (e) {
      var b = e.target.closest('.icon');
      if (b && b.dataset.app) openApp(b.dataset.app);
    });
    desktop.addEventListener('pointerdown', function (e) {
      if (!e.target.closest('.icon')) selectIcon(null);
    });

    // Taskbar
    var bar = el('div', { class: 'taskbar', role: 'toolbar', 'aria-label': 'Taskbar' });
    startBtn = el('button', { class: 'start-btn', type: 'button', 'aria-haspopup': 'menu', 'aria-expanded': 'false', 'aria-controls': 'start-menu' }, 'NYUNJA<span style="opacity:.7">/OS</span>');
    tasksEl = el('div', { class: 'tasks', 'aria-label': 'Open windows' });
    var tray = el('div', { class: 'tray' },
      '<a href="?classic" title="Plain single-page version">Classic view</a>' +
      '<span class="clock" data-clock="time"></span>');
    bar.appendChild(startBtn); bar.appendChild(tasksEl); bar.appendChild(tray);

    // Start menu
    startMenu = el('div', { class: 'start-menu', id: 'start-menu', hidden: '' });
    var list = ['about', 'projects', 'resume', 'contact', 'terminal', 'skills', 'education', 'notes', 'settings'].map(function (id) {
      return '<li><button type="button" role="menuitem" data-app="' + id + '">' + ICONS[apps[id].icon] + apps[id].title + '</button></li>';
    }).join('');
    startMenu.innerHTML = '<div class="start-side">NYUNJA <small>OS 1.0</small></div><ul role="menu">' + list +
      '<li class="sep" role="separator"></li>' +
      '<li><a role="menuitem" href="?classic">' + ICONS.doc + 'Classic view</a></li>' +
      '<li><button type="button" role="menuitem" data-act="shutdown">' + ICONS.close + 'Shut down…</button></li></ul>';

    startBtn.addEventListener('click', function () { toggleStart(); });
    startMenu.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      toggleStart(false);
      if (b.dataset.app) openApp(b.dataset.app);
      if (b.dataset.act === 'shutdown') shutdown();
    });
    document.addEventListener('pointerdown', function (e) {
      if (!startMenu.hidden && !e.target.closest('.start-menu, .start-btn')) toggleStart(false);
    });

    document.body.appendChild(desktop);
    document.body.appendChild(bar);
    document.body.appendChild(startMenu);

    // Links inside windows like <a data-open="projects"> open apps instead of jumping
    document.addEventListener('click', function (e) {
      var a = e.target.closest('[data-open]');
      if (a && desktop.contains(a)) { e.preventDefault(); openApp(a.dataset.open); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (!startMenu.hidden) { toggleStart(false); startBtn.focus(); return; }
        var w = e.target.closest && e.target.closest('.win');
        if (w && !e.target.closest('.term')) closeWin(w.dataset.id);
      }
    });

    tickClock();
    setInterval(tickClock, 15000);
    mq.addEventListener && mq.addEventListener('change', function () {
      Object.keys(wins).forEach(function (id) { clampWin(wins[id].el); });
    });
  }

  function selectIcon(b) {
    iconsEl.querySelectorAll('.icon.selected').forEach(function (n) { n.classList.remove('selected'); });
    if (b) b.classList.add('selected');
  }

  function toggleStart(force) {
    var open = force != null ? force : startMenu.hidden;
    startMenu.hidden = !open;
    startBtn.setAttribute('aria-expanded', String(open));
    if (open) { var first = startMenu.querySelector('button'); first && first.focus(); }
  }

  function tickClock() {
    var t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.querySelectorAll('[data-clock="time"]').forEach(function (n) { n.textContent = t; });
  }

  /* ------------------------------------------------------------------ */
  /* Windows                                                             */
  /* ------------------------------------------------------------------ */
  function openApp(id) {
    var app = apps[id];
    if (!app) return null;
    if (wins[id]) { restore(id); return wins[id].el; }
    var body;
    if (app.build) body = app.build(app);
    else {
      body = app.section.querySelector('.app-body').cloneNode(true);
      enhanceContent(body);
    }
    return createWin(id, app.title, app.icon, body, app.w, app.h, app.flush);
  }

  function openProject(slug) {
    var p = projects.filter(function (x) { return x.slug === slug; })[0];
    if (!p) return;
    var id = 'project:' + slug;
    if (wins[id]) { restore(id); return; }
    var wrap = el('div', { class: 'project-window' });
    var clone = p.el.cloneNode(true);
    clone.removeAttribute('id');
    var img = clone.querySelector('img');
    img.loading = 'eager';
    wrap.appendChild(clone);
    createWin(id, p.title.toLowerCase().replace(/\s+/g, '-') + '.app', 'folder', wrap, 780, 520, true);
  }

  function createWin(id, title, icon, body, w, h, flush) {
    var win = el('section', { class: 'win', role: 'dialog', 'aria-label': title, tabindex: '-1', 'data-id': id });
    var bar = el('div', { class: 'titlebar' });
    bar.innerHTML =
      '<button class="win-back" type="button" data-act="close" aria-label="Back to home">‹ Home</button>' +
      '<h2>' + escapeHtml(title) + '</h2>' +
      '<div class="win-btns">' +
      '<button type="button" data-act="min" aria-label="Minimize">' + ICONS.min + '</button>' +
      '<button type="button" data-act="max" aria-label="Maximize">' + ICONS.max + '</button>' +
      '<button type="button" data-act="close" aria-label="Close">' + ICONS.close + '</button></div>';
    var content = el('div', { class: 'win-body' + (flush ? ' flush' : '') });
    content.appendChild(body);
    win.appendChild(bar);
    win.appendChild(content);

    // Size + cascade position
    var dw = desktop.clientWidth, dh = desktop.clientHeight;
    w = Math.min(w, dw - 40); h = Math.min(h, dh - 40);
    var off = (cascade++ % 8) * 28;
    var left = Math.max(16, Math.min(dw - w - 16, Math.round((dw - w) / 2) - 60 + off));
    var top = Math.max(16, Math.min(dh - h - 16, Math.round((dh - h) / 2.6) + off));
    win.style.cssText = 'width:' + w + 'px;height:' + h + 'px;left:' + left + 'px;top:' + top + 'px';

    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.act === 'close') closeWin(id);
      if (b.dataset.act === 'min') minimize(id);
      if (b.dataset.act === 'max') toggleMax(id);
    });
    bar.addEventListener('dblclick', function (e) { if (!e.target.closest('button')) toggleMax(id); });
    win.addEventListener('pointerdown', function () { focusWin(id); }, true);
    win.addEventListener('focusin', function () { focusWin(id); });
    makeDraggable(win, bar);

    var task = el('button', { class: 'task', type: 'button', title: title }, ICONS[icon] + '<span>' + escapeHtml(title) + '</span>');
    task.addEventListener('click', function () {
      var rec = wins[id];
      if (rec.el.hidden) restore(id);
      else if (rec.el.classList.contains('active')) minimize(id);
      else focusWin(id);
    });
    tasksEl.appendChild(task);

    wins[id] = { el: win, task: task };
    desktop.appendChild(win);
    focusWin(id);
    win.focus({ preventScroll: true });
    updateHash(id);
    return win;
  }

  function focusWin(id) {
    var rec = wins[id];
    if (!rec) return;
    if (!rec.el.classList.contains('active')) {
      Object.keys(wins).forEach(function (k) {
        wins[k].el.classList.remove('active');
        wins[k].task.classList.remove('active');
      });
      rec.el.classList.add('active');
      rec.task.classList.add('active');
    }
    if (+rec.el.style.zIndex !== z) rec.el.style.zIndex = ++z;
  }

  function topWindow() {
    var best = null, bz = -1;
    Object.keys(wins).forEach(function (k) {
      var w = wins[k].el;
      if (!w.hidden && +w.style.zIndex > bz) { bz = +w.style.zIndex; best = k; }
    });
    return best;
  }

  function closeWin(id) {
    var rec = wins[id];
    if (!rec) return;
    delete wins[id];
    rec.task.remove();
    rec.el.classList.add('closing');
    setTimeout(function () { rec.el.remove(); }, 120);
    var next = topWindow();
    if (next) { focusWin(next); wins[next].el.focus({ preventScroll: true }); }
    updateHash(next);
  }

  function minimize(id) {
    var rec = wins[id];
    rec.el.hidden = true;
    rec.el.classList.remove('active');
    rec.task.classList.remove('active');
    rec.task.classList.add('min');
    var next = topWindow();
    if (next) focusWin(next);
  }

  function restore(id) {
    var rec = wins[id];
    rec.el.hidden = false;
    rec.task.classList.remove('min');
    focusWin(id);
    rec.el.focus({ preventScroll: true });
    updateHash(id);
  }

  function toggleMax(id) {
    var w = wins[id].el;
    w.classList.toggle('max');
    w.querySelector('[data-act="max"]').setAttribute('aria-label', w.classList.contains('max') ? 'Restore' : 'Maximize');
  }

  function clampWin(w) {
    var dw = desktop.clientWidth, dh = desktop.clientHeight;
    var x = Math.min(Math.max(w.offsetLeft, 60 - w.offsetWidth), dw - 60);
    var y = Math.min(Math.max(w.offsetTop, 0), dh - 38);
    w.style.left = x + 'px'; w.style.top = y + 'px';
  }

  function makeDraggable(win, handle) {
    var sx, sy, ox, oy, dragging = false;
    handle.addEventListener('pointerdown', function (e) {
      if (isPhone() || e.button !== 0 || e.target.closest('button') || win.classList.contains('max')) return;
      dragging = true;
      sx = e.clientX; sy = e.clientY; ox = win.offsetLeft; oy = win.offsetTop;
      handle.setPointerCapture(e.pointerId);
      win.classList.add('dragging');
    });
    handle.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      win.style.left = (ox + e.clientX - sx) + 'px';
      win.style.top = (oy + e.clientY - sy) + 'px';
    });
    var end = function () {
      if (!dragging) return;
      dragging = false;
      win.classList.remove('dragging');
      clampWin(win);
    };
    handle.addEventListener('pointerup', end);
    handle.addEventListener('pointercancel', end);
  }

  function updateHash(id) {
    var h = !id ? '' : id.indexOf('project:') === 0 ? '#project-' + id.slice(8) : '#' + id;
    try { history.replaceState(null, '', location.pathname + location.search + h); } catch (e) {}
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ------------------------------------------------------------------ */
  /* Projects folder                                                     */
  /* ------------------------------------------------------------------ */
  function buildExplorer() {
    var wrap = el('div');
    var bar = el('div', { class: 'explorer-bar' },
      '<span>~/projects · <b data-count>' + projects.length + '</b> items · <span class="star">★</span> featured</span>' +
      '<label class="sr-only" for="proj-filter">Filter projects</label>' +
      '<input id="proj-filter" type="search" placeholder="Filter: go, ai, react…" autocomplete="off">');
    var grid = el('div', { class: 'explorer-grid', role: 'list' });
    var sorted = projects.slice().sort(function (a, b) { return b.featured - a.featured; });
    sorted.forEach(function (p) {
      var f = el('button', { class: 'file', type: 'button', role: 'listitem', 'data-slug': p.slug, 'aria-label': 'Open ' + p.title + ': ' + p.desc });
      f.innerHTML = '<img src="' + p.thumb + '" alt="" width="256" height="256" loading="lazy" decoding="async">' +
        '<b>' + (p.featured ? '<span class="star" aria-hidden="true">★ </span>' : '') + escapeHtml(p.title) + '</b>' +
        '<small>' + escapeHtml(p.meta) + ' · ' + p.year + '</small>';
      f.addEventListener('click', function () { openProject(p.slug); });
      grid.appendChild(f);
    });
    var empty = el('p', { class: 'explorer-empty', hidden: '' }, 'No matching projects.');
    bar.querySelector('input').addEventListener('input', function (e) {
      var q = e.target.value.trim().toLowerCase(), n = 0;
      grid.querySelectorAll('.file').forEach(function (f) {
        var p = projects.filter(function (x) { return x.slug === f.dataset.slug; })[0];
        var hay = (p.title + ' ' + p.meta + ' ' + p.desc + ' ' + p.tags.join(' ')).toLowerCase();
        var show = !q || hay.indexOf(q) !== -1;
        f.hidden = !show; if (show) n++;
      });
      bar.querySelector('[data-count]').textContent = n;
      empty.hidden = n !== 0;
    });
    wrap.appendChild(bar); wrap.appendChild(grid); wrap.appendChild(empty);
    return wrap;
  }

  /* ------------------------------------------------------------------ */
  /* Settings                                                            */
  /* ------------------------------------------------------------------ */
  function setTheme(v) {
    if (v === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', v);
    store.set('nyos.theme', v);
    document.querySelectorAll('input[name="theme"]').forEach(function (i) { i.checked = i.value === v; });
  }

  function buildSettings() {
    var theme = store.get('nyos.theme') || 'dark';
    var wall = root.getAttribute('data-wall') || 'grid';
    var seg = function (name, opts, cur) {
      return '<div class="seg">' + opts.map(function (o) {
        return '<label><input type="radio" name="' + name + '" value="' + o.toLowerCase() + '"' + (o.toLowerCase() === cur ? ' checked' : '') + '><span>' + o + '</span></label>';
      }).join('') + '</div>';
    };
    var wrap = el('form', { class: 'settings' },
      '<fieldset><legend>Theme</legend>' + seg('theme', ['Dark', 'Light', 'System'], theme) + '</fieldset>' +
      '<fieldset><legend>Wallpaper</legend>' + seg('wall', ['Grid', 'Blueprint', 'Hazard', 'Plain'], wall) + '</fieldset>' +
      '<fieldset><legend>System</legend><div class="row">' +
      '<button class="btn" type="button" data-act="reboot">Replay boot</button>' +
      '<a class="btn" href="?classic">Classic view</a></div>' +
      '<p class="muted small" style="margin:12px 0 0">NyunjaOS 1.0 — hand-written HTML, CSS &amp; vanilla JS. No frameworks were harmed.</p></fieldset>');
    wrap.addEventListener('change', function (e) {
      if (e.target.name === 'theme') setTheme(e.target.value);
      if (e.target.name === 'wall') { root.setAttribute('data-wall', e.target.value); store.set('nyos.wall', e.target.value); }
    });
    wrap.addEventListener('submit', function (e) { e.preventDefault(); });
    wrap.querySelector('[data-act="reboot"]').addEventListener('click', function () { runBootScreen(function () {}); });
    return wrap;
  }

  // Leaving classic view via "?os" clears a saved classic preference; entering saves it.
  (function rememberView() {
    var p = new URLSearchParams(location.search);
    if (p.has('classic')) store.set('nyos.view', 'classic');
    if (p.has('os')) store.del('nyos.view');
  })();

  /* ------------------------------------------------------------------ */
  /* Terminal                                                            */
  /* ------------------------------------------------------------------ */
  function buildTerminal() {
    var term = el('div', { class: 'term' });
    var out = el('div', { 'aria-live': 'polite' });
    var line = el('label', { class: 'term-line' },
      '<span class="term-prompt">guest@nyunja:~$</span><input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Terminal command">');
    var input = line.querySelector('input');
    term.appendChild(out); term.appendChild(line);
    var hist = [], hi = 0;

    function print(html, cls) {
      var p = el('pre', cls ? { class: cls } : null);
      p.innerHTML = html;
      out.appendChild(p);
    }
    function link(href, text) { return '<a href="' + href + '" target="_blank" rel="noopener noreferrer">' + (text || href) + '</a>'; }
    // The source sections are display:none, so innerText has no layout to
    // work with; rebuild line breaks from the block structure instead.
    function sectionText(id) {
      var c = apps[id].section.querySelector('.app-body').cloneNode(true);
      c.querySelectorAll('br').forEach(function (b) { b.replaceWith(' '); });
      c.querySelectorAll('dt').forEach(function (n) { n.append(': '); });
      c.querySelectorAll('h1,h2,h3,p,li,dd,time').forEach(function (n) { n.append('\n'); });
      return c.textContent.split('\n').map(function (l) { return l.replace(/\s+/g, ' ').trim(); })
        .filter(Boolean).join('\n');
    }
    function findProject(q) {
      q = (q || '').toLowerCase().replace(/[^a-z0-9.]/g, '');
      return projects.filter(function (p) {
        return p.slug === q || p.title.toLowerCase().replace(/[^a-z0-9.]/g, '') === q;
      })[0];
    }

    var FILES = { 'about.txt': 'about', 'skills.txt': 'skills', 'education.log': 'education', 'notes.md': 'notes', 'contact.txt': 'contact' };

    var cmds = {
      help: function () {
        print([
          '<span class="t-acc">NyunjaOS shell</span> — available commands',
          '',
          '  whoami              who is this guy',
          '  ls [projects]       list files or projects',
          '  cat &lt;file&gt;          print a file, e.g. <span class="t-acc">cat skills.txt</span>',
          '  open &lt;app|project&gt;  open a window, e.g. <span class="t-acc">open rentbase</span>',
          '  projects            list projects (same as ls projects)',
          '  stack &lt;tech&gt;        projects using a technology, e.g. <span class="t-acc">stack go</span>',
          '  contact             ways to reach me',
          '  resume              open Resume.pdf',
          '  neofetch            system info',
          '  theme &lt;light|dark|system&gt;',
          '  clear · history · date · exit'
        ].join('\n'));
      },
      whoami: function () {
        print('<span class="t-acc">John Paul Nyunja</span> — full-stack software engineer\nGo · TypeScript · Next.js · PostgreSQL · Docker\nKisumu, Kenya · <span class="t-ok">available for work</span>');
      },
      ls: function (args) {
        if (args[0] && args[0].replace(/\/$/, '') === 'projects') return cmds.projects();
        print('<span class="t-acc">projects/</span>   about.txt   skills.txt   education.log   notes.md   contact.txt   resume.pdf');
      },
      projects: function () {
        print(projects.map(function (p) {
          var name = (p.slug + '                    ').slice(0, 20);
          return (p.featured ? '<span class="t-acc">★</span> ' : '  ') + name + '<span class="t-dim">' + escapeHtml(p.meta) + '</span>';
        }).join('\n') + '\n\n<span class="t-dim">open &lt;name&gt; to view one</span>');
      },
      cat: function (args) {
        var f = args[0];
        if (!f) return print('cat: missing file operand', 't-err');
        if (f === 'contact.txt') return cmds.contact();
        if (f === 'resume.pdf') return print('cat: resume.pdf: binary file — try <span class="t-acc">resume</span>');
        var p = f.indexOf('projects/') === 0 && findProject(f.slice(9));
        if (p) return print(escapeHtml(p.title + ' (' + p.year + ')\n' + p.desc + '\n[' + p.tags.join(', ') + ']'));
        if (!FILES[f]) return print('cat: ' + escapeHtml(f) + ': No such file or directory', 't-err');
        print(escapeHtml(sectionText(FILES[f])));
      },
      open: function (args) {
        var q = (args.join(' ') || '').toLowerCase();
        if (!q) return print('open: what should I open? try <span class="t-acc">open projects</span>', 't-err');
        var alias = { 'about.txt': 'about', 'skills.txt': 'skills', 'education.log': 'education', 'resume.pdf': 'resume', mail: 'contact', 'notes.md': 'notes', 'contact.txt': 'contact' };
        var id = alias[q] || q;
        if (apps[id]) { openApp(id); return print('opening ' + apps[id].title + '…', 't-dim'); }
        if (id === 'github' || id === 'linkedin') { window.open(id === 'github' ? GITHUB : LINKEDIN, '_blank', 'noopener'); return; }
        var p = findProject(q.replace(/^projects\//, ''));
        if (p) { openProject(p.slug); return print('opening ' + escapeHtml(p.title) + '…', 't-dim'); }
        print('open: ' + escapeHtml(q) + ': not found. try <span class="t-acc">ls projects</span>', 't-err');
      },
      stack: function (args) {
        var q = args.join(' ').toLowerCase();
        if (!q) return print('usage: stack &lt;tech&gt;   e.g. stack postgresql', 't-err');
        var hits = projects.filter(function (p) {
          return p.tags.some(function (t) { return t.toLowerCase() === q || t.toLowerCase().indexOf(q + ' ') === 0; });
        });
        print(hits.length
          ? hits.map(function (p) { return '  ' + p.slug; }).join('\n') + '\n<span class="t-dim">' + hits.length + ' project(s) use ' + escapeHtml(q) + '</span>'
          : 'no projects tagged ' + escapeHtml(q));
      },
      contact: function () {
        print('email     ' + link('mailto:' + EMAIL, EMAIL) + '\nphone     ' + link('tel:+254713588004', '+254 713 588004') +
          '\ngithub    ' + link(GITHUB, 'github.com/nyunja') + '\nlinkedin  ' + link(LINKEDIN, 'linkedin.com/in/nyunja'));
      },
      resume: function () { openApp('resume'); print('opening Resume.pdf…', 't-dim'); },
      neofetch: function () {
        var go = projects.filter(function (p) { return p.tags.indexOf('GO') !== -1; }).length;
        print([
          '<span class="t-acc">  ███╗   ██╗</span>   <span class="t-acc">guest</span>@<span class="t-acc">nyunja</span>',
          '<span class="t-acc">  ████╗  ██║</span>   ---------------',
          '<span class="t-acc">  ██╔██╗ ██║</span>   <span class="t-acc">OS</span>: NyunjaOS 1.0 (kisumu build)',
          '<span class="t-acc">  ██║╚██╗██║</span>   <span class="t-acc">Host</span>: nyunja.github.io',
          '<span class="t-acc">  ██║ ╚████║</span>   <span class="t-acc">Shell</span>: nysh 0.1',
          '<span class="t-acc">  ╚═╝  ╚═══╝</span>   <span class="t-acc">Projects</span>: ' + projects.length + ' (' + go + ' in Go)',
          '                <span class="t-acc">Languages</span>: Go, TypeScript, JavaScript, SQL, PHP',
          '                <span class="t-acc">Uptime</span>: coding since 2021',
          '                <span class="t-acc">Status</span>: <span class="t-ok">available for work</span>'
        ].join('\n'));
      },
      theme: function (args) {
        var v = args[0];
        if (['light', 'dark', 'system'].indexOf(v) === -1) return print('usage: theme light|dark|system', 't-err');
        setTheme(v); print('theme set to ' + v, 't-ok');
      },
      date: function () { print(new Date().toString()); },
      history: function () { print(hist.map(function (h, i) { return '  ' + (i + 1) + '  ' + escapeHtml(h); }).join('\n')); },
      clear: function () { out.innerHTML = ''; },
      exit: function () { closeWin('terminal'); },
      echo: function (args) { print(escapeHtml(args.join(' '))); },
      pwd: function () { print('/home/guest'); },
      cd: function () { print('cd: this shell is read-only. try <span class="t-acc">open projects</span>'); },
      sudo: function () { print('guest is not in the sudoers file. This incident will be reported to /dev/null.', 't-err'); },
      rm: function (args) {
        if (args.join(' ').indexOf('-rf') !== -1) return print('nice try. rm -rf / is disabled on portfolio hardware.', 't-err');
        print('rm: permission denied', 't-err');
      },
      go: function (args) {
        if (args[0] === 'version') return print('go version go1.23 nyunja/os-amd64');
        if (args[0] === 'run') return print('Hello, recruiter 👋\n<span class="t-dim">exit status 0 — now try</span> <span class="t-acc">open projects</span>');
        print('usage: go version | go run main.go');
      },
      vim: function () { print('you are now trapped in vim. just kidding — type <span class="t-acc">help</span>.'); }
    };
    cmds.dir = cmds.ls; cmds.man = cmds.help; cmds['?'] = cmds.help; cmds.emacs = cmds.vim; cmds.nano = cmds.vim;

    function run(raw) {
      var line = raw.trim();
      print('<span class="term-prompt">guest@nyunja:~$</span> ' + escapeHtml(line));
      if (!line) return;
      hist.push(line); hi = hist.length;
      var parts = line.split(/\s+/), name = parts[0].toLowerCase();
      if (cmds[name]) cmds[name](parts.slice(1));
      else print(escapeHtml(name) + ': command not found. type <span class="t-acc">help</span>', 't-err');
    }

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { run(input.value); input.value = ''; term.scrollTop = term.scrollHeight; }
      else if (e.key === 'ArrowUp') { if (hi > 0) { input.value = hist[--hi]; } e.preventDefault(); }
      else if (e.key === 'ArrowDown') { hi = Math.min(hist.length, hi + 1); input.value = hist[hi] || ''; e.preventDefault(); }
      else if (e.key === 'Tab') {
        e.preventDefault();
        var v = input.value, sp = v.lastIndexOf(' ');
        var head = v.slice(0, sp + 1), word = v.slice(sp + 1).toLowerCase();
        var pool = sp === -1 ? Object.keys(cmds)
          : Object.keys(FILES).concat(['resume.pdf', 'projects'], Object.keys(apps), projects.map(function (p) { return p.slug; }));
        var m = pool.filter(function (c) { return c.indexOf(word) === 0; });
        if (m.length === 1) input.value = head + m[0] + (sp === -1 ? ' ' : '');
        else if (m.length > 1) print(m.join('  '), 't-dim');
      } else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); cmds.clear(); }
      else if (e.key === 'Escape') { closeWin('terminal'); }
    });
    term.addEventListener('click', function () { if (!window.getSelection().toString()) input.focus(); });

    print('NyunjaOS 1.0 — nysh 0.1\nType <span class="t-acc">help</span> to see commands, or try <span class="t-acc">whoami</span>, <span class="t-acc">ls projects</span>, <span class="t-acc">cat skills.txt</span>.\n', 't-dim');
    setTimeout(function () { input.focus(); }, 30);
    return term;
  }

  /* ------------------------------------------------------------------ */
  /* Boot + shutdown                                                     */
  /* ------------------------------------------------------------------ */
  function runBootScreen(done) {
    session.set('nyos.booted', '1');
    var screen = el('div', { class: 'boot', role: 'status', 'aria-label': 'Starting NyunjaOS' });
    screen.innerHTML = '<div class="boot-logo">NYUNJA<span>/</span>OS</div><pre></pre><div class="boot-bar"><i></i></div><div class="boot-skip">press any key or click to skip</div>';
    document.body.appendChild(screen);
    var lines = ['[ ok ] mounting /projects (' + projects.length + ' items)', '[ ok ] starting go runtime', '[ ok ] connecting postgres://localhost', '[ ok ] loading desktop'];
    var pre = screen.querySelector('pre'), i = 0, finished = false;
    var iv = setInterval(function () {
      if (i < lines.length) pre.textContent += lines[i++] + '\n';
    }, 260);
    function finish() {
      if (finished) return;
      finished = true;
      clearInterval(iv); clearTimeout(t);
      document.removeEventListener('keydown', finish);
      screen.classList.add('fade');
      setTimeout(function () { screen.remove(); }, 260);
      done();
    }
    var t = setTimeout(finish, 1400);
    screen.addEventListener('pointerdown', finish);
    document.addEventListener('keydown', finish);
  }

  function shutdown() {
    Object.keys(wins).forEach(closeWin);
    var s = el('div', { class: 'shutdown', role: 'button', tabindex: '0', 'aria-label': 'Restart NyunjaOS' },
      '<div>It is now safe to close this tab.<small>…or click anywhere to start again</small></div>');
    document.body.appendChild(s);
    s.focus();
    var restart = function () {
      s.remove();
      runBootScreen(function () { openApp('about'); });
    };
    s.addEventListener('click', restart);
    // Defer so the same keypress doesn't also skip the boot screen it starts
    s.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTimeout(restart); } });
  }

  /* Entry point — last, so every declaration above is initialised */
  onReady(function () {
    if (!root.classList.contains('os')) { enhanceContent(document); return; }
    boot();
  });
})();
