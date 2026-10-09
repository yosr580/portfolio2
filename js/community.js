import "../data.js";
import { openLightbox } from "./lightbox.js";

const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const assetUrl = (path) => String(path ?? "").split("/").map(encodeURIComponent).join("/");
function photoCaption(path, isStudent) {
  const file = String(path).split("/").pop().replace(/\.[^.]+$/, "");
  if (isStudent && /^\d+$/.test(file)) return "Student Branch moments";
  if (!isStudent && /^(?:\d{6,}|img_?\d+)$/i.test(file)) return "IEEE Education Week moments";
  return file.replace(/[_-]+/g, " ").toLowerCase()
    .replace(/tehnical/g, "technical").replace(/contineous/g, "continuous")
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}
function renderPhotos(entry) {
  const photos = entry.gallery ?? [];
  const captions = photos.map((photo) => photoCaption(photo, entry.id === "student-branch-chair"));
  if (photos.length === 1) return `<div class="community-single-photo"><button class="community-photo" type="button" data-photo-index="0" aria-label="Open ${esc(captions[0])}"><img src="${esc(assetUrl(photos[0]))}" alt="${esc(captions[0])}" loading="lazy"><span class="community-photo-caption">${esc(captions[0])}</span></button></div>`;
  const buttons = photos.map((photo, index) => {
    const award = entry.awardImage === photo ? `<span class="community-award-tag">Rising Star Member Award 2025</span>` : "";
    return `<button class="community-photo" type="button" data-photo-index="${index}" aria-label="Open ${esc(captions[index])}"><img src="${esc(assetUrl(photo))}" alt="${esc(captions[index])}" loading="lazy">${award}<span class="community-photo-caption">${esc(captions[index])}</span></button>`;
  }).join("");
  return `<div class="community-gallery" data-gallery="${esc(entry.id)}"><button class="community-gallery-arrow is-previous" type="button" aria-label="Scroll photos left">&#8592;</button><div class="community-filmstrip" tabindex="0" aria-label="Photos: ${esc(entry.role)}">${buttons}</div><button class="community-gallery-arrow is-next" type="button" aria-label="Scroll photos right">&#8594;</button></div>`;
}
function renderItem(entry, index) {
  const images = (entry.gallery ?? []).map(assetUrl);
  const captions = (entry.gallery ?? []).map((path) => photoCaption(path, entry.id === "student-branch-chair"));
  const open = index === 0;
  const link = entry.link?.url ? `<a class="community-external-link" href="${esc(entry.link.url)}" target="_blank" rel="noopener noreferrer">${esc(entry.link.label)} <span aria-hidden="true">&#8599;</span></a>` : "";
  return `<article class="community-row glass-card${open ? " is-open" : ""}" data-reveal>
    <h3 class="community-row-heading"><button class="community-toggle" type="button" aria-expanded="${open}" aria-controls="community-panel-${index}" id="community-toggle-${index}"><span class="community-role">${esc(entry.role)}</span><span class="community-org">${esc(entry.organization)}</span><span class="community-period">${esc(entry.period)}</span><span class="community-chevron" aria-hidden="true">+</span></button></h3>
    <div class="community-panel" id="community-panel-${index}" role="region" aria-labelledby="community-toggle-${index}"${open ? "" : " hidden"}><div class="community-panel-inner"><p class="community-description">${esc(entry.description)}</p>${renderPhotos(entry)}${link}</div></div>
    <script type="application/json" class="community-photo-data">${JSON.stringify({ images, captions }).replace(/</g, "\\u003c")}</script>
  </article>`;
}
function animatePanel(panel, open) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (open) panel.hidden = false;
  if (!window.gsap || reduce) { panel.hidden = !open; panel.style.height = open ? "auto" : "0px"; return; }
  gsap.killTweensOf(panel);
  if (open) gsap.fromTo(panel, { height: 0 }, { height: "auto", duration: 0.38, ease: "power2.inOut", onComplete: () => { panel.style.height = "auto"; } });
  else gsap.to(panel, { height: 0, duration: 0.32, ease: "power2.inOut", onComplete: () => { panel.hidden = true; panel.style.removeProperty("height"); } });
}
function initAccordion(root) {
  const rows = [...root.querySelectorAll(".community-row")];
  rows.forEach((row) => {
    const toggle = row.querySelector(".community-toggle");
    const panel = row.querySelector(".community-panel");
    toggle.addEventListener("click", () => {
      const shouldOpen = toggle.getAttribute("aria-expanded") !== "true";
      rows.forEach((item) => {
        const button = item.querySelector(".community-toggle");
        const body = item.querySelector(".community-panel");
        const isOpen = item === row && shouldOpen;
        button.setAttribute("aria-expanded", String(isOpen));
        item.classList.toggle("is-open", isOpen);
        if (body.hidden === isOpen) animatePanel(body, isOpen);
      });
    });
  });
}
function initGallery(root) {
  root.querySelectorAll(".community-row").forEach((row) => {
    const photoData = JSON.parse(row.querySelector(".community-photo-data").textContent);
    const strip = row.querySelector(".community-filmstrip");
    row.querySelectorAll(".community-photo").forEach((button) => button.addEventListener("click", () => {
      if (strip?.dataset.dragged === "true") { strip.dataset.dragged = "false"; return; }
      openLightbox(photoData.images, Number(button.dataset.photoIndex), photoData.captions);
    }));
    if (!strip) return;
    row.querySelector(".is-previous").addEventListener("click", () => strip.scrollBy({ left: -312, behavior: "smooth" }));
    row.querySelector(".is-next").addEventListener("click", () => strip.scrollBy({ left: 312, behavior: "smooth" }));
    let startX = 0, startScroll = 0, dragging = false, moved = false;
    strip.addEventListener("pointerdown", (event) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      dragging = true; moved = false; startX = event.clientX; startScroll = strip.scrollLeft; strip.classList.add("is-dragging");
    });
    strip.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const delta = event.clientX - startX;
      if (Math.abs(delta) > 4) { moved = true; strip.scrollLeft = startScroll - delta; }
    });
    const endDrag = () => {
      if (!dragging) return;
      dragging = false; strip.classList.remove("is-dragging");
      if (moved) { strip.dataset.dragged = "true"; setTimeout(() => { strip.dataset.dragged = "false"; }, 0); }
    };
    strip.addEventListener("pointerup", endDrag); strip.addEventListener("pointercancel", endDrag); strip.addEventListener("pointerleave", endDrag);
  });
}
export function initCommunity() {
  const section = document.querySelector("#community");
  const head = section?.querySelector(".section-head");
  const entries = window.portfolioData?.volunteering;
  if (!section || !head || !Array.isArray(entries)) return;
  const title = head.querySelector(".section-title");
  const subtitle = head.querySelector(".section-intro");
  if (title) title.textContent = "Good work happens together.";
  if (subtitle) subtitle.textContent = "Four roles across my IEEE communities.";
  section.querySelector(".community-list")?.remove();
  const list = document.createElement("div"); list.className = "community-list container";
  list.innerHTML = entries.map(renderItem).join("");
  head.insertAdjacentElement("afterend", list);
  initAccordion(list); initGallery(list);
}
