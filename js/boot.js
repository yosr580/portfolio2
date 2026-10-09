const BOOT_KEY = "yj-portfolio-boot-seen";
const HOLD_MS = 520;
const EXIT_MS = 380;

export function runBoot() {
  const overlay = document.querySelector("#boot");
  if (!overlay) return Promise.resolve();

  let seen = false;
  try {
    seen = sessionStorage.getItem(BOOT_KEY) === "1";
  } catch {
    seen = false;
  }

  if (seen || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    overlay.remove();
    document.body.classList.remove("boot-active");
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let finished = false;
    const finish = (instant = false) => {
      if (finished) return;
      finished = true;
      removeEventListener("keydown", skip);
      overlay.removeEventListener("click", skip);
      try {
        sessionStorage.setItem(BOOT_KEY, "1");
      } catch {
        // The intro can finish if session storage is unavailable.
      }
      document.body.classList.remove("boot-active");
      if (instant) {
        overlay.remove();
        resolve();
        return;
      }
      overlay.classList.add("is-exiting");
      setTimeout(() => {
        overlay.remove();
        resolve();
      }, EXIT_MS);
    };
    const skip = () => finish(true);

    overlay.addEventListener("click", skip);
    addEventListener("keydown", skip);
    requestAnimationFrame(() => overlay.classList.add("is-ready"));
    setTimeout(() => finish(false), HOLD_MS);
  });
}
