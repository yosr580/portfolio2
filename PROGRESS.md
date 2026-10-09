# Portfolio Progress

- [x] 0 Audit + checkpoint
- [ ] 1 Foundation (tokens, theme, nav, boot, motion)
- [ ] 2 Hero
- [ ] 3 Projects (+ lightbox)
- [ ] 4 Skills
- [ ] 5 Internships & Research
- [ ] 6 Community ring carousel
- [ ] 7 Websites, Design, Contact, Footer
- [ ] 8 Social images + final QA

## Notes / decisions
- Stage 0 audit completed. Existing checkpoint: `90cbdfb` (`checkpoint before redesign stages`); working tree was clean.
- Current implementation is a root-level static HTML/CSS/JS site (`index.html`, `style.css`, `script.js`, `data.js`, `motion.js`), not yet split into the planned `css/` and `js/` modules.
- Local GSAP 3.12.5, ScrollTrigger, and Lenis assets are present under `assets/vendor/`; local skill logo SVGs and project/media assets are present.
- The page currently orders Skills before Projects and has Education as its own section. Planned order groups About with Education and places Projects before Skills.
- Use `assets/cv.txt` as the sole source for personal facts. It lists German as A2.

## Known issues
- The current page lists German B1 in `index.html`; this conflicts with `assets/cv.txt` (German A2).
- Existing site files include the archived implementation and are substantially larger than the planned small-module layout; stage work should migrate in bounded pieces.
- No `PROGRESS.md` existed at audit time.
