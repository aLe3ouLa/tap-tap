# Changesets

This directory tracks pending changes to `@taptap/design-system` between
releases.

## Adding a changeset

When you've made a change worth calling out in the changelog (a new
component, a new input, a bug fix, a breaking change), add a changeset:

```bash
npx changeset
```

It'll ask which package changed (just `design-system`), what kind of bump:

- `patch` — bug fix, no API change
- `minor` — new component, new input, new variant (additive, non-breaking)
- `major` — renamed/removed a public input, changed a selector, or any
  other breaking change to existing consumers

...and a summary — this becomes the CHANGELOG entry.

## Releasing

```bash
npx changeset version
```

Consumes every pending changeset, bumps
`projects/design-system/package.json`'s version, and writes
`projects/design-system/CHANGELOG.md`. Commit the result.

See https://github.com/changesets/changesets for full documentation.
