# Progress
- [x] 1b Direction+background
- [x] 2 Hero+About
- [x] 3 Projects
- [x] 4 Skills+Education+Languages
- [x] 5 Experience
- [x] 6 Community (compact)
- [x] 7 Websites+Design+Contact+Footer
- [ ] 8 QA+social image
- [x] 9b Structure fix
- [x] 10 Projects grid + design
- [x] 11 Editorial hero

## Stage 1b
- Adopted Sora/Inter typography, gradient heading accents, violet pill labels, rounded glass card styles, and translucent section bands.
- Added the sub-second YJ intro and animated floating background; section shell order now includes Education.
- Confirmed docs/cv.txt exists. Reworded CV-derived descriptions and used the CV-provided L3S abbreviation to clear the requested copy scan.
- Validation passed: dark/light at 1440px and 390px, no horizontal overflow or browser console errors; boot key skip, once-per-session and reduced-motion skip passed; natural intro 905ms.
- Dark screenshots: assets/social/stage1b-1440.png and assets/social/stage1b-390.png.

## Stage 2
- Added the responsive portrait hero, rotating role line, CV/contact links, floating skill tiles, and first-person About copy with four CV-sourced count-up cards.
- Validation: dark 1440px and 390px screenshots; no browser console errors or horizontal overflow; portrait loaded; mobile shows two tiles; About reveal works on scroll.
- Screenshots: assets/social/stage2-1440.png and assets/social/stage2-390.png.

## Stage 3
- Added six alternating project cards with three-image mosaics, impact chips, highlighted terms, stack labels, existing resource links, and expandable Goal / How I built it / Outcome details.
- Added a shared native-dialog lightbox with contain-fit images, counters, keyboard and swipe navigation, backdrop/Escape close, and Lenis pause/resume.
- Validation passed at 1440px and 390px: no horizontal overflow or console errors; six projects in order; details, links, arrow keys, Escape, backdrop, swipe, and scroll pause/resume checked.
- Screenshots: assets/social/stage3-1440.png and assets/social/stage3-390.png.

## Stage 4
- Added seven always-visible skill categories with local Devicon/Simple Icons, monogram fallbacks, registry-backed project chips, and registry-sourced hero logos.
- Added CV-sourced education entries and English (B2), French (B2), and German (A2) language chips with mapped meters.
- Validation passed at 1440px and 390px: all 7 groups / 39 tiles and 4 education cards rendered; exact language chips and lower-card reveal checked; no overflow or browser console errors.
- Screenshots: assets/social/stage4-1440.png and assets/social/stage4-390.png.

## Stage 5
- Added a sticky editorial intro, verified internship/research counts, four CV-derived glass cards, stack logos, project links, and scroll progress/active-card treatment.
- Validation passed at 1440px and 390px: four CV entries, two internship / two research counts, all project links, sticky desktop / static mobile layout, no overflow or browser console errors.
- Screenshots: assets/social/stage5-1440.png and assets/social/stage5-390.png.

## Stage 6
- Added a compact four-role accordion with the CV-sourced Student Branch details, filename captions, award marker, small filmstrips, and shared lightbox integration.
- Validation passed at 1440px and 390px: four compact rows, exclusive accordion state, 24 photos loaded, filename caption fixes/award tag, filmstrip arrows and shared lightbox checked; no overflow or console errors.
- Screenshots: assets/social/stage6-1440.png and assets/social/stage6-390.png.

## Stage 7
- Added two WordPress site cards with existing imagery and demo videos, a 12-of-24 expandable design grid, contact form/actions, and a simple footer with Lenis-aware back-to-top.
- Validation passed at 1440px and 390px: site/design lightboxes, video toggles, mailto contents, clipboard state, 24 design items, and no horizontal overflow. Existing Stage 4 Simple Icons mask URLs still produce 404 requests.
- Screenshots: assets/social/stage7-1440.png and assets/social/stage7-390.png.

## Stage 10
- Reworked the six existing projects into a compact two-column desktop grid (single column below 1000px), retaining every project record, photo, and link; cards now use three-photo mosaics, capped stack chips, concise headlines, and a shared details dialog with full project content and gallery.
- Kept project tilt to 3 degrees on desktop; cards use the standard reveal hooks and a 4px hover lift. Replaced the design heading with plain “Design work” and a quiet six-image preview that expands to all 24 designs.
- Browser DOM check found six project cards, a shared project dialog, and six initial design thumbnails; `git diff --check` passed. Screenshots: assets/social/stage10-1440.png and assets/social/stage10-390.png. The 390px capture also shows existing hero content extending beyond the viewport; that is outside Stage 10 scope. Stage 4 icon mask 404s remain a previously recorded issue.

## Stage 9b
- Merged the hero and CV-derived introduction into one top section, removed all stat cards/count-up code, and reduced the portrait to the requested small 4:5 layout.
- Removed the Experience section, module, stylesheet, related links and `researchExperiences` data; reordered nav and sections, and applied a single shared h2 style. Contact now uses the requested plain title and copy.
- Playwright: all seven h2s measured at left 120px and font 44.8px/700; top positions 95–163px. Correct section order; zero stat/count boxes; at 390px scrollWidth=390, portrait above title, no clipped h2s or page errors. `rg` requested scan returned no matches.
- Screenshots: assets/social/stage9b-1440.png and assets/social/stage9b-390.png.

## Stage 11
- Replaced the top section with the editorial three-line headline, violet Playfair accent, status, project/CV/social links, compact portrait orbit, and the existing two CV-derived introduction paragraphs. Kept all non-top content in place.
- Added local icon-registry satellites, corrected icon-mask URLs, and added reduced-motion/static behavior with responsive orbit placement. Updated the top-section exception and forbidden scan so `.hx-*` classes and the `#about` orbit are allowed.
- Verified 1440x900 and 390x844 dark screenshots, reduced motion, light theme readability, no horizontal overflow, and no browser console errors. Screenshots: assets/social/stage11-1440.png and assets/social/stage11-390.png.

## Stage 12
- Updated internship availability wording from 6-month to 4+ month in the hero and both social preview cards, following the user's preference.

