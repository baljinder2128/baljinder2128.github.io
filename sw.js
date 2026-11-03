// Kickoff Docs offline cache. Bump VERSION whenever you change any file.
const VERSION = "kickoff-docs-v2";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "fonts/barlow-latin-400-normal.woff2",
  "fonts/barlow-latin-500-normal.woff2",
  "fonts/barlow-latin-600-normal.woff2",
  "fonts/ibm-plex-mono-latin-500-normal.woff2",
  "fonts/saira-condensed-latin-600-normal.woff2",
  "fonts/saira-condensed-latin-800-normal.woff2",
  "icons/apple-touch-icon.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon.svg",
  "icons/maskable-512.png",
  "libs/docx.umd.js",
  "libs/jspdf.umd.min.js",
  "libs/jszip.min.js",
  "libs/mammoth.browser.min.js",
  "libs/pdf.min.js",
  "libs/pdf.worker.min.js",
  "libs/pptxgen.bundle.js",
  "libs/three.min.js",
  "libs/xlsx.full.min.js",
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(hit => hit || fetch(e.request)));
});
