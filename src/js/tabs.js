/* Optional: makes .dq-tabs work (select on click, arrow keys, Home/End). The CSS only styles. */
(function () {
  function init(root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll("[role='tab']:not(:disabled)"));
    if (!tabs.length) return;

    function panelOf(tab) {
      return document.getElementById(tab.getAttribute("aria-controls"));
    }
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var panel = panelOf(t);
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
      root.dispatchEvent(new CustomEvent("dq-tab-select", { detail: { tab: tab }, bubbles: true }));
    }

    var initial = tabs.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0] || tabs[0];
    tabs.forEach(function (t) {
      var on = t === initial;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      var panel = panelOf(t);
      if (panel) panel.hidden = !on;
    });

    root.addEventListener("click", function (e) {
      var tab = e.target.closest("[role='tab']");
      if (tab && tabs.indexOf(tab) >= 0) select(tab, false);
    });

    root.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var next = {
        ArrowRight: tabs[(i + 1) % tabs.length],
        ArrowLeft: tabs[(i - 1 + tabs.length) % tabs.length],
        Home: tabs[0],
        End: tabs[tabs.length - 1]
      }[e.key];
      if (next) {
        e.preventDefault();
        select(next, true);
      }
    });
  }

  function start() {
    document.querySelectorAll(".dq-tabs").forEach(init);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
