import { getIcon, iconMarkup } from "./skills.js";
import { mark } from "./render.js";
import { openLightbox, initLightbox } from "./lightbox.js";

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(min-width: 1000px) and (pointer: fine)").matches;

function initTilt(card) {
  if (reducedMotion || !finePointer || !window.gsap) return;
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    const offsetX = (event.clientX - (bounds.left + bounds.width / 2)) / 24;
    const offsetY = (event.clientY - (bounds.top + bounds.height / 2)) / 24;
    gsap.to(card, {
      rotationY: Math.max(-3, Math.min(3, offsetX)),
      rotationX: Math.max(-3, Math.min(3, -offsetY)),
      transformPerspective: 1100,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  });
  card.addEventListener("pointerleave", () => {
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });
  });
}

const esc = (value) => String(value ?? "").replace(/[&<>\"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]));
const assetUrl = (path) => String(path ?? "").split("/").map(encodeURIComponent).join("/");
const resourceLinks = [["github", "GitHub"], ["report", "Report"], ["demo", "Demo"]];
let projectDialog;
let resumeLenis = false;

function ensureProjectDialog() {
  projectDialog = document.getElementById("project-dialog");
  if (!projectDialog) {
    projectDialog = document.createElement("dialog");
    projectDialog.id = "project-dialog";
    projectDialog.className = "project-dialog";
    projectDialog.innerHTML = '<button class="pd-close" type="button" aria-label="Close project details">×</button><div class="pd-body"></div>';
    document.body.append(projectDialog);
    projectDialog.querySelector(".pd-close").addEventListener("click", () => projectDialog.close());
    projectDialog.addEventListener("click", (event) => { if (event.target === projectDialog) projectDialog.close(); });
    projectDialog.addEventListener("close", () => { if (resumeLenis) window.lenis?.start(); resumeLenis = false; });
  }
}

export function openDetails(project) {
  ensureProjectDialog();
  const approach = Array.isArray(project.approach) ? project.approach.join(" ") : project.approach;
  const stack = (project.stack ?? []).map((key) => `<span class="project-stack-chip">${iconMarkup(key, "project")}<span>${esc(getIcon(key).label)}</span></span>`).join("");
  const links = resourceLinks.map(([key, label]) => {
    const value = project.links?.[key];
    if (!value) return "";
    try { const url = new URL(value, location.href); if (!["http:", "https:"].includes(url.protocol)) return ""; return `<a class="button button-outline" href="${esc(url.href)}" target="_blank" rel="noopener noreferrer">${label}</a>`; } catch { return ""; }
  }).join("");
  const images = project.images ?? [];
  const captions = images.map((_, index) => `${project.title} · photo ${index + 1}`);
  projectDialog.querySelector(".pd-body").innerHTML = `<p class="project-context">${esc(project.context)}</p><h2>${esc(project.title)}</h2><p class="pd-headline">${mark(project.headline)}</p><ul class="pd-bullets">${(project.bullets ?? []).map((item) => `<li>${mark(item)}</li>`).join("")}</ul><div class="pd-sections"><section><h3>Goal</h3><p>${mark(project.problem)}</p></section><section><h3>How I built it</h3><p>${mark(approach)}</p></section><section><h3>Outcome</h3><p>${mark(project.result)}</p></section></div><h3 class="pd-label">Technology</h3><div class="project-stack pd-stack">${stack}</div><div class="pd-actions">${links}</div><h3 class="pd-label">Photos</h3><div class="pd-gallery">${images.map((path, index) => `<button type="button" data-gallery-index="${index}" aria-label="Open photo ${index + 1}"><img src="${esc(assetUrl(path))}" alt="${esc(captions[index])}" loading="lazy"></button>`).join("")}</div>`;
  projectDialog.querySelectorAll("[data-gallery-index]").forEach((button) => button.addEventListener("click", () => openLightbox(images, Number(button.dataset.galleryIndex), captions)));
  resumeLenis = Boolean(window.lenis && !window.lenis.isStopped);
  window.lenis?.stop();
  projectDialog.showModal();
}

export function initProjects() {
  initLightbox();
  ensureProjectDialog();
  const projects = window.portfolioData?.projects ?? [];
  document.querySelectorAll(".project-card").forEach((card) => {
    const project = projects.find((item) => item.id === card.dataset.projectId);
    if (!project) return;
    const images = project.images ?? [];
    const captions = images.map((_, index) => `${project.title} · photo ${index + 1}`);
    card.querySelectorAll(".mosaic-item").forEach((button) => {
      button.addEventListener("click", () => {
        openLightbox(images, Number(button.dataset.photoIndex), captions);
      });
    });
    card.querySelector("[data-project-details]")?.addEventListener("click", () => openDetails(project));
    initTilt(card);
  });
}
