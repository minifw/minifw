# mini-fw

a Bun-only framework, rebuilt as the next version of the legacy project in
`../minifw`. this repository is a fresh scaffold: primitives and the compiler
will follow user-written tests, one function at a time.

## workspace

one Git repository, one pnpm lockfile, and one set of root configs and skills.
packages are grouped under `lib/`, separate from root configuration and scripts:

| directory       | package            | scope                                 |
| --------------- | ------------------ | ------------------------------------- |
| `lib/compiler/` | `@minifw/compiler` | template compiler                     |
| `lib/core/`     | `@minifw/core`     | framework primitives                  |
| `lib/helpers/`  | `@minifw/helpers`  | shared helpers                        |
| `lib/markdown/` | `@minifw/markdown` | markdown primitives                   |
| `lib/runtime/`  | `@minifw/runtime`  | runtime primitives                    |
| `lib/server/`   | `@minifw/server`   | Bun server integration through `mini` |

`docs/` is a generic place for written documentation, not a workspace package.
it has no package manifest, build output, or independent release. the old
`@minifw/tooling` package is removed; repository tools and configs live at the
root.

all packages use `src/index.ts` as their public source entry. Bun builds ESM
into `dist/`; packages ship that output and ts source for types, excluding
tests. package tsconfigs extend the root configuration and only set their source
scope. there are no copied configs, per-package skills, sync hooks, or tooling
dependency.

## development

requires pnpm 10.9+, Node 22.22.2+ on the 22.x line or Node 24.15+ for
repository tooling, and Bun 1.4+ for runtime, builds, and tests. Node is not a
supported framework server runtime. CI uses Node 26 and Bun 1.4.4.

```sh
pnpm install
pnpm build
pnpm lint
pnpm lint:fix
pnpm test:all
pnpm check
```

Turbo runs builds, types, and test tiers across the packages. root linting
checks everything once. builds run in dependency order, keep workspace
dependencies external, and cache `dist/`; end-to-end runs are never cached.

```sh
pnpm build --filter=@minifw/core
pnpm test:unit --filter=@minifw/core
pnpm --filter @minifw/core test:unit src/page/page.spec.ts
pnpm --filter @minifw/server add @minifw/core@workspace:*
pnpm --filter @minifw/markdown add marked
pnpm add -Dw <shared-development-dependency>
```

declare internal dependencies with `workspace:*` and import public package
names, not sibling source paths. root Turbo test commands build dependencies
first; build dependencies before running direct filtered tests that import built
exports. use pnpm for all dependency installation, not `bun install`.

the user writes `*.spec.ts` and `*.e2e.spec.ts` tests before implementation.
empty suites currently pass so the scaffold is usable; that is not behavioral
coverage. no application tests or primitives have been generated.

## releases

```sh
pnpm changeset
pnpm changeset status
pnpm version:packages
pnpm pack:check
pnpm release
```

Changesets records release intent, updates independent versions, and generates
per-package changelogs. `pnpm pack:check` writes tarballs into `.artifacts/`
without publishing. `pnpm release` validates the workspace and publishes changed
packages to npm; it requires registry authentication and should only be run
deliberately.

all packages start at `0.0.0` as unpublished scaffolds. decide the intended
next-version numbers before the first real release; do not publish empty
packages. the previous custom tooling sync, prepare, and generated jsr workflows
are retired.

the single root Git repository is initialized on `master`, without a commit or
remote. make the initial commit before using `pnpm changeset status`; Changesets
needs commit history for its comparison. CI compares against `origin/master`.

## guidance

shared instructions live in `AGENTS.md`, with skills under `.agents/skills/`.
keep primitives small, robust, and editable by hand. compiler work should
preserve request-time behavior and escaping; Bun AOT opportunities need verified
support and measured benefits before becoming release requirements.
