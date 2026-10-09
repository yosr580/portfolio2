const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'assets', 'vendor');
fs.mkdirSync(output, { recursive: true });
for (const [from, to] of [
  ['node_modules/gsap/dist/gsap.min.js', 'gsap.min.js'],
  ['node_modules/gsap/dist/ScrollTrigger.min.js', 'ScrollTrigger.min.js'],
  ['node_modules/lenis/dist/lenis.min.js', 'lenis.min.js'],
]) {
  fs.copyFileSync(path.join(root, from), path.join(output, to));
}
console.log('Copied pinned GSAP, ScrollTrigger, and Lenis browser bundles to assets/vendor/.');
