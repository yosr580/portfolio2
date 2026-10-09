const roles = [
  "AI & Computer Vision",
  "Telecommunications Engineering @ ENIT",
  "IEEE community leader",
  "Designer",
];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function typeLoop(el) {
  if (reduceMotion) {
    el.textContent = roles[0];
    return () => {};
  }

  let roleIndex = 0;
  let cursor = 0;
  let deleting = false;
  let timer;

  const step = () => {
    if (document.hidden) {
      timer = setTimeout(step, 500);
      return;
    }
    const word = roles[roleIndex];
    cursor += deleting ? -1 : 1;
    el.textContent = word.slice(0, cursor);
    let delay = deleting ? 35 : 70;
    if (!deleting && cursor === word.length) {
      deleting = true;
      delay = 1400;
    } else if (deleting && cursor === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 300;
    }
    timer = setTimeout(step, delay);
  };

  step();
  return () => clearTimeout(timer);
}

function initAboutStats() {
  const stats = document.querySelector("#about-stats");
  const values = [...document.querySelectorAll("[data-count]")];
  if (!stats || !values.length || reduceMotion) return;

  ScrollTrigger.create({
    trigger: stats,
    start: "top 84%",
    once: true,
    onEnter: () => {
      values.forEach((el, index) => {
        const state = { value: 0 };
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        gsap.to(state, {
          value: target,
          duration: target > 1000 ? 1.4 : 1.05,
          delay: index * 0.07,
          ease: "power2.out",
          snap: { value: 1 },
          onUpdate: () => {
            el.textContent = Math.round(state.value).toLocaleString("en-US") + suffix;
          },
        });
      });
    },
  });
}

function initStatTilt() {
  if (reduceMotion || !matchMedia("(pointer: fine)").matches) return;
  document.querySelectorAll(".about-stat").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotationY: x * 5,
        rotationX: -y * 5,
        transformPerspective: 900,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
    card.addEventListener("pointerleave", () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  });
}

function initPortraitParallax(hero, portrait) {
  if (reduceMotion || !matchMedia("(min-width: 900px) and (pointer: fine)").matches) return;
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(portrait, {
      x: x * 10,
      y: y * 8,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
  });
  hero.addEventListener("pointerleave", () => {
    gsap.to(portrait, { x: 0, y: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
  });
}

export function initHero() {
  const hero = document.querySelector("#hero");
  const role = document.querySelector("#hero-role");
  const portrait = document.querySelector(".hero-portrait-frame");
  if (!hero || !role || !portrait) return;

  typeLoop(role);
  initAboutStats();
  initStatTilt();
  initPortraitParallax(hero, portrait);

  if (reduceMotion) return;
  const titleWords = [...hero.querySelectorAll(".hero-title-word")];
  const revealGroup = [
    hero.querySelector(".hero-status"),
    hero.querySelector(".hero-role"),
    hero.querySelector(".hero-summary"),
    hero.querySelector(".hero-actions"),
    hero.querySelector(".hero-social-links"),
  ].filter(Boolean);

  const sequence = gsap.timeline();
  sequence.fromTo(
    titleWords,
    { y: 28, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" },
  );
  sequence.fromTo(
    revealGroup[0],
    { y: 28, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
  );
  sequence.fromTo(
    revealGroup.slice(1),
    { y: 28, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" },
  );

  gsap.fromTo(
    portrait,
    { opacity: 0, scale: 0.94 },
    { opacity: 1, scale: 1, duration: 0.9, delay: 0.2, ease: "power3.out" },
  );
  gsap.fromTo(
    hero.querySelectorAll(".hero-tile"),
    { opacity: 0, scale: 0.72 },
    { opacity: 1, scale: 1, duration: 0.55, stagger: 0.09, delay: 0.45, ease: "back.out(1.6)" },
  );
}
