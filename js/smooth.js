(function () {
  "use strict";
  if (typeof Lenis === "undefined") return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.4
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  document.addEventListener("click", function (e) {
    var t = e.target;
    while (t && !(t.getAttribute && t.getAttribute("href") && t.getAttribute("href").charAt(0) === "#")) t = t.parentNode;
    if (t && t.getAttribute("href") && t.getAttribute("href").length > 1) {
      e.preventDefault();
      lenis.scrollTo(t.getAttribute("href"), { offset: -80, duration: 0.9 });
    }
  });
})();
