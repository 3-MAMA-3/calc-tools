(function () {
  "use strict";
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;

  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}

  function systemDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function isDark() {
    return stored ? stored === "dark" : systemDark();
  }

  function sync() {
    root.classList.toggle("dark", isDark());
    btn.setAttribute("aria-pressed", isDark() ? "true" : "false");
  }

  btn.addEventListener("click", function () {
    var dark = !isDark();
    stored = dark ? "dark" : "light";
    try { localStorage.setItem("theme", stored); } catch (e) {}
    if (!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
      root.classList.add("theme-fade");
      setTimeout(function () { root.classList.remove("theme-fade"); }, 520);
    }
    sync();
  });

  sync();
})();
