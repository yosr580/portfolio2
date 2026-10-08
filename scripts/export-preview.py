"""Capture portfolio sections and export 1x, 2x, and feed-size social previews."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from PIL import Image
from threading import Thread
from functools import partial
import contextlib

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
SOCIAL = ROOT / "assets" / "social"


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


@contextlib.contextmanager
def serve_local_site():
    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(ROOT)))
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield server.server_port
    finally:
        server.shutdown()
        thread.join()
        server.server_close()


def wait_for_images(locator):
    locator.evaluate("""async node => {
      const images = [...node.querySelectorAll('img')];
      images.forEach(image => image.loading = 'eager');
      await Promise.all(images.map(image => image.complete ? Promise.resolve() : new Promise(resolve => {
        image.addEventListener('load', resolve, {once:true});
        image.addEventListener('error', resolve, {once:true});
      })));
      await document.fonts.ready;
    }""")


def main():
    SOCIAL.mkdir(parents=True, exist_ok=True)
    with serve_local_site() as port, sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Keep raster favicons in sync with the violet YJ SVG mark.
        for size, filename in [(32, "favicon-32.png"), (180, "apple-touch-icon.png")]:
            favicon = browser.new_page(viewport={"width": size, "height": size}, device_scale_factor=1)
            favicon.set_content(f'<img src="http://127.0.0.1:{port}/assets/favicon.svg" width="{size}" height="{size}" alt="YJ">')
            favicon.locator("img").wait_for(state="visible")
            favicon.locator("img").screenshot(path=str(ROOT / "assets" / filename), type="png")
            favicon.close()
        page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        page.emulate_media(reduced_motion="reduce")
        page.goto(f"http://127.0.0.1:{port}/", wait_until="domcontentloaded")
        page.wait_for_selector("#project-list .project-card")
        # Capture selected project visuals using screenshots without report covers.
        for filename, output in [("encyclopedia.webp", "site-world-models.jpg"), ("dash.webp", "site-world-models-dash.jpg")]:
            asset_page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
            asset_page.goto(f"http://127.0.0.1:{port}/assets/talan%20summer/{filename}", wait_until="load")
            wait_for_images(asset_page.locator("body"))
            asset_page.locator("img").screenshot(path=str(SOCIAL / output), type="jpeg", quality=91)
            asset_page.close()
        fiber_page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        fiber_page.goto(f"http://127.0.0.1:{port}/assets/project-fiberlaser-3.webp", wait_until="load")
        wait_for_images(fiber_page.locator("body"))
        fiber_page.locator("img").screenshot(path=str(SOCIAL / "site-fiberlaser.jpg"), type="jpeg", quality=91)
        fiber_page.close()
        e_learnit = page.locator("#project-list .project-card").nth(1)
        e_learnit.scroll_into_view_if_needed()
        wait_for_images(e_learnit)
        e_learnit.screenshot(path=str(SOCIAL / "site-the-one.jpg"), type="jpeg", quality=90)
        skills = page.locator("#skills .skill-group").first
        skills.scroll_into_view_if_needed()
        wait_for_images(skills)
        skills.screenshot(path=str(SOCIAL / "site-skills.jpg"), type="jpeg", quality=88)

        card = browser.new_page(viewport={"width": 1080, "height": 1350}, device_scale_factor=1)
        card.goto(f"http://127.0.0.1:{port}/assets/social/preview-card.html", wait_until="domcontentloaded")
        card.evaluate("document.fonts.ready")
        wait_for_images(card.locator(".card"))
        card.screenshot(path=str(SOCIAL / "portfolio-preview.png"), type="png")
        # Lossless recompression keeps screenshot detail intact while reducing file size.
        preview_path = SOCIAL / "portfolio-preview.png"
        preview = Image.open(preview_path).convert("RGB")
        preview.save(preview_path, format="PNG", optimize=True, compress_level=9)
        # Double device pixel ratio keeps the same CSS composition and produces 2160 x 2700.
        await_dpr_two = browser.new_page(viewport={"width": 1080, "height": 1350}, device_scale_factor=2)
        await_dpr_two.goto(f"http://127.0.0.1:{port}/assets/social/preview-card.html", wait_until="domcontentloaded")
        await_dpr_two.evaluate("document.fonts.ready")
        wait_for_images(await_dpr_two.locator(".card"))
        temp_2x = SOCIAL / "portfolio-preview-2x.png"
        await_dpr_two.screenshot(path=str(temp_2x), type="png")
        temp_2x.replace(SOCIAL / "portfolio-preview@2x.png")
        one_x = Image.open(SOCIAL / "portfolio-preview.png").convert("RGB")
        one_x.resize((500, 625), Image.Resampling.LANCZOS).save(SOCIAL / "portfolio-preview-500.png", format="PNG", optimize=True)
        browser.close()

    print("Exported assets/social/portfolio-preview.png (1080x1350)")
    print("Exported assets/social/portfolio-preview@2x.png (2160x2700)")
    print("Exported assets/social/portfolio-preview-500.png (500x625)")


if __name__ == "__main__":
    main()
