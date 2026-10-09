const BOOT_KEY = "yj-portfolio-boot-seen";
const TOTAL_MS = 1540;
const EXIT_MS = 360;

export function runBoot() {
  const overlay = document.querySelector("#boot");
  if (!overlay) return Promise.resolve();

  return new Promise((resolve) => {
    let finished = false;
    const lines = [...overlay.querySelectorAll("[data-boot-line]")];
    const progress = overlay.querySelector(".boot-progress");

    const finish = (instant = false) => {
      if (finished) return;
      finished = true;
      window.removeEventListener("keydown", skip);
      overlay.removeEventListener("click", skip);
      try {
        sessionStorage.setItem(BOOT_KEY, "1");
      } catch {
        // The sequence still completes if session storage is unavailable.
      }
      document.body.classList.remove("boot-active");
      overlay.classList.add("is-exiting");
      const remove = () => {
        overlay.remove();
        resolve();
      };
      if (instant) {
        remove();
      } else {
        overlay.addEventListener("transitionend", remove, { once: true });
        window.setTimeout(remove, EXIT_MS);
      }
    };

    const skip = () => finish(true);
    let seen = false;
    try {
      seen = sessionStorage.getItem(BOOT_KEY) === "1";
    } catch {
      seen = false;
    }

    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish(true);
      return;
    }

    overlay.addEventListener("click", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    lines.forEach((line, index) => {
      window.setTimeout(() => line.classList.add("is-visible"), index * 170);
    });
    window.requestAnimationFrame(() => {
      if (progress) progress.style.transform = "scaleX(1)";
    });
    window.setTimeout(() => finish(false), TOTAL_MS);
  });
}
