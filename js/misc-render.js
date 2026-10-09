import "../data.js";
import { openLightbox } from "./lightbox.js";

const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const assetUrl = (path) => String(path ?? "").split("/").map(encodeURIComponent).join("/");
const email = "yosser.jabloun@etudiant-enit.utm.tn";
export function buildContactMailto(name, sender, message) {
  const subject = `Portfolio message from ${String(name ?? "").trim()}`;
  const body = `Hi Yosr,\n\n${String(message ?? "").trim()}\n\n${String(name ?? "").trim()}\n${String(sender ?? "").trim()}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const websites = [
  {
    id: "ieee-enit", title: "IEEE ENIT Student Branch", url: "http://enit.ieee.tn/", displayUrl: "enit.ieee.tn",
    description: "Designed and developed the official WordPress website for the IEEE ENIT Student Branch, as part of the Student Branch Chair role in 2025.",
    images: ["assets/social/site-ieee-website.jpg", "assets/volunteering/student branch chair/community building.webp", "assets/volunteering/student branch chair/hackathons.webp"],
    captions: ["IEEE ENIT Student Branch website", "Student Branch community building", "Student Branch hackathons"],
    video: "assets/videos/wp-project-ieee-enit.mp4"
  },
  {
    id: "education-week", title: "IEEE Education Week Tunisia", url: "https://educationweek.ieee.tn/", displayUrl: "educationweek.ieee.tn",
    description: "Developed the IEEE Education Week Tunisia website in collaboration with IEEE Tunisia Section, as part of the Educational Activities Committee within the Technical Activities Committee.",
    images: ["assets/volunteering/IEEE Education week in tunisia/eduweek.webp", "assets/volunteering/IEEE Education week in tunisia/20260419_180524.webp", "assets/volunteering/IEEE Education week in tunisia/IMG_0706.webp"],
    captions: ["IEEE Education Week website", "IEEE Education Week Tunisia", "IEEE Education Week event"],
    video: "assets/videos/wp-project-edu-week.mp4"
  }
];

function renderWebsite(site) {
  const [main, ...thumbs] = site.images;
  const mainButton = `<button class="website-main-shot" type="button" data-site-photo="0" aria-label="Open ${esc(site.captions[0])}"><img src="${esc(assetUrl(main))}" alt="${esc(site.captions[0])}" loading="lazy"></button>`;
  const thumbnails = thumbs.map((path, index) => `<button class="website-thumb" type="button" data-site-photo="${index + 1}" aria-label="Open ${esc(site.captions[index + 1])}"><img src="${esc(assetUrl(path))}" alt="${esc(site.captions[index + 1])}" loading="lazy"><span>${esc(site.captions[index + 1])}</span></button>`).join("");
  return `<article class="website-card glass-card" data-reveal data-website="${esc(site.id)}">
    <div class="website-media"><div class="browser-frame"><div class="browser-chrome"><span class="browser-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="browser-url">${esc(site.displayUrl)}</span></div>${mainButton}</div><div class="website-thumbnails">${thumbnails}</div></div>
    <div class="website-copy"><span class="website-type">WordPress</span><h3>${esc(site.title)}</h3><p>${esc(site.description)}</p><details class="website-demo"><summary>Watch demo</summary><video controls preload="none" poster="${esc(assetUrl(main))}"><source src="${esc(assetUrl(site.video))}" type="video/mp4">Your browser does not support embedded video.</video></details><a class="button website-visit" href="${esc(site.url)}" target="_blank" rel="noopener noreferrer">Visit site <span aria-hidden="true">&#8599;</span></a></div>
  </article>`;
}
function renderDesigns(paths) {
  const section = document.querySelector("#design");
  const head = section?.querySelector(".section-head");
  if (!section || !head) return;
  section.classList.add("design-section");
  const title = head.querySelector(".section-title");
  if (title) title.innerHTML = 'Visual ideas, <span class="gradient-text">made tangible.</span>';
  let grid = section.querySelector(".design-grid");
  if (!grid) { grid = document.createElement("div"); grid.className = "design-grid container"; head.insertAdjacentElement("afterend", grid); }
  const shown = Number(grid.dataset.shown || 12);
  const captions = paths.map((_, index) => `Design ${String(index + 1).padStart(2, "0")}`);
  grid.innerHTML = paths.slice(0, shown).map((path, index) => `<button class="design-thumb" type="button" data-design-index="${index}" aria-label="Open ${captions[index]}"><img src="${esc(assetUrl(path))}" alt="${captions[index]}" loading="lazy"></button>`).join("");
  grid.dataset.shown = String(Math.min(shown, paths.length));
  section.querySelector(".design-more")?.remove();
  if (paths.length > 12) {
    const more = document.createElement("button"); more.className = "button button-outline design-more"; more.type = "button";
    more.textContent = shown >= paths.length ? "Show fewer designs" : "Show all designs";
    more.addEventListener("click", () => { grid.dataset.shown = shown >= paths.length ? "12" : String(paths.length); renderDesigns(paths); });
    grid.insertAdjacentElement("afterend", more);
  }
  grid.querySelectorAll(".design-thumb").forEach((button) => button.addEventListener("click", () => openLightbox(paths.map(assetUrl), Number(button.dataset.designIndex), captions)));
}
function renderContact() {
  const section = document.querySelector("#contact");
  const head = section?.querySelector(".section-head");
  if (!section || !head) return;
  head.classList.add("contact-head");
  const title = head.querySelector(".section-title");
  const intro = head.querySelector(".section-intro");
  if (title) title.innerHTML = "Let's talk about <span class=\"gradient-text\">your next project.</span>";
  if (intro) intro.textContent = "For internships, research, or collaboration, leave me a note.";
  section.querySelector(".contact-card")?.remove();
  const card = document.createElement("div"); card.className = "contact-card glass-card container"; card.dataset.reveal = "";
  card.innerHTML = `<form class="contact-form"><div class="contact-fields"><label>Name<input name="name" autocomplete="name" required></label><label>Email<input name="email" type="email" autocomplete="email" required></label><label class="contact-message">Message<textarea name="message" rows="4" required></textarea></label></div><button class="button button-primary" type="submit">Send message</button></form><div class="contact-actions"><a class="button button-outline" href="assets/cv.pdf" download>Download CV</a><a class="button button-outline" href="https://www.linkedin.com/in/yosr-jabloun-232421333" target="_blank" rel="noopener noreferrer">LinkedIn</a><a class="button button-outline" href="https://github.com/yosr580" target="_blank" rel="noopener noreferrer">GitHub</a><a class="button button-outline" href="tel:+21629469140">Phone</a><button class="button button-ghost copy-email" type="button">Copy email</button></div>`;
  head.insertAdjacentElement("afterend", card);
  card.querySelector(".contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const sender = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    window.location.href = buildContactMailto(name, sender, message);
  });
  card.querySelector(".copy-email").addEventListener("click", async (event) => {
    const button = event.currentTarget;
    try { await navigator.clipboard.writeText(email); }
    catch {
      const input = document.createElement("textarea"); input.value = email; input.style.position = "fixed"; input.style.opacity = "0"; document.body.append(input); input.select(); document.execCommand("copy"); input.remove();
    }
    button.textContent = "Copied"; button.setAttribute("aria-live", "polite");
    setTimeout(() => { button.textContent = "Copy email"; button.removeAttribute("aria-live"); }, 1600);
  });
}
function renderFooter() {
  const footer = document.querySelector(".site-footer");
  const inner = footer?.querySelector(".footer-inner");
  if (!inner) return;
  inner.innerHTML = `<a class="footer-name" href="#about">Yosr Jabloun</a><p class="footer-tagline">Engineering, research, and community, one question at a time.</p><a class="footer-top" href="#top">Back to top</a>`;
  inner.querySelector(".footer-top").addEventListener("click", (event) => {
    event.preventDefault();
    if (window.lenis) window.lenis.scrollTo(0); else window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
function initWebsiteGalleries(section) {
  section.querySelectorAll(".website-card").forEach((card, index) => {
    const site = websites[index];
    card.querySelectorAll("[data-site-photo]").forEach((button) => button.addEventListener("click", () => openLightbox(site.images.map(assetUrl), Number(button.dataset.sitePhoto), site.captions)));
    const demo = card.querySelector(".website-demo");
    const video = demo.querySelector("video");
    video.addEventListener("play", (event) => { document.querySelectorAll(".website-demo video").forEach((other) => { if (other !== event.currentTarget) other.pause(); }); });
    demo.addEventListener("toggle", () => { if (!demo.open) video.pause(); });
  });
}
export function initMiscSections() {
  const websiteSection = document.querySelector("#websites");
  const websiteHead = websiteSection?.querySelector(".section-head");
  if (websiteSection && websiteHead) {
    websiteSection.querySelector(".website-grid")?.remove();
    const grid = document.createElement("div"); grid.className = "website-grid container"; grid.innerHTML = websites.map(renderWebsite).join("");
    websiteHead.insertAdjacentElement("afterend", grid); initWebsiteGalleries(grid);
  }
  renderDesigns(window.portfolioData?.designs ?? []);
  renderContact(); renderFooter();
}
