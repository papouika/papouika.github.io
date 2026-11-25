// Offres qui se terminent entre deux mises à jour : on les retire de la liste
// et on les montre dans « Bons plans terminés » dès leur date de fin.
(function () {
  "use strict";
  var today = new Date().toISOString().slice(0, 10);
  var moved = 0;
  document.querySelectorAll(".card[data-fin]").forEach(function (c) {
    if (c.dataset.fin && c.dataset.fin < today) { c.remove(); }
  });
  document.querySelectorAll(".archives li[data-from]").forEach(function (li) {
    if (li.dataset.from < today) { li.hidden = false; moved++; }
  });
  var n = document.querySelector(".archives .n");
  if (n && moved) n.textContent = String(parseInt(n.textContent, 10) + moved);
  document.querySelectorAll("section.video").forEach(function (s) {
    if (!s.querySelector(".card")) s.remove();
  });

  // Menu des catégories (visible à partir de 2 catégories).
  var nav = document.querySelector("nav.cats");
  if (!nav) return;
  nav.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    nav.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    var c = b.dataset.cat;
    document.querySelectorAll(".card").forEach(function (el) { el.hidden = c !== "*" && el.dataset.cat !== c; });
    document.querySelectorAll("section.video").forEach(function (s) {
      s.hidden = !Array.prototype.some.call(s.querySelectorAll(".card"), function (el) { return !el.hidden; });
    });
  });
})();
