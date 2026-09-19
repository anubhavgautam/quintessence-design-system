# Quintessence Design System

The tokens and primitives behind [anubhavg.com](https://anubhavg.com), packaged so another page can use them. Photographs first; a tactile, neumorphic chrome that recedes; the vocabulary of the darkroom for everything that isn't a picture.

Two files, no build step, no dependencies.

| File | What it is |
| --- | --- |
| `dist/quintessence.css` | All 62 tokens for both themes, the reset, and an eleven-class kit (`.btn-neu`, `.circle`, `.pill`, `.panel`, `.well`, `.frost`, `.label`, `.numeral`, `.badge`, `.theme-toggle`, `.grain`) plus reveal-on-scroll. |
| `dist/quintessence.js` | Sets the theme before first paint (saved choice, else time of day), binds `[data-theme-toggle]`, reveals `[data-reveal]`. |
| `docs/index.html` | The design-system site — principles, design language, components, patterns, tokens, and a Getting started section. Single file; open it from disk. |
| `examples/starter.html` | A page that uses everything above, in the right order. |

## Use it

Four things in `<head>`, in this order, then one `<div>` last in `<body>`:

```html
<!-- 1. Runtime first, blocking: stamps data-theme before first paint -->
<script src="quintessence/quintessence.js"></script>

<!-- 2. The typeface: DM Sans 400 / 500 / 600 -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap">

<!-- 3. The system -->
<link rel="stylesheet" href="quintessence/quintessence.css">

<!-- 4. Your styles — read tokens, never write a value the system names -->
```

```html
<div class="grain" aria-hidden="true"></div>   <!-- 5. last child of <body> -->
```

Three ways to get the files:

- **Copy** — `cp -r dist/ your-site/quintessence/` and link with relative paths, as the starter does.
- **npm from GitHub** — `npm i github:anubhavgautam/quintessence-design-system#v1.1.0`, then `import 'quintessence-design-system/dist/quintessence.css'`.
- **CDN** — `https://cdn.jsdelivr.net/gh/anubhavgautam/quintessence-design-system@1.1.0/dist/quintessence.css` (works once this repository is public).

The full walkthrough — install order, wiring the theme switch, the kit, a worked example, and a ship checklist — is the **Getting started** section of `docs/index.html`.

## The rules, in three lines

1. **Read tokens, never values.** A hex, a millisecond, or a pixel radius lives only in `:root`.
2. **Raised means pressable.** `.btn-neu` and `.panel` do something when pressed; `.well` and `.badge` never do.
3. **Nothing competes with a photograph.** If it does, it recedes or it goes.

## Theming

Light is the default. Dark applies with `<html data-theme="dark">`, or when the OS prefers dark and nothing is stamped. The runtime stamps `light` or `dark` explicitly before paint — a saved choice wins, otherwise 18:00–05:59 is dark — so the two never disagree. Any element with `data-theme-toggle` becomes the switch; `window.Quintessence.theme` exposes `get`, `set`, `toggle`, `resolve`.

## Versioning

Tags follow semver. Token values and class names are the public API; a changed token value is a minor bump, a removed token or class is a major one. The changelog is in the docs.
