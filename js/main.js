import { initTheme } from "./theme.js";
import { runBoot } from "./boot.js";
import { initMotion } from "./motion.js";
import { initFloaters } from "./floaters.js";
import { initHero } from "./hero.js";
import { renderProjects } from "./render.js";
import { initProjects } from "./projects.js";
import { initSkills } from "./skills.js";
import { initExperience } from "./experience.js";

function initNavigation() {
  const header = document.querySelector("#site-header");
  const toggle = document.querySelector("#nav-toggle");
  const links = document.querySelector("#nav-links");
  if (!header || !toggle || !links) return;
  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    links.classList.remove("is-open");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    links.classList.toggle("is-open", open);
  });
  links.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  let previousY = window.scrollY;
  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    const delta = currentY - previousY;
    if (Math.abs(delta) > 3) {
      header.classList.toggle("is-hidden", currentY > 110 && delta > 0);
      if (currentY <= 64) header.classList.remove("is-hidden");
      previousY = currentY;
    }
  }, { passive: true });
}
initTheme();
initNavigation();
runBoot().then(() => {
  initSkills();
  renderProjects();
  initExperience();
  initMotion();
  initFloaters();
  initHero();
  initProjects();
});
