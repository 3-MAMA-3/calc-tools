(function () {
  "use strict";
  var C = window.CALC;
  if (!C) return;

  var form = document.getElementById("calc-form");
  var resultsEl = document.getElementById("results");
  var shareEl = document.getElementById("share-url");
  var T = window.I18N || null;

  var UNIT_FACTORS = {
    "ft": 0.3048, "in": 2.54, "inches": 2.54, "inch": 2.54, "sq ft": 0.09290304, "sq yd": 0.83612736,
    "cu ft": 0.0283168466, "cu yd": 0.764554858, "linear ft": 0.3048,
    "bd ft": 0.002359737, "gallons": 3.78541178, "lb": 0.45359237,
    "tons": 0.90718474, "sq ft per box": 0.09290304, "sq ft/gal": 0.0245424,
    "$": 1
  };
  var UNIT_LABELS = {
    "ft": "m", "in": "cm", "inches": "cm", "inch": "cm", "sq ft": "m²", "sq yd": "m²",
    "cu ft": "m³", "cu yd": "m³", "linear ft": "m", "bd ft": "m³",
    "gallons": "L", "lb": "kg", "tons": "t", "sq ft per box": "m² per box",
    "sq ft/gal": "m²/L", "$": "$"
  };
  var NUM_UNIT_RE = /(\d+(?:\.\d+)?)\s*(sq ft\/gal|sq ft per box|sq ft|sq yd|cu ft|cu yd|linear ft|bd ft|gallons|lb|tons|inches|inch|ft|quart)\b/g;
  var NOTE_SWAPS = { "nearest quart": "nearest litre", "nearest half gallon": "nearest 2 L" };
  var LABEL_SWAPS = { "Bricks per sq ft": "Bricks per m²" };
  var OPTION_SWAPS = {
    "4x8x16 in block": "10x20x40 cm block",
    "6x8x16 in block": "15x20x40 cm block",
    "8x8x16 in block": "20x20x40 cm block"
  };
  var SAVE_KEY = "hc_saved";
  var saveTimer = null;

  function isMetric() {
    return window.HC_UNITS && window.HC_UNITS.get() === "metric";
  }
  function factorFor(u) {
    return u && UNIT_FACTORS[u] !== undefined ? UNIT_FACTORS[u] : 1;
  }
  function labelFor(u) {
    return isMetric() && UNIT_LABELS[u] ? UNIT_LABELS[u] : trUnit(u);
  }
  function round4(v) {
    return Math.round(v * 10000) / 10000;
  }
  function fmtLabel(v) {
    if (!isFinite(v)) return "–";
    if (v >= 100) return String(Math.round(v));
    if (v >= 10) return String(Math.round(v * 10) / 10);
    if (v >= 1) return String(Math.round(v * 100) / 100);
    return String(parseFloat(v.toPrecision(2)));
  }
  function fmtMetric(v) {
    if (!isFinite(v)) return "–";
    if (v >= 1000) return Math.round(v).toLocaleString("en-US");
    if (v >= 100) return (Math.round(v * 10) / 10).toLocaleString("en-US");
    if (v >= 1) return (Math.round(v * 100) / 100).toLocaleString("en-US");
    return String(parseFloat(v.toPrecision(2)));
  }
  function displayFmt(v) {
    return isMetric() ? fmtMetric(v) : fmt(v);
  }
  function convertText(s) {
    if (!isMetric() || !s) return s;
    var out = s;
    for (var p in OPTION_SWAPS) {
      if (out.indexOf(p) !== -1) out = out.split(p).join(OPTION_SWAPS[p]);
    }
    out = out.replace(NUM_UNIT_RE, function (m, num, u) {
      var n = parseFloat(num);
      var f, label;
      if (u === "quart") { f = 0.946352946; label = "L"; }
      else if (u === "cu ft" && n < 10) { f = 28.3168466; label = "L"; }
      else { f = UNIT_FACTORS[u] || 1; label = UNIT_LABELS[u] || u; }
      return fmtLabel(n * f) + " " + label;
    });
    for (var k in NOTE_SWAPS) {
      if (out.indexOf(k) !== -1) out = out.split(k).join(NOTE_SWAPS[k]);
    }
    for (var j in LABEL_SWAPS) {
      if (out.indexOf(j) !== -1) out = out.split(j).join(LABEL_SWAPS[j]);
    }
    return out;
  }
  function toUs(v, u) {
    if (v === null || v === undefined || v === "") return v;
    var n = parseFloat(v);
    if (!isFinite(n)) return v;
    var f = factorFor(u);
    return isMetric() ? n / f : n;
  }
  function fromUs(v, u) {
    if (v === null || v === undefined || v === "") return v;
    var n = parseFloat(v);
    if (!isFinite(n)) return v;
    var f = factorFor(u);
    return isMetric() ? n * f : n;
  }
  function numStr(v) {
    return typeof v === "number" && isFinite(v) ? round4(v) : v;
  }

  function pageSlug() {
    var m = window.location.pathname.match(/([^\/]+)\.html$/);
    return m ? m[1] : "page";
  }
  function loadSaved() {
    try {
      var all = JSON.parse(localStorage.getItem(SAVE_KEY) || "{}");
      return all[pageSlug()] || {};
    } catch (e) { return {}; }
  }
  function persistSaved() {
    var data = {};
    C.fields.forEach(function (f) {
      var v = readValue(f);
      data[f.name] = v === null || v === "" ? "" : numStr(toUs(v, f.unit));
    });
    var all = {};
    try {
      all = JSON.parse(localStorage.getItem(SAVE_KEY) || "{}");
    } catch (e) {}
    all[pageSlug()] = data;
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(all)); } catch (e) {}
  }
  function scheduleSave() {
    if (saveTimer !== null) clearTimeout(saveTimer);
    saveTimer = setTimeout(persistSaved, 400);
  }
  function restoreSaved() {
    var params = new URLSearchParams(window.location.search);
    var saved = loadSaved();
    C.fields.forEach(function (f) {
      var el = document.getElementById("f-" + f.name);
      if (!el || params.has(f.name)) return;
      var v = saved[f.name];
      if (v !== undefined && v !== null && v !== "") {
        el.value = numStr(fromUs(v, f.unit));
      }
    });
  }

  function tr(s, cat) { return T ? T.map(s, cat) : s; }
  function trUnit(s) { return T ? T.mapUnit(s) : s; }
  function trNote(s) { return T ? T.mapNote(s) : s; }

  function fmt(v) {
    if (!isFinite(v)) return "–";
    v = Math.round(v * 100) / 100;
    return v.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }

  var prevVals = {};

  function reduceMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function animateVal(el, from, to) {
    if (!isFinite(to)) {
      el.textContent = displayFmt(to);
      return;
    }
    if (reduceMotion() || from === to) {
      el.textContent = displayFmt(to);
      return;
    }
    var start = null;
    var dur = 900;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = displayFmt(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function setVal(span, idx, v) {
    var from = prevVals[idx];
    prevVals[idx] = v;
    animateVal(span, from !== undefined ? from : 0, v);
  }

  function readValue(f) {
    var el = document.getElementById("f-" + f.name);
    if (!el) return f.value;
    if (el.type === "number") return el.value === "" ? null : parseFloat(el.value);
    return el.value;
  }

  function applyParams() {
    var p = new URLSearchParams(window.location.search);
    C.fields.forEach(function (f) {
      var el = document.getElementById("f-" + f.name);
      if (el && p.has(f.name)) {
        el.value = numStr(fromUs(p.get(f.name), f.unit));
      }
    });
  }

  function buildShareUrl() {
    var p = new URLSearchParams();
    C.fields.forEach(function (f) {
      var v = readValue(f);
      if (v !== null && v !== "" && v !== f.value) p.set(f.name, numStr(toUs(v, f.unit)));
    });
    var q = p.toString();
    return window.location.origin + window.location.pathname + (q ? "?" + q : "");
  }

  function compute() {
    var inputs = {};
    C.fields.forEach(function (f) {
      inputs[f.name] = toUs(readValue(f), f.unit);
    });
    if (C.required && C.required.every(function (n) { return inputs[n] !== null && inputs[n] !== ""; })) {
      var out = C.compute(inputs);
      resultsEl.innerHTML = "";
      out.forEach(function (r, i) {
        var disp = isMetric() ? r.value * factorFor(r.unit) : r.value;
        var row = document.createElement("div");
        row.className = "result";
        row.innerHTML =
          '<div class="r-label">' + tr(convertText(r.label), "res") + '</div><div><span class="val">' + displayFmt(disp) +
          '</span><span class="unit-tag">' + labelFor(r.unit) + "</span>" +
          (r.note ? '<div class="note">' + trNote(convertText(r.note)) + "</div>" : "") + "</div>";
        setVal(row.querySelector(".val"), i, disp);
        resultsEl.appendChild(row);
      });
      resultsEl.classList.add("show");
      if (shareEl) shareEl.value = buildShareUrl();
    } else {
      resultsEl.classList.remove("show");
    }
  }

  function buildForm() {
    if (!form) return;
    form.innerHTML = "";
    C.fields.forEach(function (f) {
      var div = document.createElement("div");
      div.className = "field";
      var label = document.createElement("label");
      label.setAttribute("for", "f-" + f.name);
      label.innerHTML = tr(convertText(f.label), "fields") + (f.hint ? ' <span class="unit-hint">(' + tr(f.hint, "fields") + ")</span>" : "");
      var row = document.createElement("div");
      row.className = "input-row";
      var input;
      if (f.type === "select") {
        input = document.createElement("select");
        f.options.forEach(function (o) {
          var opt = document.createElement("option");
          opt.value = o.value;
          opt.textContent = tr(convertText(o.label), "opts");
          input.appendChild(opt);
        });
      } else {
        input = document.createElement("input");
        input.type = "number";
        input.step = f.step !== undefined ? numStr(fromUs(f.step, f.unit)) : "any";
        input.min = f.min !== undefined ? numStr(fromUs(f.min, f.unit)) : 0;
        input.max = f.max !== undefined ? numStr(fromUs(f.max, f.unit)) : 999999;
        if (f.value !== undefined) {
          var ph = fromUs(f.value, f.unit);
          ph = typeof ph === "number" && isFinite(ph) ? String(Math.round(ph * 10) / 10) : ph;
          input.placeholder = ((T && T.t("input.placeholder")) || "e.g.") + " " + ph;
        }
      }
      input.id = "f-" + f.name;
      input.addEventListener("input", function () { compute(); scheduleSave(); });
      input.addEventListener("change", function () { compute(); scheduleSave(); });
      row.appendChild(input);
      if (f.unit) {
        var u = document.createElement("span");
        u.className = "unit";
        u.textContent = labelFor(f.unit);
        row.appendChild(u);
      }
      div.appendChild(label);
      div.appendChild(row);
      form.appendChild(div);
    });
    if (C.required === undefined) {
      C.required = C.fields.map(function (f) { return f.name; });
    }
  }

  function rebuild(convertSaved) {
    var params = new URLSearchParams(window.location.search);
    var saved = {};
    C.fields.forEach(function (f) { saved[f.name] = readValue(f); });
    buildForm();
    C.fields.forEach(function (f) {
      var el = document.getElementById("f-" + f.name);
      if (!el) return;
      if (params.has(f.name)) {
        el.value = numStr(fromUs(params.get(f.name), f.unit));
      } else if (saved[f.name] !== null && saved[f.name] !== "" && saved[f.name] !== undefined) {
        var v = saved[f.name];
        if (convertSaved && f.type !== "select") {
          var fct = factorFor(f.unit);
          v = isMetric() ? parseFloat(v) * fct : parseFloat(v) / fct;
        }
        el.value = numStr(v);
      }
    });
    compute();
  }

  buildForm();
  applyParams();
  restoreSaved();
  compute();

  window.addEventListener("beforeunload", persistSaved);

  if (T) {
    document.addEventListener("i18n:changed", function () { rebuild(false); });
  }
  if (window.HC_UNITS) {
    document.addEventListener("units:changed", function () { rebuild(true); });
  }

  var copyTimer = null;
  var COPY_TRANS = "opacity 0.3s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1)";
  function setCopyState(t, copied) {
    t.classList.toggle("copied", copied);
    var orig = t.querySelector("span[data-i18n]");
    var alt = t.querySelector(".alt");
    if (!orig || !alt) return;
    var trans = document.hidden ? "none" : COPY_TRANS;
    orig.style.transition = trans;
    orig.style.opacity = copied ? "0" : "1";
    orig.style.transform = copied ? "translateY(-10px)" : "none";
    alt.style.transition = trans;
    alt.style.opacity = copied ? "1" : "0";
    alt.style.transform = copied ? "translateY(0)" : "translateY(10px)";
  }
  document.addEventListener("click", function (e) {
    var t = e.target;
    while (t && !(t.classList && t.classList.contains("copy-url"))) t = t.parentNode;
    if (t && shareEl) {
      shareEl.select();
      document.execCommand("copy");
      var copiedTxt = (T ? T.t("share.copied") : "Copied!").replace(/^[!¡]+|[!¡]+$/g, "");
      var alt = t.querySelector(".alt");
      if (alt) alt.textContent = copiedTxt;
      setCopyState(t, true);
      if (copyTimer !== null) clearTimeout(copyTimer);
      copyTimer = setTimeout(function () { setCopyState(t, false); }, 3000);
    }
  });
})();
