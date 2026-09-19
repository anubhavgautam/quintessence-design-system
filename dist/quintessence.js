/*! Quintessence Design System 1.1.0 — theme + reveal runtime
 *  Load it in <head>, before the stylesheet paints, without defer/async:
 *  <script src="quintessence.js"></script>
 *
 *  What it does, in order:
 *   1. Stamps <html data-theme="light|dark"> before first paint. A saved
 *      choice wins; otherwise the hour decides (18:00–05:59 is dark).
 *   2. Adds html.qs-js so [data-reveal] elements may start hidden.
 *   3. Binds every [data-theme-toggle] as a switch (aria-pressed = dark).
 *   4. Reveals [data-reveal] elements as they enter the viewport.
 *  Everything is exposed on window.Quintessence for your own scripts.
 */
(function () {
  var root = document.documentElement;
  var KEY = 'theme';

  function saved() {
    try { var s = localStorage.getItem(KEY); return s === 'dark' || s === 'light' ? s : null; }
    catch (e) { return null; }
  }
  function byClock() {
    var h = new Date().getHours();
    return h >= 18 || h < 6 ? 'dark' : 'light';
  }
  function resolve() { return saved() || byClock(); }
  function get() { return root.dataset.theme === 'dark' ? 'dark' : 'light'; }
  function apply(theme) {
    root.dataset.theme = theme;
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(theme === 'dark'));
    });
  }
  function set(theme) {
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    apply(theme);
  }
  function toggle() { set(get() === 'dark' ? 'light' : 'dark'); }

  // 1 + 2 — pre-paint. Runs synchronously while <head> is parsing.
  root.dataset.theme = resolve();
  root.classList.add('qs-js');

  // 3 + 4 — once the DOM exists.
  function bind() {
    apply(get());
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      if (b.__qs) return;
      b.__qs = true;
      b.addEventListener('click', toggle);
    });
    reveal();
  }
  var observer;
  function reveal() {
    var els = document.querySelectorAll('[data-reveal]:not(.is-in)');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('is-in'); }); return; }
    observer = observer || new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); observer.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach(function (el) { observer.observe(el); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
  // Astro / Turbo / any client router: call again after a swap.
  document.addEventListener('astro:page-load', bind);

  window.Quintessence = {
    version: '1.1.0',
    theme: { get: get, set: set, toggle: toggle, resolve: resolve, apply: apply },
    reveal: reveal,
    bind: bind
  };
})();
