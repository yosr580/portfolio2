import { iconMarkup } from "./skills.js";

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

function initOrbit() {
  const root = document.querySelector(".hx-orbit");
  if (!root) return;

  const compact = matchMedia("(max-width: 1000px)").matches;
  const rings = [
    { a: .47, b: .17, rot: -14, sp: .00022, sats: compact ? ["pytorch", "huggingface"] : ["pytorch", "huggingface", "python"] },
    { a: .17, b: .40, rot: -28, sp: -.0003, sats: compact ? ["tensorflow"] : ["tensorflow", "opencv"] },
  ];

  rings.forEach((ring) => {
    ring.els = ring.sats.map((key) => {
      const satellite = document.createElement("span");
      satellite.className = "hx-sat";
      satellite.setAttribute("aria-hidden", "true");
      satellite.innerHTML = iconMarkup(key);
      root.append(satellite);
      return satellite;
    });
  });

  let raf = 0;
  let visible = true;
  const start = performance.now();
  const draw = (time) => {
    const size = root.clientWidth;
    rings.forEach((ring) => {
      const angle = ring.rot * Math.PI / 180;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      ring.els.forEach((element, index) => {
        const theta = (reduce ? 0 : (time - start) * ring.sp) + index * Math.PI * 2 / ring.els.length;
        const px = ring.a * size * Math.cos(theta);
        const py = ring.b * size * Math.sin(theta);
        const x = px * cos - py * sin;
        const y = px * sin + py * cos;
        const depth = (Math.sin(theta) + 1) / 2;
        element.style.transform = `translate(${x}px,${y}px) scale(${.8 + .3 * depth})`;
        element.style.opacity = (.55 + .45 * depth).toFixed(2);
        element.style.zIndex = depth > .5 ? "3" : "1";
      });
    });
    if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(draw);
  };
  const resume = () => {
    cancelAnimationFrame(raf);
    draw(performance.now());
  };

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) resume(); else cancelAnimationFrame(raf);
    }).observe(root);
  }
  document.addEventListener("visibilitychange", () => { if (!document.hidden) resume(); else cancelAnimationFrame(raf); });
  window.addEventListener("resize", () => { if (reduce || !visible) draw(performance.now()); });
  draw(start);
}

export function initHero() {
  if (!reduce) {
    gsap.set(".hx-line>*", { yPercent: 115 });
    gsap.timeline({ defaults: { ease: "power4.out" } })
      .to(".hx-line>*", { yPercent: 0, duration: 1.1, stagger: .14 })
      .from(".hx-eyebrow,.hx-summary,.hx-cta>*,.hx-status", { y: 24, opacity: 0, stagger: .09, duration: .8 }, "-=.7")
      .from(".hx-orbit", { scale: .85, opacity: 0, duration: 1.1, ease: "power3.out" }, "-=1.1");
    gsap.from(".hx-about p", { y: 30, opacity: 0, stagger: .12, duration: .7, ease: "power2.out", scrollTrigger: { trigger: ".hx-about", start: "top 84%", once: true } });
  }
  initOrbit();
}
