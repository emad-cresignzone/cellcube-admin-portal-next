/**
 * Sets data-theme before first paint so a dark-mode user never sees a light
 * flash. Kept as a raw string: it must run before React hydrates.
 */
export const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("cellcube:theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = "light";
  }
})();
`;
