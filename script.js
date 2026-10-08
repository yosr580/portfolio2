(() => {
  "use strict";

  const data = window.portfolioData || {};
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

  function captionFor(path, studentGallery = false) {
    const filename = path.split("/").pop().replace(/\.[^.]+$/, "");
    if (/^\d+$/.test(filename)) return studentGallery ? "Student Branch moments" : "Design project";
    const fixed = filename.replace(/[_-]+/g, " ").replace(/tehnical/gi, "technical").replace(/contineous/gi, "continuous");
    return fixed.replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function renderProjects() {
    const host = document.querySelector("#project-list");
    host.innerHTML = (data.projects || []).map((project, index) => `
      <article class="project-card reveal tilt-card">
        <div class="mosaic project-mosaic" aria-label="${esc(project.title)} project photos">
          ${(project.images || []).slice(0, 3).map((src, imageIndex) => `<button class="mosaic-item" type="button" data-gallery="project-${index}" data-index="${imageIndex}" aria-label="Open ${esc(project.title)} photo ${imageIndex + 1}"><img src="${esc(src)}" alt="${esc(project.title)}, ${esc(captionFor(src))}" loading="lazy" decoding="async">${imageIndex === 2 && project.images.length > 3 ? `<span class="photo-count">+${project.images.length - 3}</span>` : ""}</button>`).join("")}
        </div>
        <div class="project-body"><p class="section-label">${esc(project.eyebrow || "Selected work")}${project.period ? ` &middot; ${esc(project.period)}` : ""}</p><h3>${esc(project.title)}</h3><p class="card-description">${esc(project.description)}</p><div class="chips project-tags">${(project.tags || []).map((tag) => `<span>${esc(tag)}</span>`).join("")}</div><div class="card-links">${(project.links || []).map((link) => `<a class="text-link" href="${esc(link.url)}" target="_blank" rel="noreferrer">${esc(link.label)} &#8599;</a>`).join("")}${(project.notes || []).map((note) => `<span class="link-muted">${esc(note)}</span>`).join("")}</div></div>
      </article>`).join("");
  }

  function renderStudentBento(experience, index) {
    const galleryKey = `experience-${index}`;
    const tiles = experience.gallery.map((src, photoIndex) => {
      const caption = captionFor(src, true);
      return `<button class="bento-tile reveal ${photoIndex >= 8 ? "tile-hidden" : ""}" style="--tile-index:${photoIndex}" type="button" data-gallery="${galleryKey}" data-index="${photoIndex}" aria-label="View ${esc(caption)} photo">${photoIndex === 0 ? `<img src="${esc(src)}" alt="IEEE Tunisia Rising Star Member Award 2025" loading="lazy" decoding="async"><span class="award-badge">Rising Star Member Award 2025</span>` : `<img src="${esc(src)}" alt="${esc(caption)}" loading="lazy" decoding="async">`}<span class="bento-caption">${esc(caption)}</span></button>`;
    }).join("");
    return `<article class="bento-card reveal"><div class="bento-top"><div><p class="section-label">${esc(experience.period)}</p><h3>${esc(experience.title)}</h3><p class="org-name">${esc(experience.organization)}</p><p class="card-description">${esc(experience.description)}</p></div><div class="bento-stats"><span><strong>300+</strong> members</span><span><strong>2025</strong></span><span><strong>IEEE ENIT</strong></span></div></div><div class="bento-grid" data-bento-grid="${galleryKey}">${tiles}</div><button class="button button-outline bento-toggle" type="button" data-bento-toggle="${galleryKey}" aria-expanded="false">View all ${experience.gallery.length} moments</button></article>`;
  }

  function renderExperiences() {
    const host = document.querySelector("#experience-list");
    host.innerHTML = (data.experiences || []).map((experience, index) => {
      if (experience.featuredGallery) return renderStudentBento(experience, index);
      const key = `experience-${index}`;
      const images = (experience.gallery || []).slice(0, 3);
      return `<article class="experience-card reveal tilt-card"><div class="mosaic experience-mosaic" aria-label="${esc(experience.title)} photos">${images.map((src, imageIndex) => `<button class="mosaic-item" type="button" data-gallery="${key}" data-index="${imageIndex}" aria-label="Open ${esc(captionFor(src))}"><img src="${esc(src)}" alt="${esc(captionFor(src))}" loading="lazy" decoding="async"></button>`).join("")}</div><div class="experience-body"><p class="section-label">${esc(experience.period)}</p><h3>${esc(experience.title)}</h3><p class="org-name">${esc(experience.organization)}</p><p class="card-description">${esc(experience.description)}</p><div class="experience-action"><button class="text-link" type="button" data-gallery="${key}" data-index="0">View photos &#8599;</button>${experience.link ? `<a class="text-link" href="${esc(experience.link.url)}" target="_blank" rel="noreferrer">${esc(experience.link.label)} &#8599;</a>` : ""}</div></div></article>`;
    }).join("");
  }

  function renderDesigns() {
    const host = document.querySelector("#design-grid");
    const designs = data.designs || [];
    host.innerHTML = designs.map((src, index) => `<button class="design-card reveal" style="--tile-index:${index}" type="button" data-gallery="designs" data-index="${index}" aria-label="View ${esc(captionFor(src))}"><img src="${esc(src)}" alt="${esc(captionFor(src))}" loading="lazy" decoding="async"><span class="design-view">View</span></button>`).join("");
    const cards = [...host.children];
    if (cards.length > 12) {
      cards.slice(12).forEach((card) => card.hidden = true);
      const button = document.querySelector("#show-designs");
      button.hidden = false;
      button.setAttribute("aria-expanded", "false");
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") !== "true";
        cards.slice(12).forEach((card) => card.hidden = !expanded);
        button.setAttribute("aria-expanded", String(expanded));
        button.textContent = expanded ? "Show fewer designs" : "Show all designs";
      });
    }
  }

  function renderCertificates() {
    const host = document.querySelector("#certificate-list");
    const certificates = data.certificates || [];
    if (!certificates.length) {
      host.innerHTML = `<article class="certificate-placeholder"><span class="certificate-icon" aria-hidden="true">&#10022;</span><p class="section-label">Coming soon</p><h3>Certificates will be added here.</h3><p>Add certificate records to <code>data.js</code> when ready.</p></article>`;
      return;
    }
    host.innerHTML = certificates.map((item) => `<article class="certificate-card glass-card reveal">${item.image ? `<img src="${esc(item.image)}" alt="${esc(item.title)} certificate" loading="lazy">` : ""}<p class="section-label">${esc(item.issuer)}</p><h3>${esc(item.title)}</h3><p>${esc(item.date || "")}</p>${item.url ? `<a class="text-link" href="${esc(item.url)}" target="_blank" rel="noreferrer">View credential &#8599;</a>` : ""}</article>`).join("");
  }

  function galleryLibrary() {
    const library = {};
    (data.projects || []).forEach((item, index) => library[`project-${index}`] = { title: item.title, images: item.images || [] });
    (data.experiences || []).forEach((item, index) => library[`experience-${index}`] = { title: item.title, images: item.gallery || [], filenameCaptions: item.featuredGallery });
    library.designs = { title: "Design projects", images: data.designs || [], filenameCaptions: true };
    library["ieee-enit"] = { title: "IEEE ENIT Student Branch website", images: ["assets/wp-project-ieee-enit-1.jpg", "assets/wp-project-ieee-enit-2.jpg", "assets/wp-project-ieee-enit-3.jpg"] };
    library["education-week"] = { title: "IEEE ENIT Education Week website", images: ["assets/ed1.png", "assets/ed2.png", "assets/ed3.png"] };
    return library;
  }

  function initLightbox() {
    const dialog = document.querySelector("#lightbox");
    const photo = dialog.querySelector(".lightbox-image");
    const caption = dialog.querySelector(".lightbox-caption span:first-child");
    const count = dialog.querySelector(".lightbox-count");
    const library = galleryLibrary();
    let current = { images: [], index: 0, title: "", filenameCaptions: false, opener: null };
    const show = (index) => {
      if (!current.images.length) return;
      current.index = (index + current.images.length) % current.images.length;
      const src = current.images[current.index];
      photo.src = src;
      photo.alt = current.filenameCaptions ? captionFor(src, current.title !== "Design projects") : `${current.title}, photo ${current.index + 1} of ${current.images.length}`;
      caption.textContent = current.filenameCaptions ? captionFor(src, current.title !== "Design projects") : current.title;
      count.textContent = `${String(current.index + 1).padStart(2, "0")} / ${String(current.images.length).padStart(2, "0")}`;
      [-1, 1].forEach((offset) => { const preload = new Image(); preload.src = current.images[(current.index + offset + current.images.length) % current.images.length]; });
      const multiple = current.images.length > 1;
      dialog.querySelector(".lightbox-prev").hidden = !multiple;
      dialog.querySelector(".lightbox-next").hidden = !multiple;
    };
    const open = (key, index, opener) => {
      const item = library[key];
      if (!item || !item.images.length) return;
      current = { ...item, index, opener };
      show(index);
      dialog.showModal();
    };
    dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
    dialog.querySelector(".lightbox-prev").addEventListener("click", () => show(current.index - 1));
    dialog.querySelector(".lightbox-next").addEventListener("click", () => show(current.index + 1));
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => current.opener?.isConnected && current.opener.focus());
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); show(current.index - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); show(current.index + 1); }
    });
    let startX = null;
    photo.addEventListener("pointerdown", (event) => startX = event.clientX);
    photo.addEventListener("pointerup", (event) => {
      if (startX === null || current.images.length < 2) return;
      const delta = event.clientX - startX;
      if (Math.abs(delta) > 50) show(current.index + (delta < 0 ? 1 : -1));
      startX = null;
    });
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-gallery]");
      if (trigger) open(trigger.dataset.gallery, Number(trigger.dataset.index || 0), trigger);
    });
  }

  function initBento() {
    document.querySelectorAll("[data-bento-toggle]").forEach((button) => button.addEventListener("click", () => {
      const grid = document.querySelector(`[data-bento-grid="${button.dataset.bentoToggle}"]`);
      const expanded = button.getAttribute("aria-expanded") !== "true";
      grid.classList.toggle("is-expanded", expanded);
      button.setAttribute("aria-expanded", String(expanded));
      const experienceIndex = Number(button.dataset.bentoToggle.replace("experience-", ""));
      button.textContent = expanded ? "Show fewer moments" : `View all ${data.experiences[experienceIndex].gallery.length} moments`;
      if (expanded) grid.querySelectorAll(".reveal").forEach((tile) => revealObserver?.observe(tile));
    }));
  }

  let revealObserver = null;
  function initReveal() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
      return;
    }
    revealObserver = new IntersectionObserver((entries, observer) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    const sectionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle("section-in-view", entry.isIntersecting)), { rootMargin: "100px" });
    document.querySelectorAll("main section").forEach((section) => sectionObserver.observe(section));
    const heroObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle("hero-in-view", entry.isIntersecting)), { threshold: 0.05 });
    heroObserver.observe(document.querySelector("#home"));
  }

  function initNavigationAndTheme() {
    const header = document.querySelector("#site-header");
    const toggle = document.querySelector("#nav-toggle");
    const nav = document.querySelector("#nav-links");
    const closeMenu = () => { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open navigation"); };
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      nav.classList.toggle("is-open", open);
    });
    nav.addEventListener("click", (event) => { if (event.target.closest("a[href^='#']")) closeMenu(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
    let previousY = 0;
    let ticking = false;
    const progress = document.querySelector(".scroll-progress");
    const updateScroll = () => {
      const y = window.scrollY;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${range > 0 ? y / range : 0})`;
      if (y < 80 || y < previousY - 4) header.classList.remove("is-hidden");
      else if (y > previousY + 7 && y > 150) header.classList.add("is-hidden");
      previousY = y;
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(updateScroll); ticking = true; } }, { passive: true });
    const themeToggle = document.querySelector("#theme-toggle");
    const setTheme = (theme, persist = true) => {
      document.documentElement.dataset.theme = theme;
      document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#070A14" : "#F6F7FB";
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
      themeToggle.firstElementChild.innerHTML = theme === "dark" ? "&#9788;" : "&#9790;";
      if (persist) { try { localStorage.setItem("portfolio-theme", theme); } catch { /* Remembering the theme is optional. */ } }
    };
    let savedTheme = "dark";
    try { savedTheme = localStorage.getItem("portfolio-theme") || "dark"; } catch { /* Always default to dark. */ }
    const previewTheme = new URLSearchParams(location.search).get("theme");
    if (previewTheme === "dark" || previewTheme === "light") savedTheme = previewTheme;
    setTheme(savedTheme === "light" ? "light" : "dark", previewTheme !== "dark" && previewTheme !== "light");
    themeToggle.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));

    const sections = [...document.querySelectorAll("main section[id]")];
    if ("IntersectionObserver" in window) {
      const activeObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll(".nav-links a[aria-current]").forEach((link) => link.removeAttribute("aria-current"));
        document.querySelector(`.nav-links a[href='#${entry.target.id}']`)?.setAttribute("aria-current", "location");
      }), { rootMargin: "-38% 0px -54% 0px" });
      sections.forEach((section) => activeObserver.observe(section));
    }
  }

  function initParallaxAndTilt() {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = matchMedia("(pointer:fine)").matches;
    const visuals = [...document.querySelectorAll("[data-depth]")];
    const mesh = document.querySelector(".ambient-mesh");
    let mouseX = 0, mouseY = 0, raf = false;
    const move = (event) => {
      mouseX = (event.clientX / innerWidth - .5) * 2;
      mouseY = (event.clientY / innerHeight - .5) * 2;
      if (!raf) {
        raf = true;
        requestAnimationFrame(() => {
          if (!reduced && finePointer) visuals.forEach((element) => {
            const depth = Number(element.dataset.depth || 0);
            element.style.translate = `${-mouseX * depth * 180}px ${-mouseY * depth * 180}px`;
          });
          raf = false;
        });
      }
    };
    if (!reduced && finePointer) window.addEventListener("pointermove", move, { passive: true });
    if (!reduced && finePointer) document.querySelectorAll(".tilt-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const bounds = card.getBoundingClientRect();
        const rx = ((event.clientY - bounds.top) / bounds.height - .5) * -7;
        const ry = ((event.clientX - bounds.left) / bounds.width - .5) * 7;
        card.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => card.style.removeProperty("transform"));
    });
    let scrollPending = false;
    window.addEventListener("scroll", () => {
      if (reduced || scrollPending) return;
      scrollPending = true;
      requestAnimationFrame(() => {
        const y = Math.min(scrollY, innerHeight * 1.5);
        mesh.style.setProperty("--mesh-scroll", `${y * -.035}px`);
        scrollPending = false;
      });
    }, { passive: true });
    document.addEventListener("visibilitychange", () => document.documentElement.classList.toggle("page-hidden", document.hidden));
  }

  function initMagneticButtons() {
    if (matchMedia("(pointer:coarse)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll(".button").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        button.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .06}px,${(event.clientY - rect.top - rect.height / 2) * .08}px)`;
      });
      button.addEventListener("pointerleave", () => button.style.removeProperty("transform"));
    });
  }

  function initContact() {
    document.querySelector("#contact-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const fields = new FormData(event.currentTarget);
      const subject = encodeURIComponent(`Portfolio contact from ${fields.get("name")}`);
      const body = encodeURIComponent(`${fields.get("message")}\n\nReply to: ${fields.get("email")}`);
      window.location.href = `mailto:yosser.jabloun@etudiant-enit.utm.tn?subject=${subject}&body=${body}`;
    });
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    const animate = (element) => {
      const goal = Number(element.dataset.count);
      const suffix = element.dataset.suffix || "";
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) { element.textContent = `${goal}${suffix}`; return; }
      const start = performance.now();
      const duration = 950;
      const frame = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = `${Math.round(goal * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };
    if (!("IntersectionObserver" in window)) { counters.forEach(animate); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { animate(entry.target); observer.unobserve(entry.target); }
    }), { threshold: .8 });
    counters.forEach((counter) => observer.observe(counter));
  }

  function init() {
    renderProjects();
    renderExperiences();
    renderDesigns();
    renderCertificates();
    initLightbox();
    initBento();
    initNavigationAndTheme();
    initReveal();
    initCounters();
    initParallaxAndTilt();
    initMagneticButtons();
    initContact();
    document.querySelector("#year").textContent = new Date().getFullYear();
  }
  document.addEventListener("DOMContentLoaded", init, { once: true });
})();
