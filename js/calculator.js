(function () {
  "use strict";
  var C = window.CALC;
  if (!C) return;

  var form = document.getElementById("calc-form");
  var resultsEl = document.getElementById("results");
  var shareEl = document.getElementById("share-url");

  function fmt(v) {
    if (!isFinite(v)) return "–";
    v = Math.round(v * 100) / 100;
    return v.toLocaleString("en-US", { maximumFractionDigits: 2 });
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
        el.value = p.get(f.name);
      }
    });
  }

  function buildShareUrl() {
    var p = new URLSearchParams();
    C.fields.forEach(function (f) {
      var v = readValue(f);
      if (v !== null && v !== "" && v !== f.value) p.set(f.name, v);
    });
    var q = p.toString();
    return window.location.origin + window.location.pathname + (q ? "?" + q : "");
  }

  function compute() {
    var inputs = {};
    C.fields.forEach(function (f) {
      inputs[f.name] = readValue(f);
    });
    if (C.required && C.required.every(function (n) { return inputs[n] !== null && inputs[n] !== ""; })) {
      var out = C.compute(inputs);
      resultsEl.innerHTML = "";
      out.forEach(function (r) {
        var row = document.createElement("div");
        row.className = "result";
        row.innerHTML =
          '<div class="r-label">' + r.label + '</div><div><span class="val">' + fmt(r.value) +
          '</span><span class="unit-tag">' + r.unit + "</span>" +
          (r.note ? '<div class="note">' + r.note + "</div>" : "") + "</div>";
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
    C.fields.forEach(function (f) {
      var div = document.createElement("div");
      div.className = "field";
      var label = document.createElement("label");
      label.setAttribute("for", "f-" + f.name);
      label.innerHTML = f.label + (f.hint ? ' <span class="unit-hint">(' + f.hint + ")</span>" : "");
      var row = document.createElement("div");
      row.className = "input-row";
      var input;
      if (f.type === "select") {
        input = document.createElement("select");
        f.options.forEach(function (o) {
          var opt = document.createElement("option");
          opt.value = o.value;
          opt.textContent = o.label;
          input.appendChild(opt);
        });
      } else {
        input = document.createElement("input");
        input.type = "number";
        input.step = f.step || "any";
        input.min = f.min !== undefined ? f.min : 0;
        input.max = f.max !== undefined ? f.max : 999999;
        input.value = f.value;
      }
      input.id = "f-" + f.name;
      input.addEventListener("input", compute);
      input.addEventListener("change", compute);
      row.appendChild(input);
      if (f.unit) {
        var u = document.createElement("span");
        u.className = "unit";
        u.textContent = f.unit;
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

  buildForm();
  applyParams();
  compute();

  document.addEventListener("click", function (e) {
    var t = e.target;
    while (t && !t.classList) t = t.parentNode;
    if (t && t.classList.contains("copy-url") && shareEl) {
      shareEl.select();
      document.execCommand("copy");
      t.textContent = "Copied!";
      setTimeout(function () { t.textContent = "Copy link"; }, 1500);
    }
  });
})();
