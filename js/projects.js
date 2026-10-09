import { openLightbox, initLightbox } from "./lightbox.js";

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(min-width: 801px) and (pointer: fine)").matches;

function initTilt(card) {
  if (reducedMotion || !finePointer || !window.gsap) return;
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    const offsetX = (event.clientX - (bounds.left + bounds.width / 2)) / 24;
    const offsetY = (event.clientY - (bounds.top + bounds.height / 2)) / 24;
    gsap.to(card, {
      rotationY: Math.max(-4, Math.min(4, offsetX)),
      rotationX: Math.max(-4, Math.min(4, -offsetY)),
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

export function initProjects() {
  initLightbox();
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
    initTilt(card);
  });
}