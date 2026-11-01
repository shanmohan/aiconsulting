# Inai — Partners in AI

Marketing site for Inai, an AI consulting partner. Plain HTML, CSS and JavaScript — no build step.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The single-page site |
| `styles.css` | Theme (dark tech, violet → teal) and layout |
| `script.js` | Nav, scroll-spy, reveal animations, contact form |
| `favicon.svg` | Browser-tab icon (bridge mark) |
| `serve.ps1` | Optional local preview server for Windows |

## Preview locally

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```

Then open http://localhost:5173.

## Hosting

Served by GitHub Pages from the `main` branch root. `.nojekyll` tells Pages to serve the files as-is.

## Before launch

- Replace the sample outcome figures and case studies in the **Outcomes** section.
- Connect the contact form to a form service (e.g. Formspree) — it currently opens the visitor's email app.
- Update the LinkedIn link and the `hello@inai.ai` address.
