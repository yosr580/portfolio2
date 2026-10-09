import "../data.js";
import { getIcon, iconMarkup } from "./skills.js";

const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const mark = (value) => esc(value).replace(/\*\*(.+?)\*\*/g, "<mark>$1</mark>");

function renderStack(keys = []) {
  return keys.map((key) => `<span class="project-stack-chip experience-stack-chip">${iconMarkup(key, "experience")}<span>${esc(getIcon(key).label)}</span></span>`).join("");
}
function renderCard(item, index) {
  const project = item.projectId ? document.querySelector(`[data-project-id="${CSS.escape(item.projectId)}"]`) : null;
  if (project) project.id = `project-${item.projectId}`;
  const bullets = item.bullets.map((line) => `<li>${mark(line)}</li>`).join("");
  const link = project ? `<a class="experience-project-link" href="#project-${esc(item.projectId)}">View related project <span aria-hidden="true">\u2197</span></a>` : "";
  return `<article class="experience-card glass-card" data-reveal data-experience-card="${esc(item.id)}" aria-labelledby="experience-role-${index}">
    <span class="experience-card-bar" aria-hidden="true"></span>
    <div class="experience-card-top"><span class="experience-date">${esc(item.period)}</span><span class="experience-monogram" aria-hidden="true">${esc(item.mark)}</span></div>
    <p class="experience-organization">${esc(item.organization)}</p>
    <h3 id="experience-role-${index}">${esc(item.role)}</h3>
    <p class="experience-context">${esc(item.context)}</p>
    <ul class="experience-bullets">${bullets}</ul>
    ${item.outcome ? `<p class="experience-outcome">${esc(item.outcome)}</p>` : ""}
    <div class="experience-stack" aria-label="Technologies">${renderStack(item.stack)}</div>
    ${link}
  </article>`;
}

export function initExperience() {
  const section = document.querySelector("#experience");
  const intro = section?.querySelector(".section-head");
  const entries = window.portfolioData?.researchExperiences;
  if (!section || !intro || !Array.isArray(entries)) return;
  intro.classList.add("experience-intro");
  const kicker = intro.querySelector(".section-kicker");
  const title = intro.querySelector(".section-title");
  const summary = intro.querySelector(".section-intro");
  if (kicker) kicker.textContent = "Experience";
  if (title) title.innerHTML = 'Internships and research, <span class="gradient-text">side by side.</span>';
  if (summary) summary.textContent = "Experience across AI, computer vision, and research, from model studies to tools tested in practice.";
  let glance = intro.querySelector(".experience-glance");
  if (!glance) { glance = document.createElement("div"); glance.className = "experience-glance"; summary?.insertAdjacentElement("afterend", glance); }
  glance.innerHTML = `<span><strong>2</strong> internships</span><span><strong>2</strong> research projects</span>`;
  section.querySelector(".experience-layout")?.remove();
  const layout = document.createElement("div"); layout.className = "experience-layout container";
  const internships = entries.filter((item) => item.id.includes("internship"));
  const research = entries.filter((item) => item.id.endsWith("research"));
  layout.innerHTML = `<div class="experience-track" aria-hidden="true"><span class="experience-track-fill"></span></div><div class="experience-list"><div class="experience-group">${internships.map(renderCard).join("")}</div><div class="research-subblock"><h3>Research</h3><div class="experience-group">${research.map(renderCard).join("")}</div></div></div>`;
  intro.replaceWith(layout);
  layout.prepend(intro);
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fill = layout.querySelector(".experience-track-fill");
  if (!reduce) gsap.to(fill, { scaleY: 1, ease: "none", scrollTrigger: { trigger: layout.querySelector(".experience-list"), start: "top 65%", end: "bottom 65%", scrub: true } });
  layout.querySelectorAll(".experience-card").forEach((card) => {
    ScrollTrigger.create({ trigger: card, start: "top 58%", end: "bottom 42%", toggleClass: { targets: card, className: "is-active" } });
  });
  ScrollTrigger.refresh();
}
