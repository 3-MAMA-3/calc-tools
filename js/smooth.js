(function () {
  "use strict";
  if (typeof Lenis === "undefined") return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var lenis = null;
  var dead = false;
  var errors = 0;
  var lastRaf = 0;
  var rafId = null;
  var idleTimer = null;
  var anchorBusy = false;

  function wake() {
    if (dead || !lenis) return;
    if (lenis.isStopped) {
      try { lenis.start(); } catch (e) {}
    }
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      if (dead || anchorBusy) return;
      try { lenis.stop(); } catch (e) {}
    }, 120);
  }
  window.addEventListener("wheel", wake, { passive: true, capture: true });

  lenis = new Lenis({
    lerp: 0.18,
    smoothWheel: true,
    wheelMultiplier: 1.1,
    touchMultiplier: 1.6
  });

  function kill() {
    if (dead) return;
    dead = true;
    try { lenis.destroy(); } catch (e) {}
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = null;
    clearInterval(watchdog);
    document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-stopped");
  }

  function raf(time) {
    lastRaf = time;
    try {
      lenis.raf(time);
    } catch (e) {
      if (++errors > 3) { kill(); return; }
    }
    if (!dead) rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  var watchdog = setInterval(function () {
    if (dead || rafId === null) return;
    if (performance.now() - lastRaf > 2000) kill();
  }, 1500);

  document.addEventListener("click", function (e) {
    var t = e.target;
    while (t && !(t.getAttribute && t.getAttribute("href") && t.getAttribute("href").charAt(0) === "#")) t = t.parentNode;
    if (t && t.getAttribute("href") && t.getAttribute("href").length > 1) {
      e.preventDefault();
      if (!dead) {
        if (lenis.isStopped) {
          try { lenis.start(); } catch (err) {}
        }
        anchorBusy = true;
        try { lenis.scrollTo(t.getAttribute("href"), { offset: -80, duration: 0.4 }); } catch (err) {}
        setTimeout(function () { anchorBusy = false; }, 600);
      } else {
        var target = document.querySelector(t.getAttribute("href"));
        if (target) window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - 80);
      }
    }
  });
})();
