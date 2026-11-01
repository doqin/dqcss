/* Optional: arrow-key navigation and selection for .dq-menu. The CSS works without it. */
(function () {
  var ITEM = ".dq-menu__item:not([aria-disabled='true'])";

  function init(menu) {
    var items = function () { return Array.prototype.slice.call(menu.querySelectorAll(ITEM)); };

    // roving tabindex: only one item is a tab stop
    function setStop(target) {
      items().forEach(function (el) { el.tabIndex = el === target ? 0 : -1; });
    }
    function select(item) {
      menu.querySelectorAll(".dq-menu__item").forEach(function (el) {
        el.removeAttribute("aria-selected");
      });
      item.setAttribute("aria-selected", "true");
      setStop(item);
      menu.dispatchEvent(new CustomEvent("dq-select", { detail: { item: item }, bubbles: true }));
    }

    setStop(menu.querySelector("[aria-selected='true']") || items()[0]);

    menu.addEventListener("click", function (e) {
      var item = e.target.closest(ITEM);
      if (item && menu.contains(item)) select(item);
    });

    menu.addEventListener("keydown", function (e) {
      var list = items();
      var i = list.indexOf(document.activeElement);
      if (i < 0) return;
      var next = {
        ArrowDown: list[(i + 1) % list.length],
        ArrowUp: list[(i - 1 + list.length) % list.length],
        Home: list[0],
        End: list[list.length - 1]
      }[e.key];
      if (next) {
        e.preventDefault();
        setStop(next);
        next.focus();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        select(list[i]);
      }
    });
  }

  function start() {
    document.querySelectorAll(".dq-menu").forEach(init);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
