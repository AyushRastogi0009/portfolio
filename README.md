# Ayush Rastogi: Portfolio

Angular portfolio with a Three.js background of floating code windows.

## Run it

```bash
npm install
npm start          # http://localhost:4200
```

## Build for production

```bash
npm run build      # output in dist/ayush-portfolio/browser
```

The output is plain static files. Upload the `browser` folder to GitHub Pages, Netlify, Vercel or any static host.

## Edit the content

All text lives in one file: `src/app/data/portfolio.data.ts`.
Change the intro, projects, skills, achievements or contact details there. No template changes are needed.

The code shown inside the floating windows is in `src/app/scene/code-snippets.ts`.

## Structure

```
src/
  styles.css                  design tokens and shared styles
  index.html                  fonts and page metadata
  app/
    app.ts / app.html         page shell
    data/portfolio.data.ts    all content
    services/scroll-spy.ts    scroll progress and active section
    scene/                    3D background (Three.js)
      scene.ts                canvas component
      code-scene.ts           the scene itself
      code-snippets.ts        text drawn on the windows
    side-nav/                 dot navigation on the right
    hero/  experience/  projects/  skills/  achievements/  contact/
```

## Notes

- Built with Angular (standalone components, signals, zoneless) and Three.js.
- Fonts (Bricolage Grotesque, IBM Plex Sans and Mono) load from Google Fonts at runtime.
- If WebGL is not available the 3D background is hidden and the page works as normal.
- `prefers-reduced-motion` stops the 3D animation.
