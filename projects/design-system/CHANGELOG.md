# @taptap/design-system

## 0.6.0

### Minor Changes

- Add radio component

## 0.5.0

### Minor Changes

- [`f7c548e`](https://github.com/aLe3ouLa/tap-tap/commit/f7c548e51358b49d5b30425f680d13f2f4c818d3) Thanks [@aLe3ouLa](https://github.com/aLe3ouLa)! - Add Tab and TabGroup components. TabGroup supports a `line` (underlined) and `card` (bordered chip) variant, `default`/`small` sizes, `left`/`center` alignment, and an optional bottom border; individual Tabs support disabled and closable (×) states and an icon-start slot, with two-way `selectedIndex` binding on the group.

- Add a checkbox component

### Patch Changes

- [`4a362df`](https://github.com/aLe3ouLa/tap-tap/commit/4a362df3ce4f21168575f3106cf6c39b5a1754b8) Thanks [@aLe3ouLa](https://github.com/aLe3ouLa)! - Fix accessibility issues in Breadcrumb and Pagination. Breadcrumb items no longer nest an extra `<li>` inside the `ds-breadcrumb-item` host — the host itself is now the list item (`role="listitem"`), so `ds-breadcrumb`'s `<ol>` has correctly structured list children instead of a non-`<li>` wrapper in between; breadcrumb link/separator text also moved off the low-contrast muted color onto a new `--ds-color-text-secondary` token that meets WCAG AA contrast. Pagination's page-size select, "Go to" quick-jumper input, and simple-mode page input now all have accessible names (the jumper input is wired to a real `<label>`).

## 0.4.0

### Minor Changes

- Add Breadcrumb and BreadcrumbItem components, with an optional `maxItems` input on Breadcrumb that collapses middle items into a static '···' when there are more items than the limit.

## 0.3.0

### Minor Changes

- Add ButtonGroup

## 0.2.0

### Minor Changes

- Add a `danger` Button variant and an `iconOnly` input for rendering square icon-only buttons. Also refines the `outline`, `ghost`, and `link` variants with dedicated hover/active/disabled states backed by new design tokens, and adds Storybook examples showing icons used with the Button component.

## 0.1.0

### Minor Changes

- [`71aca7e`](https://github.com/aLe3ouLa/tap-tap/commit/71aca7eb4c61d6dafe8905d0692130391fb7210e) Thanks [@aLe3ouLa](https://github.com/aLe3ouLa)! - Add Button and Icon components, backed by a full design token pipeline (color, shadow, typography, space) built from Figma sources via Style Dictionary. Button supports four variants (primary/outline/ghost/link), three sizes, and optional start/end icon slots. Icon renders from a generated SVG sprite covering the full TapTap icon set.
