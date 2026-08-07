(function () {
  "use strict";
  var LS_KEY = "hc_lang";
  var SUPPORTED = Object.keys(window.I18N_CORE.langs);
  var current = "en";
  var loaded = {};
  var attempts = {};
  var originals = new WeakMap();
  var FILE_VERSION = "3";
  var MAX_ATTEMPTS = 3;

  function detect() {
    var saved = null;
    try { saved = localStorage.getItem(LS_KEY); } catch (e) {}
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    return "en";
  }

  function content() {
    return window.I18N_CONTENT && window.I18N_CONTENT[current];
  }

  function resolve(key) {
    var chrome = window.I18N_CORE.chrome[current];
    if (chrome && key in chrome) return chrome[key];
    var c = content();
    if (c) {
      var parts = key.split(".");
      var node = c;
      for (var i = 0; node && i < parts.length; i++) node = node[parts[i]];
      if (typeof node === "string") return node;
    }
    return null;
  }

  function fragReplace(str, dict) {
    var keys = Object.keys(dict).sort(function (a, b) { return b.length - a.length; });
    var out = str;
    for (var i = 0; i < keys.length; i++) {
      if (typeof dict[keys[i]] === "string" && out.indexOf(keys[i]) !== -1) {
        out = out.split(keys[i]).join(dict[keys[i]]);
      }
    }
    return out;
  }

  function map(str, cat) {
    if (!str) return str;
    var c = content();
    if (c && c[cat] && typeof c[cat][str] === "string") return c[cat][str];
    if (c && c.notes) return fragReplace(str, c.notes);
    return str;
  }

  function mapUnit(str) {
    if (!str) return str;
    var c = content();
    if (c && c.units && typeof c.units[str] === "string") return c.units[str];
    return str;
  }

  function mapNote(str) {
    if (!str) return str;
    var c = content();
    if (!c || !c.notes) return str;
    if (typeof c.notes[str] === "string") return c.notes[str];
    return fragReplace(str, c.notes);
  }

  function captureOriginals() {
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      if (!originals.has(els[i])) originals.set(els[i], els[i].textContent);
    }
  }

  function apply() {
    document.documentElement.lang = current;
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var v = resolve(el.getAttribute("data-i18n"));
      if (v !== null) {
        if (v !== el.textContent) el.textContent = v;
      } else {
        var orig = originals.get(el);
        if (orig !== undefined && orig !== el.textContent) el.textContent = orig;
      }
    }
    var sel = document.getElementById("lang-select");
    if (sel && sel.value !== current) sel.value = current;
    document.dispatchEvent(new CustomEvent("i18n:changed", { detail: { lang: current } }));
  }

  function loadContent(lang, done) {
    if (lang === "en" || loaded[lang]) { done(); return; }
    if (!attempts[lang]) attempts[lang] = 0;
    if (attempts[lang] >= MAX_ATTEMPTS) {
      failoverToEn();
      done();
      return;
    }
    attempts[lang]++;
    var s = document.createElement("script");
    s.src = (window.I18N_BASE || "") + "js/i18n/" + lang + ".js?v=" + FILE_VERSION;
    s.onload = function () { loaded[lang] = true; done(); };
    s.onerror = function () {
      setTimeout(function () { loadContent(lang, done); }, 800);
    };
    document.head.appendChild(s);
  }

  function failoverToEn() {
    if (current === "en") return;
    current = "en";
    try { localStorage.removeItem(LS_KEY); } catch (e) {}
    apply();
  }

  function setLang(lang, persist) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "en";
    attempts[lang] = 0;
    current = lang;
    if (persist) {
      try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
    }
    loadContent(lang, apply);
  }

  function buildDropdown() {
    var el = document.getElementById("lang-select");
    if (!el) return;
    var langs = window.I18N_CORE.langs;
    Object.keys(langs).forEach(function (code) {
      var o = document.createElement("option");
      o.value = code;
      o.textContent = langs[code];
      el.appendChild(o);
    });
    el.value = current;
    el.addEventListener("change", function () { setLang(el.value, true); });
  }

  function init() {
    current = detect();
    buildDropdown();
    captureOriginals();
    loadContent(current, apply);
  }

  window.I18N = {
    current: function () { return current; },
    t: resolve,
    map: map,
    mapUnit: mapUnit,
    mapNote: mapNote,
    setLang: setLang
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
