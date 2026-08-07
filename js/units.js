(function () {
  "use strict";
  var LS_KEY = "hc_units";
  var SUPPORTED = ["us", "metric"];
  var current = "us";

  function detect() {
    var saved = null;
    try { saved = localStorage.getItem(LS_KEY); } catch (e) {}
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    return "us";
  }

  function set(system, persist) {
    if (SUPPORTED.indexOf(system) === -1) system = "us";
    var changed = system !== current;
    current = system;
    if (persist) {
      try { localStorage.setItem(LS_KEY, system); } catch (e) {}
    }
    var sel = document.getElementById("unit-select");
    if (sel && sel.value !== system) sel.value = system;
    if (changed) {
      document.dispatchEvent(new CustomEvent("units:changed", { detail: { system: system } }));
    }
  }

  function labelFor(key) {
    return window.I18N && window.I18N.t ? window.I18N.t(key) : key;
  }

  function buildDropdown() {
    var el = document.getElementById("unit-select");
    if (!el) return;
    var items = [["us", "units.us"], ["metric", "units.metric"]];
    for (var i = 0; i < items.length; i++) {
      var o = document.createElement("option");
      o.value = items[i][0];
      o.setAttribute("data-u", items[i][1]);
      el.appendChild(o);
    }
    function refresh() {
      var opts = el.querySelectorAll("option");
      for (var j = 0; j < opts.length; j++) {
        opts[j].textContent = labelFor(opts[j].getAttribute("data-u"));
      }
    }
    refresh();
    el.value = current;
    el.addEventListener("change", function () { set(el.value, true); });
    document.addEventListener("i18n:changed", refresh);
  }

  window.HC_UNITS = {
    get: function () { return current; },
    set: set,
    SUPPORTED: SUPPORTED
  };

  current = detect();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildDropdown);
  } else {
    buildDropdown();
  }
})();
