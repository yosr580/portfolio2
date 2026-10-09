const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("js");

  if (!reduce) {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        const id = anchor.getAttribute("href");
        if (id.length > 1 && document.querySelector(id)) {
          event.preventDefault();
          lenis.scrollTo(id, { offset: 0 });
        }
      });
    });
  }

  const show = (elements) =>
    gsap.to(elements, {
      y: 0,
      opacity: 1,
      duration: reduce ? 0.01 : 0.7,
      ease: "power2.out",
      stagger: reduce ? 0 : 0.08,
      overwrite: true,
    });

  ScrollTrigger.batch("[data-reveal]", {
    start: "top 84%",
    once: true,
    onEnter: show,
  });
  ScrollTrigger.refresh();
}
