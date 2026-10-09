\## Working rules (token budget)

\- ONE stage per session: do only the stage I name, update PROGRESS.md, commit, stop.

\- Never re-read the whole repo. Use `rg`, `sed -n 'a,bp'`, `git diff --stat`. Never print files over 150 lines.

\- Edit with small patches. New code goes in NEW small files (layout below). Do not grow big files.

\- Do NOT open the reference repo (fatma-reference). Everything needed from it is in this file.

\- Facts come ONLY from docs/cv.txt. Never open cv.png / cv.pdf. Never invent facts, dates or numbers.

\- At most 2 screenshots per stage (1440 and 390 wide, dark mode), downscaled. Skip if budget is tight.

\- Think briefly, no long plans. Final reply: max 10 lines.

\- Finish with: update PROGRESS.md, then `git add -A \&\& git commit -m "stage N: <summary>"`.



\## Stack and files

Plain HTML/CSS/JS (no React). GSAP 3.12.5 + ScrollTrigger + Lenis 1.1.20, stored locally in assets/vendor/.

index.html = static semantic shell. data.js = all content (keep existing export names; add fields).

css/: tokens.css base.css nav.css hero.css projects.css skills.css timeline.css ring.css misc.css

js/ (ES modules): main.js theme.js boot.js motion.js render.js lightbox.js hero.js projects.js skills.js timeline.js ring.js

Old style.css/script.js are archived in \_old/ (gitignored) and never read again.

Assets are under assets/ (spaces in paths must be URL-encoded). Local logos in assets/icons/.



\## Visual identity: black + violet, editorial, hairline borders

Dark is default; light toggle saved in localStorage. NO pink, rose, lime, cyan, orange anywhere.

```css

:root{ --ink:#0d0f12; --ink-2:#111419; --panel:#15181d; --panel-2:#181b20;

&#x20;--text:#f3f1fa; --muted:#9b99a8; --line:rgba(243,241,250,.15);

&#x20;--violet:#a98bff; --violet-strong:#8b6cff; --violet-soft:#c9b8ff; --on-violet:#140f24; --glow:rgba(169,139,255,.5);

&#x20;--hero-tint:#2a2142; --tone-a:#121420; --tone-b:#17132a; --tone-c:#1c1430;

&#x20;--contrast-bg:#f1eefb; --contrast-text:#15121f; --contrast-muted:#5a5670; --contrast-dot:#d6d0ea; }

:root\[data-theme="light"]{ --ink:#f6f4fb; --ink-2:#efecf8; --panel:#fff; --panel-2:#f4f1fb;

&#x20;--text:#17141f; --muted:#6b6880; --line:rgba(23,20,31,.14);

&#x20;--violet:#6d4aff; --violet-strong:#5b38ee; --violet-soft:#8f78ff; --on-violet:#fff; --glow:rgba(109,74,255,.28);

&#x20;--hero-tint:#e4dcff; --tone-a:#f1eefb; --tone-b:#ebe6fa; --tone-c:#e6e0f7;

&#x20;--contrast-bg:#14111f; --contrast-text:#f3f1fa; --contrast-muted:#a7a3bd; --contrast-dot:#2a2540; }

```

Fonts (Google Fonts, display=swap): Manrope 400-800 (headings, body), Playfair Display italic 500/600 (ONLY the one emphasized line of big headings, in var(--violet)), DM Mono 400/500 (labels, nav, dates, buttons).

Type scale: h1 clamp(54px,7.4vw,116px) lh .89 ls -.075em; h2 clamp(38px,5vw,76px) lh .98 ls -.065em; body 15px/1.7 muted; mono labels 10-11px uppercase ls .08-.14em.

Shapes: SQUARE corners, 1px var(--line) borders, flat panels; round only for buttons' arrow discs, dots, orbit, avatar. Card hover: lift 8px + violet border.

Layout: side padding clamp(22px,9vw,148px); section padding \~140px (90px mobile); paragraph max-width 450-680px. Section backgrounds alternate var(--ink), --tone-a/b/c. Skills is the ONE contrast section (--contrast-bg).

Section header (each section): mono violet kicker "01 / PROJECTS", big h2 with last words in Playfair italic violet, one-line muted subtitle. Short, human copy of my own.

Motion: Lenis lerp .09 driven by gsap.ticker. Entrances: y:30 -> 0, opacity 0 -> 1, .7s power2.out, ScrollTrigger start "top 84%", once:true. Hero intro: children rise 28px, stagger .12, .9s power3.out. Card tilt = cursor offset / 22, clamp +-5deg, desktop only. Respect prefers-reduced-motion. Hide-before-animate only with `.js \[data-reveal]{opacity:0;transform:translateY(30px)}`. Pause off-screen animations; animate transform/opacity only.



\## Page order (nav labels in brackets)

Boot loader, Hero, About+Education (About), Projects, Skills, Internships \& Research (Experience), Community \& Volunteering (Community), Websites, Design (small, last), Contact, Footer. NO Certificates section.

Nav: fixed 74px blurred topbar, mono 11px links, wordmark "YJ", theme toggle, small "CV" pill; mobile hamburger dropdown; hides on scroll down.



\## Content rules

Profile photo = small avatar (88-96px circle, 2px violet ring), natural color, only in the hero chip. Favicon = "YJ" monogram on violet gradient, never my photo. German level exactly as in cv.txt. No Red Crescent. IEEE roles: Student Branch Chair (2025); Educational Activities Committee Member, IEEE Tunisia Section (Mar 2026 - Present); Coordination Committee Chair, IEEE YP Tunisia Taskforce (Apr 2026 - Present); PES YP (exact title from cv.txt). Student Branch photo captions are generated from file names (strip extension, title-case, fix "tehnical"->"technical", "contineous"->"continuous", generic caption for numeric names).

Skills to show with logos: Hugging Face, Groq, Ollama, LLaMA, Gemma, DeepSeek, TensorFlow, PyTorch, Scikit-learn, Keras, Python, NumPy, Pandas, Jupyter, MATLAB, HTML5, CSS3, Streamlit, .NET, MySQL, PostgreSQL, SQLite, Git, GitHub, Docker, Linux, Bash, LaTeX + existing ones (C/C++, OpenCV, MediaPipe, React, FastAPI, Redis, WordPress, Arduino, STM32).



\## Never

Copy anything from the reference repo (GPL, personal content). Add mono numbered labels beyond the kickers above. Use !important hacks. Leave horizontal scroll at 360-1920px. Hotlink icons.


## DIRECTION v2 (overrides earlier rules)
Goal: black + violet, premium, and clearly DIFFERENT from the reference portfolio. Keep only: dark base with violet glow, Lenis + GSAP entrance choreography (y 30 -> 0, .7s power2.out, ScrollTrigger start "top 84%", once), photo mosaics in project cards, expandable project details, card tilt on hover.
Palette: keep tokens.css. REMOVE the light "contrast" skills section idea; every section stays dark (light theme still available via toggle).
Typography: headings Sora 600/700, letter-spacing -.035em (never below -.04em), line-height 1.05; body Inter 16px/1.7. Section labels are small violet PILL badges (Inter 600 12px), NO numbering ("01 /"), NO uppercase mono micro-labels. Emphasis words in headings use a violet gradient text (linear-gradient(120deg,#c9b8ff,#8b6cff), background-clip:text), NOT serif italic. Remove Playfair Display and DM Mono imports. JetBrains Mono allowed only for tiny date chips.
Shapes: rounded glass cards (radius 18px, background rgba(255,255,255,.04), 1px border var(--line), backdrop-filter blur(10px), soft violet shadow). Buttons fully rounded.
FORBIDDEN (the reference's signature elements): boot screen with "Loading..." lines, orbit hero, node-button skills map, polaroids, 3D rotating ring carousel, terminal-style contact, achievement toasts, "repository index", scroll-to-explore cue, serif italic accent, sharp square cards, mono numbered kickers.
FORBIDDEN WORDS/PHRASES in my copy: "Ideas that", "Work with a pulse", "constellation", "Enter the system", "mission", "capabilit", "journey log", "open channel", "something with signal", "built with intention", "curious human", "field note", "Loading AI Engine", "Loading Cloud Stack", "A record of", "The path stays in motion", "Hover a node", "initiate_conversation", "FATMA". All headings/subtitles/labels are my own words.
Page order: Hero (with my portrait), About (intro + facts), Projects (the visual star), Skills (logos), Education & Languages (logos), Experience (Internships & Research), Community (compact, deliberately LESS prominent than projects), Websites, Design (small), Contact, Footer. Nav: About, Projects, Skills, Education, Experience, Community, Websites, Design, Contact + theme toggle + CV pill. No Certificates.
Always-on background: a fixed floating layer (soft drifting violet blobs + small floating shapes) behind all content. Section backgrounds must therefore be transparent or semi-transparent bands, never opaque blocks.

## DIRECTION v3
Order: top section (hero + about merged, id about), Skills, Education & Languages, Projects, Community (compact), Websites, Design (quiet content), Contact, Footer.
NO Experience/Internships section anywhere. NO stat/number boxes anywhere: numbers are written inside sentences.
Every section title (h2) uses ONE shared header style, size and position. Portrait is small (max about 200px wide).
