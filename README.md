# Daily Inspiration

A simple, lightweight static site that displays an inspirational quote and a matching image. Designed to run entirely in the browser (no backend) and deployable to GitHub Pages.

## Features

- Small, static assets: `index.html`, `css/styles.css`, `js/app.js`
- 34 curated quotes
- Quote image provided by Unsplash Source (no API key required)
- Keyboard navigation, copy-to-clipboard, accessible markup and ARIA

## Usage

1. Open `index.html` in any static host or push to GitHub Pages.
2. Live site: https://jaytjo.github.io/inspirational-quotes-website/

## Development

- Edit quotes inside `js/app.js` (the `q` array).
- Styles live in `css/styles.css`.
- To preview locally, open `index.html` or run a lightweight static server, for example:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Notes

- Images are loaded from Unsplash Source (https://source.unsplash.com) using simple query keywords derived from each quote. For deterministic/curated images, add a local `images/` folder and update `js/app.js` to point to those files.

## License

MIT
