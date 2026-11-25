// Offres terminées : passe une carte en gris dès que sa date de fin est passée.
(function () {
  "use strict";
  var today = new Date().toISOString().slice(0, 10);
  document.querySelectorAll(".card[data-fin]").forEach(function (c) {
    if (c.dataset.fin && c.dataset.fin < today) c.classList.add("end");
  });
  document.querySelectorAll("section.video").forEach(function (s) {
    var cards = s.querySelectorAll(".card");
    var fini = s.querySelector(".fini");
    if (fini && cards.length && Array.prototype.every.call(cards, function (c) { return c.classList.contains("end"); })) fini.hidden = false;
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
