const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "assets", "icons");
const deviconNames = [
  "python", "numpy", "pandas", "jupyter", "matlab", "tensorflow", "pytorch",
  "scikitlearn", "keras", "html5", "css3", "dotnetcore", "mysql",
  "postgresql", "sqlite", "mongodb", "git", "github", "docker", "linux",
  "bash", "react", "fastapi", "redis", "wordpress", "arduino", "opencv",
  "cplusplus", "angularjs", "nodejs", "streamlit", "latex"
];
const simpleIconNames = [
  "huggingface", "ollama", "meta", "deepseek", "streamlit", "latex",
  "mediapipe", "googlegemini"
];

fs.mkdirSync(output, { recursive: true });
function copyFirst(paths, destination, label) {
  const source = paths.find((candidate) => fs.existsSync(candidate));
  if (!source) {
    console.warn(`missing icon source: ${label}`);
    return false;
  }
  fs.copyFileSync(source, path.join(output, destination));
  return true;
}

for (const name of deviconNames) {
  const dir = path.join(root, "node_modules", "devicon", "icons", name);
  copyFirst([
    path.join(dir, `${name}-original.svg`),
    path.join(dir, `${name}-plain.svg`),
    path.join(dir, `${name}-original-wordmark.svg`),
    path.join(dir, `${name}-plain-wordmark.svg`)
  ], `${name}.svg`, `devicon:${name}`);
}
for (const name of simpleIconNames) {
  copyFirst([
    path.join(root, "node_modules", "simple-icons", "icons", `${name}.svg`)
  ], `si-${name}.svg`, `simple-icons:${name}`);
}
console.log(`Copied local skill icons to ${path.relative(root, output)}`);
