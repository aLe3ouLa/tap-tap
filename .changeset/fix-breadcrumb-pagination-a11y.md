---
'@taptap/design-system': patch
---

Fix accessibility issues in Breadcrumb and Pagination. Breadcrumb items no longer nest an extra `<li>` inside the `ds-breadcrumb-item` host — the host itself is now the list item (`role="listitem"`), so `ds-breadcrumb`'s `<ol>` has correctly structured list children instead of a non-`<li>` wrapper in between; breadcrumb link/separator text also moved off the low-contrast muted color onto a new `--ds-color-text-secondary` token that meets WCAG AA contrast. Pagination's page-size select, "Go to" quick-jumper input, and simple-mode page input now all have accessible names (the jumper input is wired to a real `<label>`).
