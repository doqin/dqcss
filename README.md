# dqcss

A small CSS library with a BIOS-screen look: VGA blue and cyan, square corners, 2px borders and hard drop shadows with no blur. Source lives in `src/` as plain CSS; `npm run build` bundles it to `dist/` with Lightning CSS.

## Usage

```html
<link rel="stylesheet" href="node_modules/@doqin/dqcss/dist/dqcss.min.css">
<button class="dq-btn dq-btn--primary">Click</button>
```

Text uses IBM Plex Mono if you load it (the demo does, from Google Fonts) and falls back to your system monospace. Change it with `--dq-font-base`.

## Components

| Component | Classes |
| --- | --- |
| Button | `.dq-btn`, `--primary`, `--secondary`. Sinks toward its shadow on hover/press, with scrolling halftone dots |
| Panel | `.dq-panel`, `--checker`, `__body`, `__title` (cyan title bar) |
| Input | `.dq-input` (also `textarea`), `.dq-select` on a native `<select>` with a blocky arrow, `.dq-field` with `__label`, `__hint`, `--error`. `aria-invalid="true"` shows the error border |
| Checkbox / radio | `.dq-check`, `.dq-radio` on native inputs, `.dq-choice` label wrapper |
| Switch | `.dq-switch` on a native checkbox with `role="switch"`, inside `.dq-choice`. Cyan track when on |
| Fieldset | `.dq-fieldset` on a `<fieldset>` with a `<legend>`, which becomes a cyan label on the top border. Use it to group related inputs, such as a radio set |
| Alert | `.dq-alert`, `--success`, `--warning`, `--danger`, `__title` |
| Progress | `.dq-progress` on a native `<progress>`, `--secondary`, `--success`, `--warning`, `--danger`. Omit `value` for indeterminate |
| Badge | `.dq-badge`, `--secondary`, `--success`, `--warning`, `--danger`, `--solid`, `--halftone` |
| Menu | `.dq-menu` with `.dq-menu__item`. `aria-selected="true"` shows the cyan selection bar |
| Tabs | `.dq-tabs` with `__list`, `__tab` (`role="tab"`) and `__panel` (`role="tabpanel"`). The selected tab is cyan and joins its panel. Needs `dqcss-tabs.js` to switch |
| Table | `.dq-table` on a `<table>`, `--striped`, `.dq-table__num` for right-aligned numbers, `.dq-table-wrap` for horizontal scroll. Header row is cyan; `aria-selected="true"` on a row highlights it |
| Tooltip | `.dq-tooltip` wrapping a trigger and a `.dq-tooltip__text` bubble (`role="tooltip"`, linked with `aria-describedby`). Above by default, `--bottom` for below. CSS-only |
| Navbar | `.dq-navbar` with `__inner`, `__brand`, `__links`, `__link` (anchors or buttons). `aria-current="page"` shows the cyan highlight |
| Status bar | `.dq-statusbar` with `__inner`: a cyan BIOS-style help line, good as a footer, with `<kbd>` key hints |
| Breadcrumb | `.dq-breadcrumb` on a `<nav>` containing an `<ol>`. `aria-current="page"` marks the current item |
| Pagination | `.dq-pagination` on a `<nav>` with `.dq-pagination__link` anchors. `aria-current="page"` is cyan, `aria-disabled="true"` is faded |
| Modal | `.dq-modal` on a native `<dialog>` (open with `showModal()`), `.dq-modal__actions`. Use `<form method="dialog">` for buttons that close it |

Layout helpers: `.dq-container`, `.dq-stack` (`--lg` for bigger gaps), `.dq-row`, and `.dq-grid` (auto-fitting columns; set `--dq-grid-min` to change the minimum column width).

Bare elements are styled too: headings, links (cyan highlight on hover), `hr`, `code`, `kbd` and `pre`.

### Optional scripts

The CSS works on its own, except that tabs need their script to switch panels.

- `dqcss-menu.js`: arrow keys, Home/End, Enter/Space selection and a `dq-select` event for `.dq-menu`.
- `dqcss-tabs.js`: click and arrow-key tab switching, Home/End, panel show/hide and a `dq-tab-select` event for `.dq-tabs`.
- `dqcss-tooltip.js`: Esc dismisses a visible `.dq-tooltip`.
- `dqcss-modal.js`: clicking the backdrop closes a `.dq-modal`. Add `data-static` to a modal to opt out.

```html
<script src="node_modules/@doqin/dqcss/dist/dqcss-menu.js"></script>
<script src="node_modules/@doqin/dqcss/dist/dqcss-tabs.js"></script>
<script src="node_modules/@doqin/dqcss/dist/dqcss-tooltip.js"></script>
<script src="node_modules/@doqin/dqcss/dist/dqcss-modal.js"></script>
```

## Theming

Light is the default. Set `data-theme="dark"` on `<html>` for dark mode; it does not follow the OS setting. Everything is driven by `--dq-*` custom properties in `src/tokens.css`: colors (`--dq-color-*`), border width, shadow offset and color, halftone and checker sizes.

Cyan text is not readable on light backgrounds, so `--dq-color-secondary` is always paired with black (`--dq-color-secondary-fg`).

## Development

```sh
npm install
npm run build
npm run dev   # then open /docs/index.html (every component) or /examples/index.html (a sample site)
```

## Structure

- `src/tokens.css`: design tokens (dark mode via `data-theme="dark"`)
- `src/base/`: reset and element defaults
- `src/components/`: `.dq-*` component classes with BEM-style modifiers
- `src/utilities/`: layout helpers
- `src/js/`: optional scripts
- `src/index.css`: entry point; add new files here
