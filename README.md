# dqcss

A small CSS library with a BIOS-screen look: VGA blue and cyan, square corners, 2px borders and hard drop shadows with no blur. Source lives in `src/` as plain CSS; `npm run build` bundles it to `dist/` with Lightning CSS.

## Usage

```html
<link rel="stylesheet" href="node_modules/dqcss/dist/dqcss.min.css">
<button class="dq-btn dq-btn--primary">Click</button>
```

Text uses IBM Plex Mono if you load it (the demo does, from Google Fonts) and falls back to your system monospace. Change it with `--dq-font-base`.

## Components

| Component | Classes |
| --- | --- |
| Button | `.dq-btn`, `--primary`, `--secondary`. Sinks toward its shadow on hover/press, with scrolling halftone dots |
| Panel | `.dq-panel`, `--checker`, `__body`, `__title` (cyan title bar) |
| Input | `.dq-input` (also `textarea`/`select`), `.dq-field` with `__label`, `__hint`, `--error`. `aria-invalid="true"` shows the error border |
| Checkbox / radio | `.dq-check`, `.dq-radio` on native inputs, `.dq-choice` label wrapper |
| Alert | `.dq-alert`, `--success`, `--warning`, `--danger`, `__title` |
| Progress | `.dq-progress` on a native `<progress>`, `--secondary`, `--success`, `--warning`, `--danger`. Omit `value` for indeterminate |
| Badge | `.dq-badge`, `--secondary`, `--success`, `--warning`, `--danger`, `--solid`, `--halftone` |
| Menu | `.dq-menu` with `.dq-menu__item`. `aria-selected="true"` shows the cyan selection bar |
| Modal | `.dq-modal` on a native `<dialog>` (open with `showModal()`), `.dq-modal__actions`. Use `<form method="dialog">` for buttons that close it |

Layout helpers: `.dq-container`, `.dq-stack`, `.dq-row`.

### Menu keyboard support (optional)

The menu is styled by CSS alone. Add the script for arrow keys, Home/End, Enter/Space selection and a `dq-select` event:

```html
<script src="node_modules/dqcss/dist/dqcss-menu.js"></script>
```

## Theming

Dark mode follows the OS. Set `data-theme="light"` or `"dark"` on `<html>` to force one. Everything is driven by `--dq-*` custom properties in `src/tokens.css`: colors (`--dq-color-*`), border width, shadow offset and color, halftone and checker sizes.

Cyan text is not readable on light backgrounds, so `--dq-color-secondary` is always paired with black (`--dq-color-secondary-fg`).

## Development

```sh
npm install
npm run build
npm run dev   # then open /docs/index.html
```

## Structure

- `src/tokens.css`: design tokens (dark mode via `prefers-color-scheme` or `data-theme`)
- `src/base/`: reset and element defaults
- `src/components/`: `.dq-*` component classes with BEM-style modifiers
- `src/utilities/`: layout helpers
- `src/js/`: optional scripts
- `src/index.css`: entry point; add new files here
