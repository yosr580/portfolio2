const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function initPortraitParallax(hero, portrait) {
  if (reduceMotion || !matchMedia("(min-width: 900px) and (pointer: fine)").matches) return;
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(portrait, { x: x * 7, y: y * 6, duration: .8, ease: "power3.out", overwrite: "auto" });
  });
  hero.addEventListener("pointerleave", () => {
    gsap.to(portrait, { x: 0, y: 0, duration: .8, ease: "power3.out", overwrite: "auto" });
  });
}

export function initHero() {
  const hero = document.querySelector("#about");
  const portrait = document.querySelector(".hero-portrait-frame");
  if (!hero || !portrait) return;
  initPortraitParallax(hero, portrait);
  if (reduceMotion) return;

  const titleWords = [...hero.querySelectorAll(".hero-title-word")];
  const revealGroup = [
    hero.querySelector(".hero-idiom"),
    ...hero.querySelectorAll(".hero-summary"),
    hero.querySelector(".hero-actions"),
    hero.querySelector(".hero-social-links"),
  ].filter(Boolean);
  const sequence = gsap.timeline();
  sequence.fromTo(hero.querySelector(".hero-availability"), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .65, ease: "power3.out" });
  sequence.fromTo(titleWords, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .9, stagger: .1, ease: "power3.out" });
  sequence.fromTo(revealGroup, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .1, ease: "power3.out" });
  gsap.fromTo(portrait, { opacity: 0, scale: .94 }, { opacity: 1, scale: 1, duration: .9, delay: .2, ease: "power3.out" });
  gsap.fromTo(hero.querySelectorAll(".hero-tile"), { opacity: 0, scale: .72 }, { opacity: 1, scale: 1, duration: .55, stagger: .09, delay: .45, ease: "back.out(1.6)" });
}
