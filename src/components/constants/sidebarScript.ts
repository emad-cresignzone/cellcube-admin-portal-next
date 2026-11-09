/**
 * Sets data-sidebar before first paint, the same way `themeScript` sets the
 * theme.
 *
 * The rail's open state lives in localStorage and depends on the viewport, so
 * the server cannot render it. Without this stamp the markup paints open and
 * the provider corrects it after mount — visible as a rail that flashes open
 * and slides shut, most obviously when the locale route remounts the tree.
 *
 * Kept as a raw string: it must run before React hydrates.
 */
export const sidebarScript = `
(function () {
  try {
    var desktop = window.matchMedia("(min-width: 1024px)").matches;
    var stored = localStorage.getItem("cellcube:sidebar-open");
    var open = desktop ? stored !== "false" : false;
    document.documentElement.dataset.sidebar = open ? "open" : "closed";
  } catch (error) {
    document.documentElement.dataset.sidebar = "open";
  }
})();
`;
