import "../data.js";

const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[char]));

export const mark = (value) =>
  esc(value).replace(/\*\*(.+?)\*\*/g, "<mark>$1</mark>");

const assetUrl = (path) =>
  String(path ?? "").split("/").map((part) => encodeURIComponent(part)).join("/");

const externalUrl = (value) => {
  if (typeof value !== "string" || value.trim() === "") return "";
  try {
    const url = new URL(value, window.location.href);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
};

const stackNames = {
  ai: "AI",
  arduino: "Arduino",
  cnn: "CNN",
  fastapi: "FastAPI",
  fiberoptics: "Fiber optics",
  groq: "Groq",
  keras: "Keras",
  matlab: "MATLAB",
  mediapipe: "MediaPipe",
  opencv: "OpenCV",
  photonics: "Photonics",
  postgresql: "PostgreSQL",
  python: "Python",
  react: "React",
  redis: "Redis",
  reportlab: "ReportLab",
  smtp: "SMTP",
  ssfm: "SSFM",
  tensorflow: "TensorFlow",
  tensorflowjs: "TensorFlow.js",
  tsl: "TSL",
  tts: "TTS",
  videomae: "VideoMAE",
};

const linkLabels = [
  ["github", "GitHub"],
  ["report", "Report"],
  ["demo", "Demo"],
];

function renderLinks(links = {}) {
  return linkLabels.map(([key, label]) => {
    const href = externalUrl(links[key]);
    if (!href) return "";
    return `<a class="button project-link" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  }).join("");
}

function renderMosaic(project) {
  const images = Array.isArray(project.images) ? project.images : [];
  const visibleImages = images.slice(0, 3);
  return `<div class="project-mosaic mosaic" aria-label="Photos from ${esc(project.title)}">${visibleImages.map((image, index) => {
    const photoCount = images.length - 3;
    const more = index === 2 && photoCount > 0
      ? `<span class="mosaic-more">+${photoCount} photos</span>`
      : "";
    return `<button class="mosaic-item" type="button" data-photo-index="${index}" aria-label="View photo ${index + 1} of ${images.length} for ${esc(project.title)}"><img src="${esc(assetUrl(image))}" alt="${esc(project.title)} project photo ${index + 1}" loading="lazy">${more}</button>`;
  }).join("")}</div>`;
}

function renderProject(project) {
  const bullets = (project.bullets ?? []).slice(0, 4);
  const impacts = (project.impact ?? []).slice(0, 3);
  const stack = (project.stack ?? []).map((item) => {
    const label = stackNames[item.toLowerCase()] ?? item;
    return `<span class="project-stack-chip">${esc(label)}</span>`;
  }).join("");
  const approach = Array.isArray(project.approach) ? project.approach.join(" ") : project.approach;
  return `<article class="project-card glass-card" data-reveal data-project-id="${esc(project.id)}" aria-labelledby="project-title-${esc(project.id)}">
    ${renderMosaic(project)}
    <div class="project-copy">
      <p class="project-context">${esc(project.context)}</p>
      <h3 class="project-title" id="project-title-${esc(project.id)}">${esc(project.title)}</h3>
      <p class="project-headline">${mark(project.headline)}</p>
      <div class="project-impact" aria-label="Project highlights">${impacts.map((item) => `<span>${esc(item)}</span>`).join("")}</div>
      <ul class="project-bullets">${bullets.map((item) => `<li>${mark(item)}</li>`).join("")}</ul>
      <div class="project-stack" aria-label="Technology stack">${stack}</div>
      <div class="project-actions">${renderLinks(project.links)}</div>
      <details class="project-details">
        <summary>More details</summary>
        <div class="project-details-content"><div class="project-details-inner">
          <section><h4>Goal</h4><p>${mark(project.problem)}</p></section>
          <section><h4>How I built it</h4><p>${mark(approach)}</p></section>
          <section><h4>Outcome</h4><p>${mark(project.result)}</p></section>
        </div></div>
      </details>
    </div>
  </article>`;
}

export function renderProjects() {
  const section = document.querySelector("#projects");
  const projects = window.portfolioData?.projects;
  const sectionHead = section?.querySelector(".section-head");
  if (!section || !sectionHead || !Array.isArray(projects)) return;

  section.querySelector(".project-list")?.remove();
  const list = document.createElement("div");
  list.className = "project-list container";
  list.innerHTML = projects.map(renderProject).join("");
  sectionHead.insertAdjacentElement("afterend", list);
}