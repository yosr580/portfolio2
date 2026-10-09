const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
export function initFloaters() {
  const host = document.querySelector(".bg-fx");
  if (!host) return;
  host.innerHTML = '<i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i>';
  const kinds = ["ring", "sq", "plus", "dots", "ring", "sq", "plus"];
  const N = innerWidth < 800 ? 5 : 10;
  for (let i = 0; i < N; i++) {
    const el = document.createElement("span");
    el.className = "fl fl-" + kinds[i % kinds.length];
    el.innerHTML = "<i></i>";
    el.style.cssText = [
      "--x:" + ((i * 37 + 11) % 92) + "%",
      "--y:" + ((i * 23 + 7) % 88) + "%",
      "--s:" + (24 + (i * 13) % 52) + "px",
      "--t:" + (9 + (i * 3) % 11) + "s",
      "--dl:-" + (i * 1.7).toFixed(1) + "s",
      "--o:" + (0.25 + ((i * 7) % 5) / 10).toFixed(2)
    ].join(";");
    el.dataset.d = (0.4 + (i % 4) * 0.4).toFixed(1);
    host.append(el);
  }
  document.addEventListener("visibilitychange", () => {
    document.documentElement.classList.toggle("is-hidden", document.hidden);
  });
  if (reduce) return;
  gsap.utils.toArray(".fl").forEach((el) =>
    gsap.to(el, {
      yPercent: -60 * el.dataset.d,
      ease: "none",
      scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true }
    })
  );
  if (!matchMedia("(pointer: coarse)").matches) {
    addEventListener("pointermove", (e) => {
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      gsap.utils.toArray(".fl").forEach((el) =>
        gsap.to(el, { x: -x * el.dataset.d * 34, y: -y * el.dataset.d * 22, duration: 1, ease: "power3.out", overwrite: "auto" })
      );
    }, { passive: true });
  }
}
