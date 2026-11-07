# changesets

run `pnpm changeset` to describe a releasable change and select the affected
packages and version bumps. commit the generated markdown file with the change.

the root Git repository is initialized on `main` but has no initial commit yet.
`pnpm changeset status` needs that initial commit to compare package changes. CI
fetches full history and compares against `origin/main`.

run `pnpm version:packages` when preparing a release. Changesets consumes those
files, updates package versions and changelogs, and refreshes the pnpm lockfile.
review and commit those changes before running `pnpm release`.

packages are versioned independently. all four start at `0.0.0` as unpublished
scaffolds; choose the intended next-version numbers before the first release. do
not publish these empty scaffolds.
