(function () {
  var CLIENT = "";
  var slots = document.querySelectorAll(".ad-slot");
  if (!CLIENT) {
    slots.forEach(function (el) { el.style.display = "none"; });
    return;
  }
  slots.forEach(function (el) {
    el.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-' + CLIENT + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
  });
  var s = document.createElement("script");
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-" + CLIENT;
  s.onload = function () {
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  };
  document.head.appendChild(s);
})();
