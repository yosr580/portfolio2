const THEME_KEY = "yj-portfolio-theme";

export function initTheme() {
  const root = document.documentElement;
  const toggle = document.querySelector("#theme-toggle");
  const icon = toggle?.querySelector(".theme-icon");
  let saved = null;

  try {
    saved = localStorage.getItem(THEME_KEY);
  } catch {
    saved = null;
  }

  const apply = (theme) => {
    const value = theme === "light" ? "light" : "dark";
    root.dataset.theme = value;
    if (icon) icon.textContent = value === "dark" ? "☼" : "☾";
    toggle?.setAttribute(
      "aria-label",
      value === "dark" ? "Switch to light theme" : "Switch to dark theme",
    );
    try {
      localStorage.setItem(THEME_KEY, value);
    } catch {
      // Theme remains usable when storage is unavailable.
    }
  };

  apply(saved === "light" || saved === "dark" ? saved : "dark");
  toggle?.addEventListener("click", () => {
    apply(root.dataset.theme === "dark" ? "light" : "dark");
  });
}
