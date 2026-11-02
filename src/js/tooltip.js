/* Optional: Esc dismisses a visible .dq-tooltip (WCAG 1.4.13). The tooltip returns when the pointer
   and focus have both left it and come back. The CSS tooltip works without this script. */
(function () {
  function visible() {
    return document.querySelectorAll(".dq-tooltip:hover, .dq-tooltip:focus-within");
  }

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    visible().forEach(function (tip) { tip.setAttribute("data-dismissed", ""); });
  });

  function reset(e) {
    var tip = e.target.closest && e.target.closest(".dq-tooltip");
    if (!tip || !tip.hasAttribute("data-dismissed")) return;
    // wait for hover/focus to settle, then re-arm only if neither is left
    setTimeout(function () {
      if (!tip.matches(":hover, :focus-within")) tip.removeAttribute("data-dismissed");
    }, 0);
  }
  document.addEventListener("mouseout", reset);
  document.addEventListener("focusout", reset);
})();
