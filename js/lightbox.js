let dialog;
let imageElement;
let captionElement;
let counterElement;
let previousButton;
let nextButton;
let currentImages = [];
let currentCaptions = [];
let currentIndex = 0;
let returnFocus = null;
let resumeLenisOnClose = false;
let pointerStart = null;

const assetUrl = (path) =>
  String(path ?? "").split("/").map((part) => encodeURIComponent(part)).join("/");

function updateFrame() {
  if (!dialog || currentImages.length === 0) return;
  currentIndex = (currentIndex + currentImages.length) % currentImages.length;
  const caption = currentCaptions[currentIndex] || "Project photo";
  imageElement.src = assetUrl(currentImages[currentIndex]);
  imageElement.alt = caption;
  captionElement.textContent = caption;
  counterElement.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(currentImages.length).padStart(2, "0")}`;
  previousButton.disabled = currentImages.length < 2;
  nextButton.disabled = currentImages.length < 2;
}

function moveBy(amount) {
  currentIndex += amount;
  updateFrame();
}

export function initLightbox() {
  if (dialog?.isConnected) return;
  dialog = document.createElement("dialog");
  dialog.className = "project-lightbox";
  dialog.setAttribute("aria-label", "Project photos");
  dialog.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close photo viewer">×</button>
    <button class="lightbox-previous" type="button" aria-label="Previous photo">←</button>
    <figure class="lightbox-stage">
      <img class="lightbox-image" alt="">
    </figure>
    <button class="lightbox-next" type="button" aria-label="Next photo">→</button>
    <div class="lightbox-footer"><p class="lightbox-caption"></p><p class="lightbox-index" aria-live="polite"></p></div>`;
  document.body.append(dialog);

  imageElement = dialog.querySelector(".lightbox-image");
  captionElement = dialog.querySelector(".lightbox-caption");
  counterElement = dialog.querySelector(".lightbox-index");
  previousButton = dialog.querySelector(".lightbox-previous");
  nextButton = dialog.querySelector(".lightbox-next");

  dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
  previousButton.addEventListener("click", () => moveBy(-1));
  nextButton.addEventListener("click", () => moveBy(1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveBy(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveBy(1);
    }
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") pointerStart = { x: event.clientX, y: event.clientY };
  });
  dialog.addEventListener("pointerup", (event) => {
    if (!pointerStart || event.pointerType !== "touch") return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.25) moveBy(dx < 0 ? 1 : -1);
  });
  dialog.addEventListener("pointercancel", () => { pointerStart = null; });
  dialog.addEventListener("close", () => {
    if (resumeLenisOnClose) window.lenis?.start();
    resumeLenisOnClose = false;
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  });
}

export function openLightbox(images, index = 0, captions = []) {
  if (!Array.isArray(images) || images.length === 0) return;
  initLightbox();
  currentImages = images;
  currentCaptions = Array.isArray(captions) ? captions : [];
  currentIndex = Math.max(0, Math.min(Number(index) || 0, currentImages.length - 1));
  returnFocus = document.activeElement;
  resumeLenisOnClose = Boolean(window.lenis && !window.lenis.isStopped);
  if (resumeLenisOnClose) window.lenis.stop();
  updateFrame();
  if (!dialog.open) dialog.showModal();
  dialog.querySelector(".lightbox-close").focus({ preventScroll: true });
}
