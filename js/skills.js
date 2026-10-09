import "../data.js";

const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const img = (key, label = key) => ({ type: "img", src: `assets/icons/${key}.svg`, label });
const mask = (slug, label) => ({ type: "mask", src: `assets/icons/si-${slug}.svg`, label });
const mono = (text, label) => ({ type: "mono", text, label });
export const ICONS = {
  huggingface: mask("huggingface", "Hugging Face"), groq: mono("Gq", "Groq"), ollama: mask("ollama", "Ollama"), llama: mono("L", "LLaMA"), gemma: mono("Ge", "Gemma"), deepseek: mask("deepseek", "DeepSeek"),
  tensorflow: img("tensorflow", "TensorFlow"), pytorch: img("pytorch", "PyTorch"), scikitlearn: img("scikitlearn", "Scikit-learn"), keras: img("keras", "Keras"), opencv: img("opencv", "OpenCV"), mediapipe: mask("mediapipe", "MediaPipe"),
  python: img("python", "Python"), numpy: img("numpy", "NumPy"), pandas: img("pandas", "Pandas"), jupyter: img("jupyter", "Jupyter"), matlab: img("matlab", "MATLAB"), cplusplus: img("cplusplus", "C/C++"),
  html5: img("html5", "HTML5"), css3: img("css3", "CSS3"), streamlit: img("streamlit", "Streamlit"), dotnetcore: img("dotnetcore", ".NET"), react: img("react", "React"), fastapi: img("fastapi", "FastAPI"), wordpress: img("wordpress", "WordPress"),
  mysql: img("mysql", "MySQL"), postgresql: img("postgresql", "PostgreSQL"), sqlite: img("sqlite", "SQLite"), redis: img("redis", "Redis"),
  git: img("git", "Git"), github: { ...img("github", "GitHub"), invertDark: true }, docker: img("docker", "Docker"), linux: img("linux", "Linux"), bash: img("bash", "Bash"), latex: img("latex", "LaTeX"),
  arduino: img("arduino", "Arduino"), stm32: mono("32", "STM32"), fiberoptics: mono("FO", "Fiber Optics"), ccna: mono("NW", "Networking / CCNA fundamentals"),
  ai: mono("AI", "AI"), tsl: mono("TSL", "TSL"), tts: mono("TTS", "TTS"), cnn: mono("CNN", "CNN"), videomae: mono("VM", "VideoMAE"), tensorflowjs: img("tensorflow", "TensorFlow.js"), smtp: mono("SMTP", "SMTP"), reportlab: mono("RL", "ReportLab"), ssfm: mono("SF", "SSFM"), photonics: mono("PH", "Photonics")
};
export function getIcon(key) { return ICONS[key] ?? mono(String(key).slice(0, 2).toUpperCase(), String(key)); }
export function iconMarkup(key, variant = "skill") {
  const icon = getIcon(key);
  if (icon.type === "img") return `<img class="icon-img"${icon.invertDark ? ' data-invert-dark="true"' : ""} src="${esc(icon.src)}" alt="" loading="lazy">`;
  if (icon.type === "mask") return `<span class="ico-mask" style="--src:url('${esc(icon.src)}')" aria-hidden="true"></span>`;
  return `<span class="ico-mono" aria-hidden="true">${esc(icon.text)}</span>`;
}
function renderSkills() {
  const section = document.querySelector("#skills");
  const head = section?.querySelector(".section-head");
  const data = window.portfolioData?.skills;
  if (!section || !head || !Array.isArray(data)) return;
  section.querySelector(".skills-grid")?.remove();
  const grid = document.createElement("div"); grid.className = "skills-grid container";
  grid.innerHTML = data.map((category) => `<article class="skill-card glass-card" data-reveal><h3>${esc(category.category)}</h3><p>${esc(category.description)}</p><div class="skill-tiles">${category.items.map((key) => { const item = getIcon(key); return `<div class="skill-tile" tabindex="0" aria-label="${esc(item.label)}">${iconMarkup(key)}<span>${esc(item.label)}</span></div>`; }).join("")}</div></article>`).join("");
  head.insertAdjacentElement("afterend", grid);
}
function meter(level) {
  const filled = ({ A1: 1, A2: 2, B1: 3, B2: 3.5, C1: 4, C2: 5, Native: 5, Fluent: 4 })[level];
  if (!filled) return "";
  return `<span class="language-meter" role="img" aria-label="${filled} of 5 proficiency markers">${[1,2,3,4,5].map((n) => `<i class="${n <= Math.floor(filled) ? "is-filled" : n - 0.5 === filled ? "is-half" : ""}"></i>`).join("")}</span>`;
}
function renderEducation() {
  const section = document.querySelector("#education");
  const head = section?.querySelector(".section-head");
  const { education = [], languages = [] } = window.portfolioData ?? {};
  if (!section || !head) return;
  section.querySelector(".education-layout")?.remove();
  const layout = document.createElement("div"); layout.className = "education-layout container";
  layout.innerHTML = `<div class="education-list">${education.map((item) => `<article class="education-card glass-card" data-reveal><div class="education-mark">${item.logo ? `<img src="${esc(item.logo)}" alt="${esc(item.alt)}" loading="lazy">` : `<span>${esc(item.monogram)}</span>`}</div><div class="education-copy"><p class="education-date">${esc(item.dates)}</p><h3>${esc(item.degree)}</h3><p class="education-institution">${esc(item.institution)}</p><p class="education-detail">${esc(item.detail)}</p></div></article>`).join("")}</div><aside class="languages-card glass-card" data-reveal><h3>Languages</h3><div class="language-list">${languages.map((item) => `<div class="language-row"><span class="language-name">${esc(item.name)}</span><span class="language-level">${esc(item.level)}</span>${meter(item.level)}</div>`).join("")}</div></aside>`;
  head.insertAdjacentElement("afterend", layout);
}
export function initSkills() {
  renderSkills(); renderEducation();
  const heroKeys = { "hero-tile-pytorch": "pytorch", "hero-tile-tensorflow": "tensorflow", "hero-tile-python": "python", "hero-tile-opencv": "opencv" };
  document.querySelectorAll(".hero-tile").forEach((tile) => {
    const key = Object.keys(heroKeys).find((className) => tile.classList.contains(className));
    const icon = key && ICONS[heroKeys[key]]; const image = tile.querySelector("img");
    if (icon && image) image.src = icon.src;
  });
}
