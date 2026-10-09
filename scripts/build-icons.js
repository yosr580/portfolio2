const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const output = path.join(root, "assets", "icons");
const deviconNames = [
  "arduino", "bash", "cplusplus", "css3", "docker", "dotnetcore", "fastapi", "git", "github",
  "html5", "jupyter", "keras", "latex", "linux", "matlab", "mysql", "numpy", "opencv", "pandas",
  "postgresql", "python", "pytorch", "react", "redis", "scikitlearn", "sqlite", "streamlit",
  "tensorflow", "wordpress"
];
const simpleIconNames = ["deepseek", "huggingface", "mediapipe", "ollama"];
fs.mkdirSync(output, { recursive: true });
for (const name of deviconNames) {
  const source = path.join(root, "node_modules", "devicon", "icons", name, `${name}-original.svg`);
  if (!fs.existsSync(source)) throw new Error(`Missing devicon source: ${name}`);
  fs.copyFileSync(source, path.join(output, `${name}.svg`));
}
for (const name of simpleIconNames) {
  const source = path.join(root, "node_modules", "simple-icons", "icons", `${name}.svg`);
  if (!fs.existsSync(source)) throw new Error(`Missing simple-icons source: ${name}`);
  fs.copyFileSync(source, path.join(output, `si-${name}.svg`));
}
console.log(`Copied ${deviconNames.length + simpleIconNames.length} local icons.`);
