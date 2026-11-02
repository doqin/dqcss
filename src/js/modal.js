/* Optional: clicking the backdrop closes a .dq-modal. Add data-static to a modal to opt out.
   Esc and focus trapping already come from the native <dialog>. */
(function () {
  var pressedOutside = false;

  function outside(dialog, e) {
    var r = dialog.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  }
  function target(e) {
    var d = e.target;
    return d && d.matches && d.matches(".dq-modal[open]") && !d.hasAttribute("data-static") ? d : null;
  }

  // a drag that starts inside the modal and ends on the backdrop must not close it
  document.addEventListener("pointerdown", function (e) {
    var d = target(e);
    pressedOutside = !!d && outside(d, e);
  });
  document.addEventListener("click", function (e) {
    var d = target(e);
    if (d && pressedOutside && outside(d, e)) d.close();
    pressedOutside = false;
  });
})();
