# Michael Pretti — Resume

Personal résumé site: https://mpretti.github.io/resume/

A static HTML and CSS page with no build step, JavaScript, external fonts, or runtime dependencies. The “More experience” section uses native HTML disclosure. It works on mobile and includes print styles.

## Editing

- `index.html`: résumé content and metadata.
- `styles.css`: layout, typography, responsive rules, and print styles.
- `favicon.svg` and `manifest.json`: browser identity.

Serve this directory with any static HTTP server to preview it. Check desktop and mobile layouts, keyboard navigation, section links, and the experience disclosure before publishing. Expand “More experience” before printing if you want those roles included.

GitHub Pages deployment is configured in `.github/workflows/deploy.yml` and runs on pushes to `main`.

Existing PDF/HTML résumé exports and image assets remain in the repository as separate files; they are not generated from the website.
